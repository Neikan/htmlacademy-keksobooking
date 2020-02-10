'use strict';

(function () {

  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFiltersFieldsets = map.querySelectorAll('input, select, fieldset');

  var mainPin = window.form.mainPin;

  // Хендлеры
  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === 1) {
      enablePage();
    }
  };

  var mainPinKeyDownHandler = function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      enablePage();
    }
  };

  var adFormChangeHandler = function (evt) {
    window.form.validationForm(evt);
  };

  var mapKeyDownHandler = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      window.card.closeCard();
    }
  };

  // Прослушка событий на главной метке
  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  // Неактивное состояние страницы
  var disablePage = function () {
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.utils.disableElements(mapFiltersFieldsets);
    window.utils.disableElements(window.form.adFormFieldsets);

    window.form.setRequirementsAddress(false);
    window.form.setRequirementsPrice();

    mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
    mainPin.addEventListener('keydown', mainPinKeyDownHandler);

    map.removeEventListener('keydown', mapKeyDownHandler);
    window.form.adForm.removeEventListener('change', adFormChangeHandler);
  };

  disablePage();

  // Активное состояние страницы
  var enablePage = function () {
    mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
    mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
    // adForm.setAttribute('action', 'https://js.dump.academy/keksobooking/data'); // П.5 из ТЗ

    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.adFormAddress.classList.add('ad-form--disabled');
    window.utils.enableElements(mapFiltersFieldsets);
    window.utils.enableElements(window.form.adFormFieldsets);

    map.insertBefore(window.pins.placePins(window.data.offers), mapFiltersContainer);
    map.insertBefore(document.createDocumentFragment().appendChild(window.card.renderCard(window.data.offers[0])), mapFiltersContainer);

    window.form.setRequirementsTitle();
    window.form.setRequirementsAddress(true);
    window.form.setRequirementsPrice();
    window.form.setRequirementsImages();

    mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
    mainPin.removeEventListener('keydown', mainPinKeyDownHandler);

    map.addEventListener('keydown', mapKeyDownHandler);
    window.form.adForm.addEventListener('change', adFormChangeHandler);
  };

  window.map = {
    map: map,
    mapFiltersContainer: mapFiltersContainer
  };

})();
