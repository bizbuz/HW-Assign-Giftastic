

var topics = ["mickeymouse", "donalduck", "aladin", "jasmine"];
var animated; 
const api_key = "e4QAxHOtBjprxCBo6XtRcfCp0F2JQbId";

//function to create buttons for each string 
function createButtons(){

	for(var i = 0; i< topics.length; i++){
			var btn = $("<button>") ; 
			btn.addClass("displayButton"); 
			btn.attr("data-name", topics[i]);
			btn.text(topics[i]); 
			$("#buttonsArea").append(btn); 

		}

	}

//function to fetch data => 10 images 
function getDataByName(){

	var disneyChar = $(this).attr("data-name"); 
	var records = 10; 
	var  queryUrl = "https://api.giphy.com/v1/gifs/search?rating="+'G'+"&q=Disney+" + disneyChar + "&api_key=" + $.trim(api_key) + 
	"&limit=" + records ; 
	console.log(queryUrl); 

	$.ajax({
		url: queryUrl,
		method: "GET" 
	}).done(function(response){
    	renderContent(response); 
	})
}

//function to fetch particular image clicked
function getDataById(id){
	var queryUrl = "https://api.giphy.com/v1/gifs/" + id + "?" + "&api_key=" + $.trim(api_key);
	$.ajax({
		url: queryUrl,
		method: "GET"
	}).done(function(response){
		animated = id.animated; 
		changeImage(response, id); 
	
	})
}	

//to render  images 
function renderContent(response){
	$("#displayArea").empty(); 
	for(var key in response){
		var obj = response[key]; 
		if (key=="data"){
			for(var item  in obj){
				var imgURL = obj[item].images["fixed_height_still"].url; 
				var img = $("<img>");
				img.addClass("renderedImage");
				img.attr("src", imgURL); 
				img.attr("id", obj[item].id); 
				img.attr("data-animated", false)
				$("#displayArea").append(img);
				
			}
		}		
	}
}

//support function to get id of image clicked
function getId(){
	var currentImgId = $(this)[0].id; 
	var newSrc = getDataById(currentImgId);
}

//function to set image to animated if not animated  and vice versa
function changeImage(response, id){
	var image1 = document.getElementById(id); 
	animated = image1.dataset.animated; 
	for (var key in response){
		var obj = response[key];
		if (key=="data"){
			if (animated=="true") {
				var newSrc = obj["images"]["fixed_height_still"].url; 
				document.getElementById(id).src = newSrc; 
				document.getElementById(id).dataset.animated = false; 

			}
			else if (animated== "false"){
				var newSrc = obj["images"]["fixed_height"].url; 
				document.getElementById(id).src = newSrc; 
				document.getElementById(id).dataset.animated = true; 
			}
		}
	}
}

function addButton(){

	var text = $("input[name=advSearch]:text").val(); 
	if(text != ""){
		var newBtn = $("<button>"); 
		newBtn.text(text); 
		newBtn.addClass("displayButton"); 
		newBtn.attr("data-name", text);
		$("#buttonsArea").append(newBtn);
		$("input[name=advSearch]:text").val(""); 
	}

}

$(document).ready(function(){

createButtons();		
$(document).on("click", ".displayButton", getDataByName); 
$(document).on("click", ".renderedImage", getId); 
//$(document).on("click",  $("button[name='searchBtn']"), addButton); 
$(document).on("click", ".searchBtn", addButton); 


})