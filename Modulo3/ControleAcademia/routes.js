const express = require('express');
const instructors = require('./controllers/instructors');
const members = require('./controllers/members');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect('instructors')
});
routes.get('/instructors', instructors.index);
routes.get('/instructors/create', (req, res) => {
    return res.render('instructor/create')
});
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/edit', instructors.edit);
routes.post('/instructors', instructors.create);
routes.put('/instructors', instructors.put);
routes.delete('/instructors', instructors.delete);

routes.get('/members', members.index);
routes.get('/members/create', (req, res) => {
    return res.render('member/create')
});
routes.get('/members/:id', members.show);
routes.get('/members/:id/edit', members.edit);
routes.post('/members', members.create);
routes.put('/members', members.put);
routes.delete('/members', members.delete);

module.exports = routes;