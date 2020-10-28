const express = require('express');
const Event = require('../../model/event');
const joi = require('joi');

exports.getAllEvent = (req, res, next) => {

    Event.find()
    .then(events => res.status(200).json(events))
    .catch(error => res.status(400).json({error}));

};

exports.getOneEvent = (req, res, next) => {
    Event.findOne({_id:req.params.id})
    .then(event => res.status(200).json(event))
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
        pace: joi.string().trim().required(),
        meeting: schemaMeeting, //not working
        description: joi.string().trim(),
        author: joi.string().trim().required(),
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
    Event.updateOne({_id: req.params.id}, {        
        ...req.body, 
        _id: req.params.id})
    .then(() => {
        res.status(200).redirect(`/events/${req.params.id}`);
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message: 'Your event has been deleted'}))
    .catch(error => res.status(400).json({error}));
};