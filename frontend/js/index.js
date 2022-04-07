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
document.querySelectorAll('.editClick').forEach(function(trash){
  trash.addEventListener('click', function(e){
console.log(e.target.id);
 let listing_Id = e.target.id;
 console.log(listing_Id)
 console.log(url);

$('#editButton_confirm').click(function(){
 event.preventDefault();
 deleteFunction(listing_Id);
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

//delete listing
};





// ==================================
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