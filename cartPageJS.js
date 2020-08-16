// click切換為輸入搜尋

// m search 點擊顯示輸入區塊 ※

const searchIM = document.getElementById("searchicon-m");

    searchIM.addEventListener('click', () => {
    document.getElementById('search-m').style.display = 'block';
});


//取得輸入值 測試OK
    
function searchPC(){
    const searchPC = document.getElementById("search-pc").value;
    console.log(searchPC);
};

function searchM(){
    const searchM = document.getElementById("search-m").value;
    console.log(searchM);
};


// 連接搜尋API

// pc輸入搜尋
    
function searchPC(){
    const searchPC = document.getElementById("search-pc").value;
    console.log(searchPC);

    const newProduct = document.createElement("div"); 
    const container = document.getElementById("container");
    container.innerHTML = ""
    ajax( "https://api.appworks-school.tw/api/1.0/products/search?keyword="+searchPC, function(response){
        render(response);
    });
};

// M輸入搜尋

function searchM(){
    const searchM = document.getElementById("search-m").value;
    console.log(searchM);

    const newProduct = document.createElement("div"); 
    const container = document.getElementById("container");
    container.innerHTML = ""
    ajax( "https://api.appworks-school.tw/api/1.0/products/search?keyword="+searchM, function(response){
        render(response);
    });

};


// 讀取local內項目個數用

let cartItem

function readCart(){
    // 讀取上次傳到localstorage的紀錄
    let beforeData = localStorage.getItem('list');
    console.log("上次加入購物車的紀錄："+beforeData);

    if (beforeData != null || beforeData != undefined){
          if (typeof beforeData == 'string') {
            beforeData = JSON.parse(beforeData)
          };
        // cartItem = JSON.parse(beforeData).length;
        cartItem = beforeData.length;
        console.log(cartItem);
        document.getElementById("inCart").innerHTML = cartItem
        document.getElementById("inCartM").innerHTML = cartItem
        document.getElementById("cartNow").innerHTML = "購物車("+cartItem+")"
    }
}

// 頁面讀取完畢先讀取一次local紀錄
window.onload = readCart();

// 讀取local內全部資料用

function cartData(){
    // 讀取上次傳到localstorage的紀錄
    const beforeData = localStorage.getItem('list');
    // console.log("上次加入購物車的紀錄："+beforeData);
    if (typeof beforeData == 'string') {
        // beforeData = JSON.parse(beforeData)
        return JSON.parse(beforeData);
    }
    else{
        return beforeData;
    };
    
}

let userData = cartData();
console.log(userData)


// 拿購物車資料渲染畫面

