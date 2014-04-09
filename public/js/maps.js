/* globals google, moment */
var apiLocation = '/getData'
  , markers = []
  , lastCheck = ''

var initialize = function() {
  var origin = new google.maps.LatLng(51.69356215411849, -0.43700695037841797)
  , styles = [
    {
      'featureType': 'landscape.natural',
      'stylers': [
        { 'visibility': 'simplified' }
      ]
    },{
      'featureType': 'road.highway',
      'stylers': [
        { 'visibility': 'simplified' }
      ]
    },{
      'featureType': 'landscape.man_made',
      'elementType': 'geometry.fill',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },{
      'featureType': 'poi',
      'elementType': 'geometry.fill',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },{
      'featureType': 'road.local',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },{
      'featureType': 'road.arterial',
      'stylers': [
        { 'visibility': 'simplified' }
      ]
    },{
      'featureType': 'transit',
      'stylers': [
        { 'color': '#9e9d9d' }
      ]
    },{ 'featureType': 'water' }
     ,{
      'featureType': 'poi',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },{
    }
  ]

  var styledMap = new google.maps.StyledMapType(styles, { name: 'Styled map' })
    , mapOptions =
    { zoom: 12
    , center: origin
    , mapTypeId: google.maps.MapTypeId.ROADMAP
    , disableDefaultUI: true
    }
    , map = new google.maps.Map($('.js-traffic')[0], mapOptions)

  map.mapTypes.set('styled', styledMap)
  map.setMapTypeId('styled')

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
    lastCheck = new moment()
    map.panTo(origin)
  }, 1000)

  setInterval(function() {
    $('.js-last-updated').text(moment(lastCheck).fromNow())
  })

  /*$.getJSON(apiLocation, function(data) {
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
  })*/
}

google.maps.event.addDomListener(window, 'load', initialize)
