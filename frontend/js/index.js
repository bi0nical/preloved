// =====================================
// GLOBAL CONSOLE LOGS + VARIABLES START HERE
// =====================================
console.log("testing"); 

console.log(sessionStorage);
// =====================================
// GLOBAL CONSOLE LOGS+ VARIABLES END HERE
// =====================================

// =====================================
// DOCUMENT READY STARTS HERE
// =====================================

$(document).ready(function(){
    let url;//declare url as a variable in es6
    $.ajax({
      url: 'config.json',
      type: 'GET',
      dataType: 'json',
      success:function(configData){
        console.log(configData.SERVER_URL,configData.SERVER_PORT );
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
          console.log(url);
          //insert card loader here
      },
      error:function(error){
        console.log(error);
      
      }
    })
// =====================================
// LISTING FUNCTIONS START HERE
// =====================================

//add listing start
    $('#addListingButton').click(function(){
        event.preventDefault();
        let name = $('#nameInput').val();
        let desc = $('#descInput').val();
        let price = $('#priceInput').val();
        let img1 = $('#imgOneInput').val();
        let img2 = $('#imgTwoInput').val();
        let img3 = $('#imgThreeInput').val();
        let size1 = $('#sizeNoInput').val();
        let size2 = $('#sizeLetterInput').val();
        let type = $('#typeInput').val();
        let brand = $('#brandInput').val();
        let color = $('#colourInput').val();
        let gender = $('#genderInput').val();
        
        console.log(name,price,desc,img1,img2,img3,size1,size2,type,brand,color,gender);
        if (name == '' || price == '' ||  img1 == '' || size2 == '' || type == ''|| gender == ''){
          alert('Please enter relevant details');
        } else {
          $.ajax({
            url : `http://${url}/addListing`,
            type : 'POST',
            data :{
              name: name,
              desc: desc,
              price: price,
              img1: img1,
              img2: img2,
              img3: img3,
              size1: size1,
              size2: size2,
              type: type,
              brand: brand,
              color: color,
              gender: gender
            },
            success : function(listing){
              console.log(listing);
              alert ('listing added');
            },
            error : function(){
              console.log('error: cannot call api');
            }//error
          })//ajax
        }//else
      });//addListing
//AddListing End

// =====================================
// LISTING FUNCTIONS END HERE
// =====================================

// =====================================
//USER FUNCTIONS START HERE
// =====================================

// // User Registration START
// $('#').click(function(){
//     event.preventDefault()//this prevents code breaking when no data is found
    
//     let username = $('#').val();
//     let email = $('#').val();
//     let password = $('#').val();
//     let profile_img = $('#').val();
//     let location = $('#').val();


//     console.log(username, email, password, profile_img, location);
  
//     if (username == '' || email == '' || password == ''){
//       alert('Please enter Username, Email and Password');
  
//     }else {
//       $.ajax({
//         url: `http://${url}/registerUser`,
//         type : 'POST',
//         data : {
//           username :username,
//           email :email,
//           password:password
//         },
//         success:function(user){
//           console.log(user); //remove when development is finished
//           if (user !== 'username taken already. Please try another name'){
//             alert('Thank you for registering. Please login');
  
//           }else {
//             alert('Username taken already. Please try another name');
//             $('#').val(''); //username tag
//             $('#').val(''); // email tag
//             $('#').val(''); // password tag
//             $('#').val(''); // profile image tag
//             $('#').val(''); // location tag
//           } //else
  
//         }, //success
//         error:function(){
//           console.log('error: cannot call api');
//         }//error
//       })//ajax post
//     }//if
//   })//submit click

//USER REGISTRATION END

// =====================================
//USER FUNCTIONS END HERE
// =====================================

  })

  // =====================================
// DOCUMENT READY ENDS HERE
// =====================================