const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const { getEndpoints} = require("./controllers/endpoints")

const artworkRoutes = require("./routes/artworks");
const collectionRoutes = require("./routes/collections");

app.use(express.json());

app.get("/api", getEndpoints);
app.use("/api/artwork", artworkRoutes);
app.use("/api/collection", collectionRoutes);


//SQL Errors
app.use((err,req,res,next) => {
  console.log(err)
  if(err.code === '23502'){
    res.status(400).send({msg:"Bad request"})
  }
  if(err.code === '22P02'){
    res.status(400).send({msg:"Bad request"})
  }else{
    next(err)
  }
})


app.use((err, req, res, next) => {
  console.log(err)
  if(err.status === 400){
    res.status(400).send({msg: "Bad request"})
  }
  if(err.status === 404){
    res.status(404).send({msg: "Not found"})
    }
  else{
        next()
  }
})

module.exports = app;