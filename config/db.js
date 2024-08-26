const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://qvtagoe:wPYUIMCp85buB1Q9@cluster0.vepkgrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // replace with your connection string
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
    const db = client.db('temperatureDB');
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect };
