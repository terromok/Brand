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
            /*document.cookie = ($("#login__email").val()= + $login + "; expires=" + (new Date(Date.now() + 7 * 86400000).toGMTString());*/
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
    id_user: 2,
    username: m,
    password: p,
    email: m,
    credit_card: '',
    bio: '',
    }),
    
  })
}

(function($) {
  $(function() {
    // Слушаем нажатия на кнопку Log In
    $('.cont-reg').on('click', '#login__button', function() {
      $password = $("#login__password").val();
      $login = $("#login__email").val();
      checkUser($login, $password);
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
      
    });
    $('.cont-reg').on('click', '.input_reg', function() {
      
      var p = $(".input_password").val();
      var m = $("#input_email").val();
      registerUser(m, p);
      });
  })
})(jQuery);