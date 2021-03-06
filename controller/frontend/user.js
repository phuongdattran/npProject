global.fetch = require("node-fetch");

exports.signupPage1 = (req, res, next) => {
    res.render('sign/signup1.ejs')
};

exports.signupPage2 = (req, res, next) => {
    const data = req.body;
    res.render('sign/signup2.ejs', {data});
};

exports.signupPage3 = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        let url = `https://exonpproject.herokuapp.com/api/user/last/user`;

        let myInit = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        let userInfo = await fetch(url, myInit);
        userInfo = await userInfo.json();

        res.render('sign/signup3.ejs', {userInfo});
    } catch {
        res.status(401).json({error: 'Unauthenticated Request'});
    }
};

exports.signinPage = (req, res, next) => {
    res.render('sign/signin.ejs');
};

exports.signOut = (req, res, next) => {
    res.clearCookie('token').redirect('/home/');
};

exports.lostPwdPage = (req, res, next) => {
    res.render('members/lostpwd.ejs');
};

exports.changePwdPage = (req, res, next) => {
    const userId = req.query.id;
    res.render('members/changepwd.ejs', {userId});
};