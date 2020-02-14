'use strict';

(function () {

  // Получение шаблона карточки
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Добавление преимуществ
  var renderFeatures = function (element, features) {
    element.innerHTML = '';
    for (var i = 0; i < features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + features[i]);
      element.appendChild(featureItem);
    }
  };

  // Добавление фото
  var renderPhotos = function (element, photos) {
    var photoItemTemplate = element.querySelector('img');
    element.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      var photoItem = photoItemTemplate.cloneNode(true);
      photoItem.src = photos[i];
      element.appendChild(photoItem);
    }
  };

  // Выбор строки для комнаты
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

  // Выбор строки для гостей
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

  var closeBtnCardClickHandler = function () {
    closeCard();
  };

  // Отрисовка карточки объявления
  var renderCard = function (offerItem) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var closeBtnCard = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = offerItem.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offerItem.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.roomTypes[offerItem.offer.type];
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    cardElement.querySelector('.popup__avatar').src = offerItem.author.avatar;
    cardElement.querySelector('.popup__description').textContent = offerItem.offer.description;
    cardElement.querySelector('.popup__text--capacity').textContent = switchRooms(offerItem.offer.rooms) + switchGuest(offerItem.offer.guests);
    renderFeatures(cardFeatures, offerItem.offer.features);
    renderPhotos(cardPhotos, offerItem.offer.photos);

    closeBtnCard.addEventListener('click', closeBtnCardClickHandler);

    return cardElement;
  };

  // Открытие карточки объявления
  var openCard = function (offer) {
    closeCard();
    window.map.map.insertBefore(document.createDocumentFragment().appendChild(renderCard(offer)), window.map.mapFiltersContainer);
  };

  // Закрытие карточки объявления
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
