'use strict';

// Параметры меток
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_AFTER_HEIGHT = 16; // 22px - 6px padding
var MENU_HEIGHT = 46;

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

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

var MIN_TITLE_LENGTH = 2; // Потом поменять на 30 согласно ТЗ
var MAX_TITLE_LENGTH = 100;

var MAX_PRICE = 1000000;

var roomTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var roomPrices = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};

var locationXMax = Math.floor(document.querySelector('.map__overlay').offsetWidth);

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');

var filterBlock = map.querySelector('.map__filters-container');
var mapFilters = map.querySelectorAll('input, select, fieldset');
var adFormFieldsets = adForm.querySelectorAll('input, select, fieldset');

// Атрибуты формы объявления
var adFormAvatar = adForm.querySelector('#avatar');
var adFormTitle = adForm.querySelector('#title');
var adFormRoom = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var adFormAddress = adForm.querySelector('#address');
var adFormType = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormPhotos = adForm.querySelector('#images');

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
  var typeEng = getRandomElement(OFFER_TYPE);
  var type = roomTypes[typeEng];
  var price = getRandomNumber(OFFER_PRICE_MIN, OFFER_PRICE_MAX) * roomPrices[typeEng];

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
var renderOfferPin = function (offerItem, i) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = offerItem.author.avatar;
  pinElement.querySelector('img').alt = offerItem.offer.title;
  pinElement.style.left = (offerItem.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (offerItem.location.y + PIN_HEIGHT) + 'px';

  pinElement.setAttribute('tabindex', 0);
  pinElement.setAttribute('offer-id', i);
  pinElement.addEventListener('click', pinClickHandler);

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
  var closeBtnCard = cardElement.querySelector('.popup__close');

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

  cardElement.setAttribute('tabindex', 0);

  cardElement.addEventListener('keydown', cardKeyDownHandler);
  closeBtnCard.addEventListener('click', closeBtnCardClickHandler);

  return cardElement;
};

// Открытие карточки объявления
var openCard = function (offer) {
  closeCard();
  map.insertBefore(document.createDocumentFragment().appendChild(renderCard(offer)), filterBlock);
};

// Закрытие карточки объявления
var closeCard = function () {
  var card = map.querySelector('.popup');
  if (card) {
    card.remove();
    map.removeEventListener('click', closeBtnCardClickHandler);
    map.removeEventListener('keydown', cardKeyDownHandler);
  }
};

// Получение объявлений
var placeOffers = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderOfferPin(offers[i], i));
  }
  return fragment;
};

// Генерация объявлений
var offers = generateOffers();

// Органичения для названия объявления
adFormTitle.setAttribute('minlength', MIN_TITLE_LENGTH);
adFormTitle.setAttribute('maxlength', MAX_TITLE_LENGTH);
adFormTitle.setAttribute('required', true);

// Органичения и предустановки для цены
adFormPrice.placeholder = roomPrices[adFormType.value];
adFormPrice.min = roomPrices[adFormType.value];
adFormPrice.max = MAX_PRICE;
adFormPrice.setAttribute('required', true);

// Установка ограничений на загрузку типов файлов
adFormAvatar.setAttribute('accept', 'image/png, image/jpeg');
adFormPhotos.setAttribute('accept', 'image/png, image/jpeg');

// Отключение элементов
var disableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', true);
  }
};

// Включение элементов
var enableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

// Хендлеры
var mainPinMouseDownHandler = function (evt) {
  if (evt.buttons === 1) {
    enablePage();
  }
};

var mainPinKeyDownHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    enablePage();
  }
};

var adFormChangeHandler = function (evt) {
  validationForm(evt);
};

var closeBtnCardClickHandler = function () {
  closeCard();
};

var cardKeyDownHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closeCard();
  }
};

var pinClickHandler = function (evt) {
  openCard(offers[evt.target.closest('button[offer-id]').getAttribute('offer-id')]);
};

// Прослушка событий на главной метке
mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
mainPin.addEventListener('keydown', mainPinKeyDownHandler);

// Получение и деактивация ввода адреса
var getAndDisableAddress = function (isEnablePage) {
  adFormAddress.setAttribute('disabled', true);
  adFormAddress.classList.add('ad-form--disabled');
  var adFormAddressX = Math.round(parseInt(mainPin.style.left, 10) + mainPin.clientWidth / 2);
  var adFormAddressY = Math.round(parseInt(mainPin.style.top, 10) + mainPin.clientHeight / 2);
  if (isEnablePage) {
    adFormAddressY += Math.round(mainPin.clientHeight / 2 + MAIN_PIN_AFTER_HEIGHT);
  }
  adFormAddress.value = adFormAddressX + ', ' + adFormAddressY;
};

// Валидация количества гостей и комнат
var validateRoomAndCapacity = function () {
  switch (true) {
    case (adFormRoom.value === '100' && adFormCapacity.value !== '0'):
      adFormRoom.setCustomValidity('Для выбранного количества комнат размещение гостей невозможно');
      break;
    case (adFormRoom.value !== '100' && adFormCapacity.value === '0'):
      adFormCapacity.setCustomValidity('Выбранное количество комнат предназначено для гостей');
      break;
    case (adFormRoom.value < adFormCapacity.value && adFormCapacity.value !== 0):
      adFormCapacity.setCustomValidity('Количество гостей больше, чем комнат. Пожалуйста, укажите количество гостей, равное или меньшее, чем количество комнат');
      break;
    default:
      adFormRoom.setCustomValidity('');
      adFormCapacity.setCustomValidity('');
  }
};

// Валидация времени заезда/отъезда
var validateTime = function (evt) {
  if (evt.target === adFormTimeIn) {
    adFormTimeOut.value = adFormTimeIn.value;
  } else {
    adFormTimeIn.value = adFormTimeOut.value;
  }
};

// Валидация всей формы
var validationForm = function (evt) {
  switch (evt.target) {
    case (adFormTimeIn || adFormTimeOut):
      validateTime(evt);
      break;

    case (adFormRoom || adFormCapacity):
      validateRoomAndCapacity();
      break;

    default:
      validateRoomAndCapacity();
  }
};

// Неактивное состояние страницы
var disablePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  disableElements(mapFilters);
  disableElements(adFormFieldsets);
  getAndDisableAddress(false);

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  adForm.removeEventListener('change', adFormChangeHandler);
};

disablePage();

// Активное состояние страницы
var enablePage = function () {
  mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
  // adForm.setAttribute('action', 'https://js.dump.academy/keksobooking/data'); // П.5 из ТЗ

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormAddress.classList.add('ad-form--disabled');
  enableElements(mapFilters);
  enableElements(adFormFieldsets);

  map.insertBefore(placeOffers(offers), filterBlock);
  map.insertBefore(document.createDocumentFragment().appendChild(renderCard(offers[0])), filterBlock);

  getAndDisableAddress(true);

  mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.removeEventListener('keydown', mainPinKeyDownHandler);

  adForm.addEventListener('change', adFormChangeHandler);
};
