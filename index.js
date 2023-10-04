const express = require('express')
const app = express()
const userRouter = require('./src/routes/userRoutes')
const config = require('./config.json')
const sequelize = require('./src/database/connection/mysqlServer')
const cors = require('cors')


app.use(express.json())

app.use(cors())
app.use('/' , userRouter)


const runServer = async () => {
    try {
        await sequelize.sync()
        console.log('Connected to the database successfully and syncing tables ...')

    } catch (error) {
        console.log('Could not connect to the database', error)
    }

    try {
        // creating express server
        app.listen( config.SERVER_PORT, function () {
            console.log(`Express Server running on http://localhost:${config.SERVER_PORT}`);
        });
    } catch (error) {
        console.log('failed to start the server')
    }
   
}
runServer()
module.exports = app