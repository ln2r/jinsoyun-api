const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

let url = process.env.mongo_db_url;
let dbName = process.env.mongo_db_name;

module.exports = {
    /** 
     * mongoGetData
     * Used to get data from MongoDB database
     * @param {String} collname data collection name
     * @param {Object} filter data filter
     * @returns data fetched from databse
     * @example
     *  // Using the function locally with id as it filter
     *  module.exports.mongoGetData("classes", {_id: 0});
     *  
     *  // Using the function outside the file without filter
     *  core.mongoGetData("classes");
     */
    mongoGetData: function mongoGetData(collname, filter) { 
        console.debug('[core] [mongo-fetch] collname: '+collname+', filter: '+JSON.stringify(filter));

        return MongoClient.connect(url, {useNewUrlParser: true})
                    .then(function(db) {
                        let dbo = db.db(dbName);
                        let collection = dbo.collection(collname);                        
                        return collection.find(filter).toArray()
                               .then(db.close());
                        
                    })
                    .then(function(items){                        
                        return items;                        
                    })                   
    },

    setDataFormat: function setFormat(data){

        let formatted = JSON.parse(JSON.stringify(data).split('"_id":').join('"id":'));

        return formatted;
    }
}