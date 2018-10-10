/*function setCookie (cname,cvalue,exdays) {
  var expires;
  if (expires === 0) {
    expires = '';
  } else {
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toUTCString();
      var domain = (typeof domain === "undefined")?'':";domain="+domain;
      document.cookie = cname + "=" + cvalue + "; " + expires+domain;
  }
}

function getCookie (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    //while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
};*/

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
  options = options || {};

  var expires = options;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name// + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}


function checkUser ($login, $password) {
  $.ajax({
    url: 'http://localhost:3000/users',
    dataType: 'json',
    success: function(users) {
      // Перебираем пользователей
      users.forEach(function(user) {
        if (user.email == $login) {
          if (user.password == $password) {
            console.log('!!!!!!!!!!!');
            $(".my-acc").empty();
            $(".my-acc").append(user.username);
            setCookie($login, $login);
            $('#logout__button').css('display', 'block');
            $('#login__button').css('display', 'none');
            //setCookie($password, $password);
            alert("Добро пожаловать " + user.username + "!");
          }
          else 
            {console.log('!----------!');
            alert("Пароль введен неправильно!");
          }

        } else {
          console.log('000000000000');
          alert("Вы не зарестрированы в системе!");
        };
      });
    }
  })
}


function checkMail (m, p) {
  var i = 0;
  $.ajax({
    url: 'http://localhost:3000/users',
    dataType: 'json',
    success: function(users) {
   
      // Перебираем пользователей
      users.forEach(function(user) {

        // Проверяем, есть ли такой пользователь в базе
        if (user.email == m) {i = 1}
      });
      if (i == 1) {
        alert('Пользрватель уже зарестрирован')
      } else {
        registerUser (m, p)
      }
    }
  })
  
}


function registerUser (m, p) {
  $(".my-acc").empty();
  $(".my-acc").append(m);
  $.ajax({
    
    url: 'http://localhost:3000/users',
    type: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
    /*id_user: 2,*/
    username: m,
    password: p,
    email: m,
    credit_card: '',
    bio: '',
    }),
    
  })
  alert('Поздравляем! Вы зарестрированы!')
  $(".registrator").css('display', 'none');
}

(function($) {
  $(function() {
    $(".my-acc").empty();
    $(".my-acc").append(document.cookie);
    // Слушаем нажатия на кнопку Log In
    $('.cont-reg').on('click', '#login__button', function() {
      $password = $("#login__password").val();
      $login = $("#login__email").val();
      checkUser($login, $password);
    });
    // Слушаем нажатия на кнопку Log Out
    $('.cont-reg').on('click', '#logout__button', function() {
      document.cookie = 'My Account';
      $('#logout__button').css('display', 'none');
      $('#login__button').css('display', 'block');
      $(".my-acc").empty();
      $(".my-acc").append('My Account');
    });
    // Слушаем нажатия на кнопку Continue
    $('.cont-reg').on('click', '#register', function() {
      var $registration = $('<div />', {
        class: 'registration',
      });
      var $input_email = $('<input />', {
        id: 'input_email',
        placeholder: 'email@server.com',
        /*required pattern: '"\S+@[a-z]+.[a-z]+"'*/
      });
      var $input_password = $('<input />', {
        class: 'input_password',
        placeholder: 'email@server.com',
        type: 'password',
      });
      var $input_reg = $('<input />', {
        class: 'input_reg',
        value: 'Register',
        type: 'submit',
      });
      $registration.append($input_email);
      $registration.append($input_password);
      $registration.append($input_reg);
      $(".registrator").append($registration);
      $(".registrator").css('display', 'block');

      
    });
    $('.registrator').on('click', '.input_reg', function() {
      
      var p = $(".input_password").val();
      var m = $("#input_email").val();
      checkMail(m, p);
      });
  })
})(jQuery);