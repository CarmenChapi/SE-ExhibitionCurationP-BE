const { selectAllCollections, selectCollectionsByUser, selectCollectionsById, insertCollection, updateCollectionById, deleteCollectionById } = require("../models/collections");

exports.getAllCollections = (req, res, next) => {
  selectAllCollections(req)
    .then((collections) => {
      res.status(200).send({ collections });
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getCollectionByUser = (req, res, next) => {
  selectCollectionsByUser(req)
    .then((collections) => {
      console.log(collections)
      if (collections.status===404) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      if (collections.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      res.status(200).send({ collections });
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getCollectionById = (req, res, next) => {
  selectCollectionsById(req)
    .then((collection) => {
      if (collection.status===404) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      if (collection.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      res.status(200).send({ collection });
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
        if (collection.status===404) {
          return Promise.reject({ status: 404, msg: "Not found" });
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

  exports.deleteCollection = (req, res, next) => {
    deleteCollectionById(req)
    .then((collection) => {
      if (collection.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      if(collection.status === 404){
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      res.status(204).send({ collection});
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
  }