const wrapper = document.getElementById("wrapper");

function load_nav_items(collection_set){
	var navigation = document.getElementById("navigation");

	for(var i = 0; i < collection_set.length; i++){
		var collection_item = document.createElement("li");
		collection_item.textContent = collection_set[i];
		collection_item.setAttribute("id", "nav_item_" + (i+1));
		navigation.appendChild(collection_item);
	}

	// Changes displayed music collection
	var collection;
	var collection_link;

	navigation.addEventListener('click', function(e){
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
	});
}


function load_collections(album_set, collection_set){
	var album_id = 0;
	for (let i = 0; i < collection_set.length; i++){

		var collection_wrapper = document.createElement("div");
		collection_wrapper.classList.add("music_collection");
		collection_wrapper.setAttribute("id", "collection_" + (i+1));
		wrapper.appendChild(collection_wrapper);

		const heading = document.createElement("h1");
		heading.textContent = collection_set[i];
		collection_wrapper.appendChild(heading);

		let collection = album_set["collection_" + (i+1)];

		for(let j = 0; j < collection.length; j++){
			// Create album cover collection elements
			var cover_wrapper = document.createElement("div");
			var cover = document.createElement("img");
			var title = document.createElement("span");

			// Add context
			cover.src = collection[j].cover_img;
			title.textContent = collection[j].title;

			cover.addEventListener("click", function(){
				display_album_info(collection[j]);
			});

			// Add classes & attribute
			cover_wrapper.classList.add("collection_cover");
			cover_wrapper.setAttribute("album_id", album_id++);

			// Add to DOM
			cover_wrapper.appendChild(cover);
			cover_wrapper.appendChild(title);
			collection_wrapper.appendChild(cover_wrapper);
		}
	}
}

function display_album_info(album){

	const album_wrapper = document.createElement("div");
	const album_info = document.createElement("div");
	const album_cover = document.createElement("div");
	const cover_art = document.createElement("img");
	const title = document.createElement("span");
	const catalog = document.createElement("span");
	const release_date = document.createElement("span");
	const codec = document.createElement("span");
	const ripper = document.createElement("span");

	// Add context
	cover_art.src = album.cover_img;
	title.textContent = album.title;
	catalog.textContent = "Catalog Number: " + album.catalog;
	if(album.release_date) release_date.textContent = "Release Date: " + album.release_date;
	if(album.codec) codec.textContent = "Codec: " + album.codec;
	if(album.ripper) ripper.textContent = "Ripper: " + album.textContent;

	// Add classes
	album_wrapper.classList.add("album_wrapper");
	album_wrapper.classList.add("hide_album_info");
	album_info.classList.add("album_info");
	album_cover.classList.add("album_cover");
	title.classList.add("title");

	// Append to document
	album_cover.appendChild(cover_art);
	album_cover.appendChild(title);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(catalog);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(release_date);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(codec);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(ripper);

	album_info.appendChild(album_cover);
	

	// Add tracklist
	const track_info = document.createElement("div");
	const track_list = document.createElement("ol");

	track_info.classList.add("track_info");

	for(let i = 0; i < album.tracklist.length; i++){
		var track = document.createElement("li");
		var track_title = document.createElement("span");
		var track_duration = document.createElement("span");
		var track_artist = document.createElement("span");

		track_title.textContent = album.tracklist[i].track_title;
		track_duration.textContent = album.tracklist[i].duration;
		track_artist.textContent = album.tracklist[i].artist;

		track_title.classList.add("track_list")
		track_artist.classList.add("artist");

		track.appendChild(track_title);
		track.appendChild(track_duration);
		track.appendChild(document.createElement("br"));
		track.appendChild(track_artist);
		track_list.appendChild(track);
	}

	track_info.appendChild(track_list);
	album_wrapper.appendChild(album_info);
	album_wrapper.appendChild(track_info)

	wrapper.appendChild(album_wrapper);
	setTimeout(function(){
		album_wrapper.classList.remove("hide_album_info");
	}, 20);
}
