'use strict';

(function () {

  /**
   * Массив объявлений
   */
  var offers = [];

  /**
   * Параметры жилья
   */
  var housingData = {
    palace: {
      type: 'Дворец',
      price: 10000
    },

    house: {
      type: 'Дом',
      price: 5000
    },

    flat: {
      type: 'Квартира',
      price: 1000
    },

    bungalo: {
      type: 'Бунгало',
      price: 0
    }
  };

  window.data = {
    offers: offers,
    housingData: housingData
  };

})();

var examp = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },
    'offer': {
      'title': 'Уютное гнездышко для молодоженов',
      'address': '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
      'price': 42000,
      'type': 'house',
      'rooms': 3,
      'guests': 6,
      'checkin': '14:00',
      'checkout': '10:00',
      'features': [
        'wifi',
        'dishwasher',
        'parking',
        'washer',
        'elevator',
        'conditioner'
      ],
      'description': 'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
      'photos': [
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_25_b.jpg',
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_27_b.jpg',
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_17_b.jpg',
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg',
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_1_b.jpg',
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_12_b.jpg',
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_5_b.jpg'
      ]
    },
    'location': {
      'x': 428,
      'y': 493
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },
    'offer': {
      'title': 'Маленькая квартирка рядом с парком',
      'address': '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
      'price': 30000,
      'type': 'flat',
      'rooms': 1,
      'guests': 1,
      'checkin': '9:00',
      'checkout': '7:00',
      'features': [
        'elevator',
        'conditioner'
      ],
      'description': 'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
      'photos': [
        'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/01488611-c1f9-4854-ad67-9f0ad3e857e6.jpeg',
        'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d976dd4b-2a7e-415a-a2a2-afc51caf8006.jpeg'
      ]
    },
    'location': {
      'x': 471,
      'y': 545
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user03.png'
    },

    'location': {
      'x': 744,
      'y': 534
    }
  }
];


var filtering = function () {
  return examp.filter(function (item) {
    if (item.offer) {
      return item;
    }
  });
};

console.log(filtering());
