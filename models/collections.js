
const db = require("../db/connection.js");

const { querySelectCollections, queryInsertCollection, queryUpdateColById } = require("../db/queries.js")


const selectAllCollections = () => {

    return db.query(querySelectCollections)
      .then(collections => {

        if(collections.rows.length === 0 ){
          return Promise.reject({status: 404, msg: "Not found"})
        }
        return collections.rows;
      })
      .catch(err => {
        console.log(err)
        return err;
      })
}

const insertCollection = (req) =>{
    const {user_mail, title, location} = req.body;
    console.log(queryInsertCollection, user_mail, title, location)
    return db
    .query(
        queryInsertCollection , [user_mail, title, location]
    )
    .then(collection => {
      
        return collection.rows[0];
    })
    .catch(err => {
      console.log(err)
      return err;
    })
}

const updateCollectionById = (req) => {
  const {id_collection} = req.params;
  const {title, location} = req.body;

return db
  .query(queryUpdateColById, [title, location, id_collection])
  .then((collection) => {
    if (collection.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }

    return collection.rows[0];
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
}

module.exports = {selectAllCollections, insertCollection, updateCollectionById}