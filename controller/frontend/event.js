const jwt = require('jsonwebtoken');

exports.eventPage = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    let url = `http://localhost:3000/api/event`;

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
    
    let gpx = JSON.parse(eventDetail.gps);
    eventDetail.gps = gpx;

    let urlUser = `http://localhost:3000/api/user/${eventDetail.author}`;
    let userInfo = await fetch(urlUser, myInit);
    userInfo = await userInfo.json();

    let author = `${userInfo.firstname} ${userInfo.lastname}`;
    eventDetail.author = author;

    let userStatus = userInfo.status;
    if (userInfo._id == userId) {
      userStatus = "author";
    }
  
    res.render('event/eventdetail.ejs', {page: "Event Details", arrow:"", eventDetail, userStatus});
  } catch {
    res.status(401).render('noaccess.ejs', {page: "Event Details", arrow:""});
  }
};