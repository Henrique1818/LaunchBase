const { date} = require('../../lib/date');

module.exports = {
    index(req, res) {
        const members = data.members;
        return res.render('member/index', { members });
    },
    create(req, res) { 
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] === "") return res.send('Por favor, preencha todos os campos!')
        }
        const { avatar_url, name, email, birth, gender, blood, height, weight } = req.body;

        let id = 1;
        let lastId = data.members[data.members.length - 1].id + 1;

        id = lastId;

        const member = {
            id: Number(id),
            avatar_url,
            name,
            email,
            birth: Date.parse(birth),
            gender,
            blood,
            height,
            weight
        }

        data.members.push(member);
        
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("Erro na escrita do arquivo!");
    
            return res.redirect('/members');
        });
    },
    show(req, res) {
        const { id } = req.params;

        const foundMember = data.members.find(member => member.id == id);

        if(!foundMember) return res.send('member not found!');

        let typeBlood = [];

        switch(foundMember.blood) {
            case 'A1':
                typeBlood.push('A+');
                break;
            case 'A0':
                typeBlood.push('A-');
                break;
            case 'B1':
                typeBlood.push('B+');
                break;
            case 'B0':
                typeBlood.push('B-');
                break;
            case 'AB1':
                typeBlood.push('AB+');
                break;
            case 'AB0':
                typeBlood.push('AB-');
                break;
            case 'O1':
                typeBlood.push('O+');
                break;
            case 'O0':
                typeBlood.push('O-');
                break;
        }
        
        const member = {
            ...foundMember,
            birth: date(foundMember.birth).birthDay,
            blood: typeBlood
        }
            
        return res.render('member/show.njk', { member });
    },
    edit(req, res) {
        const { id } = req.params;

        const foundMember = data.members.find(member => member.id == id);

        if(!foundMember) return res.send('member not found!');

        const member = {
            ...foundMember,
            birth: date(foundMember.birth).iso
        };

        return res.render('member/edit', { member });
    },
    put(req, res) {
        const { id } = req.body;
        let index = 0;

        const foundMember = data.members.find((member, foundIndex) => {
            if(id == member.id) {
                index = foundIndex;

                return true;
            };
        });

        if(!foundMember) return res.send('member not found!');

        const member = {
            ...foundMember,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        };

        data.members[index] = member;

        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Write error!');
            
            return res.redirect(`/members/${id}`);
        });
    },
    delete(req, res) {
        const { id } = req.body;

        const filteredMembers = data.members.filter(function (member, foundIndex) {
            return member.id != id;
        });

        data.members = filteredMembers;

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("Erro na escrita do arquivo!");

            return res.redirect('/members');
        });
    }
}