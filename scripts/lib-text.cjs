// Shared text helpers for the reference fingerprint and the audit.
const crypto = require('crypto');

function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;|’/g, "'").replace(/&[a-z#0-9]+;/gi, ' ');
}

function words(text) {
  return text.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean);
}

function shingles(text, size = 6) {
  const w = words(text);
  const out = [];
  for (let i = 0; i + size <= w.length; i++) out.push(w.slice(i, i + size).join(' '));
  return out;
}

const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 16);

module.exports = { htmlToText, words, shingles, hash };
