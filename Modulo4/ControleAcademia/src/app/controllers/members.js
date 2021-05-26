const { date } = require('../../lib/date');
const Member = require('../models/Member');

module.exports = {
    index(req, res) {
        Member.all((members) => {
            return res.render('member/index', { members });
        });
    },
    create(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!');
            }
        }

        Member.create(req.body, (member) => {
            return res.status(201).redirect(`/members/${member.id}`);
        });        
    },
    show(req, res) {
        Member.findById(req.params.id, function(member) {
            if(!member) return res.status(404).json({ error: 'Member not found!' });
            
            member.birth = date(member.birth).birthDay;
            member.created_at = date(member.created_at).format;

            return res.render('member/show', { member })
        });
    },
    edit(req, res) {
        Member.findById(req.params.id, function(member) {
            if(!member) return res.status(404).json({ error: 'Member not found!' });

            member.birth = date(member.birth).iso;

            return res.render('member/edit', { member })
        });
    },
    put(req, res) {
        let keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!');
            }
        }

        Member.update(req.body, function() {
            return res.status(200).redirect(`/members/${req.body.id}`)
        });
    },
    delete(req, res) {
        Member.delete(req.body.id, function() {
            return res.status(200).redirect('/members');
        })
    }
}