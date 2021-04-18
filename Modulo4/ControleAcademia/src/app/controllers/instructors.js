const { age, date, ptBR } = require('../../lib/date');
const db = require('../../config/db');

module.exports = {
    index(req, res) {
        // const instructors = data.instructors.map(instructor => {
        //     const newInstructor = {
        //         ...instructor,
        //         services: instructor.services.split(',')
        //     }

        //     return newInstructor;
        // })
        // return res.render('instructor/index', {instructors})

        return res.render('instructor/index');
    },
    create(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!');
            }
        }

        const query = `
            INSERT INTO instructors(
                name,
                avatar_url,
                birth,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;
        
        const values = [
            req.body.name,
            req.body.avatar_url,
            date(req.body.birth).iso,
            req.body.gender,
            req.body.services,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, result) => {
            if(err) throw res.status(500).json({'error': 'Database Error!'});
            
            return res.redirect(`/instructors/${result.rows[0].id}`);
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