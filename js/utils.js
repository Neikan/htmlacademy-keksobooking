'use strict';

(function () {

  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;
  var DEBOUNCE_INTERVAL = 500;

  var ClassForPreviewPhoto = {
    CONTAINER: 'offer__photo__preview__container',
    IMG: 'offer__photo__preview__img'
  };

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

  var createImageElement = function () {
    var itemImg = document.createElement('img');
    itemImg.classList.add(ClassForPreviewPhoto.IMG);
    return itemImg;
  };

  // Функция устранения "разрыва"
  var debounce = function (callbackFunc) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callbackFunc.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    KEYCODE_ENTER: KEYCODE_ENTER,
    KEYCODE_ESC: KEYCODE_ESC,
    ClassForPreviewPhoto: ClassForPreviewPhoto,
    enableElements: enableElements,
    disableElements: disableElements,
    createImageElement: createImageElement,
    debounce: debounce
  };

})();
