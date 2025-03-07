const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Project BE-Curator-BE Test Suite", () => {
  describe("Test Collections", () => {
    test("200: GET all collections", () => {
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

    test("200: GET /api/collection/:user_mail get collections by user mail", () => {
      return request(app)
        .get("/api/collection/mariachaparro@gmail.com")
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

    test("404: GET /api/collection/:user_mail Not found response when the input does not exist", () => {
      return request(app)
        .get("/api/collection/asdasdfd")
        .expect(404)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Not found");
        });
    });

    test("200: GET /api/collection/id/:id_collection  get a collection by collection_id", () => {
      return request(app)
        .get("/api/collection/id/1")
        .expect(200)
        .then((data) => {
          console.log(data.body.collection, data.body.collection[0].title);
          expect(data.body.collection[0].id_collection).toBe(1);
          expect(data.body.collection[0].title).toBe("House");
        });
    });

    test("400: GET /api/collection/id/:id_collection Bad request response when the id input is not the correct", () => {
      return request(app)
        .get("/api/collection/id/maria")
        .expect(400)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Bad request");
        });
    });

    test("404: GET /api/collection/id/:id_collection Not found response when the input does not exist", () => {
      return request(app)
        .get("/api/collection/id/34")
        .expect(404)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Not found");
        });
    });


    test("200: PATCH /api/collection/:id_collection  update a collection by collection_id", () => {
      return request(app)
        .patch("/api/collection/1")
        .send({ title: "my new exhibition" })
        .expect(200)
        .then((data) => {
          console.log(data.body);
          expect(data.body.collection.title).toBe("my new exhibition");
        });
    });

    test("400: PATCH /api/collection/:id_collection return bad request when the input param is wrong", () => {
      return request(app)
        .patch("/api/collection/1banana")
        .send({ title: "my new exhibition"})
        .expect(400)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Bad request");
        });
    });

    test("400: PATCH /api/collection/:id_collection  return Bad request when not pass any data to be updated", () => {
      return request(app)
        .patch("/api/collection/1")
        .send()
        .expect(400)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Bad request");
        });
    });

    test("404: PATCH /api/collection/:id_collection return not found when the param input is not in the collection table", () => {
      return request(app)
        .patch("/api/collection/166")
        .send({ title: "my new exhibition"})
        .expect(404)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Not found");
        });
    });


    test("201: POST /api/collection  insert a new collection to the database", () => {
      return request(app)
        .post("/api/collection")
        .send({
          user_mail: "mariachaparro58@gmail.com",
          title: "Carmen Museum",
        })
        .expect(201)
        .then((data) => {
          console.log(data.body);
          expect(data.body.collection).toHaveProperty("user_mail");
          expect(data.body.collection.user_mail).toBe(
            "mariachaparro58@gmail.com");
          expect(data.body.collection).toHaveProperty("title");
          expect(data.body.collection.title).toBe("Carmen Museum");
        });
    });

    test("400: POST /api/collection  Bad request when is not input pass to be inserted", () => {
      return request(app)
        .post("/api/collection")
        .send()
        .expect(400)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Bad request");
        });
    });

    test("400: POST /api/collection  Bad request when the input data does not contain all the not null data", () => {
      return request(app)
        .post("/api/collection")
        .send({
          title: "Car Museum",
          location: "London",
        })
        .expect(400)
        .then((data) => {
          console.log(data.body)
          expect(data.body.msg).toBe("Bad request");
        });
    });

    test("204: DELETE /api/collection/:id_collection", () => {
      return request(app).delete("/api/collection/3").expect(204);
    });

    test("400: DELETE /api/collection/:id_collection return bad request when the input is not valid", () => {
      return request(app)
      .delete("/api/collection/bamama")
      .expect(400)
      .then((data) => {
        console.log(data.body)
        expect(data.body.msg).toBe("Bad request");
      })
  });

  test("404: DELETE /api/collection/:id_collection return Not found when the input is not in the collection table", () => {
    return request(app)
    .delete("/api/collection/445")
    .expect(404)
    .then((data) => {
      console.log(data.body)
      expect(data.body.msg).toBe("Not found");
    })
});

})

  describe("Test Artworks", () => {
    test("200 get all artworks", () => {
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
              });
          });
        });
    });
  });
  describe.only("Test endpoints", () => {
    test("200: GET /api all endpoints and descriptions", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((data) => {
          console.log(data.body)
          expect(typeof data.body.endpoints).toBe("object");
          expect(Object.keys(data.body.endpoints).length).toBe(7);
          expect(Object.values(data.body.endpoints).length).toBe(7);
        });
    });
  })





});
