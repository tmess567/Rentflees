$('#sign-in-toggle,#create-acc').click(function(e){
  console.log('CCC');
  $('.internal-login').toggleClass('hidden');
  $('.sign-up').toggleClass('hidden');
});

$('.banner').hover(function(e){
  console.log('Hover');
  $(this).children('.overlay').toggleClass('hidden');
});

$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
  checkboxClass: 'icheckbox_minimal-blue',
  radioClass: 'iradio_minimal-blue'
});
