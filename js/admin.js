/* Global */
let orderList = [];
let orderWrap = document.querySelector(".orderPage-table");
let deleteAllOrder = document.querySelector(".discardAllBtn");
const userID = "551FsxbIoXcOouKKmobPSlFICPw2";

/* Main */
init();

/* Functions */
function init(){
    getOrderList();
    BindingEvent();
}

function getOrderList(){
    axios.get("https://livejs-api.hexschool.io/api/livejs/v1/admin/kevinchang/orders",{
        headers : {
            'Authorization': userID
        }
    })
    .then(function(res){
        console.log(res);
        orderList = res.data.orders;
        renderOrderList(orderList);
        calculateChart();
    })
    .catch(function(res){
        console.log(res);
    })
}

function renderOrderList(array){
    let str = "";
    //let date = "";
    let status = "";
    let htmlTemplate = "";
    let tablehead = `<thead>
    <tr>
        <th>訂單編號</th>
        <th>聯絡人</th>
        <th>聯絡地址</th>
        <th>電子郵件</th>
        <th>訂單品項</th>
        <th>訂單日期</th>
        <th>訂單狀態</th>
        <th>操作</th>
    </tr>
    </thead>`

    array.forEach(function(item,index){

        //order product 
        for(i=0 ; i<item.products.length ; i++){
            str += `<p>${item.products[i].title}</p>`
        }

        //order date 
        let date = new Date(Number(item.createdAt)*1000);
        date = `${date.getFullYear().toString()}/${(Number(date.getMonth())+1).toString()}/${date.getDate().toString()}`

        //order status
        if(item.paid)
        status = "已處理";
        else
        status = "未處理";

        htmlTemplate += `<tr>
        <td>${item.createdAt}</td>
        <td>
          <p>${item.user.name}</p>
          <p>${item.user.tel}</p>
        </td>
        <td>${item.user.address}</td>
        <td>${item.user.email}</td>
        <td>
          <p>${str}</p>
        </td>
        <td>${date}</td>
        <td class="orderStatus">
          <a href="#">${status}</a>
        </td>
        <td>
          <input type="button" class="delSingleOrder-Btn" value="刪除" data-id="${item.id}">
        </td>
        </tr>`;

    })

    orderWrap.innerHTML = "";
    orderWrap.innerHTML = tablehead + htmlTemplate;
}

function deleteOrderItem(id){
    let result = confirm("您確定要刪除這筆訂單嗎？");

    if(result){
        let apiUrl = "https://livejs-api.hexschool.io/api/livejs/v1/admin/kevinchang/orders/" + id;
        axios.delete(apiUrl,{
            headers : {
                'Authorization': userID
            }
        })
        .then(function(res){
            orderList = res.data.orders;
            renderOrderList(res.data.orders);
            calculateChart();
        })
        .catch(function(res){
            console.log(res);
        })
    }
}

function deleteAllOrderItem(){
    let result = confirm("您確定要刪除全部訂單嗎？");

    if(result){
        axios.delete("https://livejs-api.hexschool.io/api/livejs/v1/admin/kevinchang/orders/",{
            headers : {
                'Authorization': userID
            }
        })
        .then(function(res){
            orderList = res.data.orders;
            renderOrderList(res.data.orders);
            calculateChart();
        })
        .catch(function(res){
            console.log(res);
        })
    }
}

function BindingEvent(){
    orderWrap.addEventListener("click",function(e){
        e.preventDefault();

        if(e.target.getAttribute("class") != "delSingleOrder-Btn")
            return;

        deleteOrderItem(e.target.getAttribute("data-id"));
    })

    deleteAllOrder.addEventListener("click",function(e){
        e.preventDefault();

        if(e.target.getAttribute("class") != "discardAllBtn")
            return;

            deleteAllOrderItem();
    })
}

