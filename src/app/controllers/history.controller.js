const history = require("../models/history.models");
const authMiddleware = require('../middlewares/auth.middleware');

class HistoryController {

	index(req, res) {
		return res.render("history", authMiddleware.userdata(req, res));
	}

	show_withdraw(req, res) {
		return res.render("withdraw", authMiddleware.userdata(req, res));
    }

	balance(req, res) {
		return res.render("balance", authMiddleware.userdata(req, res));
    }

	get_balance(req, res) {
		if (req.session.userdata == null) {
			return res.redirect("/users/logout");
		}
		history.get_balance(req.session.userdata, (data) => {
			var html = "";
			if (data.length > 0 || data != -1) {
				data.forEach(item => {
					html += `
						<tr>
							<td>`+ item.note + `</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.price) + `</td>
							<td>`+ item.old + `</td>
							<td>`+ item.new + `</td>
							<td>`+ item.time + `</td>
						</tr>
	
					`;
				});
			}
			return res.send(html);
		});
    }

	create_withdraw(req, res) {
		if (req.session.userdata == null) {
			return res.redirect("/users/logout");
		}
    }

	withdraw(req, res) {
		if (req.session.userdata == null) {
			return res.redirect("/users/logout");
		}
		history.get_withdraw(req.session.userdata, (data) => {
			var html = "";
			if (data.length > 0 || data != -1) {
				data.forEach(item => {
					html += `
						<tr>
							<td>`+ item.trans_id + `</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.price) + `</td>
							<td>`+ item.bank + `</td>
							<td>`+ item.note + `</td>
							<td>`+ item.status + `</td>
							<td>`+ item.time + `</td>
						</tr>
	
					`;
				});
			}
			return res.send(html);
		});
	}

	card(req, res) {
		if (req.session.userdata == null) {
			return res.redirect("/users/logout");
        }
		history.get_card(req.session.userdata, (data) => {
			var html = "";
			if (data.length > 0 || data != -1) {
				data.forEach(item => {
					html += `
						<tr>
							<td>`+ item.trans_id + `</td>
							<td>`+ item.type + `</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.amount) +`</td>
							<td>`+ item.serial +`</td>
							<td>`+ item.pin +`</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.real_amount) +`</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.receive_amount) +`</td>
							<td>`+ item.status +`</td>
							<td>`+ item.time +`</td>
						</tr>
	
					`;
				});
			}
			return res.send(html);
		});
	}

	card_by_date(req, res) {
		if (req.session.userdata == null) {
			return res.redirect("/users/logout");
		}
		var date_ob = "";
		if (req.body.date == null || req.body.date == "") {
			date_ob = new Date();
		} else {
			date_ob = new Date(res.query.date);
        }
		var date = ("0" + date_ob.getDate()).slice(-2);
		var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		var year = date_ob.getFullYear();
		var time = year + "-" + month + "-" + date;
		history.get_card_by_date(req.session.userdata, time, (data) => {
			var html = "";
			if (data.length > 0 || data != -1) {
				data.forEach(item => {
					html += `
						<tr>
							<td>`+ item.trans_id + `</td>
							<td>`+ item.type + `</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.amount) + `</td>
							<td>`+ item.serial + `</td>
							<td>`+ item.pin + `</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.real_amount) + `</td>
							<td>`+ new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(item.receive_amount) + `</td>
							<td>`+ item.status + `</td>
							<td>`+ item.time + `</td>
						</tr>
	
					`;
				});
			}
			return res.send(html);
		});
	}
}

module.exports = new HistoryController;