const users = require("../models/auth.models");
const authMiddleware = require('../middlewares/auth.middleware');

class AuthController {

    profile(req, res) {
        return res.render("auth/profile", authMiddleware.userdata(req, res));
	}

	login(req, res) {
		return res.render("auth/login");
    }

    logout(req, res) {
        req.session.user = null;
        req.session.hasLogin = null;
        req.session.isAdmin = null;
        req.session.userdata = null;
        return res.redirect("/users/login");
    }

	register(req, res) {
		return res.render("auth/register");
	}

	create(req, res) {
        const { username, email, password, repassword } = req.body;
        
        users.check(username, (re) => {
            if (re != 0) {
                var data = {
                    title: "Thất bại",
                    message: "Tài khoản đã được sử dụng!",
                    type: "error",
                };
                return res.send(data);
            } else {
                users.check(email, (re) => {
                    if (re != 0) {
                        var data = {
                            title: "Thất bại",
                            message: "Email đã được sử dụng!",
                            type: "error",
                        };
                        return res.send(data);
                    } else {
                        users.register(username, email, password, repassword, (data) => {
                            if (data.type == "success") {
                                req.session.user = username;
                                req.session.hasLogin = true;
                            }
                            return res.send(data);
                        });
                    }
                });
            }
        });
    }

    auth(req, res) {
        const { username, password } = req.body;
        users.login(username, password, (data) => {
            if (data.type == "success") {
                req.session.user = username;
                req.session.hasLogin = true;
            }
            return res.send(data);
        });
    }
}

module.exports = new AuthController;