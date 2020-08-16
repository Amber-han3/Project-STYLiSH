// product 頁使用的JS

// click切換為輸入搜尋

// m search 點擊顯示輸入區塊 ※

const searchIM = document.getElementById("searchicon-m")
searchIM.addEventListener('click', () => {
    document.getElementById('search-m').style.display = 'block';
});


//取得輸入值
    
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
    // console.log(searchPC);

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
    // console.log(searchM);

    const newProduct = document.createElement("div"); 
    const container = document.getElementById("container");
    container.innerHTML = ""
    ajax( "https://api.appworks-school.tw/api/1.0/products/search?keyword="+searchM, function(response){
        render(response);
    });

};


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

//使用全域變數儲存網址id及對應ajax位址

const nowUrl = location.href;
const url = new URL(nowUrl);
const urlID = url.searchParams.get('id');
const APIsrc = "https://api.appworks-school.tw/api/1.0/products/details?id="+urlID


// 畫面顯示API內容

function renderPD(detail){

	if(urlID===null){
		console.log("網址沒有ID");
	}
	else{

        // 主要圖片 第一張
        // body下建立第一層div
	    const newPicDiv = document.createElement("div");  
	    newPicDiv.setAttribute("class", "SpecIMGdiv");
	    document.getElementById("PDBody").appendChild(newPicDiv);  

	    // 主要圖片
        const newMainImg = document.createElement("img");
        newMainImg.src = detail.data.main_image; 
        newMainImg.setAttribute('class', "SpecIMG"); 
        newPicDiv.appendChild(newMainImg); 


        // 產品規格
        // body下建立第一層div 
        const newPDText = document.createElement("div");  
	    newPDText.setAttribute("class", "productText");
	    document.getElementById("PDBody").appendChild(newPDText);  

    	// 第二層 name區塊
	    const newName = document.createElement("div");  
	    newName.setAttribute("class", "nameLine"); 
	    newPDText.appendChild(newName);

	    // name區塊內的東西

	    const newTitle = document.createElement("div");  
	    newTitle.setAttribute("class", "nameTitle"); 
	    newName.appendChild(newTitle); 
	    const title = document.createTextNode(detail.data.title);  
	    newTitle.appendChild(title);

	    chooseName = detail.data.title

	    const newPDID = document.createElement("div");  
	    newPDID.setAttribute("class", "namePDID"); 
	    newName.appendChild(newPDID);
	    const PDID = document.createTextNode(detail.data.id); 
	    newPDID.appendChild(PDID);

	    chooseID = detail.data.id

		const newPrice = document.createElement("div");  
	    newPrice.setAttribute("class", "nameTitle"); 
	    newName.appendChild(newPrice);
	    const Price = document.createTextNode("TWD."+detail.data.price); 
	    newPrice.appendChild(Price);	

	    ChoosePrice = detail.data.price		    

	    const newNameBorder = document.createElement("div");  
	    newNameBorder.setAttribute("class", "nameBorder"); 
	    newName.appendChild(newNameBorder);

		// 第二層 color區塊

	    const newColor = document.createElement("div");  
	    newColor.setAttribute("class", "colorLine"); 
	    newPDText.appendChild(newColor); 

	    // color區塊內的東西

		const newColorText = document.createElement("div");  
	    newColorText.setAttribute("class", "colorText"); 
	    newColor.appendChild(newColorText);
	    const colorText = document.createTextNode("顏色│"); 
	    newColorText.appendChild(colorText);

        // 色票輸出

        for (let j in detail.data.colors){

            const colorblock = document.createElement("div");
            const colorblockShow = document.createElement("div"); 
            colorblockShow.setAttribute('class', 'colorsampleone'); 
            colorblockShow.setAttribute('dataColorname', detail.data.colors[j].name);

            const color = detail.data.colors[j].code

            colorblockShow.style.backgroundColor = "#"+color;

            colorblockShow.appendChild(colorblock); 
            newColor.appendChild(colorblockShow);          

            colorblockShow.addEventListener( "click", function(){

	       // click事件，一次只出現一個

	        let colorAfter = document.querySelectorAll(".colorChoose");

	        for (let i=0; i<colorAfter.length; i++){

	          	colorAfter[i].className = 'colorsampleone'
	        } ;

            colorblockShow.setAttribute('class', 'colorChoose');
            colorblockShow.style.backgroundColor = "#"+color;

            // 可直接取到hex，在轉換前先記錄
            userColor = color

            // 取得色碼的中文資料
            colorName = document.querySelector(".colorChoose").getAttribute("dataColorname")

            // 這個會變成RGB數值
            // userColor = document.querySelector(".colorChoose").style.backgroundColor
            // console.log("userColor"+userColor);

			// 庫存查詢

			stockRecord = updateStock();

			});

        };

	    // 第二層 size區塊

	    const newSize = document.createElement("div");  
	    newSize.setAttribute("class", "sizeLine"); 
	    newPDText.appendChild(newSize); 

	    // size區塊內東西

		const newSizeText = document.createElement("div");  
	    newSizeText.setAttribute("class", "sizeText"); 
	    newSize.appendChild(newSizeText);
	    const sizeText = document.createTextNode("尺寸│"); 
	    newSizeText.appendChild(sizeText);

        // 尺寸輸出

        for (let k in detail.data.sizes){

            const sizeCircle = document.createElement("div");
            sizeCircle.setAttribute('class', "sizeCircle"); 
            newSize.appendChild(sizeCircle);

            const circle = detail.data.sizes[k];
            const size = document.createTextNode(circle); 
	    	sizeCircle.appendChild(size);

	    	// click事件，一次只出現一個

            sizeCircle.addEventListener( "click", function(){

		        let sizeAfter = document.querySelectorAll(".sizeChoose");

		        for (let i=0; i<sizeAfter.length; i++){
		          	sizeAfter[i].className = 'sizeCircle'
		        } ;

	            sizeCircle.setAttribute('class', "sizeChoose");

	            // 取得賦予的size值
	            userSize = circle

	            // 庫存查詢
				stockRecord = updateStock();

				// 庫存等於0時css淡化&加上禁止點擊
				if (stockRecord == 0){
					sizeCircle.setAttribute('class', "sizeOut");
				}

			});

        };

	    // 第二層 數量區塊

	    const newNumber = document.createElement("div");  
	    newNumber.setAttribute("class", "numberLine"); 
	    newPDText.appendChild(newNumber); 

	    // 數量區塊裡面的東西

		const newNumberText = document.createElement("div");  
	    newNumberText.setAttribute("class", "numberText"); 
	    newNumber.appendChild(newNumberText);
	    const numberText = document.createTextNode("數量│"); 
	    newNumberText.appendChild(numberText);

		const numberSelect = document.createElement("div");  
	    numberSelect.setAttribute("class", "numberSelect"); 
	    newNumber.appendChild(numberSelect);

    	// 第三層 數量選擇器位置

		const numberBox = document.createElement("div");  
	    numberBox.setAttribute("class", "numberBox"); 
	    numberSelect.appendChild(numberBox);

	    // 第四層 數量選擇器內容

   		const numberChangeL = document.createElement("div");  
	    numberChangeL.setAttribute("class", "numberChange"); 
	    numberBox.appendChild(numberChangeL);
	    const numberL = document.createTextNode("-"); 
		numberChangeL.appendChild(numberL);	

		numberChangeL.addEventListener("click",function(){

			if (chooseNumber >1){
				chooseNumber = Number(chooseNumber)-1;
				numberInBox.innerHTML = ""
			    const numberNow = document.createTextNode(chooseNumber); 
				numberInBox.appendChild(numberNow);	
    		}
    		else{
    			chooseNumber = 1
    		}

		});

   		const numberInBox = document.createElement("div");  
	    numberInBox.setAttribute("class", "numberInBox"); 
	    numberBox.appendChild(numberInBox);
	    const numberNow = document.createTextNode(chooseNumber); 
		numberInBox.appendChild(numberNow);	

		const numberChangeR = document.createElement("div");  
	    numberChangeR.setAttribute("class", "numberChange"); 
	    numberBox.appendChild(numberChangeR);
	    const numberR = document.createTextNode("+"); 
		numberChangeR.appendChild(numberR);	

		numberChangeR.addEventListener("click",function(){

			stockRecord = updateStock();

			if (chooseNumber < stockRecord){
    			chooseNumber = Number(chooseNumber)+1;
    			numberInBox.innerHTML = ""
			    const numberNow = document.createTextNode(chooseNumber); 
	    		numberInBox.appendChild(numberNow);	
    		}
    		else{
    			chooseNumber = stockRecord
    			numberInBox.innerHTML = ""
			    const numberNow = document.createTextNode(stockRecord); 
	    		numberInBox.appendChild(numberNow);	
    		}

	});


		// 第三層 加入購物車

		const addToCart = document.createElement("div");  
	    addToCart.setAttribute("class", "addToCart"); 
	    newPDText.appendChild(addToCart); 
	    const cartText = document.createTextNode("加入購物車"); 
		addToCart.appendChild(cartText);

		addToCart.addEventListener("click", addCart);

		const addToCartM = document.createElement("div");  
	    addToCartM.setAttribute("class", "addToCartM"); 
	    newPDText.appendChild(addToCartM); 
	    const cartTextM = document.createTextNode("加入購物車"); 
		addToCartM.appendChild(cartTextM);	

		addToCartM.addEventListener("click", addCart);

		// 第三層 產地說明

		const originText = document.createElement("div");  
	    originText.setAttribute("class", "originText"); 
	    newPDText.appendChild(originText); 

	    const originData = detail.data.note+"<br>"+"<br>"+detail.data.texture+"<br>"+detail.data.description.replace(/\r\n/g,"<br>")+"<br>"+"<br>"+detail.data.wash+"<br>"+"產地："+detail.data.place
		originText.innerHTML = originData

		// 第二層 細部說明分隔線

		const detailHeader = document.createElement("div");  
	    detailHeader.setAttribute("class", "detailHeader");  
	    document.getElementById("PDBody").appendChild(detailHeader);  

	    const detailTitle = document.createElement("div");  
	    detailTitle.setAttribute("class", "detailTitle"); 
	    detailHeader.appendChild(detailTitle); 
	    const detailLine = document.createTextNode("細部說明");  
	    detailTitle.appendChild(detailLine);

	    const detailBorder = document.createElement("div");  
	    detailBorder.setAttribute("class", "detailBorder"); 
	    detailHeader.appendChild(detailBorder);

		// 第二層 細部說明內容

		const detailContent = document.createElement("div");  
	    detailContent.setAttribute("class", "detailHeader");  
	    document.getElementById("PDBody").appendChild(detailContent); 

    	// 第三層 說明內容文字

        const detailText = document.createElement("div");
        detailText.setAttribute('class', "detailText"); 
        detailContent.appendChild(detailText);


    	// 第三層 說明內容圖片

    	const productStory = detail.data.story;
        const Story = document.createTextNode(productStory); 
    	detailText.appendChild(Story);

	    for (let m in detail.data.images){

	    	const ImgLink = detail.data.images[m]
	    	const detailImgPos = document.createElement("div");  
		    detailImgPos.setAttribute("class", "detailImgPos");
		    detailContent.appendChild(detailImgPos);

	    	const detailImg = document.createElement("img");
	        detailImg.src = ImgLink;  
	        detailImg.setAttribute('class', "detailImg"); 
	        detailImgPos.appendChild(detailImg); 	

        };

	    // 庫存查詢功能

	    function updateStock(){
    		const stockData = detail.data.variants
			const stockArr = stockData.filter(function(){
				for (i=0; i<stockData.length; i++){
			  		if (userColor == stockData[i].color_code && userSize == stockData[i].size){
			  			stock = stockData[i].stock
			  			return stock;
			  		}
				}
			});
			console.log("本組合最大庫存："+stock);
			return stock;		    	
		};

	};         

} 

