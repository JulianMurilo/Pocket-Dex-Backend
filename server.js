// this port for our sever
const PORT = 3001;
// import express framework
const express = require("express");
// create instance of express so we can define our routes
const app = express();
// import body parser
const bodyParser = require("body-parser");
// import mongoose
const mongoose = require("mongoose");

const cors = require("cors");
/**
 * Handles db connection
 */
async function connectToDb() {
  try {
    // this line of code stop everything until its
    await mongoose.connect(
      ""
    );
    console.log("we connected");
  } catch (error) {
    console.log(error);
    // add handler to deal with db connection error
  }
}

// run the function to connect
connectToDb();

/**
 * Define what data our pizza object will hold
 */
const pokemonSchema = new mongoose.Schema({
  name: [],
  description: [],
  type: [],
  region: [],
});

const pokemonModel = mongoose.model("score", pokemonSchema);

// middleware - does things for us that save time and code
app.use(bodyParser.json());

app.use(cors())
// define a GET request endpoint/API/requests
// CRUD - READ
app.get("/all-pokemon-entries", (req, res) => {
  async function getAllPokemon() {
    try {
      // find will ALWAYS RETURN ARRAY
      const allPokemon = await pokemonModel.find();
      // send back pizza data and status ok
      res.status(200).send({
        message: "All Pokemon Found",
        payload: allPokemon,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getAllPokemon();
});

app.post("/get-pokemon-entry", (req, res) => {
  const data = req.body;

  console.log(data.id);

  async function getPokemon() {
    try {
      // findOne will alwasy return one item or null
      const pokemon = await pokemonModel.findById();

      // send back score data and status ok
      res.status(200).send({
        message: "ok",
        payload: pokemon,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getPokemon();
});

// define a POST request
// CRUD - C
app.post("/add-pokemon-entry", (request, response) => {
  // grab the new score info
  const data = request.body;

  async function makePokemon() {
    try {
      // create a new score in the database
      const newPokemon = await pokemonModel.create({
        name: data.name,
        description: data.description,
        type: data.type,
        region: data.region,
      });

      // send back pizza data and status ok
      response.status(200).send({
        message: "new score",
        payload: newPokemon,
      });
    } catch (e) {
      console.log(e);
      // send back error mesage
      response.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  makePokemon();
});

app.delete("/delete-pokemon-entry", (req, res) => {

  const data = req.body;
  async function deletePokemon() {
    try {
      pokemonModel.findByIdAndDelete({ _id: data._id }).then(() => {
        res.status(200).send({
          msg: 'Deleted Pokemon Entry successfully'
        })
      })
    } catch (e) {
      console.log(e);
      // send back error mesage
      response.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }
  deletePokemon();
});

app.put("/update-pokemon-entry", (request, response) => {

  const data = req.body;
  async function updatePokemon() {
    try {
      pokemonModel.findByIdAndUpdate({ _id: req.params._id }, data).then(() => {
        res.status(200).send({
          msg: 'Updated Pokemon Entry successfully'
        })
      })
    } catch (e) {
      console.log(e);
      // send back error mesage
      response.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }
  updatePokemon();
});


// server listens on port 3001
app.listen(PORT, () => {
  console.log(`Server is running on port:`, PORT);
  console.log(`localhost:${PORT}`);
});
