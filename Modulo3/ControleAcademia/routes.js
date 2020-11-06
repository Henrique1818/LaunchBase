const express = require('express');
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

routes.post('/instructors', (req, res) => {
    let keys = Object.keys(req.body);

    for(key of keys) {

        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    return res.send(req.body)
    
})

routes.get('/members', (req, res) => {
    return res.send('page members')
});

module.exports = routes;