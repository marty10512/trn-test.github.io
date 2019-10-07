(function(){
  $('.switch').on('click', function(e){
    e.preventDefault();
    $('.switch-btn--left').toggleClass('btn--opposite')
    $('.switch-btn--right').toggleClass('btn--opposite')
  })
})();