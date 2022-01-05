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
  ```env
  MONGODB_URL = YOUR_MONGODB_CONNECTION_URL

  API_PORT = YOUR_API_PORT
  ```
* Required MongoDB collections
  * `challenges` challenges data

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