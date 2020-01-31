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
var OFFER_PRICE_MAX = 999;
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
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
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
  var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX - MENU_HEIGHT); // С учетом высоты меню
  var price = getRandomNumber(OFFER_PRICE_MIN, OFFER_PRICE_MAX) * 100;
  var type = roomTypes[getRandomElement(OFFER_TYPE)];

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

// Получение шаблона метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Отрисовка метки объявления с учетом размеров метки
var renderOfferPin = function (offerItem) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = offerItem.author.avatar;
  pinElement.querySelector('img').alt = offerItem.offer.title;
  pinElement.style.left = (offerItem.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (offerItem.location.y + PIN_HEIGHT) + 'px';

  return pinElement;
};

// Получение шаблона карточки
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Добавление преимуществ
var renderFeatures = function (element, features) {
  element.innerHTML = '';
  for (var i = 0; i < features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + features[i]);
    element.appendChild(featureItem);
  }
};

// Добавление фото
var renderPhotos = function (element, photos) {
  var photoItemTemplate = element.querySelector('img');
  element.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    var photoItem = photoItemTemplate.cloneNode(true);
    photoItem.src = photos[i];
    element.appendChild(photoItem);
  }
};

// Выбор строки для комнаты
var switchRooms = function (rooms) {
  var str = '';
  switch (rooms) {
    case 1:
      str = '1 комната';
      break;
    default:
      str = rooms + ' комнаты';
  }
  return str;
};

// Выбор строки для гостей
var switchGuest = function (guests) {
  var str = '';
  switch (guests) {
    case 0:
      break;
    case 1:
      str = ' для 1 гостя';
      break;
    default:
      str = ' для ' + guests + ' гостей';
  }
  return str;
};

// Отрисовка карточки объявления
var renderCard = function (offerItem) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardPhotos = cardElement.querySelector('.popup__photos');

  cardElement.querySelector('.popup__title').textContent = offerItem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerItem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerItem.offer.type;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  cardElement.querySelector('.popup__avatar').src = offerItem.author.avatar;
  cardElement.querySelector('.popup__description').textContent = offerItem.offer.description;
  cardElement.querySelector('.popup__text--capacity').textContent = switchRooms(offerItem.offer.rooms) + switchGuest(offerItem.offer.guests);
  renderFeatures(cardFeatures, offerItem.offer.features);
  renderPhotos(cardPhotos, offerItem.offer.photos);

  return cardElement;
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
var activateMap = document.querySelector('.map');
activateMap.classList.remove('map--faded');

// Генерация объявлений
var offers = generateOffers();

// Отображение объявлений на карте
activateMap.appendChild(placeOffers(offers));

// Отображение карточки первого объявления
var filterBlock = activateMap.querySelector('.map__filters-container');
activateMap.insertBefore(document.createDocumentFragment().appendChild(renderCard(offers[0])), filterBlock);
