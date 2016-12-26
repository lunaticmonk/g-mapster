var accuratebtn = document.querySelector('#accuratebtn');

accuratebtn.addEventListener('click', function(){
  getMyLocation();
});

function getMyLocation(location){
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
      // console.log(location);
      var latlng = new google.maps.LatLng( location.lat, location.lng );
      var geocoder = new google.maps.Geocoder();
      formatted_address = geocoder.geocode({ location : latlng }, function(results, status){
        console.log(results[0]['formatted_address']);
        return results[0]['formatted_address'];
      });
    });
  }
}

function displayResults(results, status){
  console.log(results[0]['formatted_address']);
  return results[0]['formatted_address']
}

function geolocation(){
console.log('geolocation called');
var loc = {};
var geocoder = new google.maps.Geocoder();
if(google.loader.ClientLocation){
  loc.lat = google.loader.ClientLocation.latitude;
  loc.lng = google.loader.ClientLocation.longitude;
}
var latlng = new google.maps.LatLng(loc.lat, loc.lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
          if(status == google.maps.GeocoderStatus.OK) {
              // alert(results[0]['formatted_a0ddress']);
              console.log(results[0]['formatted_address']);
          };
      });
}
