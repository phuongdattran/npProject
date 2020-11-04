const Following = require('../../model/following');
const jwt = require('jsonwebtoken');
const joi = require('joi-oid');
const mongoose = require('mongoose');

exports.getAllFollowing = (req, res, next) => {
    Following.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
};

exports.getOneUserFollowing = (req, res, next) => {
    Following.aggregate([
        {
            $match: {userId: mongoose.Types.ObjectId(req.params.userId)}
        },
        {
            $lookup: {
            from: "users",
            localField: "followingId",
            foreignField: "_id",
            as: "followingInfo"
        }},
        {
            '$unwind': {
            'path': '$followingInfo'
        }},
        {
            $project: {
            followingId: 0,
            'followingInfo.__v': 0,
            'followingInfo.password': 0
        }}
    ])
    .then(following => res.status(200).json(following))
    .catch(error => res.status(404).json({error}));
};

exports.createFollowing = async (req, res, next) => {

    const token = req.query.token;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    console.log(userId)

    let following = {
        followingId: req.params.followingId,
        userId: userId,
    }

    const schema = joi.object().keys({
        followingId: joi.objectId().required(),
        userId: joi.objectId().required()
    });

    const result = schema.validate(following);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    following = new Following({...following})
    
    following.save()
      .then(() => res.status(201).redirect(`/members`))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteFollowing = (req, res, next) => {
    const token = req.query.token;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    Following.deleteOne({followingId: req.params.followingId, userId: userId})
    .then(()=> res.status(200).redirect(`/members`))
    .catch(error => res.status(400).json({error}));
};