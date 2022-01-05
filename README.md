# Jinsoyun Bot Data API Endpoint
API for jinsoyun Discord bot.

## Features
* Daily and Weekly challenges data
* Charater data
* Market data

## Installation / Getting Started
### Url Endpoints
* Challanges data (Daily, Weekly) 
  * `/challenges` all the data
  * `/challenges/:query` specific data (example: `/challenges/monday`)
* Character data
  * `/character/:query` specified character data
* Market data
  * `/market/:query` specified item data

**Requirements**:
* [node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)

**How-to**:
* Configuration located in `.env` file [Example](https://github.com/ln2r/jinsoyun-api/blob/.env.example)
  * `MONGODB_URL` = your mongodb connection url
  * `API_PORT` = your desired port for your api
  * `BNS_CHALLENGES_URL` = this url points to [hongmoon-archives](https://www.hongmoon-archives.com/challenge/list-of-challenges) list of challanges pages, best to not change it.
  * `CHALLENGES_EXPIRE` = max time to update challenges data (currently set to 1 week in ms)
  * `CHARACTER_EXPIRE` = max time to update character data (currently set to 1 hour in ms)
  * `MARKET_EXPIRE` = max time to update market data (currently set to 1 hour in ms)

* Open Node.js command prompt and navigate to your root directory.
* Do `npm update` to get app depencies.
* Do `node index.js` to run the api.

## Credits
* Challenges data obtained from [Hongmoon Archives](https://www.hongmoon-archives.com/challenge/list-of-challenges)
* Character and market data obtained from [Silver BNS API](https://gitlab.com/Silver_BnS)

## Contact
* Discord: ln2r#1691

## License
*Code of this project is licensed under MIT license*