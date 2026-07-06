const DEFAULT_USER = { email: 'admin@frenchsaas.com', password: 'ChangeMe123!' };
let state = { view: 'dashboard', articles: [], seo: {}, leads: [], ideas: [], selectedArticleId: null };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

async function loadJSON(path, fallback) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(path);
    return await res.json();
  } catch (error) {
    console.warn(`Impossible de charger ${path}`, error);
    return fallback;
  }
}

function markdownToHtml(markdown = '') {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gims, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-3])><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>');
}

function download(filename, content, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function slugify(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function saveLocalArticles() {
  localStorage.setItem('frenchsaas_articles', JSON.stringify(state.articles));
}

function getArticles() {
  const local = localStorage.getItem('frenchsaas_articles');
  return local ? JSON.parse(local) : state.articles;
}

function setView(view) {
  state.view = view;
  $$('#app nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  const titles = { dashboard: 'Tableau de bord', articles: 'Articles', seo: 'SEO', leads: 'Leads', ideas: 'Idées', services: 'Services', settings: 'Paramètres' };
  $('#pageTitle').textContent = titles[view] || 'Admin';
  render();
}

function mountTemplate(id) {
  const root = $('#viewRoot');
  root.innerHTML = '';
  root.append($(`#${id}`).content.cloneNode(true));
}

function renderDashboard() {
  mountTemplate('dashboardTpl');
  $('#metricVisitors').textContent = state.seo.metrics?.visitors ?? '—';
  $('#metricClicks').textContent = state.seo.metrics?.clicks ?? '—';
  $('#metricPosition').textContent = state.seo.metrics?.position ?? '—';
  $('#metricLeads').textContent = state.leads.length;
  $('#recentArticles').innerHTML = state.articles.slice(0, 4).map(a => `<div class="row"><div><strong>${a.title}</strong><small>${a.category}</small></div><span class="status">${a.status}</span></div>`).join('');
  $('#seoOpportunities').innerHTML = (state.seo.opportunities || []).map(item => `<div class="row"><span>${item}</span><span class="badge">Suggestion</span></div>`).join('');
}

function renderArticles() {
  mountTemplate('articlesTpl');
  if (!state.selectedArticleId && state.articles[0]) state.selectedArticleId = state.articles[0].id;
  const drawList = () => {
    const q = $('#articleSearch').value.toLowerCase();
    $('#articleList').innerHTML = state.articles.filter(a => a.title.toLowerCase().includes(q)).map(a => `<div class="list-item ${a.id === state.selectedArticleId ? 'active' : ''}" data-id="${a.id}"><strong>${a.title}</strong><small>${a.status} · ${a.category}</small></div>`).join('');
    $$('.list-item').forEach(item => item.addEventListener('click', () => { state.selectedArticleId = item.dataset.id; renderArticles(); }));
  };
  const drawEditor = () => {
    const article = state.articles.find(a => a.id === state.selectedArticleId);
    if (!article) { $('#articleEditor').innerHTML = '<p>Aucun article.</p>'; return; }
    $('#articleEditor').innerHTML = `
      <h2>Modifier l’article</h2>
      <label>Titre<input id="aTitle" value="${article.title}"></label>
      <label>Slug<input id="aSlug" value="${article.slug}"></label>
      <label>Statut<select id="aStatus"><option ${article.status === 'draft' ? 'selected' : ''} value="draft">Brouillon</option><option ${article.status === 'published' ? 'selected' : ''} value="published">Publié</option></select></label>
      <label>Catégorie<input id="aCategory" value="${article.category}"></label>
      <label>Mots-clés<input id="aKeywords" value="${article.keywords}"></label>
      <label>Extrait<textarea id="aExcerpt" rows="3">${article.excerpt}</textarea></label>
      <label>Méta-description<textarea id="aMeta" rows="3">${article.metaDescription}</textarea></label>
      <label>Contenu Markdown<textarea id="aContent" rows="14">${article.content}</textarea></label>
      <div class="editor-actions"><button id="saveArticle">Sauvegarder</button><button id="exportMd" class="ghost">Exporter Markdown</button><button id="deleteArticle" class="ghost">Supprimer</button></div>`;
    ['aTitle','aSlug','aStatus','aCategory','aKeywords','aExcerpt','aMeta','aContent'].forEach(id => $(`#${id}`).addEventListener('input', updatePreview));
    $('#aTitle').addEventListener('input', () => { if (!$('#aSlug').dataset.touched) $('#aSlug').value = slugify($('#aTitle').value); updatePreview(); });
    $('#aSlug').addEventListener('input', () => $('#aSlug').dataset.touched = '1');
    $('#saveArticle').addEventListener('click', () => {
      Object.assign(article, readEditorValues());
      saveLocalArticles(); drawList(); updatePreview();
    });
    $('#exportMd').addEventListener('click', () => exportMarkdown(readEditorValues()));
    $('#deleteArticle').addEventListener('click', () => {
      state.articles = state.articles.filter(a => a.id !== article.id);
      state.selectedArticleId = state.articles[0]?.id || null;
      saveLocalArticles(); renderArticles();
    });
    updatePreview();
  };
  $('#newArticleBtn').addEventListener('click', createArticle);
  $('#exportAllBtn').addEventListener('click', () => download('articles.json', JSON.stringify(state.articles, null, 2), 'application/json'));
  $('#articleSearch').addEventListener('input', drawList);
  drawList(); drawEditor();
}

function readEditorValues() {
  return { title: $('#aTitle').value, slug: $('#aSlug').value, status: $('#aStatus').value, category: $('#aCategory').value, keywords: $('#aKeywords').value, excerpt: $('#aExcerpt').value, metaDescription: $('#aMeta').value, content: $('#aContent').value };
}

function updatePreview() {
  const a = readEditorValues();
  $('#articlePreview').innerHTML = `<article><p class="eyebrow">Aperçu en direct</p><h1>${a.title}</h1><p class="meta">/${a.slug}/ · ${a.category}</p><p><strong>${a.excerpt}</strong></p>${markdownToHtml(a.content)}<hr><p class="meta">Meta description : ${a.metaDescription}</p><p class="meta">Mots-clés : ${a.keywords}</p></article>`;
}

function createArticle() {
  const id = `post-${Date.now()}`;
  state.articles.unshift({ id, title: 'Nouvel article', slug: 'nouvel-article', status: 'draft', category: 'SEO translation', keywords: '', excerpt: '', metaDescription: '', content: '# Nouvel article\n\nCommence à écrire ici.' });
  state.selectedArticleId = id;
  saveLocalArticles();
  setView('articles');
}

function exportMarkdown(article) {
  const frontmatter = `---\ntitle: "${article.title}"\nslug: "${article.slug}"\nstatus: "${article.status}"\ncategory: "${article.category}"\nkeywords: "${article.keywords}"\nexcerpt: "${article.excerpt}"\nmetaDescription: "${article.metaDescription}"\n---\n\n`;
  download(`${article.slug}.md`, frontmatter + article.content, 'text/markdown');
}

function renderSEO() {
  mountTemplate('seoTpl');
  $('#queriesList').innerHTML = (state.seo.queries || []).map(q => `<div class="row"><div><strong>${q.query}</strong><small>${q.impressions} impressions</small></div><span class="badge">${q.clicks} clics · pos. ${q.position}</span></div>`).join('');
  $('#seoPagesList').innerHTML = (state.seo.pages || []).map(p => `<div class="row"><div><strong>${p.url}</strong><small>${p.issue}</small></div><span class="badge">${p.priority}</span></div>`).join('');
  $('#issuesList').innerHTML = (state.seo.issues || []).map(issue => `<div class="row"><span>${issue}</span><span class="badge">À vérifier</span></div>`).join('');
}

function renderLeads() { mountTemplate('leadsTpl'); $('#leadsList').innerHTML = state.leads.map(l => `<div class="row"><div><strong>${l.name} · ${l.company}</strong><small>${l.country} · ${l.project} · ${l.source}</small></div><span class="badge">${l.status} · ${l.value}</span></div>`).join(''); }
function renderIdeas() { mountTemplate('ideasTpl'); $('#ideasList').innerHTML = state.ideas.map(i => `<div class="row"><div><strong>${i.title}</strong><small>${i.stage}</small></div><span class="badge">Score ${i.score}</span></div>`).join(''); }
function renderSimple(template) { mountTemplate(template); }

function render() {
  ({ dashboard: renderDashboard, articles: renderArticles, seo: renderSEO, leads: renderLeads, ideas: renderIdeas, services: () => renderSimple('servicesTpl'), settings: () => renderSimple('settingsTpl') }[state.view] || renderDashboard)();
}

async function init() {
  state.articles = await loadJSON('./data/articles.json', []);
  state.articles = getArticles();
  state.seo = await loadJSON('./data/seo.json', {});
  state.leads = await loadJSON('./data/leads.json', []);
  state.ideas = await loadJSON('./data/ideas.json', []);
  const isLogged = sessionStorage.getItem('frenchsaas_admin_logged') === 'true';
  $('#loginScreen').hidden = isLogged;
  $('#app').hidden = !isLogged;
  if (isLogged) render();
}

$('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const ok = $('#email').value === DEFAULT_USER.email && $('#password').value === DEFAULT_USER.password;
  $('#loginError').hidden = ok;
  if (ok) { sessionStorage.setItem('frenchsaas_admin_logged', 'true'); $('#loginScreen').hidden = true; $('#app').hidden = false; render(); }
});
$('#logoutBtn').addEventListener('click', () => { sessionStorage.removeItem('frenchsaas_admin_logged'); location.reload(); });
$$('nav button').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
$('#newArticleTop').addEventListener('click', createArticle);
init();
