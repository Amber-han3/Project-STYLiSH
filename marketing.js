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


// 取得新的banner，清空前一筆資料內容，並間隔10秒填入新資料

function renderBanner(banner){

    // 導入與替換為其他banner用

    for (let i=0; i<banner.data.length; i++){ //++代表i有增加，+1則一直都是同個值

        setTimeout(function (){

            const picURL = "https://api.appworks-school.tw"+banner.data[i].picture
            // const story = banner.data[1].story.replace("\r\n", "<br />"); //可以但只換到第一個
            const story = banner.data[i].story.replace(/\r\n/g, "<br />");  //g 執行符號內的全域性匹配

            const id = banner.data[i].id
            // const productID = "https://api.appworks-school.tw/product.html?id="+banner.data[i].product_id //之後記得改掉網址
            const productID = "https://amber-han3.github.io/Front-End-Class-Batch11/students/amber/Stylish/product.html?id="+banner.data[i].product_id

            // console.log(productID);
            // console.log(picURL+"+"+story+"+"+id+"+"+productID);

            // 清掉前一筆資料的內容

            const bannerDiv = document.getElementById("banner")
            bannerDiv.innerHTML = "" 

            // 建立新div並套上CSS

            const newProduct = document.createElement("div");  
            newProduct.setAttribute("class", "main-banner");
            document.getElementById("banner").appendChild(newProduct);


            const newDiv = document.createElement("div");  
            newDiv.setAttribute("class", "bannerimg");
            newProduct.appendChild(newDiv); 

            // API內的圖片&圖片上連結

            const newImgLink = document.createElement("a");
            newImgLink.href = productID
            newDiv.appendChild(newImgLink);

            const newImg = document.createElement("img"); 
            newImg.src = picURL;  
            // newImg.setAttribute("class", "bannerimg"); 

            newImg.style.backgroundImage="url("+picURL+")"
            newImgLink.appendChild(newImg); 

            // 試試加入淡入淡出效果
            
            newImg.setAttribute("class", "bannerimgLoad"); 
            newImg.onload = function() {
                newImg.removeAttribute("bannerimgLoad");
                newImg.setAttribute("class", "bannerimg"); 
            };


            //API內的文字

            const newText = document.createElement("div");  
            const text = document.createTextNode(story); 

            newText.appendChild(text); 
            newDiv.appendChild(newText);

            newText.setAttribute("class", "bannertext-all");
            newText.innerHTML = story;

            // console.log(i-banner.data.length);

            //在此迴圈結束前呼叫下一輪，達成循環輪播
            if(banner.data.length -i === 1){ 
                window.setTimeout(() => ajax("https://api.appworks-school.tw/api/1.0/marketing/campaigns", function(response){
        renderBanner(response);
                }), 10000);
            };

            //配合迴圈更改前端css的樣式

            // 第一組與第一顆點
            if (id === 1){
                const dotA = document.getElementById("dotA")
                dotA.setAttribute("class", "dotOn");
            }
            else{
                dotA.setAttribute("class", "dotOff");
            }

            // 第二組與第二顆點
            if (id === 2){
                const dotB = document.getElementById("dotB")
                dotB.setAttribute("class", "dotOn");
            }
            else{
                dotB.setAttribute("class", "dotOff");
            }

            // 第三組與第三顆點
            if (id === 3){
                const dotC = document.getElementById("dotC")
                dotC.setAttribute("class", "dotOn");
            }
            else{
                dotC.setAttribute("class", "dotOff");
            }

        }, i*10000) //之後記得改成10秒

   };
}

// 顯示迴圈新banner的畫面

ajax("https://api.appworks-school.tw/api/1.0/marketing/campaigns", function(response){
    renderBanner(response);
});
