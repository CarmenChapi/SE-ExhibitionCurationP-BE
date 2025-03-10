const { selectAllArtworks, 
  selectArtworkById, 
  selectArtworksByCollectionId, 
  insertArtwork, 
  updateArtworkById, 
  deleteArtworkById } = require("../models/artworks");

exports.getAllArtworks = (req, res, next) => {

  selectAllArtworks(req)
    .then((artworks) => {
      res.status(200).send({ artworks });
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getArtworkById = (req, res, next) => {
  selectArtworkById(req)
    .then((artwork) => {
      if (artwork.status===404) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      if (artwork.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      res.status(200).send({ artwork });
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getArtworksByCollectionId = (req, res, next) => {
  selectArtworksByCollectionId(req)
    .then((artworks) => {
      if (artworks.status===404) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      if (artworks.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      res.status(200).send({ artworks});
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
};


exports.postArtwork = (req, res, next) => {
  console.log("chilling in the controler")
    insertArtwork(req)
      .then((artwork) => {
        if (artwork.code) {
          return Promise.reject({ status: 400, msg: "Bad request" });
        }
        if (artwork.status===404) {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
  
        res.status(201).send({ artwork });
      })
  
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };

  exports.patchArtwork = (req, res, next) => {
    updateArtworkById(req)
    .then((artwork) => {
      if (artwork.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      if(artwork.status === 404){
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      res.status(200).send({artwork});
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
  }

  exports.deleteArtwork = (req, res, next) => {
    deleteArtworkById(req)
    .then((artwork) => {
      if (artwork.code) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      if(artwork.status === 404){
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      res.status(204).send({ artwork });
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
  }


