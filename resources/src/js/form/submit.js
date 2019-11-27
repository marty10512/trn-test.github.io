(function(){

  $('.form').on('keyup',function(e){
    let review = $('#review').val();
    let name = $('#name').val();
    let email = $('#email').val();
    let submit = $('#submit');
    let submitItem = $('.submit-btn-item');

    if(review.length != 0 && name.length != 0 && email.length != 0) {
      submit.removeAttr('disabled');
      submitItem.removeClass('disabled');
    } else {
      submit.attr('disabled', 'disabled');
      submitItem.addClass('disabled');
    }
  })
})();