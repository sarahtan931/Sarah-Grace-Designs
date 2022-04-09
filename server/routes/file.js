const express = require('express');
const router = new express.Router();
const pool = require("../db");
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('./s3')

//route to get images
router.get('/images/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

//route to uplaod images to the s3 bucket
router.post('/images', upload.single('image') , async function (req, res) {
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  const description = req.body.description
  res.send({imagePath: `/images/${result.Key}`})
});


module.exports = router;