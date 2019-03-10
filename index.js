const dotenv = require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./src/router.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);

let server = app.listen(process.env.api_port, function(){
    console.log('[soyun] [api] api server running on: '+server.address().address+':'+server.address().port+'('+server.address().family+')');
})