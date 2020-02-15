'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var PINS_QUANTITY = 8;

  // Получение шаблона метки
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Хендлер для открытия карточки по клику на метку
  var pinClickHandler = function (evt) {
    window.card.openCard(window.data.offers[evt.target.closest('button[offer-id]').getAttribute('offer-id')]);
  };

  // Отрисовка метки объявления с учетом размеров метки
  var renderPin = function (offerItem, i) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = offerItem.author.avatar;
    pinElement.querySelector('img').alt = offerItem.offer.title;
    pinElement.style.left = (offerItem.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (offerItem.location.y - PIN_HEIGHT) + 'px';

    pinElement.setAttribute('offer-id', i);
    pinElement.addEventListener('click', pinClickHandler);

    return pinElement;
  };

  // Размещение объявлений
  var placePins = function (items) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PINS_QUANTITY; i++) {
      fragment.appendChild(renderPin(items[i], i));
    }
    return fragment;
  };

  var removePins = function () {
    var pinItems = document.querySelectorAll('button[offer-id]');
    pinItems.forEach(function (pinItem) {
      pinItem.remove();
    });
  };

  window.pins = {
    renderPin: renderPin,
    placePins: placePins,
    removePins: removePins
  };

})();
