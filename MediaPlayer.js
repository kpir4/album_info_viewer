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
	var collection = document.getElementById("collection_0");
	var collection_link = document.getElementById("nav_item_0");

	navigation.addEventListener('click', function(e){
		if(e.target.tagName == 'LI'){

			// Remove the highlight of the previously clicked navigation item
			if(collection_link){
				collection_link.removeAttribute("style");
			}
			
			// Add highlight to currently clicked navigation item
			collection_link = e.target;
			collection_link.style.color = "#5eff5e";

			const collection_num = collection_link.getAttribute("id").slice(-1);

			// Removes style and classes from previous collection
			if(collection){
				console.log("sd");
				collection.classList.remove("show");
				var albums = collection.getElementsByClassName("collection_cover");

				// Album cover animation
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

			title.addEventListener("click", function(){
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
	const vgmdb_link = document.createElement("a");
	const release_date = document.createElement("span");
	const codec = document.createElement("span");
	const ripper = document.createElement("span");
	const back = document.createElement("button");

	// Add context
	cover_art.src = album.cover_img;
	title.textContent = album.title;
	if(album.vgmdb_link) {
		catalog.textContent = "Catalog Number: ";
		vgmdb_link.textContent = album.catalog
		vgmdb_link.href = album.vgmdb_link;
	}
	else{
		catalog.textContent = "Catalog Number: " + album.catalog;
	}
	if(album.release_date) release_date.textContent = "Release Date: " + album.release_date;
	if(album.codec) codec.textContent = "Codec: " + album.codec;
	if(album.ripper) ripper.textContent = "Ripper: " + album.textContent;
	back.textContent = "Back".toUpperCase();

	back.addEventListener('click', function(){
		album_wrapper.classList.add("hide_album_info");
		setTimeout(function(){
			album_wrapper.remove();
		}, 700);
	});

	// Add classes
	album_wrapper.classList.add("album_wrapper");
	album_wrapper.classList.add("hide_album_info");
	album_info.classList.add("album_info");
	album_cover.classList.add("album_cover");
	title.classList.add("title");
	back.classList.add("button");

	// Append to document
	album_cover.appendChild(cover_art);
	album_cover.appendChild(title);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(catalog);
	if(album.vgmdb_link) album_cover.appendChild(vgmdb_link);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(release_date);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(codec);
	album_cover.appendChild(document.createElement("br"));
	album_cover.appendChild(ripper);

	album_info.appendChild(album_cover);
	album_info.appendChild(back);
	

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
