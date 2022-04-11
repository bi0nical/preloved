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
          // cardLoad(url);
          appendListings(url);
          appendListingsToAccount(url);
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
// CONTACT SUBMIT STARTS HERE
// =====================================

function submitForm(){
  $('#contactSubmit').click(function(){
    console.log('click');
    document.getElementById('contactLeft').innerHTML = "";

    $("#contactLeft").append(
      `
      <h1 class="contact-ty">Thank you!<br> Your message has been recieved.</h1>
      `
    )
  })
};

submitForm();

// =====================================
// CONTACT SUBMIT ENDS HERE
// =====================================




// =====================================
// LISTING FUNCTIONS STARTS HERE
// =====================================

// BELOW FUNCTION IS APPENDING CARDS TO THE SHOP PAGE
function appendListings(url){
  $.ajax({
    url: `http://${url}/allListingFromDB`,
    type: 'GET',
    dataType: 'JSON',
    success: function(listingsFromDB){
      console.log(listingsFromDB)
      let i;
      document.getElementById('clothingCardGrid').innerHTML = "";
      for(i = 0; i < listingsFromDB.length; i++){
        let price = listingsFromDB[i].price.toFixed(2);
        document.getElementById('clothingCardGrid').innerHTML +=
        `
        
        <div id="${listingsFromDB[i]._id}" class="clothingCard" data-bs-toggle="modal" data-bs-target="#clothingItemModal">
          <div style="background: url('${listingsFromDB[i].img1}'); background-size: cover; background-position: center;" class="clothingCard__imgContainer">
              
          </div>
          <div class="clothingCard__details">
              <h2 class="clothingCard__title">${listingsFromDB[i].name}</h2>
              <p class="clothingCard__price">$${price}</p>
              <div class="clothingCard__tags">
                  <p class="clothingCard__tag">${listingsFromDB[i].brand}</p>
                  <p class="clothingCard__tag">${listingsFromDB[i].brand}i</p>
              </div>
          </div>
        </div>

        `

        document.querySelectorAll('.clothingCard').forEach(function(clothingItem) {
          clothingItem.addEventListener('click', function(e) {
            console.log(url);
              console.log(e.target.parentNode.id);
              let id = e.target.parentNode.id;
              
              $.ajax({
                    url: `http://${url}/allListingFromDB/${id}`,
                    type: 'GET',
                    dataType: 'JSON',
                    success:function(singleListing){
                      console.log(singleListing);
                      let price = singleListing.price.toFixed(2);
                      $('#clothingModal').empty().append(

                        `
                        <div style="background: url('${singleListing.img1}'); background-size: cover; background-position: center;" class="clothingItemModal__left">

                        </div>
                        <div class="clothingItemModal__right">
                            <div class="clothingItemModal__closeTop">
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                          
                            <div class="clothingItemModal__mainDetails">
                              <h1 class="clothingItemModal__name">${singleListing.name}</h1>
                              <h2 class="clothingItemModal__price">${price}</h2>
                              <h6 class="clothingItemModal__location">${singleListing.location}</h6>
                            </div>

                            <div class="clothingItemModal__divider"></div>
                            
                            <div class="clothingItemModal__descContainer">
                              <p class="clothingItemModal__desc">${singleListing.desc}</p>
                            </div>
                            <div class="clothingItemModal__divider">

                            </div>
                            <div class="clothingItemModal__details">
                              <div class="clothingItemModal__details1">
                                  <p class="clothingItemModal__sizeTitle">Size:</p>
                                  <p class="clothingItemModal__size">${singleListing.size1}</p>
                              </div>
                              <div class="clothingItemModal__details2">
                                  <p class="clothingItemModal__brandTitle">Brand:</p>
                                  <p class="clothingItemModal__brand">${singleListing.brand}</p>
                              </div>
                              <div class="clothingItemModal__details3">
                                  <p class="clothingItemModal__colorTitle">Colour:</p>
                                  <p class="clothingItemModal__color">${singleListing.color}</p>
                              </div>
                              <div class="clothingItemModal__details4">
                                  <p class="clothingItemModal__madeinTitle">Made In:</p>
                                  <p class="clothingItemModal__madein">USA</p>
                              </div>
                            </div>
                            <div class="clothingItemModal__divider">
                                
                          </div>
                            <div class="clothingItemModal__user">
                              <div class="clothingItemModal__profilePic">

                              </div>
                              <h4 class="clothingItemModal__username">user1234</h4>
                            </div>
                            <div class="clothingItemModal__divider">
                                
                          </div>
                            <div class="clothingItemModal__btns">
                              <button data-bs-dismiss="modal" class="clothingItemModal__close">close</button>
                              <button class="clothingItemModal__addToCard">add to cart</button>
                            </div>
                        </div>

                        `
                        
                       
                        
                        );
                      
                    }
                  })
          });
        })

        
      }
    }
  })
}

