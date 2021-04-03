const fs = require('fs');
const data = require('../../data.json');
const { date, grade, age } = require('../utils/dates.js');

module.exports = {
    index(req, res) {
       const students = data.students.map(student => {
           const schoolYear = {
               ...student,
               school_year: grade(student.school_year)
           }

           return schoolYear;
       })

        return res.render('students/index', { students });
    },
    create(req, res) {
        let { avatar_url, name, birth, email, school_year, weekly_workload } = req.body;

        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send('Please, fill all fields!');
        }

        let id = 1;
        let lastId = data.students[data.students.length - 1].id + 1;

        id = lastId;

        const newStudent = {
            id: Number(id),
            avatar_url,
            name,
            birth: Date.parse(birth),
            email,
            school_year,
            weekly_workload
        }

        data.students.push(newStudent);

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
            if(err) return res.send("Erro na escrita do arquivo!");
            
            return res.redirect('/students');
        });
    },
    show(req, res) {
        const { id } = req.params;
        const foundStudent = data.students.find(student => student.id == id);

        if(!foundStudent) return res.send('student not found!!');

        const students = {
            ...foundStudent,
            birth: age(foundStudent.birth),
            school_year: grade(foundStudent.school_year)     
        }

        return res.render('students/show.njk', { student: students });
    },
    edit(req, res){
        const { id } = req.params;
        const foundStudent = data.students.find(student => student.id == id);

        if(!foundStudent) return res.send('student not found!!');

        const student = {
            ...foundStudent,
            birth: date(foundStudent.birth).iso
        };

        return res.render('students/edit.njk', { student });
    },
    update(req, res) {
        const { id } = req.body;
        let index = 0;

        const foundStudent = data.students.find((student, foundIndex) => {
            if(id == student.id) {
                index = foundIndex;

                return true;
            };
        });

        if(!foundStudent) return res.send('student not found!!');

        const student = {
            ...foundStudent,
            ...req.body,
            id: Number(req.body.id),
            birth:Date.parse(req.body.birth)
        };

        data.students[index] = student;

        fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
            if(err) return res.send('Write file error!!');

            return res.redirect(`students/${id}/show`);
        });
    },
    delete(req, res) {
        const { id } = req.body;

        const filteredstudent = data.students.filter(student => {
            return student.id != id;
        });

        data.student = filteredstudent;

        fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
            if(err) return res.send('Write file error');

            return res.redirect('/students');
        });
    }
}