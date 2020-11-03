const Strava = require('../../model/strava');

exports.getAllStrava = (req, res, next) => {
    Strava.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
    };

exports.getOneStrava = (req, res, next) => {
    Strava.findOne({userId:req.params.id})
    .then(strava => res.status(200).json(strava))
    .catch(error => res.status(404).json({error}));
};

exports.createStrava = async (req, res, next) => {
    const strava = new Strava({...req.body})
    strava.save()
      .then(() => res.status(201).redirect('/myprofile/'))
      .catch(error => res.status(400).json({ error }));
};

exports.updateStrava = (req, res, next) => {
    Strava.updateOne({userId: req.params.id}, {...req.body, userId: req.params.id})
    .then(() => {
        res.status(200).redirect('/myprofile/');
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteStrava = (req, res, next) => {
    Strava.deleteOne({userId: req.params.id})
    .then(()=> res.status(200).json({message: 'Your strava has been deleted'}))
    .catch(error => res.status(400).json({error}));
};