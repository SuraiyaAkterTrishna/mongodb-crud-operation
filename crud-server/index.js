const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://mongocrud:VqHWip1DJxQuD6yL@cluster0.kpzpgvt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const user = {
    name: "rony",
    color: "yellow"
}
async function run(){
    try{
        await client.connect();
        const userCollection = client.db("mongoCrud").collection("user");
        //load users data from database
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });
        //load single user by id
        app.get('/user/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        });
        //create users
        app.post('/user', async (req, res)=>{
            const newUser = req.body;
            console.log(newUser);

            //add user to database
            const result = await userCollection.insertOne(newUser);
            
            console.log(`A user is inserted with the id: ${result.insertedId}`);
            res.send(result);
        });
        // delete a user 
        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        // update a user
        app.put('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updatedUser = req.body;
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            }
            const result = await userCollection.updateOne(query, updateDoc, options);
            res.send(result);
        })

    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hello from backend");
})

app.listen(port, () => {
    console.log("Node is running on port", port);
})
