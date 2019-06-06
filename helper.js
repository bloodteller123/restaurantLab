function check(){
    var input = document.getElementById("search").value;
    if(!input){
        alert("Food can't be empty");
        return;
    }
    document.getElementById("search").value="";
    console.log(typeof window.location.href);
    if(window.location.href.includes("restaurants")){
        window.location.href = "./menu.html";
    }
    else if(window.location.href.includes("welcome") || window.location.href.includes("menu")){
        window.location.href = "./restaurants.html";
    }
}


function addToCart(){
    alert("Item is added to cart");
}


$(document).ready(function(){
    var nav = $('.right');
    if(nav.length){
        var fixmeTop = $('.right').offset().top;       // get initial position of the element
        console.log("ACTIVAYTED");
        $(window).scroll(function() {                  // assign scroll event listener

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
$(document).ready(function(){

    //style='display: inline'
    $("#order").prop('disabled', true);
    var totalPrice = {
        val: 0,
        get getVal(){
            return this.val;
        },
        set setVal(value){
            this.val = value;
        }
    };
    $('.price').text(totalPrice.val);

    $(".addToCart").click((e)=>{
        var idClicked = e.target.id;
        var content = $('#'+idClicked).parent().find("h3").text();
        var individualPrice = $('#'+idClicked).parent().find(".itemPrice").text();
        
        if($('.itemLists').children().children().find(".name").text().trim().toLowerCase() === content.toLowerCase()){
            $('.itemLists').children().find(".add").click();
        }
        else{
            
            var itemDiv = [
                '<div id="item" class="item" style="margin-top:5px;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s;border-radius: 5px;background:#f1f1f1;">',
                    '<button class="remove" style="width:20px;">&times</button>',
                    '<a href="javascript:void(0);"class="add"><i class="fa fa-plus" aria-hidden="true"></i></a>',
                    '<div style="display: inline">',
                        '<span class="name">'+content+'</span>',
                    '</div>',
                    '<a href="javascript:void(0);"class="decrement"><i class="fa fa-minus" aria-hidden="true"></i></a>',
                    '</hr>',
                    '<div class="priceForThisItem" >Price: <span class="indPrice">'+individualPrice+'</span></div>',
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
            $("#order").prop('disabled', false);
        }
    });
    
    $(document).on("click","a.add",(event)=>{
       // $(this).parent().find('.quantity').html(function(i, val) { return +val+1 });
       $(event.currentTarget).closest('.item').find('.quantity').html((i,val)=>{
           var quantity = +val+1;
           return quantity;
        });

        var p = parseFloat($(event.currentTarget).closest('.item').children().find('.indPrice').text());
        totalPrice.val+=p;
        $('.price').text(0);
        $('.price').text(totalPrice.val.toFixed(2));
       //nextAll('.quantity:first').html(function(i, val) { return +val+1 });
        //$('div.quantity').html(function(i, val) { return +val+1 });
    });
    $(document).on("click","a.decrement",(event)=>{
        if($(event.currentTarget).closest('.item').find('.quantity').text()>'1'){
            $(event.currentTarget).closest('.item').find('.quantity').html((i,val)=>{return +val-1});
            var p = parseFloat($(event.currentTarget).closest('.item').children().find('.indPrice').text());
            totalPrice.val-=p;
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
    });
});

