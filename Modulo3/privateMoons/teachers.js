const fs = require('fs');
const data = require('./data.json');

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

            return res.redirect('/teachers');
        });
    }
}