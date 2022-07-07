const express = require('express');

const app = express();

app.listen(3000,()=>{console.log("listening...")});

app.get('/',(request,respond)=>{respond.send("Hello")} );