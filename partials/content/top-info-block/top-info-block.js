const adCloser = $('.js-adCloser');
const adWrapper = $('.js-adWrapper');
const adContent = $('.js-adContent').html();
$(function(){
  adCloser.on('click', function () {
    adWrapper.detach();
    localStorage.setItem('adClosed', 'true');
    localStorage.setItem('adContent', adContent);
  });
  if (localStorage.getItem('adContent') != adContent){
    localStorage.removeItem('adContent');
    localStorage.removeItem('adClosed');
    adWrapper.removeClass('hidden');
    $('body').prepend(adWrapper);
  };
  if(localStorage.getItem('adClosed') === 'true'){
    adWrapper.detach();
  };
});
