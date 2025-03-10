const express = require("express");
const router = express.Router();


const {
  getAllArtworks,
  getArtworkById,
  getArtworksByCollectionId,
  postArtwork,
  patchArtwork,
  deleteArtwork,
} = require("../controllers/artworks");


router.get("/", getAllArtworks);
router.get("/:id_artwork", getArtworkById);
router.get("/collection/:id_collection", getArtworksByCollectionId);

router.post("/:id_collection", postArtwork);
router.patch("/:id_artwork", patchArtwork);
router.delete("/:id_artwork", deleteArtwork);

module.exports = router;
