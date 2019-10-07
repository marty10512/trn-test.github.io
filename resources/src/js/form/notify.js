(function(){
  $('.form__btns-notify').on('click', function(e){
    e.preventDefault();
    $('.form__btns-notify__link').toggleClass('disable')
  })
})();