// ================================
// APPEND LISTINGS TO ACCOUNT PAGE
// ================================

function appendListingsToAccount(url){
  $.ajax({
    url: `http://${url}/allListingFromDB`,
    type: 'GET',
    dataType: 'JSON',
    success: function(listingsFromDB){
      console.log(listingsFromDB);
      let userid = sessionStorage.getItem('userID');
      console.log(userid);

      let i;
      document.getElementById('accountListingsGrid').innerHTML = "";
      for(i = 0; i < listingsFromDB.length; i++){
        if(listingsFromDB[i].user_id === userid){
          let price = listingsFromDB[i].price.toFixed(2);
          document.getElementById('accountListingsGrid').innerHTML +=
          `
          
          <div id="${listingsFromDB[i]._id}" class="clothingCard" data-bs-toggle="modal" data-bs-target="#clothingItemModal">
            <div style="background: url('${listingsFromDB[i].img1}'); background-size: cover; background-position: center;" class="clothingCard__imgContainer">
                
            </div>
            <div class="clothingCard__details">
                <h2 class="clothingCard__title">${listingsFromDB[i].name}</h2>
                <p class="clothingCard__price">$${price}</p>
                <div class="clothingCard__tags">
                    <p class="clothingCard__tag">${listingsFromDB[i].brand}</p>
                    <p class="clothingCard__tag">${listingsFromDB[i].brand}i</p>
                </div>
            </div>
          </div>
  
          `

          
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
// edit cards/listings caller ends here
          document.querySelectorAll('.clothingCard').forEach(function(yourListingsClothingItem) {
            yourListingsClothingItem.addEventListener('click', function(e) {
              console.log(url);
                console.log(e.target.parentNode.id);
                let id = e.target.parentNode.id;
                
                $.ajax({
                      url: `http://${url}/allListingFromDB/${id}`,
                      type: 'GET',
                      dataType: 'JSON',
                      success:function(singleListing){
                        console.log(singleListing);
                        let price = singleListing.price.toFixed(2);
                        $('#yourListingsClothingModal').empty().append(
  
                          `
                          <div style="background: url('${singleListing.img1}'); background-size: cover; background-position: center;" class="clothingItemModal__left">
  
                          </div>
                          <div class="clothingItemModal__right">
                              <div class="clothingItemModal__closeTop">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                            
                              <div class="clothingItemModal__mainDetails">
                                <h1 class="clothingItemModal__name">${singleListing.name}</h1>
                                <h2 class="clothingItemModal__price">${price}</h2>
                                <h6 class="clothingItemModal__location">${singleListing.location}</h6>
                              </div>
  
                              <div class="clothingItemModal__divider"></div>
                              
                              <div class="clothingItemModal__descContainer">
                                <p class="clothingItemModal__desc">${singleListing.desc}</p>
                              </div>
                              <div class="clothingItemModal__divider">
  
                              </div>
                              <div class="clothingItemModal__details">
                                <div class="clothingItemModal__details1">
                                    <p class="clothingItemModal__sizeTitle">Size:</p>
                                    <p class="clothingItemModal__size">${singleListing.size1}</p>
                                </div>
                                <div class="clothingItemModal__details2">
                                    <p class="clothingItemModal__brandTitle">Brand:</p>
                                    <p class="clothingItemModal__brand">${singleListing.brand}</p>
                                </div>
                                <div class="clothingItemModal__details3">
                                    <p class="clothingItemModal__colorTitle">Colour:</p>
                                    <p class="clothingItemModal__color">${singleListing.color}</p>
                                </div>
                                <div class="clothingItemModal__details4">
                                    <p class="clothingItemModal__madeinTitle">Made In:</p>
                                    <p class="clothingItemModal__madein">USA</p>
                                </div>
                              </div>
                              <div class="clothingItemModal__divider">
                                  
                            </div>
                              <div class="clothingItemModal__user">
                                <div class="clothingItemModal__profilePic">
  
                                </div>
                                <h4 class="clothingItemModal__username">user1234</h4>
                              </div>
                              <div class="clothingItemModal__divider">
                                  
                            </div>
                              <div class="clothingItemModal__btns">
                                <button data-bs-dismiss="modal" class="clothingItemModal__close">close</button>
                                <button class="clothingItemModal__addToCard">add to cart</button>
                              </div>
                          </div>
  
                          `
                          
                         
                          
                          );
                        
                      }
                    })
            });
          })
        }
        
      };
    }
  })
};
// CLOTHING ITEM MODAL FUNCTION







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
        profile_img: profile_img
       
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
//add listing start
    $('#addListingButton').click(function(){
        event.preventDefault();
        console.log(sessionStorage);
         
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
        let user_id = sessionStorage.getItem('userID');
        let user_name = sessionStorage.getItem('userName');
        
        console.log(user_id, user_name);
        if (name == '' || price == '' ||  img1 == '' || size2 == '' || type == ''|| gender == ''){
          alert('Please enter relevant details');
        } else {
          if (sessionStorage.getItem('userID') === null){
            alert('Please log in or register to add listings')
            console.log('hi');

          } else{
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
              gender: gender,
              user_id: user_id,
              user_name: user_name
            },
            success : function(listing){
              console.log(listing);
              alert ('listing added');
              // window.location.reload();
            },
            error : function(){
              console.log('error: cannot call api');
            }//error
          })//ajax
        }//inner else
        }//outer else
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

