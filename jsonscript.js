// api url
const api_url =  "https://dummyjson.com/products?limit=100";
  
var data;  

var backup;
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    data = await response.json();
	backup = JSON.parse(JSON.stringify(data));
	console.log(data);
	
    show(data);
	category(data)
}
getapi(api_url);
  
   
  
// Function to define innerHTML for HTML table
function show(data) {
    let tab = "";
    for (let r of data.products) {
		tab += `
							<div class ="col-xs-12 col-sm-12 col-md-4 store-product">
							<div class="card container mb20 p20 tbor" id="product-details">
							<h3 class="text-center mb10 tclr fs tit title">${r.title}</h3>
							<hr class="topbor mb10"/>
							<div class="text-center mb10">
							<img src=${r.thumbnail} alt="products" class="images"/>
							</div>
							<p class="text-left mb5"><span class="tclr">Price :</span> Rs.${r.price}</p>
							<p class="text-left mb5"><span class="tclr">Description :</span> <span class="des" data-toggle="tooltip" data-placement="bottom" title=${r.description}>${r.description}</span></p>
							<p class="text-left mb15"><span class="tclr">Category :</span> ${r.category}</p>
							<p class="text-left mb15"><span class="tclr">Discount :</span> ${r.discountPercentage}</p>	
							<p class="text-left mb15"><span class="tclr">Rating :</span> ${r.rating}</p>	
							<p class="text-left mb15"><span class="tclr">Stock :</span> ${r.stock} <span id="hurry"></span></p>	
							<button class="tcolor" onclick="cart();">Add To Cart</button>
							</div>
							</div>`
    }
    document.getElementById("resdata").innerHTML = tab;
	//console.log(resdata);

}


function category(data){
		let cate ="";
		let unicat = new Set( JSON.parse(JSON.stringify(data.products)) );
		console.log(unicat);
		unicat.forEach(function(value) {
			cate += value.category + "<br>";
			//console.log(cate);
		})
		document.getElementById("cate").innerHTML = cate;
}




//search
const search = document.getElementById("search");
search.addEventListener("keyup", filterProducts);

function filterProducts(e) {
    const text = e.target.value.toLowerCase();
	if(text == ''){
		data=JSON.parse(JSON.stringify(backup));;
	}else{
		const matches = backup.products.filter(element => {
		if (element.title.toLowerCase().indexOf(text) !== -1 || element.description.toLowerCase().indexOf(text) !== -1 || element.category.toLowerCase().indexOf(text) !== -1) {
		return true;
	  }
	});
	data.products = matches;
	}
	show(data);
}

//cart
function cart(){
	var value = parseInt(document.getElementById('cart').value);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('cart').value = value;
}



function laptop(){
	
}