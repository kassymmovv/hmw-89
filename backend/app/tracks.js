const express = require('express');

const Tracks = require('../models/Tracks');
const auth = require('../middleware/auth');

const User = require('../models/User');

const router = express.Router();


router.get('/', async (req, res) => {
  const tracks = await Tracks.find({album: req.query.album,publish:true}).sort({"number": 1}).populate('album');
  const token = req.get('Authorization').split(' ')[1];
  const user = await User.findOne({token:token});
  if (user.role === 'admin'){
    const albumss = await Tracks.find({album: req.query.album}).sort({"year": -1}).populate('album');

    res.send(albumss);
  }
    res.send(tracks);


});
router.post('/publish/:id', async (req, res) => {

  try {
    const album = await Tracks.findByIdAndUpdate({_id:req.params.id},{publish:true})

  } catch (e) {
    return res.status(400).send(e);
  }
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
  console.log(req.body);
  const tracks = await Tracks.find({album: req.body.album});

  const trackData = {
    title: req.body.title,
    album: req.body.album,
    duration: req.body.duration,
    number: tracks.length + 1
  };
  const track = new Tracks(trackData);
  await track.save();
  res.send(track);
});

module.exports = router;