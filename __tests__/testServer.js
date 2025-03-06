const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Project BE-Curator-BE Test Suite", () => {
  

  describe("Test Collections", () => {
    test("201: POST /api/collections  add a new collection to the database", () => {
      return request(app)
        .post("/api/collection")
        .send({
          user_mail: "mariachaparro58@gmail.com",
          title: "Carmen Museum",
          location: "London",
        })
        .expect(201)
        .then((data) => {
          console.log(data.body);
          expect(data.body.collection).toHaveProperty("user_mail");
          expect(data.body.collection.user_mail).toBe(
            "mariachaparro58@gmail.com"
          );
          expect(data.body.collection).toHaveProperty("title");
          expect(data.body.collection.title).toBe("Carmen Museum");
          expect(data.body.collection).toHaveProperty("user_mail");
          expect(data.body.collection.user_mail).toBe("mariachaparro58@gmail.com");
        });
    });

    test("201: POST /api/collections  add a new collection to the database", () => {
      return request(app)
        .post("/api/collection")
        .send({
          user_mail: "m_carmen__9@gmail.com",
          title: "Likes",
          location: "Bristol",
        })
        .expect(201)
        .then((data) => {
          console.log(data.body);
          expect(data.body.collection).toHaveProperty("user_mail");
          expect(data.body.collection.user_mail).toBe(
            "m_carmen__9@gmail.com"
          );
          expect(data.body.collection).toHaveProperty("title");
          expect(data.body.collection.title).toBe("Likes");
          expect(data.body.collection).toHaveProperty("user_mail");
          expect(data.body.collection.user_mail).toBe("mariachaparro58@gmail.com");
        });
    });

    test.only("200 get all collections", () => {
      return request(app)
        .get("/api/collection")
        .expect(200)
        .then((data) => {
          console.log(data.body);
          expect(Array.isArray(data.body.collections)).toBe(true);
          data.body.collections.forEach((col) => {
            expect(col).toHaveProperty("user_mail");
            expect(col).toHaveProperty("title");
          });
        });
    });

    test("200: Patch /api/collection/:id_collection  update a collection by collection_id", () => {
      return request(app)
      .patch("/api/collection/1")
      .send({ title: "my new exhibition",
        location : "London"
      })
      .expect(200)
      .then((data) => {
        console.log(data.body)
        expect(data.body.collection.title).toBe("my new exhibition");
    });
  });

  });
  

  describe("Test Artworks", () => {
    test.only("200 get all artworks", () => {
      return request(app)
        .get("/api/artwork")
        .expect(200)
        .then((data) => {
          console.log(data.body);
             expect(Array.isArray(data.body.artworks)).toBe(true);
             data.body.artworks.forEach((art) => {
             expect(art).toHaveProperty("title");
               expect(art).toHaveProperty("location");
               expect(art).toHaveProperty("artist");
               expect(art).toHaveProperty("description");
               expect(art).toHaveProperty("image_url");
               expect(art).toHaveProperty("id_collection");
        });
    });

    test("201: POST /api/artworks/:idCollection  add a new art item to a collection by collection id", () => {
      return request(app)
        .post("/api/artwork/:id")
        .send({
          title: "This is a test",
          location: "Prado museum",
          artist: "El Greco",
          description: "This is a test",
          image_url:
            "https://unsplash.com/photos/ocean-and-rocky-cliffs-seen-through-an-opening-PGfHfhKrAt8",
        })
        .expect(201)
        .then((data) => {
          console.log(data);
          expect(data.body.article).toHaveProperty("title");
          expect(data.body.article.title).toBe("This is a test");
          expect(data.body.article).toHaveProperty("location");
          expect(data.body.article.location).toBe("Prado museum");
        });
    });
  });
})
})
