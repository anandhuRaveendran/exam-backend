const express = require('express');
const path = require('path');
const app = express();


const mongoose=require('mongoose');
const query =require ('./Models/queries.js')


const port=3000;

app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`)
});

app.use(express.json());
// const uri=process.env.mongodb_uri;
mongoose.connect(
    'mongodb://localhost:27017/Appointment'   
);
const database = mongoose.connection;
database.on("error",(error)=>{
    console.log(error);
});
database.once("connected",()=>{
    console.log("Database Connected");
});    
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});
app.get('/book', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'book.html'));
});
app.post('/submit-form',async(req,res)=>{
    // console.log(req.body)

    try{
        const data=req.body;
        const result=await query.create(data);
        res.status(201).redirect('/view');
    
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }
 });
 app.put('/update',async(req,res)=>{
    console.log(req.body)
const token={'token_id':req.body.token_id};
console.log(token)
    try{
        const data=req.body;
        const result=await query.findOneAndUpdate(token,data);
        console.log(result)
        res.status(201)
    
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }
 });
 app.delete('/delete/:token_id',async(req,res)=>{
    console.log(req.params.token_id)
const token={'token_id':req.params.token_id};
console.log(token)
    try{
        const result=await query.findOneAndDelete(token);
        console.log(result)
        res.status(201)
    
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }
 });
app.get('/doctorSearch/:doctorname' , async(req,res)=>{
const d_name=req.params.doctorname;
const result=await query.find({doctor_name:d_name})
res.json(result)
}

)

