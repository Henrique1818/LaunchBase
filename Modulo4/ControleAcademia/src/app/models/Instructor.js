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
    }
}