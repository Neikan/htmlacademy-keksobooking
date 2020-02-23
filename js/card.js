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
      featureItem.classList.add(window.utils.ClassForManipulation.POPUP_FEATURE);
      featureItem.classList.add(window.utils.ClassForManipulation.POPUP_FEATURE + '--' + feature);
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
        break;
      default:
        str = rooms + ' ' + window.utils.getDeclensionOfNoun(rooms, ['комната', 'комнаты', 'комнат']);
    }
    return str;
  };

  /**
   * Выбор строки для гостей
   * @param {number} guests - количество гостей
   * @return {string} строка для подстановки в форму карточки объявления
   */
  var switchGuests = function (guests) {
    var str = '';
    switch (guests) {
      case 0:
        break;
      default:
        str = guests + ' ' + window.utils.getDeclensionOfNoun(guests, ['гостя', 'гостей', 'гостей']);
    }
    return str;
  };

  /**
   * Проверка наличия значения для отображения или скрытия соответствующего атрибута с текстом на карточке объявления
   * @param {HTMLElement} cardAttribute - элемент карточки, значение которого меняется
   * @param {string} value - значение из объявления
   * @param {string} additionalString - строка для добавление доп. данных
   */
  var checkAttributeTextContent = function (cardAttribute, value, additionalString) {
    if (value) {
      if (additionalString) {
        cardAttribute.textContent = value + additionalString;
      } else {
        cardAttribute.textContent = value;
      }
    } else {
      cardAttribute.classList.add(window.utils.ClassForManipulation.HIDDEN);
    }
  };

  /**
   * Проверка наличия значения для отображения или скрытия соответствующего атрибута с изображением на карточке объявления
   * @param {HTMLElement} cardAttribute - элемент карточки, значение которого меняется
   * @param {string} value - значение из объявления
   */
  var checkAttributeSrc = function (cardAttribute, value) {
    if (value) {
      cardAttribute.src = value;
    } else {
      cardAttribute.classList.add(window.utils.ClassForManipulation.HIDDEN);
    }
  };

  /**
   * Проверка значений для отображения данных по вместимости на карточке объявления
   * @param {*} cardAttribute - элемент карточки, значение которого меняется
   * @param {*} rooms - количество комнат из объявления
   * @param {*} guests - количество гостей из объявления
   */
  var checkCapacity = function (cardAttribute, rooms, guests) {
    if (rooms && guests) {
      cardAttribute.textContent = switchRooms(rooms) + ' для ' + switchGuests(guests);
    } else if (rooms) {
      cardAttribute.textContent = switchRooms(rooms);
    } else if (guests) {
      cardAttribute.textContent = 'Для ' + switchRooms(guests);
    } else {
      cardAttribute.classList.add(window.utils.ClassForManipulation.HIDDEN);
    }
  };

  /**
   * Проверка значений для отображения данных по времени приытия/отбытия на карточке объявления
   * @param {HTMLElement} cardTime - элемент карточки, значение которого меняется
   * @param {string} checkin - время прибытия из объявления
   * @param {string} checkout - время отбытия из объявления
   */
  var checkTime = function (cardTime, checkin, checkout) {
    if (checkin && checkout) {
      cardTime.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    } else if (checkin) {
      cardTime.textContent = 'Заезд после ' + checkin;
    } else if (checkout) {
      cardTime.textContent = 'Выезд до ' + checkout;
    } else {
      cardTime.classList.add(window.utils.ClassForManipulation.HIDDEN);
    }
  };

  /**
   * Отрисовка карточки объявления c проверками наличия соответствующих данных для атрибутов
   * @param {Object} offerItem
   * @return {HTMLElement} карточка объявления для расположения на карте
   */
  var renderCard = function (offerItem) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var closeBtnCard = cardElement.querySelector('.popup__close');

    checkAttributeTextContent(cardElement.querySelector('.popup__title'), offerItem.offer.title);
    checkAttributeTextContent(cardElement.querySelector('.popup__text--address'), offerItem.offer.address);
    checkAttributeTextContent(cardElement.querySelector('.popup__description'), offerItem.offer.description);
    checkAttributeTextContent(cardElement.querySelector('.popup__type'), window.data.housingData[offerItem.offer.type].type);
    checkAttributeTextContent(cardElement.querySelector('.popup__text--price'), offerItem.offer.price, '₽/ночь');
    checkAttributeSrc(cardElement.querySelector('.popup__avatar'), offerItem.author.avatar);
    checkCapacity(cardElement.querySelector('.popup__text--capacity'), offerItem.offer.rooms, offerItem.offer.guests);
    checkTime(cardElement.querySelector('.popup__text--time'), offerItem.offer.checkin, offerItem.offer.checkout);

    if (offerItem.offer.features.length > 0) {
      renderFeatures(cardFeatures, offerItem.offer.features);
    } else {
      cardFeatures.classList.add(window.utils.ClassForManipulation.HIDDEN);
    }

    if (offerItem.offer.photos.length > 0) {
      renderPhotos(cardPhotos, offerItem.offer.photos);
    } else {
      cardPhotos.classList.add(window.utils.ClassForManipulation.HIDDEN);
    }

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
      window.map.map.querySelector('.' + window.utils.ClassForManipulation.PIN_ACTIVE).classList.remove(window.utils.ClassForManipulation.PIN_ACTIVE);
    }
  };

  window.card = {
    renderCard: renderCard,
    openCard: openCard,
    closeCard: closeCard
  };

})();
