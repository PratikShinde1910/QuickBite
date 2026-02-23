const fs = require('fs');

const seedDataPath = './seed/seedData.js';
let content = fs.readFileSync(seedDataPath, 'utf-8');

const brokenUrls = [
    'https://images.unsplash.com/photo-1461023058943-07cb18cde65a?w=500&q=80',
    'https://images.unsplash.com/photo-1572490122747-3968b75bb699?w=500&q=80',
    'https://images.unsplash.com/photo-1605184862551-0a6a2333ceeb?w=500&q=80',
    'https://images.unsplash.com/photo-1582260273767-f31f9ab6cbf5?w=500&q=80',
    'https://images.unsplash.com/photo-1594212202875-c54d7ca65b21?w=500&q=80',
    'https://images.unsplash.com/photo-1511381939415-e440c9d18ac4?w=500&q=80',
    'https://images.unsplash.com/photo-1555507036-ab1f40388cb8?w=500&q=80',
    'https://images.unsplash.com/photo-1610969524451-2401869e0618?w=500&q=80',
    'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=500&q=80',
    'https://images.unsplash.com/photo-1616047195325-1ffef2fd1c67?w=500&q=80',
    'https://images.unsplash.com/photo-1624300629298-e94817ecd406?w=500&q=80',
    'https://images.unsplash.com/photo-1601050690117-94f5f6af8b70?w=500&q=80',
    'https://images.unsplash.com/photo-1545084918-ad9dca72bed5?w=500&q=80',
    'https://images.unsplash.com/photo-1582450871972-ab5ce211154f?w=500&q=80',
    'https://images.unsplash.com/photo-1596796914596-fdd28b58a368?w=500&q=80',
    'https://images.unsplash.com/photo-1544025162-8e684061a995?w=500&q=80',
    'https://images.unsplash.com/photo-1620067417539-7bd0ec58fb01?w=500&q=80'
];

const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(\?w=\d+&q=\d+)?/g;
const allUrls = [...new Set(content.match(urlRegex))];
const validUrls = allUrls.filter(url => !brokenUrls.includes(url));

// Replace each broken URL with a different valid URL
brokenUrls.forEach((broken, index) => {
    // pick a valid URL (cycle through them)
    const valid = validUrls[index % validUrls.length];
    // Replace all occurrences of the broken URL
    content = content.split(broken).join(valid);
});

fs.writeFileSync(seedDataPath, content, 'utf-8');
console.log('Successfully replaced broken image URLs in seedData.js with working alternatives from the same set.');
