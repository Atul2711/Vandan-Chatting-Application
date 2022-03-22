require("dotenv").config();
const express=require('express');
const cors=require('cors');
const mongoose=require("mongoose");

const app=express();

app.use(cors());
app.use(express.json());


 mongoose.connect(process.env.MONGO_URL,{
     useNewUrlParser:true,
     
 }).then(console.log("Connected to db")).catch((err)=>console.log(err));

app.get('/',function(req,res){
    res.send("Hello");
})



app.listen(process.env.PORT || 5000,function(req,res){
    console.log("server is running at port 5000");
})