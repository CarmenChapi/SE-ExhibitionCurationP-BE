const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const { getEndpoints} = require("./controllers/endpoints")
const { getAllArtworks, postArtwork} = require("./controllers/artworks")
const { getAllCollections, getCollectionByUser, getCollectionById, postCollection, patchCollection, deleteCollection} = require("./controllers/collections")

app.use(express.json());

app.get("/api", getEndpoints);

 app.get("/api/artwork", getAllArtworks);
 app.post("/api/artwork", postArtwork);

 app.get("/api/collection", getAllCollections)
 app.get("/api/collection/:user_mail", getCollectionByUser)
 app.get("/api/collection/id/:id_collection", getCollectionById)

 app.post("/api/collection", postCollection)
 app.patch("/api/collection/:id_collection", patchCollection)
 app.delete("/api/collection/:id_collection", deleteCollection)


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