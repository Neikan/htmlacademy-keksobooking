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

var CLASS_TO_DELETE = 'map--faded';

var Selectors = {
  // Параметры окон и блоков
  mapBlock: '.map',
  mapPins: '.map__pins',
  mapWidth: '.map__overlay',
  mapFilter: '.map__filters-container',

  // Параметры шаблона метки
  pinTemplateTag: '#pin',
  pinTemplateItem: '.map__pin',

  // Атрибуты метки
  pinImg: 'img',
  pinStyle: 'style',

  // Параметры шаблона карточки
  cardTemplateTag: '#card',
  cardTemplateItem: '.map__card',
  cardListFeature: 'li',
  cardListFeatureItem: 'popup__feature popup__feature--',
  cardPhoto: '.popup__photo',

  // Атрибуты карточки
  popupTitle: '.popup__title',
  popupAddress: '.popup__text--address',
  popupPrice: '.popup__text--price',
  popupType: '.popup__type',
  popupCapacity: '.popup__text--capacity',
  popupTime: '.popup__text--time',
  popupFeatures: '.popup__features',
  popupDescription: '.popup__description',
  popupPhotos: '.popup__photos',
  popupAvatar: '.popup__avatar'
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


// Получение перевода для типа жилья
var translateOfferType = function (offerType) {
  var roomTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return roomTypes[offerType];
};

// Создание объявления со случайными параметрами
var createOffer = function () {
  var locationX = getRandomNumber(LOCATION_X_MIN + PIN_WIDTH / 2, locationXMax - PIN_WIDTH / 2); // С учетом ширины метки
  var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX - MENU_HEIGHT); // С учетом высоты меню
  var price = getRandomNumber(OFFER_PRICE_MIN, OFFER_PRICE_MAX) * 100;
  var type = translateOfferType(getRandomElement(OFFER_TYPE));

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
var pinTemplate = document.querySelector(Selectors.pinTemplateTag).content.querySelector(Selectors.pinTemplateItem);

// Отрисовка метки объявления с учетом размеров метки
var renderOfferPin = function (offerItem) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector(Selectors.pinImg).src = offerItem.author.avatar;
  pinElement.querySelector(Selectors.pinImg).alt = offerItem.offer.title;
  pinElement.style.left = (offerItem.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (offerItem.location.y + PIN_HEIGHT) + 'px';

  return pinElement;
};

// Получение шаблона карточки
var cardTemplate = document.querySelector(Selectors.cardTemplateTag).content.querySelector(Selectors.cardTemplateItem);

// Клонирование элементов
var cloneElems = function (items, elementItemTemplate, selector) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    var elementItem = elementItemTemplate.cloneNode(true);

    if (selector === Selectors.cardListFeature) {
      elementItem.className = Selectors.cardListFeatureItem + items[i];
    }
    if (selector === Selectors.cardPhoto) {
      elementItem.src = items[i];
    }

    fragment.appendChild(elementItem);
  }
  return fragment;
};

// Получение
var addCloneElems = function (element, items, selector) {
  var elementClass = element.className;
  var elementItemTemplate = cardTemplate.querySelector('.' + elementClass + ' ' + selector);
  element.innerHTML = '';
  element.appendChild(cloneElems(items, elementItemTemplate, selector));
};

// Отрисовка карточки объявления
var renderCard = function (offerItem) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardFeatures = cardElement.querySelector(Selectors.popupFeatures);
  var cardPhotos = cardElement.querySelector(Selectors.popupPhotos);

  cardElement.querySelector(Selectors.popupTitle).textContent = offerItem.offer.title;
  cardElement.querySelector(Selectors.popupAddress).textContent = offerItem.offer.address;
  cardElement.querySelector(Selectors.popupPrice).textContent = offerItem.offer.price + '₽/ночь';
  cardElement.querySelector(Selectors.popupType).textContent = offerItem.offer.type;
  cardElement.querySelector(Selectors.popupTime).textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  cardElement.querySelector(Selectors.popupAvatar).src = offerItem.author.avatar;
  cardElement.querySelector(Selectors.popupDescription).textContent = offerItem.offer.description;

  if (offerItem.offer.guests !== 0) {
    if (offerItem.offer.rooms === 1 && offerItem.offer.guests === 1) {
      cardElement.querySelector(Selectors.popupCapacity).textContent = offerItem.offer.rooms + ' комната для ' + offerItem.offer.guests + ' гостя';
    } else {
      if (offerItem.offer.rooms === 1) {
        cardElement.querySelector(Selectors.popupCapacity).textContent = offerItem.offer.rooms + ' комната для ' + offerItem.offer.guests + ' гостей';
      }
      if (offerItem.offer.guests === 1) {
        cardElement.querySelector(Selectors.popupCapacity).textContent = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостя';
      }
      if (offerItem.offer.rooms !== 1 && offerItem.offer.guests !== 1) {
        cardElement.querySelector(Selectors.popupCapacity).textContent = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';
      }
    }
  }

  addCloneElems(cardFeatures, offerItem.offer.features, Selectors.cardListFeature);
  addCloneElems(cardPhotos, offerItem.offer.photos, Selectors.cardPhoto);

  return cardElement;
};

// Получение объявлений
var getofferItem = function (offer) {
  return document.createDocumentFragment().appendChild(renderCard(offer));
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

// Генерация объявлений
var offers = generateOffers();

// Отображение объявлений на карте
activateMap.appendChild(placeOffers(offers));

// Отображение карточки первого объявления
var filterBlock = activateMap.querySelector(Selectors.mapFilter);
activateMap.insertBefore(getofferItem(offers[0]), filterBlock);
