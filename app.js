const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userdetails = require('./model/signup');
var jsonParser=bodyParser.json()
var urlencodedParser=bodyParser.urlencoded({extended:true})
port = 5000;
const app = express()
var path = require('path');
const dairyNote = require("./model/dairynote");
const { request } = require("http");
var userID;
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'views/js')));
app.set('view engine', 'ejs')

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://Dishanth:Atlas-89788@cluster0.kxbnhig.mongodb.net/user-details?retryWrites=true&w=majority')
  .then(() =>{
    console.log('connected to MongoDB')
    app.listen(port, () => {
        console.log('Node API app is running on port 3000')
    })
}).catch((error)=>{
    console.log(error)
});



app.get('/', function(req, res){
    res.render('index')
});


app.post('/signup', jsonParser,async(req, res) => {
    try {
        const email=await userdetails.countDocuments({'mail':req.body.mail})
        const phone=await userdetails.countDocuments({'phoneNo':req.body.phoneNo})

        if( email=== 0 && phone===0){
            const product = await userdetails.create(req.body)
            res.status(200).json(product);
        }
        else if(email !== 0){
            res.sendStatus(201)

        }
        else{
            res.sendStatus(202)
        }    
    } catch (error) {
        console.log(error.message);
        res.redirect(500).json({message: error.message})
    }
})


app.post('/login', jsonParser,async(req, res)=>{
    const qurey =  await userdetails.countDocuments({'mail':req.body.mail, 'password':req.body.password})
    if(qurey === 0){
        console.log("NO user found")
        res.sendStatus(201)
    }
    else{
        const user=await userdetails.findOne({'mail':req.body.mail, 'password':req.body.password})
        console.log(typeof user._id)
        userID=user._id
        console.log(userID)
        console.log("Login successfully")
        res.sendStatus(200)
    }
})
app.get('/home', async(req,res)=>{
    if(userID!=null)
    {
        var date = new Date();
      var datetime=date.toISOString().split('T')[0];
    const user=await userdetails.findOne({'_id':userID})
    const d=await dairyNote.findOne({'userId':userID,'Day':datetime})
    const todo = await dairyNote.findById()
    if(d!=null)
    {
        const name = user.Firstname;
        const content = d.Dairy;
        res.render('home',{user: name, dairy: content});
    }else{
        res.render('home',{user:user.Firstname,dairy:null})
    }
    }else{
        res.render('home',{'user':null,'dairy':null})
    }
})

app.post('/dairy',jsonParser,async(req,res)=>{
    //userID,diary,date
    //userID,date already unte update chey
    if(userID!=null)
    {
        var date = new Date();
        var datetime=date.toISOString().split('T')[0];
        let c=await dairyNote.countDocuments({'userId':userID,'Day':datetime})
        if(c==0)
        {
            const product = await dairyNote.create({'userId':userID,'Dairy':req.body.Dairy,'Day':datetime})
        }else{
            let doc = await dairyNote.findOneAndUpdate({'userId':userID,'Day':datetime},{'Dairy':req.body.Dairy});
        }
    }
    //lekapothe insert chey
})
// app.post('/home',jsonParser,async(req,res)=>{
//     //userID,diary,date
//     //userID,date already unte update chey
//     if(userID!=null)
//     {
//         var datetime= req.body.Day
//         console.log(datetime)
//         let doc = await dairyNote.findOne({'userId':userID,'Day':datetime});
//         console.log(doc)
//         if(doc!==null)
//         {
//             res.send(doc.Dairy)
//        }else{
//             res.send(null)
//        }
//     }
// })
    //lekapothe insert chey
//_________________________________________________________todoList_________________________________________________________
//________________________________________________________End-todolist__________________________________________________________________
