'use strict';

(function () {

  /**
   *
   */
  var TIMEOUT = 10000;


  var RequestUrl = {
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking'
  };

  /**
   *
   */
  var RequestStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  /**
   *
   */
  var RequestType = {
    POST: 'POST',
    GET: 'GET'
  };

  /**
   *
   * @param {*} xhr
   * @param {*} successHandler
   * @param {*} errorHandler
   */
  var checkStatusXhr = function (xhr, successHandler, errorHandler) {
    switch (xhr.status) {
      case (RequestStatusCode.OK):
        successHandler(xhr.response);
        break;
      case (RequestStatusCode.BAD_REQUEST):
        errorHandler('Введенные данные не соответстуют требованиям');
        break;
      case (RequestStatusCode.NOT_FOUND):
        errorHandler('Сервер недоступен. Мы работаем, чтобы скорее все починить!');
        break;
      case (RequestStatusCode.SERVER_ERROR):
        errorHandler('Внутренная ошибка сервера. Мы работаем, чтобы скорее все починить!');
        break;
      default:
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  /**
   *
   * @param {string} requestType
   * @param {string} requestUrl
   * @param {*} successHandler
   * @param {*} errorHandler
   * @param {*} requestData
   */
  var serverRequest = function (requestType, requestUrl, successHandler, errorHandler, requestData) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      checkStatusXhr(xhr, successHandler, errorHandler);
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения. Пожалуйста, проверьте подключение');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + TIMEOUT + 'мс. Пожалуйста, проверьте качество сетевого подключения');
    });

    xhr.open(requestType, requestUrl);

    if (requestData) {
      xhr.send(requestData);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    RequestUrl: RequestUrl,
    RequestStatusCode: RequestStatusCode,
    RequestType: RequestType,
    serverRequest: serverRequest
  };

})();
