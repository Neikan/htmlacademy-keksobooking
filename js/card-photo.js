'use strict';

(function () {

  /**
   * Создание окна для отображения изображения объявления
   * @param {string} src - адрес изображения, которое будет отображено
   * @return {HTMLElement} - элемент для отображения на странице
   */
  var createPhotoDisplay = function (src) {
    var container = document.createElement('div');

    var itemImg = document.createElement('img');
    itemImg.src = src;

    var itemButton = document.createElement('button');
    itemButton.setAttribute('type', 'button');
    itemButton.classList.add(window.utils.ClassForManipulation.BUTTON_CLOSE);

    container.classList.add(window.utils.ClassForManipulation.MAP_CARD_PHOTO);
    container.appendChild(itemImg);
    container.appendChild(itemButton);

    return container;
  };

  /**
   * Закрытие окна изображения
   */
  var closePhotoDisplay = function () {
    if (document.querySelector('.' + window.utils.ClassForManipulation.MAP_CARD_PHOTO)) {
      document.querySelector('.' + window.utils.ClassForManipulation.MAP_CARD_PHOTO).remove();
    }
  };

  /**
   * Отображение окна изображения
   * @param {event} evt
   */
  var renderPhotoDisplay = function (evt) {
    closePhotoDisplay();
    document.querySelector('.popup').appendChild(createPhotoDisplay(evt.target.src));
    document.querySelector('.' + window.utils.ClassForManipulation.MAP_CARD_PHOTO).querySelector('.' + window.utils.ClassForManipulation.BUTTON_CLOSE).addEventListener('click', buttonClosePhotoItemClickHandler);
    document.querySelector('.popup').addEventListener('keydown', buttonClosePhotoItemKeyDownkHandler);
  };

  /**
   * Помощник, обеспечивающий закрытие окна по клику по кнопке закрытия
   */
  var buttonClosePhotoItemClickHandler = function () {
    closePhotoDisplay();
  };

  /**
   * Помощник, обеспечивающий закрытие окна по нажатию клавиши ESC
   * @param {event} evt
   */
  var buttonClosePhotoItemKeyDownkHandler = function (evt) {
    if (evt.keyCode === window.utils.KeyCode.ESC) {
      closePhotoDisplay();
    }
  };

  /**
   * Помощник, обеспечивающий открытие окна изображения
   * @param {event} evt
   */
  var photoItemClickHandler = function (evt) {
    renderPhotoDisplay(evt);
  };

  window.cardPhoto = {
    closePhotoDisplay: closePhotoDisplay,
    photoItemClickHandler: photoItemClickHandler
  };
})();
