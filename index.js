
// 取得資料

function ajax(src, callback){
    const req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (req.readyState === 4){
            if( typeof callback === 'function'){
                const product = JSON.parse(req.responseText);
                    callback(product);
            }
        }
    };
    req.open("GET", src);
    req.send(); 
}


// 畫面顯示API內容

function render(dataF){

    // 取得頁碼資料
    paging=dataF.next_paging
    console.log("現在API內的nextPaging頁數"+paging);

    // 建立新div1並套上同樣的CSS

    const newProduct = document.createElement("div");  
    newProduct.setAttribute('class', 'productbody');
    document.getElementById("container").appendChild(newProduct);  

    for (let i in dataF.data){

        const newDiv = document.createElement("div");  
        newDiv.setAttribute('class', 'product');
        newProduct.appendChild(newDiv); 

        // 圖片加上連結

        const ImgURL = "https://amber-han3.github.io/Front-End-Class-Batch11/students/amber/Stylish/product.html?id="+dataF.data[i].id
        const newImgLink = document.createElement("a");
        newImgLink.href = ImgURL
        newDiv.appendChild(newImgLink);


        // API內的圖片

        const newImg = document.createElement("img");
        newImg.src = dataF.data[i].main_image;  
        newImg.setAttribute('class', 'productimg'); 
        newImgLink.appendChild(newImg);      


        // API內的顏色

        for (let j in dataF.data[i].colors){

            const colorblock = document.createElement("div");
            const newColor = document.createElement("div"); 
            newColor.setAttribute('class', 'colorsampleone'); 

            const color = dataF.data[i].colors[j].code;
            
            newColor.style.backgroundColor = "#"+color;

            newColor.appendChild(colorblock); 
            newDiv.appendChild(newColor);

            }

        // API內的標題           

        const newTitle = document.createElement("p"); 

        const title = document.createTextNode(dataF.data[i].title);  
        newTitle.appendChild(title);   
        newDiv.appendChild(newTitle);  

        // API內的價格

        const newPrice = document.createElement("p");  

        const price = document.createTextNode("TWD."+dataF.data[i].price); 
        newPrice.appendChild(price); 
        newDiv.appendChild(newPrice);
        
    }
}

// click切換為輸入搜尋

// m search 點擊顯示輸入區塊 ※

const searchIconM = document.getElementById("searchicon-m");

    searchIconM.addEventListener('click', () => {
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

// M版輸入搜尋

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

// // 取得all

// ajax("https://api.appworks-school.tw/api/1.0/products/all", function(response){
//     render(response);
// });

// click取得女裝

document.getElementById("women").addEventListener('click', () => {
    const newProduct = document.createElement("div"); 
    const container = document.getElementById("container");
    container.innerHTML = ""

    category="women" //用來更新外面全域變數的值，前面不可再宣告，不然會變成新變數

    console.log("women內的category變數現在是"+category);

    const srcWomen = "https://api.appworks-school.tw/api/1.0/products/women?paging="+0

    ajax(srcWomen, function(response){
        render(response);
    });
});    

// click取得男裝

document.getElementById("men").addEventListener('click', () => {
    const newProduct = document.createElement("div"); 
    const container = document.getElementById("container");
    container.innerHTML = ""

    category="men";//用來更新外面全域變數的值，前面不可再宣告，不然會變成新變數

    const srcMen = "https://api.appworks-school.tw/api/1.0/products/men?paging="+0

    ajax(srcMen, function(response){
        render(response);
    });
});    


// click取得配件
    
document.getElementById("accessories").addEventListener('click', () => {
    const newProduct = document.createElement("div"); 
    const container = document.getElementById("container");
    container.innerHTML = ""

    category="accessories"; //用來更新外面全域變數的值，前面不可再宣告，不然會變成新變數

    const srcAcc = "https://api.appworks-school.tw/api/1.0/products/accessories?paging="+0

    ajax(srcAcc, function(response){
        render(response);
    });
});

 //共用，到底加載更多 
let category="all";
let paging=1; //全域變數控制網址上的頁數，一開始的all跟click的網址還沒改，目前是帶出0，所以load從1開始
window.addEventListener('scroll', () => {

    const nowPostion = window.scrollY; // 當前滾動條位置  
    const InnerHeight = window.innerHeight; // 裝置視窗的高度（不會變）  
    const totalScroll = document.body.scrollHeight; // 滾動條總高度 

    if (nowPostion + InnerHeight +2 >= totalScroll) {  //不知道為什麼網頁高度幾次開不一樣，2只是為了補碰到底的誤差
        // console.log("視窗已經到底，目前位置"+nowPostion);

        const more = "https://api.appworks-school.tw/api/1.0/products/"+category+"?paging="+paging

        if (paging === undefined){
            console.log("scroll loadmore因為發現undefined停止");
            return;
        }
        else{
            loadmore(more);
            console.log("scroll內判斷完成進入else，正常載入新資料");
            console.log("scroll內判斷完成進入else，使用網址:"+more);
        }

    };
});

// 新資料的ajax+render組合功能

function loadmore(src){

    const newProduct = document.createElement("div"); 
    const container = document.getElementById("container");

    // 取得主要網址

    const nowsrc = src

    // 顯示新加入內容

    ajax(nowsrc, function(response){
        render(response);
    });

};


// 從product頁面來的狀況

function checkURL(){
    const nowUrl = location.href;
    const url = new URL(nowUrl);
    const urlcategory=url.searchParams.get('category');

    if (urlcategory=="women"){
        ajax("https://api.appworks-school.tw/api/1.0/products/women?paging="+0, function(response){
            render(response);
        })
    }
    else if (urlcategory=="men"){
        ajax("https://api.appworks-school.tw/api/1.0/products/men?paging="+0, function(response){
            render(response);
        })
    }
    else if (urlcategory=="accessories"){
        ajax("https://api.appworks-school.tw/api/1.0/products/accessories?paging="+0, function(response){
            render(response);
        })
    }
    else{
        ajax("https://api.appworks-school.tw/api/1.0/products/all", function(response){
    render(response);
        });
    }

}

window.onload = checkURL();


