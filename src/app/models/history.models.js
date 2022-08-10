const database = require('../config/database');

const data = (data) => { };

data.get_balance = (userdata, result) => {
    database.query("SELECT * FROM balance WHERE username = ?", userdata.username, (err, data) => {
        var row = [];
        data.forEach(item => {
            var date_ob = new Date(item.date);
            var date = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var hours = date_ob.getHours();
            var minutes = ("0" + (date_ob.getMinutes())).slice(-2);
            const time = date + "/" + month + "/" + year + " " + hours + ":" + minutes;
            item.time = time;
            row.push(item);
        });

        if (err) {
            result(-1);
        } else {
            result(row);
        }
    });
}

data.get_withdraw = (userdata, result) => {
    database.query("SELECT * FROM withdraw WHERE username = ?", userdata.username, (err, data) => {
        var row = [];
        data.forEach(item => {
            var status = "";
            switch (item.status) {
                case 0:
                    status = '<span class="badge badge-warning">Chờ duyệt</span>';
                    break;
                case 1:
                    status = '<span class="badge badge-success">Thành công</span>';
                    break;
                case 2:
                    status = '<span class="badge badge-danger">Thất bại</span>';
                    break;
            }
            var date_ob = new Date(item.date);
            var date = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var hours = date_ob.getHours();
            var minutes = date_ob.getMinutes();
            const time = date + "/" + month + "/" + year + " " + hours + ":" + minutes;
            item.time = time;
            item.status = status;
            row.push(item);
        });

        if (err) {
            result(-1);
        } else {
            result(row);
        }
    });
}

data.get_card = (userdata, result) => {
    database.query("SELECT * FROM card WHERE username = ?", userdata.username, (err, data) => {
        var row = [];
        data.forEach(item => {
            var status = "";
            switch (item.status) {
                case 0:
                    status = '<span class="badge badge-warning">Chờ duyệt</span>';
                    break;
                case 1:
                    status = '<span class="badge badge-success">Thành công</span>';
                    break;
                case 2:
                    status = '<span class="badge badge-danger">Thất bại</span>';
                    break;
                case 3:
                    status = '<span class="badge badge-info">Sai mệnh giá</span>';
                    break;
            }
            var date_ob = new Date(item.date);
            var date = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var hours = date_ob.getHours();
            var minutes = date_ob.getMinutes();
            const time = date + "/" + month + "/" + year + " " + hours + ":" + minutes;
            item.time = time;
            item.status = status;
            row.push(item);
        });
        
        if (err) {
            result(-1);
        } else {
            result(row);
        }
    });
}

data.get_card_by_date = (userdata, date, result) => {
    database.query("SELECT * FROM card WHERE username = ? AND date = ?", [userdata.username, date], (err, data) => {
        var row = [];
        data.forEach(item => {
            var status = "";
            switch (item.status) {
                case 0:
                    status = '<span class="badge badge-warning">Chờ duyệt</span>';
                    break;
                case 1:
                    status = '<span class="badge badge-success">Thành công</span>';
                    break;
                case 2:
                    status = '<span class="badge badge-danger">Thất bại</span>';
                    break;
                case 3:
                    status = '<span class="badge badge-info">Sai mệnh giá</span>';
                    break;
            }
            var date_ob = new Date(item.date);
            var date = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var hours = date_ob.getHours();
            var minutes = date_ob.getMinutes();
            const time = date + "/" + month + "/" + year + " " + hours + ":" + minutes;
            item.time = time;
            item.status = status;
            row.push(item);
        });

        if (err) {
            result(-1);
        } else {
            result(row);
        }
    });
}
module.exports = data;
