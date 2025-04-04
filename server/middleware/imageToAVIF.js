const sharp = require('sharp');
const fs = require('fs').promises;
const pathModule = require('path');

const imageToAVIF = async (req, res, next) => {
  if (req.file && req.file.path) {
    const { path } = req.file;

    try {
      // Convert image to AVIF
      const avifPath = path.replace(/\.\w+$/, '.avif');
      await sharp(path)
        .avif({ quality: 50 })
        .toFile(avifPath);

      // Move the original file to a temporary directory before deleting
      const tempDir = pathModule.join(__dirname, 'tempUploads');
      
      // Ensure the tempUploads directory exists
      await fs.mkdir(tempDir, { recursive: true });

      // Move the file instead of deleting it immediately
      const tempFilePath = pathModule.join(tempDir, pathModule.basename(path));
      await fs.rename(path, tempFilePath);

      // Update the filename to the new AVIF file
      req.file.filename = req.file.filename.replace(/\.\w+$/, '.avif');
      req.file.path = avifPath;

      next();
    } catch (error) {
      console.error('Error processing image:', error);
      next(error); // Pass the error to the next middleware
    }
  } else {
    next();
  }
};

module.exports = imageToAVIF;
