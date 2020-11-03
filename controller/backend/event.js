const Event = require('../../model/event');
const Participant = require('../../model/participant');
const joi = require('joi-oid');
const fs = require('fs');
const mongoose = require("mongoose");

exports.getAllEvent = (req, res, next) => {
    let filter = {};
    let sort = '';

    if (req.query) {
        for (let property in req.query) {
            filter[property] = req.query[property];
        }
        delete filter.sort; 
    }
    
    if (req.query.sort) {
        sort = req.query.sort
    }

    Event.find(filter).sort(sort)
    .then(events => res.status(200).json(events))
    .catch(error => res.status(400).json({error}));

};

exports.getPopularEvent = (req, res, next) => {
    Participant.aggregate([
        {
            '$group': {
            '_id': '$eventId', 
            'nbrOfParticipant': {
                '$sum': 1
            }
        }}, 
        {
            '$sort': {
            'nbrOfParticipant': -1
        }}, 
        {
            '$limit': 5
        }, 
        {
            '$lookup': {
            'from': 'events', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'eventInfo'
        }}, 
        {
            '$unwind': {
            'path': '$eventInfo'
        }}
    ]).then(event => {res.status(200).json(event)})
    .catch(error => res.status(400).json({error}));
};

exports.getOneEvent = (req, res, next) => {
    Event.aggregate([
        {
            $match: {_id: mongoose.Types.ObjectId(req.params.id)}},
        {
            $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorInfo"
        }},
        {
            $unwind: {
            path: '$authorInfo'
        }},
        {
            $project: {
            author: 0,
            'authorInfo.mainSport': 0,
            'authorInfo.email': 0,
            'authorInfo.birthdate': 0,
            'authorInfo.password': 0,
            'authorInfo.__v': 0
        }},
        {
            $lookup: {
            from: 'participants',
            localField: '_id',
            foreignField: 'eventId',
            as: 'participants'
        }},
    ])
    .then(event => {res.status(200).json(event[0])})
    .catch(error => res.status(404).json({error}));
};

exports.createEvent = async (req, res, next) => {
    const schemaMeeting = joi.object().keys({
        date: joi.string().trim().required(),
        time: joi.string().trim().required(),
        place: joi.string().trim().required()
    });
    const schema = joi.object().keys({
        title: joi.string().trim().required(),
        type: joi.string().trim().required(),
        sport: joi.string().trim().required(),
        distance: joi.string().trim().required(),
        pace: joi.string().trim().required(),
        meeting: schemaMeeting, //not working
        description: joi.string().trim(),
        author: joi.objectId().required(),
        gps: joi.string().trim()
    });

    const result = schema.validate(req.body, { allowUnknown: true }); //need to change
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const event = new Event({
        ...req.body,
        gps: JSON.stringify(req.file)
    });
    
    event.save()
      .then(() => res.status(201).redirect('/events/'))
      .catch(error => res.status(400).json({ error }));
};

exports.updateEvent = (req, res, next) => {
    let event = {...req.body}
    if (req.file) {
        fs.unlink(`./public/gpx/${req.body.oldGpx}`, () => {});
        event =  {
            ...req.body,
            gps: JSON.stringify(req.file)
        }
    }
    Event.updateOne({_id: req.params.id}, {        
        ...event, 
        _id: req.params.id})
    .then(() => {
        res.status(200).redirect(`/event/${req.params.id}`);
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteEvent = (req, res, next) => {
    Event.findOne({_id:req.params.id})
    .then(event => {
        if(event.gps != 'none') {
        fs.unlink(`./public/gpx/${JSON.parse(event.gps).filename}`, () => {});
        }
        Event.deleteOne({_id: req.params.id})
        .then(Participant.deleteMany({eventId: req.params.id})
            .then(()=> res.status(200).redirect('/events?delete'))
            .catch(error => res.status(400).json({error}))
            )
        .catch(error => res.status(400).json({error}));
        
    })
    .catch(error => res.status(404).json({error}));
};