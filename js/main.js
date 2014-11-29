//storage functions
function storeLocal(data){
  if(localStorage){
    this.store=JSON.stringify(data);
    this.key='cachedList'+data.author;

    if(storeCheck(this.key)){
      if(!storeUpdated(this.key,data.updated)){
        localStorage.setItem(this.key,this.store);
      }
    }else{
      localStorage.setItem(this.key,this.store);
    }
  }else{
    window.location="{{ site.url }}/support.html";
  }
}

function storeCheck(key){
  if(localStorage.getItem(key)===null){
    return false;
  }else{
    return true;
  }
}

function storeUpdated(key,time){
  this.data=JSON.parse(localStorage.getItem(key));
  if(this.data.updated>=time){
    return true;
  }else{
    return false;
  }
}

function getLocal(key){
  if(localStorage){
    if(storeCheck(key)){
      this.data=JSON.parse(localStorage.getItem(key));
      return this.data;
    }else{
      return false;
    }
  }
}

function urlToLink(text){
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
  return text.replace(exp,'<a href="$1" target="_blank">$1</a>');
}

function postData(data){
  $.ajax({
    type:'POST',
    url:'/api',
    contentType:'application/json; charset=utf-8',
    dataType:'json',
    data:data,
    success: function(data){
      console.log(data);
    }
  });
}

function unixTime(){
  return (new Date().getTime() / 1000);
}

$(document).ready(function(){
  storeLocal(listObject);
  var key='cachedList@Blob';

  var someData={'test':'data test version 0.1'};
  postData(someData);
});