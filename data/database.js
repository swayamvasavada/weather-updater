const mongodb = require('mongodb');
const dotenv = require('dotenv').config();

const MongoClient = mongodb.MongoClient;
let database;
let monogUrl = process.env.MONGO_URL;


async function connect() {
    const client = await MongoClient.connect(monogUrl);
    database = client.db('weather_updater_bot');
}

function getDb() {
    if (!database) {
        throw {
            message: "Database connection failed!"
        };
    }
    return database;
}

module.exports = {
    connectToDatabase: connect,
    getDb: getDb
};