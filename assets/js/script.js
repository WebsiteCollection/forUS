$(document).ready(function() {

    //-----------NAVIGATION------------//
      var $toggleButton = $('.toggle-button'),
          $menuWrap = $('.menu-wrap'),
          $sidebarArrow = $('.sidebar-menu-arrow');

      var navLink = $sidebarArrow.parent();

      // Dropdown button
      $(navLink).click(function() {
          
          $(this).children().next().next().slideToggle(300);
      });

      // Hamburger button

      $toggleButton.on('click', function() {
        $(this).toggleClass('button-open');
        $menuWrap.toggleClass('menu-show');
      });

    //-----------END OF NAVIGATION------------//


    //-----------BACK TO TOP------------//

    // browser window scroll (in pixels) after which the "back to top" link is shown
      var offset = 500,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

      //hide or show the "back to top" link
      $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
      });

      //smooth scroll to top
      $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
          scrollTop: 0 ,
          }, scroll_top_duration
        );
      });

      //-----------END OF BACK TO TOP------------//

      //-----------CASE SCROLL DOWN------------//

      $('.sec-1').click(
          function (e) {
            $('html, body').animate({scrollTop: $('#case-1').position().top}, 600);
            return false;
          }
        );

      $('.sec-2').click(
          function (e) {
            $('html, body').animate({scrollTop: $('#case-2').position().top}, 1200);
            return false;
          }
        );

      $('.sec-3').click(
          function (e) {
            $('html, body').animate({scrollTop: $('#case-3').position().top}, 1200);
            return false;
          }
        );

      //-----------END OF CASE SCROLL DOWN------------//

      //-----------PRESIDENTS------------//

      $('div.presInfo').each(function() {
          var $presInfo = $(this);

          $("img.presPic", $presInfo).click(function(e) {
            e.preventDefault();
            $currentInfo = $("div.info-container", $presInfo);
            $currentInfo.slideDown(900);
            $("div.info-container").not($currentInfo).hide();
            return false;
          });

      });
          
        $('div.close-x').click(function(){
          $("div.info-container").slideUp(900);
        });

      //-----------END OF PRESIDENTS------------//
  });