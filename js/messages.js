'use strict';

(function () {

  /**
   * Получение шаблона сообщения
   * @param {string} messageType
   * @return {HTMLElement}
   */
  var getMessageTemplate = function (messageType) {
    var messageTemplate = document.querySelector('#' + messageType).content.querySelector('.' + messageType);
    var message = messageTemplate.cloneNode(true);
    message.setAttribute('name', 'message');
    return message;
  };

  /**
   * Помощник, обеспечивающий отображение сообщения об ошибке выполнения операции
   * @param {string} messageText
   */
  var displayErrorMessageHandler = function (messageText) {
    var message = getMessageTemplate('error');
    message.querySelector('.error__message').textContent = messageText;
    document.querySelector('main').insertAdjacentElement('afterbegin', message);
  };

  /**
   * Помощник, обеспечивающий отображение сообщения об успешном выполнении операции
   */
  var displaySuccessMessageHandler = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', getMessageTemplate('success'));
  };

  /**
   * Помощник, выполняющий закрытие сообщения
   */
  var displayOffMessageHandler = function () {
    var message = document.querySelector('div[name="message"]');
    message.addEventListener('click', removeMessageHandler);
    document.addEventListener('keydown', messageKeyDownHandler);
  };

  /**
   * Помощник, обеспечивающий закрытие сообщения по клику на клавишу
   * @param {event} evt
   */
  var messageKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.KeyCode.ESC) {
      removeMessageHandler();
    }
  };

  /**
   * Удаление сообщения
   */
  var removeMessageHandler = function () {
    if (document.querySelector('div[name="message"]') !== null) {
      document.querySelector('div[name="message"]').remove();
    }
  };

  window.messages = {
    displayErrorMessageHandler: displayErrorMessageHandler,
    displaySuccessMessageHandler: displaySuccessMessageHandler,
    displayOffMessageHandler: displayOffMessageHandler
  };

})();
