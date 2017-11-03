/* GLOBAL VARIABLES */
var listOfProducts;
// add more global variables when needed..

/* Get products from the json file and store it in a javascript variable */
fetch("./products.json")
.then(function(response) {
    return response.json();
})
.then(function(products) {
    listOfProducts = products;
    createUIFromLoadedProducts();
});

/** Uses the loaded products data to create a visible product list on the website */


var cartNr = document.createElement("h2");
var productsInCart = [];

function add(y){ 
    
    productsInCart.push(listOfProducts[y]);
    cartNr.innerHTML = productsInCart.length;
    
};

function createCartUI() {
    var content = document.querySelector("#content");
    content.innerHTML = '';

    var finalContent = {};
   
    for (var i = 0; productsInCart.length > i; i++) {

        var y = productsInCart[i];

        y.count = productsInCart.filter(function(element){
           return y.title === element.title;
        }).length
        
        finalContent[y.title] = y
    }
        
    var prodList = document.createElement("ul");
    prodList.className = "cartUl";

    //debugger;

    Object.keys(finalContent).forEach(function (key) { 
        var product = finalContent[key]

        var productItem = document.createElement("li");
        productItem.className = "cartLi";
        prodList.appendChild(productItem);


        var productImg = document.createElement("img");
        productImg.className = "cartImg";
        productImg.src = "assets/" + product.image;
        productItem.appendChild(productImg);

        var productTitle = document.createElement("h1");
        productTitle.className = "productTitle";
        productTitle.innerHTML = product.title;
        productItem.appendChild(productTitle);

        var productPrice = document.createElement("h3");
        productPrice.className = "productPrice";
        productPrice.innerHTML = product.price + " :-" + '<br>' + "antal: " + product.count ;
        productItem.appendChild(productPrice);


        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = ' Minska';
        deleteButton.className = "deleteButton";
        deleteButton.addEventListener('click', function(){
            var index = productsInCart.findIndex(function(element){ return product.title === element.title })
            product = productsInCart.splice(index, 1);
            createCartUI();
            
        })
        productItem.appendChild(deleteButton);

        var addButton = document.createElement("button");
        addButton.innerHTML = ' Öka';
        addButton.className = "addButton";
        addButton.addEventListener('click', function(){
            product = productsInCart.push(product);
            
            createCartUI();
            
        })
        productItem.appendChild(addButton);


        
       
    })
    


     content.appendChild(prodList);


    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b

    var totalSum = document.createElement("h3");
    totalSum.innerHTML ="Totalsumma:" +" " + Object.keys(finalContent).reduce( 
        function(accumulator, currentValue, currentIndex, array){ 
            return accumulator + (finalContent[currentValue].price * finalContent[currentValue].count) 
        }, 0 ) + " :-" ;
    content.appendChild(totalSum);

    
    var productButton = document.createElement("button");
    productButton.innerHTML = ' Slutför Beställning!';
    productButton.className = "productButton";
    content.appendChild(productButton);

    
}

var cart = document.querySelector("#cart");

cart.addEventListener('click', function(){
    createCartUI();
})

cart.appendChild(cartNr);

function createUIFromLoadedProducts() {

    var content = document.querySelector("#content");
    
        var prodList = document.createElement("ul");
        prodList.className = "startUl";
        
        for(var i = 0; i < listOfProducts.length; i++)
        {
            var product = listOfProducts[i];
    
            var productItem = document.createElement("li");
            productItem.className = "startLi";
            prodList.appendChild(productItem);
    
            var productTitle = document.createElement("h1");
            productTitle.className = "productTitle";
            productTitle.innerHTML = product.title;
            productItem.appendChild(productTitle);

            var productDesc = document.createElement("p");
            productDesc.className = "productDesc";
            productDesc.innerHTML = product.description;
            productItem.appendChild(productDesc);
    
            var productImg = document.createElement("img");
            productImg.className = "productImg";
            productImg.src = "assets/" + product.image;
            productItem.appendChild(productImg);

            var productPrice = document.createElement("h3");
            productPrice.className = "productPrice";
            productPrice.innerHTML = product.price + " :-";
            productItem.appendChild(productPrice);
    
            var productButton = document.createElement("button");
            productButton.innerHTML = '   Lägg till i kundvagnen';
            productButton.className = "productButton";
            productButton.setAttribute('onclick', 'add('+i+');');  
            productItem.appendChild(productButton);
                
        };
    
        content.appendChild(prodList);
    
        
    }
    


    
    
    


