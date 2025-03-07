
exports.querySelectArtworks = 
`SELECT *
FROM artworks ;`;

exports.querySelectCollections = 
`SELECT *
FROM collections ;`;

exports.querySelectCollectionsArtworks = 
`SELECT *
FROM collection_artworks ;`;

exports.queryInsertArtwork = 
``;

exports.queryInsertCollection =
`INSERT INTO collections (
user_mail, title)
VALUES ($1, $2)
RETURNING *; `;


exports.queryUpdateColById =
`UPDATE collections
SET title = $1
WHERE id_collection = $2
RETURNING *;`;

exports.querySelectCollectionsByUser =
`SELECT *
FROM collections
WHERE user_mail = $1;`;

exports.querySelectCollectionsById =
`SELECT *
FROM collections
WHERE id_collection = $1;`;

exports.queryDeleteCollectionId = 
`DELETE FROM collections
WHERE id_collection = $1 
 RETURNING *;`;