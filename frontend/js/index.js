// =====================================
// GLOBAL CONSOLE LOGS + VARIABLES START HERE
// =====================================

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
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
          if (window.location.pathname === "/frontend/shop.html"){
           
           
            appendListings(url);
      
       
          }if (window.location.pathname === "/frontend/mywardrobe.html"){
        
          
            appendListingsToAccount(url);  
            wardrobeLoginCheck(); 
          
            

          }
      },
      error:function(error){
        console.log(error);
      
      }
    });
// =====================================
// AJAX ENDS HERE
// =====================================

// =====================================
// HAMBURGER MENU STARTS HERE
// =====================================
$("#navHamburger").click(function(){
  $("#navMobile").toggle();
});
$("#navArrow").click(function(){
  $("#navMobile").toggle();
});
// =====================================
// HAMBURGER MENU ENDS HERE
// =====================================

// =====================================
// INITIAL CART FUNCTIONS START HERE
// =====================================

// populate cart div with cart object array items
function populateCart(){
  if(sessionStorage.getItem("allCartItems") === null || sessionStorage.getItem("allCartItems") === "[]"){
    $(".cart-body").html(
      `
      <p>There's nothing in your cart yet!</p>
      `
    );
  } else {
    let cart = JSON.parse(sessionStorage.getItem("allCartItems"));
    $(".cart-body__ul").html("");
    for(let i = 0; i < cart.length; i++){
      $(".cart-body__ul").append(
        `
          <li class="cart-body__li">
              <div class="text-wrapper">
                  <a class="cart-body__item-name">${cart[i].name}</a>
                  <p class="cart-body__item-price">$${cart[i].price}.00</p>
              </div>
              <button class="cart-body__remove"><i id="${cart[i].id}" class="fa-solid fa-xmark"></i></button>
          </li>
        `
      );
    }
    removeCartItem();
  }
}

// display cart on page load
populateCart();


// remove a listing from the cart
function removeCartItem(){
  $(".cart-body__remove").click(function(event){
    itemID = event.target.id;
    let cart = JSON.parse(sessionStorage.getItem("allCartItems"));
    for(let i = cart.length -1; i >= 0; i--){
      if(itemID == cart[i].id){
        cart.splice(i, 1);
        sessionStorage.setItem("allCartItems", JSON.stringify(cart));
        sessionStorage.setItem("latestItem", JSON.stringify(cart));
        populateCart();
      }
    }
  });
}

// =====================================
// INITIAL CART FUNCTIONS END HERE
// =====================================


// =====================================
// ADD AN ITEM MODAL STARTS HERE
// =====================================

function modalAddItem(){
  $('#addItem').click(function(){
    $(".modal-header").empty().append(
      `
      <h5 class="modal-title" id="exampleModalLabel">List an item</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

      `
    );
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
  <div class="form-group">contac
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
    );

    $(".modal-footer").empty().append(
      `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" id="addListingButton" class="btn btn-primary">Save changes</button>
      `
    );
  });
}
modalAddItem();

// =====================================
// ADD AN ITEM MODAL ENDS HERE
// =====================================


// =====================================
// CONTACT SUBMIT STARTS HERE
// =====================================

