function buildCart() {
  // Очищаем корзину
  $('#container-cart').empty();
  // Отправляем запрос на получение списка товаров в корзине
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function(cart) {
      // Переменная для хранения стоимости товаров в корзине*/
      var amount = 0;

      // Перебираем товары
      cart.forEach(function(item) {

        // Создаем товар в списке
        var $product_details = $('<div />', {
          class: 'product-details',
        });
        var $img_mini = $('<div />', {
          class: 'img-mini',
        });
        var $img = $('<img />', {
          src: './/img/mini/'+item.src,
          alt: item.alt,
        });
        $img_mini.append($img);
        var $details = $('<div />', {
          class: 'details',
        });
        var $h4 = $('<h4 />', {
          text: item.name,
        });
        var $pColor = $('<p />', {
          text: 'Color',
        });
        var $spanColor = $('<span />', {
          text: 'Red',
        });
        var $pSize = $('<p />', {
          text: 'Size',
        });
        var $spanSize = $('<span />', {
          text: 'XII',
        });
        $details.append($h4);
        $details.append($pColor);
        $details.append($spanColor);
        $details.append($pSize);
        $details.append($spanSize);
        $product_details.append($img_mini);
        $product_details.append($details);

        var $unite_price = $('<div />', {
          class: 'unite-price',
        });
        var $pPrice = $('<p />', {
          text: '$' + item.price,
        });
        $unite_price.append($pPrice);

        var $quantyty = $('<div />', {
          class: 'quantyty',
        });
        var $pQuantyty = $('<p />', {
          text: item.quantyty,
        });
        $quantyty.append($pQuantyty);

        var $shop_shipping = $('<div />', {
          class: 'shop-shipping',
        });
        var $pShop_shipping = $('<p />', {
          text: 'free',
        });
        $shop_shipping.append($pShop_shipping);

        var $Subtotal = $('<div />', {
          class: 'Subtotal',
        });
        var $pSubtotal = $('<p />', {
          text: item.quantity * item.price,
        });
        $Subtotal.append($pSubtotal);

        var $ACTION = $('<div />', {
          class: 'ACTION',
        });
        var $button = $('<button />', {
          text: 'x',
          class: 'delete',
          'data-id': item.id,
          'data-quantity': item.quantity,
        });
        $ACTION.append($button);

        var $product_in_cart = $('<div />', {
          class: 'product-in-cart',
        });
        $product_in_cart.append($product_details);
        $product_in_cart.append($unite_price);
        $product_in_cart.append($quantyty);
        $product_in_cart.append($shop_shipping);
        $product_in_cart.append($Subtotal);
        $product_in_cart.append($ACTION);

        $('#container-cart').append($product_in_cart);

        // Суммируем 
        amount += +item.quantity * +item.price;

      });
    }
  })
}

function buildGoodsList() {
  // Запрашиваем список товаров на складе
  $.ajax({
    url: 'http://localhost:3000/goods',
    dataType: 'json',
    success: function(cart) {
      cart.forEach(function(item) {
      var $a = $('<a />', {
        href: item.href,
        class: 'product-item',
      });
      var $div = $('<div />', {
        class: 'parrent-product',
      });
      var $img = $('<img />', {
        src: './/img/'+item.src,
        alt: item.alt,
      });
      var $p = $('<p />', {
        text: item.name,
      }); 
      var $price = $('<span />', {
        text: '$' + item.price,
      });
      var $button = $('<button />', {
        text: 'Add To Cart',
        class: 'buy',
        'data-id': item.id,
        'data-name': item.name,
        'data-price': item.price,
        'data-src': item.src,
        'data-alt': item.alt,

      });
      $a.append($img);
      $a.append($p);
      $a.append($price);
      $div.append($a);
      $div.append($button);
      $('#product-flex').append($div);
      })
    } 
  })
}

(function($) {
  $(function() {
    // Рисуем корзину
    buildCart();
    // Рисуем список товаров
    buildGoodsList();

    // Слушаем нажатия на удаление товара из корзины
    $('#container-cart').on('click', '.delete', function() {
      // Получаем id товара, который пользователь хочет удалить
      var id = $(this).attr('data-id');
      var entity = $('.delete [data-id="' + id + '"]');
      if ($(entity).attr('data-quantity') > 1) {
              $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') - 1,
          }),
          success: function() {
            // Перестраиваем корзину
            buildCart();
          }
        })
      
      } else {
// Отправляем запрос на удаление
      $.ajax({
        url: 'http://localhost:3000/cart/' + id,
        type: 'DELETE',
        success: function() {
          // Перерисовываем корзины
          buildCart();
        }
      })
      }
    });

    // Слушаем нажатия на кнопку Купить
    $('#product-flex').on('click', '.buy', function() {
      // Определяем id товара, который пользователь хочет удалить
      var id = $(this).attr('data-id');
      // Пробуем найти такой товар в корзине
      var entity = $('.delete [data-id="' + id + '"]');
      if(entity.length) {
        // Товар в корзине есть, отправляем запрос на увеличение количества
        $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') + 1,
          }),
          success: function() {
            // Перестраиваем корзину
            buildCart();
          }
        })
      } else {
        // Товара в корзине нет - создаем в количестве 1
        $.ajax({
          url: 'http://localhost:3000/cart',
          type: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            id: id,
            quantity: 1,
            name: $(this).attr('data-name'),
            price: $(this).attr('data-price'),
            src: $(this).attr('data-src'),
            alt: $(this).attr('data-alt'),
          }),
          success: function() {
            // Перерисовываем корзину
            buildCart();
          }
        })
      }
    });    
  });
})(jQuery);