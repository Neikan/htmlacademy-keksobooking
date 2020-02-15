'use strict';

(function () {

  var MIN_TITLE_LENGTH = 2; // Потом поменять на 30 согласно ТЗ
  var MAX_TITLE_LENGTH = 100;

  var MAX_PRICE = 1000000;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('input, select, fieldset');

  // Атрибуты формы объявления
  var adFormAvatar = adForm.querySelector('#avatar');
  var adFormTitle = adForm.querySelector('#title');
  var adFormRoom = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormAddress = adForm.querySelector('#address');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormPhotos = adForm.querySelector('#images');

  var adFormButtonUpload = adForm.querySelector('ad-form__submit');
  var adFormButtonClear = adForm.querySelector('ad-form__reset');

  // Органичения для названия объявления
  var setRequirementsTitle = function () {
    adFormTitle.setAttribute('minlength', MIN_TITLE_LENGTH);
    adFormTitle.setAttribute('maxlength', MAX_TITLE_LENGTH);
    adFormTitle.setAttribute('required', true);
  };

  // Органичения и предустановки для цены
  var setRequirementsPrice = function () {
    adFormPrice.placeholder = window.data.housingData[adFormType.value].price;
    adFormPrice.min = window.data.housingData[adFormType.value].price;
    adFormPrice.max = MAX_PRICE;
    adFormPrice.setAttribute('required', true);
  };

  // Установка ограничений на загрузку типов файлов
  var setRequirementsImages = function () {
    adFormAvatar.setAttribute('accept', 'image/png, image/jpeg');
    adFormPhotos.setAttribute('accept', 'image/png, image/jpeg');
  };

  // Получение и деактивация ввода адреса
  var setRequirementsAddress = function () {
    adFormAddress.setAttribute('disabled', true);
    adFormAddress.classList.add('ad-form--disabled');
  };

  // Валидация количества гостей и комнат
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

  // Валидация времени заезда/отъезда
  var validateTime = function (evt) {
    if (evt.target === adFormTimeIn) {
      adFormTimeOut.value = adFormTimeIn.value;
    }
    if (evt.target === adFormTimeOut) {
      adFormTimeIn.value = adFormTimeOut.value;
    }
  };

  // Валидация цены в зависимости от типа жилья
  var validatePrice = function (evt) {
    if (evt.target === adFormType) {
      adFormPrice.placeholder = window.data.housingData[adFormType.value].price;
      adFormPrice.min = window.data.housingData[adFormType.value].price;
    }
  };

  // Валидация всей формы
  var validationForm = function (evt) {
    validatePrice(evt);
    validateTime(evt);
    validateRoomAndCapacity();
  };

  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    adFormAddress: adFormAddress,
    adFormButtonUpload: adFormButtonUpload,
    adFormButtonClear: adFormButtonClear,

    setRequirementsTitle: setRequirementsTitle,
    setRequirementsPrice: setRequirementsPrice,
    setRequirementsImages: setRequirementsImages,
    setRequirementsAddress: setRequirementsAddress,
    validationForm: validationForm
  };

})();
