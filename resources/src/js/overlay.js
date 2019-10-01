(function(){
  // вызов окна с оверлеем
$(document).on('click', '.contacts__btn', function(e) {
  e.preventDefault();
  $('body').addClass('no-scroll');
  $('body').find('.overlay').css('display','block');
})

// закрытие окна с оверлеем по крестику
$(document).on('click', '.overlay__form-close', function(e){
  e.preventDefault();
  $('body').removeClass('no-scroll');
  $('body').find('.overlay').css('display','none');
})

// закрытие окна с оверлеем по save
$(document).on('click', '.overlay__form-btn', function(e){
  e.preventDefault();
  $('body').removeClass('no-scroll');
  $('body').find('.overlay').css('display','none');
})
})();