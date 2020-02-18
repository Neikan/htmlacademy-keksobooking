'use strict';

(function () {

  var mapFiltersForm = document.querySelector('.map__filters');

  // Значение фильтров по умолчанию
  var defaultFilterValue = 'any';

  // Значения ценовых диапазонов
  var pricePossibleValues = {
    'low': {
      from: 0,
      to: 1000
    },
    'middle': {
      from: 10000,
      to: 50000
    },
    'high': {
      from: 50000,
      to: Infinity
    }
  };

  // Получение значений фильтров
  var getFiltersData = function () {
    var mapFilters = mapFiltersForm.querySelectorAll('select, input[type=checkbox]:checked');
    var filterItems = [];
    mapFilters.forEach(function (filter) {
      filterItems.push({
        filterName: filter.getAttribute('name'),
        filterValue: filter.value
      });
    });
    return filterItems;
  };

  // Проверка наличия выбранного доп. параметра в параметрах жилья
  var checkFeature = function (features, filterValue) {
    return features.some(function (feature) {
      return feature === filterValue;
    });
  };

  // Правила для выполнения фильтрации
  var filtersRules = {
    'housing-type': function (item, filterValue) {
      return item.offer.type === filterValue;
    },

    'housing-price': function (item, filterValue) {
      return item.offer.price >= pricePossibleValues[filterValue].from && item.offer.price < pricePossibleValues[filterValue].to;
    },

    'housing-rooms': function (item, filterValue) {
      return item.offer.rooms === parseInt(filterValue, 10);
    },

    'housing-guests': function (item, filterValue) {
      return item.offer.guests === parseInt(filterValue, 10);
    },

    'features': function (item, filterValue) {
      return checkFeature(item.offer.features, filterValue);
    },
  };

  // Фильтрация объявлений
  var filteringOffers = function (offers) {
    return offers.filter(function (item) {
      return getFiltersData().every(function (element) {
        return (element.filterValue === defaultFilterValue) ? true : filtersRules[element.filterName](item, element.filterValue);
      });
    }).slice(0, window.pins.PINS_QUANTITY);
  };

  var mapFiltersFormChangeHandler = function () {
    window.card.closeCard();
    window.pins.removePins();
    window.pins.updatePins();
  };

  window.filters = {
    filteringOffers: filteringOffers,
    mapFiltersForm: mapFiltersForm,
    mapFiltersFormChangeHandler: mapFiltersFormChangeHandler
  };

})();
