const home = require("../models/home.models");
const authMiddleware = require('../middlewares/auth.middleware');

class HomeController {

	index(req, res) {
		return res.render("home", authMiddleware.userdata(req, res));
	}

	postCard(req, res) {
		if (req.session.userdata == null) {
			var _return = {
				title: "Thất bại",
				message: "Vui lòng đăng nhập trước",
				type: "error"
			}
			return res.json(_return);
		}
		return home.gachthevip(req, res, req.session.userdata);
    }

}

module.exports = new HomeController;