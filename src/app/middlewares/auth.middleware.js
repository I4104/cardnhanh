
const auth = (data) => { }
const users = require("../models/auth.models");

auth.userdata = (req, res) => {
    var data = {
        user: req.session.user,
        hasLogin: req.session.hasLogin,
        isAdmin: req.session.isAdmin,
        userdata: req.session.userdata,
        price: (req.session.userdata != null) ? new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(req.session.userdata.price) : null,
    }
    return data;
}

auth.data = (req, res, next) => {
    users.data(req.session.user, (row) => {
        if (row != null) {
            var row = JSON.parse(row);
            if (row[0]["rank"] == "admin") {
                req.session.isAdmin = true;
            } else {
                req.session.isAdmin = false;
            }
            req.session.userdata = row[0];
        }
    });
    setTimeout(() => {
        next();
    }, 50);
}

auth.isAuth = (req, res, next) => {
    if (req.session.user && req.session.user.username != "") {
        next();
    } else {
        res.redirect("/users/login");
    }
}

auth.isLogin = (req, res, next) => {
    if (req.session.user && req.session.user.username != "") {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = auth;
