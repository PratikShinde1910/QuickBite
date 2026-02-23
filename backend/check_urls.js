const https = require('https');
const fs = require('fs');
const seedDataPath = './seed/seedData.js';

const content = fs.readFileSync(seedDataPath, 'utf-8');
const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(\?w=\d+&q=\d+)?/g;
const urls = [...new Set(content.match(urlRegex))];

console.log(`Found ${urls.length} unique URLs. Checking...`);

let brokenUrls = [];
let checked = 0;

urls.forEach(url => {
    https.get(url, (res) => {
        if (res.statusCode !== 200 && res.statusCode !== 302 && res.statusCode !== 301) {
            // Unsplash might return 302 to a premium image or 404. Let's see if it's 404.
            if (res.statusCode === 404) {
                brokenUrls.push(url);
            }
        }
        checked++;
        if (checked === urls.length) {
            console.log('Broken URLs:');
            console.log(brokenUrls);
        }
    }).on('error', (e) => {
        brokenUrls.push(url);
        checked++;
        if (checked === urls.length) {
            console.log('Broken URLs:');
            console.log(brokenUrls);
        }
    });
});
