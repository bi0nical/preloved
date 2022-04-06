console.log("testing"); 

console.log(sessionStorage);


$(document).ready(function(){


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

  })