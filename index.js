const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.port || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cwbwt8c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

async function run() {
    try {
        const coffeeCollection = client.db('SJInnovation').collection('products');

        app.get('/coffees', async (req, res) => {
            const query = {};
            const result = await coffeeCollection.find(query).toArray();
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(error => console.log(error));

app.get('/', async (req, res) => {
    res.send('server is running');
})

app.listen(port, () => console.log(`Server running on ${port}`))