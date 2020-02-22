'use strict';

(function () {

  /**
   * Параметры меток и их количество
   */
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PINS_QUANTITY = 5;

  /**
   * Шаблон метки
   */
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * Помощник, открывающий карточку объявления по клику на метке
   * @param {event} evt
   */
  var pinClickHandler = function (evt) {
    var targetPin = evt.target.closest('button[offer-id]');
    // window.utils.removeClassForElements(document.querySelectorAll('button[offer-id]'), window.utils.ClassForManipulation.PIN_ACTIVE);
    targetPin.classList.add(window.utils.ClassForManipulation.PIN_ACTIVE);
    window.card.openCard(window.filters.filteringOffers(window.data.offers)[targetPin.getAttribute('offer-id')]);
  };

  /**
   * Отрисовка метки объявления с учетом размеров метки
   * @param {Object} offerItem - элемент массива объявлений
   * @param {number} i - идентификатор элемента массива объявлений
   * @return {HTMLElement} - метка для добавления на карту
   */
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

  /**
   * Размещение объявлений
   * @param {array} items - массив объявлений
   * @return {HTMLElement} - фрагмент документа с HTML-элементами меток для добавления
   */
  var placePins = function (items) {
    var pinsCount = items.length > PINS_QUANTITY ? PINS_QUANTITY : items.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(renderPin(items[i], i));
    }
    return fragment;
  };

  /**
   * Удаление меток с карты
   */
  var removePins = function () {
    document.querySelectorAll('button[offer-id]').forEach(function (pinItem) {
      pinItem.remove();
    });
  };

  /**
   * Обновление меток на карте
   */
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
