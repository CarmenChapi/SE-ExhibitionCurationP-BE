const { selectAllArtworks, insertArtwork } = require("../models/artworks");

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

exports.postArtwork = (req, res, next) => {
    insertArtwork(req)
      .then((artwork) => {
        if (artwork.code) {
          return Promise.reject({ status: 400, msg: "Bad request" });
        }
  
        res.status(201).send({ artwork });
      })
  
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };

// exports.getArtworkByAId = (req, res, next) => {

//     const { artwork_id } = req.params;

//     selectCommentsByArticleId(article_id)
//       .then((comments) => {
//         if (comments.code === '22P02') {
//           return Promise.reject({ status: 400, msg: "Bad request" });
//         }
//         if (comments.status === 404) {
//           return Promise.reject({ status: 404, msg: "Not found" });
//         }
//         res.status(200).send({ comments });
//       })

//       .catch((err) => {
//         console.log(err);
//         next(err);
//       });
//   };

// exports.getCommentsByCmId = (req, res, next) => {

//   const { article_id } = req.params;

//   selectCommentsByCommentId(article_id)
//     .then((comments) => {
//       if (comments.code === '22P02') {
//         return Promise.reject({ status: 400, msg: "Bad request" });
//       }
//       if (comments.status === 404) {
//         return Promise.reject({ status: 404, msg: "Not found" });
//       }
//       res.status(200).send({ comments });
//     })

//     .catch((err) => {
//       console.log(err);
//       next(err);
//     });
// };


//   exports.deleteComment = (req, res, next) => {

//     deleteCommentById(req)
//       .then((comment) => {
//         if (comment.code) {
//           return Promise.reject({ status: 400, msg: "Bad request" });
//         }
//         if(comment.status === 404){
//           return Promise.reject({ status: 404, msg: "Not found" });
//         }
//         res.status(204).send({ comment});
//       })

//       .catch((err) => {
//         console.log(err);
//         next(err);
//       });
//   };

//   exports.patchComment= (req, res, next) => {

//     updateCommentById(req)
//       .then((comment) => {
//         if (comment.code) {
//           return Promise.reject({ status: 400, msg: "Bad request" });
//         }
//         if(comment.status === 404){
//           return Promise.reject({ status: 404, msg: "Not found" });
//         }
//         res.status(200).send({ comment});
//       })

//       .catch((err) => {
//         console.log(err);
//         next(err);
//       });
//   };