function submitForm(){
  $('#contactSubmit').click(function(){
    document.getElementById('contactLeft').innerHTML = "";

    $("#contactLeft").append(
      `
      <h1 class="contact-ty">Thank you!<br> Your message has been recieved.</h1>
      `
    );
  });
}

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
              <div id="tags" class="clothingCard__tags">
                <p class="clothingCard__tag">${listingsFromDB[i].type}</p>
              </div>
          </div>
        </div>

        `;

        


        document.querySelectorAll('.clothingCard').forEach(function(clothingItem) {
          clothingItem.addEventListener('click', function(e) {
              let id = e.target.parentNode.id;
              
              $.ajax({
                    url: `http://${url}/allListingFromDB/${id}`,
                    type: 'GET',
                    dataType: 'JSON',
                    success:function(singleListing){
                      let price = singleListing.price.toFixed(2);
                                     
                  
                      $('#clothingModal').empty().append(
               

                        `
                        <div style="background: url('${singleListing.img1}'); background-size: cover; background-position: center;" class="clothingItemModal__left">


                        <div value="${singleListing._id}" class="viewComments bottomViewBtn" id="commentView"><h3>Show comments</h3><i class="fa-solid fa-angle-up comments__upArrow"></i></div>

                        <div class="comments">
                            
                              <div id="closeComments" class="comments__btn"><h3>Comments</h3><i class="fa-solid fa-chevron-down comments__downArrow"></i>
                              </div>

                              <div class="comments__container">
                                <div id="commentBox" class="comments__display">
                                    

                                    
                              </div>  
                            </div>

                            <div class="comments__inputContainer">
                              <input class="comments__input" type="text" name="commentField" id="commentField">
                              <button value="${singleListing._id}" id="commentBtn" class="comments__submit">send</button>
                          </div>

                        </div>


                        </div>
                 

                        <div class="clothingItemModal__right">
                            <div class="clothingItemModal__closeTop">
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                          
                            <div class="clothingItemModal__mainDetails">
                              <h1 class="clothingItemModal__name">${singleListing.name}</h1>
                              <h2 class="clothingItemModal__price">$${price}</h2>
                              
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
                                  <p class="clothingItemModal__size">${singleListing.size2}</p>
                              </div>
                              <div class="clothingItemModal__details2">
                                  <p class="clothingItemModal__brandTitle">Brand:</p>
                                  <p class="clothingItemModal__brand">${singleListing.brand}</p>
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
                              <h4 class="clothingItemModal__username">${singleListing.user_name}</h4>
                            </div>

                            <div class="clothingItemModal__divider">
                                
                          </div>
                            <div class="clothingItemModal__btns">
                              <button data-bs-dismiss="modal" class="clothingItemModal__close">close</button>

                              <button id="${singleListing._id}" class="clothingItemModal__addToCart">add to cart</button>

                            </div>
                            

                        </div>

                  

                        `

                        
                  

                        
                        
                        
                        
                        );


                        

                        // Add item to the cart
                        $(".clothingItemModal__addToCart").click(function (){
                          let itemName = singleListing.name;
                          let itemPrice = singleListing.price;
                          let itemID = singleListing._id;                                                                                                                                                                                  
                          addToCart(itemName, itemPrice, itemID);
                          populateCart();
                        });

                        // Add an item to the cart
                        function addToCart(name, price, itemID) {
                          // parse any previously stored items in the cart object
                          let existingItems = JSON.parse(sessionStorage.getItem("allCartItems"));
                          if(existingItems == null) existingItems = [];
                          let itemName = name;
                          let itemPrice = price;
                          let id = itemID;
                          let latestItem = {"name": itemName, "price": itemPrice, "id": id};
                          sessionStorage.setItem("latestItem", JSON.stringify(latestItem));
                          existingItems.push(latestItem);
                          sessionStorage.setItem("allCartItems", JSON.stringify(existingItems));
                          
                          populateCart();
                          alert("item added!");
                        }
                        
                        // SHOW COMMENTS
                        $('#commentView').click(function(){

                          document.querySelector('.comments').style.top = '0%';
                          
                            $.ajax({
                              url: `http://${url}/viewComments/${id}`,
                              type: 'GET',
                              success: function(commentsFromMongo) {
                                let i;
                                document.getElementById('commentBox').innerHtml = "";
                                for (i = 0; i < commentsFromMongo.length; i++) {
                                  console.log(commentsFromMongo[i]);
                                  // DateCalc
                                    let msecInADay = 86400000;

                                    let todaysDate = new Date();
                                    let todaysMs = todaysDate.getTime();

                                    let date = new Date(commentsFromMongo[i].time);
                                    let dateMs = date.getTime();

                                    let dateDiff = ((todaysMs - dateMs) / msecInADay);

                                    let dayPublished = Math.round(dateDiff);

                                    if(dayPublished === 0){
                                        commentDate = 'Today';
                                    } else if (dayPublished === 1){
                                        commentDate = '1 Day ago';
                                    }   else{
                                        commentDate = dayPublished + ' days ago';
                                    }
                                    console.log(dayPublished)
                                  document.getElementById('commentBox').innerHTML +=
                                    `
                          
                                    <div class="comments__comment">
                                        <div class="comments__top">
                                            <p class="comments__text">${commentsFromMongo[i].text}</p>
                                        </div>
                                        <div class="comments__bottom">
                                            <p class="comments__time">${commentDate}</p>
                                            <p class="comments__user">${commentsFromMongo[i].user_name}</p>
                                        </div>
                                      </div>
                          
                                    `;
                                }
                              },
                              error: function() {
                                console.log('error: cannot retreive comments');
                              } //error
                            }); //ajax
                          // END OF SHOW COMMENTS
                          
                        });


                        $('#commentBtn').click(function(){
                        
                          let save = document.querySelector('#commentBtn');
                          let listingId = save.value;  
                          let comment = document.querySelector('#commentField');
                          let loginId = sessionStorage.getItem('userID');
                          let uName = sessionStorage.getItem('userName');
                          if (loginId === null){
                            alert('Please login to comment');
                          } else {
                            $.ajax({
                              url: `http://${url}/addComment`,
                              type: 'POST',
                              data: {
                                text: comment.value,        
                                listing_id: listingId,
                                user_id: loginId,
                                user_name: uName        
                              },
                              success: function(comment) {
                                alert('Comment posted');
                                window.location.reload();
                              },
                              error: function() {
                                alert('unable to post comment');
                              } // end of error
                            });//end of ajax
                          }//end of if
                        // };
                        });


                        $('#closeComments').click(function(){
                          document.querySelector('.comments').style.removeProperty('top');
                          document.querySelector('.comments').style.top = '99%';
                        });


                    }
                  });
          });
        });

        
      }
    }
  });
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
      let userid = sessionStorage.getItem('userID');

      let i;
      document.getElementById('accountListingsGrid').innerHTML = "";
      for(i = 0; i < listingsFromDB.length; i++){
        if(listingsFromDB[i].user_id === userid){
          let price = listingsFromDB[i].price.toFixed(2);
          userDetails();
          document.getElementById('accountListingsGrid').innerHTML +=
          `
          
          <div id="${listingsFromDB[i]._id}" class="clothingCard" data-bs-toggle="modal" data-bs-target="#clothingItemModal">
            <div style="background: url('${listingsFromDB[i].img1}'); background-size: cover; background-position: center;" class="clothingCard__imgContainer">
                
            <div id="${listingsFromDB[i]._id}" class="hide clothingCard__top">

              <i value="${listingsFromDB[i]._id}" class="clothingCard__icon clothingCard__edit icon fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#editItemModal"></i>

              <i value="${listingsFromDB[i]._id}" class="clothingCard__icon clothingCard__trash icon fa-solid fa-trash" data-bs-toggle="modal" data-bs-target='#deleteItemModal'></i>

            </div>

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
  
          `;
          
          // EDIT LISTING MODAL FOR 'YOUR LISTINGS' SECTION

          document.querySelectorAll('.clothingCard__edit').forEach(function(edit) {
            edit.addEventListener('click', function(e) {
                
              let updateId = e.target.parentNode.id;

                $('#editListingButton').click(function(){
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
                  let user_id = sessionStorage.getItem('userID');
                  let user_name = sessionStorage.getItem('userName');
                  $.ajax({
                    url: `http://${url}/updatelisting/${updateId}`,
                    type: 'PATCH',
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
                    success: function(data){
                      alert('Listing Updated');
                    },
                    error: function(){
                      console.log('Error: cannot update listing');
                    } // Error
                  }); // AJAX
                  
              });
              });
            });//END OF EDIT LISTING



            //SHOW EDIT AND DELETE BUTTONS ON HOVER

            document.querySelectorAll('.clothingCard').forEach(function(card) {
              card.addEventListener('mouseenter', function(e) {
                  const hides = e.target.querySelectorAll('.hide');
                  for(const hide of hides){
                  hide.classList.remove('hide');
                  hide.classList.add('show');
              }
              });
            });

            document.querySelectorAll('.clothingCard').forEach(function(card) {
              card.addEventListener('mouseleave', function(e) {
                  const shows = e.target.querySelectorAll('.show');
                  for(const show of shows){
                  show.classList.remove('show');
                  show.classList.add('hide');
              }
              });
            });    

            //END OF SHOW EDIT AND DELETE BUTTONS ON HOVER



            //DELETE LISTING FUNCTION START


            document.querySelectorAll('.clothingCard__trash').forEach(function(trash){
              trash.addEventListener('click', function(e){
                let delete_Id = e.target.parentNode.id;
                  
                $('#deleteListing').click(function(){
                  event.preventDefault();
                  $.ajax({
                    url : `http://${url}/deleteListing/${delete_Id}`,
                    type:'DELETE',
                    success : function(){
                        alert('Listing Deleted');
                    }, //success
                    error:function(){ 
                        console.log('Error: cannot call API'); 
                    }//error
                });//ajax
                  });
                });
              });
            
            // DELETE LISTING FUNCTION END


          // LISTING MODAL FOR 'YOUR LISTINGS' SECTION

document.querySelectorAll('.editClick').forEach(function(edit){
  edit.addEventListener('click', function(e){
 let listing_Id = e.target.id;

$('#editListingButton').click(function(){
 event.preventDefault();
 editFunction(listing_Id);
});
});
});

          document.querySelectorAll('.clothingCard').forEach(function(yourListingsClothingItem) {
            yourListingsClothingItem.addEventListener('click', function(e) {
                let id = e.target.parentNode.id;
                
                $.ajax({
                      url: `http://${url}/allListingFromDB/${id}`,
                      type: 'GET',
                      dataType: 'JSON',
                      success:function(singleListing){
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
                                <h6 class="clothingItemModal__location">${singleListing.user_name}</h6>
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
                                    <p class="clothingItemModal__size">${singleListing.size2}</p>
                                </div>
                                <div class="clothingItemModal__details2">
                                    <p class="clothingItemModal__brandTitle">Brand:</p>
                                    <p class="clothingItemModal__brand">${singleListing.brand}</p>
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
                                <h4 class="clothingItemModal__username">${singleListing.user_name}</h4>
                              </div>
                              <div class="clothingItemModal__divider">
                                  
                            </div>
                              <div class="clothingItemModal__btns">
                                <button data-bs-dismiss="modal" class="clothingItemModal__close">close</button>
                                <button class="clothingItemModal__addToCart">add to cart</button>
                              </div>
                          </div>
  
                          `
                          
                         
                          
                          );
                        
                      }
                    });
            });
          });
        }
        
      }
    }
  });
}
// CLOTHING ITEM MODAL FUNCTION

// ==================================
// LISTING FUNCTIONS END HERE
// =====================================

// =====================================
//USER FUNCTIONS START HERE
// =====================================

// User Registration START
$('#registerButton').click(function(){
  event.preventDefault();//this prevents code breaking when no data is found
  
  let username = $('#registerName').val();
  let email = $('#registerEmail').val();
  let password = $('#registerPass1').val();
  let password2 = $('#registerPass2').val();
  let profile_img = $('#registerImage').val();
  // let location = $('#').val();


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
    });//ajax post
  }else {
    alert('You need to make your passwords match');
  }//password if
  }//if

});//submit click

// USER REGISTRATION END

//Login User

let loginPasswordInput = document.getElementById("loginPass");
loginPasswordInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("loginButton").click();
  }
});

$('#loginButton').click(function(){
event.preventDefault();
let username = $('#loginName').val();
let password = $('#loginPass').val();





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
        sessionStorage.setItem('userImg', user['profile_img']);
        
        userDetails();
        window.location.reload();

      }// end of ifs
    },//success
    error:function(){
      console.log('error: cannot call api');
      alert('Unable to login - unable to call api');
    }//error
  });//end of ajax
} //end of else
});//end of login click function

$('#logoutButton').click(function(){
sessionStorage.clear();

window.location.reload();

});

function userDetails(){
  
 let user= sessionStorage.getItem('userName');
 let picture= sessionStorage.getItem('userImg');
  $("#userText").empty().append(
    `<h2 class="account__username" > ${user} </h2>`
  );
  $('#userImage').empty().append(
    `
    <div class="account__img" style="background: url('${picture}'); background-size: cover; background-position: center;">
    </div>
    `
  );


}



function wardrobeLoginCheck(){
  let login = sessionStorage.getItem('userID');

  changeUserSubmit.addEventListener('click', editUser);
  changeEmailSubmit.addEventListener('click', editEmail);
  changePasswordSubmit.addEventListener('click', editPass);
  changeImageSubmit.addEventListener('click', editImage);
  if(login === null){
    $('#accountPageBody').empty().append(
      `
        <div class="account__loginCheck">
        <h2 class="account__loginCheckTitle">Oops, it looks like you're not logged in!</h2>
          <p class="account__loginCheckText">To access the account page, list an item, and view your listings, you must log into your account.</p>
          <div class="account__loginCheckButtons">
            <li class="nav__li"><button data-bs-toggle="modal" data-bs-target="#loginModal-wardrobe" class="nav__logIn">log in</button></li>
            <li class="nav__li"><a href="signup.html"><button class="nav__signUp">sign up</button></a></li>
          </div>
        </div>
      `
    );
  }
}



function editUser(){
  let user_Upd = sessionStorage.getItem('userID');
   event.preventDefault();
   let username = $('#userChange').val();

   if (user_Upd == ''){
     alert('Please log in for updating');
   } else {
     $.ajax({
       url: `http://${url}/updateUser/${user_Upd}`,
       type: 'PATCH',
       data:{
      
 username: username

       },
       success: function(data){
         alert('updated user');
 
         window.location.reload();
       }, //success
       error: function(){
         console.log('error: cannot update user');
       } //error
     });//ajax
   }//if
 }
 function editPass(){
  let user_Upd = sessionStorage.getItem('userID');
 
   event.preventDefault();

   let password = $('#passChange').val();
   if (user_Upd == ''){
     alert('Please log in for updating');
   } else {
     $.ajax({
       url: `http://${url}/updatePass/${user_Upd}`,
       type: 'PATCH',
       data:{
      

 password: password
       },
       success: function(data){
         alert('updated password');
 
         window.location.reload();
       }, //success
       error: function(){
         console.log('error: cannot update password');
       } //error
     });//ajax
   }//if
 }
 function editEmail(){

   event.preventDefault();
   let user_Upd = sessionStorage.getItem('userID');
 
   let email = $('#emailChange').val();
   if (user_Upd == ''){
     alert('Please log in for updating');
   } else {
     $.ajax({
       url: `http://${url}/updateEmail/${user_Upd}`,
       type: 'PATCH',
       data:{
      

email: email
       },
       success: function(data){
         alert('updated email');
 
         window.location.reload();
       }, //success
       error: function(){
         console.log('error: cannot update email');
       } //error
     });//ajax
   }//if
 }

//  EDIT USER PROFILE IMAGE
 function editImage(){
  let user_Upd = sessionStorage.getItem('userID');
   event.preventDefault();

   let profile_img = $('#imageChange').val();
   if (user_Upd == ''){
     alert('Please log in for updating');
   } else {
     $.ajax({
       url: `http://${url}/updateImage/${user_Upd}`,
       type: 'PATCH',
       data:{
      

profile_img: profile_img
       },
       success: function(data){
         alert('updated image');
 
        
       }, //success
       error: function(){
         console.log('error: cannot update image');
       } //error
     });//ajax
   }//if
 }
// update user end


// =====================================
//USER FUNCTIONS END HERE
// =====================================

// =====================================
//LISTING FRONT to BACKEND FUNCTIONS START HERE
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
        let user_id = sessionStorage.getItem('userID');
        let user_name = sessionStorage.getItem('userName');
        
        if (name == '' || price == '' ||  img1 == '' || size2 == '' || type == ''|| gender == ''){
          alert('Please enter relevant details');
        } else {
          if (sessionStorage.getItem('userID') === null){
            alert('Please log in or register to add listings');

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
              alert ('listing added');
              window.location.reload();
            },
            error : function(){
              console.log('error: cannot call api');
            }//error
          });//ajax
        }//inner else
        }//outer else
      });//addListing
