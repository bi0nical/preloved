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
// AJAX STARTS HERE
// =====================================
    let url;//declare url as a variable in es6
    $.ajax({
      url: 'config.json',
      type: 'GET',
      dataType: 'json',
      success:function(configData){
        console.log(configData.SERVER_URL,configData.SERVER_PORT );
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
          console.log(url);
          cardLoad(url);
      },
      error:function(error){
        console.log(error);
      
      }
    })
// =====================================
// AJAX ENDS HERE
// =====================================

// =====================================
// LISTING FUNCTIONS START HERE
// =====================================


//view all listings start here
function cardLoad(url) {

  $.ajax({
    url: `http://${url}/allListingFromDB`,
    type: 'GET',
    dataType: 'JSON',
    success: function(listingsFromDB){
      var i;
      document.getElementById('cardBox').innerHTML = "";
      for(i=0;i<listingsFromDB.length;i++){
        document.getElementById('cardBox').innerHTML +=
        `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${listingsFromDB[i].img1}" alt="Card image cap">
        <img class="card-img-top" src="${listingsFromDB[i].img2}" alt="Card image cap">
        <img class="card-img-top" src="${listingsFromDB[i].img3}" alt="Card image cap">
        <div class="card-body">
        <div class="bodytop"><p>${listingsFromDB[i].name}</p><br />
        <p>${listingsFromDB[i].date}</p></br>
        <p>$${listingsFromDB[i].price}</p></br>
        <p>${listingsFromDB[i].size1}</p></br>
        <p>${listingsFromDB[i].size2}</p></br>
        <p>${listingsFromDB[i].desc}</p></br>
        <p>${listingsFromDB[i].gender}</p></br>
        <p>${listingsFromDB[i].color}</p></br>
        <p>${listingsFromDB[i].brand}</p></br>
        <p>${listingsFromDB[i].type}</p></br>
        
        </div>
        <div class="bodybottom">
        <i id="${listingsFromDB[i]._id}" class="editClick"  data-bs-toggle="modal" data-bs-target="#editModal">Edit</i><br>

        <i id="${listingsFromDB[i]._id}" class="delClick"  data-bs-toggle="modal" data-bs-target="#delModal">Delete</i>
        <button type="button" id="buyButton" class= "btnCard">Buy Now</button>
        </div>
        </div>
        </div>
        `
        // placeholder for cards above ^^^^. remove when actual cards made


        //delete cards/listings caller starts here
        document.querySelectorAll('.delClick').forEach(function(trash){
          trash.addEventListener('click', function(e){
        console.log(e.target.id);
         let listing_Id = e.target.id;
         console.log(listing_Id)
         console.log(url);
        
        $('#delButton_confirm').click(function(){
         event.preventDefault();
         deleteFunction(listing_Id);
        })
      })
    })
//delete cards/listings caller ends here

//edit cards/listings caller ends here
document.querySelectorAll('.editClick').forEach(function(edit){
  edit.addEventListener('click', function(e){
console.log(e.target.id);
 let listing_Id = e.target.id;
 console.log(listing_Id)
 console.log(url);

$('#editListingButton').click(function(){
 event.preventDefault();
 editFunction(listing_Id);
})
})
})
//edit cards/listings caller ends here



      }
    }, 
    error:function(){
      console.log('unable to get listings from DB');
    }

  })
}
//view all listings end here
// ${listingsFromDB[i]._id}
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
              window.location.reload();
            },
            error : function(){
              console.log('error: cannot call api');
            }//error
          })//ajax
        }//else
      });//addListing
//AddListing End

//delete listing start
function deleteFunction(listing_Id){
$.ajax({
  url : `http://${url}/deleteListing/${listing_Id}`,
  type:'DELETE',
  success : function(){
    alert('deleted listing');

   window.location.reload();
  }, //success
  error:function(){
    console.log('error: cannot call api');
  }//error
})//ajax


};//delete listing

