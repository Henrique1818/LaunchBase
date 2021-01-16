const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(methodOverride('_method'));
app.use(routes);

app.set('view engine', 'njk');

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
});

app.listen(5000, () => console.log('server is running port: 5000'));