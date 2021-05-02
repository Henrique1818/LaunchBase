const express = require('express');
const teachers = require('./app/controllers/teachers');
const students = require('./app/controllers/students');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect('/teachers');
});
routes.get('/teachers', teachers.index);
routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create');
});
routes.get('/teachers/:id/show', teachers.show);
routes.get('/teachers/:id/edit', teachers.edit);
routes.post('/teachers', teachers.create);
routes.put('/teachers', teachers.update);
routes.delete('/teachers', teachers.delete);

routes.get('/students', students.index);
routes.get('/students/create', (req, res) => {
    return res.render('students/create');
});
routes.get('/students/:id/show', students.show);
routes.get('/students/:id/edit', students.edit);
routes.post('/students', students.create);
routes.put('/students', students.update);
routes.delete('/students', students.delete);

module.exports = routes;