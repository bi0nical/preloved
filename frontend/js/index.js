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
// ADD AN ITEM MODAL STARTS HERE
// =====================================

function modalAddItem(){
  $('#addItem').click(function(){
    console.log('modal working')
    $(".modal-header").empty().append(
      `
      <h5 class="modal-title" id="exampleModalLabel">List an item</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

      `
    )
    $(".modal-body").empty().append(
      `                    
      <div class="modal-left">
      <form>
      <div class="form-group">
          <label for="nameInput">Name</label>
          <input id="nameInput" type="text" class="form-control">
      </div>
      <br>
      <div class="form-group">
          <label for="descInput">Description</label>
          <textarea id="descInput" type="text" class="form-control" rows="10"></textarea>
      </div>
      <br>
      <div class="form-group">
          <label for="priceInput">Price</label>
          <input id="priceInput" type="text" class="form-control">
      </div>
      <br>
      <div class="form-group">
          <label for="imgOneInput">Image 1 url</label>
          <input id="imgOneInput" type="text" class="form-control"  placeholder="place url here">
      </div>
      <br>
      <div class="form-group">
          <label for="imgTwoInput">Image 2 url</label>
          <input id="imgTwoInput" type="text" class="form-control" placeholder="place url here">
      </div>
      <br>
      <div class="form-group">
          <label for="imgThreeInput">Image 3 url</label>
          <input id="imgThreeInput" type="text" class="form-control" placeholder="place url here">
      </div>
      <br>
      </div>
      <div class="modal-right">

      <div class="form-group">
      <label for="sizeNoInput">Size No.</label>
      <input id="sizeNoInput" type="text" class="form-control" placeholder="US/UK Size">
  </div>
  <br>
  <div class="form-group">
      <label for="sizeLetterInput">Size Letter</label>
      <select id="sizeLetterInput" class="form-control" >
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
        <option>XXXL</option>
        <option>N/A</option>
      </select>
  </div>
  <br>
  <div class="form-group">
      <label for="typeInput">Type</label>
      <select id="typeInput" type="text" class="form-control" placeholder="type in type">
        <option disabled selected value>Select a type</option>
        <option>Beanie</option>
        <option>Boots</option>
        <option>Bucket Hat</option>
        <option>Cap</option>
        <option>Corset</option>
        <option>Crop Top</option>
        <option>Dress</option>
        <option>Heels</option>
        <option>Jacket</option>
        <option>Jeans</option>
        <option>Jewelery</option>
        <option>Sandals</option>
        <option>Shirts</option>
        <option>Shorts</option>
        <option>Skirt</option>
        <option>Sneakers</option>
        <option>Sunglasses</option>
        <option>Sweaters</option>
        <option>Trainers</option>
        <option>Trousers</option>
        <option>Watch</option>
        <option>Other...</option>
      </select>
  </div>
  <div class="form-group">
      <label for="brandInput">Brand</label>
      <input id="brandInput" type="text" class="form-control" placeholder="Leave empty if unbranded">
  </div>
  <br>
  <div class="form-group">
      <label for="colourInput">Colour</label>
      <select id="colourInput" type="text" class="form-control">
      <option disabled selected value>Select a color</option>
      <option>Beige</option>
      <option>Black</option>
      <option>Blue</option>
      <option>Orange</option>
      <option>Purple</option>
      <option>Green</option>
      <option>Grey</option>
      <option>White</option>
      <option>Yellow</option>
      <option>Mixed</option>
      </select>
  </div>
  <br>
  <div class="form-group">
      <label for="genderInput">Gender style</label>
      <select id="genderInput" class="form-control">
        <option disabled selected value>Select a gender style</option>
        <option>Male</option>
        <option>Female</option>
        <option>Unisex</option>
      </select>
  </div>
        </div>

          `
    )

    $(".modal-footer").empty().append(
      `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" id="addListingButton" class="btn btn-primary">Save changes</button>
      `
    )
  })
}
modalAddItem()

// =====================================
// ADD AN ITEM MODAL ENDS HERE
// =====================================




// =====================================
// LISTING FUNCTIONS STARTS HERE
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
// SLIDE IN NAV ELEMENTS START HERE
// =====================================

// slide in categories button
$("#slideInLeftNavBtn").click(function (){
  console.log("slide in left clicked");
  $(".categories-container").css("transform", "translateX(0vw)");
})

// slide out categories button
$("#closeLeftNav").click(function (){
  $(".categories-container").css("transform", "translateX(-50rem)");
})

