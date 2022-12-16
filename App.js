const express=require('express');
const app=new express();
const fs=require('fs');
app.use(express.json());
const data=require('./dataset.json');


app.get('/hospital',(req,res)=>{
    res.send(data);
})

app.post('/hospital',(req,res)=>{
    data.push(req.body);
});


app.listen(3000);
console.log("server listening to port 3000");