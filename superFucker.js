var engineObject = {
}
engineObject.openFile = function (fileName,url) {
  var labelA = null
  var urls=[]
  http.get(url, function(sres) {
    var chunks = []
    sres.on('data', function(chunk) {
      chunks.push(chunk)
    })
    sres.on('end', function() {
      var titles = []
      var html = iconv.decode(Buffer.concat(chunks), 'utf-8')
      var $ = cheerio.load(html, {decodeEntities: false})
      this.saveFile(html)
    })
  })
}
engineObject.saveFile = function (text) {
  console.log(text)
  var fs = require('fs');
  fs.open(fileName,"w",0644,function(e,fd){
      if(e) throw e;
      fs.write(fd,text,0,'utf8',function(e){
          if(e) throw e;
          fs.closeSync(fd);
      })
  });
}
engineObject.prototype.getLabels = function () {
  if()
}
engineObject.prototype.queryDirectory= function () {
  
}
engineObject.prototype.createDirectory = function () {
  
}