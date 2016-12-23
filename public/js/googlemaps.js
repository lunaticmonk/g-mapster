var ref = firebase.database().ref('/');

// This is for placing all the markers after retrieving them from firebase
function initMap() {
  console.log('initMap called');
  if(navigator.geolocation){
    console.log('geolocation obtained');
    navigator.geolocation.getCurrentPosition(function(position){
      var mylocation = { lat: position.coords.latitude-5, lng: position.coords.longitude-5 };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: mylocation
      });
      ref.orderByChild('latitude').on('child_added', function(snapshot){
        // console.log(snapshot.val().latitude);
        // console.log(snapshot.val().longitude);
        var location = { lat : snapshot.val().latitude, lng : snapshot.val().longitude };
        placeMarker(location, map);
      });
    });
  }
}

function placeMarker(position, map){
  var marker = new google.maps.Marker({
    position : position,
    map : map
  });
}