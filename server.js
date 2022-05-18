
const express = require('express');//import the library 

const app = express(); //use the library
app.get('/',(request,response)=>{response.send("Hello")});//respond
app.listen(3000,()=>{console.log("listening...")});//listen
const md5 = require ('md5');
const bodyparser = require('body-parser'); //body parser is called to middleware
const {createClient} = require ('redis');
const { response } = require('express');
const redisClient = createClient(
    {
        socket:{
            port:6379,
            host:"127.0.0.1"
        },


    }

);//this creates a connetion to the redis database

app.use(bodyparser.json());//use the middleware (call it before anything else happen on this request)




const validatePassword = async (request, response)=>{
    await redisClient.connect();
    const requestHashedPassword = md5(request.body.password);
    const redisHashedPassword= await redisClient.hmGet('Password',resquest.body.userName);
    const loginRequest = request.body;
    console.log("Request Body" , JSON.stringify(request.body));

    if (requestHashedPassword==redisHashedPassword){
        response.status(200);
        response.send("Welcome");
    } else{
        response.status(401);
        response.send("Unauthorized");
    }

}
app.get('/', (request, reponse)=>{
    response.send("Hello");
})

app.post('/login' ,validatePassword);