'use strict';

(function () {

  var housingSelect = window.map.mapFiltersContainer.querySelector('#housing-type');
  var housingSelectDefaultValue = housingSelect.value;

  housingSelect.addEventListener('change', function () {
    window.pins.removePins();
    window.card.closeCard();
    updatePins();
  });

  var updatePins = function () {
    window.data.offersForPins = window.data.offers.filter(function (item) {
      return housingSelect.value !== housingSelectDefaultValue ? item.offer.type === housingSelect.value : item.offer.type;
    });
    window.map.map.insertBefore(window.pins.placePins(window.data.offersForPins), window.map.mapFiltersContainer);
  };

})();
