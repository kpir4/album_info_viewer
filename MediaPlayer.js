const wrapper = document.getElementById("wrapper");

function load_collection(collection_set){
	var navigation = document.getElementById("navigation");

	for(var i = 0; i < collection_set.length){
		var collection_item = document.createElement("li");
		collection_item.textContent = collection_set[i];
		collection_item.setAttribute("id", "collection_" + (i+1));
	}
}


function display_albums(album_set){
	const collection_wrapper = document.createElement("div");
	collection_wrapper.classList.add("music_collection");
	wrapper.appendChild(collection_wrapper);

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
		cover_wrapper.appendChild(document.createElement("br"));
		cover_wrapper.appendChild(title);
		collection_wrapper.appendChild(cover_wrapper);

	}
}

const nav = document.getElementById("navigation");
nav.addEventListener('click', function(e){
	if(e.target.tagName == 'LI'){
		display_albums(e.target.className);
	}
})


// const wrapper = document.querySelector("#wrapper");

// // Album cover elements
// const album_info = document.createElement("div");
// const album_cover = document.createElement("div");
// var cover = document.createElement("img");
// cover.src = "test.jpg"
// var title = document.createElement("span");
// var artist = document.createElement("span");
// var catalog = document.createElement("span");
// var release_date = document.createElement("span");
// var bitrate = document.createElement("span");
// var ripper = document.createElement("span");

// // Add content
// title.textContent = "Night Life";
// artist.textContent = "In The Shadow";
// catalog.textContent = "PCCG-70040";
// release_date.textContent = "May 20, 2001";
// bitrate.textContent = "320 kBps";
// ripper.textContent = "Kazaa";

// // Add classes
// album_info.classList.add("album_info");
// album_cover.classList.add("album_cover");
// title.classList.add("title");
// artist.classList.add("desc");
// catalog.classList.add("desc");
// release_date.classList.add("desc");
// bitrate.classList.add("desc");
// ripper.classList.add("desc");

// // Append to document
// album_cover.appendChild(cover);
// album_cover.appendChild(title);
// album_cover.appendChild(document.createElement("br"));
// album_cover.appendChild(artist);
// album_cover.appendChild(document.createElement("br"));
// album_cover.appendChild(catalog);
// album_cover.appendChild(document.createElement("br"));
// album_cover.appendChild(release_date);
// album_cover.appendChild(document.createElement("br"));
// album_cover.appendChild(bitrate);
// album_cover.appendChild(document.createElement("br"));
// album_cover.appendChild(ripper);
// album_cover.appendChild(document.createElement("br"));
// album_info.appendChild(album_cover);
// wrapper.appendChild(album_info);