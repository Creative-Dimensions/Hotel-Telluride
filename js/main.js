(function($){
  $(function(){
    var $dropdown, hideTimeout;

    $("nav").on("mouseover", "a", function(e){
      if(($dropdown = $(this).next()).is('.nav-dropdown')){
        $(".nav-dropdown").hide();
        $dropdown.show();
      }else{
        $dropdown = $(this).closest(".nav-dropdown");
      }

      clearTimeout(hideTimeout);
      if($dropdown.length < 1){
        $(".nav-dropdown").hide();
      }
    });

    $("nav").on("mouseout", "a", function(e){
      hideTimeout = setTimeout(function(){
        $(".nav-dropdown").hide();
      }, 200);
    });
	// Set up PhotoSwipe with all anchor tags in the Gallery container
    if(window.Code && window.Code.PhotoSwipe){
      var myPhotoSwipe = $("#Gallery a").photoSwipe();
    }

    if($.simpleWeather){
      $.simpleWeather({
        location: 'Telluride, CO',
        success: function(weather){
          html = '<h2><i class="icon-weather-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
          html += '<div class="weather-type">'+weather.currently+'</div>';
          $("#weather").html(html);

        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });
    }

    $("[data-hide-div]").on("click", function(e){
      e.preventDefault();
      $($(this).data('hide-div')).hide();
    });


    // jQuery datepicker
    if($.datepicker){
      $( ".js-datepicker-start" ).datepicker({
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
          $( ".js-datepicker-end" ).datepicker( "option", "minDate", selectedDate );
        }
      });
      $( ".js-datepicker-end" ).datepicker({
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
          $( ".js-datepicker-end" ).datepicker( "option", "maxDate", selectedDate );
        }
      });
    }
  });
})(jQuery);
