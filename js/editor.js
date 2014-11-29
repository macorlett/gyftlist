$(document).ready(function(){
  if(storeCheck(key)){
    this.data=JSON.parse(localStorage.getItem(key));
    this.list=this.data.list;
    this.title=this.data.title;

    if(this.title){
      $(".creator--input").before('<h3 class="creator--list--title">'+this.title+'</h3>');
    }

    for (obj in this.list){
      createListItem(this.list[obj].item);
    }
    $(".creator--input").attr('placeholder','Add another item :)');
  }
});

$(document).keydown(function(e){
  switch(e.which){
    case 8: //backspace pressed
      //console.log('backspace pressed');
      if($(".creator--input").is(':focus') && $(".creator--input").val()==''){
        if($(".creator--input").prev('.creator--list--item')){
          this.text=$(".creator--input").prev('.creator--list--item').text();
          $(".creator--input").prev('.creator--list--item').remove();
          $(".creator--input").val(this.text);
        }
        return false;
      }
      break;
    case 13: //enter pressed
      //console.log('enter pressed');
      if($(".creator--input").is(':focus')){
        if($(".creator--input").val()!==''){
          createListItem($(".creator--input").val());

          // add current list to local storage

          $(".creator--input").val('');
        }
        return false;
      }
      break;
    case 38: //up arrow
      if($(".creator--input").is(':focus')){
        console.log("up arrow pushed!");
        if($(".creator--input").prev('.creator--list--item')){
          if($(".creator--input").val()!==''){
            this.newListItem=$(".creator--input").val();
            createListItem(this.newListItem,'after');
          }
          //move the input up and fill with above item text
          this.text=$(".creator--input").prev('.creator--list--item').text();
          $(".creator--input").prev('.creator--list--item').remove();
          $(".creator--input").val(this.text);
        }
        return false;
      }
      break;
    case 40: //down arrow
      if($(".creator--input").is(':focus')){
        console.log("up down arrow pushed!");
        if($(".creator--input").next('.creator--list--item')){
          if($(".creator--input").val()!==''){
            this.newListItem=$(".creator--input").val();
            createListItem(this.newListItem,'before');
          }
          this.text=$(".creator--input").next('.creator--list--item').text();
          $(".creator--input").next('.creator--list--item').remove();
          $(".creator--input").val(this.text);
        }
        return false;
      }
      break;
  }

  //save if no keys have been pressed for 2 seconds
  if(!window.lastPress){
    window.lastPress=setTimeout(function(){saveLocal();},2000);
    console.log('first init of lastPress!');
  }else{
    window.clearTimeout(lastPress);
    window.lastPress=setTimeout(function(){saveLocal();},2000);
    console.log('reset lastPress!');
  }
});

$(document).on('focusout','.creator--input',function(){
  if($(this).index()>0){
    $(this).attr('placeholder','Add another item :)');
  }else{
    $(this).attr('placeholder','Click here to start a list :)');
  }
  if($(this).val()){
    createListItem($(this).val());
    $(this).parent().append('<textarea class="creator--input" placeholder="Add another item :)"></textarea>');
    $(this).remove();
  }
});

$(document).on('click','.creator--list--item',function(){
  if($(".creator--input").val()!==''){
    this.item=$(".creator--input").val();
    createListItem(this.item);
  }
  $(".creator--input").remove();
  this.text=$(this).text();
  
  $(this).before('<textarea class="creator--input"></textarea>');
  $(this).remove();
  $(".creator--input").focus().val('').val(this.text);
});

function createListItem(text,pos){
  pos = typeof pos !=='undefined' ? pos:'before';
  switch(pos){
    case "before":
      $(".creator--input").before('<div class="creator--list--item">'+urlToLink(text)+'</div>');
      break;
    case "after":
      $(".creator--input").after('<div class="creator--list--item">'+urlToLink(text)+'</div>');
      break;
  }
}

function saveLocal(){
  console.log('saving current list state...');
  this.user='@blob';
  var itemList=[];
  $(".creator--list").children().each(function(){
    switch($(this).attr('class')){
      case 'creator--list--title':
        itemList.push({"title":$(this).text()});
        break;
      case 'creator--list--item':
        itemList.push({"item":$(this).text()});
        break;
      case 'creator--input':
        itemList.push({"item":$(this).val()});
        break;
    }
  });
  console.log(JSON.stringify(itemList));
}