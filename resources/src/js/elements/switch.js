(function(){
  $('.switch').on('click', function(e){
    e.preventDefault();
    $('.switch__btn--left').toggleClass('btn--opposite')
    $('.switch__btn--right').toggleClass('btn--opposite')
  })
})();