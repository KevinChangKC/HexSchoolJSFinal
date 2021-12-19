/* Global */
let productList = [];
let cartList = [];
let productWrap = document.querySelector(".productWrap");
let productSelect = document.querySelector(".wrap.productDisplay > .productSelect");
let cartWrap = document.querySelector(".shoppingCart-table");
let submitbutton = document.querySelector(".orderInfo-btn");

/* Form */
let form = document.querySelector(".orderInfo-form");
let cname = document.querySelector('#customerName');
let phone = document.querySelector('#customerPhone');
let email = document.querySelector('#customerEmail');
let address = document.querySelector('#customerAddress');
let tradeWay = document.querySelector('#tradeWay');


/* Main */
init();

/* Functions */
function init(){
    getProductList();
    getCartList();
    BindingEvent();
}

function getProductList(){
    axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/kevinchang/products")
    .then(function(res){
        console.log(res);
        productList = res.data.products;
        renderProductList(productList);
    })
    .catch(function(res){
        console.log(res);
    })
}

function getCartList(){
    axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/kevinchang/carts")
    .then(function(res){
        console.log(res);
        cartList = res.data.carts;
        renderCartList(cartList);
    })
    .catch(function(res){
        console.log(res);
    })
}

function filterProductList(eventObject){

    if(eventObject === "全部"){
        return productList;
    }

    let filterData = productList.filter(function(item){
        return item.category === eventObject;
    })

    return filterData;
}

function renderProductList(array){
    let htmlTemplate = "";
    array.forEach(function(item,index){
        htmlTemplate += `<li class="productCard"><h4 class="productType">${item.category}</h4>
        <img src="${item.images}" alt="">
        <a href="#" class="addCardBtn" data-id=${item.id} data-quantity="1">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$${item.price}</p>
        <h3 style="margin-top:20px;">購買數量</h3>
        <select name=""  data-id="quantitySelect" class="productSelect">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <ul class="productWrap">
        </ul>
    </section>
        </li>`;
    })
    productWrap.innerHTML = "";
    productWrap.innerHTML = htmlTemplate;
}

function renderCartList(array){
    let htmlTemplate = "";
    let itemTotalPrice = 0;
    let totalPrice = 0;

    let cartStrHead = `<tr>
    <th width="40%">品項</th>
    <th width="15%">單價</th>
    <th width="15%">數量</th>
    <th width="15%">金額</th>
    <th width="15%"></th>
    </tr>`

    array.forEach(function(item){
        itemTotalPrice = Number(item.product.price) * Number(item.quantity);
        totalPrice += Number(itemTotalPrice);
        htmlTemplate += `<tr><td>
        <div class="cardItem-title">
            <img src="${item.product.images}" alt="">
            <p>${item.product.title}</p>
            </div>
        </td>
        <td>NT$${item.product.price}</td>
        <td>${item.quantity}</td>
        <td>NT$${itemTotalPrice}</td>
        <td class="discardBtn">
            <a href="#" class="material-icons" data-id=${item.id}>
                clear
            </a>
        </td>
        </tr>`;
    })

    let cartStrFoot = `<tr><td>
    <a href="#" class="discardAllBtn">刪除所有品項</a>
    </td>
    <td></td>
    <td></td>
    <td>
    <p>總金額</p>
    </td>
    <td>NT$${totalPrice}</td>
    </tr>`

    cartWrap.innerHTML = "";
    cartWrap.innerHTML = cartStrHead + htmlTemplate + cartStrFoot;
}

function addToCart(id,quantity){
    axios.post("https://livejs-api.hexschool.io/api/livejs/v1/customer/kevinchang/carts",{
        "data" : {
            "productId": id,
            "quantity": Number(quantity)
        }
    })
    .then(function(res){
        cartList = res.data.carts;
        renderCartList(res.data.carts)
        alert("加入購物車成功！")
    })
    .catch(function(res){
        console.log(res);
    })
}

function deleteCartItems(id){

    let apiUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer/kevinchang/carts/" + id;
    axios.delete(apiUrl)
    .then(function(res){
        cartList = res.data.carts;
        renderCartList(res.data.carts)
    })
    .catch(function(res){
        console.log(res);
    })

}

function deleteAllCartItems(){

    if(cartList.length == 0){
        alert("您的購物車裡還沒有商品呦！");
        return;
    }

    let result = confirm("您確定要刪除所有購物車品項嗎？");

    if(result){
        axios.delete("https://livejs-api.hexschool.io/api/livejs/v1/customer/kevinchang/carts")
        .then(function(res){
            cartList = res.data.carts;
            renderCartList(res.data.carts)
        })
        .catch(function(res){
            console.log(res);
        })  
    }
}

function sendOrder(){

    if(cartList.length == 0){
        alert("您的購物車裡還沒有商品呦！");
        return;
    }

    if(validateForm() == 0)
        return;

    axios.post("https://livejs-api.hexschool.io/api/livejs/v1/customer/kevinchang/orders",{
        "data": {
          "user": {
            "name": cname.value,
            "tel":  phone.value,
            "email": email.value,
            "address": address.value,
            "payment": tradeWay.value
          }
        }
    })
    .then(function(res){
        console.log(res);
        alert("感謝您的購買，訂單資料已送出！")
        form.reset();
        getCartList();
    })
    .catch(function(res){
        console.log(res);
    })
}

function validateForm(){

    let errorMsg = document.querySelectorAll('.orderInfo-message');
    let errors = "";

    let constraints = {
        "姓名": { 
            presence:  {
              message: "是必填的欄位"
            }, 
        },
        "電話": {
            presence:{
              message: "是必填的欄位"
            },
        },
        "Email": {  
            presence:  {
                message: "是必填的欄位"
            }, 
            email: true 
        },
        "寄送地址": {
            presence: {
                message: "是必填的欄位"
            }, 
        },
    };

    errors = validate(form,constraints);

    if(errors !== undefined){
        
        //清除所有錯誤訊息
        errorMsg.forEach(function(msgItem){
            msgItem.innerHTML = "";
        })

        //比對錯誤訊息&顯示
        Object.keys(errors).forEach(function(item,index){
            errorMsg.forEach(function(msgItem){
                if(msgItem.getAttribute("data-message") === item){
                    msgItem.innerHTML = Object.values(errors)[index];
                }
            })
        })

        return 0;
    }else{
        return 1;
    }
}

function BindingEvent(){
    productSelect.addEventListener("change",function(e){
        e.preventDefault();
        renderProductList(filterProductList(e.target.value));
    })

    productWrap.addEventListener("click",function(e){
        if(e.target.getAttribute("class") !== "addCardBtn"){
            return;
        }
        e.preventDefault();
        addToCart(e.target.getAttribute("data-id"),e.target.getAttribute("data-quantity"));
    })

    productWrap.addEventListener("change",function(e){
        e.preventDefault();
        e.target.parentNode.querySelector("a").setAttribute("data-quantity",e.target.value)
        return;
    })

    cartWrap.addEventListener("click",function(e){
        if(e.target.getAttribute("class") !== "material-icons" && e.target.getAttribute("class") !== "discardAllBtn"){
            return;
        }

        if(e.target.getAttribute("class") === "material-icons"){
            e.preventDefault();
            deleteCartItems(e.target.getAttribute("data-id"));
        }

        if(e.target.getAttribute("class") === "discardAllBtn"){
            e.preventDefault();
            deleteAllCartItems();
        }
    })

    submitbutton.addEventListener("click",function(e){
        e.preventDefault();
        sendOrder();      
    })
    
}
