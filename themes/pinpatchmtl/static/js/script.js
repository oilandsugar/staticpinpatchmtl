jQuery(function ($) {
  $(document).ready(function () {

    $(document).scroll(function() {
      var scrollPosition = $(this).scrollTop();
      var value = scrollPosition / 5 +200;
      $('.header').find('.small-things').animate({
        top: '-' + value
      }, 1);
    });

    // instafeed
    if($('body').hasClass('home')) {

    var feed = new Instafeed({
       get: 'user',
       target: 'instafeed',
       userId: '5794830080',
       limit: "9",
       accessToken: '5794830080.1677ed0.e4f7b9eefb4e405b9c19d7ffaa322f60',
       resolution: 'standard_resolution',
       template: '<a class="insta-post" target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
   });

       feed.run();
   }


    // send apply email

    $('#apply-form').submit(function(event) {
      event.preventDefault();
      var shop_name = $('#apply-shop-name').val();
      var shop_link = $('#apply-shop-name').val();
      var contact_name = $('#apply-contact-name').val();
      var contact_email = $('#apply-contact-email').val();
      var hometown = $('#apply-hometown').val();
      var notes = $('#apply-notes').val();

      console.log('apply form sent');
    });

    var i18n = window.domI18n({
      selector: '[data-translatable]',
      separator: ' // ',
      languages: ['en', 'fr'],
      defaultLanguage: 'en',
      translatableAttr: 'value'
    });

    var userLang = null;

    if (navigator.language) {
      if (navigator.language.indexOf('en') !== -1) {
        userLang = 'en';
        $('#en-link').addClass('active');
        $('#fr-link').removeClass('active');
      } else if (navigator.language.indexOf('fr') !== -1) {
        userLang = 'fr';
        $('#fr-link').addClass('active');
        $('#en-link').removeClass('active');
      }
    } else if (navigator.userLanguage) {
      if (navigator.userLanguage.indexOf('en') !== -1) {
        userLang = 'en';
        $('#en-link').addClass('active');
        $('#fr-link').removeClass('active');
      } else if (navigator.userLanguage.indexOf('fr') !== -1) {
        userLang = 'fr';
        $('#fr-link').addClass('active');
        $('#en-link').removeClass('active');
      }
    } else {
      userLang = 'en';
      $('#en-link').addClass('active');
      $('#fr-link').removeClass('active');
    }

    if (userLang) {
      i18n.changeLanguage(userLang);
    }

    $('.lang-selector').find('a').click(function (event) {
      event.preventDefault();
      var lang = $(this).data('lang');
      if (lang) {
        i18n.changeLanguage(lang);
        $('.lang-selector').find('a').toggleClass('active');
      }
    });

    // draggable thingy

    $( "#applications-open" ).draggable();

  });
});
