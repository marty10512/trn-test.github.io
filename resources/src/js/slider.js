(function(){
  $('.slider').slick({
    dots: true,
    arrows: true,
    prevArrow: $('.prev-btn'),
    nextArrow: $('.next-btn')
  });
})();

(function(){
  $('.listing__slider').slick({
    arrows: true,
    prevArrow: $('.listing__prev-btn'),
    nextArrow: $('.listing__next-btn')
  });
})();

(function(){
  $('.tabs__slider').slick({
    arrows: false,
    dots: true,
    customPaging : function(slider, i) {
      let thumb = $(slider.$slides[i]).data('thumb');
    return '<div class="tabs__list-item">tab</div>';
  }
  });
})();