const jwt = require('jsonwebtoken');

exports.homePage = (req, res, next) => {
    res.render('home.ejs', {page: "Home", arrow:"hidden"})
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

