const express = require('express');
const instructors = require('./controllers/instructors');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect('instructors')
});
routes.get('/instructors', (req, res) => {
    return res.render('instructor/index')
});
routes.get('/instructors/create', (req, res) => {
    return res.render('instructor/create')
});
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/edit', instructors.edit);
routes.post('/instructors', instructors.create);
routes.put('/instructors', instructors.put);

routes.get('/members', (req, res) => {
    return res.send('page members')
});

module.exports = routes;