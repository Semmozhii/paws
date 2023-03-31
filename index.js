const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));

uri=("mongodb+srv://jyoshna:jikkisiva914@jyoshcluster.xyd8nup.mongodb.net/petadop?retryWrites=true&w=majority")
options={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri,options)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const UserSchema1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob:{
    type:mongoose.Schema.Types.Date ,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phnum: {
    type:mongoose.Schema.Types.Number,
    required: true
  },
  gender: {
    type:String,
    required: true
  },
  occupation:{
    type:String,
    required: true
  },
  addtyp:{
    type:String,
    required: true
  },
  nationality:{
    type:String,
    required: true
  },
  state:{
    type:String,
    required: true
  },
  dist:{
    type:String,
    required: true
  },
  blknum:{
    type:String,
    required: true
  },
  wardnum:{
    type:String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);
 
const register = mongoose.model("register", UserSchema1);

module.exports = { User, register };

app.get("/",function(req,res){
  res.sendFile(__dirname+"/public/html/mainindex.html");
})

app.post("/signup", function(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Check that username and email are not empty or undefined
  if (!username || !email) {
    return res.status(400).send("Username and email are required.");
  }

  const newuser = new User({
    username: username,
    email: email,
    password: password
  });

  newuser.save()
    .then(() => {
      console.log('Signed up successfully');
      res.sendFile(__dirname + "/public/html/login.html");
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error signing up user.");
    });
});

app.post("/login",function(req,res){
  const name = req.body.name;
  const pass = req.body.password;
  console.log(name);
  console.log(pass);
  db.collection('users').findOne({username:name})
                        .then(use=>{
                          if(use==null){
                               console.log("No such user exists");
                               res.sendFile(__dirname+"/public/html/login.html");
                          }
                          else{
                                if(use.password===pass){
                                  console.log('login Successful');
                                  res.sendFile(__dirname+"/public/html/index to paws.html");
                                }
                                else{
                                  console.log("incorrect password");
                                  res.sendFile(__dirname+"/public/html/login.html");
                               }
                            }
                          })
  })
  app.post("/register", function(req, res) {
    const name = req.body.name;
    const dob = req.body.dob;
    const email = req.body.email;
    const phnum = req.body.phnum;
    const gender = req.body.gender;
    const occupation = req.body.occupation;
    const addtyp = req.body.addtyp;
    const nationality = req.body.nationality;
    const state = req.body.state;
    const dist = req.body.dist;
    const blknum = req.body.blknum;
    const wardnum =req.body.wardnum;
  
    // Check that username and email are not empty or undefined
    if (!name || !email || !dob ||!phnum||!gender||!occupation||!nationality||!state||!dist||!blknum||!wardnum) {
      return res.status(400).send("Missing cells are required.");
    }
  
    const newregister = new register({
      name: name,
      dob:dob,
      email: email,
      phnum:phnum,
      gender:gender,
      occupation:occupation,
      addtyp:addtyp,
      nationality:nationality,
      state:state,
      dist:dist,
      blknum:blknum,
      wardnum: wardnum
    });
  
    newregister.save()
      .then(() => {
        console.log('Registered successfully');
        res.sendFile(__dirname + "/public/html/index to paws.html");
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error registering.");
      });
  });
  
  app.listen(3000, function() {
    console.log("Server is running at port 3000");
  });