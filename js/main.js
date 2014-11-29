//storage functions
function storeLocal(data){
  if(localStorage){
    this.store=JSON.stringify(data);
    this.key='cachedList'+data.author;

    if(storeCheck(this.key)){
      console.log('*** cache is avalible ***');
      if(!storeUpdated(this.key,data.updated)){
        console.log('*** cache is not up to date - replacing ***');
        localStorage.setItem(this.key,this.store);
      }
    }else{
      console.log('*** cache is unavalible - adding ***');
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

  console.log('*** cache time: '+this.data.updated+' | object time: '+time+' ***');

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
function smartItemText(text){
  this.mItem=/([0-9]+)+x/i;
  this.url=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;

  text.replace(this.url,'<a href="$1" target="_blank">$1</a>');
  text.replace(this.mItem,'<div class="item--quantity">$1</div>');

  return text;
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
  return Math.floor(new Date().getTime() / 1000);
}

$(document).ready(function(){
  storeLocal(listObject);
  var key='cachedList@blob';

  var someData={'test':'data test version 0.1'};
  postData(someData);
});