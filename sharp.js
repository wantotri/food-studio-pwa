const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/raw');
const destination = path.resolve(__dirname, 'src/public/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
  .forEach(image => {
    // mengubah ukuran gambar dengan lebar 800px, dengan suffix -large.jpg
    sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`));

    // mengubah ukuran gambar dengan lebar 480px, dengan suffix -small.jpg
    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`));

    // mengubah ukuran gambar dengan lebar 800px, dengan suffix -large.webp
    sharp(`${target}/${image}`)
      .toFormat('webp')
      .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-large.webp`));

    // mengubah ukuran gambar dengan lebar 480px, dengan suffix -small.webp
    sharp(`${target}/${image}`)
      .toFormat('webp')
      .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-small.webp`));
  });
