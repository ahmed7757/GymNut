const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();


// const storage =  multer.memoryStorage();
const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
      const dir = `uploads/`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        req.fileValidationError = "Only image files are allowed!";
        cb(null, false);
    }
}

const uploadImage = multer({ storage ,fileFilter });
const uploadVideo = multer({ storage });

module.exports = { router, uploadImage, uploadVideo };