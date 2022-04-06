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
// =====================================
// LISTING FUNCTIONS START HERE
// =====================================

//add listing start
    $('#addListing').click(function(){
        event.preventDefault();
        let name = $('#').val();
        let desc = $('#').val();
        let price = $('#').val();
        let img1 = $('#').val();
        let img2 = $('#').val();
        let img3 = $('#').val();
        let size1 = $('#').val();
        let size2 = $('#').val();
        let type = $('#').val();
        let brand = $('#').val();
        let color = $('#').val();
        let gender = $('#').val();
        
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

// User Registration START
$('#').click(function(){
    event.preventDefault()//this prevents code breaking when no data is found
    
    let username = $('#').val();
    let email = $('#').val();
    let password = $('#').val();
    let profile_img = $('#').val();
    let location = $('#').val();


    console.log(username, email, password, profile_img, location);
  
    if (username == '' || email == '' || password == ''){
      alert('Please enter Username, Email and Password');
  
    }else {
      $.ajax({
        url: `http://${url}/registerUser`,
        type : 'POST',
        data : {
          username :username,
          email :email,
          password:password
        },
        success:function(user){
          console.log(user); //remove when development is finished
          if (user !== 'username taken already. Please try another name'){
            alert('Thank you for registering. Please login');
  
          }else {
            alert('Username taken already. Please try another name');
            $('#').val(''); //username tag
            $('#').val(''); // email tag
            $('#').val(''); // password tag
            $('#').val(''); // profile image tag
            $('#').val(''); // location tag
          } //else
  
        }, //success
        error:function(){
          console.log('error: cannot call api');
        }//error
      })//ajax post
    }//if
  })//submit click

//USER REGISTRATION END

// =====================================
//USER FUNCTIONS END HERE
// =====================================

  })

  // =====================================
// DOCUMENT READY ENDS HERE
// =====================================