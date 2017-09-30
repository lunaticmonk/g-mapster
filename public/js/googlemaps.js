var config = {
        apiKey: "AIzaSyDqcidTNKiWrY_n2rl-J8xpoLBetUY0IiM",
        authDomain: "g-mapster-1482049698790.firebaseapp.com",
        databaseURL: "https://g-mapster-1482049698790.firebaseio.com",
        storageBucket: "g-mapster-1482049698790.appspot.com",
        messagingSenderId: "392450380738"
};

firebase.initializeApp(config);

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
        label : 'C',
        map : map
      });
      map.setCenter({ lat : position.coords.latitude, lng : position.coords.longitude });
      // new AutocompleteDirectionsHandler(map);
    }, function(err) {
      console.log(err);
    });
    retrieveAndPlace();
  }
  else
    alert('Your device does not support geolocation');
}

var ref = firebase.database().ref('/');
function retrieveAndPlace(){
  ref.orderByChild('latitude').on('child_added', function(snapshot){
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
    content : object.landmark + '<br>' + '<a href = >' + '<img src = ' + object.imageURL + 'data-action = "zoom" style = "width : 100%; height : auto;">' +  '</a>'
  });
  marker.addListener('click', function(){
    infowindow.open(map, marker);
  });
}
