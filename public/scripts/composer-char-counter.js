$(document).ready(function() {
  //fetch our count number
  let maxCharater = Number($('.counter').text());
  //for textarea input event
  $('#tweet-text').on('input',function() {
    let textcontent = $(this).val();
    if(textcontent.length > maxCharater) {
      $('.counter').css({color:'red'})
      $('.counter').text(maxCharater - this.value.length);
    } else {
      $('.counter').css({color:'black'})
      $('.counter').text(maxCharater - this.value.length);
    }    
  })
});