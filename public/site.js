/* FrenchSaaS — shared effects
   Scroll reveal + light typographic parallax.
   Everything is skipped when the visitor prefers reduced motion. */

(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveal ---------- */
  const revealables = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(el => io.observe(el));
  }

  /* ---------- Parallax on [data-parallax] decor ---------- */
  const layers = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!reduced && layers.length) {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      layers.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        el.style.transform = 'translateY(' + (y * speed).toFixed(1) + 'px)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Hero EN/FR toggle (index only) ---------- */
  const buttons = document.querySelectorAll('.lang-toggle button');
  if (buttons.length) {
    const targets = [
      document.getElementById('hero-headline'),
      document.getElementById('hero-lede')
    ].filter(Boolean);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        buttons.forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        const swap = () => targets.forEach(t => { t.textContent = t.dataset[lang]; });
        if (reduced) { swap(); return; }
        targets.forEach(t => t.classList.add('is-fading'));
        setTimeout(() => {
          swap();
          targets.forEach(t => t.classList.remove('is-fading'));
        }, 250);
      });
    });
  }
})();