//AddListing End



// edit listing function start
function editFunction(listing_Id){
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
    });//ajax
  }//if
}
//edit listing function end






// =====================================
//LISTING FRONT to BACKEND FUNCTIONS END HERE
// =====================================



// =====================================
// SLIDE IN NAV ELEMENTS START HERE
// =====================================

// LEFT NAV

// slide in categories button
$("#slideInLeftNavBtn").click(function (){
  $(".filters").css("transform", "translateX(-25rem)");
  $("#slideInFiltersBtn").css("transform", "translateX(0vw)");
  $("#slideInLeftNavBtn").css("transform", "translateX(-100%)");
  $(".categories-container").css("transform", "translateX(0vw)");
});

// slide out categories button
$("#closeLeftNav").click(function (){
  $(".categories-container").css("transform", "translateX(-50rem)");
  $("#slideInLeftNavBtn").css("transform", "translateX(0%)");
});

// slide in filters button
$("#slideInFiltersBtn").click(function (){
  $("#slideInFiltersBtn").css("transform", "translateX(-100%)");
  $(".filters").css("transform", "translateX(0vw)");
});

// slide out filters button
$("#closeFiltersBtn").click(function (){
  $(".filters").css("transform", "translateX(-25rem)");
  $("#slideInFiltersBtn").css("transform", "translateX(0vw)");
});

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
});
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
});
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
});
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
});
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
});
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
});

