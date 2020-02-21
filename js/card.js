'use strict';

(function () {

  /**
   * Шаблон карточки объявления
   */
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
   * Добавление удобств
   * @param {HTMLElement} element - элемент, к которому добавляются удобства
   * @param {array} features - массив удобств объекта объявления
   */
  var renderFeatures = function (element, features) {
    element.innerHTML = '';
    features.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + feature);
      element.appendChild(featureItem);
    });
  };

  /**
   * Добавление фотографий
   * @param {HTMLElement} element - элемент, к которому добавляются фотографии
   * @param {array} photos - массив фотографий объекта объявления
   */
  var renderPhotos = function (element, photos) {
    var photoItemTemplate = element.querySelector('img');
    element.innerHTML = '';
    photos.forEach(function (photo) {
      var photoItem = photoItemTemplate.cloneNode(true);
      photoItem.src = photo;
      element.appendChild(photoItem);
    });
  };

  /**
   * Выбор строки для комнаты
   * @param {number} rooms - количество комнат
   * @return {srting} строка для подстановки в форму карточки объявления
   */
  var switchRooms = function (rooms) {
    var str = '';
    switch (rooms) {
      case 0:
        str = '0 комнат';
        break;
      case 1:
        str = '1 комната';
        break;
      case 35:
        str = '35 комнат';
        break;
      default:
        str = rooms + ' комнаты';
    }
    return str;
  };

  /**
   * Выбор строки для гостей
   * @param {number} guests
   * @return {string} строка для подстановки в форму карточки объявления
   */
  var switchGuest = function (guests) {
    var str = '';
    switch (guests) {
      case 0:
        break;
      case 1:
        str = ' для 1 гостя';
        break;
      default:
        str = ' для ' + guests + ' гостей';
    }
    return str;
  };

  /**
   * Отрисовка карточки объявления
   * @param {Object} offerItem
   * @return {HTMLElement} карточка объявления для расположения на карте
   */
  var renderCard = function (offerItem) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var closeBtnCard = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = offerItem.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offerItem.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.housingData[offerItem.offer.type].type;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    cardElement.querySelector('.popup__avatar').src = offerItem.author.avatar;
    cardElement.querySelector('.popup__description').textContent = offerItem.offer.description;
    cardElement.querySelector('.popup__text--capacity').textContent = switchRooms(offerItem.offer.rooms) + switchGuest(offerItem.offer.guests);
    renderFeatures(cardFeatures, offerItem.offer.features);
    renderPhotos(cardPhotos, offerItem.offer.photos);

    closeBtnCard.addEventListener('click', closeBtnCardClickHandler);

    return cardElement;
  };

  /**
   * Помощник, выполняющий закрытие карточки объявления
   */
  var closeBtnCardClickHandler = function () {
    closeCard();
  };

  /**
   * Открытие карточки объявления
   * @param {Object} offer - объявление
   */
  var openCard = function (offer) {
    closeCard();
    window.map.map.insertBefore(document.createDocumentFragment().appendChild(renderCard(offer)), window.map.mapFiltersContainer);
  };

  /**
   * Закрытие карточки объявления
   */
  var closeCard = function () {
    var card = window.map.map.querySelector('.popup');
    if (card) {
      card.remove();
      window.map.map.removeEventListener('click', closeBtnCardClickHandler);
    }
  };

  window.card = {
    renderCard: renderCard,
    openCard: openCard,
    closeCard: closeCard
  };

})();
