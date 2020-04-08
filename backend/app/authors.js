const path = require('path');

const express = require('express');
const Author = require('../models/Author');
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../config');
const User = require('../models/User');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const author = await Author.find({publish:true});

    const token = req.get('Authorization').split(' ')[1];
    const user = await User.findOne({token:token});
    if (user.role === 'admin'){
        const albumss = await Author.find({});

        res.send(albumss);
    }
        return res.send(author);



});
router.post('/publish/:id', async (req, res) => {

    try {
        const album = await Author.findByIdAndUpdate({_id:req.params.id},{publish:true})

    } catch (e) {
        return res.status(400).send(e);
    }
});
router.post('/',[ upload.single('image')], async (req, res) => {
    const Data = req.body;

    if (req.file) {
        Data.image = req.file.filename;
    }

    const author = new Author(Data);

    try {
        await author.save();

        return res.send({id: author._id});
    } catch (e) {
        return res.status(400).send(e);
    }


});
router.delete('/:id',async (req,res) => {
    const token = req.get('Authorization').split(' ')[1];
    const user = await User.findOne({_id:token});
    if (user.role === 'admin'){
        await Author.deleteOne({_id:req.params.id});
        res.send({message:'Deleted'})
    }


});

module.exports = router;