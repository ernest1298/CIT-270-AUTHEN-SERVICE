
const express = require('express');//import the library 

const app = express(); //use the library
app.get('/',(request,response)=>{response.send("Hello")});//respond
app.listen(3000,()=>{console.log("listening...")});//listen
const md5 = require ('md5');
const bodyparser = require('body-parser'); //body parser is called to middleware
const {createClient} = require ('redis');
const { response } = require('express');

//this creates a connetion to the redis database
const redisClient = createClient({ url: 'redis://default@ola-redis.cit270.com:6379'})

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
const savePassword = async (request, response)=>{
    const clearTextPassword = request.body.password;
    const hashedTextPassword = md5(clearTextPassword);
    await redisClient.hSet('password', request.body.userName, hashedTextPassword); 
    response.status(200);
    response.send({result:"Saved"});



}


app.get('/', (request, reponse)=>{
    response.send("Hello");
})



app.prependOnceListener('/signup', savePassword);

app.post('/login' ,validatePassword);

app.post('/signup', savePassword);

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd'
}, app).listen(port, async() => {
    console.log('Listening.....')
    await redisClient.connect();
})