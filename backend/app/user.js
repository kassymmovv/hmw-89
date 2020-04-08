const express = require('express');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');
const axios = require('axios');
const User = require('../models/User');
const config = require('../config');
const upload = require('../multer').avatar;

const router = express.Router();

router.post('/',upload.single('image'), async (req,res) => {
    console.log(req.file);
    try{
        const userData = {
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName
        };
        if (req.file) {
            userData.avatar = req.file.filename;
        }
        const user = new User(userData);
        user.generateToken();
        await user.save();
        return res.send(user);
    }catch(error){
        return res.status(400).send(error)
    }
});

router.post('/sessions',async (req,res) => {
    const user = await User.findOne({username:req.body.username});

    if(!user){
        return res.status(400).send({error:'nOT FOUND'})
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password);

    if(!isMatch){
        return res.status(400).send({error:'Password'})
    }
    user.token = nanoid(15);
   await User.updateOne({username:user.username},{$set:{token:user.token}});
    return res.send(user)

});
router.post('/facebook', async (req, res) => {
    try {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(url);
        console.log(response);
        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'User ID incorrect'});
        }

        let user = await User.findOne({facebookId: req.body.id});
        console.log(req.body.picture.data.url);
        if (!user) {
            const [firstName, lastName] = req.body.name.split(' ');

            user = new User({
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: firstName + ' ' + lastName,
                avatar: req.body.picture.data.url,
            });
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (e) {
        return res.sendStatus(401);
    }
});
module.exports = router;