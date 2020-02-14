'use strict';

(function () {

  var offers;

  var roomTypes = {
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира',
    bungalo: 'Бунгало'
  };

  var RoomPrices = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalo: 0
  };

  window.data = {
    offers: offers,
    roomTypes: roomTypes,
    RoomPrices: RoomPrices
  };

})();
