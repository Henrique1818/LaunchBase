const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils/date');

module.exports = {
    create(req, res) {
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

        data.instructors.push({
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
    show(req, res) {
        const { id } = req.params;

        const foundInstructor = data.instructors.find(instructor => instructor.id == id);

        if(!foundInstructor) return res.send('Instructor not found!');
        
        const instructor = {
            ...foundInstructor,
            age: age(foundInstructor.birth),
            services: foundInstructor.services.split(","),
            created_at: Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
        }
            
        return res.render('instructor/show.njk', { instructor });
    },
    edit(req, res) {
        const { id } = req.params;

        const foundInstructor = data.instructors.find(instructor => instructor.id == id);

        if(!foundInstructor) return res.send('Instructor not found!');

        const instructor = {
            ...foundInstructor,
            birth: date(foundInstructor.birth),
            services: foundInstructor.services.split(",")
        }

        return res.render('instructor/edit', { instructor })
    }
}