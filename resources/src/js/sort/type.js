(function () {
  let sort = $('.sort-type__item');
  let parent = $('.sort-type');

  sort.on('click', function (e) {
    e.preventDefault();
    parent.toggleClass('active');
  })

  let i;
  let v;
  let item = $('.sort-type__list-item');

  for (i=0;i<item.length; i++) {
    item[i].addEventListener('click', function() {
      for (v=0;v<item.length; v++) {
        if (item[v]===this){
          sort.text($(this).text());
        }
      }
    })
  }

  $(document).on('click', function (e) {
    e.preventDefault();
    if (!$(e.target).hasClass('sort-type__item')) {
      parent.removeClass('active');
    }
  })
})();