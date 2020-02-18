'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  // Хендлеры
  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === 1) {
      enablePage();
    }
  };

  var mainPinKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.KEYCODE_ENTER) {
      enablePage();
    }
  };

  var adFormChangeHandler = function (evt) {
    window.form.validationForm(evt);
  };

  var mapKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.KEYCODE_ESC) {
      window.card.closeCard();
    }
  };

  var showLoadedOffersHandler = function (responseItems) {
    window.data.offers = responseItems;
    map.insertBefore(window.pins.placePins(window.data.offers), mapFiltersContainer);

    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.adFormAddress.classList.add('ad-form--disabled');
    window.utils.enableElements(window.filters.mapFiltersForm);
    window.utils.enableElements(window.form.adFormFieldsets);

    window.form.setRequirementsTitle();
    window.form.setRequirementsPrice();
    window.form.setRequirementsImages();
    window.form.setRequirementsAddress();

  };

  var errorLoadOffersHandler = function (response) {
    window.messages.displayErrorMessageHandler(response);
    window.messages.displayOffMessageHandler();
    disablePage();
  };

  var uploadOfferDataHandler = function () {
    window.card.closeCard();
    window.messages.displaySuccessMessageHandler();
    window.messages.displayOffMessageHandler();
    disablePage();
  };

  var errorUploadOfferDataHandler = function (response) {
    window.card.closeCard();
    window.messages.displayErrorMessageHandler(response);
    window.messages.displayOffMessageHandler();
  };

  var clearButtonClickhandler = function (evt) {
    evt.preventDefault();
    window.card.closeCard();
    disablePage();
  };

  var uploadButtonClickHandler = function (evt) {
    evt.preventDefault();
    window.backend.serverRequest(window.backend.RequestType.POST, window.backend.RequestUrl.URL_POST, uploadOfferDataHandler, errorUploadOfferDataHandler, new FormData(window.form.adForm));
  };

  // Прослушка событий на главной метке
  window.locality.mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  window.locality.mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  // Неактивное состояние страницы
  var disablePage = function () {
    window.locality.mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
    window.locality.mainPin.addEventListener('keydown', mainPinKeyDownHandler);
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.utils.disableElements(window.filters.mapFiltersForm);
    window.utils.disableElements(window.form.adFormFieldsets);

    window.pins.removePins();
    window.filters.mapFiltersForm.reset();
    window.form.adForm.reset();
    window.form.setRequirementsPrice();
    window.locality.setMainPinDefaultCoordinate();
    window.locality.getAddress(false);

    map.removeEventListener('keydown', mapKeyDownHandler);
    window.form.adForm.removeEventListener('change', adFormChangeHandler);
    window.form.adFormButtonUpload.removeEventListener('submit', uploadButtonClickHandler);
    window.form.adFormButtonClear.removeEventListener('click', clearButtonClickhandler);
  };

  disablePage();

  // Активное состояние страницы
  var enablePage = function () {
    window.locality.mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
    window.locality.mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
    window.backend.serverRequest(window.backend.RequestType.GET, window.backend.RequestUrl.URL_GET, showLoadedOffersHandler, errorLoadOffersHandler);

    window.locality.getAddress(true);

    document.addEventListener('keydown', mapKeyDownHandler);
    window.form.adForm.addEventListener('change', adFormChangeHandler);
    window.form.adForm.addEventListener('submit', uploadButtonClickHandler);
    window.form.adFormButtonClear.addEventListener('click', clearButtonClickhandler);
  };

  window.map = {
    map: map
  };

})();
