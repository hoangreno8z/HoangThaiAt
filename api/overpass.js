// Vercel Serverless Function Proxy for Overpass API
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let query = req.query.data;
  if (req.method === 'POST' && req.body) {
    query = typeof req.body === 'string' ? req.body : req.body.data;
  }

  if (!query) {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radius = Math.min(500, Math.max(80, parseInt(req.query.radius || 200, 10)));

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ error: 'Missing or invalid lat/lng or data parameter' });
    }
    query = '[out:json][timeout:15];way(around:' + radius + ',' + lat + ',' + lng + ')[highway];out geom;';
  }
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
    'https://z.overpass-api.de/api/interpreter'
  ];

  for (const ep of endpoints) {
    try {
      const url = ep + '?data=' + encodeURIComponent(query);
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 6000) : null;

      const upstream = await fetch(url, {
        signal: controller ? controller.signal : undefined,
        headers: {
          'User-Agent': 'ThaiAtGeodesicApp/1.0 (admin@thaiat.vn)',
          'Accept': 'application/json'
        }
      });
      if (timer) clearTimeout(timer);

      if (upstream.ok) {
        const data = await upstream.json();
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
        return res.status(200).json(data);
      }
    } catch (_) {
      // Try next mirror
    }
  }

  return res.status(502).json({ error: 'All Overpass upstream mirrors failed' });
};
