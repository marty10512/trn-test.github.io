(function(){

  $('.form').on('keyup',function(e){
    let review = $('#review').val();
    let name = $('#name').val();
    let email = $('#email').val();

    if(review.length != 0 && name.length != 0 && email.length != 0) {
      $('#submit').removeAttr('disabled');
      $('.submit__btn-item').removeClass('disabled');
    } else {
      $('#submit').attr('disabled', 'disabled');
      $('.submit__btn-item').addClass('disabled');
    }
  })
})();