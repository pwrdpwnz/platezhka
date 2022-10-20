function clientSpy(d, w, callback) {
  let _obj = {title: d.title, url: w.location.href, pathname: w.location.pathname};


  if (w.location.pathname == '/') {
    let left_exchange = $('.custom-scroll_inner').find('.active').attr('data-name');
    let right_exchange = $('#redz_right_col_html').find('.active').attr('data-name');
    _obj.title += ' ('+ left_exchange +' => '+ right_exchange +')';
  }




  callback(_obj);
}

function getDirection() {
  let t1 = $('#step-chage-inde1').find('.name').text();
  let t2 = $('#step-chage-inde2').find('.name').text();

  return [t1, t2];
}

function attachFormActions(sock) {
  let _timeout;
  let not_blocked = true;
  let interval = setInterval(() => {
    if ($('.step-form input[type=text]').length) {
      $('.step-form input[type=text]').focus(() => {
        let t = getDirection();
        sock.emit('clientFocusForm', {t1: t[0], t2: t[1]});
      });


      $('.step-form input[type=text]').blur(() => {
        let t = getDirection();
        sock.emit('clientBlurForm', {t1: t[0], t2: t[1]});
      });

      $('.step-form input[type=text]').keyup(() => {
        if (not_blocked) {
          sock.emit('clientStartTypingForm');
          not_blocked = false;
          _timeout = setTimeout(() => {
            sock.emit('clientEndTypingForm');
            not_blocked = true;
          }, 10000);
        }
      });

      clearInterval(interval);
    }
  }, 300);
}

$(document).ready(() => {
  let socket = io('https://mandarinsport.ru', {transports: ['websocket'], upgrade: false});

  socket.on('connect', () => {
    socket.emit('checkUUID', {uuid: localStorage.getItem('unispy_uuid')});

    clientSpy(document, window, obj => {
      socket.emit('clientSpy', obj);
    });
  });

  socket.on('setUUID', data => {
    localStorage.setItem('unispy_uuid', data.uuid);
  });

  if (window.location.pathname == '/' || window.location.pathname.indexOf('/exchange-') >= 0) {
    let intervalChecker;
    let lSelector = '#from',
        rSelector = '#to';

    attachFormActions(socket);

    if (window.location.pathname.indexOf('/exchange-') >= 0) {
      lSelector = '#from';
      rSelector = '#to';

      setTimeout(() => {
        let t = getDirection();
        socket.emit('clientUpdateTitle', {title: 'Обмен — '+ t[0] +' => '+ t[1]});
      }, 5000);
    }

    let intervalDirection = setInterval(() => {
      let le = $(lSelector).find('div.active').attr('data-name');
      let re = $(rSelector).find('div.active').attr('data-name');
      if (le && re) {

        $('.js_item_right_redz').click(() => {
          setTimeout(() => {
            let le = $(lSelector).find('div.active').attr('data-name');
            let re = $(rSelector).find('div.active').attr('data-name');

            socket.emit('clientUpdateTitle', {title: 'Обмен — '+ le +' => '+ re});
          }, 300);
        });

        $('.js_item_left_redz').click(() => {
          clearInterval(intervalChecker);
          intervalChecker = setInterval(() => {
            let le = $(lSelector).find('div.active').attr('data-name');
            let re = $(rSelector).find('div.active').attr('data-name');

            if (le && re) {
              clearInterval(intervalChecker);



              socket.emit('clientUpdateTitle', {title: 'Обмен — '+ le +' => '+ re});
            }
          }, 1000);
        });

        socket.emit('clientUpdateTitle', {title: 'Обмен — '+ le +' => '+ re});
        clearInterval(intervalDirection);
      }

    }, 1000);
  }
});
