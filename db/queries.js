
exports.querySelectArtworks = 
`SELECT *
FROM artworks ;`;

exports.querySelectCollections = 
`SELECT collections.*, COUNT(artworks.id_artwork) AS art_count
FROM collections 
LEFT JOIN artworks ON 
collections.id_collection = artworks.id_collection 
GROUP BY collections.id_collection
ORDER BY collections.created_at DESC;`;


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
`SELECT collections.*, COUNT(artworks.id_artwork) AS art_count
FROM collections
LEFT JOIN artworks ON 
collections.id_collection = artworks.id_collection 
WHERE user_mail = $1
GROUP BY collections.id_collection
ORDER BY collections.created_at DESC;`;


exports.querySelectCollectionsById =
`SELECT collections.*, COUNT(artworks.id_artwork) AS art_count
FROM collections
LEFT JOIN artworks ON 
collections.id_collection = artworks.id_collection 
WHERE collections.id_collection = $1
GROUP BY collections.id_collection;`;

exports.queryDeleteCollectionId = 
`DELETE FROM collections
WHERE id_collection = $1 
 RETURNING *;`;


exports.querySelectArtworkById =
`SELECT *
FROM artworks
WHERE id_artwork = $1;`;

exports.querySelectArtworksByCollectionId = 
`SELECT *
FROM artworks
WHERE id_collection = $1
ORDER BY created_at DESC;`;


exports.queryInsertArtwork = 
`INSERT INTO artworks (
title, location, artist, description, image_url, id_collection)
VALUES ($1, $2, $3, $4, $5, (SELECT id_collection
                                              FROM collections 
                                              WHERE id_collection = $6)) 
RETURNING *;`;

exports.queryUpdateArtById = 
`UPDATE artworks
SET 
title = $1,
location = $2,
artist = $3,
description = $4,
image_url = $5
WHERE id_artwork = $6
RETURNING *;`;

exports.queryDeleteArtworkId = 
`DELETE FROM artworks
WHERE id_artwork = $1 
 RETURNING *;`;


