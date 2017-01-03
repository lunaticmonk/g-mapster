function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'WALKING';
  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  var modeSelector = document.getElementById('mode-selector');
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);

  var originAutocomplete = new google.maps.places.Autocomplete(
      originInput, {placeIdOnly: true});
  console.log(originAutocomplete);
  var destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput, {placeIdOnly: true});

  this.setupClickListener('changemode-walking', 'WALKING');
  this.setupClickListener('changemode-transit', 'TRANSIT');
  this.setupClickListener('changemode-driving', 'DRIVING');

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  console.log(originInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener('click', function() {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
  // if(mode != 'DEST'){
    var place = autocomplete.getPlace();
    // -----------------------------------------------------------------------------------
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
         var request = {
          location: map.getCenter(),
          radius: '100'
        };
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode({ location : latlng }, function(results, status){
          if(status == 'OK'){
          request.query = results[0]['formatted_address'];
          console.log(request);
          var service = new google.maps.places.PlacesService(map);
          service.textSearch(request, callback);
          }
        });
        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            me.originPlaceId = results[0]['place_id'];
            console.log(me.originPlaceId);
          }
        }
      });
    }
        me.route();
    // }
  // else{ 
    if( mode == 'DEST'){
    var place = autocomplete.getPlace();
    me.destinationPlaceId = place.place_id;
    me.route();
  }
  // }

    // --------------------------------------------------------------------------------------------
  });
};

AutocompleteDirectionsHandler.prototype.route = function() {
  console.log('route function called');
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route({
    origin: {'placeId': this.originPlaceId},
    destination: {'placeId': this.destinationPlaceId},
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      console.log(response);
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};