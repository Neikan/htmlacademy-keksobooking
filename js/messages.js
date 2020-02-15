'use strict';

(function () {

  var errorLoadHandler = function (errorMessage) {
    var messageTemplate = document.querySelector('#error').content.querySelector('.error');

    var message = messageTemplate.cloneNode(true);
    message.setAttribute('name', 'message');
    message.querySelector('.error__message').textContent = errorMessage;

    document.querySelector('main').insertAdjacentElement('afterbegin', message);
  };

  var successUploadDataHandler = function (errorMessage) {
    var messageTemplate = document.querySelector('#success').content.querySelector('.success');

    var message = messageTemplate.cloneNode(true);
    message.setAttribute('name', 'message');
    message.querySelector('.success__message').textContent = errorMessage;

    document.querySelector('main').insertAdjacentElement('afterbegin', message);
  };

  var displayOffMessageHandler = function () {
    var message = document.querySelector('div[name="message"]');
    message.addEventListener('click', removeMessageHandler);
    document.addEventListener('keydown', messageKeyDownHandler);
  };

  var removeMessageHandler = function () {
    if (document.querySelector('div[name="message"]') !== null) {
      document.querySelector('div[name="message"]').remove();
    }
  };

  var messageKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.KEYCODE_ESC) {
      removeMessageHandler();
    }
  };

  window.messages = {
    errorLoadHandler: errorLoadHandler,
    successUploadDataHandler: successUploadDataHandler,
    displayOffMessageHandler: displayOffMessageHandler,
    removeMessageHandler: removeMessageHandler,
    messageKeyDownHandler: messageKeyDownHandler
  };

})();
