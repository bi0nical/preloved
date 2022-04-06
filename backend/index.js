// <--! Global backend constants start here -->
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
   
   // <--! Global backend constants end here -->
   
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


// TESTING! WARNING TESTING FUNCTION! TESTING ONLY!


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
      // style: req.body.style,
      // swap: req.body.swap,
      // location: req.body.location,
      // tags: req.body.tags,
      // user_id: req.body.user_id,
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
      alert('not found');
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
//   TESTING! WARNING TESTING FUNCTION! TESTING ONLY!





  
