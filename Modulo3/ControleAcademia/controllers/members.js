const fs = require('fs');
const data = require('../data.json');
const { date} = require('../utils/date');

module.exports = {
    index(req, res) {
        // const members = data.members.map(member => {
        //     const newmember = {
        //         ...member,
        //         services: member.services.split(',')
        //     }

        //     return newmember;
        // })
        return res.render('member/index')
    },
    create(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") return res.send('Please, fill all fields!');
        }

        birth = Date.parse(req.body.birth);
        
        let id = 1; 
        const lastMember = data.members[data.members.length -1];

        if(lastMember) return id = lastMember.id ++;


        data.members.push({
            ...req.body,
            id,
            birth
        });

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send('Write file error!');
            
            return res.redirect(`/members/${id}`);
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

        console.log(member)

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
            
            res.redirect(`/members/${id}`);
        });
    },
    delete(req, res) {
        const { id } = req.params;

        const filteredmembers = data.members.filter(member => {
            return member.id != id;
        });

        data.members = filteredmembers;

        fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
            if(err) return res.send('Write file error!');

            return res.redirect('/members');
        });
    }
}