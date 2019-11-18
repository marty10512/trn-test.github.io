(function(){
  let tabs = document.querySelectorAll('.tabs__btns-item');
  let items = document.querySelectorAll('.tabs__slider-items');
  let i;
  let v;
  
  for (i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function () {
      for (v = 0; v < tabs.length; v++) {
        if (tabs[v] !== this ) {
          tabs[v].classList.remove('active');
          items[v].classList.remove('active');
        } else {
          this.classList.toggle('active');
          items[v].classList.add('active');
        }
      };
    });
  }
})();