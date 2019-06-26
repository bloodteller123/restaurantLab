//variable for local storage
var foodItems = [];


//checkout functions
function createCheckoutDivs(){
    var totalPrice = 0;
    for (var i = 0; i < foodItems.length; i++) {
        totalPrice += parseFloat(foodItems[i].itemPrice) * parseFloat(foodItems[i].quantity);
    }   

    console.log(totalPrice)
    //Append the total price
    $(".totalCost").append("Total Cost: "+totalPrice);
}

function createCreditDivs(){
    var creditDiv = [
    '<label for="firstName">Credit/Debit Card Number:</label>',
    '<input type="text" placeholder="Enter your credit/debit card number" name="creditNum" required>',
    '<label for="cvv">CVV:</label>',
    '<input type="text" placeholder="Enter the card\'s CVV" name="cvv" required>',
    '<label for="expiryDate">Expiry Date:</label>',
    '<input type="text" placeholder="Enter card\'s expiry date" name="expiryDate" required>',
    ]
    
    $(".creditCardInfo").empty();
    $(".creditCardInfo").append(creditDiv.join(''));
}

//Credit/Debit Card Card Listener
$(document).ready(function(){
    $('.paymentRadio input[name="paymentType"]').on('click', function() {
        var selection = $('.paymentRadio input[name="paymentType"]:checked').val();
        if(selection == "debit" || selection == "credit"){
            createCreditDivs();
        }
        else{
            $(".creditCardInfo").empty();
        }
    });
});



//order functions
function onStart() {
    //Get the items from storage, then parse the JSON back to objects
    if(window.localStorage.getItem('foodItems') != null){
        foodItems = JSON.parse(window.localStorage.getItem('foodItems'));
    }
}

function createOrderDivs(){
    //Make a div out of the items, get total price
    var foodItemsDiv = [];
    var totalPrice = 0;
    for (var i = 0; i < foodItems.length; i++) {
        var itemDiv = [
            '<div class="item">',
            '<div class="itemName">' + foodItems[i].itemName + '</div>',
            '<div class="itemQuantity">Quantity:' + foodItems[i].quantity + '</div>',
            '<div class="itemPrice">Individual Price:$' + foodItems[i].itemPrice + '</div>',
            '<div class="itemPrice">Combined Price:$' + foodItems[i].itemPrice * foodItems[i].quantity + '</div>',
            '</div>',
        ];
        foodItemsDiv.push(itemDiv.join(''));
        totalPrice += parseFloat(foodItems[i].itemPrice) * parseFloat(foodItems[i].quantity);
    }   
    //Append the food items
    $(".items").append(foodItemsDiv);

    //Append the total price
    var totalPriceElement = '<div class="totalPrice">Total Price:$' + totalPrice + '</div>';
    $(".finalRow").prepend(totalPriceElement);
}

//Button going to checkout
function checkout(){
    window.localStorage.setItem('foodItems', JSON.stringify(foodItems));
    window.location.href = "./checkout.html";
}

//Button going to menu
function menu(){
    window.localStorage.setItem('foodItems', JSON.stringify(foodItems));
    window.location.href = "./menu.html";
}

//menu functions
function order() {
    if (foodItems === undefined || foodItems.length == 0) {
        alert("You need at least one item");
        return;
    }
    else {
        //Make the foodItems a JSON and put into local storage
        window.localStorage.setItem('foodItems', JSON.stringify(foodItems));
        window.location.href = "./order.html";
    }
}


function check() {
    var input = document.getElementById("search").value;
    if (!input) {
        alert("Food can't be empty");
        return;
    }
    document.getElementById("search").value = "";
    console.log(typeof window.location.href);
    if (window.location.href.includes("restaurants")) {
        window.location.href = "./menu.html";
    }
    else if (window.location.href.includes("welcome") || window.location.href.includes("menu")) {
        window.location.href = "./restaurants.html";
    }
    
}


function addToCart() {
    alert("Item is added to cart");
}


$(document).ready(function () {
    var nav = $('.right');
    if (nav.length) {
        var fixmeTop = $('.right').offset().top;       // get initial position of the element
        console.log("ACTIVAYTED");
        $(window).scroll(function () {                  // assign scroll event listener

            var currentScroll = $(window).scrollTop(); // get current position

            if (currentScroll >= fixmeTop) {           // apply position: fixed if you
                $('.right').css({                      // scroll to that element or below it
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    transform: 'translateX(-35%)'

                });
            } else {                                   // apply position: static
                $('.right').css({                      // if you scroll above it
                    position: 'static',
                    transform: 'translateX(1%)'

                });
            }
        });
    }
});

