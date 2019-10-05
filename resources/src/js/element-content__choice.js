(function(){
  let form = $('.elements-content__choice-form');
  let list = $('.elements-content__choice-list');

  form.on('click', function(e){
    e.preventDefault();
    list.toggleClass('active')
    
})
})();

(function(){
  let list = $('.elements-content__choice-list');

  $('body').on('click', function(e){
      e.preventDefault();
      if (list.hasClass('active')){
        list.removeClass('active')
      }
    })
    
  

})();