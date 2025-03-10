
const db = require("../db/connection.js");

const { querySelectCollections, querySelectCollectionsByUser, querySelectCollectionsById, queryInsertCollection, queryUpdateColById, queryDeleteCollectionId} = require("../db/queries.js")


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

const selectCollectionsByUser = (req) =>{
  const {user_mail} = req.params;
  return db.query(querySelectCollectionsByUser, [user_mail])
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

const selectCollectionsById= (req) =>{
  const {id_collection} = req.params;
  //console.log(querySelectCollectionsById, id_collection)
  return db.query(querySelectCollectionsById, [id_collection])
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
    const {user_mail, title} = req.body;
    //console.log(queryInsertCollection, user_mail, title)
    return db
    .query(
        queryInsertCollection , [user_mail, title]
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
  const {title} = req.body;
  //console.log(queryUpdateColById, id_collection, title)
return db
  .query(queryUpdateColById, [title, id_collection])
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

const deleteCollectionById = (req) => {
  const {id_collection} = req.params;

  return db
  .query(
    queryDeleteCollectionId , [id_collection]
  )
  .then(collection => {
    if(collection.rows.length === 0 ){
      return Promise.reject({status: 404, msg: "Not found"})
    }
    return collection.rows[0]
  })
    .catch(err => {
      console.log(err)
      return err;
    })
}

module.exports = {selectAllCollections, selectCollectionsByUser, selectCollectionsById, insertCollection, updateCollectionById, deleteCollectionById}