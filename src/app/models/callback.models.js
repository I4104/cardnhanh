const crypto = require('crypto');
const database = require('../config/database');

const callback = (data) => { };

callback.data = (trans_id, result) => {
    database.query("SELECT * FROM card WHERE trans_id = ?", trans_id, (err, data) => {
        if (err) {
            return result(-1);
        }
        if (data.length > 0) {
            return result(data);
        } else {
            return result(-1);
        }
    });
}

callback.change = (trans_id, status, real_amount, receive_amount, callback_amount) => {
    database.query("UPDATE card SET status = ?, real_amount = ?, receive_amount = ?, callback_amount = ? WHERE trans_id = ?", [status, receive_amount, real_amount, callback_amount, trans_id], (err, data) => { });
}

callback.user_add = (username, price) => {
    database.query("UPDATE users SET price = price + ? WHERE username = ?", [price, username], (err, data) => { });
}


module.exports = callback;
