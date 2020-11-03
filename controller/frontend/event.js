const jwt = require('jsonwebtoken');

exports.eventPage = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    let url = `http://localhost:3000/api/event`;

    if (req.query) {
      let urlStringFilter = "?";
      for (let property in req.query) {
          urlStringFilter += `${property}=${req.query[property]}&`
      }
      urlStringFilter = urlStringFilter.slice(0, urlStringFilter.length-1)
      url = `http://localhost:3000/api/event${urlStringFilter}`;
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

exports.newEventPage = async (req, res, next) => {
    try {
        const token = req.cookies["token"];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/user/${userId}`;
    
        myInit = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
    
        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();

        res.render('event/newevent.ejs', {page: "New Event", arrow:"", userInfo});
      } catch {
        res.status(401).render('noaccess.ejs', {page: "New Event", arrow:""});
      }
};

exports.eventDetailPage = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    let url = `http://localhost:3000/api/event/${req.params.id}`;

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

    let author = `${eventDetail.authorInfo.firstname} ${eventDetail.authorInfo.lastname}`;
    eventDetail.author = author;

    let userStatus = eventDetail.authorInfo.status;
    if (eventDetail.authorInfo._id == userId) {
      userStatus = "author";
    }

    let promises = [];

    await Promise.all(
      eventDetail.participants.map(async (element)=>{
        let participantFetchUrl = `http://localhost:3000/api/user/${element.userId}`;
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
    let url = `http://localhost:3000/api/event/${req.params.id}`;

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
    let url = `http://localhost:3000/api/event/${req.params.id}`;

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