const jwt = require('jsonwebtoken');

exports.homePage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        let urlPopularEvent = `https://exonpproject.herokuapp.com/api/popularEvent`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let popularEvent = await fetch(urlPopularEvent, myInit);
        popularEvent = await popularEvent.json();

        let url = `https://exonpproject.herokuapp.com/api/participant/user/${userId}`;

        let eventInfo = await fetch(url, myInit);
        eventInfo = await eventInfo.json();

        let promises = [];

        await Promise.all(
          eventInfo.map(async (element)=>{
            let eventFetchUrl = `https://exonpproject.herokuapp.com/api/event/${element.eventId}`;
            let eventFetchInfo = await fetch(eventFetchUrl, myInit);
            eventFetchInfo = await eventFetchInfo.json();
            promises.push(eventFetchInfo)
          })
        )
        eventInfo = promises;

        res.status(200).render('home.ejs', {page: "Home", arrow:"hidden", eventInfo, popularEvent})
    } catch {
        res.render('index.ejs');
    }
};

exports.indexPage = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        let url = `https://exonpproject.herokuapp.com/api/user/${userId}`;

        myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();
        res.status(200).redirect('/home/');
    } catch {
        res.status(200).render('index.ejs');
    }
};

