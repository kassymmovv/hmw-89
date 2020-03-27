const express = require('express');

const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');

const router = express.Router();



router.post('/', async (req, res) => {
try {
    const user = await User.findOne({token:req.get('Token')});


    if (!user){
        res.status(401).send({message: 'Unauthorized'});
    }else {

        const  newTrackHistoryObj = {
            user:user._id,
            track:req.body.track
        };
        const trackHis = new TrackHistory(newTrackHistoryObj);
        await trackHis.save();

        res.send(trackHis);

    }



}catch (e) {
    res.status(404).send({error:"Not found"})
}
});

router.get('/',async (req,res) => {


    try{
       const user = await User.findOne({token:req.get('Token')});
       if (!user){
           res.status(401).send({message: 'Unauthorized'});
       }else {
        const trackHistory = await TrackHistory.find({user:user._id}).sort({datetime:1}).populate({path: 'track', populate: {
                path: 'album', populate: {
                    path: 'author'
                }
            }});
           res.send(trackHistory)
       }


   } catch (e) {
       res.status(404).send({error:"Not found"})

   }
});
module.exports = router;