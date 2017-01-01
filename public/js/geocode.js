function getMyLocation(location){
  var address;
  var latlng = new google.maps.LatLng( location.lat, location.lng );
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location : latlng }, callBack);
  
  function callBack(results, status){
    // console.log(results);
    var list = document.querySelector('#list ul li');
    var a = document.createElement('p');
    a.innerText = results[0]['formatted_address'];
    list.append(a);
    address = results[0]['formatted_address'];
  return address;
  }
  return address;
}

function geocodeit(location, marker){
  var latlng = new google.maps.LatLng( location.latitude, location.longitude );
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location : latlng }, callBack);
  function callBack(results, status, marker){
    console.log(results[0]['formatted_address']);
  }
}

function storeAddress(position){
  var latlng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location : latlng }, callBack);

  function callBack(results, status){
    return results[0]['formatted_address'];
  }
}