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
    fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data cannot be written");
        }
        else{
            res.send("Data written successfully");
        }
    });
});


app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.HospitalName==name){
            item.Location=req.body.Location;
            item.PatientCount=req.body.PatientCount;
        }
    })
    fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data could not be updated");
        }
        else{
            res.send("Data updated successfully");
        }
  })
})

app.delete('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    let value = data.filter(item=> item.HospitalName !== name);
    fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data could not be deleted");
        }
        else{
            res.send("Data deleted successfully");
        }
  })

})



app.listen(3000);
console.log("server listening to port 3000");