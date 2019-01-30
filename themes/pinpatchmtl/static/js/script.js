jQuery(function($) {
  $(document).ready(function() {
    $(document).scroll(function() {
      var scrollPosition = $(this).scrollTop()
      var value = scrollPosition / 5 + 5
      $(".header")
        .find(".small-things")
        .animate(
          {
            top: "-" + value
          },
          1
        )
    })

    // instafeed
    if ($("#instafeed").length) {
      var feed = new Instafeed({
        get: "user",
        target: "instafeed",
        userId: "5794830080",
        limit: "9",
        accessToken: "5794830080.1677ed0.e4f7b9eefb4e405b9c19d7ffaa322f60",
        resolution: "standard_resolution",
        template: '<a class="insta-post" target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
      })

      feed.run()
    }

    // send apply email

    $("#apply-form").submit(function(event) {
      event.preventDefault()
      var shop_name = $("#apply-shop-name").val()
      var shop_link = $("#apply-shop-name").val()
      var contact_name = $("#apply-contact-name").val()
      var contact_email = $("#apply-contact-email").val()
      var hometown = $("#apply-hometown").val()
      var notes = $("#apply-notes").val()

      console.log("apply form sent")
    })

    // mobile menu

    $('.menu-button').click(function() {
      $('.menu-content').toggleClass('visible');
      $('.menu-content').toggleClass('hidden');
    });

    $('.menu-content').find('.close').click(function() {
      $('.menu-content').toggleClass('visible');
      $('.menu-content').toggleClass('hidden');
    });

    $('.menu-content').find('a').click(function() {
      $('.menu-content').toggleClass('visible');
      $('.menu-content').toggleClass('hidden');
    });

    // set active language
    var url = window.location
    if(url.pathname.includes('fr')) {
      $(".lang-selector").find("a").removeClass('active');
      $(".lang-selector").find("a[data-lang=fr]").addClass("active")
    } else {
      $(".lang-selector").find("a[data-lang=en]").addClass("active")
    }

    // toggle url language
    $(".lang-selector")
      .find("a")
      .click(function(event) {
        event.preventDefault();
        var url = window.location;
        var lang = $(this).data("lang");
        var current_lang = url.pathname.includes('fr') ? "fr" : "en";
        console.log(url)
        console.log(lang)
        if (lang == "fr" && current_lang !== "fr") {
          var new_url = url.origin + "/fr" + url.pathname;
          document.location.href = new_url;
        } else if(lang == "en" && current_lang !== "en") {
          var new_url = url.origin + url.pathname.substring(3);
          document.location.href = new_url;
        }
    })

/*
    var i18n = window.domI18n({
      selector: "[data-translatable]",
      separator: " // ",
      languages: ["en", "fr"],
      defaultLanguage: "en",
      translatableAttr: "value"
    })



    var userLang = null
    if (navigator.language) {
      if (navigator.language.indexOf("en") !== -1) {
        userLang = "en"
        $("#en-link").addClass("active")
        $("#fr-link").removeClass("active")
      } else if (navigator.language.indexOf("fr") !== -1) {
        userLang = "fr"
        $("#fr-link").addClass("active")
        $("#en-link").removeClass("active")
      }
    } else if (navigator.userLanguage) {
      if (navigator.userLanguage.indexOf("en") !== -1) {
        userLang = "en"
        $("#en-link").addClass("active")
        $("#fr-link").removeClass("active")
      } else if (navigator.userLanguage.indexOf("fr") !== -1) {
        userLang = "fr"
        $("#fr-link").addClass("active")
        $("#en-link").removeClass("active")
      }
    } else {
      userLang = "en"
      $("#en-link").addClass("active")
      $("#fr-link").removeClass("active")
    }

    if (userLang) {
      i18n.changeLanguage(userLang)
    }*/


    // draggable thingy

    $("#applications-open").draggable();
    $("#pin-popup").draggable();


    var artists = $('.artist-container');

    artists.isotope({
      // options
      itemSelector: ".artist",
      layoutMode: "fitRows",
      transitionDuration: "0"
    })

    $(".filter-button").click(function(e) {
      e.preventDefault()
      var filter_value = String($(this).data("filter"));
      console.log(filter_value);
      artists.isotope({ filter: filter_value });
      $(".filter-button").removeClass("active")
      $(this).addClass("active")

    })
  })
})
