'use strict';

const home = require("./home.routers.js");
const history = require("./history.routers.js");
const auth = require("./auth.routers.js");
const callback = require("./callback.routers.js");
const api = require("./api.routers.js");

function route(app) {
    app.use('/api', api);
    app.use('/callback', callback);
    app.use('/history', history);
    app.use('/users', auth);
    app.use('/', home);
};

module.exports = route;