(function(){
  let list = $('.terms__list-item');
  let i;
  let v;

  for (i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function (e) {
      for (v = 0; v < list.length; v++) {
        if (list[v] !== this ) {
          list[v].classList.remove('terms__list-item--active');
        } else {
          this.classList.add('terms__list-item--active');
        } 
      }
    });
  }
  
  $('.terms__list-item').on('click','.emerge__close', function(){
    $('.terms__list').find('li').removeClass('terms__list-item--active');
  })
})();