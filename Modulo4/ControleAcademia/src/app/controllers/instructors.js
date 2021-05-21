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
            return res.redirect(`/instructors/${instructor.id}`);
        });        
    },
    show(req, res) {
        // const { id } = req.params;

        // const foundInstructor = data.instructors.find(instructor => instructor.id == id);

        // if(!foundInstructor) return res.send('Instructor not found!');
        
        // const instructor = {
        //     ...foundInstructor,
        //     age: age(foundInstructor.birth),
        //     services: foundInstructor.services.split(","),
        //     created_at: ptBR(foundInstructor.created_at)
        // }
            
        // return res.render('instructor/show.njk', { instructor });

        Instructor.findById(req.params.id, function(instructor) {
            if(!instructor) return res.status(404).json({ error: 'Instructor not found!' });

            instructor.age = age(instructor.birth);
            instructor.services = instructor.services.split(',');

            instructor.created_at = date(instructor.created_at).format;

            return res.render('instructor/show.njk', { instructor })
        });
    },
    edit(req, res) {
        // const { id } = req.params;

        // const foundInstructor = data.instructors.find(instructor => instructor.id == id);

        // if(!foundInstructor) return res.send('Instructor not found!');

        // const instructor = {
        //     ...foundInstructor,
        //     birth: date(foundInstructor.birth).iso,
        //     services: foundInstructor.services.split(",")
        // };

        // return res.render('instructor/edit', { instructor });
    },
    put(req, res) {
        // const { id } = req.body;
        // let index = 0;

        // const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        //     if(id == instructor.id) {
        //         index = foundIndex;

        //         return true;
        //     };
        // });

        // if(!foundInstructor) return res.send('Instructor not found!');

        // const instructor = {
        //     ...foundInstructor,
        //     ...req.body,
        //     birth: Date.parse(req.body.birth),
        //     id: Number(req.body.id)
        // };

        // data.instructors[index] = instructor;

        // fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        //     if(err) return res.send('Write error!')

        //     res.redirect(`/instructors/${id}`);
        // });
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