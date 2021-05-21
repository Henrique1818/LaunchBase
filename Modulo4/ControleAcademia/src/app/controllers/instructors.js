const { age, date } = require('../../lib/date');
const Instructor = require('../models/Instructor');

module.exports = {
    index(req, res) {
        Instructor.all((item) => {
            const instructors = item.map(instructor => {
                return {
                    ...instructor,
                    services: instructor.services.split(',')
                }
            });

            return res.render('instructor/index', { instructors });
        });
    },
    create(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!');
            }
        }

        Instructor.create(req.body, (instructor) => {
            return res.status(201).redirect(`/instructors/${instructor.id}`);
        });        
    },
    show(req, res) {
        Instructor.findById(req.params.id, function(instructor) {
            if(!instructor) return res.status(404).json({ error: 'Instructor not found!' });

            instructor.age = age(instructor.birth);
            instructor.services = instructor.services.split(',');

            instructor.created_at = date(instructor.created_at).format;

            return res.render('instructor/show', { instructor })
        });
    },
    edit(req, res) {
        Instructor.findById(req.params.id, function(instructor) {
            if(!instructor) return res.status(404).json({ error: 'Instructor not found!' });

            instructor.birth = date(instructor.birth).iso;

            return res.render('instructor/edit', { instructor })
        });
    },
    put(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!');
            }
        }

        Instructor.update(req.body, function() {
            return res.status(200).redirect(`/instructors/${req.body.id}`)
        });
    },
    delete(req, res) {
        // const { id } = req.body;

        // const filteredInstructors = data.instructors.filter(instructor => {
        //     return instructor.id != id;
        // });

        // data.instructors = filteredInstructors;

        // fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        //     if(err) return res.send('Write file error!');

        //     return res.redirect('/instructors');
        // });
    }
}