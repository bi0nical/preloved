// =====================================
// GLOBAL VARIABLES START
// =====================================
   // Installing packages begins
   const express = require('express'); //Includes express js
   const app = express(); // Variable for express
   const bodyParser = require('body-parser'); // Includes bodyParser
   const mongoose = require('mongoose'); // Includes mongoose
   const bcrypt = require('bcryptjs'); // Includes bcrypt
   const cors = require('cors'); // Includes cors
   const config = require('./config.json');
   //Database collection variables (product is for testing, user is for stretch goal and portfolios is the one we are using)
   const Listing = require('./models/listings.js');
   const User = require('./models/users.js');
   const Comment = require('./models/comments.js');
   
   
   // Backend port number
   const port = 5000;
   
  // =====================================
// GLOBAL VARIABLES END
// =====================================

// =====================================
// APP PaRSER/MONGOOSE START
// =====================================
   
   // <--! App parser code starts here -->
   
   app.use(bodyParser.json()); // Calling the body parser method
   app.use(bodyParser.urlencoded({extended:false})); // Preventing the URL from being parsed
   
   app.use(cors()); // Calling cors method with express
   
   app.get('/', (req,res) => res.send('Backend'))
   
   // <--! App parser code ends  here -->

   // <--! Mongoose url code starts here -->
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@prelovedDB.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log('DB Connected!'))
.catch(err=>{
  console.log(`DB Connection Error:${err.message}`); 
});
// <--! Mongoose url code ends here -->

// <--! port listening code starts here -->
app.listen(port,()=>console.log(`My fullstack application is listening on port ${port}`))
// <--! port listening code ends here -->


// =====================================
// APP PaRSER/MONGOOSE END
// =====================================

// =====================================
// LISTING FUNCTIONS START
// =====================================


//add listing START
app.post('/addListing',(req,res)=>{
    const dbListing = new Listing({
      _id: new mongoose.Types.ObjectId,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,      
      img1: req.body.img1,
      img2: req.body.img2,
      img3: req.body.img3,
      size1: req.body.size1,
      size2: req.body.size2,
      type: req.body.type,
      brand: req.body.brand,
      color: req.body.color,      
      date: new Date(),
      gender: req.body.gender,
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      comment_id: req.body.comment_id
      // style: req.body.style,
      // swap: req.body.swap,
      // location: req.body.location,
      // tags: req.body.tags,      
      // comment_id: req.body.comment_id

    });
    
    // save to database and to notify the user
    dbListing.save().then(result=>{
      res.send(result);
      
    }).catch(err=>res.send(err));
  })
//add listing END

//delete listing START
app.delete('/deleteListing/:id',(req,res)=>{
  const idParam = req.params.id;
  Listing.findOne({_id:idParam}, (err,listing)=>{
    if(listing){
      Listing.deleteOne({_id:idParam},err=>{
        console.log('deleted on backend request');
      });
    } else {
      console.log('not found');
    }
  }).catch(err=> res.send(err));
});//delete
//delete listing END

//update lisitngs start
app.patch('/updateListing/:id',(req,res)=>{
  const idParam = req.params.id;
  Listing.findById(idParam,(err,listing)=>{
      const updatedListing = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
        size1: req.body.size1,
        size2: req.body.size2,
        type: req.body.type,
        brand: req.body.brand,
        color: req.body.color,         
        gender: req.body.gender,
        // style: req.body.style,
        // location: req.body.location,
        // tags: req.body.tags,
      }
      Listing.updateOne({_id:idParam}, updatedListing).
      then(result=>{
        res.send(result);
      }).catch(err=> res.send(err));
  })
})
//update listings END



// All Listings view from DB function
  app.get('/allListingFromDB',(req,res)=>{
    Listing.find().then(result=>{
      res.send(result);
    })
  })


//All listings view END

// =====================================
// LISTING FUNCTIONS END
// =====================================

// =====================================
// USER FUNCTIONS START
// =====================================

// Get single listing for Modal
app.get('/allListingFromDB/:id', (req, res) => {
  const id= req.params.id;
  Listing.findById(id, function (err, listing) {
  if (err){
    console.log(err);
  }
  else{
    console.log("Result : ", listing);
    res.send(listing);
     }
   });
})
// Get single listing for Modal END


//Register User
app.post('/registerUser',(req,res)=>{
  //checking if user is in the db already
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      res.send('username taken already. Please try another name');
    } else {
      const hash = bcrypt.hashSync(req.body.password);//encrypt user Password
      const user = new User({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        email : req.body.email,
        profile_img: req.body.profile_img,
        // location: req.body.location, 
        password : hash
      });
      //save to database and notify userResult
      user.save().then(result=>{
        res.send(result);
      }).catch(err=>res.send(err));
    }
  })
})// end of register user

//Login User
app.post('/loginUser', ( req, res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      if (bcrypt.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else {
        res.send('not authorized');
      }// inner if
    } else {
      res.send('user not found. Please register');
    }//outer if
  });//find one ends
});//end of post for login

// =====================================
// USER FUNCTIONS END
// =====================================

// =====================================
// COMMENT FUNCTIONS START
// =====================================
//create a comment
app.post('/createComment', (req, res)=> {
  const newComment = new Comment({
    _id: new mongoose.Types.ObjectId,
    text: req.body.text,
    time: new Date(),
  user_id: req.body.user_id,
  listing_id: req.body.listing_id
  
  });
  newComment.save()
  .then(
    result => {
      Listing.updateOne({
        _id: req.body.listing_id
      }
      ).then(result =>{
        res.send(newComment);
      }).catch(err => {
        res.send(err);
      });
    });
  });//end create comment
  
  //delete comments
  app.delete('/deleteComments/:id', (req, res)=>{
    Comment.findOne({
      _id: req.params.id,
  
    }, (err, comment) => {
  if (comment && comment['user_id'] == req.body.user_id) {
  Products.updateOne({
    _id: comment.listing_id
  }
  ).then(result => {
    Comment.deleteOne({
      _id: req.params.id
    }, err =>{
      res.send('deleted comment');
    });
  }).catch(err => {
    res.send(err);
  });
  } else {
    res.send('not found / unauthorised access');
  }
    });
  });
  //end delete comments
 

  
// =====================================
// COMMENT FUNCTIONS END
// =====================================



  
