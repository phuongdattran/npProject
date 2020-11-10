const jwt = require('jsonwebtoken');

exports.eventPage = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    let url = `https://exonpproject.herokuapp.com/api/event`;

    if (req.query) {
      let urlStringFilter = "?";
      for (let property in req.query) {
          urlStringFilter += `${property}=${req.query[property]}&`
      }
      urlStringFilter = urlStringFilter.slice(0, urlStringFilter.length-1)
      url = `https://exonpproject.herokuapp.com/api/event${urlStringFilter}`;
    }

    myInit = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let events = await fetch(url, myInit);
    events = await events.json();

    res.render('event/event.ejs', {page: "Events", arrow:"hidden", events})
  } catch {
    res.status(401).render('noaccess.ejs', {page: "New Event", arrow:""});
  }
};

exports.newEventPage1 = async (req, res, next) => {
    try {
        const token = req.cookies["token"];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        let url = `https://exonpproject.herokuapp.com/api/user/${userId}`;
    
        myInit = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
    
        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();

        res.render('event/newevent1.ejs', {page: "New Event", arrow:"", userInfo});
      } catch {
        res.status(401).render('noaccess.ejs', {page: "New Event", arrow:""});
      }
};

exports.newEventPage2 = async (req, res, next) => {
  try {

    let eventDetail= {};
    eventDetail.title = req.body.title;
    eventDetail.type = req.body.type;
    eventDetail.description = req.body.description;
    eventDetail.sport = req.body.sport;
    eventDetail.author = req.body.author;

      res.render('event/newevent2.ejs', {page: "New Event", arrow:"", eventDetail});
    } catch {
      res.status(401).render('noaccess.ejs', {page: "New Event", arrow:""});
    }
};

exports.eventDetailPage = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    let url = `https://exonpproject.herokuapp.com/api/event/${req.params.id}`;

    myInit = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let eventDetail = await fetch(url, myInit);
    eventDetail = await eventDetail.json();
    
    if (eventDetail.gps != "none") {
      let gpx = JSON.parse(eventDetail.gps);
      eventDetail.gps = gpx;
    }

    eventDetail.author = `${eventDetail.authorInfo.firstname} ${eventDetail.authorInfo.lastname}`;
    
    let userUrl = `https://exonpproject.herokuapp.com/api/user/${userId}`;
    let userInfo = await fetch(userUrl, myInit);
    userInfo = await userInfo.json();

    let userStatus = userInfo.status;
    
    if (userInfo._id == eventDetail.authorInfo._id) {
      userStatus = "author";
    }

    let promises = [];

    await Promise.all(
      eventDetail.participants.map(async (element)=>{
        let participantFetchUrl = `https://exonpproject.herokuapp.com/api/user/${element.userId}`;
        let participantFetchInfo = await fetch(participantFetchUrl, myInit);
        participantFetchInfo = await participantFetchInfo.json();
        promises.push(participantFetchInfo)
      })
    )

    participantInfo = promises;

    let participating = false;

    participantInfo.forEach(element => {
      if (element._id == userId) {
        participating = true;
      }
    });

    res.render('event/eventdetail.ejs', {page: "Event Details", arrow:"", eventDetail, userStatus, token, participantInfo, participating});
  } catch {
    res.status(401).render('noaccess.ejs', {page: "Event Details", arrow:""});
  }
};

exports.eventEditPage1 = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    let url = `https://exonpproject.herokuapp.com/api/event/${req.params.id}`;

    myInit = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let eventDetail = await fetch(url, myInit);
    eventDetail = await eventDetail.json();
    
    if (eventDetail.gps != "none") {
      let gpx = JSON.parse(eventDetail.gps);
      eventDetail.gps = gpx;
    }

      res.render('event/eventedit1.ejs', {page: "Edit Event", arrow:"", eventDetail});
  } catch {
      res.status(401).render('noaccess.ejs', {page: "Edit Event", arrow:""});
  }
};

exports.eventEditPage2 = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    let url = `https://exonpproject.herokuapp.com/api/event/${req.params.id}`;

    myInit = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let eventDetail = await fetch(url, myInit);
    eventDetail = await eventDetail.json();
    
    if (eventDetail.gps != "none") {
      let gpx = JSON.parse(eventDetail.gps);
      eventDetail.gps = gpx;
    }

    eventDetail.title = req.body.title;
    eventDetail.type = req.body.type;
    eventDetail.description = req.body.description;
    eventDetail.sport = req.body.sport;

    res.render('event/eventedit2.ejs', {page: "Edit Event", arrow:"", eventDetail});
  } catch {
      res.status(401).render('noaccess.ejs', {page: "Edit Event", arrow:""});
  }
};