(function () {
  let choice = $('.choice');
  let list = $('.choice__list');

  choice.on('click', function (e) {
    e.preventDefault();
    list.toggleClass('active');
  })

  let i;
  let v;
  let form = $('.choice__form');
  let item = $('.choice-list-item');

  for (i = 0; i < item.length; i++) {
    item[i].addEventListener('click', function (e) {
      for (v = 0; v < item.length; v++) {
        if (item[v] !== this) {
          item[v].classList.remove('active');
        } else {
          this.classList.toggle('active');
          form.text($(this).text());
          form.addClass('chosen');
        }
      }
    })
  }



  $(document).on('click', function (e) {
    e.preventDefault();
    if (!$(e.target).hasClass('choice__form')) {
      list.removeClass('active');
    }
  })

})();


