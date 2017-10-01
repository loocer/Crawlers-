var cheerio = require('cheerio')
var https = require('https')
var iconv = require('iconv-lite')
var EventProxy = require('eventproxy')
// var ep = EventProxy.create("template1", "template2", "template3", function (template, data, l10n) {
//   console.log(template, data, l10n)
// });
var mkdirs = module.exports.mkdirs = function(dirpath, mode, callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
                callback(dirpath);
        } else {
                mkdirs(path.dirname(dirpath), mode, function(){
                        fs.mkdir(dirpath, mode, callback);
                });
        }
    });
};
function writeToFile(fileName,text){
  console.log(fileName)
  var fs = require('fs');
  fs.open(fileName,"w",0644,function(e,fd){
      if(e) return;
      fs.write(fd,text,0,'utf8',function(e){
          if(e) throw e;
          fs.closeSync(fd);
      })
  });
}
function queryAll(base,urls){
  for(let i in urls){
    var url = base + urls[i]
    let directory = urls[i].split("/")
    var fileName = directory[directory-1]
    https.get(url, function(sres) {
      var chunks = []
      sres.on('data', function(chunk) {
        chunks.push(chunk)
      })
      sres.on('end', function() {
        var titles = []
        var html = iconv.decode(Buffer.concat(chunks), 'utf-8')
        mkdirs()
        writeToFile('./dir/'+fileName,html)
        var $ = cheerio.load(html, {decodeEntities: false})
        ep.emit("got_file", i);
      })
    })
  }
}
function openFile (url) {
  var labelA = null
  var urls=[]
  return new Promise((resolve, reject) =>{
    https.get(url, function(sres) {
      var chunks = []
      sres.on('data', function(chunk) {
        chunks.push(chunk)
      })
      sres.on('end', function() {
        var titles = []
        var html = iconv.decode(Buffer.concat(chunks), 'utf-8')
        var $ = cheerio.load(html, {decodeEntities: false})
        writeToFile($("title").text(),html)
        $("a").each(function(){
          urls.push($(this).attr("href"))
        })
        resolve(urls)
      })
    })
  }) 
}
var url = 'https://threejs.org/docs/'
openFile(url).then(value=>{
  console.log(value)
  queryAll(url,value)
  ep.after('got_file', value.length, function (list) {
  console.log(list)
})
})
var ep = new EventProxy();
// var urls = [
// // 'http://www.baidu.com',
//             'https://github.com/JacksonTian/eventproxy/blob/master/README_en.md',
//             'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects',
//             // 'http://dynamic.12306.cn/otn/board/boardMore',
//             'https://zhuanlan.zhihu.com/notesonvirology'
//             ]


 