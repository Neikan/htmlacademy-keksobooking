'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var StatusCode = {
    Ok: 200,
    NotFound: 404
  };

  var loadData = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case (StatusCode.Ok):
          successHandler(xhr.response);
          break;
        case (StatusCode.NotFound):
          errorHandler('Сервер недоступен. Мы работаем, чтобы скорее все починить!');
          break;
        default:
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения. Пожалуйста, проверьте сетевое подключение');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + TIMEOUT + 'мс. Пожалуйста, проверьте качество сетевого подключения');
    });

    xhr.open('GET', URL_GET);

    xhr.send();
  };

  var uploadData = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения. Пожалуйста, проверьте подключение');
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };

})();
