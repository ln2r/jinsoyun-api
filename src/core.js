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

    /**
     * setDataFormat
     * used to change the fetched data '_id' field into 'id'
     * @param data unformatted data
     * @returns formatted data
     */
    setDataFormat: function setFormat(data){

        let formatted = JSON.parse(JSON.stringify(data).split('"_id":').join('"id":'));

        return formatted;
    },

    /**
     * sendAPIReport
     * Saving log data to database
     * @param {Object} logData log message
     * @param {String} location where the event happens
     * @param {String} type event type
     */
    sendAPIReport: function sendReport(logData, location, type){
        let now = new Date();

        let logCollectionName = 'logs';

        let logPayload = {
            'location': location,
            'type': type,     
            'time': now,     
            'message': logData
        }

        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);

            dbo.collection(logCollectionName).insertOne(logPayload, function(err, res) {  
                if (err) throw err;    
                db.close();                
            });
        });

    }
}