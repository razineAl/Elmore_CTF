const express = require('express');
const User = require('../model/User');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');









router.get('/',async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.json('no cookies');
    console.log(req.cookies.jwt);

    const user = await User.findOne({refreshToken:cookies.jwt});

    if (!user) return res.json({reponse:'no user with this refresh Token (cookies ghaltin)',cookies:cookies});

    const validRefresh = jwt.verify(user.refreshToken,process.env.REFRESH_TOKEN_SECRET);

    try {
        if (validRefresh) {
            const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
            res.json({...validRefresh,token:accessToken});
        }
    } catch (error) {
        res.sendStatus(403);
    }

})

module.exports = router;
