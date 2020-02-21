'use strict';

(function () {

  /**
   * Перечень допустимых расширений файлов для изображаений аватара автора и фотографий объекта объявления
   * @constant {array}*/
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  /**
   * Минимальное количество символов в названии объявления
   * @constant {number} */
  var MIN_TITLE_LENGTH = 30;

  /**
   * Максимальное количество символов в названии объявления
   * @constant {number} */
  var MAX_TITLE_LENGTH = 100;

  /**
   * Максимальная цена для объявления
   * @constant {number} */
  var MAX_PRICE = 1000000;

  /**
   * Форма объявления
   * @var {HTMLElement} */
  var adForm = document.querySelector('.ad-form');

  /**
   * Поля формы объявления
   * @var {HTMLElement array} */
  var adFormFieldsets = adForm.querySelectorAll('input, select, fieldset');

  /**
   * Поле загрузки аватара автора объявления
   * @var {HTMLElement} */
  var adFormAvatarUpload = adForm.querySelector('#avatar');

  /**
   * Поле предпросмотра добавленного аватара автора объявления
   * @var {HTMLElement} */
  var adFormAvatarPreview = adForm.querySelector('[class="ad-form-header__preview"] img');

  /**
   * Значение по умолчанию src-атрибута для поля предпросмотра аватара
   * @var {string} */
  var adFormAvatarPreviewSrc = adFormAvatarPreview.src;

  /**
   * Название объявления
   * @var {HTMLElement} */
  var adFormTitle = adForm.querySelector('#title');

  /**
   * Количество комнат
   * @var {HTMLElement} */
  var adFormRoom = adForm.querySelector('#room_number');

  /**
   * Возможное количество гостей
   * @var {HTMLElement} */
  var adFormCapacity = adForm.querySelector('#capacity');

  /**
   * Адрес объекта объявления
   * @var {HTMLElement} */
  var adFormAddress = adForm.querySelector('#address');

  /**
   * Тип объекта объявления
   * @var {HTMLElement} */
  var adFormType = adForm.querySelector('#type');

  /**
   * Стоимость ночи
   * @var {HTMLElement} */
  var adFormPrice = adForm.querySelector('#price');

  /**
   * Поле прибытия
   * @var {HTMLElement} */
  var adFormTimeIn = adForm.querySelector('#timein');

  /**
   * Поле отбытия
   * @var {HTMLElement} */
  var adFormTimeOut = adForm.querySelector('#timeout');

  /**
   * Поле загрузки фотографий объекта объявления
   * @var {HTMLElement} */
  var adFormPhotosUpload = adForm.querySelector('#images');

  /**
   * Поле предпросмотра добавленных фотографий объекта объявления
   * @var {HTMLElement} */
  var adFormPhotosPreview = adForm.querySelector('.ad-form__photo');

  /**
   * Кнопка публикации объявления (отправки на сервер)
   * @var {HTMLElement} */
  var adFormButtonUpload = adForm.querySelector('.ad-form__submit');

  /**
   * Кнопка сброса данных, введенных в форму
   * @var {HTMLElement} */
  var adFormButtonClear = adForm.querySelector('.ad-form__reset');

  /**
   * Установка параметров для названия объявления
   */
  var setRequirementsTitle = function () {
    adFormTitle.setAttribute('minlength', MIN_TITLE_LENGTH);
    adFormTitle.setAttribute('maxlength', MAX_TITLE_LENGTH);
    adFormTitle.setAttribute('required', true);
  };

  /**
   * Установка параметров для цены за ночь в объекте объявления
   */
  var setRequirementsPrice = function () {
    adFormPrice.placeholder = window.data.housingData[adFormType.value].price;
    adFormPrice.min = window.data.housingData[adFormType.value].price;
    adFormPrice.max = MAX_PRICE;
    adFormPrice.setAttribute('required', true);
  };

  /**
   * Установка параметров по типам файлов для полей аватара автора и фотографий объекта объявления
   */
  var setRequirementsImages = function () {
    adFormAvatarUpload.setAttribute('accept', 'image/png, image/jpeg, image/gif');
    adFormPhotosUpload.setAttribute('accept', 'image/png, image/jpeg, image/gif');
  };

  /**
   * Установка параметров для адреса объекта объявления
   */
  var setRequirementsAddress = function () {
    adFormAddress.setAttribute('readonly', true);
    adFormAddress.classList.add('ad-form--disabled');
  };

  /**
   * Валидация количества гостей и комнат
   */
  var validateRoomAndCapacity = function () {
    switch (true) {
      case (adFormRoom.value === '100' && adFormCapacity.value !== '0'):
        adFormRoom.setCustomValidity('Для выбранного количества комнат размещение гостей невозможно');
        break;
      case (adFormRoom.value !== '100' && adFormCapacity.value === '0'):
        adFormCapacity.setCustomValidity('Выбранное количество комнат предназначено для гостей');
        break;
      case (adFormRoom.value < adFormCapacity.value && adFormCapacity.value !== 0):
        adFormCapacity.setCustomValidity('Количество гостей больше, чем комнат. Пожалуйста, укажите количество гостей, равное или меньшее, чем количество комнат');
        break;
      default:
        adFormRoom.setCustomValidity('');
        adFormCapacity.setCustomValidity('');
    }
  };

  /**
   * Валидация времени прибытия/отбытия
   * @param {event} evt - происходящее событие на поле
   */
  var validateTime = function (evt) {
    if (evt.target === adFormTimeIn) {
      adFormTimeOut.value = adFormTimeIn.value;
    }
    if (evt.target === adFormTimeOut) {
      adFormTimeIn.value = adFormTimeOut.value;
    }
  };

  /**
   * Валидация цены в зависимости от типа жилья
   * @param {event} evt - происходящее событие на поле
   */
  var validatePrice = function (evt) {
    if (evt.target === adFormType) {
      adFormPrice.placeholder = window.data.housingData[adFormType.value].price;
      adFormPrice.min = window.data.housingData[adFormType.value].price;
    }
  };

  /**
   * Валидация формы объявления
   * @param {event} evt - происходящее событие на форме
   */
  var validationForm = function (evt) {
    validatePrice(evt);
    validateTime(evt);
    validateRoomAndCapacity();
  };

  // Для задания 8.2
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
    }
  };

  var adFormAvatarChangeHandler = function () {
    displayPreviewImage(adFormAvatarUpload, adFormAvatarPreview, false);
  };

  var adFormPhotosChangeHandler = function () {
    displayPreviewImage(adFormPhotosUpload, adFormPhotosPreview, true, window.utils.createImageElement());
    adFormPhotosPreview.classList.add(window.utils.ClassForPreviewPhoto.CONTAINER);
  };

  var resetAdFormPhotosAndAvatar = function () {
    adFormAvatarPreview.src = adFormAvatarPreviewSrc;

    adFormPhotosPreview.innerHTML = '';
    adFormPhotosPreview.classList.remove(window.utils.ClassForPreviewPhoto.CONTAINER);
  };

  // var check = function () {
  //   if (adFormPhotosPreview.querySelectorAll('.offer__photo__preview__img').length === 0) {
  //     adFormPhotosPreview.classList.remove(window.utils.ClassForPreviewPhoto.CONTAINER);
  //   }
  // }

  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    adFormAddress: adFormAddress,
    adFormAvatarUpload: adFormAvatarUpload,
    adFormPhotosUpload: adFormPhotosUpload,
    adFormButtonUpload: adFormButtonUpload,
    adFormButtonClear: adFormButtonClear,

    setRequirementsTitle: setRequirementsTitle,
    setRequirementsPrice: setRequirementsPrice,
    setRequirementsImages: setRequirementsImages,
    setRequirementsAddress: setRequirementsAddress,

    validationForm: validationForm,
    resetAdFormPhotosAndAvatar: resetAdFormPhotosAndAvatar,

    adFormAvatarChangeHandler: adFormAvatarChangeHandler,
    adFormPhotosChangeHandler: adFormPhotosChangeHandler
  };

})();
