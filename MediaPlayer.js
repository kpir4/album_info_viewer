const wrapper = document.getElementById("wrapper");
var collection_state = {};

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

		// Initialise all music collection displays
		collection_state["collection_" + (i+1)] = false;

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

			cover_wrapper.appendChild(cover);
			cover_wrapper.appendChild(title);
			collection_wrapper.appendChild(cover_wrapper);
		}
	}
}

// Changes displayed music collection
const nav = document.getElementById("navigation");
nav.addEventListener('click', function(e){
	if(e.target.tagName == 'LI'){
		// Get collection number
		const collection_num = e.target.getAttribute("id").slice(-1);

		// Check if collection clicked is already displayed
		collection_state["collection_" + collection_num] = true;
		const collections = document.querySelectorAll(".music_collection");

		// 
		for(var i = 0; i < collections.length; i++){
			if("collection_" + collection_num != collections[i].id){
				collection_state["collection_" + collection_num] = false;
				collections[i].classList.remove("show");
				var albums = collections[i].getElementsByClassName("collection_cover");
				for(var j = 0; j < albums.length; j++){
					albums[j].removeAttribute("style");
				}
			}
		}

		albums = document.getElementById("collection_" + collection_num).getElementsByClassName("collection_cover");

		const collection_wrapper = document.getElementById("collection_" + collection_num);
		collection_wrapper.classList.add("show");
		setTimeout(function(){
			for(i = 0; i < albums.length; i++){
				albums[i].style.transitionDelay = Math.floor(Math.random() * 501 + 200) + "ms";
				albums[i].classList.add("is_active");
			}
		}, 200);
	}
})

