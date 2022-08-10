const database = require('../config/database');

var axios = require('axios');
var FormData = require('form-data');
var crypto = require('crypto');
const qs = require('qs')

var card = (e) => { }

card.gachthe1s = (req, res, userdata) => {
    if (req.session.userdata == null) {
        var _return = {
            title: "Thất bại",
            message: "Vui lòng đăng nhập trước",
            type: "error"
        }
        return res.json(_return);
    }
    var data = req.body;
    trans_id = Math.floor(Date.now() / 1000);
    real_amount = 0;

    var PartnerID = "90332921512";
    var PartnerKey = "4d7941ba10cef3eb55e4b26c8a7ab339";

    data.partner_id = PartnerID;
    data.sign = crypto.createHash('md5').update(PartnerKey + data.pin + data.serial).digest("hex");;
    console.log(data.sign);

    var fields = {
        telco: data.type,
        code: data.pin,
        serial: data.serial,
        amount: data.amount,
        request_id: trans_id,
        partner_id: data.partner_id,
        sign: data.sign,
        command: "charging"
    };

    const query = qs.stringify(fields);

    var config = {
        method: 'POST',
        url: 'https://gachthe1s.com/chargingws/v2',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: query
    };

    axios(config).then(function (response) {
        var _return = "";
        if (response.data.status != "99") {
            _return = {
                title: "Thất bại",
                message: response.data.message,
                type: "error"
            }
        } else {
            database.query("INSERT INTO card SET username = ?, trans_id = ?, apikey = ?, serial = ?, pin = ?, type = ?, amount = ?, real_amount = ?, receive_amount = ?, callback_amount = 0, status = 0", [userdata.username, trans_id, 'website', data.serial, data.pin, data.type, data.amount, real_amount, data.amount], (err, data) => { });
            console.log("INSERT INTO card SET username = ?, trans_id = ?, apikey = ?, serial = ?, pin = ?, type = ?, amount = ?, real_amount = ?, receive_amount = ?, callback_amount = 0, status = 0", [userdata.username, trans_id, 'website', data.serial, data.pin, data.type, data.amount, real_amount, data.amount]);
            _return = {
                title: "Thành công",
                message: "Thẻ đã được gửi đi, vui lòng chờ duyệt!",
                type: "success"
            }
        }
        res.json(_return);
    }).catch(function (error) {
        console.log(error);
        res.json(-1);
    });
}

card.gachthevip = (req, res, userdata) => {
    if (req.session.userdata == null) {
        var _return = {
            title: "Thất bại",
            message: "Vui lòng đăng nhập trước",
            type: "error"
        }
        return res.json(_return);
    }
    var data = req.body;
    trans_id = Math.floor(Date.now() / 1000);
    real_amount = 0;
    var config = {
        method: 'GET',
        url: 'https://gachthevip.net/api/send-card?request_id=' + trans_id + '&telco=' + data.type + '&pin=' + data.pin + '&serial=' + data.serial + '&amount=' + data.amount + '',
        headers: {
            'partner_id': '8510214419',
            'partner_key': '62024b336c842e8d9ed8f05757863c43'
        },
    };

    axios(config).then(function (response) {
        var _return = "";
        if (response.data.status != "success") {
            _return  = {
                title: "Thất bại",
                message: response.data.message,
                type: "error"
            }
        } else {
            //$conn -> query(" history_card SET username = '{$username}', trans_id = '{$data["request_id"]}', apikey = 'website', `serial` = '{$serial}', `pin` = '{$pin}', `type_card` = '{$type}', `count_card` = '{$amount}', `cash_nhan` = '{$real_amount}'");
            database.query("INSERT INTO card SET username = ?, trans_id = ?, apikey = ?, serial = ?, pin = ?, type = ?, amount = ?, real_amount = ?, receive_amount = ?, callback_amount = 0, status = 0", [userdata.username, trans_id, 'website', data.serial, data.pin, data.type, data.amount, real_amount, data.amount], (err, data) => { });
            console.log("INSERT INTO card SET username = ?, trans_id = ?, apikey = ?, serial = ?, pin = ?, type = ?, amount = ?, real_amount = ?, receive_amount = ?, callback_amount = 0, status = 0", [userdata.username, trans_id, 'website', data.serial, data.pin, data.type, data.amount, real_amount, data.amount]);
            _return = {
                title: "Thành công",
                message: "Thẻ đã được gửi đi, vui lòng chờ duyệt!",
                type: "success"
            }
        }
        res.json(_return);
    }).catch(function (error) {
        console.log(error);
        res.json(-1);
    });
}

module.exports = card;
