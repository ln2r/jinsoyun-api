const { mongoGetData, setDataFormat, sendAPIReport} = require('./core');

let appRouter = function(app){

    app.get('/', function(req, res){
        res.header("Content-Type",'application/json');
        res.status(200).send([]);
    });

    /**
     * Dungeon Data
     * Getting dungeon information
     * containing: name, requirements, type, guides, ap, rewards
     * available request path: 
     * - all: /dungeons
     * - specific dungeon: /dungeons/name (/dungeons/naryu sanctum)
     * - item drop: /drop/item name (/drop/draken core)
     */
    // all data
    app.get('/dungeons/', async function(req, res){      
        res.header("Content-Type",'application/json');

        try{
            let dungeonData = await mongoGetData('dungeons', {});
            let result = setDataFormat(dungeonData);

            res.status(200).send(JSON.stringify(result, null, 4));
        }catch(error){
            console.error('[soyun] [api] error @ \'\/dungeon\': '+error);
            sendAPIReport(error, 'dungeonsAll-API', 'error');
            res.status(500).send(error);
        };
        
    })

    // specific data
    app.get('/dungeons/:name', async function(req, res){

        let nameQuery = req.params.name;
        let regx = new RegExp('('+nameQuery+'+)', 'ig');

        res.header("Content-Type",'application/json');

        try{
            let dungeonData = await mongoGetData('dungeons', {name: regx});
            let result = setDataFormat(dungeonData);
    
            // formatting
            for(let i = 0; i < dungeonData.length; i++){
                dungeonData[i].id = dungeonData[i]._id;
                delete dungeonData[i]._id;
            } ; 
            
            res.status(200).send(JSON.stringify(result, null, 4));
        }catch(error){
            console.error('[soyun] [api] error @ \'\/dungeon\/:name\': '+error);
            sendAPIReport(error, 'dungeonsName-API', 'error');
            res.status(500).send(error);
        };
    });

    // item drop
    app.get('/dungeons/drop', async function (req, res){
        res.header("Content-Type",'application/json');
        res.status(200).send([]);
    });

    app.get('/dungeons/drop/:item', async function(req, res){

        let dropQuery = req.params.item;
        let regx = new RegExp('('+dropQuery+'+)', 'ig');

        res.header("Content-Type",'application/json');

        try{
            // array of query to check rewards for common, normal and hard type rewards
            // query example
            // {"rewards.common": { $all: [/(core)/ig] } }
            let dbQuery = [
                {
                    "rewards.common": {$all: [regx]}
                }, 
                {
                    "rewards.normal": {$all: [regx]}
                }, 
                {
                    "rewards.hard": {$all: [regx]}
                },
            ]

            // getting the data and pushing them into an array
            let result = [];
            for(let i = 0; i < dbQuery.length; i++){
                let dungeonData = await mongoGetData('dungeons', dbQuery[i]);
                if(dungeonData.length != 0){
                    result.push(dungeonData);
                };
            };

            res.status(200).send(JSON.stringify(setDataFormat(result), null, 4));
        }catch(error){
            console.error('[soyun] [api] error @ \'\/drop\/:items\': '+error);
            sendAPIReport(error, 'dungeonsItemDrop-API', 'error');
            res.status(500).send(error);
        };
    });

    // DUNGEON DATA API END HERE

    /**
     * Challenges Data
     * Getting challanges data from daily, weekly to koldrak and shackled isle
     * containing: updated, day/type, rewards, quests
     * available request path: 
     * - all: /challenges
     * - specific challenges type: /challenges/day or type (/challenges/monday)
     */
    app.get('/challenges/', async function(req, res){ 
        
        res.header("Content-Type",'application/json');

        try{
            let challengesData = await mongoGetData('challenges', {});

            res.status(200).send(JSON.stringify(setDataFormat(challengesData), null, 4));
        }catch(error){
            console.error('[soyun] [api] error @ \'\/challenges\': '+error);
            sendAPIReport(error, 'challengesAll-API', 'error');
            res.status(500).send(error);
        };
    });

    app.get('/challenges/daily/', async function(req, res){
        let typeQuery = req.params.day;
            typeQuery = typeQuery.toLowerCase();

        res.header("Content-Type",'application/json');

        try{
            let dbData = await mongoGetData('challenges', {});
                dbData = dbData[0];    
    
            let challengesData = [dbData.monday, dbData.tuesday, dbData.wednesday, dbData.thursday, dbData.friday, dbData.saturday, dbData.sunday];
        
            res.status(200).send(challengesData);
        
            res.status(200).send(JSON.stringify(challengesData, null, 4));          
        }catch(error){
            console.error('[soyun] [api] error @ \'\/challenges\/:type\': '+error);
            sendAPIReport(error, 'challangesDaily-API', 'error');
            res.status(500).send(error);
        };
    })
    
    app.get('/challenges/daily/:day', async function(req, res){
        let typeQuery = req.params.day;
            typeQuery = typeQuery.toLowerCase();

        res.header("Content-Type",'application/json');

        try{
            let dbData = await mongoGetData('challenges', {});
                dbData = dbData[0];    
    
            let challengesData = [];
        
            switch(typeQuery){
                case 'monday':
                    challengesData.push(dbData.monday);
                break;
                case 'tuesday':
                    challengesData.push(dbData.tuesday);
                break;
                case 'wednesday':
                    challengesData.push(dbData.wednesday);
                break;
                case 'thursday':
                    challengesData.push(dbData.thursday);
                break;
                case 'friday':
                    challengesData.push(dbData.friday);
                break;
                case 'saturday':
                    challengesData.push(dbData.saturday);
                break;
                case 'sunday':
                    challengesData.push(dbData.sunday);
                break;
            };
        
            if(challengesData.length == 0){
                res.status(200).send(challengesData);
            };
        
            res.status(200).send(JSON.stringify(challengesData, null, 4));          
        }catch(error){
            console.error('[soyun] [api] error @ \'\/challenges\/:type\': '+error);
            sendAPIReport(error, 'challangesDailyDay-API', 'error');
            res.status(500).send(error);
        };
    });
    
    app.get('/challenges/weekly/', async function(req, res){

        res.header("Content-Type",'application/json');

        try{
            let dbData = await mongoGetData('challenges', {});
                dbData = dbData[0];    
    
            let challengesData = [];
        
            challengesData.push(dbData.weekly);
        
            if(challengesData.length == 0){
                res.status(200).send(challengesData);
            };
        
            res.status(200).send(JSON.stringify(challengesData, null, 4));          
        }catch(error){
            console.error('[soyun] [api] error @ \'\/challenges\/:type\': '+error);
            sendAPIReport(error, 'challangesWeekly-API', 'error');
            res.status(500).send(error);
        };
    });

    app.get('/challenges/grandharvest/', async function(req, res){

        res.header("Content-Type",'application/json');

        try{
            let dbData = await mongoGetData('challenges', {});
                dbData = dbData[0];    
    
            let challengesData = [];
        
            challengesData.push(dbData.grand_harvest_raid);
        
            if(challengesData.length == 0){
                res.status(200).send(challengesData);
            };
        
            res.status(200).send(JSON.stringify(challengesData, null, 4));          
        }catch(error){
            console.error('[soyun] [api] error @ \'\/challenges\/:type\': '+error);
            sendAPIReport(error, 'challangesGrandHarvest-API', 'error');
            res.status(500).send(error);
        };
    });

    app.get('/challenges/koldrak/', async function(req, res){

        res.header("Content-Type",'application/json');

        try{
            let dbData = await mongoGetData('challenges', {});
                dbData = dbData[0];    
    
            let challengesData = [];
        
            challengesData.push(dbData.koldrak);
        
            if(challengesData.length == 0){
                res.status(200).send(challengesData);
            };
        
            res.status(200).send(JSON.stringify(challengesData, null, 4));          
        }catch(error){
            console.error('[soyun] [api] error @ \'\/challenges\/:type\': '+error);
            sendAPIReport(error, 'challangesKoldrak-API', 'error');
            res.status(500).send(error);
        };
    });

    app.get('/challenges/shackledisle/', async function(req, res){

        res.header("Content-Type",'application/json');

        try{
            let dbData = await mongoGetData('challenges', {});
                dbData = dbData[0];    
    
            let challengesData = [];
        
            challengesData.push(dbData.shackled_isle);
        
            if(challengesData.length == 0){
                res.status(200).send(challengesData);
            };
        
            res.status(200).send(JSON.stringify(challengesData, null, 4));          
        }catch(error){
            console.error('[soyun] [api] error @ \'\/challenges\/:type\': '+error);
            sendAPIReport(error, 'challangesShackledIsle-API', 'error');
            res.status(500).send(error);
        };
    });
    // CHALLENGES DATA API END HERE

    /**
     * Event Data
     * Getting current event data summary
     * containing: name, duration, redeem, url, last event, rewards (weekly, daily), to-do, quests list
     * available request path: 
     * - all: /event
     */
    app.get('/event/', async function(req, res){

        res.header("Content-Type",'application/json');

        try{
            let eventData = await mongoGetData('events', {});

            res.status(200).send(JSON.stringify(setDataFormat(eventData), null, 4));
        }catch(error){
            console.error('[soyun] [api] error @ \'\/event\': '+error);
            sendAPIReport(error, 'event-API', 'error');
            res.send(500).send(error);
        };
    })

    app.get('/event/:query', async function(req, res){
        res.header("Content-Type",'application/json');
        res.status(200).send([]);
    })
    // EVENT DATA API END HERE
}

module.exports = appRouter;