/*jslint browser: true*/
/*global $, jQuery*/
(function() {
  var documentEl = $(document);
  var parallaxBg = $('header.main-header');
  var windowSize = $(window).width();
  documentEl.on('scroll', function() {
    if (windowSize >= 769) {
      var currScrollPos = documentEl.scrollTop();
      parallaxBg.css('background-position', '50% ' + -currScrollPos / 4 + 'px');
    }
  });
  $('.nav-item a, .nav-brand a, .button, .footer2 a').click(function() {
    event.preventDefault(); // default action of the event will not be triggered, eg will not change links name
    if (windowSize >= 769) {
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 51
      }, 1500, function() {
        $('.nav-item a').removeClass('active');
      });
    }
    else if (windowSize <= 768) {
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 102
      }, 1500, function() {
        $('.nav-item a').removeClass('active');
      });
    }
    return false;
  });
  $('.nav-item a').on('click', function() {
    $('.nav-item a').removeClass();
    $(this).addClass('active');
  });
  $(window).scroll(function() {
    /* Check the location of each desired element */
    $('.hideme').each(function(i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight() - 150;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1'
        }, 250);
      }
    });
  });
  var $overlay = $('<div id="overlay"></div>');
  var $image = $("<img>");
  var $caption = $("<p></p>");
  $overlay.append($image);
  $overlay.append($caption);
  $("body").append($overlay);
  $("#ownersPictures a").click(function(event) {
    event.preventDefault();
    var imageLocation = $(this).attr("href");
    $image.attr("src", imageLocation);
    var captionText = $(this).children("img").attr("alt");
    $caption.text(captionText);
    $overlay.css('opacity', 0).slideDown('slow').animate({
      opacity: 1
    }, {
      queue: false,
      duration: 500
    });
  });
  $overlay.click(function() {
    $(this).fadeOut(300);
  });
  $("#formGeo").focus(function(evt) {
    navigator.geolocation.getCurrentPosition(showPosition);
  });

  function showPosition(position) {
    $("#formGeo").val(position.coords.latitude + ", " + position.coords.longitude);
  }
  if (navigator.geolocation) {
    $("#fetchBtn").show();
  }
  var $form = $('form');
  $form.submit(function() {
    $.post($(this).attr('action'), $(this).serialize(), function(response) {
      $(".form").hide();
      $("#form-submitted").text("Your form has been sucessfuly submitted")
      $("#form-submitted").css("padding", "10px");
    }, 'json');
    return false;
  });
})();
