(function(){
  let choice = $('.choice');
  let list = $('.choice__list');

  choice.on('click', function(e){
    e.preventDefault();
    list.toggleClass('active');
    console.log($('.choice-form'));
    
  }
  )
})();

/*(function(){
  let list = $('.choice-list');

  $('body').on('click', function(e){
      e.preventDefault();
      if (list.hasClass('active')){
        console.log('lol')
        //list.removeClass('active')
      }
    })
    
  

})();*/