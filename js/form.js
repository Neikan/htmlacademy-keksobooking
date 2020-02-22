'use strict';

(function () {

  /**
   * Ограничения для полей формы объявления
   */
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;

  /**
   * Формы объявления и ее поля
   */
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('input, select, button, label, fieldset');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormAvatarUpload = adForm.querySelector('#avatar');
  var adFormAvatarPreview = adForm.querySelector('[class="ad-form-header__preview"] img');
  var adFormAvatarPreviewSrc = adFormAvatarPreview.src;
  var adFormTitle = adForm.querySelector('#title');
  var adFormRoom = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormAddress = adForm.querySelector('#address');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormPhotosUpload = adForm.querySelector('#images');
  var adFormPhotosPreview = adForm.querySelector('.ad-form__photo');
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
   * @param {event} evt
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
   * @param {event} evt
   */
  var validatePrice = function (evt) {
    if (evt.target === adFormType) {
      adFormPrice.placeholder = window.data.housingData[adFormType.value].price;
      adFormPrice.min = window.data.housingData[adFormType.value].price;
    }
  };

  /**
   * Валидация формы объявления
   * @param {event} evt
   */
  var validationForm = function (evt) {
    validatePrice(evt);
    validateTime(evt);
    validateRoomAndCapacity();
  };

  /**
   * Помощник, вызывающий валидацию данных формы
   * @param {event} evt
   */
  var adFormChangeHandler = function (evt) {
    window.form.validationForm(evt);
  };


  /**
   * Помощник, отслеживавающий изменение аватара автора объявления
   */
  var adFormAvatarChangeHandler = function () {
    window.utils.displayPreviewImage(adFormAvatarUpload, adFormAvatarPreview, false);
  };

  /**
   * Помощник, отслеживавающий изменение фотографий объекта
   */
  var adFormPhotosChangeHandler = function () {
    window.utils.displayPreviewImage(adFormPhotosUpload, adFormPhotosPreview, true, window.utils.createImageElement());
    adFormPhotosPreview.classList.add(window.utils.ClassForManipulation.PHOTO_IMAGE_CONTAINER);
  };

  /**
   * Помощник, отслеживавающий нажатия на фотографии объекта
   */
  var adFormPhotosClickHandler = function () {
    if (adFormPhotosPreview.children.length === 0) {
      adFormPhotosPreview.classList.remove(window.utils.ClassForManipulation.PHOTO_IMAGE_CONTAINER);
    }
  };

  /**
   * Помощник, отслеживавающий клавиатурные нажатия на фотографии объекта
   * @param {event} evt
   */
  var adFormPhotosKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.KeyCode.ENTER) {
      if (adFormPhotosPreview.children.length === 0) {
        adFormPhotosPreview.classList.remove(window.utils.ClassForManipulation.PHOTO_IMAGE_CONTAINER);
      }
    }
  };

  /**
   * Возврат блоков аватара автора и фотографий объекта к значениям по умолчанию
   */
  var resetAdFormPhotosAndAvatar = function () {
    adFormAvatarPreview.src = adFormAvatarPreviewSrc;

    adFormPhotosPreview.innerHTML = '';
    adFormPhotosPreview.classList.remove(window.utils.ClassForManipulation.PHOTO_IMAGE_CONTAINER);
  };

  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    adFormSelects: adFormSelects,
    adFormAddress: adFormAddress,
    adFormAvatarUpload: adFormAvatarUpload,
    adFormPhotosUpload: adFormPhotosUpload,
    adFormPhotosPreview: adFormPhotosPreview,
    adFormButtonClear: adFormButtonClear,

    setRequirementsTitle: setRequirementsTitle,
    setRequirementsPrice: setRequirementsPrice,
    setRequirementsImages: setRequirementsImages,
    setRequirementsAddress: setRequirementsAddress,

    validationForm: validationForm,
    resetAdFormPhotosAndAvatar: resetAdFormPhotosAndAvatar,

    adFormChangeHandler: adFormChangeHandler,
    adFormAvatarChangeHandler: adFormAvatarChangeHandler,
    adFormPhotosChangeHandler: adFormPhotosChangeHandler,
    adFormPhotosClickHandler: adFormPhotosClickHandler,
    adFormPhotosKeyDownHandler: adFormPhotosKeyDownHandler
  };

})();
