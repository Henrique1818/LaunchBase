const { date } = require('../../lib/date');
const db = require('../../config/db');

module.exports = {
    all(callback) {
        db.query('SELECT * FROM instructors', (err, result) => {
            if(err) throw res.status(500).json({'error': 'Database Error!'});
            
            callback(result.rows);            
        });
    },
    create(data, callback) {
        const query = `
            INSERT INTO instructors(
                name,
                avatar_url,
                birth,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;
        
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.gender,
            data.services,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, result) => {
            if(err) throw res.status(500).json({'error': 'Database Error!'});
            
            callback(result.rows[0]);
        });
    },
    findById(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function(err, results) {
            if(err) throw res.status(500).json({'error': 'Database Error!'});

            callback(results.rows[0]);
        });
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                services=($5)
            WHERE id = ($6)
        `;

        const value = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ];

        db.query(query, value, function(err, result) {
            if(err) throw res.status(500).json({'error': 'Database Error!'});

            callback();
        });
    }
}