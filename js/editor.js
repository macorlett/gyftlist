$(document).ready(function(){
  if(storeCheck(key)){
    this.data=JSON.parse(localStorage.getItem(key));
    this.list=this.data.list;
    for (obj in this.list){
      createListItem(this.list[obj].item);
    }
  }
});

$(document).keydown(function(e){
  switch(e.which){
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
    case 38: //up arrow
      if($(".creator--input").is(':focus')){
        console.log("up arrow pushed!")
        return false;
      }
      break;
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
    $(this).val('');
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

function createListItem(text,placeholder){
  $(".creator--input").before('<div class="creator--list--item">'+urlToLink(text)+'</div>');
}