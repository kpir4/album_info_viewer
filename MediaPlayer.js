const wrapper = document.getElementById("wrapper");
const collection_wrapper = document.createElement("div");

function load_collection(collection_set){
	var navigation = document.getElementById("navigation");

	for(var i = 0; i < collection_set.length; i++){
		var collection_item = document.createElement("li");
		collection_item.textContent = collection_set[i];
		collection_item.setAttribute("id", "collection_" + (i+1));
		navigation.appendChild(collection_item);
	}
}


function display_albums(album_set, collection_name){
	collection_wrapper.classList.add("music_collection");
	wrapper.appendChild(collection_wrapper);

	const heading = document.createElement("h1");
	heading.textContent = collection_name;
	collection_wrapper.appendChild(heading);

	for(var i = 0; i < album_set.length; i++){
		// Create album cover collection elements
		var cover_wrapper = document.createElement("div");
		var cover = document.createElement("img");
		var title = document.createElement("span");

		// Add context
		cover.src = album_set[i].cover_img;
		title.textContent = album_set[i].title;

		// Add classes
		cover_wrapper.classList.add("collection_cover");

		cover_wrapper.appendChild(cover);
		cover_wrapper.appendChild(title);
		collection_wrapper.appendChild(cover_wrapper);

	}
}

const nav = document.getElementById("navigation");
nav.addEventListener('click', function(e){
	if(e.target.tagName == 'LI' && e.target.getAttribute("id") == "collection_2"){
		collection_wrapper.style.display = "block";
	}
	else{
		collection_wrapper.style.display = "none";
	}
})