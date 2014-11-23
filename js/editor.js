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
  if(e.which==13){
    console.log('enter pressed');
    if($(".creator--input").is(':focus')){
      createListItem($(".creator--input").val());
      $(".creator--input").val('');
    }
    return false;
  }else if(e.which==8){
    console.log('backspace pressed');
    if($(".creator--input").is(':focus') && $(".creator--input").val()==''){
      if($(".creator--input").prev('.creator--list--item')){
        this.text=$(".creator--input").prev('.creator--list--item').text();
        $(".creator--input").prev('.creator--list--item').remove();
        $(".creator--input").val(this.text);
      }
    return false;
    }
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