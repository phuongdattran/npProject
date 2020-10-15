exports.signupPage1 = (req, res, next) => {
    res.render('sign/signup1.ejs')
};

exports.signupPage2 = (req, res, next) => {
    const data = req.body;
    res.render('sign/signup2.ejs', {data});
};

exports.signupPage3 = (req, res, next) => {
    res.render('sign/signup3.ejs');
};

exports.signinPage = (req, res, next) => {
    res.render('sign/signin.ejs');
};

exports.myProfilePage = (req, res, next) => {
    res.render('myprofile/myprofile.ejs');
};