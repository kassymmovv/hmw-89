const express = require('express');

const Tracks = require('../models/Tracks');
const auth = require('../middleware/auth');

const User = require('../models/User');

const router = express.Router();


router.get('/', async (req, res) => {
  const tracks = await Tracks.find({album: req.query.album,publish:true}).sort({"number": 1}).populate('album');

    res.send(tracks);


});

router.delete('/:id',async (req,res) => {
  const token = req.get('Authorization').split(' ')[1];
  const user = await User.findOne({_id:token});
  if (user.role === 'admin'){
    await Tracks.deleteOne({_id:req.params.id});
    res.send({message:'Deleted'})
  }


});

router.post('/', async (req, res) => {
  const tracks = await Tracks.find({album: req.query.album});

  const trackData = {
    name: req.body.name,
    album: req.body.album,
    duration: req.body.duration,
    number: tracks.length + 1
  };
  const track = new Tracks(trackData);
  await track.save();
  res.send(track);
});

module.exports = router;