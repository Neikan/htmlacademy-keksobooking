'use strict';

(function () {

  var clearMessageText = 'Форма объявления очищена';

  var getMessageTemplate = function (messageType) {
    var messageTemplate = document.querySelector('#' + messageType).content.querySelector('.' + messageType);
    var message = messageTemplate.cloneNode(true);
    message.setAttribute('name', 'message');
    return message;
  };

  var displayErrorMessageHandler = function (messageText) {
    var message = getMessageTemplate('error');
    message.querySelector('.error__message').textContent = messageText;
    document.querySelector('main').insertAdjacentElement('afterbegin', message);
  };

  var displaySuccessMessageHandler = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', getMessageTemplate('success'));
  };

  var displayClearMessageHandler = function () {
    var message = getMessageTemplate('success');
    message.querySelector('.success__message').textContent = clearMessageText;
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
    displayErrorMessageHandler: displayErrorMessageHandler,
    displaySuccessMessageHandler: displaySuccessMessageHandler,
    displayOffMessageHandler: displayOffMessageHandler,
    displayClearMessageHandler: displayClearMessageHandler
  };

})();