// edit listing function start
function editFunction(listing_Id){
  console.log(listing_Id);
  event.preventDefault();
let name = $('#nameInputEdit').val();
  let desc = $('#descInputEdit').val();
  let price = $('#priceInputEdit').val();
  let img1 = $('#imgOneInputEdit').val();
  let img2 = $('#imgTwoInputEdit').val();
  let img3 = $('#imgThreeInputEdit').val();
  let size1 = $('#sizeNoInputEdit').val();
  let size2 = $('#sizeLetterInputEdit').val();
  let type = $('#typeInputEdit').val();
  let brand = $('#brandInputEdit').val();
  let color = $('#colourInputEdit').val();
  let gender = $('#genderInputEdit').val();
  console.log(name,price,desc,img1,img2,img3,size1,size2,type,brand,color,gender);
  if (listing_Id == ''){
    alert('Please enter product id for updating');
  } else {
    $.ajax({
      url: `http://${url}/updateListing/${listing_Id}`,
      type: 'PATCH',
      data:{
     
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
      success: function(data){
        alert('updated listing');

        window.location.reload();
      }, //success
      error: function(){
        console.log('error: cannot update post');
      } //error
    })//ajax
  }//if
}
//edit listing function end





// ==================================
// LISTING FUNCTIONS END HERE
// =====================================

// =====================================
//USER FUNCTIONS START HERE
// =====================================

// User Registration START
$('#registerButton').click(function(){
    event.preventDefault()//this prevents code breaking when no data is found
    
    let username = $('#registerName').val();
    let email = $('#registerEmail').val();
    let password = $('#registerPass1').val();
    let password2 = $('#registerPass2').val();
    let profile_img = $('#registerImage').val();
    // let location = $('#').val();


    console.log(username, email, password, password2, profile_img);
  
    if (username == '' || email == '' || password == ''){
      alert('Please enter Username, Email and Password');
  
    }else {
      if (password === password2){
      $.ajax({
        url: `http://${url}/registerUser`,
        type : 'POST',
        data : {
          username: username,
          email: email,
          password: password,
         
        },
        success:function(user){
          console.log(user); //remove when development is finished
          if (user !== 'username taken already. Please try another name'){
          
              alert('Thank you for registering');
              window.location.href = "shop.html";


  
          }else {
            alert('Username taken already. Please try another name');
            $('#').val(''); //username tag
            $('#').val(''); // email tag
            $('#').val(''); // password tag
            $('#').val(''); // profile image tag
            // $('#').val(''); // location tag
          }
  
        }, //success
        error:function(){
          console.log('error: cannot call api');
        }//error
      })//ajax post
    }else {
      alert('You need to make your passwords match');
    }//password if
    }//if

  })//submit click

// USER REGISTRATION END

//Login User
$('#loginButton').click(function(){
  event.preventDefault();
  let username = $('#loginName').val();
  let password = $('#loginPass').val();

 

  console.log(username, password);

 

  if (username == '' || password == ''){
    alert('Please enter all details');
  } else {
    $.ajax({
      url: `http://${url}/loginUser`,
      type: 'POST',
      data :{
        username : username,
        password : password
      },
      success: function(user){
        console.log(user);

 

        if (user == 'user not found. Please register'){
          alert('User not found. Please Register');
        } else if (user == 'not authorized'){
          alert('Please try with correct details');
          $('#username_log').val('');
          $('#password_pass').val('');
        } else {
          sessionStorage.setItem('userID', user['_id']);
          sessionStorage.setItem('userName', user['username']);
          sessionStorage.setItem('userEmail', user['email']);
          console.log(sessionStorage);
          alert('Sucessful login');
        }// end of ifs
      },//success
      error:function(){
        console.log('error: cannot call api');
        alert('Unable to login - unable to call api');
      }//error
    })//end of ajax
  } //end of else
});//end of login click function

$('#logoutButton').click(function(){
  sessionStorage.clear();
  console.log(sessionStorage);
  alert('Sucessful logout');

})
// =====================================
//USER FUNCTIONS END HERE
// =====================================

  })

  // =====================================
// DOCUMENT READY ENDS HERE
// =====================================