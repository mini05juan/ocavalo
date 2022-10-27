const {Pool} = require("pg")

module.exports = new Pool({

    user: 'user-dw2-128',
    host: 'localhost',
    database: 'bd-dw2-128',
    password: 'user-dw2-128',
    port: 5432

})