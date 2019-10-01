(function(){
  let list = document.querySelectorAll('.header__menu-item');
  let i;
  let v;

  for (i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function (e) {
      for (v = 0; v < list.length; v++) {
        if (list[v] !== this ) {
          list[v].classList.remove('active');
        } else {
          this.classList.toggle('active');
        }
      }
    });
  }

  $('body').on('click', '.wrapper',function() {
    $('.header__menu').find('li').removeClass('active');
  })
})();