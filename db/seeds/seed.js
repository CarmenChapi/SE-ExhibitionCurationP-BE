
const format = require('pg-format');
const db = require('../connection');

const seed = ({collectionsData, artworksData}) => {

    return db.query(`DROP TABLE IF EXISTS artworks;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS collections;`);
    })
    .then(() => {
      const collectionsTablePromise = db.query(`
      CREATE TABLE collections (
    id_collection SERIAL PRIMARY KEY,
    user_mail VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

      const artworksTablePromise = db.query(`
      CREATE TABLE artworks (
    id_artwork SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    artist VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_collection INT REFERENCES collections(id_collection) ON DELETE CASCADE
);`);
    
      return Promise.all([collectionsTablePromise, artworksTablePromise]);
    })
    .then(() => {
      const insertCollectionsQueryStr = format(
        'INSERT INTO collections (title, user_mail) VALUES %L RETURNING *;',
        collectionsData.map(
          ({
            title,
            user_mail
          }) => [title, user_mail]
        )
      );

      return db.query(insertCollectionsQueryStr);
    })
    .then(() => {
      const insertArtworksQueryStr = format(
        'INSERT INTO artworks (title, location, artist, description, image_url, id_collection) VALUES %L RETURNING *;',
        artworksData.map(
          ({
            title,
            location,
            artist,
            description,
            image_url,
            id_collection
          }) => [title, location, artist,description, image_url, id_collection]
        )
      );

      return db.query(insertArtworksQueryStr);
    })
};

module.exports = seed;
