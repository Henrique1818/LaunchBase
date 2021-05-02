const { Pool } = require('pg');

module.exports = new Pool({
    user: "launchbase",
    password: "launchbase",
    host: "localhost",
    port: 5432,
    database: "postgres"
});