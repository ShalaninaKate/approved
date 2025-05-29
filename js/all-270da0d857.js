/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/components/counter.js
function counter() {
  var label = document.querySelector('#counter__label');
  var btn = document.querySelector('#counter__btn');
  if (!label || !btn) return;
  var counter = 0;
  render();
  btn.addEventListener('click', function () {
    counter++;
    render();
  });
  function render() {
    label.innerHTML = counter;
  }
}
;// ./src/js/components/preloader.js
function hidePreloader() {
  var preloaders = document.querySelectorAll('.preloader');
  if (preloaders && preloaders.length) {
    preloaders.forEach(function (preloader) {
      preloader.classList.add('preloader_hidden');
      setTimeout(function () {
        preloader.remove();
      }, 600);
    });
  }
}
;// ./src/js/components/functions.js
var _document;
window.addEventListener('load', function () {
  document.body.classList.add('loaded');
});
if ((_document = document) !== null && _document !== void 0 && _document.body) {
  document.body.classList.add('loaded');
}
var unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
  var hsh = location.hash.replace('#', '');
  if (document.querySelector('.popup_' + hsh)) {
    popup_open(hsh);
  } else if (document.querySelector('div.' + hsh)) {
    _goto(document.querySelector('.' + hsh), 500, '');
  }
}
//=================
//Menu
var iconMenu = document.querySelector('.icon-menu');
if (iconMenu != null) {
  var delay = 500;
  var menuBody = document.querySelector('.menu__body');
  iconMenu.addEventListener('click', function (e) {
    if (unlock) {
      body_lock(delay);
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    }
  });
}
function menu_close() {
  var iconMenu = document.querySelector('.icon-menu');
  var menuBody = document.querySelector('.menu__body');
  iconMenu.classList.remove('_active');
  menuBody.classList.remove('_active');
}
//=================
//BodyLock
function body_lock(delay) {
  var body = document.querySelector('body');
  if (body.classList.contains('_lock')) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
function body_lock_remove(delay) {
  var body = document.querySelector('body');
  if (unlock) {
    var lock_padding = document.querySelectorAll('._lp');
    setTimeout(function () {
      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
    }, delay);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function body_lock_add(delay) {
  var body = document.querySelector('body');
  if (unlock) {
    var lock_padding = document.querySelectorAll('._lp');
    for (var index = 0; index < lock_padding.length; index++) {
      var el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add('_lock');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
var filterOpenBtns = document.querySelectorAll('.filters-open');
var filterCloseBtns = document.querySelectorAll('.filters-close');
var filtersPanel = document.querySelector('.filter-reviews');
var filterOverlay = document.querySelector('.filter-overlay');
var filterDelay = 500;
if (filtersPanel && filterOverlay) {
  filterOpenBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (unlock) {
        filtersPanel.classList.add('_active');
        filterOverlay.classList.add('_active');
        body_lock(filterDelay);
      }
    });
  });
  filterCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (unlock) {
        filtersPanel.classList.remove('_active');
        filterOverlay.classList.remove('_active');
        body_lock(filterDelay);
      }
    });
  });

  // Закрытие по клику на фон
  filterOverlay.addEventListener('click', function () {
    if (unlock) {
      filtersPanel.classList.remove('_active');
      filterOverlay.classList.remove('_active');
      body_lock(filterDelay);
    }
  });
}
var functions_forms = document.querySelectorAll('.form');
if (functions_forms) {
  functions_forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  });
}
function initDropdowns() {
  var dropdowns = document.querySelectorAll('.input-select');
  dropdowns.forEach(function (dropdown) {
    var dropdownInput = dropdown.querySelector('.dropdown-input');
    var dropdownButton = dropdown.querySelector('.dropdown-button');
    var dropdownItemsWrapper = dropdown.querySelector('.dropdown-select');
    var dropdownIcon = dropdown.querySelector('.input__icon');
    var currentToken = {
      text: dropdownInput.value,
      icon: dropdownIcon ? dropdownIcon.getAttribute('src') : null
    };
    function toggleDropdown() {
      dropdown.classList.toggle('show');
    }
    function selectItem(event) {
      var item = event.currentTarget;
      var newText = item.querySelector('span').textContent;
      var newIconImg = item.querySelector('img');
      var newIconSrc = newIconImg ? newIconImg.getAttribute('src') : null;

      // 1. Создаём новый элемент для возврата текущего токена в список
      var oldItem = document.createElement('li');
      oldItem.classList.add('dropdown-select__item');
      if (currentToken.icon) {
        var oldImg = document.createElement('img');
        oldImg.classList.add('dropdown-select__icon');
        oldImg.setAttribute('src', currentToken.icon);
        oldItem.appendChild(oldImg);
      }
      var oldSpan = document.createElement('span');
      oldSpan.textContent = currentToken.text;
      oldItem.appendChild(oldSpan);
      dropdownItemsWrapper.appendChild(oldItem);
      oldItem.addEventListener('click', selectItem);

      // 2. Обновляем input и иконку
      dropdownInput.value = newText;
      if (dropdownIcon && newIconSrc) {
        dropdownIcon.setAttribute('src', newIconSrc);
      } else if (dropdownIcon && !newIconSrc) {
        dropdownIcon.removeAttribute('src');
      }

      // 3. Удаляем выбранный элемент из списка
      item.remove();

      // 4. Обновляем текущий токен
      currentToken = {
        text: newText,
        icon: newIconSrc
      };
      dropdown.classList.remove('show');
    }
    function closeDropdown(event) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
      }
    }
    dropdownInput.addEventListener('click', toggleDropdown);
    dropdownButton.addEventListener('click', toggleDropdown);
    dropdown.querySelectorAll('.dropdown-select__item').forEach(function (item) {
      return item.addEventListener('click', selectItem);
    });
    document.addEventListener('click', closeDropdown);
  });
}
if (document.querySelector('.input-select')) {
  initDropdowns();
}

//=================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
var spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
  // Инициализация
  var initSpollers = function initSpollers(spollersArray) {
    var matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    spollersArray.forEach(function (spollersBlock) {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init');
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener('click', setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener('click', setSpollerAction);
      }
    });
  }; // Работа с контентом
  var initSpollerBody = function initSpollerBody(spollersBlock) {
    var hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(function (spollerTitle) {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          // spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  };
  var setSpollerAction = function setSpollerAction(e) {
    var el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      var spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
      var spollersBlock = spollerTitle.closest('[data-spollers]');
      var oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_active');
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  };
  var hideSpollersBody = function hideSpollersBody(spollersBlock) {
    var spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  };
  // Получение обычных слойлеров
  var spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(',')[0];
  });
  // Инициализация обычных слойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Получение слойлеров с медиа запросами
  var spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(',')[0];
  });

  // Инициализация слойлеров с медиа запросами
  if (spollersMedia.length > 0) {
    var breakpointsArray = [];
    spollersMedia.forEach(function (item) {
      var params = item.dataset.spollers;
      var breakpoint = {};
      var paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    var mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach(function (breakpoint) {
      var paramsArray = breakpoint.split(',');
      var mediaBreakpoint = paramsArray[1];
      var mediaType = paramsArray[2];
      var matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с нужными условиями
      var spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      // Событие
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
}
var btnShowPassword = document.querySelectorAll('.show-pass');
if (btnShowPassword) {
  btnShowPassword.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('show');
      if (this.classList.contains('show')) {
        this.parentElement.querySelector('.input__control').type = 'text';
        this.parentElement.querySelector('.input__control').focus();
      } else {
        this.parentElement.querySelector('.input__control').type = 'password';
      }
    });
  });
}

//=================
//SlideToggle
var _slideUp = function _slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
var _slideDown = function _slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
var _slideToggle = function _slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