// add item to cart
$(document).ready(function () {
    //style='display: inline'
    var totalPrice = {
        val: setTotalPrice(),
        get getVal() {
            return this.val;
        },
        set setVal(value) {
            this.val = value;
        }
    };
    $('.price').text(totalPrice.val);

    $(".addToCart").click((e) => {
        var idClicked = e.target.id;
        var content = $('#' + idClicked).parent().find("h3").text();
        var individualPrice = $('#' + idClicked).parent().find(".itemPrice").text();

        if ($('.itemLists').children().children().find(".name").text().trim().toLowerCase() === content.toLowerCase()) {
            $('.itemLists').children().find(".add").click();

            //Add to the object at "content"'s quantity +1
            var newQuantity = "" + (parseInt(foodItems.find(o => o.itemName === content).quantity) + 1);
            foodItems.find(o => o.itemName === content).quantity = newQuantity;
        }
        else {
            var itemDiv = [
                '<div id="item" class="item" style="margin-top:5px;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s;border-radius: 5px;background:#f1f1f1;">',
                '<button class="remove" style="width:20px;">&times</button>',
                '<a href="javascript:void(0);"class="add"><i class="fa fa-plus" aria-hidden="true"></i></a>',
                '<div style="display: inline">',
                '<span class="name">' + content + '</span>',
                '</div>',
                '<a href="javascript:void(0);"class="decrement"><i class="fa fa-minus" aria-hidden="true"></i></a>',
                '</hr>',
                '<div class="priceForThisItem" >Price: <span class="indPrice">' + individualPrice + '</span></div>',
                '<div style="display:inline"><span>Quantity</span><div class="quantity" style="display: inline;margin-left:10px">1</div></div>',
                '</div>'
            ];  
            itemDiv = $(itemDiv.join(''));
            $(".itemLists").append(itemDiv);
            console.log(individualPrice);
            var addedPrice = parseFloat(individualPrice);
            totalPrice.val += addedPrice;

            $('.price').text(0);
            $('.price').text(totalPrice.val.toFixed(2));
            $("#checkoutButton").prop('disabled', false);

            //This is for local storage into the checkout/storage
            //I'm assuming the above if/else checks for the content already, so this will only be called when a new item is added
            foodItems.push({
                itemName: content,
                itemPrice: individualPrice,
                quantity: "1",
            })
        }
    });

    $(document).on("click", "a.add", (event) => {
        // $(this).parent().find('.quantity').html(function(i, val) { return +val+1 });
        $(event.currentTarget).closest('.item').find('.quantity').html((i, val) => {
            var quantity = +val + 1;

            //Change Quantity in global array, a bit redundant rn
            var content = $(event.currentTarget).closest('.item').find('.name').html();
            var newQuantity = "" + (parseInt(foodItems.find(o => o.itemName === content).quantity) + 1);
            foodItems.find(o => o.itemName == content).quantity = newQuantity;

            return quantity;
        });

        var p = parseFloat($(event.currentTarget).closest('.item').children().find('.indPrice').text());
        totalPrice.val += p;
        $('.price').text(0);
        $('.price').text(totalPrice.val.toFixed(2));
        //nextAll('.quantity:first').html(function(i, val) { return +val+1 });
        //$('div.quantity').html(function(i, val) { return +val+1 });
    });
    $(document).on("click", "a.decrement", (event) => {
        if ($(event.currentTarget).closest('.item').find('.quantity').text() > '1') {
            $(event.currentTarget).closest('.item').find('.quantity').html((i, val) => { 
                
                //Change Quantity in global array, a bit redundant rn
                var content = $(event.currentTarget).closest('.item').find('.name').html();
                var newQuantity = "" + (parseInt(foodItems.find(o => o.itemName === content).quantity) - 1);
                foodItems.find(o => o.itemName == content).quantity = newQuantity;

                return +val - 1 });

            var p = parseFloat($(event.currentTarget).closest('.item').children().find('.indPrice').text());
            totalPrice.val -= p;
            $('.price').text(0);
            $('.price').text(totalPrice.val.toFixed(2));
        }


    });

    $(document).on("click",".remove",(event)=>{
        // why can't we use $(this) here ? which returns undefined ???
        //console.log($(event.currentTarget).closest('.item').attr('id'));
        var numbers = parseInt($(event.currentTarget).closest('.item').find('.quantity').text());
        totalPrice.val -=(numbers * parseFloat($(event.currentTarget).closest('.item').children().find('.indPrice').text()));
        $('.price').text(0);
        $('.price').text(totalPrice.val.toFixed(2));
        $(event.currentTarget).closest('.item').remove();
        if((event.currentTarget).closest('.item').length===undefined){
            $("#checkoutButton").prop('disabled', true);
        }
    });

    $(document).on("click", ".checkoutButton", (event) => {
        $(event.currentTarget).closest('.item').remove();
    });
});

//TEMP function to remake the itemList element, should change this up later
function createMenuDivs(){
    //Make a div out of the items, get total price
    var foodItemsDiv = [];
    for (var i = 0; i < foodItems.length; i++) {
        var itemDiv = [
            '<div id="item" class="item" style="margin-top:5px;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s;border-radius: 5px;background:#f1f1f1;">',
            '<button class="remove" style="width:20px;">&times</button>',
            '<a href="javascript:void(0);"class="add"><i class="fa fa-plus" aria-hidden="true"></i></a>',
            '<div style="display: inline">',
            '<span class="name">' + foodItems[i].itemName + '</span>',
            '</div>',
            '<a href="javascript:void(0);"class="decrement"><i class="fa fa-minus" aria-hidden="true"></i></a>',
            '</hr>',
            '<div class="priceForThisItem" >Price: <span class="indPrice">' + foodItems[i].itemPrice + '</span></div>',
            '<div style="display:inline"><span>Quantity</span><div class="quantity" style="display: inline;margin-left:10px">' + foodItems[i].quantity + '</div></div>',
            '</div>'
        ];
        $(".itemLists").append(itemDiv.join(''));
    }   
    

}

//set total price (not sure why you made an object for totalPrice?)
function setTotalPrice(){
    if(window.localStorage.getItem('foodItems') != null){
        var totalPrice = 0;
        for (var i = 0; i < foodItems.length; i++) {
            totalPrice += parseFloat(foodItems[i].itemPrice) * parseFloat(foodItems[i].quantity);
        }   
        return totalPrice;
    }
    else{
        return 0;
    }
}
