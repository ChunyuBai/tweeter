$(document).ready(function() {
  let maxCharater = Number($('.counter').text());
  $('#tweet-text').on('input',function() {
    let textcontent = $(this).val();
    console.log(textcontent);
    if(textcontent.length > maxCharater) {
      $('.counter').css({color:'red'})
      $('.counter').text(maxCharater - this.value.length);
    } else {
      $('.counter').css({color:'black'})
      $('.counter').text(maxCharater - this.value.length);
    }    
  })
});