ajax(APIsrc, function(response){
    renderPD(response);
});


// 計算庫存用

let userColor
let userSize
let stock //資料內的庫存
let stockRecord //存回傳庫存值用
let chooseNumber=1

let cartItem=0 //更新購物車圖示用

// 讀取前次local記錄用
function readCart(){
	// 讀取上次傳到localstorage的紀錄
	const beforeData = localStorage.getItem('list');
	console.log("上次加入購物車的紀錄："+beforeData);

	if (beforeData != null || beforeData != undefined){
		cartItem = JSON.parse(beforeData).length
		// console.log(cartItem);
		document.getElementById("inCart").innerHTML = cartItem
		document.getElementById("inCartM").innerHTML = cartItem
	}
}

// 頁面讀取完畢先讀取一次local紀錄
window.onload = readCart();

// 補取要傳入localstorage的資料
let chooseID
let chooseName = 0
let ChoosePrice
let colorName
let ChooseColor = {}

// 先讀取上次的紀錄，將新增內容傳入陣列後，整個陣列一起傳到localstorage
function addCart(){

	// 紀錄新值用

	let list = JSON.parse(localStorage.getItem("list"))||[] 	// localStorage初始設置，有值讀值，沒有值給空陣列
	let userList = {}

	ChooseColor.name = colorName
	ChooseColor.code = userColor

	// 紀錄新值用

	userList.id = chooseID
	userList.name = chooseName
	userList.price = ChoosePrice
	userList.color = ChooseColor
	console.log(JSON.stringify(userList.color));
	userList.size = userSize
	userList.qty = chooseNumber
	userList.maxStock = stock

	// 在這查是不是已經有重複的資料了
	


	list.push(userList);

	console.log(userList);
	console.log(list);

	// 傳到localstorage

	localStorage.setItem('list', JSON.stringify(list));

	readCart();
}

// localStorage.clear();	//清空內容用


