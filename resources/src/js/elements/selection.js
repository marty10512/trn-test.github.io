(function(){
  let btn = $('.selection-btn');

  btn.on('click', function(e){
    e.preventDefault();
    btn.toggleClass('on');
    btn.toggleClass('off');
  })
})();