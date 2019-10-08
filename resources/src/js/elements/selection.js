(function(){
  let label = $('.selection');
  let btn = $('.selection-btn');

  label.on('click', function(e){
    e.preventDefault();
    btn.toggleClass('on');
    btn.toggleClass('off');
  })
})();