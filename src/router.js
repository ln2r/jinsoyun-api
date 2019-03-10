const core = require('./core.js');

let appRouter = function(app){

    app.get('/', function(req, res){
        res.status(200).send({message: 'Nothing here, move along'});
    });

    // dungeon data api start here

    // to get all the dungeon data
    app.get('/dungeons', async function(req, res){
        let dungeonData = await core.mongoGetData('dungeons', {});
        let result = core.setDataFormat(dungeonData);

        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(result, null, 4));
    })

    // to get specific dungeon data
    app.get('/dungeons/:name', async function(req, res){
        let nameQuery = req.params.name;
        let regx = new RegExp('('+nameQuery+'+)', 'ig');
        let dungeonData = await core.mongoGetData('dungeons', {name: regx});
        let result = core.setDataFormat(dungeonData);

        // formatting
        for(let i = 0; i < dungeonData.length; i++){
            dungeonData[i].id = dungeonData[i]._id;
            delete dungeonData[i]._id;
        }

        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(result, null, 4));
    })

    // to get drop item dungeon location
    app.get('/drop/:item', async function(req, res){
        let dropQuery = req.params.item;
        let regx = new RegExp('('+dropQuery+'+)', 'ig');

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
            let dungeonData = await core.mongoGetData('dungeons', dbQuery[i]);
            if(dungeonData.length != 0){
                result.push(dungeonData);
            }
        }

        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(core.setDataFormat(result), null, 4));
    })

    // dungeon data api end here

    // challenges data api start here
    app.get('/challenges', async function(req, res){
        let challengesData = await core.mongoGetData('challenges', {});
    
        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(core.setDataFormat(challengesData), null, 4));
    })
    
    app.get('/challenges/:day', async function(req, res){
        let dayQuery = req.params.day;
            dayQuery = dayQuery.toLowerCase();
        
        let dbData = await core.mongoGetData('challenges', {});
            dbData = dbData[0];
    
    
        let challengesData = [];
    
        switch(dayQuery){
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
            case 'weekly':
                challengesData.push(dbData.weekly);
            break;
            case 'koldrak':
                challengesData.push(dbData.koldrak);
            break;
            case 'grandharvestsquare':
                challengesData.push(dbData.grandHarvestSquare);
            break;
        };
    
        if(challengesData.length == 0){
            res.status(200).send(challengesData);
        }
    
        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(challengesData, null, 4));
    })    
    // challenges data api end here    

    app.get('/event', async function(req, res){
        let eventData = await core.mongoGetData('events', {});

        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(core.setDataFormat(eventData), null, 4));
    })
}

module.exports = appRouter;