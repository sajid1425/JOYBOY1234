let carts =  document.querySelectorAll('.add-cart');

let product = [
    {
        name: 'Sukuna JJK White Printed Tshirt',
        tag: 'sukuna tshirt',
        price: 39,
        incart: 0,
    },
    {
        name: 'Sukuna Black Printed Tshirt',
        tag: 'sukuna black tshirt',
        price: 39,
        incart: 0,
    },
    {
        name: 'Sukuna White Printed Tshirt',
        tag: 'sukuna white tshirt',
        price: 20,
        incart: 0,
    },
    {
        name: 'Sukuna Laugh Black Prited Tshirt',
        tag: 'sukuna Laugh black  tshirt',
        price: 27,
        incart: 0,
    },
    {
        name: 'GOJO JJK Black Prited Tshirt',
        tag: 'gojo black  tshirt',
        price: 27,
        incart: 0,
    },
    {
        name: 'GOJO White Prited Tshirt',
        tag: 'gojo white  tshirt',
        price: 27,
        incart: 0,
    },
    {
        name: 'GOJO Specs Black Prited Tshirt',
        tag: 'gojo specs black  tshirt',
        price: 27,
        incart: 0,
    },
];

for (let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i]);
        totalcost(product[i]);
    })
}

function onLoadcartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart-no span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log("product clicked is", product);
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers); 

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1 );
        document.querySelector('.cart-no span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers',  1 );
        document.querySelector('.cart-no span').textContent = 1;
    }

    setItem(product);
    
}

function setItem(product){
    let cartItem = localStorage.getItem("productsInCart");
    cartItem = JSON.parse(cartItem);
    
    if ( cartItem != null ) {

        if (cartItem[product.tag] == undefined) {
            cartItem = {
                ...cartItem,
                [product.tag]: product
            }
        }

        cartItem[product.tag].incart += 1;
    }else {
        product.incart = 1;
        cartItem = {
             [product.tag]: product
        }

    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItem));

}

function totalcost(product) {
    let cartCost = localStorage.getItem("totalcost");
     if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalcost", cartCost + product.price );
     }else{
        localStorage.setItem("totalcost", product.price);
     }

}

function dispalyCart(){
    let cartItem = localStorage.getItem("productsInCart");
    cartItem = JSON.parse(cartItem);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalcost");

    if(cartItem && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItem).map(item => {
             productContainer.innerHTML += `
             <div class="product">
             <span class="material-symbols-outlined">
             cancel
             </span>
                 <img src="./images/${item.tag}.jpg">
                 <div>${item.name}</div>
            <div class="price">
                  $${item.price},00
            </div>
            <div class="quantity">
            <span class="material-symbols-outlined">
            chevron_left
            </span>
               <div>${item.incart}</div>
               <span class="material-symbols-outlined">
               chevron_right
            </span>
            </div>
            <div class="total">
                $${item.incart * item.price},00
            </div>
             `;
        });

        productContainer.innerHTML += `
          <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                     $${cartCost},00
                </h4>


        `;

    }
}
function dispalyCheckout(){
    let cartItem = localStorage.getItem("totalcost");
    cartItem = JSON.parse(cartItem);
    let productContainer = document.querySelector(".checkout");
    let cartCost = localStorage.getItem("totalcost");

    if(cartItem && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItem).map(item => {
             productContainer.innerHTML += `
            <div class="total">
                $${item.incart * item.price},00
            </div>
             `;
        });

        productContainer.innerHTML += `
          <div class="checkou-t">
                <h4 class="totalcosttitle">
                    Total Amount
                </h4>
                <h4 class="basketTotal-s">
                     $${cartCost},00
                </h4>
        `;
    }
}



onLoadcartNumbers();
dispalyCart();
dispalyCheckout();