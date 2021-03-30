const fs = require('fs');
const data = require('../data.json');
const { age, date, ptBR } = require('../utils/date');

module.exports = {
    async index(req, res) {
        // const members = data.members.map(member => {
        //     const newmember = {
        //         ...member,
        //         services: member.services.split(',')
        //     }

        //     return newmember;
        // })
        return res.render('member/index')
    },
    async create(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") return res.send('Please, fill all fields!');
        }

        birth = Date.parse(req.body.birth);
        
        let id = 1; 
        const lastMember = data.members[data.members.length -1];

        if(lastMember) return id = lastMember.id ++;


        await data.members.push({
            ...req.body,
            id,
            birth
        });

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send('Write file error!');
        });

        return res.redirect("/members");
    },
    async show(req, res) {
        const { id } = req.params;

        const foundmember = await data.members.find(member => member.id == id);

        if(!foundmember) return res.send('member not found!');
        
        const member = {
            ...foundmember,
            age: age(foundmember.birth),
            services: foundmember.services.split(","),
            created_at: ptBR(foundmember.created_at)
        }
            
        return res.render('member/show.njk', { member });
    },
    async edit(req, res) {
        const { id } = req.params;

        const foundmember = await data.members.find(member => member.id == id);

        if(!foundmember) return res.send('member not found!');

        const member = {
            ...foundmember,
            birth: date(foundmember.birth),
            services: foundmember.services.split(",")
        };

        return res.render('member/edit', { member });
    },
    async put(req, res) {
        const { id } = req.body;
        let index = 0;

        const foundmember = await data.members.find((member, foundIndex) => {
            if(id == member.id) {
                index = foundIndex;

                return true;
            };
        });

        if(!foundmember) return res.send('member not found!');

        const member = {
            ...foundmember,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        };

        data.members[index] = member;

        await fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Write error!')
            res.redirect(`/members/${id}`);
        });
    },
    async delete(req, res) {
        const { id } = req.params;

        const filteredmembers = await data.members.filter(member => {
            return member.id != id;
        });

        data.members = filteredmembers;

        fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
            if(err) return res.send('Write file error!');

            return res.redirect('/members');
        });
    }
}