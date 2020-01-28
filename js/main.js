'use strict';

// Параметры метки
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MENU_HEIGHT = 46;

// Парметры автора
var AVATAR_URL = 'img/avatars/user0';
var AVATAR_FILE_EXTENSION = '.png';

// Параметры объявления
var OFFER_QUANTITY = 8;
var OFFER_PRICE_MIN = 1;
var OFFER_PRICE_MAX = 999999;
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

var CLASS_TO_DELETE = 'map--faded';

var Selectors = {
  // Параметры окон и блоков
  mapBlock: '.map',
  mapPins: '.map__pins',
  mapWidth: '.map__overlay',

  // Параметры шаблона метки
  pinTemplateTag: '#pin',
  pinTemplateItem: '.map__pin',

  // Атрибуты метки
  pinImg: 'img',
  pinStyle: 'style'
};

var locationXMax = Math.floor(document.querySelector(Selectors.mapWidth).offsetWidth);

// Получение случайного числа из диапазона
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Получение случайного элемента из массива
var getRandomElement = function (arrayElements) {
  return arrayElements[Math.floor(Math.random() * arrayElements.length)];
};

// Создание объявления со случайными параметрами
var createOffer = function () {
  var locationX = getRandomNumber(LOCATION_X_MIN + PIN_WIDTH / 2, locationXMax - PIN_WIDTH / 2); // С учетом ширины метки
  var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX - MENU_HEIGHT); // С учетом высоты меню
  var price = getRandomNumber(OFFER_PRICE_MIN, OFFER_PRICE_MAX);
  var type = getRandomElement(OFFER_TYPE);

  return {
    author: {
      avatar: AVATAR_URL + getRandomNumber(1, 8) + AVATAR_FILE_EXTENSION
    },
    offer: {
      title: type + ' for only ' + price + '₽!',
      address: locationX + ', ' + locationY,
      price: price,
      type: type,
      rooms: getRandomElement(OFFER_ROOMS),
      guests: getRandomElement(OFFER_GUESTS),
      checkin: getRandomElement(OFFER_CHECHIN),
      checkout: getRandomElement(OFFER_CHECHOUT),
      features: getRandomElement(OFFER_FEATURES),
      description: '',
      photos: getRandomElement(OFFER_PHOTOS)
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

// Получение шаблона метки
var pinTemplate = document.querySelector(Selectors.pinTemplateTag).content.querySelector(Selectors.pinTemplateItem);

// Отрисовка метки объявления с учетом размеров метки
var renderOfferPin = function (offerPin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector(Selectors.pinImg).src = offerPin.author.avatar;
  pinElement.querySelector(Selectors.pinImg).alt = offerPin.offer.title;
  pinElement.style.left = (offerPin.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (offerPin.location.y + PIN_HEIGHT) + 'px';

  return pinElement;
};

// Получение объявлений
var placeOffers = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderOfferPin(offers[i]));
  }
  return fragment;
};

// Отображение блока .map
var activateMap = document.querySelector(Selectors.mapBlock);
activateMap.classList.remove(CLASS_TO_DELETE);

// Отображение объявлений на блоке
activateMap.appendChild(placeOffers(generateOffers()));
