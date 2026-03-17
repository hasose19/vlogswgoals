const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTycDhc6hUaslvtNlPjAxPo25ZzOhymIJwXt3ydP_g8aduKckO-S_dz57GJ1XO3X0o6a3EJBw9mF5TQ/pub?gid=0&single=true&output=csv';

module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');

  try {
    const response = await fetch(CSV_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text = await response.text();
    const lines = text.trim().split('\n');
    const val = parseInt(lines[1]?.trim().replace(/[^0-9]/g, ''));
    if (val && val > 0) {
      return res.status(200).json({ followers: val, ok: true });
    }
    return res.status(200).json({ followers: null, ok: false });
  } catch(e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
