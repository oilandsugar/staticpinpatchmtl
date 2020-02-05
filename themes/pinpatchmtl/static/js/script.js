jQuery(function($) {
  $(document).ready(function() {
    $(document).scroll(function() {
      var scrollPosition = $(this).scrollTop();
      var value = scrollPosition / 5 + 5;
      $(".header")
        .find(".small-things")
        .animate(
          {
            top: "-" + value
          },
          1
        );
    });

    // instafeed
    if ($("#instafeed").length) {
      var feed = new Instafeed({
        get: "user",
        target: "instafeed",
        userId: "5794830080",
        limit: "8",
        accessToken: "5794830080.1677ed0.e4f7b9eefb4e405b9c19d7ffaa322f60",
        resolution: "standard_resolution",
        template:
          '<a class="insta-post" target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
      });

      feed.run();
    }

    // mobile menu

    $(".menu-button").click(function() {
      $(".menu-content").toggleClass("visible");
      $(".menu-content").toggleClass("hidden");
    });

    $(".menu-content")
      .find(".close")
      .click(function() {
        $(".menu-content").toggleClass("visible");
        $(".menu-content").toggleClass("hidden");
      });

    $(".menu-content")
      .find("a")
      .click(function() {
        $(".menu-content").toggleClass("visible");
        $(".menu-content").toggleClass("hidden");
      });

    // set active language
    var url = window.location;
    if (url.pathname.includes("fr")) {
      $(".lang-selector")
        .find("a")
        .removeClass("active");
      $(".lang-selector")
        .find("a[data-lang=fr]")
        .addClass("active");
    } else {
      $(".lang-selector")
        .find("a[data-lang=en]")
        .addClass("active");
    }

    // toggle url language
    $(".lang-selector")
      .find("a")
      .click(function(event) {
        event.preventDefault();
        var url = window.location;
        var lang = $(this).data("lang");
        var current_lang = url.pathname.includes("fr") ? "fr" : "en";
        console.log(url);
        console.log(lang);
        if (lang == "fr" && current_lang !== "fr") {
          var new_url = url.origin + "/fr" + url.pathname;
          document.location.href = new_url;
        } else if (lang == "en" && current_lang !== "en") {
          var new_url = url.origin + url.pathname.substring(3);
          document.location.href = new_url;
        }
      });

    // when images are loaded

    $(".hover-slider").each(function() {
      let slider = $(this);
      slider
        .find(".img")
        .imagesLoaded({ background: true }, function(instance, image) {
          slider.find(".images-container").removeClass("not-loaded");
        });
    });

    // hover slider on photo based projects

    let sliderWidth = $(".hover-slider").width();

    $(".hover-slider").each(function() {
      let slider = $(this);
      let images = $(this).find(".img");
      let indicator = $(this).find(".indicator");
      let container = $(this).find(".images-container");
      // only initialize if there is more than one image
      if (images.length > 1) {
        // set width of container
        let containerWidth = slider.width() * images.length;
        container.css("width", containerWidth + "px");
        // set width of images inside
        slider.find(".img").css("width", sliderWidth + "px");
        // position images
        slider.find("#image-2").css("left", sliderWidth + "px");
        slider.find("#image-3").css("left", sliderWidth * 2 + "px");
        // add indicator for each image
        $.each(images, function(key, value) {
          if (key == 0) {
            indicator.append('<div class="bar active"></div>');
          } else {
            indicator.append('<div class="bar"></div>');
          }
        });
      }
    });

    $(".hover-slider").mousemove(function(e) {
      let slider = $(this);
      let images = $(this).find(".img");
      let container = slider.find(".images-container");
      if (images.length > 1) {
        let parentOffset = slider.offset();
        var relX = e.pageX - parentOffset.left;
        let portionWidth = sliderWidth / images.length;
        // define positions to move slider
        // move slider to show image 1
        if (relX < portionWidth) {
          container.css("left", 0);
          slider.find(".bar").removeClass("active");
          slider.find(".bar:nth-child(1)").addClass("active");
        }
        // move slider to show image 2
        if (relX >= portionWidth && relX < portionWidth * 2) {
          container.css("left", "-" + sliderWidth + "px");
          slider.find(".bar").removeClass("active");
          slider.find(".bar:nth-child(2)").addClass("active");
        }
        // move slider to show image 3
        if (images.length == 3 && relX >= portionWidth * 2) {
          container.css("left", "-" + sliderWidth * 2 + "px");
          slider.find(".bar").removeClass("active");
          slider.find(".bar:nth-child(3)").addClass("active");
        }
      }
    });

    $(".hover-slider").mouseout(function() {
      let slider = $(this);
      let images = $(this).find(".img");
      let container = slider.find(".images-container");
      if (images.length > 1) {
        container.css("left", 0);
        slider.find(".bar").removeClass("active");
        slider.find(".bar:nth-child(1)").addClass("active");
      }
    });

    // draggable thingy

    $("#applications-open").draggable();
    $("#pin-popup").draggable();

    var artists = $(".artist-container");

    artists.isotope({
      // options
      itemSelector: ".artist",
      layoutMode: "fitRows",
      transitionDuration: "0"
    });

    $(".filter-button").click(function(e) {
      e.preventDefault();
      var filter_value = String($(this).data("filter"));
      console.log(filter_value);
      artists.isotope({ filter: filter_value });
      $(".filter-button").removeClass("active");
      $(this).addClass("active");
    });

    if ($(".artists").length > 0) {
      // filter artists on page load
      let url = window.location;
      let url_pieces = url.search.split("=");
      let year = url_pieces[url_pieces.length - 1];
      let filter_value = ".pp-" + year;
      if (url.search.length > 1) {
        artists.isotope({ filter: filter_value });
        $(".filter-button").removeClass("active");
        $('a[data-filter="' + filter_value + '"]').addClass("active");
      } else {
        artists.isotope({ filter: "*" });
      }

      // filter artists on url change
      $(window).bind("hashchange", function() {
        let url = window.location;
        let url_pieces = url.search.split("=");
        let year = url_pieces[url_pieces.length - 1];
        if (url.search.length > 1) {
          artists.isotope({ filter: filter_value });
          $(".filter-button").removeClass("active");
          $('a[data-filter="' + filter_value + '"]').addClass("active");
        }
      });
    }
  });
});
