var http = require('http')
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Google Traffic' });
};

exports.getData = function(req, res) {
  http.get('http://world.waze.com/rtserver/web/GeoRSS?format=JSON&types=traffic%2Calerts&mj=10&ma=10&jmds=120&jmu=1&left=-0.7548363198001116&right=-0.11917758095672432&bottom=51.375732784696794&top=52.01139152354018&bo=true&callback=?', function(res2) {
    res2.pipe(res)
  }).on('error', function(e) {
    res.statusCode(500)
    res.send('Got error: ' + e.message);
  });
}