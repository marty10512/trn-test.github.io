(function(){
  let list = document.querySelectorAll('.header-menu__item');
  let i;
  let v;

  for (i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function () {
      for (v = 0; v < list.length; v++) {
        if (list[v] !== this ) {
          list[v].classList.remove('active');
        } else {
          this.classList.toggle('active');
        }
      }
    });
  }

  $(document).on('click',function(e) {
    e.preventDefault();
    if(!$(e.target).hasClass('header-menu__item-link')){
      $('.header-menu').find('li').removeClass('active');
    }
  })
})();