const fs = require('fs');
const data = require('../data.json');
const { age, date, ptBR } = require('../utils/date');

module.exports = {
    async index(req, res) {
        return res.render('instructor/index', {instructors: data.instructors})
    },
    async create(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        let { avatar_url, name, birth, gender, services } = req.body;

        birth = Date.parse(birth);
        const id = Number(data.instructors.length + 1);
        const created_at = Date.now();

        await data.instructors.push({
            id,
            avatar_url,
            name,
            birth,
            gender,
            services,
            created_at
        });

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send('Write file error!') 
        });

        return res.redirect("/instructors");
    },
    async show(req, res) {
        const { id } = req.params;

        const foundInstructor = await data.instructors.find(instructor => instructor.id == id);

        if(!foundInstructor) return res.send('Instructor not found!');
        
        const instructor = {
            ...foundInstructor,
            age: age(foundInstructor.birth),
            services: foundInstructor.services.split(","),
            created_at: ptBR(foundInstructor.created_at)
        }
            
        return res.render('instructor/show.njk', { instructor });
    },
    async edit(req, res) {
        const { id } = req.params;

        const foundInstructor = await data.instructors.find(instructor => instructor.id == id);

        if(!foundInstructor) return res.send('Instructor not found!');

        const instructor = {
            ...foundInstructor,
            birth: date(foundInstructor.birth),
            services: foundInstructor.services.split(",")
        };

        return res.render('instructor/edit', { instructor });
    },
    async put(req, res) {
        const { id } = req.body;
        let index = 0;

        const foundInstructor = await data.instructors.find((instructor, foundIndex) => {
            if(id == instructor.id) {
                index = foundIndex;

                return true;
            };
        });

        if(!foundInstructor) return res.send('Instructor not found!');

        const instructor = {
            ...foundInstructor,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        };

        data.instructors[index] = instructor;

        await fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Write error!')
            res.redirect(`/instructors/${id}`);
        });
    },
    async delete(req, res) {
        const { id } = req.params;

        const filteredInstructors = await data.instructors.filter(instructor => {
            return instructor.id != id;
        });

        data.instructors = filteredInstructors;

        fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
            if(err) return res.send('Write file error!');

            return res.redirect('/instructors');
        });
    }
}