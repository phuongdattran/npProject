const Participant = require('../../model/participant');
const jwt = require('jsonwebtoken');
const joi = require('joi-oid');

exports.getAllParticipant = (req, res, next) => {
    Participant.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
};

exports.getOneEventParticipant = (req, res, next) => {
    Participant.find({eventId:req.params.id})
    .then(participant => res.status(200).json(participant))
    .catch(error => res.status(404).json({error}));
};

exports.getOneUserEvents = (req, res, next) => {
    Participant.find({userId:req.params.userId})
    .then(participant => res.status(200).json(participant))
    .catch(error => res.status(404).json({error}));
};

exports.createParticipant = async (req, res, next) => {

    const token = req.query.token;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    let participant = {
        eventId: req.params.eventId,
        userId: userId,
    }

    const schema = joi.object().keys({
        eventId: joi.objectId().required(),
        userId: joi.objectId().required()
    });

    const result = schema.validate(participant);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }


    
    participant = new Participant({...participant})
    
    participant.save()
      .then(() => res.status(201).redirect(`/event/${req.params.eventId}`))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteParticipant = (req, res, next) => {
    const token = req.query.token;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    Participant.deleteOne({eventId: req.params.eventId, userId: userId})
    .then(()=> res.status(200).redirect(`/event/${req.params.eventId}`))
    .catch(error => res.status(400).json({error}));
};