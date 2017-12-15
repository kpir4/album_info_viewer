const wrapper = document.getElementById("wrapper");

function load_collection(collection_set){
	var navigation = document.getElementById("navigation");

	for(var i = 0; i < collection_set.length; i++){
		var collection_item = document.createElement("li");
		collection_item.textContent = collection_set[i];
		collection_item.setAttribute("id", "nav_item_" + (i+1));
		navigation.appendChild(collection_item);
	}
}


function load_albums(album_set, collection_set){
	for (var i = 0; i < 2; i++){

		var collection_wrapper = document.createElement("div");
		collection_wrapper.classList.add("music_collection");
		collection_wrapper.setAttribute("id", "collection_" + (i+1));
		wrapper.appendChild(collection_wrapper);

		const heading = document.createElement("h1");
		heading.textContent = collection_set[i];
		collection_wrapper.appendChild(heading);

		var collection = album_set["collection_" + (i+1)];

		for(var j = 0; j < collection.length; j++){
			// Create album cover collection elements
			var cover_wrapper = document.createElement("div");
			var cover = document.createElement("img");
			var title = document.createElement("span");

			// Add context
			cover.src = collection[j].cover_img;
			title.textContent = collection[j].title;

			// Add classes
			cover_wrapper.classList.add("collection_cover");

			// Add to DOM
			cover_wrapper.appendChild(cover);
			cover_wrapper.appendChild(title);
			collection_wrapper.appendChild(cover_wrapper);
		}
	}
}

// Changes displayed music collection
var collection;
var collection_link;
const nav = document.getElementById("navigation");
nav.addEventListener('click', function(e){
	if(e.target.tagName == 'LI'){

		if(collection_link){
			collection_link.removeAttribute("style");
		}
		
		collection_link = e.target;
		collection_link.style.color = "#5eff5e";

		// Get collection number
		const collection_num = collection_link.getAttribute("id").slice(-1);

		// Check if collection clicked is already displayed
		const collections = document.querySelectorAll(".music_collection");

		// Removes style and classes from previous collection
		if(collection){
			collection.classList.remove("show");
			var albums = collection.getElementsByClassName("collection_cover");
			for(var i = 0; i < albums.length; i++){
				albums[i].classList.remove("is_active")
				albums[i].removeAttribute("style");
			}
		}

		albums = document.getElementById("collection_" + collection_num).getElementsByClassName("collection_cover");

		collection = document.getElementById("collection_" + collection_num);
		collection.classList.add("show");

		// Ensures animation works after display change
		setTimeout(function(){
			for(var i = 0; i < albums.length; i++){
				albums[i].style.transitionDelay = Math.floor(Math.random() * 501 + 200) + "ms";
				albums[i].classList.add("is_active");
			}
		}, 20);
	}
})

