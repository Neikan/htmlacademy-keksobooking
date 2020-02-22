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
   * Перечень сss-классов для работы с элементами
   * @enum {string} */
  var ClassForManipulation = {
    MAP_FADED: 'map--faded',
    ADFORM_DISABLED: 'ad-form--disabled',
    POPUP_FEATURE: 'popup__feature',
    PIN_ACTIVE: 'map__pin--active',
    PHOTO_IMAGE_CONTAINER: 'offer__photo__preview__container',
    PHOTO_IMAGE: 'offer__photo__preview__img',
    CURSOR_POINTER: 'adform__cursor__pointer',
    CURSOR_DEFAULT: 'adform__cursor__default'
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
   * Добавление css-класса для массива элементов
   * @param {array} elements
   * @param {string} className
   */
  var addClassForElements = function (elements, className) {
    elements.forEach(function (element) {
      element.classList.add(className);
    });
  };

  /**
   * Удаление css-класса для массива элементов
   * @param {array} elements
   * @param {string} className
   */
  var removeClassForElements = function (elements, className) {
    elements.forEach(function (element) {
      element.classList.remove(className);
    });
  };

  /**
   * Создание html-элемента с тегом 'img'
   * @return {HTMLElement}
   */
  var createImageElement = function () {
    var item = document.createElement('img');
    item.classList.add(ClassForManipulation.PHOTO_IMAGE);
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
          newPreviewItem.addEventListener('keydown', function (evt) {
            if (evt.keyCode === window.utils.KeyCode.ENTER) {
              newPreviewItem.remove();
            }
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
    ClassForManipulation: ClassForManipulation,
    enableElements: enableElements,
    disableElements: disableElements,
    addClassForElements: addClassForElements,
    removeClassForElements: removeClassForElements,
    createImageElement: createImageElement,
    displayPreviewImage: displayPreviewImage,
    debounce: debounce
  };

})();
