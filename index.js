require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');

// Import http library
const http = require("http")
const path = require('path');
// use env variable to define tcp/ip port with a default
const PORT = process.env.PORT || 8080
//create our server object
const server = http.createServer()
// We define a function that runs in response a request event
// server.on("request", (request, response) => {
//     // handle request based on method then URL
//     response.statusCode = 200
//     response.write("Hello World - Render api test")
//     response.end()
// })
// // get the server to start listening
// server.listen(PORT, err => {
//     // error checking
//     err ? console.error(err) : console.log(`listening on port ${PORT}`)
// })

//-----------------------------------------
// const PORT = process.env.PORT || 5000;
// const DB_URL = `mongodb+srv://user:user@cluster0.u9gwzwv.mongodb.net/?retryWrites=true&w=majority`;
//
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;
const LOCAL_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

const start = async  () => {
    try {
        await sequelize.authenticate(); // todo
        await sequelize.sync({ alter: true }); // todo
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        // app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log('START ERROR!!!', e);
    }
};

start();
// app.use(express.static('static'));
// app.use(fileUpload({ }));
// app.use('/api', router);

// async function startApp() {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL || LOCAL_URL);
//     app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
//   } catch (e) {
//     console.log(e);
//   }
// }

// startApp();
