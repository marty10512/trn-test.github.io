(function(){
  $('.btns-notify').on('click', function(e){
    e.preventDefault();
    $('.btns-notify__link').toggleClass('disable')
  })
})();