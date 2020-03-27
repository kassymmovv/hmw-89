const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Album = require('../models/Albums');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  const alb = await Album.find();
  if (req.query.author){
    const albums = await Album.find({author: req.query.author,publish:true}).sort({"year": -1}).populate('author');

    res.send(albums);
  }
  res.send(alb)

});



router.post('/', [upload.single('image')], async (req, res) => {
  const Data = req.body;

  if (req.file) {
    Data.image = req.file.filename;
  }

  const product = new Album(Data);

  try {
    await product.save();

    return res.send({id: product._id});
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete('/:id',async (req,res) => {
  const token = req.get('Authorization').split(' ')[1];
  const user = await User.findOne({_id:token});
  if (user.role === 'admin'){
    await Album.deleteOne({_id:req.params.id});
    res.send({message:'Deleted'})
  }


});
module.exports = router;