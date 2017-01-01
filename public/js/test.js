var config = {
		    apiKey: "AIzaSyDqcidTNKiWrY_n2rl-J8xpoLBetUY0IiM",
		    authDomain: "g-mapster-1482049698790.firebaseapp.com",
		    databaseURL: "https://g-mapster-1482049698790.firebaseio.com",
		    storageBucket: "g-mapster-1482049698790.appspot.com",
		    messagingSenderId: "392450380738"
		};

		firebase.initializeApp(config);

		//Get the upload button
		var filebutton = document.querySelector('#uploadbtnvisible');
		filebutton.addEventListener('change', function(e){
			//Get the file
			console.log('button clicked for file upload');
				var file = e.target.files[0];
			//Create storage refernce for it
				var storageRef = firebase.storage().ref('g-mapster/' + file.name );
			//Upload
				var task = storageRef.put(file);
				task.on('state_changed',
					function progress(s){
						var upload = s.bytesTransferred/s.totalBytes;
						console.log(upload);
						if(upload == 1){
							var downloadURL = task.h.downloadURLs[0];
							console.log(downloadURL);
							saveGarbagePlace(downloadURL);
						}
					}
				);
		});

		// Save the coordinates

		function saveGarbagePlace(imageURL){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
					console.log(position);
					firebase.database().ref('/').push({
						latitude : position.coords.latitude,
						longitude : position.coords.longitude,
						imageURL : imageURL,
						address : storeAddress(position)
					});
					console.log('inserted');
					markTheMap(position);
				});
			}
			else
				alert('Your device doesnt support geolocation');
		}

		// Mark the map

		function markTheMap(position){
			console.log('markTheMap map');
			var map = new google.maps.Map(document.getElementById('map'), {
	          	zoom: 4,
	          	center: { lat : position.coords.latitude-2, lng : position.coords.longitude-2 }
        	});
        	var ref = firebase.database().ref('/');
        	ref.orderByChild('latitude').on('child_added', function(snapshot){
		        // console.log(snapshot.val().latitude);
		        // console.log(snapshot.val().longitude);
		        var location = { lat : snapshot.val().latitude, lng : snapshot.val().longitude };
		        placeMarker(location, map);
		      });
		}

		function placeMarker(location, map){
			var marker = new google.maps.Marker({
		        position: location,
		        map: map,
		        icon : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
		        title : getMyLocation(location)
	        });
		}








// var originalbtn = document.querySelector('#originalbtn');		//hidden button(display : none)	(<input type = "file">)	
// 	visiblebtn = document.querySelector('#visiblebtn');			//visible button(visible)	(simple button)
// visiblebtn.addEventListener('click', function(){
// 	originalbtn.click();
// });