// Usage: node scripts/build-reference.cjs <saved-reference-page.html>
// Stores one-way hashes of every six-word run of visible text on the reference
// page, so the audit can prove none of its wording was reused. The page itself
// is never stored in this repository.
const fs = require('fs');
const path = require('path');
const { htmlToText, shingles, hash } = require('./lib-text.cjs');

const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/build-reference.cjs <reference.html>'); process.exit(1); }
const text = htmlToText(fs.readFileSync(file, 'utf8'));
const hashes = [...new Set(shingles(text).map(hash))].sort();
const out = path.join(__dirname, '..', 'reference', 'shingles.json');
fs.writeFileSync(out, JSON.stringify({ size: 6, count: hashes.length, hashes }) + '\n');
console.log(`Wrote ${hashes.length} fingerprints to ${path.relative(process.cwd(), out)}`);
