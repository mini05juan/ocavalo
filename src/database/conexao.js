const {Pool} = require("pg")

module.exports = new Pool({

        connectionString: process.env.URL,
        ssl: {

            requestCert:true,
            rejectUnauthorized:false

        }

})