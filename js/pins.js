'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var PINS_QUANTITY = 5;

  // Получение шаблона метки
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Хендлер для открытия карточки по клику на метку
  var pinClickHandler = function (evt) {
    window.card.openCard(window.filters.filteringOffers(window.data.offers)[evt.target.closest('button[offer-id]').getAttribute('offer-id')]);
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
    var pinsCount = items.length > PINS_QUANTITY ? PINS_QUANTITY : items.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsCount; i++) {
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

  var updatePins = window.utils.debounce(function () {
    window.map.map.insertBefore(window.pins.placePins(window.filters.filteringOffers(window.data.offers)), window.map.mapFiltersContainer);
  });

  window.pins = {
    PINS_QUANTITY: PINS_QUANTITY,
    renderPin: renderPin,
    placePins: placePins,
    removePins: removePins,
    updatePins: updatePins
  };

})();
