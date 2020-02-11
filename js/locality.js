'use strict';

(function () {

  var MAIN_PIN_AFTER_HEIGHT = 17; // 22px - 5px border

  var mainPin = document.querySelector('.map__pin--main');

  var limitMainPin = {
    left: window.data.LOCATION_X_MIN - Math.round(mainPin.offsetWidth / 2),
    right: window.data.locationXMax - Math.round(mainPin.offsetWidth / 2),
    top: window.data.LOCATION_Y_MIN - mainPin.offsetHeight - MAIN_PIN_AFTER_HEIGHT,
    bottom: window.data.LOCATION_Y_MAX - mainPin.offsetHeight - MAIN_PIN_AFTER_HEIGHT
  };

  // Получение координат главной метки для адреса
  var getAddress = function (isEnablePage) {
    var adFormAddressX = Math.round(parseInt(mainPin.style.left, 10) + Math.round(mainPin.offsetWidth / 2));
    var adFormAddressY = Math.round(parseInt(mainPin.style.top, 10) + Math.round(mainPin.offsetWidth / 2));
    if (isEnablePage) {
      adFormAddressY += Math.round(mainPin.clientHeight / 2) + MAIN_PIN_AFTER_HEIGHT;
    }
    window.form.adFormAddress.value = adFormAddressX + ', ' + adFormAddressY;
  };

  // Проверка области перемещения
  var checkLimitMainPinCoordinates = function () {

    if (mainPin.offsetLeft <= limitMainPin.left) {
      mainPin.style.left = limitMainPin.left + 'px';
    }
    if (mainPin.offsetLeft >= limitMainPin.right) {
      mainPin.style.left = limitMainPin.right + 'px';
    }
    if (mainPin.offsetTop <= limitMainPin.top) {
      mainPin.style.top = limitMainPin.top + 'px';
    }
    if (mainPin.offsetTop >= limitMainPin.bottom) {
      mainPin.style.top = limitMainPin.bottom + 'px';
    }
  };

  // Перемещение главной метки
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.buttons === 1) {
      evt.preventDefault();

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mainPinMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var newCoordinates = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.left = mainPin.offsetLeft - newCoordinates.x + 'px';
        mainPin.style.top = mainPin.offsetTop - newCoordinates.y + 'px';

        checkLimitMainPinCoordinates();
        getAddress(true);
      };

      var mainPinMouseUpHandler = function () {
        document.removeEventListener('mousemove', mainPinMouseMoveHandler);
        document.removeEventListener('mouseup', mainPinMouseUpHandler);
      };

      document.addEventListener('mousemove', mainPinMouseMoveHandler);
      document.addEventListener('mouseup', mainPinMouseUpHandler);
    }
  });

  window.locality = {
    mainPin: mainPin,
    getAddress: getAddress
  };

})();
