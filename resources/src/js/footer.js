(function(){
  let list = $('.list-item');
  let i;
  let v;

  for (i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function (e) {
      e.preventDefault();
      for (v = 0; v < list.length; v++) {
        if (list[v] !== this ) {
          list[v].classList.remove('active');
        } else {
          this.classList.add('active');
        } 
      }
    });
  }
  
  $('.list-item').on('click','.close', function(){
    $('.terms__list').find('li').removeClass('active');
  })
})();