function renderChart(array,other){
    // C3.js
    switch (array.length){
        case 0:
            let chart = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    ['無商品資料', other],
                    ],
                    colors:{
                        "Louvre 雙人床架":"#DACBFF",
                        "Antony 雙人床架":"#9D7FEA",
                        "Anty 雙人床架": "#5434A7",
                        "其他": "#301E5F",
                    }
                },
            });
        break;
        case 1:
            let chart1 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
        case 2:
            let chart2 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    [array[1].name,array[1].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
        case 3:
            let chart3 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    [array[1].name,array[1].revenu],
                    [array[2].name,array[2].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
        case 4:
            let chart4 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    [array[1].name,array[1].revenu],
                    [array[2].name,array[2].revenu],
                    [array[3].name,array[3].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
        case 5:
            let chart5 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    [array[1].name,array[1].revenu],
                    [array[2].name,array[2].revenu],
                    [array[3].name,array[3].revenu],
                    [array[4].name,array[4].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
        case 6:
            let chart6 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    [array[1].name,array[1].revenu],
                    [array[2].name,array[2].revenu],
                    [array[3].name,array[3].revenu],
                    [array[4].name,array[4].revenu],
                    [array[5].name,array[5].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
        case 7:
            let chart7 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    [array[1].name,array[1].revenu],
                    [array[2].name,array[2].revenu],
                    [array[3].name,array[3].revenu],
                    [array[4].name,array[4].revenu],
                    [array[5].name,array[5].revenu],
                    [array[6].name,array[6].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
        case 8:
            let chart8 = c3.generate({
                bindto: '#chart',
                data: {
                    type: "pie",
                    columns: [
                    [array[0].name,array[0].revenu],
                    [array[1].name,array[1].revenu],
                    [array[2].name,array[2].revenu],
                    [array[3].name,array[3].revenu],
                    [array[4].name,array[4].revenu],
                    [array[5].name,array[5].revenu],
                    [array[6].name,array[6].revenu],
                    [array[7].name,array[7].revenu],
                    ['其他', other],
                    ],
                    colors:{
                    }
                },
            });
        break;
    }
}

function calculateChart(){
    let max = 0;
    let topThreeRevenuItem = [];
    let tempRevenuList = [];
    let counter = 0;
    let otherRevenue = 0;
    let revenuList = [
        {
            name: 'Antony遮光窗簾',
            revenu: 0
        },
        {
            name: 'Charles 系列儲物組合',
            revenu: 0
        },
        {
            name: 'Antony 床邊桌',
            revenu: 0
        },
        {
            name: 'Jordan 雙人床架／雙人加大',
            revenu: 0
        },
        {
            name: 'Antony 雙人床架／雙人加大',
            revenu: 0
        },
        {
            name: 'Louvre 單人床架',
            revenu: 0
        },
        {
            name: 'Charles 雙人床架',
            revenu: 0
        },
        {
            name: 'Louvre 雙人床架／雙人加大',
            revenu: 0
        }
    ]

    orderList.forEach(function(item){
        item.products.forEach(function(productItem){
            switch (productItem.title){
                case 'Antony遮光窗簾':
                    revenuList[0].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;
                case 'Charles 系列儲物組合':
                    revenuList[1].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;
                case 'Antony 床邊桌':
                    revenuList[2].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;    
                case 'Jordan 雙人床架／雙人加大':
                    revenuList[3].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;
                case 'Antony 雙人床架／雙人加大':
                    revenuList[4].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;    
                case 'Louvre 單人床架':
                    revenuList[5].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;
                case 'Charles 雙人床架':
                    revenuList[6].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;
                case 'Louvre 雙人床架／雙人加大':
                    revenuList[7].revenu+=Number((Number(productItem.price)*Number(productItem.quantity)));
                    break;
                default:
                    console.log(`No this Item`);
            }
        })
    })

    console.log(revenuList)

    while( counter < 3)
    {
        console.log(counter)
        revenuList.forEach(function(item,index){
            if(Number(item.revenu) > Number(max)){
                max = item.revenu;
            }
        })
        console.log(max)

        revenuList.forEach(function(item,index){
            if(item.revenu == max && max != 0){
                topThreeRevenuItem.push(item);
                console.log(item.revenu)
                revenuList.splice(index,1)
            }
        })

        max = 0;
        counter++;
    }

    revenuList.forEach(function(item){
        otherRevenue+= item.revenu;
    })

    console.log(topThreeRevenuItem)

    renderChart(topThreeRevenuItem,otherRevenue);
}

