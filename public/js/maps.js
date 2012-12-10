var apiLocation = '/getData'
  , markers = []

var initialize = function() {
  var origin = new google.maps.LatLng(51.69356215411849, -0.43700695037841797)
  var mapOptions =
    { zoom: 10
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
    map.panTo(origin)
  }, 1000)

  $.getJSON(apiLocation, function(data) {
    var jams = data.jams
      , alerts = data.alerts

    $.each(jams, function(index, jam) {
      var location = new google.maps.LatLng(jam.line[0].y, jam.line[0].x)
      var marker = new google.maps.Marker(
        { position: location
        , map: map
      })
    })

    $.each(alerts, function(index, alert) {
      var location = new google.maps.LatLng(alert.location.y, alert.location.x)
      var marker = new google.maps.Marker(
        { position: location
        , map: map
      })
    })
  })
}

google.maps.event.addDomListener(window, 'load', initialize)