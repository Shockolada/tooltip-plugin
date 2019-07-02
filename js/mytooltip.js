(function ($) {

  var settings = {
    pulse: false,
  }

  function createTooltip(hint) {
    var message = hint.attr('title');

    var tooltip = hint.wrap('<div></div>')
      .parent()
      .css({
        "position": "relative"
      })
      .append('<div class="tooltip"><span class="circle"></span> ' + message + ' </div')
      .find('.tooltip')
      .css({
        "position": "absolute",
        "top": "50%",
        "transform": "translateY(-50%)",
        "left": findElemSize(hint).elemWidth + 15 + 'px',
      });

    if (settings.pulse === true) {
      tooltip.parent().find('.circle').addClass('pulse');
    }

    return tooltip;
  }

  function findElemSize(element) {
    var elemW = element.outerWidth(),
        elemH = element.outerHeight();

    return {
      elemWidth: elemW,
      elemHeight: elemH
    };
  }



  $.fn.myTooltip = function (options) {
    settings = $.extend(settings, options);

    return this.each(function () {


      var ths = $(this),
        documentTop = $(document).scrollTop(),
        elemVisible = ths.offset().top - $(window).height();

      // createTooltip(ths);
      // ths.removeAttr('title');

      $(window).scroll(function () {
        var hasTooltip = ths.parent().find('div.tooltip').length !== 0;

        if (documentTop >= elemVisible) {

          if (!hasTooltip) {
            createTooltip(ths);
            ths.removeAttr('title');
          }
        }
      }).on("load", function () {

        $.ready.then(function () {

          if (documentTop >= elemVisible) {
            createTooltip(ths);
            ths.removeAttr('title');
          }
        });
      });


    });
  }
})(jQuery);