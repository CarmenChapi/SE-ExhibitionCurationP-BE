
const db = require('../connection');

const seed = () => {
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
    location TEXT,
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
    id_collection INT REFERENCES collections(id_collection)
);`);
    
      return Promise.all([collectionsTablePromise, artworksTablePromise]);
    })

};

module.exports = seed;