function showItem(){

    let payCount = 0    //計算總金額用

    for (i in userData){

        // 動態生成的第一層div，裝單件商品內容
        const newItemDiv = document.createElement("div");  
        newItemDiv.setAttribute("class", "buylistItem");
        document.getElementById("buyList").appendChild(newItemDiv);  

        // 左方商品說明區塊

        const pdBox = document.createElement("div");  
        pdBox.setAttribute("class", "product");
        newItemDiv.appendChild(pdBox); 

        // 商品圖片

        const picDiv = document.createElement("div");  
        picDiv.setAttribute("class", "pic");
        pdBox.appendChild(picDiv); 

        const previewImg = document.createElement("img");
        previewImg.src = "https://api.appworks-school.tw/assets/"+userData[i].id+"/main.jpg"; 
        previewImg.setAttribute('class', "productImg"); 
        picDiv.appendChild(previewImg); 

        // 商品資料區塊

        const pdOrder = document.createElement("div");  
        pdOrder.setAttribute("class", "PDcheck");
        pdBox.appendChild(pdOrder); 

        // 商品標題

        const pdOnameDiv = document.createElement("div"); 
        pdOrder.appendChild(pdOnameDiv);
        const pdOname = document.createTextNode(userData[i].name);
        pdOnameDiv.appendChild(pdOname); 

        // 商品id

        const pdOidDiv = document.createElement("div"); 
        pdOrder.appendChild(pdOidDiv);
        const pdOid = document.createTextNode(userData[i].id);
        pdOidDiv.appendChild(pdOid); 

        // 商品顏色

        const pdOcolorDiv = document.createElement("div"); 
        pdOrder.appendChild(pdOcolorDiv);
        const pdOcolor = document.createTextNode("顏色│"+userData[i].color.name);
        pdOcolorDiv.appendChild(pdOcolor); 

        // 商品尺寸

        const pdOsizeDiv = document.createElement("div"); 
        pdOrder.appendChild(pdOsizeDiv);
        const pdOsize = document.createTextNode("尺寸│"+userData[i].size);
        pdOsizeDiv.appendChild(pdOsize); 

        // 商品數量

        const pdNum = document.createElement("div");  
        pdNum.setAttribute("class", "PDadd");
        newItemDiv.appendChild(pdNum); 

        const pdOnumDiv = document.createElement("div"); 
        pdOnumDiv.setAttribute("class", "textOnlyM");
        pdNum.appendChild(pdOnumDiv);

        const pdOnum = document.createTextNode("數量");
        pdOnumDiv.appendChild(pdOnum);   

        const pdOnumSelect = document.createElement("select"); 
        pdOnumSelect.setAttribute("class", "itemCount");
        pdNum.appendChild(pdOnumSelect);

        // select內的數目

        // 取得選擇數量用

        const userQty = userData[i].qty
        // console.log(userQty);

        // 取得庫存數量用

        const itemStock = userData[i].maxStock
        // console.log(itemStock);

        // 配合選擇與庫存顯示option狀態

        if (itemStock != 0){
            for (let j=0; j<itemStock; j++){
                const pdOnumSelectOne = document.createElement("option"); 
                pdOnumSelectOne.setAttribute("value", j);
                pdOnumSelect.appendChild(pdOnumSelectOne);

                const pdOnumSelectOneShow = document.createTextNode(j);
                pdOnumSelectOne.appendChild(pdOnumSelectOneShow); 

                pdOnumSelect.selectedIndex = userQty;

            };
        };

        // pdOnumSelect.onchange()


        // 商品單價

        const pdPrice = document.createElement("div");  
        pdPrice.setAttribute("class", "PDprice");
        newItemDiv.appendChild(pdPrice); 

        const pdLname = document.createElement("div");  
        pdLname.setAttribute("class", "textOnlyM");
        pdPrice.appendChild(pdLname); 
        const pdLtext = document.createTextNode("單價");
        pdLname.appendChild(pdLtext);    

        const pdLprice = document.createElement("div"); 
        pdPrice.appendChild(pdLprice); 
        const priceL = document.createTextNode("NT."+userData[i].price);
        pdLprice.appendChild(priceL); 

        // 商品小計

        const pdCount = document.createElement("div");  
        pdCount.setAttribute("class", "PDprice");
        newItemDiv.appendChild(pdCount); 

        const pdRname = document.createElement("div");  
        pdRname.setAttribute("class", "textOnlyM");
        pdCount.appendChild(pdRname); 
        const pdRtext = document.createTextNode("小計");
        pdRname.appendChild(pdRtext);    

        const pdRprice = document.createElement("div"); 
        pdCount.appendChild(pdRprice); 
        const priceR = document.createTextNode("NT."+userData[i].price*userQty);   //要另外寫個加總商品跟計算金額的function
        pdRprice.appendChild(priceR); 

        // 移除按鈕

        const remove = document.createElement("div");  
        remove.setAttribute("class", "removeIcon");
        newItemDiv.appendChild(remove); 

        const removeIcon = document.createElement("img");
        removeIcon.src = "./images/cart-remove.png"
        removeIcon.setAttribute('class', "removeImg");
        remove.appendChild(removeIcon); 


        // 使用product id找到index值
        const idForIndex = userData[i].id
        let indexValue

        for  (let j =0; j<userData.length; j++){
            if (idForIndex === userData[j].id){
                indexValue = j
            }
        }

        // console.log(indexValue);

        // 在垃圾桶上帶索引值(注意因為oroduct頁重複項目還沒合併，目前結果尚未正確)
        remove.setAttribute("indexValue", indexValue);  

        // remove.addEventListener("click", removeItem());  //這個才是正式要用的
        remove.addEventListener("click", function (){

            const removeIndex = remove.getAttribute("indexValue");
            console.log(removeIndex);

            // localStorage.removeItem("list");

            // const removeArr = userData.splice(removeIndex, 1);
            // console.log(removeArr);

            // // 這邊開始是重新編index號碼

            // for (i in removeArr){

            //     const idForIndex = removeArr[i].id
            //     let indexValue

            //     for  (let j =0; j<removeArr.length; j++){
            //         if (idForIndex === removeArr[j].id){
            //             indexValue = j
            //             // console.log(j);
            //             remove.setAttribute("indexValue", indexValue);  
            //         }

            //     }

            //     // remove.setAttribute("indexValue", indexValue);  
            // }

            // localStorage.setItem("list", JSON.stringify(removeArr));
            // // localStorage.setItem("list", removeArr);
            // // document.getElementById("buyList").innerHTML = ""

            // cartData();
            // showItem();
            
        });


        // 在迴圈中順便累加每項的小計，並替換畫面結果

        payCount += userData[i].price*userQty

        if(payCount>0){
            document.getElementById("payCount").innerHTML = payCount
            document.getElementById("payTotal").innerHTML = payCount+60
        }
        else{
            document.getElementById("payCount").innerHTML = 0
            document.getElementById("payTotal").innerHTML = 60
        };

    }   

}


// 測試渲染

showItem();


// function removeItem(index){

//     localStorage.removeItem("list"[index]);
//     // showItem(); 

// }


