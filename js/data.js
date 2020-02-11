'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // Парметры автора
  var AVATAR_URL = 'img/avatars/user0';
  var AVATAR_FILE_EXTENSION = '.png';

  // Параметры объявления
  var OFFER_QUANTITY = 8;
  var OFFER_PRICE_MIN = 1;
  var OFFER_PRICE_MAX = 99;
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_ROOMS = [1, 2, 3];
  var OFFER_GUESTS = [0, 1, 2];
  var OFFER_CHECHIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECHOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var LOCATION_X_MIN = 0;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

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

  var locationXMax = Math.floor(document.querySelector('.map__overlay').offsetWidth);

  // Получение случайного числа из диапазона
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  // Получение случайного элемента из массива
  var getRandomElement = function (arrayElements) {
    return arrayElements[Math.floor(Math.random() * arrayElements.length)];
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

  // Получение подмассива из массива
  var getRandomArray = function (array) {
    var lengthNewArray = getRandomNumber(0, array.length);
    var subArray = [];
    for (var i = 0; i < lengthNewArray; i++) {
      subArray.push(array[i]);
    }
    return subArray;
  };

  // Создание объявления со случайными параметрами
  var createOffer = function () {
    var locationX = getRandomNumber(LOCATION_X_MIN + PIN_WIDTH / 2, locationXMax - PIN_WIDTH / 2); // С учетом ширины метки
    var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var typeEng = getRandomElement(OFFER_TYPE);
    var type = roomTypes[typeEng];
    var price = getRandomNumber(OFFER_PRICE_MIN, OFFER_PRICE_MAX) * RoomPrices[typeEng];

    return {
      author: {
        avatar: AVATAR_URL + getRandomNumber(1, 8) + AVATAR_FILE_EXTENSION
      },
      offer: {
        title: type + '! Только сейчас! И всего лишь за ' + price + '₽/ночь!',
        address: locationX + ', ' + locationY,
        price: price,
        type: type,
        rooms: getRandomElement(OFFER_ROOMS),
        guests: getRandomElement(OFFER_GUESTS),
        checkin: getRandomElement(OFFER_CHECHIN),
        checkout: getRandomElement(OFFER_CHECHOUT),
        features: getRandomArray(getShuffleArray(OFFER_FEATURES)),
        description: '{description}',
        photos: getRandomArray(getShuffleArray(OFFER_PHOTOS))
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  // Генерация объявлений
  var generateOffers = function () {
    var offers = [];
    for (var i = 0; i < OFFER_QUANTITY; i++) {
      offers.push(createOffer());
    }
    return offers;
  };

  var offers = generateOffers();

  window.data = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    locationXMax: locationXMax,
    RoomPrices: RoomPrices,
    createOffer: createOffer,
    generateOffers: generateOffers,
    offers: offers
  };

})();
