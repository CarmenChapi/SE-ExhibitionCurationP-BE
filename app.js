const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());


const { getAllArtworks, postArtwork} = require("./controllers/artworks")
const { getAllCollections, postCollection, patchCollection} = require("./controllers/collections")

app.use(express.json());


 app.get("/api/artwork", getAllArtworks);
 app.post("/api/artwork", postArtwork);

 app.get("/api/collection", getAllCollections)
 app.post("/api/collection", postCollection)
 app.patch("/api/collection/:id_collection", patchCollection)


// app.get("/api/articles/:article_id", getArticlesById);
// app.patch("/api/articles/:article_id", patchArticleById);




//SQL Errors
app.use((err,req,res,next) => {
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