// RIGHT NAV

$("#slideInCartBtn").click(function (){
  $(".cart-container").css("transform", "translateX(0rem)");
  $(".starred").css("transform", "translateX(25rem)");
});
$("#closeCartBtn").click(function (){
  $(".cart-container").css("transform", "translateX(50rem)");
});

$("#slideInStarredBtn").click(function (){
  $(".starred").css("transform", "translateX(0rem)");
});
$("#closeStarredBtn").click(function (){
  $(".starred").css("transform", "translateX(25rem)");
});

// =====================================
// SLIDE IN NAV ELEMENTS START HERE
// =====================================

// =====================================
// NAVAIGATION USER DETAILS START
// =====================================

  function navLoginUserDetails(){
    if (sessionStorage.getItem('userID') === null){
      document.getElementById('navUser').style.display = 'none';
      document.getElementById('navButtons').style.display = 'flex';
    } 
    else {
      document.getElementById('navUser').style.display = 'flex';
      document.getElementById('navButtons').style.display = 'none';
      let username = sessionStorage.getItem('userName');
      let profilePic = sessionStorage.getItem('userImg');
      document.getElementById('navUser').innerHTML = '';
      document.getElementById('navUser').innerHTML +=

        `
        <li class="nav__liUser">
          <button class="nav__userLi">
              <div class="nav__userDetails">
              
                <p class="nav__userText">${username}</p>
                <div class="nav__userPic" style="background: url('${profilePic}'); background-size: cover; background-position: center;"></div>
                <i class="nav__userDownArrow fa-solid fa-caret-down"></i>
                
                
                
                

              </div>
          </button>
          <div class="navDropdown">
                      <ul class="navDropdown__ul">

                        <li class="navDropdown__li">
                            <a href="mywardrobe.html" class="navDropdown__btn" >my account
                            </a>
                        </li>
                        
                        <li class="navDropdown__li">
                            <button class="navDropdown__btnLast" data-bs-toggle="modal" data-bs-target="#logoutModal">log out</button>
                        </li>
                        

                      </ul>
                </div>
        </li>
        `;

    }
  }
  navLoginUserDetails();

