function buildMenu() {
  //создаем основной ul
  /*var $ul_menu = $('<ul />', {
    class: 'menu',
  });*/
  // Отправляем запрос на получение menu
  $.ajax({
    url: 'http://localhost:3000/menu',
    dataType: 'json',
    success: function(menu) {
      // Перебираем menu
      menu.forEach(function(item) {
        //console.log(item.submenu);
        var $li_menu = $('<li />');
        var $a_menu = $('<a />', {
          href: item.href,
          text: item.name,
        });
        $li_menu.append($a_menu);
        var $mega = $('<div />', {
          class: 'mega',
        });
        var $triangle = $('<div />', {
          class: 'triangle',
        });
        
        $mega.append($triangle);

        var pp = item;
        pp.submenu.forEach(function(submenu) {
          //console.log(submenu);
          var $h3 = $('<h3 />', {
            text: submenu.subname,
          });
          var $ul_submenu = $('<ul />');
          var $mega_flex = $('<div />', {
            class: 'mega-flex',
          });
          var dd = submenu;
          dd.lincs.forEach(function(linc) {
            var $li_linc = $('<li />');
            var $a_linc = $('<a />', {
              text: linc.lincname,
              href: linc.href_linc,
            });
            $li_linc.append($a_linc);
            $ul_submenu.append($li_linc);
          });

          $mega_flex.append($h3);
          $mega_flex.append($ul_submenu);
          $mega.append($mega_flex);
        });

        $li_menu.append($mega);
        $('.menu').append($li_menu);
      })
      //$('.nav').append($ul_menu);
    }
  })
}


(function($) {
  $(function() {
    // Рисуем menu
    buildMenu();
  })
})(jQuery);