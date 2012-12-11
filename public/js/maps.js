var apiLocation = '/getData'
  , markers = []


var initialize = function() {
  var origin = new google.maps.LatLng(51.69356215411849, -0.43700695037841797)
    , pixelLatLng = origin
  var mapOptions =
    { zoom: 11
    , center: origin
    , mapTypeId: google.maps.MapTypeId.ROADMAP
    , disableDefaultUI: true
    , keyboardShortcuts: true
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

  var overlay = new google.maps.OverlayView()
  overlay.draw = function() {}
  overlay.setMap(map)


  DepthJS = {
    onKinectInit: function() {
      console.log('init');
    },
    onRegister: function(x, y, z, data) {
      console.log('reg')
      console.log(x,y,z,data)
    },
    onUnregister: function() {
      console.log('bye')
      map.panTo(origin)
    },
    onSwipeLeft: function() {
    },
    onMove: function(x,y, z) {
      var resX = ( x - 1 ) / ( 100 - 1 ) * ($(document).width())
      var resY = ( y - 1 ) / ( 100 - 1 ) * ($(document).height())
      pixelLatLng = overlay.getProjection().fromDivPixelToLatLng(new google.maps.Point(resX,resY))
      map.panTo(pixelLatLng)
    },
    onSwipeRight: function() {
      console.log('right')
    },
    onSwipeDown: function() {
      console.log('down')
    },
    onSwipeUp: function() {
      console.log('up')
    },
    onPush: function() {
      console.log('push')
    },
    onPull: function() {
      console.log('pull!!!')
    },
    verbose: false
  };

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