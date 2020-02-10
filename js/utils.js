'use strict';

(function () {

  // Включение элементов
  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  // Отключение элементов
  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  window.utils = {
    enableElements: enableElements,
    disableElements: disableElements
  };

})();
