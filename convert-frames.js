const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processFrames() {
  const sourceDir = path.join(__dirname, 'Coffee Shots');
  const targetDir = path.join(__dirname, 'public', 'frames');

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Get all jpg frames
  const files = fs.readdirSync(sourceDir).filter(f => f.startsWith('ezgif-frame-') && f.endsWith('.jpg')).sort();
  
  if (files.length === 0) {
    console.log('No jpg frames found.');
    return;
  }

  console.log(`Found ${files.length} frames. Selecting 120 for conversion...`);

  const numFramesWanted = 120;
  const step = (files.length - 1) / (numFramesWanted - 1);
  const selectedFiles = [];

  for (let i = 0; i < numFramesWanted; i++) {
    const index = Math.round(i * step);
    selectedFiles.push(files[index]);
  }

  console.log(`Selected ${selectedFiles.length} frames. Starting conversion...`);

  let count = 1;
  for (const file of selectedFiles) {
    const sourcePath = path.join(sourceDir, file);
    const paddedIndex = count.toString().padStart(4, '0');
    const targetPath = path.join(targetDir, `${paddedIndex}.webp`);

    await sharp(sourcePath)
      .webp({ quality: 80 })
      .toFile(targetPath);

    if (count % 10 === 0) {
      console.log(`Converted ${count} / 120`);
    }
    count++;
  }

  console.log('Successfully converted 120 frames to WebP.');
}

processFrames().catch(console.error);
