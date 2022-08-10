const history = require("../models/history.models");
const authMiddleware = require('../middlewares/auth.middleware');

class HistoryController {

	index(req, res) {
		return res.render("api", authMiddleware.userdata(req, res));
	}

	get_api(req, res) {
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