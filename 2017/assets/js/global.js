/*
Theme by: WebThemez.com
Note: Please use our back link in your site
*/
$( function() {
        var endDate = "October  07, 2017 08:30:00";

        $('.countdown.simple').countdown({ date: endDate });

        $('.countdown.styled').countdown({
          date: endDate,
          render: function(data) {
            $(this.el).html("<div>" + this.leadingZeros(data.days, 3) +  "&#32;&#32;:" +" <span>Dias</span></div><div>" + this.leadingZeros(data.hours, 2) +  "&#32;&#32;:" +" <span>Hrs</span></div><div>" + this.leadingZeros(data.min, 2) +  "&#32;&#32;:" + " <span>Min</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>Seg</span></div>");
          }
        });

        $('.countdown.callback').countdown({
          date: +(new Date) + 10000,
          render: function(data) {
            $(this.el).text(this.leadingZeros(data.sec, 2) + " sec");
          },
          onEnd: function() {
            $(this.el).addClass('ended');
          }
        }).on("click", function() {
          $(this).removeClass('ended').data('countdown').update(+(new Date) + 10000).start();
        });
		
		
		
      });
   
