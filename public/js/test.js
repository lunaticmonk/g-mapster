var config = {
		    apiKey: "AIzaSyDqcidTNKiWrY_n2rl-J8xpoLBetUY0IiM",
		    authDomain: "g-mapster-1482049698790.firebaseapp.com",
		    databaseURL: "https://g-mapster-1482049698790.firebaseio.com",
		    storageBucket: "g-mapster-1482049698790.appspot.com",
		    messagingSenderId: "392450380738"
		};

		firebase.initializeApp(config);

		//Get the upload button
		var originalbtn = document.querySelector('#uploadbtn');
		var visiblebtn = document.querySelector('#uploadbtnvisible');
		originalbtn.addEventListener('change', function(e){
			//Get the file
			console.log('button clicked for file upload');
				var file = e.target.files[0];
			//Create storage refernce for it
				var storageRef = firebase.storage().ref('xg-mapster/' + file.name );
			//Upload
				var uploader = document.querySelector('#uploader');
				var task = storageRef.put(file);
				task.on('state_changed',
					function progress(s){
						var upload = s.bytesTransferred/s.totalBytes;
						uploader.value = upload * 100;
						console.log(upload*100);
						if(upload == 1){
							var downloadURL = task.h.downloadURLs[0];
							console.log(downloadURL);
							saveGarbagePlace(downloadURL);
						}
					},

					function error(err){
						console.log(err);
					},
					function complete(){
						alert('upload completed');
					}
				);
			});

		// Save the coordinates

		function saveGarbagePlace(imageURL){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
					// alert(position.coords.latitude);
					var geocoder = new google.maps.Geocoder();
					var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					geocoder.geocode({ location : latlng }, function(results, status){
						firebase.database().ref('/').push({
							latitude : position.coords.latitude,
							longitude : position.coords.longitude,
							imageURL : imageURL,
							landmark : results[0]['formatted_address']
						});
					});
					console.log('inserted');
					// markTheMap(position);
				});
			}
			else
				alert('Your device doesnt support geolocation');
		}