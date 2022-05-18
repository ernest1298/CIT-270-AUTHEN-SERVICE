
const express = require('express');//import the library 

const app = express(); //use the library
app.get('/',(request,response)=>{response.send("Hello")});//respond
app.listen(3000,()=>{console.log("listening...")});//listen
const md5 = require ('md5');
const bodyparser = require('body-parser'); //body parser is called to middleware
const {createClient} = require ('redis');
const redisClient = createClient();//this creates a connetion to the redis database

app.use(bodyparser.json());//use the middleware (call it before anything else happen on this request)
