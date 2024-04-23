const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_CONNECTION_URI;
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
}
connectDB();
const db = client.db("productManagement");

module.exports = { db };