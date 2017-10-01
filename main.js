var cheerio = require('cheerio')
var http = require('http')
var iconv = require('iconv-lite')
var EventProxy = require('eventproxy')
var fs = require("fs")  
var path = require("path")
function getMainPage(){
  var labelA = null
  var url = 'http://www.12306.cn/mormhweb/kyyyz/'
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
      console.log(html)
      labelA = $("a")
      OftenAlabel(labelA,$)
      writeToFile($("title").text()+'.html',html)
    })
  })
}
function OftenAlabel(a,$){
    a.each(function(){
      let url = $(this).attr("href")
      let directoryData = url.split('/')
      console.log(directoryData)
      console.log($(this).attr("href"))
    })
}
function queryDirectory(directory){ 
  var root = path.join(directory)  
  readDirSync(root)  
  function readDirSync(path){  
      var pa = fs.readdirSync(path);  
      pa.forEach(function(ele,index){  
          var info = fs.statSync(path+"/"+ele)      
          if(info.isDirectory()){  
              console.log("dir: "+ele)  
              readDirSync(path+"/"+ele);  
          }else{  
              console.log("file: "+ele)  
          }     
      })  
  }   
}
function isDirctory(directory){
  fs.exists(directory, function(exists) {  
    console.log(exists ? "创建成功" : "创建失败");  
  }); 
  // var root = path.join(directory)  
  // readDirSync(root)  
  // function readDirSync(path){  
  //   try{
  //     var pa = fs.readdirSync(path);  
  //     console.log(pa)
  //     // console.log('有这个目录！')
  //     return true  
  //     // pa.forEach(function(ele,index){  
  //     //     var info = fs.statSync(path+"/"+ele)      
  //     //     if(info.isDirectory()){  
  //     //         console.log("dir: "+ele)  
  //     //         // readDirSync(path+"/"+ele);  
  //     //     }else{  
  //     //         console.log("file: "+ele)  
  //     //     }  
  //     //     console.log('有这个目录！')  
  //     //     return true 
  //     // })  
  //   }catch(e){    
  //     // console.log('没有这个目录！')
  //     return false
  //   }   
  // }
}
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
function readFile(fileName){
  var rf=require("fs");  
  var data=rf.readFileSync(fileName,"utf-8");  
  console.log(data);  
  console.log("-----------------READ FILE SYNC END------------------------"); 
  return data
}
function writeToFile(fileName,text){
  var fs = require('fs');
  fs.open(fileName,"w",0644,function(e,fd){
      if(e) throw e;
      fs.write(fd,text,0,'utf8',function(e){
          if(e) throw e;
          fs.closeSync(fd);
      })
  });
}
// getMainPage()
// queryDirectory("c:/project/nodejs/route2/3434")
// isDirctory("c:/project/nodejs/route2/3434")
var p = new Promise((resolve, reject) => {
  fs.exists("c:/project/nodejs/route2", function(exists) {  
    resolve(exists);  
  }); 
})
p.then(value=>{
  console.log(value)
})

// console.log(isDirctory("c:/project/nodejs/route2/"))
// mkdirs("./a/b/c/d/e/f")