//Полифилы
(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})();
;// ./src/js/components/loaded.js
function loaded() {
  var animItems = document.querySelectorAll('.animate');
  if (animItems.length > 0) {
    var animOnScroll = function animOnScroll() {
      for (var index = 0; index < animItems.length; index++) {
        var animItem = animItems[index];
        var animItemHeight = animItem.offsetHeight;
        var animItemOffset = offset(animItem).top;

        // Условие: элемент должен быть полностью в зоне видимости
        var animItemPoint = window.innerHeight - animItemHeight;
        if (pageYOffset > animItemOffset - animItemPoint + 10 && pageYOffset < animItemOffset + animItemHeight) {
          animItem.classList.add('loaded');
        } else {
          if (!animItem.classList.contains('_anim-no-hide')) {
            animItem.classList.remove('loaded');
          }
        }
      }
    };
    var offset = function offset(el) {
      var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    };
    window.addEventListener('scroll', animOnScroll);
    setTimeout(function () {
      animOnScroll();
    }, 300);
  }
}
;// ./src/js/components/digitsCounter.js
var digitsCounterInitialized = false;
function digitsCounter() {
  if (digitsCounterInitialized) return;
  digitsCounterInitialized = true;
  // Обнуление значений
  if (document.querySelectorAll('[data-digits-counter]').length) {
    document.querySelectorAll('[data-digits-counter]').forEach(function (element) {
      element.dataset.digitsCounter = element.innerHTML;
      element.innerHTML = "0";
    });
  }

  // Функция анимации счетчика
  function digitsCountersAnimate(digitsCounter) {
    var startTimestamp = null;
    var duration = parseInt(digitsCounter.dataset.digitsCounterSpeed) || 1000; // Скорость анимации (по умолчанию 1000 мс)
    var startValue = parseInt(digitsCounter.dataset.digitsCounter); // Конечное значение
    var startPosition = 0; // Начальное значение (0)

    var _step = function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      var progress = Math.min((timestamp - startTimestamp) / duration, 1); // Прогресс (0 до 1)
      digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue)); // Текущее значение

      if (progress < 1) {
        window.requestAnimationFrame(_step); // Продолжение анимации
      }
    };
    window.requestAnimationFrame(_step); // Запуск анимации
  }

  // Настройка Intersection Observer
  function digitsCountersInit() {
    var observerOptions = {
      threshold: 0.2 // Половина элемента должна быть видна
    };
    var observerCallback = function observerCallback(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Если элемент в зоне видимости
          var target = entry.target;

          // Добавляем задержку в 2 секунды перед началом анимации
          setTimeout(function () {
            digitsCountersAnimate(target); // Запуск анимации
            observer.unobserve(target); // Снять наблюдение после анимации
          }, 100); // Задержка в 2000 мс (2 секунды)
        }
      });
    };
    var observer = new IntersectionObserver(observerCallback, observerOptions);

    // Подключаем observer к каждому элементу с data-digits-counter
    document.querySelectorAll('[data-digits-counter]').forEach(function (element) {
      observer.observe(element);
    });
  }

  // Запуск функции
  digitsCountersInit();
}
;// ./src/js/components/dropdown.js
var isDropdownInitialized = false;
function dropdown() {
  var dropdownItems = document.querySelectorAll('.dropdown-item');
  if (dropdownItems.length > 0) {
    dropdownItems.forEach(function (item) {
      var btn = item.querySelector('.dropdown-btn');
      var closeBtn = item.querySelector('.dropdown .dropdown-close');
      if (btn && !btn.dataset.listenerAttached) {
        btn.dataset.listenerAttached = 'true';
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          dropdownItems.forEach(function (el) {
            if (el !== item) el.classList.remove('active');
          });
          item.classList.toggle('active');
        });
      }
      if (closeBtn && !closeBtn.dataset.listenerAttached) {
        closeBtn.dataset.listenerAttached = 'true';
        closeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          item.classList.remove('active');
        });
      }
    });
    if (!isDropdownInitialized) {
      isDropdownInitialized = true;
      document.body.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown-item')) {
          dropdownItems.forEach(function (item) {
            return item.classList.remove('active');
          });
        }
      }, true);
    }
  }
}
;// ./src/js/components/gauge.js
function updateGauge(value) {
  // Расчет угла поворота
  var angle = value / 100 * 180 - 90;

  // Установка угла поворота
  var wrapper = document.querySelector('.gauge__arrow-wrapper');
  if (wrapper) {
    wrapper.style.setProperty('--angle', "".concat(angle, "deg"));
  }

  // Выбор цвета по значению
  var color;
  if (value <= 20) {
    color = 'var(--red)';
  } else if (value <= 40) {
    color = 'var(--light-red)';
  } else if (value <= 60) {
    color = 'var(--orange)';
  } else if (value <= 80) {
    color = 'var(--teal)';
  } else {
    color = 'var(--green)';
  }
  var arrowWrapper = document.querySelector('.gauge__arrow');
  if (arrowWrapper) {
    arrowWrapper.style.setProperty('--color', color);
  }
}
;// ./src/js/components/setReviewBars.js
function setReviewBars() {
  var items = document.querySelectorAll('.filter-company-reviews__item');
  items.forEach(function (item) {
    var valueElement = item.querySelector('.filter-company-reviews__value');
    var bar = item.querySelector('.filter-company-reviews__percent');
    if (valueElement && bar) {
      var percentText = valueElement.textContent.trim();
      var percent = parseFloat(percentText.replace('%', '')) || 0;
      bar.style.width = "".concat(percent, "%");
    }
  });
}
;// ./src/js/components/modal.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Modal = /*#__PURE__*/function () {
  function Modal(options) {
    _classCallCheck(this, Modal);
    var defaultOptions = {
      isOpen: function isOpen() {},
      isClose: function isClose() {}
    };
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.modal');
    this.speed = '';
    this.animation = '';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = ['a[href]', 'input', 'select', 'textarea', 'button', 'iframe', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }
  return _createClass(Modal, [{
    key: "events",
    value: function events() {
      if (this.modal) {
        document.addEventListener('click', function (e) {
          var clickedElement = e.target.closest("[data-path]");
          if (clickedElement) {
            var target = clickedElement.dataset.path;
            var animation = clickedElement.dataset.animation;
            var speed = clickedElement.dataset.speed;
            this.animation = animation ? animation : 'fade';
            this.speed = speed ? parseInt(speed) : 500;
            this._nextContainer = document.querySelector("[data-target=\"".concat(target, "\"]"));
            this.open();
            return;
          }
          if (e.target.closest('.js-modal-close')) {
            this.close();
            return;
          }
        }.bind(this));
        window.addEventListener('keydown', function (e) {
          if (e.keyCode == 27 && this.isOpen) {
            this.close();
          }
          if (e.which == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }
        }.bind(this));
        document.addEventListener('click', function (e) {
          if (e.target.classList.contains('modal') && e.target.classList.contains('is-open')) {
            this.close();
          }
        }.bind(this));
      }
    }
  }, {
    key: "open",
    value: function open(selector) {
      var _this = this;
      this.previousActiveElement = document.activeElement;
      if (this.isOpen) {
        this.reOpen = true;
        this.close();
        return;
      }
      this.modalContainer = this._nextContainer;
      if (selector) {
        this.modalContainer = document.querySelector("[data-target=\"".concat(selector, "\"]"));
      }
      this.modalContainer.scrollTo(0, 0);
      this.modal.style.setProperty('--transition-time', "".concat(this.speed / 1000, "s"));
      this.modal.classList.add('is-open');
      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';
      this.disableScroll();
      this.modalContainer.classList.add('modal-open');
      this.modalContainer.classList.add(this.animation);

      // setTimeout(() => {

      // 	this.modalContainer.classList.add('animate-open');

      // }, 0);
      setTimeout(function () {
        _this.modalContainer.classList.add('animate-open');
        _this.options.isOpen(_this);
        _this.isOpen = true;
        _this.focusTrap();
      }, this.speed);
    }
  }, {
    key: "close",
    value: function close() {
      if (this.modalContainer) {
        this.modalContainer.classList.remove('animate-open');
        this.modal.classList.remove('is-open');
        this.modalContainer.classList.remove(this.animation);
        this.modalContainer.classList.remove('modal-open');
        // setTimeout(() => {

        // }, this.speed);

        this.enableScroll();
        document.body.style.scrollBehavior = 'auto';
        document.documentElement.style.scrollBehavior = 'auto';
        this.options.isClose(this);
        this.isOpen = false;
        this.focusTrap();
        if (this.reOpen) {
          this.reOpen = false;
          this.open();
        }
      }
    }
  }, {
    key: "focusCatch",
    value: function focusCatch(e) {
      var nodes = this.modalContainer.querySelectorAll(this._focusElements);
      var nodesArray = Array.prototype.slice.call(nodes);
      var focusedItemIndex = nodesArray.indexOf(document.activeElement);
      if (e.shiftKey && focusedItemIndex === 0) {
        nodesArray[nodesArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
        nodesArray[0].focus();
        e.preventDefault();
      }
    }
  }, {
    key: "focusTrap",
    value: function focusTrap() {
      var nodes = this.modalContainer.querySelectorAll(this._focusElements);
      if (this.isOpen) {
        if (nodes.length) nodes[0].focus();
      } else {
        this.previousActiveElement.focus();
      }
    }
  }, {
    key: "disableScroll",
    value: function disableScroll() {
      var pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      var pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scrollTo({
        top: pagePosition,
        left: 0
      });
      document.body.removeAttribute('data-position');
    }
  }, {
    key: "lockPadding",
    value: function lockPadding() {
      var paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this._fixBlocks.forEach(function (el) {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    }
  }, {
    key: "unlockPadding",
    value: function unlockPadding() {
      this._fixBlocks.forEach(function (el) {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    }
  }]);
}();
var modal = new Modal({
  isOpen: function isOpen(modal) {
    console.log('opened');
  },
  isClose: function isClose() {
    console.log('closed');
  }

  // new Modal().open('second');
});
;// ./src/js/index.js









window.addEventListener('load', function () {
  init();
});
init();
function init() {
  hidePreloader();
  counter();
  loaded();
  digitsCounter();
  dropdown();
  updateGauge(70);
  setReviewBars();
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxLQUFBLEVBRUQsU0FBQXdNLGFBQWFBLENBQUEsRUFBRztNQUNkLElBQUksQ0FBQy9CLFVBQVUsQ0FBQzNOLE9BQU8sQ0FBQyxVQUFDNEIsRUFBRSxFQUFLO1FBQzlCQSxFQUFFLENBQUNDLEtBQUssQ0FBQ0MsWUFBWSxHQUFHLEtBQUs7TUFDL0IsQ0FBQyxDQUFDO01BQ0Z4QyxRQUFRLENBQUNpQixJQUFJLENBQUNzQixLQUFLLENBQUNDLFlBQVksR0FBRyxLQUFLO0lBQzFDO0VBQUM7QUFBQTtBQUdJLElBQU1xTCxLQUFLLEdBQUcsSUFBSVIsS0FBSyxDQUFDO0VBQzdCSSxNQUFNLEVBQUUsU0FBUkEsTUFBTUEsQ0FBR0ksS0FBSyxFQUFLO0lBQ2pCeUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQ3ZCLENBQUM7RUFDRDdDLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBLEVBQVE7SUFDYjRDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUN2Qjs7RUFFQTtBQUNGLENBQUMsQ0FBQzs7QUM5TjZDO0FBQ1E7QUFDSjtBQUNOO0FBQ2M7QUFDVjtBQUNBO0FBQ1U7QUFDaEI7QUFFM0N2UCxNQUFNLENBQUNaLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFNO0VBQ3BDcVEsSUFBSSxDQUFDLENBQUM7QUFDUixDQUFDLENBQUM7QUFFRkEsSUFBSSxDQUFDLENBQUM7QUFFTixTQUFTQSxJQUFJQSxDQUFBLEVBQUc7RUFDZG5RLGFBQWEsQ0FBQyxDQUFDO0VBQ2ZSLE9BQU8sQ0FBQyxDQUFDO0VBQ1RzSixNQUFNLENBQUMsQ0FBQztFQUNSbUIsYUFBYSxDQUFDLENBQUM7RUFDZmxILFFBQVEsQ0FBQyxDQUFDO0VBQ1ZpSixXQUFXLENBQUMsRUFBRSxDQUFDO0VBQ2ZPLGFBQWEsQ0FBQyxDQUFDO0FBQ2pCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvY291bnRlci5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvcHJlbG9hZGVyLmpzIiwid2VicGFjazovL2d1bHAtdGVtcGxhdGUvLi9zcmMvanMvY29tcG9uZW50cy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9jb21wb25lbnRzL2xvYWRlZC5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvZGlnaXRzQ291bnRlci5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9jb21wb25lbnRzL2dhdWdlLmpzIiwid2VicGFjazovL2d1bHAtdGVtcGxhdGUvLi9zcmMvanMvY29tcG9uZW50cy9zZXRSZXZpZXdCYXJzLmpzIiwid2VicGFjazovL2d1bHAtdGVtcGxhdGUvLi9zcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjb3VudGVyKCkge1xuICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb3VudGVyX19sYWJlbCcpO1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY291bnRlcl9fYnRuJyk7XG5cbiAgaWYgKCFsYWJlbCB8fCAhYnRuKSByZXR1cm47XG5cbiAgbGV0IGNvdW50ZXIgPSAwO1xuICByZW5kZXIoKTtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvdW50ZXIrKztcbiAgICByZW5kZXIoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGxhYmVsLmlubmVySFRNTCA9IGNvdW50ZXI7XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoaWRlUHJlbG9hZGVyKCkge1xuICBjb25zdCBwcmVsb2FkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWxvYWRlcicpO1xuXG4gIGlmIChwcmVsb2FkZXJzICYmIHByZWxvYWRlcnMubGVuZ3RoKSB7XG4gICAgcHJlbG9hZGVycy5mb3JFYWNoKChwcmVsb2FkZXIpID0+IHtcbiAgICAgIHByZWxvYWRlci5jbGFzc0xpc3QuYWRkKCdwcmVsb2FkZXJfaGlkZGVuJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgICAgfSwgNjAwKTtcbiAgICB9KTtcbiAgfVxufVxuIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcclxufSk7XHJcblxyXG5pZiAoZG9jdW1lbnQ/LmJvZHkpIHtcclxuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xyXG59XHJcblxyXG5sZXQgdW5sb2NrID0gdHJ1ZTtcclxuXHJcbi8vPT09PT09PT09PT09PT09PT1cclxuLy9BY3Rpb25zT25IYXNoXHJcbmlmIChsb2NhdGlvbi5oYXNoKSB7XHJcbiAgY29uc3QgaHNoID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfJyArIGhzaCkpIHtcclxuICAgIHBvcHVwX29wZW4oaHNoKTtcclxuICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi4nICsgaHNoKSkge1xyXG4gICAgX2dvdG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBoc2gpLCA1MDAsICcnKTtcclxuICB9XHJcbn1cclxuLy89PT09PT09PT09PT09PT09PVxyXG4vL01lbnVcclxubGV0IGljb25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24tbWVudScpO1xyXG5pZiAoaWNvbk1lbnUgIT0gbnVsbCkge1xyXG4gIGxldCBkZWxheSA9IDUwMDtcclxuICBsZXQgbWVudUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpO1xyXG4gIGljb25NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmICh1bmxvY2spIHtcclxuICAgICAgYm9keV9sb2NrKGRlbGF5KTtcclxuICAgICAgaWNvbk1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnX2FjdGl2ZScpO1xyXG4gICAgICBtZW51Qm9keS5jbGFzc0xpc3QudG9nZ2xlKCdfYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lbnVfY2xvc2UoKSB7XHJcbiAgbGV0IGljb25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24tbWVudScpO1xyXG4gIGxldCBtZW51Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5Jyk7XHJcbiAgaWNvbk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpO1xyXG4gIG1lbnVCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKTtcclxufVxyXG4vLz09PT09PT09PT09PT09PT09XHJcbi8vQm9keUxvY2tcclxuZnVuY3Rpb24gYm9keV9sb2NrKGRlbGF5KSB7XHJcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdfbG9jaycpKSB7XHJcbiAgICBib2R5X2xvY2tfcmVtb3ZlKGRlbGF5KTtcclxuICB9IGVsc2Uge1xyXG4gICAgYm9keV9sb2NrX2FkZChkZWxheSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBib2R5X2xvY2tfcmVtb3ZlKGRlbGF5KSB7XHJcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgaWYgKHVubG9jaykge1xyXG4gICAgbGV0IGxvY2tfcGFkZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5fbHAnKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9ja19wYWRkaW5nLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGNvbnN0IGVsID0gbG9ja19wYWRkaW5nW2luZGV4XTtcclxuICAgICAgICBlbC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcclxuICAgICAgfVxyXG4gICAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcwcHgnO1xyXG4gICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ19sb2NrJyk7XHJcbiAgICB9LCBkZWxheSk7XHJcblxyXG4gICAgdW5sb2NrID0gZmFsc2U7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgdW5sb2NrID0gdHJ1ZTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvZHlfbG9ja19hZGQoZGVsYXkpIHtcclxuICBsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICBpZiAodW5sb2NrKSB7XHJcbiAgICBsZXQgbG9ja19wYWRkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLl9scCcpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxvY2tfcGFkZGluZy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWwgPSBsb2NrX3BhZGRpbmdbaW5kZXhdO1xyXG4gICAgICBlbC5zdHlsZS5wYWRkaW5nUmlnaHQgPVxyXG4gICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC1cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpLm9mZnNldFdpZHRoICtcclxuICAgICAgICAncHgnO1xyXG4gICAgfVxyXG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPVxyXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJykub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdfbG9jaycpO1xyXG5cclxuICAgIHVubG9jayA9IGZhbHNlO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHVubG9jayA9IHRydWU7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBmaWx0ZXJPcGVuQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXJzLW9wZW4nKTtcclxuY29uc3QgZmlsdGVyQ2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcnMtY2xvc2UnKTtcclxuY29uc3QgZmlsdGVyc1BhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlci1yZXZpZXdzJyk7XHJcbmNvbnN0IGZpbHRlck92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyLW92ZXJsYXknKTtcclxuY29uc3QgZmlsdGVyRGVsYXkgPSA1MDA7XHJcblxyXG5pZiAoZmlsdGVyc1BhbmVsICYmIGZpbHRlck92ZXJsYXkpIHtcclxuICBmaWx0ZXJPcGVuQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKHVubG9jaykge1xyXG4gICAgICAgIGZpbHRlcnNQYW5lbC5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgZmlsdGVyT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgYm9keV9sb2NrKGZpbHRlckRlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGZpbHRlckNsb3NlQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKHVubG9jaykge1xyXG4gICAgICAgIGZpbHRlcnNQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgZmlsdGVyT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgYm9keV9sb2NrKGZpbHRlckRlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vINCX0LDQutGA0YvRgtC40LUg0L/QviDQutC70LjQutGDINC90LAg0YTQvtC9XHJcbiAgZmlsdGVyT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGlmICh1bmxvY2spIHtcclxuICAgICAgZmlsdGVyc1BhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKTtcclxuICAgICAgZmlsdGVyT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgIGJvZHlfbG9jayhmaWx0ZXJEZWxheSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0nKTtcclxuXHJcbmlmIChmb3Jtcykge1xyXG4gIGZvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXREcm9wZG93bnMoKSB7XHJcbiAgY29uc3QgZHJvcGRvd25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LXNlbGVjdCcpO1xyXG5cclxuICBkcm9wZG93bnMuZm9yRWFjaCgoZHJvcGRvd24pID0+IHtcclxuICAgIGNvbnN0IGRyb3Bkb3duSW5wdXQgPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24taW5wdXQnKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQnV0dG9uID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWJ1dHRvbicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25JdGVtc1dyYXBwZXIgPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tc2VsZWN0Jyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkljb24gPSBkcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfX2ljb24nKTtcclxuXHJcbiAgICBsZXQgY3VycmVudFRva2VuID0ge1xyXG4gICAgICB0ZXh0OiBkcm9wZG93bklucHV0LnZhbHVlLFxyXG4gICAgICBpY29uOiBkcm9wZG93bkljb24gPyBkcm9wZG93bkljb24uZ2V0QXR0cmlidXRlKCdzcmMnKSA6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZURyb3Bkb3duKCkge1xyXG4gICAgICBkcm9wZG93bi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0SXRlbShldmVudCkge1xyXG4gICAgICBjb25zdCBpdGVtID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgY29uc3QgbmV3VGV4dCA9IGl0ZW0ucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50O1xyXG4gICAgICBjb25zdCBuZXdJY29uSW1nID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgY29uc3QgbmV3SWNvblNyYyA9IG5ld0ljb25JbWcgPyBuZXdJY29uSW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgOiBudWxsO1xyXG5cclxuICAgICAgLy8gMS4g0KHQvtC30LTQsNGR0Lwg0L3QvtCy0YvQuSDRjdC70LXQvNC10L3RgiDQtNC70Y8g0LLQvtC30LLRgNCw0YLQsCDRgtC10LrRg9GJ0LXQs9C+INGC0L7QutC10L3QsCDQsiDRgdC/0LjRgdC+0LpcclxuICAgICAgY29uc3Qgb2xkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgIG9sZEl0ZW0uY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24tc2VsZWN0X19pdGVtJyk7XHJcblxyXG4gICAgICBpZiAoY3VycmVudFRva2VuLmljb24pIHtcclxuICAgICAgICBjb25zdCBvbGRJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBvbGRJbWcuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24tc2VsZWN0X19pY29uJyk7XHJcbiAgICAgICAgb2xkSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgY3VycmVudFRva2VuLmljb24pO1xyXG4gICAgICAgIG9sZEl0ZW0uYXBwZW5kQ2hpbGQob2xkSW1nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgb2xkU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgb2xkU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRUb2tlbi50ZXh0O1xyXG4gICAgICBvbGRJdGVtLmFwcGVuZENoaWxkKG9sZFNwYW4pO1xyXG5cclxuICAgICAgZHJvcGRvd25JdGVtc1dyYXBwZXIuYXBwZW5kQ2hpbGQob2xkSXRlbSk7XHJcbiAgICAgIG9sZEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RJdGVtKTtcclxuXHJcbiAgICAgIC8vIDIuINCe0LHQvdC+0LLQu9GP0LXQvCBpbnB1dCDQuCDQuNC60L7QvdC60YNcclxuICAgICAgZHJvcGRvd25JbnB1dC52YWx1ZSA9IG5ld1RleHQ7XHJcbiAgICAgIGlmIChkcm9wZG93bkljb24gJiYgbmV3SWNvblNyYykge1xyXG4gICAgICAgIGRyb3Bkb3duSWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsIG5ld0ljb25TcmMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGRyb3Bkb3duSWNvbiAmJiAhbmV3SWNvblNyYykge1xyXG4gICAgICAgIGRyb3Bkb3duSWNvbi5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyAzLiDQo9C00LDQu9GP0LXQvCDQstGL0LHRgNCw0L3QvdGL0Lkg0Y3Qu9C10LzQtdC90YIg0LjQtyDRgdC/0LjRgdC60LBcclxuICAgICAgaXRlbS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIC8vIDQuINCe0LHQvdC+0LLQu9GP0LXQvCDRgtC10LrRg9GJ0LjQuSDRgtC+0LrQtdC9XHJcbiAgICAgIGN1cnJlbnRUb2tlbiA9IHtcclxuICAgICAgICB0ZXh0OiBuZXdUZXh0LFxyXG4gICAgICAgIGljb246IG5ld0ljb25TcmMsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VEcm9wZG93bihldmVudCkge1xyXG4gICAgICBpZiAoIWRyb3Bkb3duLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcm9wZG93bklucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRHJvcGRvd24pO1xyXG4gICAgZHJvcGRvd25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEcm9wZG93bik7XHJcbiAgICBkcm9wZG93blxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLXNlbGVjdF9faXRlbScpXHJcbiAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0SXRlbSkpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZURyb3Bkb3duKTtcclxuICB9KTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1zZWxlY3QnKSkge1xyXG4gIGluaXREcm9wZG93bnMoKTtcclxufVxyXG5cclxuLy89PT09PT09PT09PT09PT09PVxyXG4vKlxyXG7QlNC70Y8g0YDQvtC00LjRgtC10LvRjyDRgdC70L7QudC70LXRgNC+0LIg0L/QuNGI0LXQvCDQsNGC0YDQuNCx0YPRgiBkYXRhLXNwb2xsZXJzXHJcbtCU0LvRjyDQt9Cw0LPQvtC70L7QstC60L7QsiDRgdC70L7QudC70LXRgNC+0LIg0L/QuNGI0LXQvCDQsNGC0YDQuNCx0YPRgiBkYXRhLXNwb2xsZXJcclxu0JXRgdC70Lgg0L3Rg9C20L3QviDQstC60LvRjtGH0LDRgtGMXFzQstGL0LrQu9GO0YfQsNGC0Ywg0YDQsNCx0L7RgtGDINGB0L/QvtC50LvQtdGA0L7QsiDQvdCwINGA0LDQt9C90YvRhSDRgNCw0LfQvNC10YDQsNGFINGN0LrRgNCw0L3QvtCyXHJcbtC/0LjRiNC10Lwg0L/QsNGA0LDQvNC10YLRgNGLINGI0LjRgNC40L3RiyDQuCDRgtC40L/QsCDQsdGA0LXQudC60L/QvtC40L3RgtCwLlxyXG7QndCw0L/RgNC40LzQtdGAOlxyXG5kYXRhLXNwb2xsZXJzPVwiOTkyLG1heFwiIC0g0YHQv9C+0LnQu9C10YDRiyDQsdGD0LTRg9GCINGA0LDQsdC+0YLQsNGC0Ywg0YLQvtC70YzQutC+INC90LAg0Y3QutGA0LDQvdCw0YUg0LzQtdC90YzRiNC1INC40LvQuCDRgNCw0LLQvdC+IDk5MnB4XHJcbmRhdGEtc3BvbGxlcnM9XCI3NjgsbWluXCIgLSDRgdC/0L7QudC70LXRgNGLINCx0YPQtNGD0YIg0YDQsNCx0L7RgtCw0YLRjCDRgtC+0LvRjNC60L4g0L3QsCDRjdC60YDQsNC90LDRhSDQsdC+0LvRjNGI0LUg0LjQu9C4INGA0LDQstC90L4gNzY4cHhcclxuXHJcbtCV0YHQu9C4INC90YPQttC90L4g0YfRgtC+INCx0Ysg0LIg0LHQu9C+0LrQtSDQvtGC0LrRgNGL0LLQsNC70YHRjyDQsdC+0LvRjNC60L4g0L7QtNC40L0g0YHQu9C+0LnQu9C10YAg0LTQvtCx0LDQstC70Y/QtdC8INCw0YLRgNC40LHRg9GCIGRhdGEtb25lLXNwb2xsZXJcclxuKi9cclxuXHJcbi8vIFNQT0xMRVJTXHJcbmNvbnN0IHNwb2xsZXJzQXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcG9sbGVyc10nKTtcclxuaWYgKHNwb2xsZXJzQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gIC8vINCf0L7Qu9GD0YfQtdC90LjQtSDQvtCx0YvRh9C90YvRhSDRgdC70L7QudC70LXRgNC+0LJcclxuICBjb25zdCBzcG9sbGVyc1JlZ3VsYXIgPSBBcnJheS5mcm9tKHNwb2xsZXJzQXJyYXkpLmZpbHRlcihmdW5jdGlvbiAoXHJcbiAgICBpdGVtLFxyXG4gICAgaW5kZXgsXHJcbiAgICBzZWxmLFxyXG4gICkge1xyXG4gICAgcmV0dXJuICFpdGVtLmRhdGFzZXQuc3BvbGxlcnMuc3BsaXQoJywnKVswXTtcclxuICB9KTtcclxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQvtCx0YvRh9C90YvRhSDRgdC70L7QudC70LXRgNC+0LJcclxuICBpZiAoc3BvbGxlcnNSZWd1bGFyLmxlbmd0aCA+IDApIHtcclxuICAgIGluaXRTcG9sbGVycyhzcG9sbGVyc1JlZ3VsYXIpO1xyXG4gIH1cclxuXHJcbiAgLy8g0J/QvtC70YPRh9C10L3QuNC1INGB0LvQvtC50LvQtdGA0L7QsiDRgSDQvNC10LTQuNCwINC30LDQv9GA0L7RgdCw0LzQuFxyXG4gIGNvbnN0IHNwb2xsZXJzTWVkaWEgPSBBcnJheS5mcm9tKHNwb2xsZXJzQXJyYXkpLmZpbHRlcihmdW5jdGlvbiAoXHJcbiAgICBpdGVtLFxyXG4gICAgaW5kZXgsXHJcbiAgICBzZWxmLFxyXG4gICkge1xyXG4gICAgcmV0dXJuIGl0ZW0uZGF0YXNldC5zcG9sbGVycy5zcGxpdCgnLCcpWzBdO1xyXG4gIH0pO1xyXG5cclxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC70L7QudC70LXRgNC+0LIg0YEg0LzQtdC00LjQsCDQt9Cw0L/RgNC+0YHQsNC80LhcclxuICBpZiAoc3BvbGxlcnNNZWRpYS5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zdCBicmVha3BvaW50c0FycmF5ID0gW107XHJcbiAgICBzcG9sbGVyc01lZGlhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0LnNwb2xsZXJzO1xyXG4gICAgICBjb25zdCBicmVha3BvaW50ID0ge307XHJcbiAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gcGFyYW1zLnNwbGl0KCcsJyk7XHJcbiAgICAgIGJyZWFrcG9pbnQudmFsdWUgPSBwYXJhbXNBcnJheVswXTtcclxuICAgICAgYnJlYWtwb2ludC50eXBlID0gcGFyYW1zQXJyYXlbMV0gPyBwYXJhbXNBcnJheVsxXS50cmltKCkgOiAnbWF4JztcclxuICAgICAgYnJlYWtwb2ludC5pdGVtID0gaXRlbTtcclxuICAgICAgYnJlYWtwb2ludHNBcnJheS5wdXNoKGJyZWFrcG9pbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0J/QvtC70YPRh9Cw0LXQvCDRg9C90LjQutCw0LvRjNC90YvQtSDQsdGA0LXQudC60L/QvtC40L3RgtGLXHJcbiAgICBsZXQgbWVkaWFRdWVyaWVzID0gYnJlYWtwb2ludHNBcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICAnKCcgK1xyXG4gICAgICAgIGl0ZW0udHlwZSArXHJcbiAgICAgICAgJy13aWR0aDogJyArXHJcbiAgICAgICAgaXRlbS52YWx1ZSArXHJcbiAgICAgICAgJ3B4KSwnICtcclxuICAgICAgICBpdGVtLnZhbHVlICtcclxuICAgICAgICAnLCcgK1xyXG4gICAgICAgIGl0ZW0udHlwZVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBtZWRpYVF1ZXJpZXMgPSBtZWRpYVF1ZXJpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xyXG4gICAgICByZXR1cm4gc2VsZi5pbmRleE9mKGl0ZW0pID09PSBpbmRleDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCg0LDQsdC+0YLQsNC10Lwg0YEg0LrQsNC20LTRi9C8INCx0YDQtdC50LrQv9C+0LjQvdGC0L7QvFxyXG4gICAgbWVkaWFRdWVyaWVzLmZvckVhY2goKGJyZWFrcG9pbnQpID0+IHtcclxuICAgICAgY29uc3QgcGFyYW1zQXJyYXkgPSBicmVha3BvaW50LnNwbGl0KCcsJyk7XHJcbiAgICAgIGNvbnN0IG1lZGlhQnJlYWtwb2ludCA9IHBhcmFtc0FycmF5WzFdO1xyXG4gICAgICBjb25zdCBtZWRpYVR5cGUgPSBwYXJhbXNBcnJheVsyXTtcclxuICAgICAgY29uc3QgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhKHBhcmFtc0FycmF5WzBdKTtcclxuXHJcbiAgICAgIC8vINCe0LHRitC10LrRgtGLINGBINC90YPQttC90YvQvNC4INGD0YHQu9C+0LLQuNGP0LzQuFxyXG4gICAgICBjb25zdCBzcG9sbGVyc0FycmF5ID0gYnJlYWtwb2ludHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gbWVkaWFCcmVha3BvaW50ICYmIGl0ZW0udHlwZSA9PT0gbWVkaWFUeXBlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyDQodC+0LHRi9GC0LjQtVxyXG4gICAgICBtYXRjaE1lZGlhLmFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U3BvbGxlcnMoc3BvbGxlcnNBcnJheSwgbWF0Y2hNZWRpYSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpbml0U3BvbGxlcnMoc3BvbGxlcnNBcnJheSwgbWF0Y2hNZWRpYSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICBmdW5jdGlvbiBpbml0U3BvbGxlcnMoc3BvbGxlcnNBcnJheSwgbWF0Y2hNZWRpYSA9IGZhbHNlKSB7XHJcbiAgICBzcG9sbGVyc0FycmF5LmZvckVhY2goKHNwb2xsZXJzQmxvY2spID0+IHtcclxuICAgICAgc3BvbGxlcnNCbG9jayA9IG1hdGNoTWVkaWEgPyBzcG9sbGVyc0Jsb2NrLml0ZW0gOiBzcG9sbGVyc0Jsb2NrO1xyXG4gICAgICBpZiAobWF0Y2hNZWRpYS5tYXRjaGVzIHx8ICFtYXRjaE1lZGlhKSB7XHJcbiAgICAgICAgc3BvbGxlcnNCbG9jay5jbGFzc0xpc3QuYWRkKCdfaW5pdCcpO1xyXG4gICAgICAgIGluaXRTcG9sbGVyQm9keShzcG9sbGVyc0Jsb2NrKTtcclxuICAgICAgICBzcG9sbGVyc0Jsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0U3BvbGxlckFjdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3BvbGxlcnNCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdfaW5pdCcpO1xyXG4gICAgICAgIGluaXRTcG9sbGVyQm9keShzcG9sbGVyc0Jsb2NrLCBmYWxzZSk7XHJcbiAgICAgICAgc3BvbGxlcnNCbG9jay5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNldFNwb2xsZXJBY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLy8g0KDQsNCx0L7RgtCwINGBINC60L7QvdGC0LXQvdGC0L7QvFxyXG4gIGZ1bmN0aW9uIGluaXRTcG9sbGVyQm9keShzcG9sbGVyc0Jsb2NrLCBoaWRlU3BvbGxlckJvZHkgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBzcG9sbGVyVGl0bGVzID0gc3BvbGxlcnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcG9sbGVyXScpO1xyXG4gICAgaWYgKHNwb2xsZXJUaXRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBzcG9sbGVyVGl0bGVzLmZvckVhY2goKHNwb2xsZXJUaXRsZSkgPT4ge1xyXG4gICAgICAgIGlmIChoaWRlU3BvbGxlckJvZHkpIHtcclxuICAgICAgICAgIHNwb2xsZXJUaXRsZS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XHJcbiAgICAgICAgICBpZiAoIXNwb2xsZXJUaXRsZS5jbGFzc0xpc3QuY29udGFpbnMoJ19hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBzcG9sbGVyVGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHNwb2xsZXJUaXRsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiAgICAgICAgICBzcG9sbGVyVGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRTcG9sbGVyQWN0aW9uKGUpIHtcclxuICAgIGNvbnN0IGVsID0gZS50YXJnZXQ7XHJcbiAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNwb2xsZXInKSB8fCBlbC5jbG9zZXN0KCdbZGF0YS1zcG9sbGVyXScpKSB7XHJcbiAgICAgIGNvbnN0IHNwb2xsZXJUaXRsZSA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zcG9sbGVyJylcclxuICAgICAgICA/IGVsXHJcbiAgICAgICAgOiBlbC5jbG9zZXN0KCdbZGF0YS1zcG9sbGVyXScpO1xyXG4gICAgICBjb25zdCBzcG9sbGVyc0Jsb2NrID0gc3BvbGxlclRpdGxlLmNsb3Nlc3QoJ1tkYXRhLXNwb2xsZXJzXScpO1xyXG4gICAgICBjb25zdCBvbmVTcG9sbGVyID0gc3BvbGxlcnNCbG9jay5oYXNBdHRyaWJ1dGUoJ2RhdGEtb25lLXNwb2xsZXInKVxyXG4gICAgICAgID8gdHJ1ZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICAgIGlmICghc3BvbGxlcnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCcuX3NsaWRlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKG9uZVNwb2xsZXIgJiYgIXNwb2xsZXJUaXRsZS5jbGFzc0xpc3QuY29udGFpbnMoJ19hY3RpdmUnKSkge1xyXG4gICAgICAgICAgaGlkZVNwb2xsZXJzQm9keShzcG9sbGVyc0Jsb2NrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3BvbGxlclRpdGxlLmNsYXNzTGlzdC50b2dnbGUoJ19hY3RpdmUnKTtcclxuICAgICAgICBfc2xpZGVUb2dnbGUoc3BvbGxlclRpdGxlLm5leHRFbGVtZW50U2libGluZywgNTAwKTtcclxuICAgICAgfVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlU3BvbGxlcnNCb2R5KHNwb2xsZXJzQmxvY2spIHtcclxuICAgIGNvbnN0IHNwb2xsZXJBY3RpdmVUaXRsZSA9IHNwb2xsZXJzQmxvY2sucXVlcnlTZWxlY3RvcihcclxuICAgICAgJ1tkYXRhLXNwb2xsZXJdLl9hY3RpdmUnLFxyXG4gICAgKTtcclxuICAgIGlmIChzcG9sbGVyQWN0aXZlVGl0bGUpIHtcclxuICAgICAgc3BvbGxlckFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKTtcclxuICAgICAgX3NsaWRlVXAoc3BvbGxlckFjdGl2ZVRpdGxlLm5leHRFbGVtZW50U2libGluZywgNTAwKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGJ0blNob3dQYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaG93LXBhc3MnKTtcclxuXHJcbmlmIChidG5TaG93UGFzc3dvcmQpIHtcclxuICBidG5TaG93UGFzc3dvcmQuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfX2NvbnRyb2wnKS50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfX2NvbnRyb2wnKS5mb2N1cygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfX2NvbnRyb2wnKS50eXBlID0gJ3Bhc3N3b3JkJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vPT09PT09PT09PT09PT09PT1cclxuLy9TbGlkZVRvZ2dsZVxyXG5sZXQgX3NsaWRlVXAgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCkgPT4ge1xyXG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgIHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGFyZ2V0LmhpZGRlbiA9IHRydWU7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0Jyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnX3NsaWRlJyk7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG59O1xyXG5sZXQgX3NsaWRlRG93biA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xyXG4gICAgaWYgKHRhcmdldC5oaWRkZW4pIHtcclxuICAgICAgdGFyZ2V0LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGV0IGhlaWdodCA9IHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcclxuICAgIHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLXRvcCcpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0Jyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnX3NsaWRlJyk7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG59O1xyXG5sZXQgX3NsaWRlVG9nZ2xlID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDApID0+IHtcclxuICBpZiAodGFyZ2V0LmhpZGRlbikge1xyXG4gICAgcmV0dXJuIF9zbGlkZURvd24odGFyZ2V0LCBkdXJhdGlvbik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBfc2xpZGVVcCh0YXJnZXQsIGR1cmF0aW9uKTtcclxuICB9XHJcbn07XHJcblxyXG4vL9Cf0L7Qu9C40YTQuNC70YtcclxuKGZ1bmN0aW9uICgpIHtcclxuICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0L/QvtC00LTQtdGA0LbQutGDXHJcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XHJcbiAgICAvLyDRgNC10LDQu9C40LfRg9C10LxcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbiAoY3NzKSB7XHJcbiAgICAgIHZhciBub2RlID0gdGhpcztcclxuICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKGNzcykpIHJldHVybiBub2RlO1xyXG4gICAgICAgIGVsc2Ugbm9kZSA9IG5vZGUucGFyZW50RWxlbWVudDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgfVxyXG59KSgpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQv9C+0LTQtNC10YDQttC60YNcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgIC8vINC+0L/RgNC10LTQtdC70Y/QtdC8INGB0LLQvtC50YHRgtCy0L5cclxuICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPVxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcclxuICB9XHJcbn0pKCk7XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBsb2FkZWQoKSB7XHJcbiAgY29uc3QgYW5pbUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFuaW1hdGUnKTtcclxuXHJcbiAgaWYgKGFuaW1JdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYW5pbU9uU2Nyb2xsKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhbmltT25TY3JvbGwoKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbmltSXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3QgYW5pbUl0ZW0gPSBhbmltSXRlbXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGFuaW1JdGVtSGVpZ2h0ID0gYW5pbUl0ZW0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGFuaW1JdGVtT2Zmc2V0ID0gb2Zmc2V0KGFuaW1JdGVtKS50b3A7XHJcblxyXG4gICAgICAgIC8vINCj0YHQu9C+0LLQuNC1OiDRjdC70LXQvNC10L3RgiDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/QvtC70L3QvtGB0YLRjNGOINCyINC30L7QvdC1INCy0LjQtNC40LzQvtGB0YLQuFxyXG4gICAgICAgIGNvbnN0IGFuaW1JdGVtUG9pbnQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBhbmltSXRlbUhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcGFnZVlPZmZzZXQgPiBhbmltSXRlbU9mZnNldCAtIGFuaW1JdGVtUG9pbnQgKyAxMCAmJlxyXG4gICAgICAgICAgcGFnZVlPZmZzZXQgPCBhbmltSXRlbU9mZnNldCArIGFuaW1JdGVtSGVpZ2h0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBhbmltSXRlbS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFhbmltSXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ19hbmltLW5vLWhpZGUnKSkge1xyXG4gICAgICAgICAgICBhbmltSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkZWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvZmZzZXQoZWwpIHtcclxuICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXHJcbiAgICAgICAgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiByZWN0LnRvcCArIHNjcm9sbFRvcCxcclxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBzY3JvbGxMZWZ0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBhbmltT25TY3JvbGwoKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfVxyXG59XHJcbiIsImxldCBkaWdpdHNDb3VudGVySW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaWdpdHNDb3VudGVyKCkge1xyXG4gIGlmIChkaWdpdHNDb3VudGVySW5pdGlhbGl6ZWQpIHJldHVybjtcclxuICBkaWdpdHNDb3VudGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gIC8vINCe0LHQvdGD0LvQtdC90LjQtSDQt9C90LDRh9C10L3QuNC5XHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpZ2l0cy1jb3VudGVyXScpLmxlbmd0aCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlnaXRzLWNvdW50ZXJdJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBlbGVtZW50LmRhdGFzZXQuZGlnaXRzQ291bnRlciA9IGVsZW1lbnQuaW5uZXJIVE1MO1xyXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGAwYDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8g0KTRg9C90LrRhtC40Y8g0LDQvdC40LzQsNGG0LjQuCDRgdGH0LXRgtGH0LjQutCwXHJcbiAgZnVuY3Rpb24gZGlnaXRzQ291bnRlcnNBbmltYXRlKGRpZ2l0c0NvdW50ZXIpIHtcclxuICAgIGxldCBzdGFydFRpbWVzdGFtcCA9IG51bGw7XHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IHBhcnNlSW50KGRpZ2l0c0NvdW50ZXIuZGF0YXNldC5kaWdpdHNDb3VudGVyU3BlZWQpIHx8IDEwMDA7IC8vINCh0LrQvtGA0L7RgdGC0Ywg0LDQvdC40LzQsNGG0LjQuCAo0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gMTAwMCDQvNGBKVxyXG4gICAgY29uc3Qgc3RhcnRWYWx1ZSA9IHBhcnNlSW50KGRpZ2l0c0NvdW50ZXIuZGF0YXNldC5kaWdpdHNDb3VudGVyKTsgLy8g0JrQvtC90LXRh9C90L7QtSDQt9C90LDRh9C10L3QuNC1XHJcbiAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gMDsgLy8g0J3QsNGH0LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LUgKDApXHJcblxyXG4gICAgY29uc3Qgc3RlcCA9ICh0aW1lc3RhbXApID0+IHtcclxuICAgICAgaWYgKCFzdGFydFRpbWVzdGFtcCkgc3RhcnRUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcbiAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5taW4oKHRpbWVzdGFtcCAtIHN0YXJ0VGltZXN0YW1wKSAvIGR1cmF0aW9uLCAxKTsgLy8g0J/RgNC+0LPRgNC10YHRgSAoMCDQtNC+IDEpXHJcbiAgICAgIGRpZ2l0c0NvdW50ZXIuaW5uZXJIVE1MID0gTWF0aC5mbG9vcihcclxuICAgICAgICBwcm9ncmVzcyAqIChzdGFydFBvc2l0aW9uICsgc3RhcnRWYWx1ZSksXHJcbiAgICAgICk7IC8vINCi0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LVcclxuXHJcbiAgICAgIGlmIChwcm9ncmVzcyA8IDEpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApOyAvLyDQn9GA0L7QtNC+0LvQttC10L3QuNC1INCw0L3QuNC80LDRhtC40LhcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7IC8vINCX0LDQv9GD0YHQuiDQsNC90LjQvNCw0YbQuNC4XHJcbiAgfVxyXG5cclxuICAvLyDQndCw0YHRgtGA0L7QudC60LAgSW50ZXJzZWN0aW9uIE9ic2VydmVyXHJcbiAgZnVuY3Rpb24gZGlnaXRzQ291bnRlcnNJbml0KCkge1xyXG4gICAgY29uc3Qgb2JzZXJ2ZXJPcHRpb25zID0ge1xyXG4gICAgICB0aHJlc2hvbGQ6IDAuMiwgLy8g0J/QvtC70L7QstC40L3QsCDRjdC70LXQvNC10L3RgtCwINC00L7Qu9C20L3QsCDQsdGL0YLRjCDQstC40LTQvdCwXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb2JzZXJ2ZXJDYWxsYmFjayA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xyXG4gICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICAvLyDQldGB0LvQuCDRjdC70LXQvNC10L3RgiDQsiDQt9C+0L3QtSDQstC40LTQuNC80L7RgdGC0LhcclxuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGVudHJ5LnRhcmdldDtcclxuXHJcbiAgICAgICAgICAvLyDQlNC+0LHQsNCy0LvRj9C10Lwg0LfQsNC00LXRgNC20LrRgyDQsiAyINGB0LXQutGD0L3QtNGLINC/0LXRgNC10LQg0L3QsNGH0LDQu9C+0Lwg0LDQvdC40LzQsNGG0LjQuFxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGRpZ2l0c0NvdW50ZXJzQW5pbWF0ZSh0YXJnZXQpOyAvLyDQl9Cw0L/Rg9GB0Log0LDQvdC40LzQsNGG0LjQuFxyXG4gICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUodGFyZ2V0KTsgLy8g0KHQvdGP0YLRjCDQvdCw0LHQu9GO0LTQtdC90LjQtSDQv9C+0YHQu9C1INCw0L3QuNC80LDRhtC40LhcclxuICAgICAgICAgIH0sIDEwMCk7IC8vINCX0LDQtNC10YDQttC60LAg0LIgMjAwMCDQvNGBICgyINGB0LXQutGD0L3QtNGLKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxyXG4gICAgICBvYnNlcnZlckNhbGxiYWNrLFxyXG4gICAgICBvYnNlcnZlck9wdGlvbnMsXHJcbiAgICApO1xyXG5cclxuICAgIC8vINCf0L7QtNC60LvRjtGH0LDQtdC8IG9ic2VydmVyINC6INC60LDQttC00L7QvNGDINGN0LvQtdC80LXQvdGC0YMg0YEgZGF0YS1kaWdpdHMtY291bnRlclxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlnaXRzLWNvdW50ZXJdJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyDQl9Cw0L/Rg9GB0Log0YTRg9C90LrRhtC40LhcclxuICBkaWdpdHNDb3VudGVyc0luaXQoKTtcclxufVxyXG4iLCJsZXQgaXNEcm9wZG93bkluaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJvcGRvd24oKSB7XHJcbiAgY29uc3QgZHJvcGRvd25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi1pdGVtJyk7XHJcblxyXG4gIGlmIChkcm9wZG93bkl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgIGRyb3Bkb3duSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBidG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1idG4nKTtcclxuICAgICAgY29uc3QgY2xvc2VCdG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93biAuZHJvcGRvd24tY2xvc2UnKTtcclxuXHJcbiAgICAgIGlmIChidG4gJiYgIWJ0bi5kYXRhc2V0Lmxpc3RlbmVyQXR0YWNoZWQpIHtcclxuICAgICAgICBidG4uZGF0YXNldC5saXN0ZW5lckF0dGFjaGVkID0gJ3RydWUnO1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgZHJvcGRvd25JdGVtcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWwgIT09IGl0ZW0pIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2xvc2VCdG4gJiYgIWNsb3NlQnRuLmRhdGFzZXQubGlzdGVuZXJBdHRhY2hlZCkge1xyXG4gICAgICAgIGNsb3NlQnRuLmRhdGFzZXQubGlzdGVuZXJBdHRhY2hlZCA9ICd0cnVlJztcclxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFpc0Ryb3Bkb3duSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgaXNEcm9wZG93bkluaXRpYWxpemVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAnY2xpY2snLFxyXG4gICAgICAgIChlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5kcm9wZG93bi1pdGVtJykpIHtcclxuICAgICAgICAgICAgZHJvcGRvd25JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRydWUsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHYXVnZSh2YWx1ZSkge1xyXG4gIC8vINCg0LDRgdGH0LXRgiDRg9Cz0LvQsCDQv9C+0LLQvtGA0L7RgtCwXHJcbiAgY29uc3QgYW5nbGUgPSAodmFsdWUgLyAxMDApICogMTgwIC0gOTA7XHJcblxyXG4gIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDRg9Cz0LvQsCDQv9C+0LLQvtGA0L7RgtCwXHJcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYXVnZV9fYXJyb3ctd3JhcHBlcicpO1xyXG4gIGlmICh3cmFwcGVyKSB7XHJcbiAgICB3cmFwcGVyLnN0eWxlLnNldFByb3BlcnR5KCctLWFuZ2xlJywgYCR7YW5nbGV9ZGVnYCk7XHJcbiAgfVxyXG5cclxuICAvLyDQktGL0LHQvtGAINGG0LLQtdGC0LAg0L/QviDQt9C90LDRh9C10L3QuNGOXHJcbiAgbGV0IGNvbG9yO1xyXG4gaWYgKHZhbHVlIDw9IDIwKSB7XHJcbiAgIGNvbG9yID0gJ3ZhcigtLXJlZCknO1xyXG4gfSBlbHNlIGlmICh2YWx1ZSA8PSA0MCkge1xyXG4gICBjb2xvciA9ICd2YXIoLS1saWdodC1yZWQpJztcclxuIH0gZWxzZSBpZiAodmFsdWUgPD0gNjApIHtcclxuICAgY29sb3IgPSAndmFyKC0tb3JhbmdlKSc7XHJcbiB9IGVsc2UgaWYgKHZhbHVlIDw9IDgwKSB7XHJcbiAgIGNvbG9yID0gJ3ZhcigtLXRlYWwpJztcclxuIH0gZWxzZSB7XHJcbiAgIGNvbG9yID0gJ3ZhcigtLWdyZWVuKSc7XHJcbiB9XHJcblxyXG5jb25zdCBhcnJvd1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2F1Z2VfX2Fycm93Jyk7XHJcbmlmIChhcnJvd1dyYXBwZXIpIHtcclxuICBhcnJvd1dyYXBwZXIuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3InLCBjb2xvcik7XHJcbn1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc2V0UmV2aWV3QmFycygpIHtcclxuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItY29tcGFueS1yZXZpZXdzX19pdGVtJyk7XHJcblxyXG4gIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIGNvbnN0IHZhbHVlRWxlbWVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmZpbHRlci1jb21wYW55LXJldmlld3NfX3ZhbHVlJyk7XHJcbiAgICBjb25zdCBiYXIgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXItY29tcGFueS1yZXZpZXdzX19wZXJjZW50Jyk7XHJcblxyXG4gICAgaWYgKHZhbHVlRWxlbWVudCAmJiBiYXIpIHtcclxuICAgICAgY29uc3QgcGVyY2VudFRleHQgPSB2YWx1ZUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgICBjb25zdCBwZXJjZW50ID0gcGFyc2VGbG9hdChwZXJjZW50VGV4dC5yZXBsYWNlKCclJywgJycpKSB8fCAwO1xyXG4gICAgICBiYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsImNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGxldCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIGlzT3BlbjogKCkgPT4ge30sXG4gICAgICBpc0Nsb3NlOiAoKSA9PiB7fSxcbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcbiAgICB0aGlzLnNwZWVkID0gJyc7XG4gICAgdGhpcy5hbmltYXRpb24gPSAnJztcbiAgICB0aGlzLl9yZU9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9uZXh0Q29udGFpbmVyID0gZmFsc2U7XG4gICAgdGhpcy5tb2RhbENvbnRhaW5lciA9IGZhbHNlO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBmYWxzZTtcbiAgICB0aGlzLl9mb2N1c0VsZW1lbnRzID0gW1xuICAgICAgJ2FbaHJlZl0nLFxuICAgICAgJ2lucHV0JyxcbiAgICAgICdzZWxlY3QnLFxuICAgICAgJ3RleHRhcmVhJyxcbiAgICAgICdidXR0b24nLFxuICAgICAgJ2lmcmFtZScsXG4gICAgICAnW2NvbnRlbnRlZGl0YWJsZV0nLFxuICAgICAgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleF49XCItXCJdKScsXG4gICAgXTtcbiAgICB0aGlzLl9maXhCbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZml4LWJsb2NrJyk7XG4gICAgdGhpcy5ldmVudHMoKTtcbiAgfVxuXG4gIGV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBjb25zdCBjbGlja2VkRWxlbWVudCA9IGUudGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLXBhdGhdYCk7XG4gICAgICAgICAgaWYgKGNsaWNrZWRFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gY2xpY2tlZEVsZW1lbnQuZGF0YXNldC5wYXRoO1xuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbiA9IGNsaWNrZWRFbGVtZW50LmRhdGFzZXQuYW5pbWF0aW9uO1xuICAgICAgICAgICAgbGV0IHNwZWVkID0gY2xpY2tlZEVsZW1lbnQuZGF0YXNldC5zcGVlZDtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uID8gYW5pbWF0aW9uIDogJ2ZhZGUnO1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkID8gcGFyc2VJbnQoc3BlZWQpIDogNTAwO1xuICAgICAgICAgICAgdGhpcy5fbmV4dENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGBbZGF0YS10YXJnZXQ9XCIke3RhcmdldH1cIl1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcuanMtbW9kYWwtY2xvc2UnKSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdrZXlkb3duJyxcbiAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3ICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUud2hpY2ggPT0gOSAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0NhdGNoKGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgKTtcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsJykgJiZcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oc2VsZWN0b3IpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMucmVPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGFsQ29udGFpbmVyID0gdGhpcy5fbmV4dENvbnRhaW5lcjtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGhpcy5tb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS10YXJnZXQ9XCIke3NlbGVjdG9yfVwiXWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMubW9kYWxDb250YWluZXIuc2Nyb2xsVG8oMCwgMCk7XG5cbiAgICB0aGlzLm1vZGFsLnN0eWxlLnNldFByb3BlcnR5KCctLXRyYW5zaXRpb24tdGltZScsIGAke3RoaXMuc3BlZWQgLyAxMDAwfXNgKTtcbiAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSAnYXV0byc7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nO1xuXG4gICAgdGhpcy5kaXNhYmxlU2Nyb2xsKCk7XG5cbiAgICB0aGlzLm1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW9wZW4nKTtcbiAgICB0aGlzLm1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5hbmltYXRpb24pO1xuXG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAvLyBcdHRoaXMubW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1vcGVuJyk7XG5cbiAgICAvLyB9LCAwKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1vcGVuJyk7XG4gICAgICB0aGlzLm9wdGlvbnMuaXNPcGVuKHRoaXMpO1xuXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmZvY3VzVHJhcCgpO1xuICAgIH0sIHRoaXMuc3BlZWQpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMubW9kYWxDb250YWluZXIpIHtcbiAgICAgIHRoaXMubW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0ZS1vcGVuJyk7XG5cbiAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuXG4gICAgICB0aGlzLm1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hbmltYXRpb24pO1xuICAgICAgdGhpcy5tb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1vcGVuJyk7XG4gICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gfSwgdGhpcy5zcGVlZCk7XG5cbiAgICAgIHRoaXMuZW5hYmxlU2Nyb2xsKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nO1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nO1xuXG4gICAgICB0aGlzLm9wdGlvbnMuaXNDbG9zZSh0aGlzKTtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmZvY3VzVHJhcCgpO1xuXG4gICAgICBpZiAodGhpcy5yZU9wZW4pIHtcbiAgICAgICAgdGhpcy5yZU9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9jdXNDYXRjaChlKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLm1vZGFsQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbGVtZW50cyk7XG4gICAgY29uc3Qgbm9kZXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVzKTtcbiAgICBjb25zdCBmb2N1c2VkSXRlbUluZGV4ID0gbm9kZXNBcnJheS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgIGlmIChlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJdGVtSW5kZXggPT09IDApIHtcbiAgICAgIG5vZGVzQXJyYXlbbm9kZXNBcnJheS5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEl0ZW1JbmRleCA9PT0gbm9kZXNBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICBub2Rlc0FycmF5WzBdLmZvY3VzKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXNUcmFwKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5tb2RhbENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzRWxlbWVudHMpO1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgaWYgKG5vZGVzLmxlbmd0aCkgbm9kZXNbMF0uZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlU2Nyb2xsKCkge1xuICAgIGxldCBwYWdlUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICB0aGlzLmxvY2tQYWRkaW5nKCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xuICAgIGRvY3VtZW50LmJvZHkuZGF0YXNldC5wb3NpdGlvbiA9IHBhZ2VQb3NpdGlvbjtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9IC1wYWdlUG9zaXRpb24gKyAncHgnO1xuICB9XG5cbiAgZW5hYmxlU2Nyb2xsKCkge1xuICAgIGxldCBwYWdlUG9zaXRpb24gPSBwYXJzZUludChkb2N1bWVudC5ib2R5LmRhdGFzZXQucG9zaXRpb24sIDEwKTtcbiAgICB0aGlzLnVubG9ja1BhZGRpbmcoKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9ICdhdXRvJztcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XG4gICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgIHRvcDogcGFnZVBvc2l0aW9uLFxuICAgICAgbGVmdDogMCxcbiAgICB9KTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1wb3NpdGlvbicpO1xuICB9XG5cbiAgbG9ja1BhZGRpbmcoKSB7XG4gICAgbGV0IHBhZGRpbmdPZmZzZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgIHRoaXMuX2ZpeEJsb2Nrcy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZ09mZnNldDtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHBhZGRpbmdPZmZzZXQ7XG4gIH1cblxuICB1bmxvY2tQYWRkaW5nKCkge1xuICAgIHRoaXMuX2ZpeEJsb2Nrcy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzBweCc7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoe1xuICBpc09wZW46IChtb2RhbCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdvcGVuZWQnKTtcbiAgfSxcbiAgaXNDbG9zZTogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdjbG9zZWQnKTtcbiAgfSxcblxuICAvLyBuZXcgTW9kYWwoKS5vcGVuKCdzZWNvbmQnKTtcbn0pO1xuIiwiaW1wb3J0IHsgY291bnRlciB9IGZyb20gJy4vY29tcG9uZW50cy9jb3VudGVyJztcbmltcG9ydCB7IGhpZGVQcmVsb2FkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJlbG9hZGVyJztcbmltcG9ydCB7IGZ1bmN0aW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgbG9hZGVkIH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRlZCc7XG5pbXBvcnQgeyBkaWdpdHNDb3VudGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpZ2l0c0NvdW50ZXInO1xuaW1wb3J0IHsgZHJvcGRvd24gfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xuaW1wb3J0IHsgdXBkYXRlR2F1Z2UgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2F1Z2UnO1xuaW1wb3J0IHsgc2V0UmV2aWV3QmFycyB9IGZyb20gJy4vY29tcG9uZW50cy9zZXRSZXZpZXdCYXJzJztcbmltcG9ydCB7IG1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIGluaXQoKTtcbn0pO1xuXG5pbml0KCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGhpZGVQcmVsb2FkZXIoKTtcbiAgY291bnRlcigpO1xuICBsb2FkZWQoKTtcbiAgZGlnaXRzQ291bnRlcigpO1xuICBkcm9wZG93bigpO1xuICB1cGRhdGVHYXVnZSg3MCk7XG4gIHNldFJldmlld0JhcnMoKTtcbn1cbiJdLCJuYW1lcyI6WyJjb3VudGVyIiwibGFiZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJidG4iLCJyZW5kZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwiaGlkZVByZWxvYWRlciIsInByZWxvYWRlcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiZm9yRWFjaCIsInByZWxvYWRlciIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJ3aW5kb3ciLCJib2R5IiwiX2RvY3VtZW50IiwidW5sb2NrIiwibG9jYXRpb24iLCJoYXNoIiwiaHNoIiwicmVwbGFjZSIsInBvcHVwX29wZW4iLCJfZ290byIsImljb25NZW51IiwiZGVsYXkiLCJtZW51Qm9keSIsImUiLCJib2R5X2xvY2siLCJ0b2dnbGUiLCJtZW51X2Nsb3NlIiwiY29udGFpbnMiLCJib2R5X2xvY2tfcmVtb3ZlIiwiYm9keV9sb2NrX2FkZCIsImxvY2tfcGFkZGluZyIsImluZGV4IiwiZWwiLCJzdHlsZSIsInBhZGRpbmdSaWdodCIsImlubmVyV2lkdGgiLCJvZmZzZXRXaWR0aCIsImZpbHRlck9wZW5CdG5zIiwiZmlsdGVyQ2xvc2VCdG5zIiwiZmlsdGVyc1BhbmVsIiwiZmlsdGVyT3ZlcmxheSIsImZpbHRlckRlbGF5IiwiZm9ybXMiLCJmb3JtIiwicHJldmVudERlZmF1bHQiLCJpbml0RHJvcGRvd25zIiwiZHJvcGRvd25zIiwiZHJvcGRvd24iLCJkcm9wZG93bklucHV0IiwiZHJvcGRvd25CdXR0b24iLCJkcm9wZG93bkl0ZW1zV3JhcHBlciIsImRyb3Bkb3duSWNvbiIsImN1cnJlbnRUb2tlbiIsInRleHQiLCJ2YWx1ZSIsImljb24iLCJnZXRBdHRyaWJ1dGUiLCJ0b2dnbGVEcm9wZG93biIsInNlbGVjdEl0ZW0iLCJldmVudCIsIml0ZW0iLCJjdXJyZW50VGFyZ2V0IiwibmV3VGV4dCIsInRleHRDb250ZW50IiwibmV3SWNvbkltZyIsIm5ld0ljb25TcmMiLCJvbGRJdGVtIiwiY3JlYXRlRWxlbWVudCIsIm9sZEltZyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwib2xkU3BhbiIsInJlbW92ZUF0dHJpYnV0ZSIsImNsb3NlRHJvcGRvd24iLCJ0YXJnZXQiLCJzcG9sbGVyc0FycmF5IiwiaW5pdFNwb2xsZXJzIiwibWF0Y2hNZWRpYSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInNwb2xsZXJzQmxvY2siLCJtYXRjaGVzIiwiaW5pdFNwb2xsZXJCb2R5Iiwic2V0U3BvbGxlckFjdGlvbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoaWRlU3BvbGxlckJvZHkiLCJzcG9sbGVyVGl0bGVzIiwic3BvbGxlclRpdGxlIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiaGlkZGVuIiwiaGFzQXR0cmlidXRlIiwiY2xvc2VzdCIsIm9uZVNwb2xsZXIiLCJoaWRlU3BvbGxlcnNCb2R5IiwiX3NsaWRlVG9nZ2xlIiwic3BvbGxlckFjdGl2ZVRpdGxlIiwiX3NsaWRlVXAiLCJzcG9sbGVyc1JlZ3VsYXIiLCJBcnJheSIsImZyb20iLCJmaWx0ZXIiLCJzZWxmIiwiZGF0YXNldCIsInNwb2xsZXJzIiwic3BsaXQiLCJzcG9sbGVyc01lZGlhIiwiYnJlYWtwb2ludHNBcnJheSIsInBhcmFtcyIsImJyZWFrcG9pbnQiLCJwYXJhbXNBcnJheSIsInR5cGUiLCJ0cmltIiwicHVzaCIsIm1lZGlhUXVlcmllcyIsIm1hcCIsImluZGV4T2YiLCJtZWRpYUJyZWFrcG9pbnQiLCJtZWRpYVR5cGUiLCJhZGRMaXN0ZW5lciIsImJ0blNob3dQYXNzd29yZCIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsImR1cmF0aW9uIiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwib3ZlcmZsb3ciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInJlbW92ZVByb3BlcnR5IiwiX3NsaWRlRG93biIsIkVsZW1lbnQiLCJwcm90b3R5cGUiLCJjc3MiLCJub2RlIiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJsb2FkZWQiLCJhbmltSXRlbXMiLCJhbmltT25TY3JvbGwiLCJhbmltSXRlbSIsImFuaW1JdGVtSGVpZ2h0IiwiYW5pbUl0ZW1PZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJhbmltSXRlbVBvaW50IiwiaW5uZXJIZWlnaHQiLCJwYWdlWU9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzY3JvbGxMZWZ0IiwicGFnZVhPZmZzZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJsZWZ0IiwiZGlnaXRzQ291bnRlckluaXRpYWxpemVkIiwiZGlnaXRzQ291bnRlciIsImVsZW1lbnQiLCJkaWdpdHNDb3VudGVyc0FuaW1hdGUiLCJzdGFydFRpbWVzdGFtcCIsInBhcnNlSW50IiwiZGlnaXRzQ291bnRlclNwZWVkIiwic3RhcnRWYWx1ZSIsInN0YXJ0UG9zaXRpb24iLCJzdGVwIiwidGltZXN0YW1wIiwicHJvZ3Jlc3MiLCJNYXRoIiwibWluIiwiZmxvb3IiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkaWdpdHNDb3VudGVyc0luaXQiLCJvYnNlcnZlck9wdGlvbnMiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlckNhbGxiYWNrIiwiZW50cmllcyIsIm9ic2VydmVyIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImlzRHJvcGRvd25Jbml0aWFsaXplZCIsImRyb3Bkb3duSXRlbXMiLCJjbG9zZUJ0biIsImxpc3RlbmVyQXR0YWNoZWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ1cGRhdGVHYXVnZSIsImFuZ2xlIiwid3JhcHBlciIsInNldFByb3BlcnR5IiwiY29uY2F0IiwiY29sb3IiLCJhcnJvd1dyYXBwZXIiLCJzZXRSZXZpZXdCYXJzIiwiaXRlbXMiLCJ2YWx1ZUVsZW1lbnQiLCJiYXIiLCJwZXJjZW50VGV4dCIsInBlcmNlbnQiLCJwYXJzZUZsb2F0Iiwid2lkdGgiLCJNb2RhbCIsIm9wdGlvbnMiLCJfY2xhc3NDYWxsQ2hlY2siLCJkZWZhdWx0T3B0aW9ucyIsImlzT3BlbiIsImlzQ2xvc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJtb2RhbCIsInNwZWVkIiwiYW5pbWF0aW9uIiwiX3JlT3BlbiIsIl9uZXh0Q29udGFpbmVyIiwibW9kYWxDb250YWluZXIiLCJwcmV2aW91c0FjdGl2ZUVsZW1lbnQiLCJfZm9jdXNFbGVtZW50cyIsIl9maXhCbG9ja3MiLCJldmVudHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJjbGlja2VkRWxlbWVudCIsInBhdGgiLCJvcGVuIiwiY2xvc2UiLCJiaW5kIiwia2V5Q29kZSIsIndoaWNoIiwiZm9jdXNDYXRjaCIsInNlbGVjdG9yIiwiX3RoaXMiLCJhY3RpdmVFbGVtZW50IiwicmVPcGVuIiwic2Nyb2xsVG8iLCJzY3JvbGxCZWhhdmlvciIsImRpc2FibGVTY3JvbGwiLCJmb2N1c1RyYXAiLCJlbmFibGVTY3JvbGwiLCJub2RlcyIsIm5vZGVzQXJyYXkiLCJzbGljZSIsImNhbGwiLCJmb2N1c2VkSXRlbUluZGV4Iiwic2hpZnRLZXkiLCJwYWdlUG9zaXRpb24iLCJzY3JvbGxZIiwibG9ja1BhZGRpbmciLCJwb3NpdGlvbiIsInVubG9ja1BhZGRpbmciLCJwYWRkaW5nT2Zmc2V0IiwiY29uc29sZSIsImxvZyIsImZ1bmN0aW9ucyIsImluaXQiXSwic291cmNlUm9vdCI6IiJ9