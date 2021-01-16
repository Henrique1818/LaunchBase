const express = require('express');
const teachers = require('./controllers/teachers.js');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect('/teachers');
});
routes.get('/teachers', (req, res) => {
    return res.render('teachers/index');
});
routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create');
});
routes.get('/teachers/:id/show', teachers.show);
routes.get('/teachers/:id/edit', teachers.edit);
routes.post('/teachers', teachers.create);
routes.put('/teachers', teachers.update);
routes.delete('/teachers', teachers.delete);

routes.get('/students', (req, res) => {
    return res.send('Page Students');
});

module.exports = routes;