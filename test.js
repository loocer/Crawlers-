var cheerio = require('cheerio')
var http = require('http')
var iconv = require('iconv-lite')
var EventProxy = require('eventproxy')
var ep = EventProxy.create("template1", "template2", "template3", function (template, data, l10n) {
  console.log(template, data, l10n)
});
var url = 'http://www.baidu.com'
 http.get(url, function(sres) {
    var chunks = []
    sres.on('data', function(chunk) {
      chunks.push(chunk)
    })
    sres.on('end', function() {
      var titles = []
      var html = iconv.decode(Buffer.concat(chunks), 'utf-8')
      var $ = cheerio.load(html, {decodeEntities: false})
      labelA = $("a")
      ep.emit("template1", 1);
    })
  })
 http.get(url, function(sres) {
    var chunks = []
    sres.on('data', function(chunk) {
      chunks.push(chunk)
    })
    sres.on('end', function() {
      var titles = []
      var html = iconv.decode(Buffer.concat(chunks), 'utf-8')
      var $ = cheerio.load(html, {decodeEntities: false})
      ep.emit("template2", 3);
    })
  })

 http.get(url, function(sres) {
    var chunks = []
    sres.on('data', function(chunk) {
      chunks.push(chunk)
    })
    sres.on('end', function() {
      var titles = []
      var html = iconv.decode(Buffer.concat(chunks), 'utf-8')
      var $ = cheerio.load(html, {decodeEntities: false})
      ep.emit("template3", 2);
    })
  })