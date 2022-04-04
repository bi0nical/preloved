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
   const Product = require('./models/product.js');
   const User = require('./models/user.js');
   const Portfolios = require('./models/portfolios');
   
   
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