
const db = require("../db/connection.js");

const { querySelectArtworks, queryInsertArtwork } = require("../db/queries.js")


const selectAllArtworks = () => {
  console.log("chilling models ", querySelectArtworks)
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

const insertArtwork = (req) =>{
    const {username, body} = req.body;
    const {article_id} = req.params;
    console.log(queryInsertArtwork, username, body, article_id)
    return db
    .query(
        queryInsertArtwork , [username, body, 0, parseInt(article_id)]
    )
    .then(comment => {
      
        return comment.rows[0];
    })
    .catch(err => {
      console.log(err)
      return err;
    })
}

module.exports = {selectAllArtworks, insertArtwork}