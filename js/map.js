'use strict';

(function () {

  /**
   * Карта и ее фильтры
   */
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  /**
   * Помощник, переводящий страницу в активный режим по клику
   * @param {event} evt
   */
  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === 1) {
      enablePage();
    }
  };

  /**
   * Помощник, переводящий страницу в активный режим по нажатию клавиши
   * @param {event} evt
   */
  var mainPinKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.KeyCode.ENTER) {
      enablePage();
    }
  };

  /**
   * Помощник, обеспечивающий закрытие карточки объявления по нажатию клавиши
   * @param {event} evt
   */
  var documentKeyDownHandler = function (evt) {
    if (evt.keyCode === window.utils.KeyCode.ESC) {
      window.card.closeCard();
    }
  };

  /**
   * Помощник, выполняющий получение объявлений с сервера и перевод страницы в активный режим
   * @param {*} responseItems
   */
  var showLoadedOffersHandler = function (responseItems) {
    window.data.offers = responseItems;
    map.insertBefore(window.pins.placePins(window.data.offers), mapFiltersContainer);

    map.classList.remove(window.utils.ClassForManipulation.MAP_FADED);
    window.form.adForm.classList.remove(window.utils.ClassForManipulation.ADFORM_DISABLED);
    window.form.adFormAddress.classList.add(window.utils.ClassForManipulation.ADFORM_DISABLED);
    window.utils.enableElements(window.filters.mapFiltersForm);
    window.utils.enableElements(window.form.adFormFieldsets);
    window.utils.addClassForElements(window.form.adFormSelects, window.utils.ClassForManipulation.CURSOR_POINTER);
    window.utils.removeClassForElements(window.form.adFormFieldsets, window.utils.ClassForManipulation.CURSOR_DEFAULT);

    window.form.setRequirementsTitle();
    window.form.setRequirementsPrice();
    window.form.setRequirementsImages();
    window.form.setRequirementsAddress();
  };

  /**
   * Помощник, обрабатывающий ошибки получения объявлений с сервера
   * @param {*} response
   */
  var errorLoadOffersHandler = function (response) {
    window.messages.displayErrorMessageHandler(response);
    window.messages.displayOffMessageHandler();
    disablePage();
  };

  /**
   * Помошник, выполняющийся после успешной отправки данных формы
   */
  var uploadOfferDataHandler = function () {
    window.card.closeCard();
    window.messages.displaySuccessMessageHandler();
    window.messages.displayOffMessageHandler();
    disablePage();
  };

  /**
   * Помошник, обрабатывающий ошибки отправки данных формы на сервер
   * @param {*} response
   */
  var errorUploadOfferDataHandler = function (response) {
    window.card.closeCard();
    window.messages.displayErrorMessageHandler(response);
    window.messages.displayOffMessageHandler();
  };

  /**
   * Помощник, обеспечивающий очистку формы
   * @param {event} evt
   */
  var clearButtonClickhandler = function (evt) {
    evt.preventDefault();
    window.card.closeCard();
    disablePage();
  };

  /**
   * Помощник, выполняющий отправку данных формы на сервер
   * @param {event} evt
   */
  var uploadButtonClickHandler = function (evt) {
    evt.preventDefault();
    window.backend.serverRequest(window.backend.RequestType.POST, window.backend.RequestUrl.URL_POST, uploadOfferDataHandler, errorUploadOfferDataHandler, new FormData(window.form.adForm));
  };

  /**
   * Прослушка событий на главной метке
   */
  window.locality.mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  window.locality.mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  /**
   * Перевод страницы в неактивное состояние
   */
  var disablePage = function () {
    window.locality.mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
    window.locality.mainPin.addEventListener('keydown', mainPinKeyDownHandler);
    map.classList.add(window.utils.ClassForManipulation.MAP_FADED);
    window.form.adForm.classList.add(window.utils.ClassForManipulation.ADFORM_DISABLED);
    window.utils.disableElements(window.filters.mapFiltersForm);
    window.utils.disableElements(window.form.adFormFieldsets);
    window.utils.removeClassForElements(window.form.adFormSelects, window.utils.ClassForManipulation.CURSOR_POINTER);
    window.utils.addClassForElements(window.form.adFormFieldsets, window.utils.ClassForManipulation.CURSOR_DEFAULT);

    window.pins.removePins();
    window.filters.mapFiltersForm.reset();
    window.form.adForm.reset();
    window.form.resetAdFormPhotosAndAvatar();
    window.form.setRequirementsPrice();

    window.locality.setMainPinDefaultCoordinate();
    window.locality.getAddress(false);

    document.removeEventListener('keydown', documentKeyDownHandler);
    window.form.adFormAvatarUpload.removeEventListener('change', window.form.adFormAvatarChangeHandler);
    window.form.adFormPhotosUpload.removeEventListener('change', window.form.adFormPhotosChangeHandler);
    window.form.adFormPhotosPreview.removeEventListener('click', window.form.adFormPhotosClickHandler);
    window.form.adFormPhotosPreview.removeEventListener('keydown', window.form.adFormPhotosKeyDownHandler);
    window.form.adForm.removeEventListener('change', window.form.adFormChangeHandler);
    window.form.adFormButtonUpload.removeEventListener('click', uploadButtonClickHandler);
    window.form.adFormButtonClear.removeEventListener('click', clearButtonClickhandler);
    window.filters.mapFiltersForm.removeEventListener('change', window.filters.mapFiltersFormChangeHandler);
  };

  disablePage();

  /**
   * Перевод страницы в активное состояние
   */
  var enablePage = function () {
    window.locality.mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
    window.locality.mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
    window.backend.serverRequest(window.backend.RequestType.GET, window.backend.RequestUrl.URL_GET, showLoadedOffersHandler, errorLoadOffersHandler);

    window.locality.getAddress(true);

    document.addEventListener('keydown', documentKeyDownHandler);
    window.form.adFormAvatarUpload.addEventListener('change', window.form.adFormAvatarChangeHandler);
    window.form.adFormPhotosUpload.addEventListener('change', window.form.adFormPhotosChangeHandler);
    window.form.adFormPhotosPreview.addEventListener('click', window.form.adFormPhotosClickHandler);
    window.form.adFormPhotosPreview.addEventListener('keydown', window.form.adFormPhotosKeyDownHandler);
    window.form.adForm.addEventListener('change', window.form.adFormChangeHandler);
    window.form.adFormButtonUpload.addEventListener('click', uploadButtonClickHandler);
    window.form.adFormButtonClear.addEventListener('click', clearButtonClickhandler);
    window.filters.mapFiltersForm.addEventListener('change', window.filters.mapFiltersFormChangeHandler);
  };

  window.map = {
    map: map
  };

})();