// LEFT NAV

// slide in categories button
$("#slideInLeftNavBtn").click(function (){
  $(".filters").css("transform", "translateX(-25rem)");
  $("#slideInFiltersBtn").css("transform", "translateX(0vw)")
  $("#slideInLeftNavBtn").css("transform", "translateX(-100%)")
  $(".categories-container").css("transform", "translateX(0vw)");
})

// slide out categories button
$("#closeLeftNav").click(function (){
  $(".categories-container").css("transform", "translateX(-50rem)");
  $("#slideInLeftNavBtn").css("transform", "translateX(0%)")
})

// slide in filters button
$("#slideInFiltersBtn").click(function (){
  $("#slideInFiltersBtn").css("transform", "translateX(-100%)")
  $(".filters").css("transform", "translateX(0vw)");
})

// slide out filters button
$("#closeFiltersBtn").click(function (){
  $(".filters").css("transform", "translateX(-25rem)");
  $("#slideInFiltersBtn").css("transform", "translateX(0vw)")
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

// RIGHT NAV

$("#slideInCartBtn").click(function (){
  $(".cart-container").css("transform", "translateX(0rem)");
  $(".starred").css("transform", "translateX(25rem)");
})
$("#closeCartBtn").click(function (){
  $(".cart-container").css("transform", "translateX(50rem)");
})

$("#slideInStarredBtn").click(function (){
  $(".starred").css("transform", "translateX(0rem)");
})
$("#closeStarredBtn").click(function (){
  $(".starred").css("transform", "translateX(25rem)");
})

// =====================================
// SLIDE IN NAV ELEMENTS START HERE
// =====================================






  })

  // =====================================
// DOCUMENT READY ENDS HERE
// =====================================