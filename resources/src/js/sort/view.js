(function () {
  let listBtn = $('.sort-view__list');
  let tileBtn = $('.sort-view__tile');
  let list = $('.products');

  listBtn.on('click', function(e){
    e.preventDefault();
    tileBtn.removeClass('active');
    listBtn.addClass('active');
    list.removeClass('products--tile');
    list.addClass('products--list');
  })

  tileBtn.on('click', function(e){
    e.preventDefault();
    tileBtn.addClass('active');
    listBtn.removeClass('active');
    list.addClass('products--tile');
    list.removeClass('products--list');
  })
})();