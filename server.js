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
  name: { type: Number, required: false }, // required =false
  description: [],
  img
});

const scoreModel = mongoose.model("score", pokemonSchema);

// middleware - does things for us that save time and code
app.use(bodyParser.json());

app.use(cors())
// define a GET request endpoint/API/requests
// CRUD - READ
app.get("/leaderboard", (req, res) => {
  async function getAllScores() {
    try {
      // find will ALWAYS RETURN ARRAY
      const allScores = await scoreModel.find();
      // send back pizza data and status ok
      res.status(200).send({
        message: "Scoreboard",
        payload: allScores,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getAllScores();
});

app.post("/get-score", (req, res) => {
  const data = req.body;

  console.log(data.id);

  async function getScore() {
    try {
      // findOne will alwasy return one item or null
      const score = await scoreModel.findById();

      // send back score data and status ok
      res.status(200).send({
        message: "ok",
        payload: score,
      });
    } catch (e) {
      // send back error mesage
      res.status(400).send({
        message: "error happened",
        data: e,
      });
    }
  }

  getScore();
});

// define a POST request
// CRUD - C
app.post("/add-score", (request, response) => {
  // grab the new score info
  const data = request.body;

  async function makeScore() {
    try {
      // create a new score in the database
      const newScore = await scoreModel.create({
        score: data.score,
        name: data.name,
      });

      // send back pizza data and status ok
      response.status(200).send({
        message: "new score",
        payload: newScore,
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

  makeScore();
});

app.delete("/delete-score", (req, res) => {

  const data = req.body;
  async function deleteScore() {
    try {
      scoreModel.findByIdAndDelete({ _id: data._id }).then(() => {
        res.status(200).send({
          msg: 'Deleted Score'
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
  deleteScore();
});

app.put("/update-score", (request, response) => {

  const data = req.body;
  async function updateScore() {
    try {
      scoreModel.findByIdAndUpdate({ _id: req.params._id }, data).then(() => {
        res.status(200).send({
          msg: 'Updated Score'
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
  updateScore();
});


// server listens on port 3001
app.listen(PORT, () => {
  console.log(`Server is running on port:`, PORT);
  console.log(`localhost:${PORT}`);
});
