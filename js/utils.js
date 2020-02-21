'use strict';

(function () {

  /**
   * Значение задержки
   * @constant {number} */
  var DEBOUNCE_INTERVAL = 500;

  /**
   * Перечень допустимых расширений файлов для изображаений аватара автора и фотографий объекта объявления
   * @constant {array}*/
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  /**
   * Коды клавиш клавиатур
   */
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  /**
   * Перечень сss-классов
   * @enum {string} */
  var ClassForPreviewPhoto = {
    CONTAINER: 'offer__photo__preview__container',
    IMG: 'offer__photo__preview__img'
  };

  /**
   * Удаление атрибута 'disabled' для массива html-элементов
   * @param {array} elements
   */
  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  /**
   * Добавление атрибута 'disabled' для массива html-элементов
   * @param {array} elements
   */
  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  /**
   * Создание html-элемента с тегом 'img'
   * @return {HTMLElement}
   */
  var createImageElement = function () {
    var item = document.createElement('img');
    item.classList.add(ClassForPreviewPhoto.IMG);
    item.setAttribute('tabindex', 0);
    return item;
  };

  /**
   * Предпросмотр загружаемого файла изображения
   * @param {HTMLElement} uploadField - поле формы, в которое осуществляется загрузка файла изображения
   * @param {HTMLElement} previewField - поле формы, в котором осуществляется предпросмотр загружаемого файла
   * @param {boolean} isCreateNewPreviewItem - флаг, определяющий размещение загружаемого файла: false - существующий HTMLElement / true - новый HTMLElement
   * @param {HTMLElement} newPreviewItem - необязательный параметр,
   */
  var displayPreviewImage = function (uploadField, previewField, isCreateNewPreviewItem, newPreviewItem) {
    var file = uploadField.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (!isCreateNewPreviewItem) {
          previewField.src = reader.result;
        } else {
          previewField.appendChild(newPreviewItem);
          newPreviewItem.src = reader.result;
          newPreviewItem.addEventListener('click', function () {
            newPreviewItem.remove();
          });
        }
      });
      reader.readAsDataURL(file);
      uploadField.value = '';
    }
  };

  /**
   * Устранение "дребезга"
   * @param {function} callbackFunc - передаваемая фукнция
   * @return {function} - возвращаемая функция
  */
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
    KeyCode: KeyCode,
    ClassForPreviewPhoto: ClassForPreviewPhoto,
    enableElements: enableElements,
    disableElements: disableElements,
    createImageElement: createImageElement,
    displayPreviewImage: displayPreviewImage,
    debounce: debounce
  };

})();
