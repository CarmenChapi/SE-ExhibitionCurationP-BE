
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
user_mail, title, location)
VALUES ($1, $2, $3)
RETURNING *; `;


exports.queryUpdateColById =
`UPDATE collections
SET title = $1,
location = $2
WHERE id_collection = $3
RETURNING *;`