const mongoose = require('mongoose');


async function connectDatabase() {

    try {
        // console.log(config.DB_CONNECTION_URL)

        // await mongoose.connect("mongodb+srv://thapadilasa71:thapadilasa71@cluster0.j4vmbbb.mongodb.net/facebookdb?appName=mongosh+1.7.1");
    await mongoose.connect("mongodb+srv://thapadilasa71:thapadilasa71@cluster0.j4vmbbb.mongodb.net/?retryWrites=true&w=majority")
        console.log('Connected to database')

    } catch(err) {
        console.log(err)
        console.error('Could not connect to the database');
    }
}

module.exports = connectDatabase;