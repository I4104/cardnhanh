const path = require('path')
const express = require('express');
const session = require('express-session')

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const handlebars = require('express-handlebars');
const route = require('./routers');

// Init database
const database = require('./app/config/database');
database.connect();

const app = express();
const port = 3000;

console.clear();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(session({
    secret: "I4104_SESSION_KEY",
    resave: true,
    saveUninitialized: true,
}));
//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Config Handlebars
app.engine('I4104', handlebars.engine({
    extname: '.I4104'
}));
app.set('view engine', 'I4104');
app.set('views', path.join(__dirname, './resource/views'));

// call routers
route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});