const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const app = express();

app.use(routes);
app.use(express.static('src/public'));
app.set('view engine', 'njk');

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
});

app.listen(5000, () => console.log('server is running port: 5000'));