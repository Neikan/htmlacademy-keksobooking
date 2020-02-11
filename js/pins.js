'use strict';

(function () {

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
    pinElement.style.left = (offerItem.location.x - window.data.PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (offerItem.location.y - window.data.PIN_HEIGHT) + 'px';

    pinElement.setAttribute('offer-id', i);
    pinElement.addEventListener('click', pinClickHandler);

    return pinElement;
  };

  // Размещение объявлений
  var placePins = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderPin(offers[i], i));
    }
    return fragment;
  };

  window.pins = {
    renderPin: renderPin,
    placePins: placePins
  };

})();
