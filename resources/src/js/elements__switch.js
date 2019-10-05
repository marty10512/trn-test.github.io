(function(){
  $('.elements-content__switch').on('click', function(e){
    e.preventDefault();
    $('.elements-content__switch-btn--left').toggleClass('btn--opposite')
    $('.elements-content__switch-btn--right').toggleClass('btn--opposite')
  })
})();