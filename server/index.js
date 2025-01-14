require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// process.env.S3_BUCKET
// !-----MongoDB Connection Start-----!

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.39hom9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const usersCollections = client.db("BossRestaurant").collection("users");
    const menuCollections = client.db("BossRestaurant").collection("menu");
    const reviewCollections = client.db("BossRestaurant").collection("review");
    const cartsCollections = client.db("BossRestaurant").collection("carts");
    // ! JWT related API
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });
    // ! middlewares
    const verifyToken = (req, res, next) => {
      // console.log("inside verify token", req.headers.authorization);

      // ! Step: 1 -> Check for Authorization Header:
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      //  ! Step: 2 -> Extract the Token:
      const token = req.headers.authorization.split(" ")[1];

      //  ! Step: 3 -> Verify the Token:
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access" });
        }

        // ! Step: 4 -> Attach Decoded Data to the Request:
        req.decoded = decoded;

        // ! Step: 5 -> next() is only called if the token is valid.
        next();
      });
    };
    // ! Use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollections.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // ! Get all users
    app.get("/users", verifyToken, async (req, res) => {
      const result = await usersCollections.find().toArray();
      res.send(result);
    });
    // ! Check admin or not
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const query = { email: email };
      const user = await usersCollections.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });
    // ! Store users information in the database
    app.post("/users", async (req, res) => {
      const user = req.body;
      //  insert user email if user doesn't exists:
      //  you can do this many ways (1. email unique, 2. upsert 3. simple checking✅)
      const query = { email: user.email };
      const existingEmail = await usersCollections.findOne(query);
      if (existingEmail) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await usersCollections.insertOne(user);
      res.send(result);
    });
    // ! Update User Role
    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await usersCollections.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );
    // ! Delete User
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollections.deleteOne(query);
      res.send(result);
    });
    // ! Get all menu items
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });
    app.get("/menu/:category", async (req, res) => {
      const category = req.params.category;
      const query = { category: category };
      const result = await menuCollections.find(query).toArray();
      res.send(result);
    });
    app.get("/review", async (req, res) => {
      const result = await reviewCollections.find().toArray();
      res.send(result);
    });
    //! Get all cart items
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartsCollections.find(query).toArray();
      res.send(result);
    });
    //! Insert a item into CartCollection
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartsCollections.insertOne(cartItem);
      res.send(result);
    });
    // ! Delete a item form cart
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollections.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// !-----MongoDB Connection End-------!
app.get("/", (req, res) => {
  res.send("Welcome to Bistro Boss Restaurant API");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
