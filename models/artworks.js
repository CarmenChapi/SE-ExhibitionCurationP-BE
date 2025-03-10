
const db = require("../db/connection.js");
const artworks = require("../db/data/test-data/artworks.js");

const { querySelectArtworks, querySelectArtworkById, querySelectArtworksByCollectionId, queryInsertArtwork, queryUpdateArtById, queryDeleteArtworkId } = require("../db/queries.js")


const selectAllArtworks = () => {
    return db.query(querySelectArtworks)
      .then(artworks => {

        if(artworks.rows.length === 0 ){
          return Promise.reject({status: 404, msg: "Not found"})
        }
        return artworks.rows;
      })
      .catch(err => {
        console.log(err)
        return err;
      })
}

const selectArtworkById = (req) => {
  const {id_artwork} = req.params;
    console.log(querySelectArtworkById, id_artwork)
    return db.query(querySelectArtworkById, [id_artwork])
    .then(artwork => {
  
      if(artwork.rows.length === 0 ){
        return Promise.reject({status: 404, msg: "Not found"})
      }
      return artwork.rows;
    })
    .catch(err => {
      console.log(err)
      return err;
    })
}

const selectArtworksByCollectionId = (req) => {
  const {id_collection} = req.params;
    console.log(querySelectArtworksByCollectionId, id_collection)
    return db.query(querySelectArtworksByCollectionId, [id_collection])
    .then(artworks => {
  
      if(artworks.rows.length === 0 ){
        return Promise.reject({status: 404, msg: "Not found"})
      }
      return artworks.rows;
    })
    .catch(err => {
      console.log(err)
      return err;
    })
}

const insertArtwork = (req) =>{
       const {title, location, artist, description, image_url} = req.body;
       const {id_collection} = req.params;

       console.log(queryInsertArtwork, title, location, description, image_url, id_collection)
       return db
       .query(
           queryInsertArtwork , [title, location, artist, description, image_url, id_collection]
       )
       .then(artwork => {
         
           return artwork.rows[0];
       })
       .catch(err => {
         console.log(err)
         return err;
       })
}


const updateArtworkById  = (req) => {
  const {id_artwork} = req.params;
  const {title, location, artist, description, image_url} = req.body;
  console.log(queryUpdateArtById, title, location, artist, description, image_url, id_artwork)
return db
  .query(queryUpdateArtById,[title, location, artist, description, image_url, id_artwork])
  .then((artwork) => {
    if (artwork.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }

    return artwork.rows[0];
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
}

const deleteArtworkById = (req) => {
  const {id_artwork} = req.params;

  return db
  .query(
    queryDeleteArtworkId , [id_artwork]
  )
  .then(artwork => {
    if(artwork.rows.length === 0 ){
      return Promise.reject({status: 404, msg: "Not found"})
    }
    return artwork.rows[0]
  })
    .catch(err => {
      console.log(err)
      return err;
    })
}

module.exports = {selectAllArtworks, selectArtworkById, selectArtworksByCollectionId, insertArtwork, updateArtworkById, deleteArtworkById}