exports.handler = async function () {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Placeholder pour une future intégration Google Search Console API.',
      nextSteps: [
        'Créer un projet Google Cloud',
        'Activer Search Console API',
        'Stocker les secrets dans Netlify Environment Variables',
        'Remplacer les données statiques de /admin/data/seo.json'
      ]
    })
  };
};
