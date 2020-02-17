'use strict';

(function () {

  var defaultFilterValue = 'any';

  var housingSelect = window.map.mapFiltersContainer.querySelector('#housing-type');

  housingSelect.addEventListener('change', function () {
    window.card.closeCard();
    window.pins.removePins();
    window.pins.updatePins();
  });

  var filteringOffers = function (offers) {
    var filteredOffers = offers.filter(function (item) {
      return housingSelect.value !== defaultFilterValue ? item.offer.type === housingSelect.value : item.offer.type;
    });
    return filteredOffers.slice(0, window.pins.PINS_QUANTITY);
  };

  window.filters = {
    filteringOffers: filteringOffers
  };

})();
