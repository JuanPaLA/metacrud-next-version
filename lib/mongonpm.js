const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;

const client = new MongoClient(url);

export default client;