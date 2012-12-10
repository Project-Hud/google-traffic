var initialize = function() {
  var origin = new google.maps.LatLng(51.69356215411849, -0.43700695037841797)
  var mapOptions =
    { zoom: 11
    , center: origin
    , mapTypeId: google.maps.MapTypeId.ROADMAP
    , disableDefaultUI: true
    }

  var map = new google.maps.Map(document.getElementById('traffic'), mapOptions)

  var trafficLayer = new google.maps.TrafficLayer()
  trafficLayer.setMap(map)

  if (navigator.geolocation) {
    // Get current position
    navigator.geolocation.getCurrentPosition(function (position) {
      // Success!
        origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      }
    )
  }

  setInterval(function() {
    map.panTo(origin);
  }, 1000)

  setInterval(function() {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }, 30000)
}


google.maps.event.addDomListener(window, 'load', initialize);