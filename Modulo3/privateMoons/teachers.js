const fs = require('fs');
const data = require('./data.json');
const { age, graduation, date } = require('./utils');

module.exports = {
    create(req, res) {
        let { avatar_url, name, birth, education_level, class_type, occupation } = req.body;

        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send('Please, fill all fields!');
        }

        let id = Number(data.teacher.length + 1);
        const created_at = Date.now();
        birth = Date.parse(birth);

        data.teacher.push({
            id,
            avatar_url,
            name,
            birth,
            education_level,
            class_type,
            occupation,
            created_at
        });

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
            if(err) {
                return res.send('Write file error!');
            }
        });
        return res.redirect('/teachers');
    },
    show(req, res) {
        const { id } = req.params;
        const foundTeacher = data.teacher.find(teacher => { return teacher.id == id });

        if(!foundTeacher) return res.send('Teacher not found!!');

        const teachers = {
            ...foundTeacher,
            birth: age(foundTeacher.birth),
            education_level: graduation(foundTeacher.education_level),
            occupation: foundTeacher.occupation.split(', '),
            created_at: Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
        }

        return res.render('teachers/show.njk', { teacher: teachers });
    },
    edit(req, res){
        const { id } = req.params;
        const foundTeacher = data.teacher.find(teacher => teacher.id == id);

        if(!foundTeacher) return res.send('Teacher not found!!');

        const teacher = {
            ...foundTeacher,
            birth: date(foundTeacher.birth),
            occupation: foundTeacher.occupation.split(",")
        };

        return res.render('teachers/edit.njk', { teacher });
    }
}