const jwt = require('jsonwebtoken');

exports.homePage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/participant/user/${userId}`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let eventInfo = await fetch(url, myInit);
        eventInfo = await eventInfo.json();

        let promises = [];

        await Promise.all(
          eventInfo.map(async (element)=>{
            let eventFetchUrl = `http://localhost:3000/api/event/${element.eventId}`;
            let eventFetchInfo = await fetch(eventFetchUrl, myInit);
            eventFetchInfo = await eventFetchInfo.json();
            promises.push(eventFetchInfo)
          })
        )
        eventInfo = promises;

        res.render('home.ejs', {page: "Home", arrow:"hidden", eventInfo})
    } catch {
        res.render('index.ejs');
    }
};

exports.indexPage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        let url = `http://localhost:3000/api/user/${userId}`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();
        res.redirect('/home/');
    } catch {
        res.render('index.ejs');
    }
};

