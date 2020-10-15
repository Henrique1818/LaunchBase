const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('instructors')
});

routes.get('/instructors', (req, res) => {
    return res.render('instructor/index')
});

routes.get('/members', (req, res) => {
    return res.send('page members')
});

module.exports = routes