// categories menu buttons
$("#topsCategoryBtn").click(function (){
  // colour button as active, deactive others
  $("#topsCategoryBtn").addClass("btn-active");
  $("#bottomsCategoryBtn").removeClass("btn-active");
  $("#hatsCategoryBtn").removeClass("btn-active");
  $("#shoesCategoryBtn").removeClass("btn-active");
  $("#dressesCategoryBtn").removeClass("btn-active");
  $("#accessoriesCategoryBtn").removeClass("btn-active");
  // show sublist, hide others
  $("#topsCategoryList").css("display", "block");
  $("#bottomsCategoryList").css("display", "none");
  $("#hatsCategoryList").css("display", "none");
  $("#shoesCategoryList").css("display", "none");
  $("#dressesCategoryList").css("display", "none");
  $("#accessoriesCategoryList").css("display", "none");
})
$("#bottomsCategoryBtn").click(function (){
  // colour button as active, deactive others
  $("#topsCategoryBtn").removeClass("btn-active");
  $("#bottomsCategoryBtn").addClass("btn-active");
  $("#hatsCategoryBtn").removeClass("btn-active");
  $("#shoesCategoryBtn").removeClass("btn-active");
  $("#dressesCategoryBtn").removeClass("btn-active");
  $("#accessoriesCategoryBtn").removeClass("btn-active");
  // show sublist, hide others
  $("#topsCategoryList").css("display", "none");
  $("#bottomsCategoryList").css("display", "block");
  $("#hatsCategoryList").css("display", "none");
  $("#shoesCategoryList").css("display", "none");
  $("#dressesCategoryList").css("display", "none");
  $("#accessoriesCategoryList").css("display", "none");
})
$("#hatsCategoryBtn").click(function (){
  // colour button as active, deactive others
  $("#topsCategoryBtn").removeClass("btn-active");
  $("#bottomsCategoryBtn").removeClass("btn-active");
  $("#hatsCategoryBtn").addClass("btn-active");
  $("#shoesCategoryBtn").removeClass("btn-active");
  $("#dressesCategoryBtn").removeClass("btn-active");
  $("#accessoriesCategoryBtn").removeClass("btn-active");
  // show sublist, hide others
  $("#topsCategoryList").css("display", "none");
  $("#bottomsCategoryList").css("display", "none");
  $("#hatsCategoryList").css("display", "block");
  $("#shoesCategoryList").css("display", "none");
  $("#dressesCategoryList").css("display", "none");
  $("#accessoriesCategoryList").css("display", "none");
})
$("#shoesCategoryBtn").click(function (){
  // colour button as active, deactive others
  $("#topsCategoryBtn").removeClass("btn-active");
  $("#bottomsCategoryBtn").removeClass("btn-active");
  $("#hatsCategoryBtn").removeClass("btn-active");
  $("#shoesCategoryBtn").addClass("btn-active");
  $("#dressesCategoryBtn").removeClass("btn-active");
  $("#accessoriesCategoryBtn").removeClass("btn-active");
  // show sublist, hide others
  $("#topsCategoryList").css("display", "none");
  $("#bottomsCategoryList").css("display", "none");
  $("#hatsCategoryList").css("display", "none");
  $("#shoesCategoryList").css("display", "block");
  $("#dressesCategoryList").css("display", "none");
  $("#accessoriesCategoryList").css("display", "none");
})
$("#dressesCategoryBtn").click(function (){
  // colour button as active, deactive others
  $("#topsCategoryBtn").removeClass("btn-active");
  $("#bottomsCategoryBtn").removeClass("btn-active");
  $("#hatsCategoryBtn").removeClass("btn-active");
  $("#shoesCategoryBtn").removeClass("btn-active");
  $("#dressesCategoryBtn").addClass("btn-active");
  $("#accessoriesCategoryBtn").removeClass("btn-active");
  // show sublist, hide others
  $("#topsCategoryList").css("display", "none");
  $("#bottomsCategoryList").css("display", "none");
  $("#hatsCategoryList").css("display", "none");
  $("#shoesCategoryList").css("display", "none");
  $("#dressesCategoryList").css("display", "block");
  $("#accessoriesCategoryList").css("display", "none");
})
$("#accessoriesCategoryBtn").click(function (){
  // colour button as active, deactive others
  $("#topsCategoryBtn").removeClass("btn-active");
  $("#bottomsCategoryBtn").removeClass("btn-active");
  $("#hatsCategoryBtn").removeClass("btn-active");
  $("#shoesCategoryBtn").removeClass("btn-active");
  $("#dressesCategoryBtn").removeClass("btn-active");
  $("#accessoriesCategoryBtn").addClass("btn-active");
  // show sublist, hide others
  $("#topsCategoryList").css("display", "none");
  $("#bottomsCategoryList").css("display", "none");
  $("#hatsCategoryList").css("display", "none");
  $("#shoesCategoryList").css("display", "none");
  $("#dressesCategoryList").css("display", "none");
  $("#accessoriesCategoryList").css("display", "block");
})

// =====================================
// SLIDE IN NAV ELEMENTS START HERE
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

// =====================================
//USER FUNCTIONS END HERE
// =====================================

  })

  // =====================================
// DOCUMENT READY ENDS HERE
// =====================================