'use strict';

(function () {

  var showErrorMessageLoadDataHandler = function (errorMessage) {
    var messageTemplate = document.querySelector('#error').content.querySelector('.error');

    var message = messageTemplate.cloneNode(true);
    message.setAttribute('name', 'error__message');
    message.querySelector('.error__message').textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', message);
  };

  window.messages = {
    showErrorMessageLoadDataHandler: showErrorMessageLoadDataHandler
  };

})();
