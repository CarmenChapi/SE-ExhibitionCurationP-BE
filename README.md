# SE-Curator-BE

Project to provide a REST API to the project Exhibition Curation Project. With the API, the user can interact with a digital collection of artworks. It enables CRUD (Create, Read, Update, Delete) operations for collections and artworks.

## Base URL

### https://se-curator-be.onrender.com/api

## Endpoints

### GET /api => all the available endpoints of the api

exampleRequest: https://se-curator-be.onrender.com/api

### GET /api/collection => return an array of all exhibition collections

    "exampleRequest": "https://se-curator-be.onrender.com/api/collection",
    "exampleResponse": {
      "collections": [
        {
          "id_collection": 1,
          "user_mail": "mariachaparro@gmail.com",
          "title": "House",
          "created_at": "2025-03-11T02:04:16.977Z",
          "art_count": "2"
        },
        {
          "id_collection": 5,
          "user_mail": "can@gmail.com",
          "title": "Nora",
          "created_at": "2025-03-11T02:04:16.977Z",
          "art_count": "1"
        }
      ]
    }

### GET /api/collection/id/:id_collection => return the collection with id = id_collection

    "exampleRequest": "https://se-curator-be.onrender.com/api/collection/id/1",
    "exampleResponse": {
      "collection": [
        {
          "id_collection": 1,
          "user_mail": "mariachaparro@gmail.com",
          "title": "House",
          "created_at": "2025-03-11T02:04:16.977Z",
          "art_count": "2"
        }
      ]
    }

### GET /api/collection/:user_mail => return the collections with user_mail = user_mail

    "exampleRequest": "https://se-curator-be.onrender.com/api/collection/mariachaparro@gmail.com",
    "exampleResponse": {
      "collections": [
        {
          "id_collection": 1,
          "user_mail": "mariachaparro@gmail.com",
          "title": "House",
          "created_at": "2025-03-11T02:04:16.977Z",
          "art_count": "2"
        },
        {
          "id_collection": 3,
          "user_mail": "mariachaparro@gmail.com",
          "title": "Park",
          "created_at": "2025-03-11T02:04:16.977Z",
          "art_count": "1"
        }
      ]
    }

### POST /api/collection => insert a new row in the collection table, return the collection inserted

    "exampleRequest": "",
    "exampleResponse": {}

### PATCH /api/collection/:id_collection => update the row with collection = to id_collection and return the collection updated

    "exampleRequest": "",
    "exampleResponse": {}

### DELETE /api/collection/:id_collection => delete the row with collection = to id_collection and return the collection deleted

    "exampleRequest": "",
    "exampleResponse": {}

### GET /api/artwork => return an array of all artworks

    "exampleRequest": "https://se-curator-be.onrender.com/api/artwork",
    "exampleResponse": {
      "artworks": [
        {
          "id_artwork": 6,
          "title": "Mouse",
          "location": "Oviedo",
          "artist": "David Lynch",
          "description": "this is a test",
          "image_url": "https://images.pexels.com/photos/3991396/pexels-photo-3991396.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "created_at": "2025-03-11T02:04:17.005Z",
          "id_collection": 4
        },
        {
          "id_artwork": 7,
          "title": "Mushroom",
          "location": "Madrid",
          "artist": "Nacho Vigalondo",
          "description": "this is a test",
          "image_url": "https://images.pexels.com/photos/3991396/pexels-photo-3991396.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "created_at": "2025-03-11T02:04:17.005Z",
          "id_collection": 5
        }
      ]
    }

### GET /api/artwork/:id_artwork => return the artwork with id = id_artwork

    "exampleRequest": "https://se-curator-be.onrender.com/api/artwork/7",
    "exampleResponse": {
      "artwork": [
        {
          "id_artwork": 7,
          "title": "Mushroom",
          "location": "Madrid",
          "artist": "Nacho Vigalondo",
          "description": "this is a test",
          "image_url": "https://images.pexels.com/photos/3991396/pexels-photo-3991396.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "created_at": "2025-03-11T02:04:17.005Z",
          "id_collection": 5
        }
      ]
    }

### GET /api/artwork/collecton/:id_collection => return an array with all the artworks with id_collection = to the param

    "exampleRequest": "https://se-curator-be.onrender.com/api/artwork/collection/5",
    "exampleResponse": {
      "artworks": [
        {
          "id_artwork": 7,
          "title": "Mushroom",
          "location": "Madrid",
          "artist": "Nacho Vigalondo",
          "description": "this is a test",
          "image_url": "https://images.pexels.com/photos/3991396/pexels-photo-3991396.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "created_at": "2025-03-11T02:04:17.005Z",
          "id_collection": 5
        }
      ]
    }

### POST /api/artwork => insert a new row in the artworks table, return the row inserted

    "exampleRequest": "",
    "exampleResponse": {}

### PATCH /api/artwork/:id_artwork => update the row with id_artwork = to id as param and return the row updated￼

    "exampleRequest": "",
    "exampleResponse": {}

### DELETE /api/artwork/:id_artwork => delete the row with id = to id_artwork

    "exampleRequest": "",
    "exampleResponse": {}

# Development Setup

## how to clone

    git clone https://github.com/CarmenChapi/SE-ExhibitionCurationP-BE.git

## install dependencies

    npm install

## enviroment variables

1. Create the following files in the root directory of the project:

    #### .env.development
    #### .env.test

2. Add the corresponding environment variables to each file:

    #### In .env.development, add PGDATABASE=curator.
    #### In .env.test, add PGDATABASE=curator_test.

3. To prevent these files from being committed to version control, include the following in your .gitignore file:
   #### .env.\*

## seed local database

    psql -f ./db/setup.sql
    node ./db/seeds/run-seed.js

## run test

    npm i -D jest
    npm test

## version required

    Node.js v22.4.0
    PostgreSQL v16.4
