const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'hero-beach.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  'agent1.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
  'agent2.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
  'property1.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
  'property2.jpg': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  'property3.jpg': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  'logo.png': 'https://dummyimage.com/180x50/000/fff&text=Victoria+Villano+Evans',
  'testimonial1.jpg': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
  'testimonial2.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'
};

const imagesDir = path.join(__dirname, 'public', 'images');

// Create the images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

Object.entries(images).forEach(([filename, url]) => {
  const filepath = path.join(imagesDir, filename);
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filepath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      console.log(`Downloaded ${filename}`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
}); 