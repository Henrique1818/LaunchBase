const fs = require('fs');
const db = require('../../config/db');
const { age, graduation, date } = require('../../lib/dates');

module.exports = {
    index(req, res) {
        // let teachers = data.teacher.map(teacher => {

        //     const newTeacher = {
        //         ...teacher,
        //         occupation: teacher.occupation.split(',')
        //     }

        //     return newTeacher;
        // });
        
        return res.render('teachers/index');
    },
    create(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send('Please, fill all fields!');
        }

        const query = `
            INSERT INTO teachers(
                name,
                avatar_url,
                birth,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;
        
        const values = [
            req.body.name,
            req.body.avatar_url,
            date(req.body.birth).iso,
            req.body.education_level,
            req.body.class_type,
            req.body.subjects_taught,
            date(Date.now()).iso
        ];

        db.query(query, values, (err, result) => {
            if(err) throw res.status(500).json({ error: 'Database Error!' });

            return res.redirect(`/teachers/${result.rows[0].id}/show`);
        });
    },
    show(req, res) {
        // const { id } = req.params;
        // const foundTeacher = data.teacher.find(teacher => { return teacher.id == id });

        // if(!foundTeacher) return res.send('Teacher not found!!');

        // const teachers = {
        //     ...foundTeacher,
        //     birth: age(foundTeacher.birth),
        //     education_level: graduation(foundTeacher.education_level),
        //     occupation: foundTeacher.occupation.split(', '),
        //     created_at: Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
        // }

        // return res.render('teachers/show.njk', { teacher: teachers });
    },
    edit(req, res){
        // const { id } = req.params;
        // const foundTeacher = data.teacher.find(teacher => teacher.id == id);

        // if(!foundTeacher) return res.send('Teacher not found!!');

        // const teacher = {
        //     ...foundTeacher,
        //     birth: date(foundTeacher.birth),
        //     occupation: foundTeacher.occupation.split(",")
        // };

        // return res.render('teachers/edit.njk', { teacher });
    },
    update(req, res) {
        // const { id } = req.body;
        // let index = 0;

        // const foundTeacher = data.teacher.find((teacher, foundIndex) => {
        //     if(id == teacher.id) {
        //         index = foundIndex;

        //         return true;
        //     };
        // });

        // if(!foundTeacher) return res.send('Teacher not found!!');

        // const teacher = {
        //     ...foundTeacher,
        //     ...req.body,
        //     id: Number(req.body.id),
        //     birth:Date.parse(req.body.birth)
        // };

        // data.teacher[index] = teacher;

        // fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        //     if(err) return res.send('Write file error!!');

        //     return res.redirect(`teachers/${id}/show`);
        // });
    },
    delete(req, res) {
        // const { id } = req.body;

        // const filteredTeacher = data.teacher.filter(teacher => {
        //     return teacher.id != id;
        // });

        // data.teacher = filteredTeacher;

        // fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        //     if(err) return res.send('Write file error');

        //     return res.redirect('teachers');
        // });
    }
}