'use strict';

(function () {

  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  // Включение элементов
  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  // Отключение элементов
  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  // Получение случайного числа из диапазона
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  // Получение случайного элемента из массива
  var getRandomElement = function (arrayElements) {
    return arrayElements[Math.floor(Math.random() * arrayElements.length)];
  };

  // Получение подмассива из массива
  var getRandomArray = function (array) {
    var lengthNewArray = getRandomNumber(0, array.length);
    var subArray = [];
    for (var i = 0; i < lengthNewArray; i++) {
      subArray.push(array[i]);
    }
    return subArray;
  };

  // Перемешивание массива
  var getShuffleArray = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  window.utils = {
    KEYCODE_ENTER: KEYCODE_ENTER,
    KEYCODE_ESC: KEYCODE_ESC,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray,
    getShuffleArray: getShuffleArray,
    enableElements: enableElements,
    disableElements: disableElements
  };

})();
