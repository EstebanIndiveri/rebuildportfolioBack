require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config({path: 'variables.env'})

module.exports={
    user: `${process.env.USER_MAIL}`,
    pass: `${process.env.USER_PASS}`,
    host: `${process.env.USER_HOST}`,

    port: 587,
}