# Jinsoyun Bot Data API Endpoint
Jinsoyun Bot less automated data api endpoint

## Features
* Daily challenges data
* Weekly challenges data
* Event data
* Dungeons data
* *Koldrak's lair* time data
* ~~*Grand Harvest Square* time data~~ Currently no data available
* *Shackled Isles* time data

## Installation / Getting Started
### Url Endpoints (WIP)
* Challanges data (Daily, Weekly, Koldrak's, Grand Harvest, Shackled Isles) 
  * `/challenges` all the data
  * `/challenges/:type` specific data (example: `/challenges/monday`)
* Event data
  * `/event/` event data
* Dungeons data
  * `/dungeons/` all dungeon data
  * `/dungeons/:name` specific dungeon data (example: `/dungeons/naryu sanctum`)
  * `/drop/:item` getting dungeon data that contain specific item (example: `/drop/draken core`)

### Self-Host
If you want to host the api app yourself just follow the instruction below. The downside is you need to update the data manually.

**Requirements**:
* [node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [nodemon](https://www.npmjs.com/package/nodemon) for easier run

**How-to**:
* To configure the api, make `.env` file with this data:
  ```
  # Mongodb connection data
  mongo_db_url = YOUR_MONGODB_CONNECTION_URL
  mongo_db_name = YOUR_MONGODB_DATABASE_NAME

  #api settings
  api_port = YOUR_API_CONNECTION_PORT
  ```
* Make a MongoDB database with the name you specified and then make these collections [(check `mongoexport` for template)](https://github.com/ln2r/jinsoyun/tree/dev/mongoexport)
  * `challenges` challenges data
  * `dungeons` dungeon data
  * `events` event info and details

* Open Node.js command prompt and navigate to your root directory.
* Do `npm update` to get app depencies.
* Do `nodemon index.js` to run the api.

## Acknowledgments & Credits
* **Rizky Sedyanto** - *Initial work* - [ln2r](https://ln2r.web.id/); Discord: ln2r#1691

## License
*Code of this project is licensed under MIT license*