// =====================================
// NAVAIGATION USER DETAILS END
// =====================================


// =====================================
// LANDING PAGE USER DETAILS START
// =====================================

function landingPageLoggedIn(){
  if (sessionStorage.getItem('userID') === null){
    document.getElementById('landingLogged').style.display = 'none';
    document.getElementById('landingUnlogged').style.display = 'flex';
  } 
  else {
    document.getElementById('landingLogged').style.display = 'flex';
    document.getElementById('landingUnlogged').style.display = 'none';
    let username = sessionStorage.getItem('userName');
    document.getElementById('landingLogged').innerHTML = '';
    document.getElementById('landingLogged').innerHTML +=

      `
      <li class="landing-li">
        <a href="./mywardrobe.html"><button class="hamburger__userLi">
            <div class="user-landing">
              <p class="user-landing__userText">${username}'s wardrobe</p>
            </div>
        </button></a>
      </li>
      `;

  }
}

landingPageLoggedIn();

// =====================================
// LANDING PAGE USER DETAILS END
// =====================================

// =====================================
// HAMBURGER MENU USER DETAILS START
// =====================================

function hamburgerLoginUserDetails(){
  if (sessionStorage.getItem('userID') === null){
    document.getElementById('userHamburger').style.display = 'none';
    document.getElementById('navSignUpHamburger').style.display = 'flex';
  } 
  else {
    document.getElementById('userHamburger').style.display = 'flex';
    document.getElementById('navSignUpHamburger').style.display = 'none';
    let username = sessionStorage.getItem('userName');
    let profilePic = sessionStorage.getItem('userImg');
    document.getElementById('userHamburger').innerHTML = '';
    document.getElementById('userHamburger').innerHTML +=

      `
      <li class="hamburger__li">
        <a href="./mywardrobe.html"><button class="hamburger__userLi">
            <div class="hamburger__userDetails">
            <div class="hamburger__userPic" style="background: url('${profilePic}'); background-size: cover; background-position: center;"></div>
              <p class="hamburger__userText">${username}'s wardrobe</p>
            </div>
        </button></a>
      </li>
      `;

  }
}
hamburgerLoginUserDetails();

// =====================================
// HAMBURGER MENU USER DETAILS END
// =====================================

});

