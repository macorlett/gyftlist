console.log('Node server is running');

var http=require('http');
var qstring=require('querystring');
var nano=require('nano')('http://localhost:5984'),
    db=nano.use('gyftlist');

// Process POST requests
function processPost(req,res,callback){

  var jdata='';
  if(typeof callback!=='function'){
    return null;
  }

  if(req.method=='POST'){
    req.on('data',function(data){
      jdata+=data;
      if(jdata.length>1e6){
        jdata='';
        res.writeHead(413,{'Content-Type':'text/plain'}).end();
        req.connection.destroy();
      }
    });

    req.on('end',function(){
      req.post=jdata;
      callback();
    });
  }else{
    res.writeHead(405,{'Content-Type':'text/plain'});
    res.end();
  }
}


var server=http.createServer(function(req,res){
  if(req.method=='POST'){
    processPost(req,res,function(){
      console.log(req.post);
      //use req.post here

      res.writeHead(200,'OK',{'Content-Type':'text/plain'});
      res.end();
    });
  }else{
    res.writeHead(200,'OK',{'Content-Type':'text/plain'});
    res.end();
  }
});

server.listen('8000');