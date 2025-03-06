const { selectAllCollections, insertCollection, updateCollectionById } = require("../models/collections");

exports.getAllCollections = (req, res, next) => {
  console.log("chilling")
  selectAllCollections(req)
    .then((collections) => {
      res.status(200).send({ collections });
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.postCollection = (req, res, next) => {

    insertCollection(req)
      .then((collection) => {
        if (collection.code) {
          return Promise.reject({ status: 400, msg: "Bad request" });
        }
  
        res.status(201).send({ collection });
      })
  
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };

  exports.patchCollection = (req, res, next) => {
    updateCollectionById(req)
    .then((collection) => {
      if (collection.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      if(collection.status === 404){
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      res.status(200).send({collection});
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
  }