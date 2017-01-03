var config = {
        apiKey: "AIzaSyDqcidTNKiWrY_n2rl-J8xpoLBetUY0IiM",
        authDomain: "g-mapster-1482049698790.firebaseapp.com",
        databaseURL: "https://g-mapster-1482049698790.firebaseio.com",
        storageBucket: "g-mapster-1482049698790.appspot.com",
        messagingSenderId: "392450380738"
};

firebase.initializeApp(config);

  //   //Get the upload button
  //   const filebutton = document.querySelector('#pushbtn');
  //   filebutton.addEventListener('change', function(e){
  //     //Get the file
  //     console.log('button clicked for file upload');
  //       var file = e.target.files[0];
  //     //Create storage refernce for it
  //       var storageRef = firebase.storage().ref('g-mapster/' + file.name );
  //     //Upload
  //       var task = storageRef.put(file);
  //       task.on('state_changed',
  //         function progress(s){
  //           var upload = s.bytesTransferred/s.totalBytes;
  //           console.log(upload);
  //           if(upload == 1){
  //             var downloadURL = task.h.downloadURLs[0];
  //             console.log(downloadURL);
  //             saveGarbagePlace(downloadURL);
  //           }
  //         }
  //       );
  //   });

  //   // Save the coordinates

  //   function saveGarbagePlace(imageURL){
  //     if(navigator.geolocation){
  //       navigator.geolocation.getCurrentPosition(function(position){
  //         console.log(position);
  //         firebase.database().ref('/').push({
  //           latitude : position.coords.latitude,
  //           longitude : position.coords.longitude,
  //           imageURL : imageURL,
  //           address : storeAddress(position)
  //         });
  //         console.log('inserted');
  //         markTheMap(position);
  //       });
  //     }
  //     else
  //       alert('Your device doesnt support geolocation');
  //   }

  //   // Mark the map

  //   function markTheMap(position){
  //     console.log('markTheMap map');
  //     var map = new google.maps.Map(document.getElementById('map'), {
  //             zoom: 4,
  //             center: { lat : position.coords.latitude-2, lng : position.coords.longitude-2 }
  //         });
  //         var ref = firebase.database().ref('/');
  //         ref.orderByChild('latitude').on('child_added', function(snapshot){
  //           // console.log(snapshot.val().latitude);
  //           // console.log(snapshot.val().longitude);
  //           var location = { lat : snapshot.val().latitude, lng : snapshot.val().longitude };
  //           placeMarker(location, map);
  //         });
  //   }

  //   function placeMarker(location, map){
  //     var marker = new google.maps.Marker({
  //           position: location,
  //           map: map,
  //           icon : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //           title : getMyLocation(location)
  //         });
  //   }

  //   function initMap(){
  //     if(navigator.geolocation){
  //       navigator.geolocation.getCurrentPosition(function(position){
  //         var yourlocation = document.querySelector('#yourlocation');
  //         yourlocation.innerHTML = position.coords.latitude + '<br>' + position.coords.longitude;
  //       var map = new google.maps.Map(document.getElementById('map'), {
  //               zoom: 4,
  //               center: { lat : position.coords.latitude-5, lng : position.coords.longitude-5 }
  //           });
  //           var ref = firebase.database().ref('/');
  //           var list = document.querySelector('#list ul');
  //           ref.orderByChild('latitude').on('child_added', function(snapshot){
  //             // console.log(snapshot.val().latitude);
  //             // console.log(snapshot.val().longitude);
  //             // console.log(snapshot.val());
  //             var li = document.createElement('li');
  //             li.innerHTML = '<li class = "card-panel">' + '<h6>Latitude : ' + snapshot.val().latitude + '<br>'
  //             + 'Longitude : ' + snapshot.val().longitude + '<br>' + '<br>'
  //             +'<a href ='  + snapshot.val().imageURL + ' target = "blank">' + 'See the image' + '</a>' + '</h6>'
  //             + getMyLocation({ lat : snapshot.val().latitude, lng : snapshot.val().longitude }) + '</li>';

  //             list.appendChild(li);
  //             var location = { lat : snapshot.val().latitude, lng : snapshot.val().longitude };
  //             placeMarker(location, map);
  //       });
  //       new AutocompleteDirectionsHandler(map);
  //     });
  //   }
  // }

// New functions

var map;
function initMap(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      map = new google.maps.Map(document.getElementById('map'), {
        zoom : 16
      });
      var centermarker = new google.maps.Marker({
        position : { lat : position.coords.latitude, lng : position.coords.longitude },
        title : 'You are here!',
        map : map,
      });
      map.setCenter({ lat : position.coords.latitude, lng : position.coords.longitude });
    });
    retrieveAndPlace();
  }
  else
    alert('Your device does not support geolocation');
}

// firebase.initializeApp(config);

var ref = firebase.database().ref('/');
function retrieveAndPlace(){
  ref.orderByChild('latitude').on('child_added', function(snapshot){
    // console.log(snapshot.val());
    placeMarker(snapshot.val());
  });
}

function placeMarker(object){
  var marker = new google.maps.Marker({
    position : { lat : object.latitude, lng : object.longitude },
    map : map,
    title : String(object.landmark)
  });
  marker.addListener('click', function(){
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
      marker.setAnimation(null);
    }, 1500);
  });

  var infowindow = new google.maps.InfoWindow({
    content : object.landmark + '\n' + '<a href = ' + object.imageURL + ' target = "blank" >' + 'See the image' +  '</a>'
  });
  marker.addListener('click', function(){
    infowindow.open(map, marker);
  });
}