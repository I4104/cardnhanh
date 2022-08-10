const callbackModels = require("../models/callback.models");

var callback = (e) => { }

callback.gachthevip = (req, res) => {
    var data = req.query;
    var status = data.status;
    var amount_real = data.amount_real;
    var amount_recieve = data.amount_recieve;
    var transaction = data.request_id;

    callbackModels.data(transaction, (re) => {
        if (re == -1) {
            return;
        } else {
            if (status == "success") {
                callbackModels.change(trans_id, 1, re.real_amount, amount_real, amount_recieve);
                callbackModels.user_add(re.username, re.real_amount);
            }
            if (status == "wrong_amount") {
                // xử lý thẻ sai mệnh giá
                var pay50 = 0;
                callbackModels.change(trans_id, 2, pay50, amount_real, amount_recieve);
                callbackModels.user_add(re.username, pay50);
            }
            if (status == "fail") {
                callbackModels.change(trans_id, 3, 0, 0, 0);
            }
        }
    });
}

callback.gachthe1s = (req, res) => {
    var data = req.body;

    var data = req.query;
    var status = data.status;
    var amount_real = data.value;
    var amount_recieve = data.amount;
    var transaction = data.request_id;

    callbackModels.data(transaction, (re) => {
        if (re == -1) {
            return;
        } else {
            if (status == "1") {
                callbackModels.change(trans_id, 1, re.real_amount, amount_real, amount_recieve);
                callbackModels.user_add(re.username, re.real_amount);
            }
            if (status == "2") {
                // xử lý thẻ sai mệnh giá
                var pay50 = 0;
                callbackModels.change(trans_id, 2, pay50, amount_real, amount_recieve);
                callbackModels.user_add(re.username, pay50);
            }
            if (status == "3") {
                callbackModels.change(trans_id, 3, 0, 0, 0);
            }
        }
    });
}

module.exports = callback;
