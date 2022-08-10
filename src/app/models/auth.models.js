const crypto = require('crypto');
const database = require('../config/database');

const users = (data) => { };

users.data = (username, result) => {
    database.query("SELECT * FROM users WHERE username = ?", username, (err, data) => {
        if (err) {
            return result(null);
        }
        if (data.length > 0) {
            return result(JSON.stringify(data));
        } else {
            return result(null);
        }
    });
}


users.login = (username, password, result) => {
    const hpasword = crypto.createHash('sha256').update(password).digest('base64');
    database.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, hpasword], (err, data) => {
        if (err) {
            var data = {
                title: "Thất bại",
                message: "Đã xảy ra sự cố trong hệ thống!",
                type: "error",
            };
            return result(data);
        } 
        if (data.length > 0) {
            var data = {
                title: "Thành công",
                message: "Đăng nhập thành công!",
                type: "success",
            };
            return result(data);
        } else {
            var data = {
                title: "Thất bại",
                message: "Tài khoản hoặc mật khẩu không chính xác!",
                type: "error",
            };
            return result(data);
        }
    });
}

users.register = (username, email, password, repassword, result) => {
    if (username == "", email == "", password == "", repassword == "") {
        var data = {
            title: "Thất bại",
            message: "Vui lòng nhập đủ thông tin!",
            type: "error",
        };
        result(data);
        return;
    }
    if (password != repassword) {
        var data = {
            title: "Thất bại",
            message: "Nhập lại mật khẩu không chính xác!",
            type: "error",
        };
        result(data);
        return;
    }
    const hpasword = crypto.createHash('sha256').update(password).digest('base64');
    database.query("INSERT INTO users SET username = ?, email = ?, password = ?", [username, email, hpasword], (err, data) => {
        if (err) {
            var data = {
                title: "Thất bại",
                message: "Đã xảy ra sự cố trong hệ thống!",
                type: "error",
            };
        } else {
            var data = {
                title: "Thành công",
                message: "Đăng kí tài khoản thành công!",
                type: "success",
            };
        }
        result(data);
        return;
    });
}

users.check = (value, result) => {
    database.query("SELECT * FROM users WHERE username = ? OR email = ?", [value, value], (err, data) => {
        if (err) {
            result(-1);
            return;
        }
        if (data.length > 0) {
            result(1);
        } else {
            result(0);
        }
    });
}

module.exports = users;
