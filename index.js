const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4321;

// Middleware
app.use(express.json());
app.use(cors());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jrqljyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const courseCollection = client.db("skillExpress").collection("course");
    const categoryCollection = client.db("skillExpress").collection("category");
    const cartCollection = client.db("skillExpress").collection("cart");

    // course api
    app.get("/course", async (req, res) => {
        const result = await courseCollection.find().toArray();
        res.send(result);
    });

    app.post("/course", async (req, res) => {
        const course = req.body;
        const result = await courseCollection.insertOne(course);
        res.send(result);
    })
    app.delete("/course/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await courseCollection.deleteOne(query);
        res.send(result);
    })

    // category api
    app.get("/category", async (req, res) => {
        const result = await categoryCollection.find().toArray();
        res.send(result);
    });

    // cart api
    app.post("/cart", async (req, res) => {
        const course = req.body;
        const result = await cartCollection.insertOne(course);
        res.send(result);
    });

    app.get("/cart", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("skillup express is running")
})

app.listen(port, () => {
    console.log(`skillup express is running through port ${port}`);
})