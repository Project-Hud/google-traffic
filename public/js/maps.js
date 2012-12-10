var origin = new google.maps.LatLng(51.69356215411849, -0.43700695037841797)
var mapOptions =
  { zoom: 13
  , center: origin
  , mapTypeId: google.maps.MapTypeId.ROADMAP
  , disableDefaultUI: true
  }

var map = new google.maps.Map(document.getElementById('traffic'), mapOptions)

var trafficLayer = new google.maps.TrafficLayer()
trafficLayer.setMap(map)

setInterval(function() {
  map.panTo(origin);
}, 1000)