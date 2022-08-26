jQuery(document).ready(function($) {
  $(window).on('load', function () {
    const $preloader = $('.preloader'),
        $loader = $preloader.find('.preloader__loader');
    $loader.fadeOut();
    // $preloader.delay(250).fadeOut(200);
    $preloader.css('display', 'none')
  });
});