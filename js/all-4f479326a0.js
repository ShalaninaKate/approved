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
    function toggleDropdown() {
      dropdown.classList.toggle('show');
    }
    function selectItem(event) {
      var item = event.currentTarget;
      var newText = item.querySelector('span').textContent;
      var newIconImg = item.querySelector('img');
      var newIconSrc = newIconImg ? newIconImg.getAttribute('src') : null;

      // Обновляем input и иконку
      dropdownInput.value = newText;
      if (dropdownIcon && newIconSrc) {
        dropdownIcon.setAttribute('src', newIconSrc);
      } else if (dropdownIcon) {
        dropdownIcon.removeAttribute('src');
      }

      // Закрываем dropdown
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
var switchBtns = document.querySelectorAll('.switch-btn');
if (switchBtns) {
  switchBtns.forEach(function (switchBtn) {
    switchBtn.addEventListener('click', function () {
      this.classList.toggle('switch-on');
    });
  });
}
document.querySelectorAll('.file').forEach(function (block) {
  var fileInput = block.querySelector('.file-input');
  var filePreview = block.querySelector('.file-preview');
  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    if (!file) return;

    // Проверка типа
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Разрешены только изображения (JPEG, PNG).');
      fileInput.value = '';
      filePreview.innerHTML = ''; // Очистка превью
      return;
    }

    // Проверка размера
    if (file.size > 4 * 1024 * 1024) {
      alert('Файл должен быть меньше 4 МБ.');
      fileInput.value = '';
      filePreview.innerHTML = ''; // Очистка превью
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      filePreview.innerHTML = "<img src=\"".concat(e.target.result, "\" alt=\"\u0424\u043E\u0442\u043E\">");
    };
    reader.onerror = function () {
      alert('Ошибка при загрузке файла.');
    };
    reader.readAsDataURL(file);
  });
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxTQUFTQSxPQUFPQSxDQUFBLEVBQUc7RUFDeEIsSUFBTUMsS0FBSyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztFQUN2RCxJQUFNQyxHQUFHLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQztFQUVuRCxJQUFJLENBQUNGLEtBQUssSUFBSSxDQUFDRyxHQUFHLEVBQUU7RUFFcEIsSUFBSUosT0FBTyxHQUFHLENBQUM7RUFDZkssTUFBTSxDQUFDLENBQUM7RUFDUkQsR0FBRyxDQUFDRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsQ04sT0FBTyxFQUFFO0lBQ1RLLE1BQU0sQ0FBQyxDQUFDO0VBQ1YsQ0FBQyxDQUFDO0VBRUYsU0FBU0EsTUFBTUEsQ0FBQSxFQUFHO0lBQ2hCSixLQUFLLENBQUNNLFNBQVMsR0FBR1AsT0FBTztFQUMzQjtBQUNGOztBQ2hCTyxTQUFTUSxhQUFhQSxDQUFBLEVBQUc7RUFDOUIsSUFBTUMsVUFBVSxHQUFHUCxRQUFRLENBQUNRLGdCQUFnQixDQUFDLFlBQVksQ0FBQztFQUUxRCxJQUFJRCxVQUFVLElBQUlBLFVBQVUsQ0FBQ0UsTUFBTSxFQUFFO0lBQ25DRixVQUFVLENBQUNHLE9BQU8sQ0FBQyxVQUFDQyxTQUFTLEVBQUs7TUFDaENBLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7TUFDM0NDLFVBQVUsQ0FBQyxZQUFNO1FBQ2ZILFNBQVMsQ0FBQ0ksTUFBTSxDQUFDLENBQUM7TUFDcEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNULENBQUMsQ0FBQztFQUNKO0FBQ0Y7OztBQ1hBQyxNQUFNLENBQUNaLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFZO0VBQzFDSixRQUFRLENBQUNpQixJQUFJLENBQUNMLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUN2QyxDQUFDLENBQUM7QUFFRixLQUFBSyxTQUFBLEdBQUlsQixRQUFRLGNBQUFrQixTQUFBLGVBQVJBLFNBQUEsQ0FBVUQsSUFBSSxFQUFFO0VBQ2xCakIsUUFBUSxDQUFDaUIsSUFBSSxDQUFDTCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDdkM7QUFFQSxJQUFJTSxNQUFNLEdBQUcsSUFBSTs7QUFFakI7QUFDQTtBQUNBLElBQUlDLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFO0VBQ2pCLElBQU1DLEdBQUcsR0FBR0YsUUFBUSxDQUFDQyxJQUFJLENBQUNFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0VBQzFDLElBQUl2QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLEdBQUdxQixHQUFHLENBQUMsRUFBRTtJQUMzQ0UsVUFBVSxDQUFDRixHQUFHLENBQUM7RUFDakIsQ0FBQyxNQUFNLElBQUl0QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLEdBQUdxQixHQUFHLENBQUMsRUFBRTtJQUMvQ0csS0FBSyxDQUFDekIsUUFBUSxDQUFDQyxhQUFhLENBQUMsR0FBRyxHQUFHcUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztFQUNuRDtBQUNGO0FBQ0E7QUFDQTtBQUNBLElBQUlJLFFBQVEsR0FBRzFCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUNuRCxJQUFJeUIsUUFBUSxJQUFJLElBQUksRUFBRTtFQUNwQixJQUFJQyxLQUFLLEdBQUcsR0FBRztFQUNmLElBQUlDLFFBQVEsR0FBRzVCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUNwRHlCLFFBQVEsQ0FBQ3RCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVeUIsQ0FBQyxFQUFFO0lBQzlDLElBQUlWLE1BQU0sRUFBRTtNQUNWVyxTQUFTLENBQUNILEtBQUssQ0FBQztNQUNoQkQsUUFBUSxDQUFDZCxTQUFTLENBQUNtQixNQUFNLENBQUMsU0FBUyxDQUFDO01BQ3BDSCxRQUFRLENBQUNoQixTQUFTLENBQUNtQixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3RDO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7QUFFQSxTQUFTQyxVQUFVQSxDQUFBLEVBQUc7RUFDcEIsSUFBSU4sUUFBUSxHQUFHMUIsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0VBQ25ELElBQUkyQixRQUFRLEdBQUc1QixRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFDcER5QixRQUFRLENBQUNkLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFNBQVMsQ0FBQztFQUNwQ2EsUUFBUSxDQUFDaEIsU0FBUyxDQUFDRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLFNBQVNlLFNBQVNBLENBQUNILEtBQUssRUFBRTtFQUN4QixJQUFJVixJQUFJLEdBQUdqQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7RUFDekMsSUFBSWdCLElBQUksQ0FBQ0wsU0FBUyxDQUFDcUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3BDQyxnQkFBZ0IsQ0FBQ1AsS0FBSyxDQUFDO0VBQ3pCLENBQUMsTUFBTTtJQUNMUSxhQUFhLENBQUNSLEtBQUssQ0FBQztFQUN0QjtBQUNGO0FBRUEsU0FBU08sZ0JBQWdCQSxDQUFDUCxLQUFLLEVBQUU7RUFDL0IsSUFBSVYsSUFBSSxHQUFHakIsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0VBQ3pDLElBQUlrQixNQUFNLEVBQUU7SUFDVixJQUFJaUIsWUFBWSxHQUFHcEMsUUFBUSxDQUFDUSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7SUFDcERNLFVBQVUsQ0FBQyxZQUFNO01BQ2YsS0FBSyxJQUFJdUIsS0FBSyxHQUFHLENBQUMsRUFBRUEsS0FBSyxHQUFHRCxZQUFZLENBQUMzQixNQUFNLEVBQUU0QixLQUFLLEVBQUUsRUFBRTtRQUN4RCxJQUFNQyxFQUFFLEdBQUdGLFlBQVksQ0FBQ0MsS0FBSyxDQUFDO1FBQzlCQyxFQUFFLENBQUNDLEtBQUssQ0FBQ0MsWUFBWSxHQUFHLEtBQUs7TUFDL0I7TUFDQXZCLElBQUksQ0FBQ3NCLEtBQUssQ0FBQ0MsWUFBWSxHQUFHLEtBQUs7TUFDL0J2QixJQUFJLENBQUNMLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNoQyxDQUFDLEVBQUVZLEtBQUssQ0FBQztJQUVUUixNQUFNLEdBQUcsS0FBSztJQUNkTCxVQUFVLENBQUMsWUFBWTtNQUNyQkssTUFBTSxHQUFHLElBQUk7SUFDZixDQUFDLEVBQUVRLEtBQUssQ0FBQztFQUNYO0FBQ0Y7QUFFQSxTQUFTUSxhQUFhQSxDQUFDUixLQUFLLEVBQUU7RUFDNUIsSUFBSVYsSUFBSSxHQUFHakIsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0VBQ3pDLElBQUlrQixNQUFNLEVBQUU7SUFDVixJQUFJaUIsWUFBWSxHQUFHcEMsUUFBUSxDQUFDUSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7SUFDcEQsS0FBSyxJQUFJNkIsS0FBSyxHQUFHLENBQUMsRUFBRUEsS0FBSyxHQUFHRCxZQUFZLENBQUMzQixNQUFNLEVBQUU0QixLQUFLLEVBQUUsRUFBRTtNQUN4RCxJQUFNQyxFQUFFLEdBQUdGLFlBQVksQ0FBQ0MsS0FBSyxDQUFDO01BQzlCQyxFQUFFLENBQUNDLEtBQUssQ0FBQ0MsWUFBWSxHQUNuQnhCLE1BQU0sQ0FBQ3lCLFVBQVUsR0FDakJ6QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQ3lDLFdBQVcsR0FDOUMsSUFBSTtJQUNSO0lBQ0F6QixJQUFJLENBQUNzQixLQUFLLENBQUNDLFlBQVksR0FDckJ4QixNQUFNLENBQUN5QixVQUFVLEdBQUd6QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQ3lDLFdBQVcsR0FBRyxJQUFJO0lBQzNFekIsSUFBSSxDQUFDTCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFFM0JNLE1BQU0sR0FBRyxLQUFLO0lBQ2RMLFVBQVUsQ0FBQyxZQUFZO01BQ3JCSyxNQUFNLEdBQUcsSUFBSTtJQUNmLENBQUMsRUFBRVEsS0FBSyxDQUFDO0VBQ1g7QUFDRjtBQUVBLElBQU1nQixjQUFjLEdBQUczQyxRQUFRLENBQUNRLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztBQUNqRSxJQUFNb0MsZUFBZSxHQUFHNUMsUUFBUSxDQUFDUSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNuRSxJQUFNcUMsWUFBWSxHQUFHN0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7QUFDOUQsSUFBTTZDLGFBQWEsR0FBRzlDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQy9ELElBQU04QyxXQUFXLEdBQUcsR0FBRztBQUV2QixJQUFJRixZQUFZLElBQUlDLGFBQWEsRUFBRTtFQUNqQ0gsY0FBYyxDQUFDakMsT0FBTyxDQUFDLFVBQUNSLEdBQUcsRUFBSztJQUM5QkEsR0FBRyxDQUFDRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNsQyxJQUFJZSxNQUFNLEVBQUU7UUFDVjBCLFlBQVksQ0FBQ2pDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUNyQ2lDLGFBQWEsQ0FBQ2xDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN0Q2lCLFNBQVMsQ0FBQ2lCLFdBQVcsQ0FBQztNQUN4QjtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztFQUVGSCxlQUFlLENBQUNsQyxPQUFPLENBQUMsVUFBQ1IsR0FBRyxFQUFLO0lBQy9CQSxHQUFHLENBQUNFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQ2xDLElBQUllLE1BQU0sRUFBRTtRQUNWMEIsWUFBWSxDQUFDakMsU0FBUyxDQUFDRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3hDK0IsYUFBYSxDQUFDbEMsU0FBUyxDQUFDRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3pDZSxTQUFTLENBQUNpQixXQUFXLENBQUM7TUFDeEI7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7O0VBRUY7RUFDQUQsYUFBYSxDQUFDMUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDNUMsSUFBSWUsTUFBTSxFQUFFO01BQ1YwQixZQUFZLENBQUNqQyxTQUFTLENBQUNHLE1BQU0sQ0FBQyxTQUFTLENBQUM7TUFDeEMrQixhQUFhLENBQUNsQyxTQUFTLENBQUNHLE1BQU0sQ0FBQyxTQUFTLENBQUM7TUFDekNlLFNBQVMsQ0FBQ2lCLFdBQVcsQ0FBQztJQUN4QjtFQUNGLENBQUMsQ0FBQztBQUNKO0FBRUEsSUFBTUMsZUFBSyxHQUFHaEQsUUFBUSxDQUFDUSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7QUFFaEQsSUFBSXdDLGVBQUssRUFBRTtFQUNUQSxlQUFLLENBQUN0QyxPQUFPLENBQUMsVUFBQ3VDLElBQUksRUFBSztJQUN0QkEsSUFBSSxDQUFDN0MsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUN5QixDQUFDLEVBQUs7TUFDckNBLENBQUMsQ0FBQ3FCLGNBQWMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBU0MsYUFBYUEsQ0FBQSxFQUFHO0VBQ3ZCLElBQU1DLFNBQVMsR0FBR3BELFFBQVEsQ0FBQ1EsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO0VBRTVENEMsU0FBUyxDQUFDMUMsT0FBTyxDQUFDLFVBQUMyQyxRQUFRLEVBQUs7SUFDOUIsSUFBTUMsYUFBYSxHQUFHRCxRQUFRLENBQUNwRCxhQUFhLENBQUMsaUJBQWlCLENBQUM7SUFDL0QsSUFBTXNELGNBQWMsR0FBR0YsUUFBUSxDQUFDcEQsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pFLElBQU11RCxvQkFBb0IsR0FBR0gsUUFBUSxDQUFDcEQsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0lBQ3ZFLElBQU13RCxZQUFZLEdBQUdKLFFBQVEsQ0FBQ3BELGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFFM0QsU0FBU3lELGNBQWNBLENBQUEsRUFBRztNQUN4QkwsUUFBUSxDQUFDekMsU0FBUyxDQUFDbUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQztJQUVBLFNBQVM0QixVQUFVQSxDQUFDQyxLQUFLLEVBQUU7TUFDekIsSUFBTUMsSUFBSSxHQUFHRCxLQUFLLENBQUNFLGFBQWE7TUFDaEMsSUFBTUMsT0FBTyxHQUFHRixJQUFJLENBQUM1RCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMrRCxXQUFXO01BQ3RELElBQU1DLFVBQVUsR0FBR0osSUFBSSxDQUFDNUQsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM1QyxJQUFNaUUsVUFBVSxHQUFHRCxVQUFVLEdBQUdBLFVBQVUsQ0FBQ0UsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUk7O01BRXJFO01BQ0FiLGFBQWEsQ0FBQ2MsS0FBSyxHQUFHTCxPQUFPO01BQzdCLElBQUlOLFlBQVksSUFBSVMsVUFBVSxFQUFFO1FBQzlCVCxZQUFZLENBQUNZLFlBQVksQ0FBQyxLQUFLLEVBQUVILFVBQVUsQ0FBQztNQUM5QyxDQUFDLE1BQU0sSUFBSVQsWUFBWSxFQUFFO1FBQ3ZCQSxZQUFZLENBQUNhLGVBQWUsQ0FBQyxLQUFLLENBQUM7TUFDckM7O01BRUE7TUFDQWpCLFFBQVEsQ0FBQ3pDLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQztJQUVBLFNBQVN3RCxhQUFhQSxDQUFDWCxLQUFLLEVBQUU7TUFDNUIsSUFBSSxDQUFDUCxRQUFRLENBQUNwQixRQUFRLENBQUMyQixLQUFLLENBQUNZLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDbkIsUUFBUSxDQUFDekMsU0FBUyxDQUFDRyxNQUFNLENBQUMsTUFBTSxDQUFDO01BQ25DO0lBQ0Y7SUFFQXVDLGFBQWEsQ0FBQ2xELGdCQUFnQixDQUFDLE9BQU8sRUFBRXNELGNBQWMsQ0FBQztJQUN2REgsY0FBYyxDQUFDbkQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFc0QsY0FBYyxDQUFDO0lBQ3hETCxRQUFRLENBQ0w3QyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUMxQ0UsT0FBTyxDQUFDLFVBQUNtRCxJQUFJO01BQUEsT0FBS0EsSUFBSSxDQUFDekQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFdUQsVUFBVSxDQUFDO0lBQUEsRUFBQztJQUNoRTNELFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQUMsT0FBTyxFQUFFbUUsYUFBYSxDQUFDO0VBQ25ELENBQUMsQ0FBQztBQUNKO0FBR0EsSUFBSXZFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFO0VBQzNDa0QsYUFBYSxDQUFDLENBQUM7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBTXNCLGFBQWEsR0FBR3pFLFFBQVEsQ0FBQ1EsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUM7QUFDbEUsSUFBSWlFLGFBQWEsQ0FBQ2hFLE1BQU0sR0FBRyxDQUFDLEVBQUU7RUF5RTVCO0VBQUEsSUFDU2lFLFlBQVksR0FBckIsU0FBU0EsWUFBWUEsQ0FBQ0QsYUFBYSxFQUFzQjtJQUFBLElBQXBCRSxVQUFVLEdBQUFDLFNBQUEsQ0FBQW5FLE1BQUEsUUFBQW1FLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsS0FBSztJQUNyREgsYUFBYSxDQUFDL0QsT0FBTyxDQUFDLFVBQUNvRSxhQUFhLEVBQUs7TUFDdkNBLGFBQWEsR0FBR0gsVUFBVSxHQUFHRyxhQUFhLENBQUNqQixJQUFJLEdBQUdpQixhQUFhO01BQy9ELElBQUlILFVBQVUsQ0FBQ0ksT0FBTyxJQUFJLENBQUNKLFVBQVUsRUFBRTtRQUNyQ0csYUFBYSxDQUFDbEUsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ3BDbUUsZUFBZSxDQUFDRixhQUFhLENBQUM7UUFDOUJBLGFBQWEsQ0FBQzFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTZFLGdCQUFnQixDQUFDO01BQzNELENBQUMsTUFBTTtRQUNMSCxhQUFhLENBQUNsRSxTQUFTLENBQUNHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDdkNpRSxlQUFlLENBQUNGLGFBQWEsRUFBRSxLQUFLLENBQUM7UUFDckNBLGFBQWEsQ0FBQ0ksbUJBQW1CLENBQUMsT0FBTyxFQUFFRCxnQkFBZ0IsQ0FBQztNQUM5RDtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsRUFDRDtFQUFBLElBQ1NELGVBQWUsR0FBeEIsU0FBU0EsZUFBZUEsQ0FBQ0YsYUFBYSxFQUEwQjtJQUFBLElBQXhCSyxlQUFlLEdBQUFQLFNBQUEsQ0FBQW5FLE1BQUEsUUFBQW1FLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsSUFBSTtJQUM1RCxJQUFNUSxhQUFhLEdBQUdOLGFBQWEsQ0FBQ3RFLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO0lBQ3RFLElBQUk0RSxhQUFhLENBQUMzRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQzVCMkUsYUFBYSxDQUFDMUUsT0FBTyxDQUFDLFVBQUMyRSxZQUFZLEVBQUs7UUFDdEMsSUFBSUYsZUFBZSxFQUFFO1VBQ25CRSxZQUFZLENBQUNmLGVBQWUsQ0FBQyxVQUFVLENBQUM7VUFDeEMsSUFBSSxDQUFDZSxZQUFZLENBQUN6RSxTQUFTLENBQUNxQixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0NvRCxZQUFZLENBQUNDLGtCQUFrQixDQUFDQyxNQUFNLEdBQUcsSUFBSTtVQUMvQztRQUNGLENBQUMsTUFBTTtVQUNMO1VBQ0FGLFlBQVksQ0FBQ0Msa0JBQWtCLENBQUNDLE1BQU0sR0FBRyxLQUFLO1FBQ2hEO01BQ0YsQ0FBQyxDQUFDO0lBQ0o7RUFDRixDQUFDO0VBQUEsSUFFUU4sZ0JBQWdCLEdBQXpCLFNBQVNBLGdCQUFnQkEsQ0FBQ3BELENBQUMsRUFBRTtJQUMzQixJQUFNUyxFQUFFLEdBQUdULENBQUMsQ0FBQzJDLE1BQU07SUFDbkIsSUFBSWxDLEVBQUUsQ0FBQ2tELFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSWxELEVBQUUsQ0FBQ21ELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO01BQ25FLElBQU1KLFlBQVksR0FBRy9DLEVBQUUsQ0FBQ2tELFlBQVksQ0FBQyxjQUFjLENBQUMsR0FDaERsRCxFQUFFLEdBQ0ZBLEVBQUUsQ0FBQ21ELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztNQUNoQyxJQUFNWCxhQUFhLEdBQUdPLFlBQVksQ0FBQ0ksT0FBTyxDQUFDLGlCQUFpQixDQUFDO01BQzdELElBQU1DLFVBQVUsR0FBR1osYUFBYSxDQUFDVSxZQUFZLENBQUMsa0JBQWtCLENBQUMsR0FDN0QsSUFBSSxHQUNKLEtBQUs7TUFDVCxJQUFJLENBQUNWLGFBQWEsQ0FBQ3RFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7UUFDckQsSUFBSWlGLFVBQVUsSUFBSSxDQUFDTCxZQUFZLENBQUN6RSxTQUFTLENBQUNxQixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7VUFDN0QwRCxnQkFBZ0IsQ0FBQ2IsYUFBYSxDQUFDO1FBQ2pDO1FBQ0FPLFlBQVksQ0FBQ3pFLFNBQVMsQ0FBQ21CLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDeEM2RCxZQUFZLENBQUNQLFlBQVksQ0FBQ0Msa0JBQWtCLEVBQUUsR0FBRyxDQUFDO01BQ3BEO01BQ0F6RCxDQUFDLENBQUNxQixjQUFjLENBQUMsQ0FBQztJQUNwQjtFQUNGLENBQUM7RUFBQSxJQUVReUMsZ0JBQWdCLEdBQXpCLFNBQVNBLGdCQUFnQkEsQ0FBQ2IsYUFBYSxFQUFFO0lBQ3ZDLElBQU1lLGtCQUFrQixHQUFHZixhQUFhLENBQUM3RSxhQUFhLENBQ3BELHdCQUNGLENBQUM7SUFDRCxJQUFJNEYsa0JBQWtCLEVBQUU7TUFDdEJBLGtCQUFrQixDQUFDakYsU0FBUyxDQUFDRyxNQUFNLENBQUMsU0FBUyxDQUFDO01BQzlDK0UsUUFBUSxDQUFDRCxrQkFBa0IsQ0FBQ1Asa0JBQWtCLEVBQUUsR0FBRyxDQUFDO0lBQ3REO0VBQ0YsQ0FBQztFQXRJRDtFQUNBLElBQU1TLGVBQWUsR0FBR0MsS0FBSyxDQUFDQyxJQUFJLENBQUN4QixhQUFhLENBQUMsQ0FBQ3lCLE1BQU0sQ0FBQyxVQUN2RHJDLElBQUksRUFDSnhCLEtBQUssRUFDTDhELElBQUksRUFDSjtJQUNBLE9BQU8sQ0FBQ3RDLElBQUksQ0FBQ3VDLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDLENBQUMsQ0FBQztFQUNGO0VBQ0EsSUFBSVAsZUFBZSxDQUFDdEYsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUM5QmlFLFlBQVksQ0FBQ3FCLGVBQWUsQ0FBQztFQUMvQjs7RUFFQTtFQUNBLElBQU1RLGFBQWEsR0FBR1AsS0FBSyxDQUFDQyxJQUFJLENBQUN4QixhQUFhLENBQUMsQ0FBQ3lCLE1BQU0sQ0FBQyxVQUNyRHJDLElBQUksRUFDSnhCLEtBQUssRUFDTDhELElBQUksRUFDSjtJQUNBLE9BQU90QyxJQUFJLENBQUN1QyxPQUFPLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1QyxDQUFDLENBQUM7O0VBRUY7RUFDQSxJQUFJQyxhQUFhLENBQUM5RixNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQzVCLElBQU0rRixnQkFBZ0IsR0FBRyxFQUFFO0lBQzNCRCxhQUFhLENBQUM3RixPQUFPLENBQUMsVUFBQ21ELElBQUksRUFBSztNQUM5QixJQUFNNEMsTUFBTSxHQUFHNUMsSUFBSSxDQUFDdUMsT0FBTyxDQUFDQyxRQUFRO01BQ3BDLElBQU1LLFVBQVUsR0FBRyxDQUFDLENBQUM7TUFDckIsSUFBTUMsV0FBVyxHQUFHRixNQUFNLENBQUNILEtBQUssQ0FBQyxHQUFHLENBQUM7TUFDckNJLFVBQVUsQ0FBQ3RDLEtBQUssR0FBR3VDLFdBQVcsQ0FBQyxDQUFDLENBQUM7TUFDakNELFVBQVUsQ0FBQ0UsSUFBSSxHQUFHRCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLO01BQ2hFSCxVQUFVLENBQUM3QyxJQUFJLEdBQUdBLElBQUk7TUFDdEIyQyxnQkFBZ0IsQ0FBQ00sSUFBSSxDQUFDSixVQUFVLENBQUM7SUFDbkMsQ0FBQyxDQUFDOztJQUVGO0lBQ0EsSUFBSUssWUFBWSxHQUFHUCxnQkFBZ0IsQ0FBQ1EsR0FBRyxDQUFDLFVBQVVuRCxJQUFJLEVBQUU7TUFDdEQsT0FDRSxHQUFHLEdBQ0hBLElBQUksQ0FBQytDLElBQUksR0FDVCxVQUFVLEdBQ1YvQyxJQUFJLENBQUNPLEtBQUssR0FDVixNQUFNLEdBQ05QLElBQUksQ0FBQ08sS0FBSyxHQUNWLEdBQUcsR0FDSFAsSUFBSSxDQUFDK0MsSUFBSTtJQUViLENBQUMsQ0FBQztJQUNGRyxZQUFZLEdBQUdBLFlBQVksQ0FBQ2IsTUFBTSxDQUFDLFVBQVVyQyxJQUFJLEVBQUV4QixLQUFLLEVBQUU4RCxJQUFJLEVBQUU7TUFDOUQsT0FBT0EsSUFBSSxDQUFDYyxPQUFPLENBQUNwRCxJQUFJLENBQUMsS0FBS3hCLEtBQUs7SUFDckMsQ0FBQyxDQUFDOztJQUVGO0lBQ0EwRSxZQUFZLENBQUNyRyxPQUFPLENBQUMsVUFBQ2dHLFVBQVUsRUFBSztNQUNuQyxJQUFNQyxXQUFXLEdBQUdELFVBQVUsQ0FBQ0osS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUN6QyxJQUFNWSxlQUFlLEdBQUdQLFdBQVcsQ0FBQyxDQUFDLENBQUM7TUFDdEMsSUFBTVEsU0FBUyxHQUFHUixXQUFXLENBQUMsQ0FBQyxDQUFDO01BQ2hDLElBQU1oQyxVQUFVLEdBQUczRCxNQUFNLENBQUMyRCxVQUFVLENBQUNnQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7O01BRXBEO01BQ0EsSUFBTWxDLGFBQWEsR0FBRytCLGdCQUFnQixDQUFDTixNQUFNLENBQUMsVUFBVXJDLElBQUksRUFBRTtRQUM1RCxJQUFJQSxJQUFJLENBQUNPLEtBQUssS0FBSzhDLGVBQWUsSUFBSXJELElBQUksQ0FBQytDLElBQUksS0FBS08sU0FBUyxFQUFFO1VBQzdELE9BQU8sSUFBSTtRQUNiO01BQ0YsQ0FBQyxDQUFDO01BQ0Y7TUFDQXhDLFVBQVUsQ0FBQ3lDLFdBQVcsQ0FBQyxZQUFZO1FBQ2pDMUMsWUFBWSxDQUFDRCxhQUFhLEVBQUVFLFVBQVUsQ0FBQztNQUN6QyxDQUFDLENBQUM7TUFDRkQsWUFBWSxDQUFDRCxhQUFhLEVBQUVFLFVBQVUsQ0FBQztJQUN6QyxDQUFDLENBQUM7RUFDSjtBQWdFRjtBQUVBLElBQU0wQyxlQUFlLEdBQUdySCxRQUFRLENBQUNRLGdCQUFnQixDQUFDLFlBQVksQ0FBQztBQUUvRCxJQUFJNkcsZUFBZSxFQUFFO0VBQ25CQSxlQUFlLENBQUMzRyxPQUFPLENBQUMsVUFBQ1IsR0FBRyxFQUFLO0lBQy9CQSxHQUFHLENBQUNFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVeUIsQ0FBQyxFQUFFO01BQ3pDQSxDQUFDLENBQUNxQixjQUFjLENBQUMsQ0FBQztNQUNsQixJQUFJLENBQUN0QyxTQUFTLENBQUNtQixNQUFNLENBQUMsTUFBTSxDQUFDO01BQzdCLElBQUksSUFBSSxDQUFDbkIsU0FBUyxDQUFDcUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQ3FGLGFBQWEsQ0FBQ3JILGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDMkcsSUFBSSxHQUFHLE1BQU07UUFDakUsSUFBSSxDQUFDVSxhQUFhLENBQUNySCxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQ3NILEtBQUssQ0FBQyxDQUFDO01BQzdELENBQUMsTUFBTTtRQUNMLElBQUksQ0FBQ0QsYUFBYSxDQUFDckgsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMyRyxJQUFJLEdBQUcsVUFBVTtNQUN2RTtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBR0EsSUFBTVksVUFBVSxHQUFHeEgsUUFBUSxDQUFDUSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7QUFFM0QsSUFBSWdILFVBQVUsRUFBRTtFQUNkQSxVQUFVLENBQUM5RyxPQUFPLENBQUMsVUFBQytHLFNBQVMsRUFBSztJQUNoQ0EsU0FBUyxDQUFDckgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7TUFDOUMsSUFBSSxDQUFDUSxTQUFTLENBQUNtQixNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBRUEvQixRQUFRLENBQUNRLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDRSxPQUFPLENBQUMsVUFBQ2dILEtBQUssRUFBSztFQUNwRCxJQUFNQyxTQUFTLEdBQUdELEtBQUssQ0FBQ3pILGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFDcEQsSUFBTTJILFdBQVcsR0FBR0YsS0FBSyxDQUFDekgsYUFBYSxDQUFDLGVBQWUsQ0FBQztFQUV4RDBILFNBQVMsQ0FBQ3ZILGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFNO0lBQ3pDLElBQU15SCxJQUFJLEdBQUdGLFNBQVMsQ0FBQ0csS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUNELElBQUksRUFBRTs7SUFFWDtJQUNBLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQ0UsUUFBUSxDQUFDRixJQUFJLENBQUNqQixJQUFJLENBQUMsRUFBRTtNQUNwRG9CLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQztNQUNsREwsU0FBUyxDQUFDdkQsS0FBSyxHQUFHLEVBQUU7TUFDcEJ3RCxXQUFXLENBQUN2SCxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7TUFDNUI7SUFDRjs7SUFFQTtJQUNBLElBQUl3SCxJQUFJLENBQUNJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRTtNQUMvQkQsS0FBSyxDQUFDLCtCQUErQixDQUFDO01BQ3RDTCxTQUFTLENBQUN2RCxLQUFLLEdBQUcsRUFBRTtNQUNwQndELFdBQVcsQ0FBQ3ZILFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQztNQUM1QjtJQUNGO0lBRUEsSUFBTTZILE1BQU0sR0FBRyxJQUFJQyxVQUFVLENBQUMsQ0FBQztJQUMvQkQsTUFBTSxDQUFDRSxNQUFNLEdBQUcsVUFBVXZHLENBQUMsRUFBRTtNQUMzQitGLFdBQVcsQ0FBQ3ZILFNBQVMsaUJBQUFnSSxNQUFBLENBQWdCeEcsQ0FBQyxDQUFDMkMsTUFBTSxDQUFDOEQsTUFBTSx5Q0FBZTtJQUNyRSxDQUFDO0lBQ0RKLE1BQU0sQ0FBQ0ssT0FBTyxHQUFHLFlBQVk7TUFDM0JQLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQztJQUNyQyxDQUFDO0lBQ0RFLE1BQU0sQ0FBQ00sYUFBYSxDQUFDWCxJQUFJLENBQUM7RUFDNUIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQSxJQUFJL0IsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUl0QixNQUFNLEVBQXFCO0VBQUEsSUFBbkJpRSxRQUFRLEdBQUE3RCxTQUFBLENBQUFuRSxNQUFBLFFBQUFtRSxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLEdBQUc7RUFDcEMsSUFBSSxDQUFDSixNQUFNLENBQUM1RCxTQUFTLENBQUNxQixRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDeEN1QyxNQUFNLENBQUM1RCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDOUIyRCxNQUFNLENBQUNqQyxLQUFLLENBQUNtRyxrQkFBa0IsR0FBRyx5QkFBeUI7SUFDM0RsRSxNQUFNLENBQUNqQyxLQUFLLENBQUNvRyxrQkFBa0IsR0FBR0YsUUFBUSxHQUFHLElBQUk7SUFDakRqRSxNQUFNLENBQUNqQyxLQUFLLENBQUNxRyxNQUFNLEdBQUdwRSxNQUFNLENBQUNxRSxZQUFZLEdBQUcsSUFBSTtJQUNoRHJFLE1BQU0sQ0FBQ3FFLFlBQVk7SUFDbkJyRSxNQUFNLENBQUNqQyxLQUFLLENBQUN1RyxRQUFRLEdBQUcsUUFBUTtJQUNoQ3RFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQ3FHLE1BQU0sR0FBRyxDQUFDO0lBQ3ZCcEUsTUFBTSxDQUFDakMsS0FBSyxDQUFDd0csVUFBVSxHQUFHLENBQUM7SUFDM0J2RSxNQUFNLENBQUNqQyxLQUFLLENBQUN5RyxhQUFhLEdBQUcsQ0FBQztJQUM5QnhFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQzBHLFNBQVMsR0FBRyxDQUFDO0lBQzFCekUsTUFBTSxDQUFDakMsS0FBSyxDQUFDMkcsWUFBWSxHQUFHLENBQUM7SUFDN0JsSSxNQUFNLENBQUNGLFVBQVUsQ0FBQyxZQUFNO01BQ3RCMEQsTUFBTSxDQUFDZSxNQUFNLEdBQUcsSUFBSTtNQUNwQmYsTUFBTSxDQUFDakMsS0FBSyxDQUFDNEcsY0FBYyxDQUFDLFFBQVEsQ0FBQztNQUNyQzNFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQzRHLGNBQWMsQ0FBQyxhQUFhLENBQUM7TUFDMUMzRSxNQUFNLENBQUNqQyxLQUFLLENBQUM0RyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7TUFDN0MzRSxNQUFNLENBQUNqQyxLQUFLLENBQUM0RyxjQUFjLENBQUMsWUFBWSxDQUFDO01BQ3pDM0UsTUFBTSxDQUFDakMsS0FBSyxDQUFDNEcsY0FBYyxDQUFDLGVBQWUsQ0FBQztNQUM1QzNFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQzRHLGNBQWMsQ0FBQyxVQUFVLENBQUM7TUFDdkMzRSxNQUFNLENBQUNqQyxLQUFLLENBQUM0RyxjQUFjLENBQUMscUJBQXFCLENBQUM7TUFDbEQzRSxNQUFNLENBQUNqQyxLQUFLLENBQUM0RyxjQUFjLENBQUMscUJBQXFCLENBQUM7TUFDbEQzRSxNQUFNLENBQUM1RCxTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQyxFQUFFMEgsUUFBUSxDQUFDO0VBQ2Q7QUFDRixDQUFDO0FBQ0QsSUFBSVcsVUFBVSxHQUFHLFNBQWJBLFVBQVVBLENBQUk1RSxNQUFNLEVBQXFCO0VBQUEsSUFBbkJpRSxRQUFRLEdBQUE3RCxTQUFBLENBQUFuRSxNQUFBLFFBQUFtRSxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLEdBQUc7RUFDdEMsSUFBSSxDQUFDSixNQUFNLENBQUM1RCxTQUFTLENBQUNxQixRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDeEN1QyxNQUFNLENBQUM1RCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDOUIsSUFBSTJELE1BQU0sQ0FBQ2UsTUFBTSxFQUFFO01BQ2pCZixNQUFNLENBQUNlLE1BQU0sR0FBRyxLQUFLO0lBQ3ZCO0lBQ0EsSUFBSXFELE1BQU0sR0FBR3BFLE1BQU0sQ0FBQ3FFLFlBQVk7SUFDaENyRSxNQUFNLENBQUNqQyxLQUFLLENBQUN1RyxRQUFRLEdBQUcsUUFBUTtJQUNoQ3RFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQ3FHLE1BQU0sR0FBRyxDQUFDO0lBQ3ZCcEUsTUFBTSxDQUFDakMsS0FBSyxDQUFDd0csVUFBVSxHQUFHLENBQUM7SUFDM0J2RSxNQUFNLENBQUNqQyxLQUFLLENBQUN5RyxhQUFhLEdBQUcsQ0FBQztJQUM5QnhFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQzBHLFNBQVMsR0FBRyxDQUFDO0lBQzFCekUsTUFBTSxDQUFDakMsS0FBSyxDQUFDMkcsWUFBWSxHQUFHLENBQUM7SUFDN0IxRSxNQUFNLENBQUNxRSxZQUFZO0lBQ25CckUsTUFBTSxDQUFDakMsS0FBSyxDQUFDbUcsa0JBQWtCLEdBQUcseUJBQXlCO0lBQzNEbEUsTUFBTSxDQUFDakMsS0FBSyxDQUFDb0csa0JBQWtCLEdBQUdGLFFBQVEsR0FBRyxJQUFJO0lBQ2pEakUsTUFBTSxDQUFDakMsS0FBSyxDQUFDcUcsTUFBTSxHQUFHQSxNQUFNLEdBQUcsSUFBSTtJQUNuQ3BFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQzRHLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDMUMzRSxNQUFNLENBQUNqQyxLQUFLLENBQUM0RyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7SUFDN0MzRSxNQUFNLENBQUNqQyxLQUFLLENBQUM0RyxjQUFjLENBQUMsWUFBWSxDQUFDO0lBQ3pDM0UsTUFBTSxDQUFDakMsS0FBSyxDQUFDNEcsY0FBYyxDQUFDLGVBQWUsQ0FBQztJQUM1Q25JLE1BQU0sQ0FBQ0YsVUFBVSxDQUFDLFlBQU07TUFDdEIwRCxNQUFNLENBQUNqQyxLQUFLLENBQUM0RyxjQUFjLENBQUMsUUFBUSxDQUFDO01BQ3JDM0UsTUFBTSxDQUFDakMsS0FBSyxDQUFDNEcsY0FBYyxDQUFDLFVBQVUsQ0FBQztNQUN2QzNFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQzRHLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQztNQUNsRDNFLE1BQU0sQ0FBQ2pDLEtBQUssQ0FBQzRHLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQztNQUNsRDNFLE1BQU0sQ0FBQzVELFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDLEVBQUUwSCxRQUFRLENBQUM7RUFDZDtBQUNGLENBQUM7QUFDRCxJQUFJN0MsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUlwQixNQUFNLEVBQXFCO0VBQUEsSUFBbkJpRSxRQUFRLEdBQUE3RCxTQUFBLENBQUFuRSxNQUFBLFFBQUFtRSxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLEdBQUc7RUFDeEMsSUFBSUosTUFBTSxDQUFDZSxNQUFNLEVBQUU7SUFDakIsT0FBTzZELFVBQVUsQ0FBQzVFLE1BQU0sRUFBRWlFLFFBQVEsQ0FBQztFQUNyQyxDQUFDLE1BQU07SUFDTCxPQUFPM0MsUUFBUSxDQUFDdEIsTUFBTSxFQUFFaUUsUUFBUSxDQUFDO0VBQ25DO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBLENBQUMsWUFBWTtFQUNYO0VBQ0EsSUFBSSxDQUFDWSxPQUFPLENBQUNDLFNBQVMsQ0FBQzdELE9BQU8sRUFBRTtJQUM5QjtJQUNBNEQsT0FBTyxDQUFDQyxTQUFTLENBQUM3RCxPQUFPLEdBQUcsVUFBVThELEdBQUcsRUFBRTtNQUN6QyxJQUFJQyxJQUFJLEdBQUcsSUFBSTtNQUNmLE9BQU9BLElBQUksRUFBRTtRQUNYLElBQUlBLElBQUksQ0FBQ3pFLE9BQU8sQ0FBQ3dFLEdBQUcsQ0FBQyxFQUFFLE9BQU9DLElBQUksQ0FBQyxLQUM5QkEsSUFBSSxHQUFHQSxJQUFJLENBQUNsQyxhQUFhO01BQ2hDO01BQ0EsT0FBTyxJQUFJO0lBQ2IsQ0FBQztFQUNIO0FBQ0YsQ0FBQyxFQUFFLENBQUM7QUFDSixDQUFDLFlBQVk7RUFDWDtFQUNBLElBQUksQ0FBQytCLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDdkUsT0FBTyxFQUFFO0lBQzlCO0lBQ0FzRSxPQUFPLENBQUNDLFNBQVMsQ0FBQ3ZFLE9BQU8sR0FDdkJzRSxPQUFPLENBQUNDLFNBQVMsQ0FBQ0csZUFBZSxJQUNqQ0osT0FBTyxDQUFDQyxTQUFTLENBQUNJLHFCQUFxQixJQUN2Q0wsT0FBTyxDQUFDQyxTQUFTLENBQUNLLGtCQUFrQixJQUNwQ04sT0FBTyxDQUFDQyxTQUFTLENBQUNNLGlCQUFpQjtFQUN2QztBQUNGLENBQUMsRUFBRSxDQUFDOztBQ3BmRyxTQUFTQyxNQUFNQSxDQUFBLEVBQUc7RUFDdkIsSUFBTUMsU0FBUyxHQUFHOUosUUFBUSxDQUFDUSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7RUFFdkQsSUFBSXNKLFNBQVMsQ0FBQ3JKLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFBQSxJQUdmc0osWUFBWSxHQUFyQixTQUFTQSxZQUFZQSxDQUFBLEVBQUc7TUFDdEIsS0FBSyxJQUFJMUgsS0FBSyxHQUFHLENBQUMsRUFBRUEsS0FBSyxHQUFHeUgsU0FBUyxDQUFDckosTUFBTSxFQUFFNEIsS0FBSyxFQUFFLEVBQUU7UUFDckQsSUFBTTJILFFBQVEsR0FBR0YsU0FBUyxDQUFDekgsS0FBSyxDQUFDO1FBQ2pDLElBQU00SCxjQUFjLEdBQUdELFFBQVEsQ0FBQ25CLFlBQVk7UUFDNUMsSUFBTXFCLGNBQWMsR0FBR0MsTUFBTSxDQUFDSCxRQUFRLENBQUMsQ0FBQ0ksR0FBRzs7UUFFM0M7UUFDQSxJQUFNQyxhQUFhLEdBQUdySixNQUFNLENBQUNzSixXQUFXLEdBQUdMLGNBQWM7UUFFekQsSUFDRU0sV0FBVyxHQUFHTCxjQUFjLEdBQUdHLGFBQWEsR0FBRyxFQUFFLElBQ2pERSxXQUFXLEdBQUdMLGNBQWMsR0FBR0QsY0FBYyxFQUM3QztVQUNBRCxRQUFRLENBQUNwSixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDbEMsQ0FBQyxNQUFNO1VBQ0wsSUFBSSxDQUFDbUosUUFBUSxDQUFDcEosU0FBUyxDQUFDcUIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2pEK0gsUUFBUSxDQUFDcEosU0FBUyxDQUFDRyxNQUFNLENBQUMsUUFBUSxDQUFDO1VBQ3JDO1FBQ0Y7TUFDRjtJQUNGLENBQUM7SUFBQSxJQUVRb0osTUFBTSxHQUFmLFNBQVNBLE1BQU1BLENBQUM3SCxFQUFFLEVBQUU7TUFDbEIsSUFBTWtJLElBQUksR0FBR2xJLEVBQUUsQ0FBQ21JLHFCQUFxQixDQUFDLENBQUM7UUFDckNDLFVBQVUsR0FBRzFKLE1BQU0sQ0FBQzJKLFdBQVcsSUFBSTNLLFFBQVEsQ0FBQzRLLGVBQWUsQ0FBQ0YsVUFBVTtRQUN0RUcsU0FBUyxHQUFHN0osTUFBTSxDQUFDdUosV0FBVyxJQUFJdkssUUFBUSxDQUFDNEssZUFBZSxDQUFDQyxTQUFTO01BQ3RFLE9BQU87UUFDTFQsR0FBRyxFQUFFSSxJQUFJLENBQUNKLEdBQUcsR0FBR1MsU0FBUztRQUN6QkMsSUFBSSxFQUFFTixJQUFJLENBQUNNLElBQUksR0FBR0o7TUFDcEIsQ0FBQztJQUNILENBQUM7SUFoQ0QxSixNQUFNLENBQUNaLGdCQUFnQixDQUFDLFFBQVEsRUFBRTJKLFlBQVksQ0FBQztJQWtDL0NqSixVQUFVLENBQUMsWUFBTTtNQUNmaUosWUFBWSxDQUFDLENBQUM7SUFDaEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUNUO0FBQ0Y7O0FDMUNBLElBQUlnQix3QkFBd0IsR0FBRyxLQUFLO0FBRTdCLFNBQVNDLGFBQWFBLENBQUEsRUFBRztFQUM5QixJQUFJRCx3QkFBd0IsRUFBRTtFQUM5QkEsd0JBQXdCLEdBQUcsSUFBSTtFQUMvQjtFQUNBLElBQUkvSyxRQUFRLENBQUNRLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUNDLE1BQU0sRUFBRTtJQUM3RFQsUUFBUSxDQUFDUSxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDRSxPQUFPLENBQUMsVUFBQ3VLLE9BQU8sRUFBSztNQUN0RUEsT0FBTyxDQUFDN0UsT0FBTyxDQUFDNEUsYUFBYSxHQUFHQyxPQUFPLENBQUM1SyxTQUFTO01BQ2pENEssT0FBTyxDQUFDNUssU0FBUyxNQUFNO0lBQ3pCLENBQUMsQ0FBQztFQUNKOztFQUVBO0VBQ0EsU0FBUzZLLHFCQUFxQkEsQ0FBQ0YsYUFBYSxFQUFFO0lBQzVDLElBQUlHLGNBQWMsR0FBRyxJQUFJO0lBQ3pCLElBQU0xQyxRQUFRLEdBQUcyQyxRQUFRLENBQUNKLGFBQWEsQ0FBQzVFLE9BQU8sQ0FBQ2lGLGtCQUFrQixDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDN0UsSUFBTUMsVUFBVSxHQUFHRixRQUFRLENBQUNKLGFBQWEsQ0FBQzVFLE9BQU8sQ0FBQzRFLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDbEUsSUFBTU8sYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQUV6QixJQUFNQyxLQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBSUMsU0FBUyxFQUFLO01BQzFCLElBQUksQ0FBQ04sY0FBYyxFQUFFQSxjQUFjLEdBQUdNLFNBQVM7TUFDL0MsSUFBTUMsUUFBUSxHQUFHQyxJQUFJLENBQUNDLEdBQUcsQ0FBQyxDQUFDSCxTQUFTLEdBQUdOLGNBQWMsSUFBSTFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZFdUMsYUFBYSxDQUFDM0ssU0FBUyxHQUFHc0wsSUFBSSxDQUFDRSxLQUFLLENBQ2xDSCxRQUFRLElBQUlILGFBQWEsR0FBR0QsVUFBVSxDQUN4QyxDQUFDLENBQUMsQ0FBQzs7TUFFSCxJQUFJSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQ2hCMUssTUFBTSxDQUFDOEsscUJBQXFCLENBQUNOLEtBQUksQ0FBQyxDQUFDLENBQUM7TUFDdEM7SUFDRixDQUFDO0lBQ0R4SyxNQUFNLENBQUM4SyxxQkFBcUIsQ0FBQ04sS0FBSSxDQUFDLENBQUMsQ0FBQztFQUN0Qzs7RUFFQTtFQUNBLFNBQVNPLGtCQUFrQkEsQ0FBQSxFQUFHO0lBQzVCLElBQU1DLGVBQWUsR0FBRztNQUN0QkMsU0FBUyxFQUFFLEdBQUcsQ0FBRTtJQUNsQixDQUFDO0lBQ0QsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBSUMsT0FBTyxFQUFFQyxRQUFRLEVBQUs7TUFDOUNELE9BQU8sQ0FBQ3pMLE9BQU8sQ0FBQyxVQUFDMkwsS0FBSyxFQUFLO1FBQ3pCLElBQUlBLEtBQUssQ0FBQ0MsY0FBYyxFQUFFO1VBQ3hCO1VBQ0EsSUFBTTlILE1BQU0sR0FBRzZILEtBQUssQ0FBQzdILE1BQU07O1VBRTNCO1VBQ0ExRCxVQUFVLENBQUMsWUFBTTtZQUNmb0sscUJBQXFCLENBQUMxRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9CNEgsUUFBUSxDQUFDRyxTQUFTLENBQUMvSCxNQUFNLENBQUMsQ0FBQyxDQUFDO1VBQzlCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1g7TUFDRixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBTTRILFFBQVEsR0FBRyxJQUFJSSxvQkFBb0IsQ0FDdkNOLGdCQUFnQixFQUNoQkYsZUFDRixDQUFDOztJQUVEO0lBQ0FoTSxRQUFRLENBQUNRLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUNFLE9BQU8sQ0FBQyxVQUFDdUssT0FBTyxFQUFLO01BQ3RFbUIsUUFBUSxDQUFDSyxPQUFPLENBQUN4QixPQUFPLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0VBQ0o7O0VBRUE7RUFDQWMsa0JBQWtCLENBQUMsQ0FBQztBQUN0Qjs7QUNuRUEsSUFBSVcscUJBQXFCLEdBQUcsS0FBSztBQUUxQixTQUFTckosUUFBUUEsQ0FBQSxFQUFHO0VBQ3pCLElBQU1zSixhQUFhLEdBQUczTSxRQUFRLENBQUNRLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO0VBRWpFLElBQUltTSxhQUFhLENBQUNsTSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQzVCa00sYUFBYSxDQUFDak0sT0FBTyxDQUFDLFVBQUNtRCxJQUFJLEVBQUs7TUFDOUIsSUFBTTNELEdBQUcsR0FBRzJELElBQUksQ0FBQzVELGFBQWEsQ0FBQyxlQUFlLENBQUM7TUFDL0MsSUFBTTJNLFFBQVEsR0FBRy9JLElBQUksQ0FBQzVELGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztNQUVoRSxJQUFJQyxHQUFHLElBQUksQ0FBQ0EsR0FBRyxDQUFDa0csT0FBTyxDQUFDeUcsZ0JBQWdCLEVBQUU7UUFDeEMzTSxHQUFHLENBQUNrRyxPQUFPLENBQUN5RyxnQkFBZ0IsR0FBRyxNQUFNO1FBQ3JDM00sR0FBRyxDQUFDRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ3lCLENBQUMsRUFBSztVQUNuQ0EsQ0FBQyxDQUFDaUwsZUFBZSxDQUFDLENBQUM7VUFDbkJILGFBQWEsQ0FBQ2pNLE9BQU8sQ0FBQyxVQUFDNEIsRUFBRSxFQUFLO1lBQzVCLElBQUlBLEVBQUUsS0FBS3VCLElBQUksRUFBRXZCLEVBQUUsQ0FBQzFCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUNoRCxDQUFDLENBQUM7VUFDRjhDLElBQUksQ0FBQ2pELFNBQVMsQ0FBQ21CLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQyxDQUFDO01BQ0o7TUFFQSxJQUFJNkssUUFBUSxJQUFJLENBQUNBLFFBQVEsQ0FBQ3hHLE9BQU8sQ0FBQ3lHLGdCQUFnQixFQUFFO1FBQ2xERCxRQUFRLENBQUN4RyxPQUFPLENBQUN5RyxnQkFBZ0IsR0FBRyxNQUFNO1FBQzFDRCxRQUFRLENBQUN4TSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ3lCLENBQUMsRUFBSztVQUN4Q0EsQ0FBQyxDQUFDaUwsZUFBZSxDQUFDLENBQUM7VUFDbkJqSixJQUFJLENBQUNqRCxTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQyxDQUFDO01BQ0o7SUFDRixDQUFDLENBQUM7SUFFRixJQUFJLENBQUMyTCxxQkFBcUIsRUFBRTtNQUMxQkEscUJBQXFCLEdBQUcsSUFBSTtNQUU1QjFNLFFBQVEsQ0FBQ2lCLElBQUksQ0FBQ2IsZ0JBQWdCLENBQzVCLE9BQU8sRUFDUCxVQUFDeUIsQ0FBQyxFQUFLO1FBQ0wsSUFBSSxDQUFDQSxDQUFDLENBQUMyQyxNQUFNLENBQUNpQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtVQUN2Q2tILGFBQWEsQ0FBQ2pNLE9BQU8sQ0FBQyxVQUFDbUQsSUFBSTtZQUFBLE9BQUtBLElBQUksQ0FBQ2pELFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFFBQVEsQ0FBQztVQUFBLEVBQUM7UUFDbEU7TUFDRixDQUFDLEVBQ0QsSUFDRixDQUFDO0lBQ0g7RUFDRjtBQUNGOztBQzVDTyxTQUFTZ00sV0FBV0EsQ0FBQzNJLEtBQUssRUFBRTtFQUNqQztFQUNBLElBQU00SSxLQUFLLEdBQUk1SSxLQUFLLEdBQUcsR0FBRyxHQUFJLEdBQUcsR0FBRyxFQUFFOztFQUV0QztFQUNBLElBQU02SSxPQUFPLEdBQUdqTixRQUFRLENBQUNDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztFQUMvRCxJQUFJZ04sT0FBTyxFQUFFO0lBQ1hBLE9BQU8sQ0FBQzFLLEtBQUssQ0FBQzJLLFdBQVcsQ0FBQyxTQUFTLEtBQUE3RSxNQUFBLENBQUsyRSxLQUFLLFFBQUssQ0FBQztFQUNyRDs7RUFFQTtFQUNBLElBQUlHLEtBQUs7RUFDVixJQUFJL0ksS0FBSyxJQUFJLEVBQUUsRUFBRTtJQUNmK0ksS0FBSyxHQUFHLFlBQVk7RUFDdEIsQ0FBQyxNQUFNLElBQUkvSSxLQUFLLElBQUksRUFBRSxFQUFFO0lBQ3RCK0ksS0FBSyxHQUFHLGtCQUFrQjtFQUM1QixDQUFDLE1BQU0sSUFBSS9JLEtBQUssSUFBSSxFQUFFLEVBQUU7SUFDdEIrSSxLQUFLLEdBQUcsZUFBZTtFQUN6QixDQUFDLE1BQU0sSUFBSS9JLEtBQUssSUFBSSxFQUFFLEVBQUU7SUFDdEIrSSxLQUFLLEdBQUcsYUFBYTtFQUN2QixDQUFDLE1BQU07SUFDTEEsS0FBSyxHQUFHLGNBQWM7RUFDeEI7RUFFRCxJQUFNQyxZQUFZLEdBQUdwTixRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDNUQsSUFBSW1OLFlBQVksRUFBRTtJQUNoQkEsWUFBWSxDQUFDN0ssS0FBSyxDQUFDMkssV0FBVyxDQUFDLFNBQVMsRUFBRUMsS0FBSyxDQUFDO0VBQ2xEO0FBQ0E7O0FDNUJPLFNBQVNFLGFBQWFBLENBQUEsRUFBRztFQUM5QixJQUFNQyxLQUFLLEdBQUd0TixRQUFRLENBQUNRLGdCQUFnQixDQUFDLCtCQUErQixDQUFDO0VBRXhFOE0sS0FBSyxDQUFDNU0sT0FBTyxDQUFDLFVBQUNtRCxJQUFJLEVBQUs7SUFDdEIsSUFBTTBKLFlBQVksR0FBRzFKLElBQUksQ0FBQzVELGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUN6RSxJQUFNdU4sR0FBRyxHQUFHM0osSUFBSSxDQUFDNUQsYUFBYSxDQUFDLGtDQUFrQyxDQUFDO0lBRWxFLElBQUlzTixZQUFZLElBQUlDLEdBQUcsRUFBRTtNQUN2QixJQUFNQyxXQUFXLEdBQUdGLFlBQVksQ0FBQ3ZKLFdBQVcsQ0FBQzZDLElBQUksQ0FBQyxDQUFDO01BQ25ELElBQU02RyxPQUFPLEdBQUdDLFVBQVUsQ0FBQ0YsV0FBVyxDQUFDbE0sT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7TUFDN0RpTSxHQUFHLENBQUNqTCxLQUFLLENBQUNxTCxLQUFLLE1BQUF2RixNQUFBLENBQU1xRixPQUFPLE1BQUc7SUFDakM7RUFDRixDQUFDLENBQUM7QUFDSjs7Ozs7Ozs7SUNiTUcsS0FBSztFQUNULFNBQUFBLE1BQVlDLE9BQU8sRUFBRTtJQUFBQyxlQUFBLE9BQUFGLEtBQUE7SUFDbkIsSUFBSUcsY0FBYyxHQUFHO01BQ25CQyxNQUFNLEVBQUUsU0FBUkEsTUFBTUEsQ0FBQSxFQUFRLENBQUMsQ0FBQztNQUNoQkMsT0FBTyxFQUFFLFNBQVRBLE9BQU9BLENBQUEsRUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxJQUFJLENBQUNKLE9BQU8sR0FBR0ssTUFBTSxDQUFDQyxNQUFNLENBQUNKLGNBQWMsRUFBRUYsT0FBTyxDQUFDO0lBQ3JELElBQUksQ0FBQ08sS0FBSyxHQUFHck8sUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQzdDLElBQUksQ0FBQ3FPLEtBQUssR0FBRyxFQUFFO0lBQ2YsSUFBSSxDQUFDQyxTQUFTLEdBQUcsRUFBRTtJQUNuQixJQUFJLENBQUNDLE9BQU8sR0FBRyxLQUFLO0lBQ3BCLElBQUksQ0FBQ0MsY0FBYyxHQUFHLEtBQUs7SUFDM0IsSUFBSSxDQUFDQyxjQUFjLEdBQUcsS0FBSztJQUMzQixJQUFJLENBQUNULE1BQU0sR0FBRyxLQUFLO0lBQ25CLElBQUksQ0FBQ1UscUJBQXFCLEdBQUcsS0FBSztJQUNsQyxJQUFJLENBQUNDLGNBQWMsR0FBRyxDQUNwQixTQUFTLEVBQ1QsT0FBTyxFQUNQLFFBQVEsRUFDUixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixtQkFBbUIsRUFDbkIsaUNBQWlDLENBQ2xDO0lBQ0QsSUFBSSxDQUFDQyxVQUFVLEdBQUc3TyxRQUFRLENBQUNRLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN6RCxJQUFJLENBQUNzTyxNQUFNLENBQUMsQ0FBQztFQUNmO0VBQUMsT0FBQUMsWUFBQSxDQUFBbEIsS0FBQTtJQUFBbUIsR0FBQTtJQUFBNUssS0FBQSxFQUVELFNBQUEwSyxNQUFNQSxDQUFBLEVBQUc7TUFDUCxJQUFJLElBQUksQ0FBQ1QsS0FBSyxFQUFFO1FBQ2RyTyxRQUFRLENBQUNJLGdCQUFnQixDQUN2QixPQUFPLEVBQ1AsVUFBVXlCLENBQUMsRUFBRTtVQUNYLElBQU1vTixjQUFjLEdBQUdwTixDQUFDLENBQUMyQyxNQUFNLENBQUNpQixPQUFPLGNBQWMsQ0FBQztVQUN0RCxJQUFJd0osY0FBYyxFQUFFO1lBQ2xCLElBQUl6SyxNQUFNLEdBQUd5SyxjQUFjLENBQUM3SSxPQUFPLENBQUM4SSxJQUFJO1lBQ3hDLElBQUlYLFNBQVMsR0FBR1UsY0FBYyxDQUFDN0ksT0FBTyxDQUFDbUksU0FBUztZQUNoRCxJQUFJRCxLQUFLLEdBQUdXLGNBQWMsQ0FBQzdJLE9BQU8sQ0FBQ2tJLEtBQUs7WUFDeEMsSUFBSSxDQUFDQyxTQUFTLEdBQUdBLFNBQVMsR0FBR0EsU0FBUyxHQUFHLE1BQU07WUFDL0MsSUFBSSxDQUFDRCxLQUFLLEdBQUdBLEtBQUssR0FBR2xELFFBQVEsQ0FBQ2tELEtBQUssQ0FBQyxHQUFHLEdBQUc7WUFDMUMsSUFBSSxDQUFDRyxjQUFjLEdBQUd6TyxRQUFRLENBQUNDLGFBQWEsbUJBQUFvSSxNQUFBLENBQ3pCN0QsTUFBTSxRQUN6QixDQUFDO1lBQ0QsSUFBSSxDQUFDMkssSUFBSSxDQUFDLENBQUM7WUFDWDtVQUNGO1VBRUEsSUFBSXROLENBQUMsQ0FBQzJDLE1BQU0sQ0FBQ2lCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQzJKLEtBQUssQ0FBQyxDQUFDO1lBQ1o7VUFDRjtRQUNGLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FDYixDQUFDO1FBRURyTyxNQUFNLENBQUNaLGdCQUFnQixDQUNyQixTQUFTLEVBQ1QsVUFBVXlCLENBQUMsRUFBRTtVQUNYLElBQUlBLENBQUMsQ0FBQ3lOLE9BQU8sSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDckIsTUFBTSxFQUFFO1lBQ2xDLElBQUksQ0FBQ21CLEtBQUssQ0FBQyxDQUFDO1VBQ2Q7VUFFQSxJQUFJdk4sQ0FBQyxDQUFDME4sS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUN0QixNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDdUIsVUFBVSxDQUFDM04sQ0FBQyxDQUFDO1lBQ2xCO1VBQ0Y7UUFDRixDQUFDLENBQUN3TixJQUFJLENBQUMsSUFBSSxDQUNiLENBQUM7UUFFRHJQLFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQ3ZCLE9BQU8sRUFDUCxVQUFVeUIsQ0FBQyxFQUFFO1VBQ1gsSUFDRUEsQ0FBQyxDQUFDMkMsTUFBTSxDQUFDNUQsU0FBUyxDQUFDcUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUNwQ0osQ0FBQyxDQUFDMkMsTUFBTSxDQUFDNUQsU0FBUyxDQUFDcUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUN0QztZQUNBLElBQUksQ0FBQ21OLEtBQUssQ0FBQyxDQUFDO1VBQ2Q7UUFDRixDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQ2IsQ0FBQztNQUNIO0lBQ0Y7RUFBQztJQUFBTCxHQUFBO0lBQUE1SyxLQUFBLEVBRUQsU0FBQStLLElBQUlBLENBQUNNLFFBQVEsRUFBRTtNQUFBLElBQUFDLEtBQUE7TUFDYixJQUFJLENBQUNmLHFCQUFxQixHQUFHM08sUUFBUSxDQUFDMlAsYUFBYTtNQUVuRCxJQUFJLElBQUksQ0FBQzFCLE1BQU0sRUFBRTtRQUNmLElBQUksQ0FBQzJCLE1BQU0sR0FBRyxJQUFJO1FBQ2xCLElBQUksQ0FBQ1IsS0FBSyxDQUFDLENBQUM7UUFDWjtNQUNGO01BRUEsSUFBSSxDQUFDVixjQUFjLEdBQUcsSUFBSSxDQUFDRCxjQUFjO01BRXpDLElBQUlnQixRQUFRLEVBQUU7UUFDWixJQUFJLENBQUNmLGNBQWMsR0FBRzFPLFFBQVEsQ0FBQ0MsYUFBYSxtQkFBQW9JLE1BQUEsQ0FDekJvSCxRQUFRLFFBQzNCLENBQUM7TUFDSDtNQUVBLElBQUksQ0FBQ2YsY0FBYyxDQUFDbUIsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7TUFFbEMsSUFBSSxDQUFDeEIsS0FBSyxDQUFDOUwsS0FBSyxDQUFDMkssV0FBVyxDQUFDLG1CQUFtQixLQUFBN0UsTUFBQSxDQUFLLElBQUksQ0FBQ2lHLEtBQUssR0FBRyxJQUFJLE1BQUcsQ0FBQztNQUMxRSxJQUFJLENBQUNELEtBQUssQ0FBQ3pOLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUVuQ2IsUUFBUSxDQUFDaUIsSUFBSSxDQUFDc0IsS0FBSyxDQUFDdU4sY0FBYyxHQUFHLE1BQU07TUFDM0M5UCxRQUFRLENBQUM0SyxlQUFlLENBQUNySSxLQUFLLENBQUN1TixjQUFjLEdBQUcsTUFBTTtNQUV0RCxJQUFJLENBQUNDLGFBQWEsQ0FBQyxDQUFDO01BRXBCLElBQUksQ0FBQ3JCLGNBQWMsQ0FBQzlOLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztNQUMvQyxJQUFJLENBQUM2TixjQUFjLENBQUM5TixTQUFTLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUMwTixTQUFTLENBQUM7O01BRWpEOztNQUVBOztNQUVBO01BQ0F6TixVQUFVLENBQUMsWUFBTTtRQUNmNE8sS0FBSSxDQUFDaEIsY0FBYyxDQUFDOU4sU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBQ2pENk8sS0FBSSxDQUFDNUIsT0FBTyxDQUFDRyxNQUFNLENBQUN5QixLQUFJLENBQUM7UUFFekJBLEtBQUksQ0FBQ3pCLE1BQU0sR0FBRyxJQUFJO1FBQ2xCeUIsS0FBSSxDQUFDTSxTQUFTLENBQUMsQ0FBQztNQUNsQixDQUFDLEVBQUUsSUFBSSxDQUFDMUIsS0FBSyxDQUFDO0lBQ2hCO0VBQUM7SUFBQVUsR0FBQTtJQUFBNUssS0FBQSxFQUVELFNBQUFnTCxLQUFLQSxDQUFBLEVBQUc7TUFDTixJQUFJLElBQUksQ0FBQ1YsY0FBYyxFQUFFO1FBQ3ZCLElBQUksQ0FBQ0EsY0FBYyxDQUFDOU4sU0FBUyxDQUFDRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBRXBELElBQUksQ0FBQ3NOLEtBQUssQ0FBQ3pOLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUV0QyxJQUFJLENBQUMyTixjQUFjLENBQUM5TixTQUFTLENBQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUN3TixTQUFTLENBQUM7UUFDcEQsSUFBSSxDQUFDRyxjQUFjLENBQUM5TixTQUFTLENBQUNHLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDbEQ7O1FBRUE7O1FBRUEsSUFBSSxDQUFDa1AsWUFBWSxDQUFDLENBQUM7UUFDbkJqUSxRQUFRLENBQUNpQixJQUFJLENBQUNzQixLQUFLLENBQUN1TixjQUFjLEdBQUcsTUFBTTtRQUMzQzlQLFFBQVEsQ0FBQzRLLGVBQWUsQ0FBQ3JJLEtBQUssQ0FBQ3VOLGNBQWMsR0FBRyxNQUFNO1FBRXRELElBQUksQ0FBQ2hDLE9BQU8sQ0FBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUNELE1BQU0sR0FBRyxLQUFLO1FBQ25CLElBQUksQ0FBQytCLFNBQVMsQ0FBQyxDQUFDO1FBRWhCLElBQUksSUFBSSxDQUFDSixNQUFNLEVBQUU7VUFDZixJQUFJLENBQUNBLE1BQU0sR0FBRyxLQUFLO1VBQ25CLElBQUksQ0FBQ1QsSUFBSSxDQUFDLENBQUM7UUFDYjtNQUNGO0lBQ0Y7RUFBQztJQUFBSCxHQUFBO0lBQUE1SyxLQUFBLEVBRUQsU0FBQW9MLFVBQVVBLENBQUMzTixDQUFDLEVBQUU7TUFDWixJQUFNcU8sS0FBSyxHQUFHLElBQUksQ0FBQ3hCLGNBQWMsQ0FBQ2xPLGdCQUFnQixDQUFDLElBQUksQ0FBQ29PLGNBQWMsQ0FBQztNQUN2RSxJQUFNdUIsVUFBVSxHQUFHbkssS0FBSyxDQUFDc0QsU0FBUyxDQUFDOEcsS0FBSyxDQUFDQyxJQUFJLENBQUNILEtBQUssQ0FBQztNQUNwRCxJQUFNSSxnQkFBZ0IsR0FBR0gsVUFBVSxDQUFDbEosT0FBTyxDQUFDakgsUUFBUSxDQUFDMlAsYUFBYSxDQUFDO01BQ25FLElBQUk5TixDQUFDLENBQUMwTyxRQUFRLElBQUlELGdCQUFnQixLQUFLLENBQUMsRUFBRTtRQUN4Q0gsVUFBVSxDQUFDQSxVQUFVLENBQUMxUCxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM4RyxLQUFLLENBQUMsQ0FBQztRQUN6QzFGLENBQUMsQ0FBQ3FCLGNBQWMsQ0FBQyxDQUFDO01BQ3BCO01BQ0EsSUFBSSxDQUFDckIsQ0FBQyxDQUFDME8sUUFBUSxJQUFJRCxnQkFBZ0IsS0FBS0gsVUFBVSxDQUFDMVAsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM3RDBQLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzVJLEtBQUssQ0FBQyxDQUFDO1FBQ3JCMUYsQ0FBQyxDQUFDcUIsY0FBYyxDQUFDLENBQUM7TUFDcEI7SUFDRjtFQUFDO0lBQUE4TCxHQUFBO0lBQUE1SyxLQUFBLEVBRUQsU0FBQTRMLFNBQVNBLENBQUEsRUFBRztNQUNWLElBQU1FLEtBQUssR0FBRyxJQUFJLENBQUN4QixjQUFjLENBQUNsTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUNvTyxjQUFjLENBQUM7TUFDdkUsSUFBSSxJQUFJLENBQUNYLE1BQU0sRUFBRTtRQUNmLElBQUlpQyxLQUFLLENBQUN6UCxNQUFNLEVBQUV5UCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMzSSxLQUFLLENBQUMsQ0FBQztNQUNwQyxDQUFDLE1BQU07UUFDTCxJQUFJLENBQUNvSCxxQkFBcUIsQ0FBQ3BILEtBQUssQ0FBQyxDQUFDO01BQ3BDO0lBQ0Y7RUFBQztJQUFBeUgsR0FBQTtJQUFBNUssS0FBQSxFQUVELFNBQUEyTCxhQUFhQSxDQUFBLEVBQUc7TUFDZCxJQUFJUyxZQUFZLEdBQUd4UCxNQUFNLENBQUN5UCxPQUFPO01BQ2pDLElBQUksQ0FBQ0MsV0FBVyxDQUFDLENBQUM7TUFDbEIxUSxRQUFRLENBQUNpQixJQUFJLENBQUNMLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO01BQzdDYixRQUFRLENBQUNpQixJQUFJLENBQUNtRixPQUFPLENBQUN1SyxRQUFRLEdBQUdILFlBQVk7TUFDN0N4USxRQUFRLENBQUNpQixJQUFJLENBQUNzQixLQUFLLENBQUM2SCxHQUFHLEdBQUcsQ0FBQ29HLFlBQVksR0FBRyxJQUFJO0lBQ2hEO0VBQUM7SUFBQXhCLEdBQUE7SUFBQTVLLEtBQUEsRUFFRCxTQUFBNkwsWUFBWUEsQ0FBQSxFQUFHO01BQ2IsSUFBSU8sWUFBWSxHQUFHcEYsUUFBUSxDQUFDcEwsUUFBUSxDQUFDaUIsSUFBSSxDQUFDbUYsT0FBTyxDQUFDdUssUUFBUSxFQUFFLEVBQUUsQ0FBQztNQUMvRCxJQUFJLENBQUNDLGFBQWEsQ0FBQyxDQUFDO01BQ3BCNVEsUUFBUSxDQUFDaUIsSUFBSSxDQUFDc0IsS0FBSyxDQUFDNkgsR0FBRyxHQUFHLE1BQU07TUFDaENwSyxRQUFRLENBQUNpQixJQUFJLENBQUNMLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGdCQUFnQixDQUFDO01BQ2hEQyxNQUFNLENBQUM2TyxRQUFRLENBQUM7UUFDZHpGLEdBQUcsRUFBRW9HLFlBQVk7UUFDakIxRixJQUFJLEVBQUU7TUFDUixDQUFDLENBQUM7TUFDRjlLLFFBQVEsQ0FBQ2lCLElBQUksQ0FBQ3FELGVBQWUsQ0FBQyxlQUFlLENBQUM7SUFDaEQ7RUFBQztJQUFBMEssR0FBQTtJQUFBNUssS0FBQSxFQUVELFNBQUFzTSxXQUFXQSxDQUFBLEVBQUc7TUFDWixJQUFJRyxhQUFhLEdBQUc3UCxNQUFNLENBQUN5QixVQUFVLEdBQUd6QyxRQUFRLENBQUNpQixJQUFJLENBQUN5QixXQUFXLEdBQUcsSUFBSTtNQUN4RSxJQUFJLENBQUNtTSxVQUFVLENBQUNuTyxPQUFPLENBQUMsVUFBQzRCLEVBQUUsRUFBSztRQUM5QkEsRUFBRSxDQUFDQyxLQUFLLENBQUNDLFlBQVksR0FBR3FPLGFBQWE7TUFDdkMsQ0FBQyxDQUFDO01BQ0Y3USxRQUFRLENBQUNpQixJQUFJLENBQUNzQixLQUFLLENBQUNDLFlBQVksR0FBR3FPLGFBQWE7SUFDbEQ7RUFBQztJQUFBN0IsR0FBQTtJQUFBNUssS0FBQSxFQUVELFNBQUF3TSxhQUFhQSxDQUFBLEVBQUc7TUFDZCxJQUFJLENBQUMvQixVQUFVLENBQUNuTyxPQUFPLENBQUMsVUFBQzRCLEVBQUUsRUFBSztRQUM5QkEsRUFBRSxDQUFDQyxLQUFLLENBQUNDLFlBQVksR0FBRyxLQUFLO01BQy9CLENBQUMsQ0FBQztNQUNGeEMsUUFBUSxDQUFDaUIsSUFBSSxDQUFDc0IsS0FBSyxDQUFDQyxZQUFZLEdBQUcsS0FBSztJQUMxQztFQUFDO0FBQUE7QUFHSSxJQUFNNkwsS0FBSyxHQUFHLElBQUlSLEtBQUssQ0FBQztFQUM3QkksTUFBTSxFQUFFLFNBQVJBLE1BQU1BLENBQUdJLEtBQUssRUFBSztJQUNqQnlDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUN2QixDQUFDO0VBQ0Q3QyxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQSxFQUFRO0lBQ2I0QyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDdkI7O0VBRUE7QUFDRixDQUFDLENBQUM7O0FDOU42QztBQUNRO0FBQ0o7QUFDTjtBQUNjO0FBQ1Y7QUFDQTtBQUNVO0FBQ2hCO0FBRTNDL1AsTUFBTSxDQUFDWixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsWUFBTTtFQUNwQzZRLElBQUksQ0FBQyxDQUFDO0FBQ1IsQ0FBQyxDQUFDO0FBRUZBLElBQUksQ0FBQyxDQUFDO0FBRU4sU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0VBQ2QzUSxhQUFhLENBQUMsQ0FBQztFQUNmUixPQUFPLENBQUMsQ0FBQztFQUNUK0osTUFBTSxDQUFDLENBQUM7RUFDUm1CLGFBQWEsQ0FBQyxDQUFDO0VBQ2YzSCxRQUFRLENBQUMsQ0FBQztFQUNWMEosV0FBVyxDQUFDLEVBQUUsQ0FBQztFQUNmTSxhQUFhLENBQUMsQ0FBQztBQUNqQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9jb21wb25lbnRzL2NvdW50ZXIuanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9jb21wb25lbnRzL3ByZWxvYWRlci5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL2d1bHAtdGVtcGxhdGUvLi9zcmMvanMvY29tcG9uZW50cy9sb2FkZWQuanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9jb21wb25lbnRzL2RpZ2l0c0NvdW50ZXIuanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9jb21wb25lbnRzL2Ryb3Bkb3duLmpzIiwid2VicGFjazovL2d1bHAtdGVtcGxhdGUvLi9zcmMvanMvY29tcG9uZW50cy9nYXVnZS5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvc2V0UmV2aWV3QmFycy5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY291bnRlcigpIHtcbiAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY291bnRlcl9fbGFiZWwnKTtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvdW50ZXJfX2J0bicpO1xuXG4gIGlmICghbGFiZWwgfHwgIWJ0bikgcmV0dXJuO1xuXG4gIGxldCBjb3VudGVyID0gMDtcbiAgcmVuZGVyKCk7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb3VudGVyKys7XG4gICAgcmVuZGVyKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBjb3VudGVyO1xuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGlkZVByZWxvYWRlcigpIHtcbiAgY29uc3QgcHJlbG9hZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVsb2FkZXInKTtcblxuICBpZiAocHJlbG9hZGVycyAmJiBwcmVsb2FkZXJzLmxlbmd0aCkge1xuICAgIHByZWxvYWRlcnMuZm9yRWFjaCgocHJlbG9hZGVyKSA9PiB7XG4gICAgICBwcmVsb2FkZXIuY2xhc3NMaXN0LmFkZCgncHJlbG9hZGVyX2hpZGRlbicpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHByZWxvYWRlci5yZW1vdmUoKTtcbiAgICAgIH0sIDYwMCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XHJcbn0pO1xyXG5cclxuaWYgKGRvY3VtZW50Py5ib2R5KSB7XHJcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcclxufVxyXG5cclxubGV0IHVubG9jayA9IHRydWU7XHJcblxyXG4vLz09PT09PT09PT09PT09PT09XHJcbi8vQWN0aW9uc09uSGFzaFxyXG5pZiAobG9jYXRpb24uaGFzaCkge1xyXG4gIGNvbnN0IGhzaCA9IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwXycgKyBoc2gpKSB7XHJcbiAgICBwb3B1cF9vcGVuKGhzaCk7XHJcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuJyArIGhzaCkpIHtcclxuICAgIF9nb3RvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgaHNoKSwgNTAwLCAnJyk7XHJcbiAgfVxyXG59XHJcbi8vPT09PT09PT09PT09PT09PT1cclxuLy9NZW51XHJcbmxldCBpY29uTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uLW1lbnUnKTtcclxuaWYgKGljb25NZW51ICE9IG51bGwpIHtcclxuICBsZXQgZGVsYXkgPSA1MDA7XHJcbiAgbGV0IG1lbnVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2JvZHknKTtcclxuICBpY29uTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAodW5sb2NrKSB7XHJcbiAgICAgIGJvZHlfbG9jayhkZWxheSk7XHJcbiAgICAgIGljb25NZW51LmNsYXNzTGlzdC50b2dnbGUoJ19hY3RpdmUnKTtcclxuICAgICAgbWVudUJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnX2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtZW51X2Nsb3NlKCkge1xyXG4gIGxldCBpY29uTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uLW1lbnUnKTtcclxuICBsZXQgbWVudUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpO1xyXG4gIGljb25NZW51LmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKTtcclxuICBtZW51Qm9keS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbn1cclxuLy89PT09PT09PT09PT09PT09PVxyXG4vL0JvZHlMb2NrXHJcbmZ1bmN0aW9uIGJvZHlfbG9jayhkZWxheSkge1xyXG4gIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gIGlmIChib2R5LmNsYXNzTGlzdC5jb250YWlucygnX2xvY2snKSkge1xyXG4gICAgYm9keV9sb2NrX3JlbW92ZShkZWxheSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGJvZHlfbG9ja19hZGQoZGVsYXkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYm9keV9sb2NrX3JlbW92ZShkZWxheSkge1xyXG4gIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gIGlmICh1bmxvY2spIHtcclxuICAgIGxldCBsb2NrX3BhZGRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuX2xwJyk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxvY2tfcGFkZGluZy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBlbCA9IGxvY2tfcGFkZGluZ1tpbmRleF07XHJcbiAgICAgICAgZWwuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzBweCc7XHJcbiAgICAgIH1cclxuICAgICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcclxuICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdfbG9jaycpO1xyXG4gICAgfSwgZGVsYXkpO1xyXG5cclxuICAgIHVubG9jayA9IGZhbHNlO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHVubG9jayA9IHRydWU7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBib2R5X2xvY2tfYWRkKGRlbGF5KSB7XHJcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgaWYgKHVubG9jaykge1xyXG4gICAgbGV0IGxvY2tfcGFkZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5fbHAnKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsb2NrX3BhZGRpbmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGVsID0gbG9ja19wYWRkaW5nW2luZGV4XTtcclxuICAgICAgZWwuc3R5bGUucGFkZGluZ1JpZ2h0ID1cclxuICAgICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKS5vZmZzZXRXaWR0aCArXHJcbiAgICAgICAgJ3B4JztcclxuICAgIH1cclxuICAgIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID1cclxuICAgICAgd2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpLm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnX2xvY2snKTtcclxuXHJcbiAgICB1bmxvY2sgPSBmYWxzZTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICB1bmxvY2sgPSB0cnVlO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZmlsdGVyT3BlbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVycy1vcGVuJyk7XHJcbmNvbnN0IGZpbHRlckNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXJzLWNsb3NlJyk7XHJcbmNvbnN0IGZpbHRlcnNQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXItcmV2aWV3cycpO1xyXG5jb25zdCBmaWx0ZXJPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlci1vdmVybGF5Jyk7XHJcbmNvbnN0IGZpbHRlckRlbGF5ID0gNTAwO1xyXG5cclxuaWYgKGZpbHRlcnNQYW5lbCAmJiBmaWx0ZXJPdmVybGF5KSB7XHJcbiAgZmlsdGVyT3BlbkJ0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmICh1bmxvY2spIHtcclxuICAgICAgICBmaWx0ZXJzUGFuZWwuY2xhc3NMaXN0LmFkZCgnX2FjdGl2ZScpO1xyXG4gICAgICAgIGZpbHRlck92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnX2FjdGl2ZScpO1xyXG4gICAgICAgIGJvZHlfbG9jayhmaWx0ZXJEZWxheSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBmaWx0ZXJDbG9zZUJ0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmICh1bmxvY2spIHtcclxuICAgICAgICBmaWx0ZXJzUGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpO1xyXG4gICAgICAgIGZpbHRlck92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpO1xyXG4gICAgICAgIGJvZHlfbG9jayhmaWx0ZXJEZWxheSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1INC/0L4g0LrQu9C40LrRgyDQvdCwINGE0L7QvVxyXG4gIGZpbHRlck92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpZiAodW5sb2NrKSB7XHJcbiAgICAgIGZpbHRlcnNQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgIGZpbHRlck92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpO1xyXG4gICAgICBib2R5X2xvY2soZmlsdGVyRGVsYXkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtJyk7XHJcblxyXG5pZiAoZm9ybXMpIHtcclxuICBmb3Jtcy5mb3JFYWNoKChmb3JtKSA9PiB7XHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0RHJvcGRvd25zKCkge1xyXG4gIGNvbnN0IGRyb3Bkb3ducyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnB1dC1zZWxlY3QnKTtcclxuXHJcbiAgZHJvcGRvd25zLmZvckVhY2goKGRyb3Bkb3duKSA9PiB7XHJcbiAgICBjb25zdCBkcm9wZG93bklucHV0ID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWlucHV0Jyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkJ1dHRvbiA9IGRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1idXR0b24nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duSXRlbXNXcmFwcGVyID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLXNlbGVjdCcpO1xyXG4gICAgY29uc3QgZHJvcGRvd25JY29uID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmlucHV0X19pY29uJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlRHJvcGRvd24oKSB7XHJcbiAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RJdGVtKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICBjb25zdCBuZXdUZXh0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdzcGFuJykudGV4dENvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IG5ld0ljb25JbWcgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICBjb25zdCBuZXdJY29uU3JjID0gbmV3SWNvbkltZyA/IG5ld0ljb25JbWcuZ2V0QXR0cmlidXRlKCdzcmMnKSA6IG51bGw7XHJcblxyXG4gICAgICAvLyDQntCx0L3QvtCy0LvRj9C10LwgaW5wdXQg0Lgg0LjQutC+0L3QutGDXHJcbiAgICAgIGRyb3Bkb3duSW5wdXQudmFsdWUgPSBuZXdUZXh0O1xyXG4gICAgICBpZiAoZHJvcGRvd25JY29uICYmIG5ld0ljb25TcmMpIHtcclxuICAgICAgICBkcm9wZG93bkljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdJY29uU3JjKTtcclxuICAgICAgfSBlbHNlIGlmIChkcm9wZG93bkljb24pIHtcclxuICAgICAgICBkcm9wZG93bkljb24ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g0JfQsNC60YDRi9Cy0LDQtdC8IGRyb3Bkb3duXHJcbiAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZURyb3Bkb3duKGV2ZW50KSB7XHJcbiAgICAgIGlmICghZHJvcGRvd24uY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyb3Bkb3duSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVEcm9wZG93bik7XHJcbiAgICBkcm9wZG93bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZURyb3Bkb3duKTtcclxuICAgIGRyb3Bkb3duXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24tc2VsZWN0X19pdGVtJylcclxuICAgICAgLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RJdGVtKSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlRHJvcGRvd24pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1zZWxlY3QnKSkge1xyXG4gIGluaXREcm9wZG93bnMoKTtcclxufVxyXG5cclxuLy89PT09PT09PT09PT09PT09PVxyXG4vKlxyXG7QlNC70Y8g0YDQvtC00LjRgtC10LvRjyDRgdC70L7QudC70LXRgNC+0LIg0L/QuNGI0LXQvCDQsNGC0YDQuNCx0YPRgiBkYXRhLXNwb2xsZXJzXHJcbtCU0LvRjyDQt9Cw0LPQvtC70L7QstC60L7QsiDRgdC70L7QudC70LXRgNC+0LIg0L/QuNGI0LXQvCDQsNGC0YDQuNCx0YPRgiBkYXRhLXNwb2xsZXJcclxu0JXRgdC70Lgg0L3Rg9C20L3QviDQstC60LvRjtGH0LDRgtGMXFzQstGL0LrQu9GO0YfQsNGC0Ywg0YDQsNCx0L7RgtGDINGB0L/QvtC50LvQtdGA0L7QsiDQvdCwINGA0LDQt9C90YvRhSDRgNCw0LfQvNC10YDQsNGFINGN0LrRgNCw0L3QvtCyXHJcbtC/0LjRiNC10Lwg0L/QsNGA0LDQvNC10YLRgNGLINGI0LjRgNC40L3RiyDQuCDRgtC40L/QsCDQsdGA0LXQudC60L/QvtC40L3RgtCwLlxyXG7QndCw0L/RgNC40LzQtdGAOlxyXG5kYXRhLXNwb2xsZXJzPVwiOTkyLG1heFwiIC0g0YHQv9C+0LnQu9C10YDRiyDQsdGD0LTRg9GCINGA0LDQsdC+0YLQsNGC0Ywg0YLQvtC70YzQutC+INC90LAg0Y3QutGA0LDQvdCw0YUg0LzQtdC90YzRiNC1INC40LvQuCDRgNCw0LLQvdC+IDk5MnB4XHJcbmRhdGEtc3BvbGxlcnM9XCI3NjgsbWluXCIgLSDRgdC/0L7QudC70LXRgNGLINCx0YPQtNGD0YIg0YDQsNCx0L7RgtCw0YLRjCDRgtC+0LvRjNC60L4g0L3QsCDRjdC60YDQsNC90LDRhSDQsdC+0LvRjNGI0LUg0LjQu9C4INGA0LDQstC90L4gNzY4cHhcclxuXHJcbtCV0YHQu9C4INC90YPQttC90L4g0YfRgtC+INCx0Ysg0LIg0LHQu9C+0LrQtSDQvtGC0LrRgNGL0LLQsNC70YHRjyDQsdC+0LvRjNC60L4g0L7QtNC40L0g0YHQu9C+0LnQu9C10YAg0LTQvtCx0LDQstC70Y/QtdC8INCw0YLRgNC40LHRg9GCIGRhdGEtb25lLXNwb2xsZXJcclxuKi9cclxuXHJcbi8vIFNQT0xMRVJTXHJcbmNvbnN0IHNwb2xsZXJzQXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcG9sbGVyc10nKTtcclxuaWYgKHNwb2xsZXJzQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gIC8vINCf0L7Qu9GD0YfQtdC90LjQtSDQvtCx0YvRh9C90YvRhSDRgdC70L7QudC70LXRgNC+0LJcclxuICBjb25zdCBzcG9sbGVyc1JlZ3VsYXIgPSBBcnJheS5mcm9tKHNwb2xsZXJzQXJyYXkpLmZpbHRlcihmdW5jdGlvbiAoXHJcbiAgICBpdGVtLFxyXG4gICAgaW5kZXgsXHJcbiAgICBzZWxmLFxyXG4gICkge1xyXG4gICAgcmV0dXJuICFpdGVtLmRhdGFzZXQuc3BvbGxlcnMuc3BsaXQoJywnKVswXTtcclxuICB9KTtcclxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQvtCx0YvRh9C90YvRhSDRgdC70L7QudC70LXRgNC+0LJcclxuICBpZiAoc3BvbGxlcnNSZWd1bGFyLmxlbmd0aCA+IDApIHtcclxuICAgIGluaXRTcG9sbGVycyhzcG9sbGVyc1JlZ3VsYXIpO1xyXG4gIH1cclxuXHJcbiAgLy8g0J/QvtC70YPRh9C10L3QuNC1INGB0LvQvtC50LvQtdGA0L7QsiDRgSDQvNC10LTQuNCwINC30LDQv9GA0L7RgdCw0LzQuFxyXG4gIGNvbnN0IHNwb2xsZXJzTWVkaWEgPSBBcnJheS5mcm9tKHNwb2xsZXJzQXJyYXkpLmZpbHRlcihmdW5jdGlvbiAoXHJcbiAgICBpdGVtLFxyXG4gICAgaW5kZXgsXHJcbiAgICBzZWxmLFxyXG4gICkge1xyXG4gICAgcmV0dXJuIGl0ZW0uZGF0YXNldC5zcG9sbGVycy5zcGxpdCgnLCcpWzBdO1xyXG4gIH0pO1xyXG5cclxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC70L7QudC70LXRgNC+0LIg0YEg0LzQtdC00LjQsCDQt9Cw0L/RgNC+0YHQsNC80LhcclxuICBpZiAoc3BvbGxlcnNNZWRpYS5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zdCBicmVha3BvaW50c0FycmF5ID0gW107XHJcbiAgICBzcG9sbGVyc01lZGlhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0LnNwb2xsZXJzO1xyXG4gICAgICBjb25zdCBicmVha3BvaW50ID0ge307XHJcbiAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gcGFyYW1zLnNwbGl0KCcsJyk7XHJcbiAgICAgIGJyZWFrcG9pbnQudmFsdWUgPSBwYXJhbXNBcnJheVswXTtcclxuICAgICAgYnJlYWtwb2ludC50eXBlID0gcGFyYW1zQXJyYXlbMV0gPyBwYXJhbXNBcnJheVsxXS50cmltKCkgOiAnbWF4JztcclxuICAgICAgYnJlYWtwb2ludC5pdGVtID0gaXRlbTtcclxuICAgICAgYnJlYWtwb2ludHNBcnJheS5wdXNoKGJyZWFrcG9pbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0J/QvtC70YPRh9Cw0LXQvCDRg9C90LjQutCw0LvRjNC90YvQtSDQsdGA0LXQudC60L/QvtC40L3RgtGLXHJcbiAgICBsZXQgbWVkaWFRdWVyaWVzID0gYnJlYWtwb2ludHNBcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICAnKCcgK1xyXG4gICAgICAgIGl0ZW0udHlwZSArXHJcbiAgICAgICAgJy13aWR0aDogJyArXHJcbiAgICAgICAgaXRlbS52YWx1ZSArXHJcbiAgICAgICAgJ3B4KSwnICtcclxuICAgICAgICBpdGVtLnZhbHVlICtcclxuICAgICAgICAnLCcgK1xyXG4gICAgICAgIGl0ZW0udHlwZVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBtZWRpYVF1ZXJpZXMgPSBtZWRpYVF1ZXJpZXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xyXG4gICAgICByZXR1cm4gc2VsZi5pbmRleE9mKGl0ZW0pID09PSBpbmRleDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCg0LDQsdC+0YLQsNC10Lwg0YEg0LrQsNC20LTRi9C8INCx0YDQtdC50LrQv9C+0LjQvdGC0L7QvFxyXG4gICAgbWVkaWFRdWVyaWVzLmZvckVhY2goKGJyZWFrcG9pbnQpID0+IHtcclxuICAgICAgY29uc3QgcGFyYW1zQXJyYXkgPSBicmVha3BvaW50LnNwbGl0KCcsJyk7XHJcbiAgICAgIGNvbnN0IG1lZGlhQnJlYWtwb2ludCA9IHBhcmFtc0FycmF5WzFdO1xyXG4gICAgICBjb25zdCBtZWRpYVR5cGUgPSBwYXJhbXNBcnJheVsyXTtcclxuICAgICAgY29uc3QgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhKHBhcmFtc0FycmF5WzBdKTtcclxuXHJcbiAgICAgIC8vINCe0LHRitC10LrRgtGLINGBINC90YPQttC90YvQvNC4INGD0YHQu9C+0LLQuNGP0LzQuFxyXG4gICAgICBjb25zdCBzcG9sbGVyc0FycmF5ID0gYnJlYWtwb2ludHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gbWVkaWFCcmVha3BvaW50ICYmIGl0ZW0udHlwZSA9PT0gbWVkaWFUeXBlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyDQodC+0LHRi9GC0LjQtVxyXG4gICAgICBtYXRjaE1lZGlhLmFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0U3BvbGxlcnMoc3BvbGxlcnNBcnJheSwgbWF0Y2hNZWRpYSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpbml0U3BvbGxlcnMoc3BvbGxlcnNBcnJheSwgbWF0Y2hNZWRpYSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICBmdW5jdGlvbiBpbml0U3BvbGxlcnMoc3BvbGxlcnNBcnJheSwgbWF0Y2hNZWRpYSA9IGZhbHNlKSB7XHJcbiAgICBzcG9sbGVyc0FycmF5LmZvckVhY2goKHNwb2xsZXJzQmxvY2spID0+IHtcclxuICAgICAgc3BvbGxlcnNCbG9jayA9IG1hdGNoTWVkaWEgPyBzcG9sbGVyc0Jsb2NrLml0ZW0gOiBzcG9sbGVyc0Jsb2NrO1xyXG4gICAgICBpZiAobWF0Y2hNZWRpYS5tYXRjaGVzIHx8ICFtYXRjaE1lZGlhKSB7XHJcbiAgICAgICAgc3BvbGxlcnNCbG9jay5jbGFzc0xpc3QuYWRkKCdfaW5pdCcpO1xyXG4gICAgICAgIGluaXRTcG9sbGVyQm9keShzcG9sbGVyc0Jsb2NrKTtcclxuICAgICAgICBzcG9sbGVyc0Jsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0U3BvbGxlckFjdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3BvbGxlcnNCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdfaW5pdCcpO1xyXG4gICAgICAgIGluaXRTcG9sbGVyQm9keShzcG9sbGVyc0Jsb2NrLCBmYWxzZSk7XHJcbiAgICAgICAgc3BvbGxlcnNCbG9jay5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNldFNwb2xsZXJBY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLy8g0KDQsNCx0L7RgtCwINGBINC60L7QvdGC0LXQvdGC0L7QvFxyXG4gIGZ1bmN0aW9uIGluaXRTcG9sbGVyQm9keShzcG9sbGVyc0Jsb2NrLCBoaWRlU3BvbGxlckJvZHkgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBzcG9sbGVyVGl0bGVzID0gc3BvbGxlcnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcG9sbGVyXScpO1xyXG4gICAgaWYgKHNwb2xsZXJUaXRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBzcG9sbGVyVGl0bGVzLmZvckVhY2goKHNwb2xsZXJUaXRsZSkgPT4ge1xyXG4gICAgICAgIGlmIChoaWRlU3BvbGxlckJvZHkpIHtcclxuICAgICAgICAgIHNwb2xsZXJUaXRsZS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XHJcbiAgICAgICAgICBpZiAoIXNwb2xsZXJUaXRsZS5jbGFzc0xpc3QuY29udGFpbnMoJ19hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBzcG9sbGVyVGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHNwb2xsZXJUaXRsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiAgICAgICAgICBzcG9sbGVyVGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRTcG9sbGVyQWN0aW9uKGUpIHtcclxuICAgIGNvbnN0IGVsID0gZS50YXJnZXQ7XHJcbiAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNwb2xsZXInKSB8fCBlbC5jbG9zZXN0KCdbZGF0YS1zcG9sbGVyXScpKSB7XHJcbiAgICAgIGNvbnN0IHNwb2xsZXJUaXRsZSA9IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zcG9sbGVyJylcclxuICAgICAgICA/IGVsXHJcbiAgICAgICAgOiBlbC5jbG9zZXN0KCdbZGF0YS1zcG9sbGVyXScpO1xyXG4gICAgICBjb25zdCBzcG9sbGVyc0Jsb2NrID0gc3BvbGxlclRpdGxlLmNsb3Nlc3QoJ1tkYXRhLXNwb2xsZXJzXScpO1xyXG4gICAgICBjb25zdCBvbmVTcG9sbGVyID0gc3BvbGxlcnNCbG9jay5oYXNBdHRyaWJ1dGUoJ2RhdGEtb25lLXNwb2xsZXInKVxyXG4gICAgICAgID8gdHJ1ZVxyXG4gICAgICAgIDogZmFsc2U7XHJcbiAgICAgIGlmICghc3BvbGxlcnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCcuX3NsaWRlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKG9uZVNwb2xsZXIgJiYgIXNwb2xsZXJUaXRsZS5jbGFzc0xpc3QuY29udGFpbnMoJ19hY3RpdmUnKSkge1xyXG4gICAgICAgICAgaGlkZVNwb2xsZXJzQm9keShzcG9sbGVyc0Jsb2NrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3BvbGxlclRpdGxlLmNsYXNzTGlzdC50b2dnbGUoJ19hY3RpdmUnKTtcclxuICAgICAgICBfc2xpZGVUb2dnbGUoc3BvbGxlclRpdGxlLm5leHRFbGVtZW50U2libGluZywgNTAwKTtcclxuICAgICAgfVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlU3BvbGxlcnNCb2R5KHNwb2xsZXJzQmxvY2spIHtcclxuICAgIGNvbnN0IHNwb2xsZXJBY3RpdmVUaXRsZSA9IHNwb2xsZXJzQmxvY2sucXVlcnlTZWxlY3RvcihcclxuICAgICAgJ1tkYXRhLXNwb2xsZXJdLl9hY3RpdmUnLFxyXG4gICAgKTtcclxuICAgIGlmIChzcG9sbGVyQWN0aXZlVGl0bGUpIHtcclxuICAgICAgc3BvbGxlckFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKTtcclxuICAgICAgX3NsaWRlVXAoc3BvbGxlckFjdGl2ZVRpdGxlLm5leHRFbGVtZW50U2libGluZywgNTAwKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGJ0blNob3dQYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaG93LXBhc3MnKTtcclxuXHJcbmlmIChidG5TaG93UGFzc3dvcmQpIHtcclxuICBidG5TaG93UGFzc3dvcmQuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfX2NvbnRyb2wnKS50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfX2NvbnRyb2wnKS5mb2N1cygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfX2NvbnRyb2wnKS50eXBlID0gJ3Bhc3N3b3JkJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5jb25zdCBzd2l0Y2hCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN3aXRjaC1idG4nKTtcclxuXHJcbmlmIChzd2l0Y2hCdG5zKSB7XHJcbiAgc3dpdGNoQnRucy5mb3JFYWNoKChzd2l0Y2hCdG4pID0+IHtcclxuICAgIHN3aXRjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzd2l0Y2gtb24nKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsZScpLmZvckVhY2goKGJsb2NrKSA9PiB7XHJcbiAgY29uc3QgZmlsZUlucHV0ID0gYmxvY2sucXVlcnlTZWxlY3RvcignLmZpbGUtaW5wdXQnKTtcclxuICBjb25zdCBmaWxlUHJldmlldyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXByZXZpZXcnKTtcclxuXHJcbiAgZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgIGNvbnN0IGZpbGUgPSBmaWxlSW5wdXQuZmlsZXNbMF07XHJcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcclxuXHJcbiAgICAvLyDQn9GA0L7QstC10YDQutCwINGC0LjQv9CwXHJcbiAgICBpZiAoIVsnaW1hZ2UvanBlZycsICdpbWFnZS9wbmcnXS5pbmNsdWRlcyhmaWxlLnR5cGUpKSB7XHJcbiAgICAgIGFsZXJ0KCfQoNCw0LfRgNC10YjQtdC90Ysg0YLQvtC70YzQutC+INC40LfQvtCx0YDQsNC20LXQvdC40Y8gKEpQRUcsIFBORykuJyk7XHJcbiAgICAgIGZpbGVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICBmaWxlUHJldmlldy5pbm5lckhUTUwgPSAnJzsgLy8g0J7Rh9C40YHRgtC60LAg0L/RgNC10LLRjNGOXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQn9GA0L7QstC10YDQutCwINGA0LDQt9C80LXRgNCwXHJcbiAgICBpZiAoZmlsZS5zaXplID4gNCAqIDEwMjQgKiAxMDI0KSB7XHJcbiAgICAgIGFsZXJ0KCfQpNCw0LnQuyDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LzQtdC90YzRiNC1IDQg0JzQkS4nKTtcclxuICAgICAgZmlsZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgIGZpbGVQcmV2aWV3LmlubmVySFRNTCA9ICcnOyAvLyDQntGH0LjRgdGC0LrQsCDQv9GA0LXQstGM0Y5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZmlsZVByZXZpZXcuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtlLnRhcmdldC5yZXN1bHR9XCIgYWx0PVwi0KTQvtGC0L5cIj5gO1xyXG4gICAgfTtcclxuICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhbGVydCgn0J7RiNC40LHQutCwINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGE0LDQudC70LAuJyk7XHJcbiAgICB9O1xyXG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuLy89PT09PT09PT09PT09PT09PVxyXG4vL1NsaWRlVG9nZ2xlXHJcbmxldCBfc2xpZGVVcCA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHRhcmdldC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ1RvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0YXJnZXQuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLXRvcCcpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcclxuICAgIH0sIGR1cmF0aW9uKTtcclxuICB9XHJcbn07XHJcbmxldCBfc2xpZGVEb3duID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDApID0+IHtcclxuICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XHJcbiAgICBpZiAodGFyZ2V0LmhpZGRlbikge1xyXG4gICAgICB0YXJnZXQuaGlkZGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsZXQgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ1RvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xyXG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcclxuICAgIH0sIGR1cmF0aW9uKTtcclxuICB9XHJcbn07XHJcbmxldCBfc2xpZGVUb2dnbGUgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCkgPT4ge1xyXG4gIGlmICh0YXJnZXQuaGlkZGVuKSB7XHJcbiAgICByZXR1cm4gX3NsaWRlRG93bih0YXJnZXQsIGR1cmF0aW9uKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIF9zbGlkZVVwKHRhcmdldCwgZHVyYXRpb24pO1xyXG4gIH1cclxufTtcclxuXHJcbi8v0J/QvtC70LjRhNC40LvRi1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQv9C+0LTQtNC10YDQttC60YNcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgIC8vINGA0LXQsNC70LjQt9GD0LXQvFxyXG4gICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChjc3MpIHtcclxuICAgICAgdmFyIG5vZGUgPSB0aGlzO1xyXG4gICAgICB3aGlsZSAobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoY3NzKSkgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgZWxzZSBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICB9XHJcbn0pKCk7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC/0L7QtNC00LXRgNC20LrRg1xyXG4gIGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xyXG4gICAgLy8g0L7Qv9GA0LXQtNC10LvRj9C10Lwg0YHQstC+0LnRgdGC0LLQvlxyXG4gICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9XHJcbiAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yO1xyXG4gIH1cclxufSkoKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGxvYWRlZCgpIHtcclxuICBjb25zdCBhbmltSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5pbWF0ZScpO1xyXG5cclxuICBpZiAoYW5pbUl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhbmltT25TY3JvbGwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1PblNjcm9sbCgpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFuaW1JdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBhbmltSXRlbSA9IGFuaW1JdGVtc1tpbmRleF07XHJcbiAgICAgICAgY29uc3QgYW5pbUl0ZW1IZWlnaHQgPSBhbmltSXRlbS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgYW5pbUl0ZW1PZmZzZXQgPSBvZmZzZXQoYW5pbUl0ZW0pLnRvcDtcclxuXHJcbiAgICAgICAgLy8g0KPRgdC70L7QstC40LU6INGN0LvQtdC80LXQvdGCINC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9C+0LvQvdC+0YHRgtGM0Y4g0LIg0LfQvtC90LUg0LLQuNC00LjQvNC+0YHRgtC4XHJcbiAgICAgICAgY29uc3QgYW5pbUl0ZW1Qb2ludCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGFuaW1JdGVtSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwYWdlWU9mZnNldCA+IGFuaW1JdGVtT2Zmc2V0IC0gYW5pbUl0ZW1Qb2ludCArIDEwICYmXHJcbiAgICAgICAgICBwYWdlWU9mZnNldCA8IGFuaW1JdGVtT2Zmc2V0ICsgYW5pbUl0ZW1IZWlnaHRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGFuaW1JdGVtLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWFuaW1JdGVtLmNsYXNzTGlzdC5jb250YWlucygnX2FuaW0tbm8taGlkZScpKSB7XHJcbiAgICAgICAgICAgIGFuaW1JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9mZnNldChlbCkge1xyXG4gICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcclxuICAgICAgICBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0b3A6IHJlY3QudG9wICsgc2Nyb2xsVG9wLFxyXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHNjcm9sbExlZnQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGFuaW1PblNjcm9sbCgpO1xyXG4gICAgfSwgMzAwKTtcclxuICB9XHJcbn1cclxuIiwibGV0IGRpZ2l0c0NvdW50ZXJJbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpZ2l0c0NvdW50ZXIoKSB7XHJcbiAgaWYgKGRpZ2l0c0NvdW50ZXJJbml0aWFsaXplZCkgcmV0dXJuO1xyXG4gIGRpZ2l0c0NvdW50ZXJJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgLy8g0J7QsdC90YPQu9C10L3QuNC1INC30L3QsNGH0LXQvdC40LlcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlnaXRzLWNvdW50ZXJdJykubGVuZ3RoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaWdpdHMtY291bnRlcl0nKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGVsZW1lbnQuZGF0YXNldC5kaWdpdHNDb3VudGVyID0gZWxlbWVudC5pbm5lckhUTUw7XHJcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYDBgO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyDQpNGD0L3QutGG0LjRjyDQsNC90LjQvNCw0YbQuNC4INGB0YfQtdGC0YfQuNC60LBcclxuICBmdW5jdGlvbiBkaWdpdHNDb3VudGVyc0FuaW1hdGUoZGlnaXRzQ291bnRlcikge1xyXG4gICAgbGV0IHN0YXJ0VGltZXN0YW1wID0gbnVsbDtcclxuICAgIGNvbnN0IGR1cmF0aW9uID0gcGFyc2VJbnQoZGlnaXRzQ291bnRlci5kYXRhc2V0LmRpZ2l0c0NvdW50ZXJTcGVlZCkgfHwgMTAwMDsgLy8g0KHQutC+0YDQvtGB0YLRjCDQsNC90LjQvNCw0YbQuNC4ICjQv9C+INGD0LzQvtC70YfQsNC90LjRjiAxMDAwINC80YEpXHJcbiAgICBjb25zdCBzdGFydFZhbHVlID0gcGFyc2VJbnQoZGlnaXRzQ291bnRlci5kYXRhc2V0LmRpZ2l0c0NvdW50ZXIpOyAvLyDQmtC+0L3QtdGH0L3QvtC1INC30L3QsNGH0LXQvdC40LVcclxuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSAwOyAvLyDQndCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSAoMClcclxuXHJcbiAgICBjb25zdCBzdGVwID0gKHRpbWVzdGFtcCkgPT4ge1xyXG4gICAgICBpZiAoIXN0YXJ0VGltZXN0YW1wKSBzdGFydFRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcclxuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1pbigodGltZXN0YW1wIC0gc3RhcnRUaW1lc3RhbXApIC8gZHVyYXRpb24sIDEpOyAvLyDQn9GA0L7Qs9GA0LXRgdGBICgwINC00L4gMSlcclxuICAgICAgZGlnaXRzQ291bnRlci5pbm5lckhUTUwgPSBNYXRoLmZsb29yKFxyXG4gICAgICAgIHByb2dyZXNzICogKHN0YXJ0UG9zaXRpb24gKyBzdGFydFZhbHVlKSxcclxuICAgICAgKTsgLy8g0KLQtdC60YPRidC10LUg0LfQvdCw0YfQtdC90LjQtVxyXG5cclxuICAgICAgaWYgKHByb2dyZXNzIDwgMSkge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7IC8vINCf0YDQvtC00L7Qu9C20LXQvdC40LUg0LDQvdC40LzQsNGG0LjQuFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTsgLy8g0JfQsNC/0YPRgdC6INCw0L3QuNC80LDRhtC40LhcclxuICB9XHJcblxyXG4gIC8vINCd0LDRgdGC0YDQvtC50LrQsCBJbnRlcnNlY3Rpb24gT2JzZXJ2ZXJcclxuICBmdW5jdGlvbiBkaWdpdHNDb3VudGVyc0luaXQoKSB7XHJcbiAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XHJcbiAgICAgIHRocmVzaG9sZDogMC4yLCAvLyDQn9C+0LvQvtCy0LjQvdCwINGN0LvQtdC80LXQvdGC0LAg0LTQvtC70LbQvdCwINCx0YvRgtGMINCy0LjQtNC90LBcclxuICAgIH07XHJcbiAgICBjb25zdCBvYnNlcnZlckNhbGxiYWNrID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XHJcbiAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgIC8vINCV0YHQu9C4INGN0LvQtdC80LXQvdGCINCyINC30L7QvdC1INCy0LjQtNC40LzQvtGB0YLQuFxyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW50cnkudGFyZ2V0O1xyXG5cclxuICAgICAgICAgIC8vINCU0L7QsdCw0LLQu9GP0LXQvCDQt9Cw0LTQtdGA0LbQutGDINCyIDIg0YHQtdC60YPQvdC00Ysg0L/QtdGA0LXQtCDQvdCw0YfQsNC70L7QvCDQsNC90LjQvNCw0YbQuNC4XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgZGlnaXRzQ291bnRlcnNBbmltYXRlKHRhcmdldCk7IC8vINCX0LDQv9GD0YHQuiDQsNC90LjQvNCw0YbQuNC4XHJcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZSh0YXJnZXQpOyAvLyDQodC90Y/RgtGMINC90LDQsdC70Y7QtNC10L3QuNC1INC/0L7RgdC70LUg0LDQvdC40LzQsNGG0LjQuFxyXG4gICAgICAgICAgfSwgMTAwKTsgLy8g0JfQsNC00LXRgNC20LrQsCDQsiAyMDAwINC80YEgKDIg0YHQtdC60YPQvdC00YspXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXHJcbiAgICAgIG9ic2VydmVyQ2FsbGJhY2ssXHJcbiAgICAgIG9ic2VydmVyT3B0aW9ucyxcclxuICAgICk7XHJcblxyXG4gICAgLy8g0J/QvtC00LrQu9GO0YfQsNC10Lwgb2JzZXJ2ZXIg0Log0LrQsNC20LTQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyDRgSBkYXRhLWRpZ2l0cy1jb3VudGVyXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaWdpdHMtY291bnRlcl0nKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vINCX0LDQv9GD0YHQuiDRhNGD0L3QutGG0LjQuFxyXG4gIGRpZ2l0c0NvdW50ZXJzSW5pdCgpO1xyXG59XHJcbiIsImxldCBpc0Ryb3Bkb3duSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcm9wZG93bigpIHtcclxuICBjb25zdCBkcm9wZG93bkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLWl0ZW0nKTtcclxuXHJcbiAgaWYgKGRyb3Bkb3duSXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgZHJvcGRvd25JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWJ0bicpO1xyXG4gICAgICBjb25zdCBjbG9zZUJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duIC5kcm9wZG93bi1jbG9zZScpO1xyXG5cclxuICAgICAgaWYgKGJ0biAmJiAhYnRuLmRhdGFzZXQubGlzdGVuZXJBdHRhY2hlZCkge1xyXG4gICAgICAgIGJ0bi5kYXRhc2V0Lmxpc3RlbmVyQXR0YWNoZWQgPSAndHJ1ZSc7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBkcm9wZG93bkl0ZW1zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbCAhPT0gaXRlbSkgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjbG9zZUJ0biAmJiAhY2xvc2VCdG4uZGF0YXNldC5saXN0ZW5lckF0dGFjaGVkKSB7XHJcbiAgICAgICAgY2xvc2VCdG4uZGF0YXNldC5saXN0ZW5lckF0dGFjaGVkID0gJ3RydWUnO1xyXG4gICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWlzRHJvcGRvd25Jbml0aWFsaXplZCkge1xyXG4gICAgICBpc0Ryb3Bkb3duSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICdjbGljaycsXHJcbiAgICAgICAgKGUpID0+IHtcclxuICAgICAgICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmRyb3Bkb3duLWl0ZW0nKSkge1xyXG4gICAgICAgICAgICBkcm9wZG93bkl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJ1ZSxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdhdWdlKHZhbHVlKSB7XHJcbiAgLy8g0KDQsNGB0YfQtdGCINGD0LPQu9CwINC/0L7QstC+0YDQvtGC0LBcclxuICBjb25zdCBhbmdsZSA9ICh2YWx1ZSAvIDEwMCkgKiAxODAgLSA5MDtcclxuXHJcbiAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINGD0LPQu9CwINC/0L7QstC+0YDQvtGC0LBcclxuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhdWdlX19hcnJvdy13cmFwcGVyJyk7XHJcbiAgaWYgKHdyYXBwZXIpIHtcclxuICAgIHdyYXBwZXIuc3R5bGUuc2V0UHJvcGVydHkoJy0tYW5nbGUnLCBgJHthbmdsZX1kZWdgKTtcclxuICB9XHJcblxyXG4gIC8vINCS0YvQsdC+0YAg0YbQstC10YLQsCDQv9C+INC30L3QsNGH0LXQvdC40Y5cclxuICBsZXQgY29sb3I7XHJcbiBpZiAodmFsdWUgPD0gMjApIHtcclxuICAgY29sb3IgPSAndmFyKC0tcmVkKSc7XHJcbiB9IGVsc2UgaWYgKHZhbHVlIDw9IDQwKSB7XHJcbiAgIGNvbG9yID0gJ3ZhcigtLWxpZ2h0LXJlZCknO1xyXG4gfSBlbHNlIGlmICh2YWx1ZSA8PSA2MCkge1xyXG4gICBjb2xvciA9ICd2YXIoLS1vcmFuZ2UpJztcclxuIH0gZWxzZSBpZiAodmFsdWUgPD0gODApIHtcclxuICAgY29sb3IgPSAndmFyKC0tdGVhbCknO1xyXG4gfSBlbHNlIHtcclxuICAgY29sb3IgPSAndmFyKC0tZ3JlZW4pJztcclxuIH1cclxuXHJcbmNvbnN0IGFycm93V3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYXVnZV9fYXJyb3cnKTtcclxuaWYgKGFycm93V3JhcHBlcikge1xyXG4gIGFycm93V3JhcHBlci5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcicsIGNvbG9yKTtcclxufVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBzZXRSZXZpZXdCYXJzKCkge1xyXG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlci1jb21wYW55LXJldmlld3NfX2l0ZW0nKTtcclxuXHJcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgY29uc3QgdmFsdWVFbGVtZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyLWNvbXBhbnktcmV2aWV3c19fdmFsdWUnKTtcclxuICAgIGNvbnN0IGJhciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmZpbHRlci1jb21wYW55LXJldmlld3NfX3BlcmNlbnQnKTtcclxuXHJcbiAgICBpZiAodmFsdWVFbGVtZW50ICYmIGJhcikge1xyXG4gICAgICBjb25zdCBwZXJjZW50VGV4dCA9IHZhbHVlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgIGNvbnN0IHBlcmNlbnQgPSBwYXJzZUZsb2F0KHBlcmNlbnRUZXh0LnJlcGxhY2UoJyUnLCAnJykpIHx8IDA7XHJcbiAgICAgIGJhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiY2xhc3MgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgaXNPcGVuOiAoKSA9PiB7fSxcbiAgICAgIGlzQ2xvc2U6ICgpID0+IHt9LFxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuICAgIHRoaXMuc3BlZWQgPSAnJztcbiAgICB0aGlzLmFuaW1hdGlvbiA9ICcnO1xuICAgIHRoaXMuX3JlT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuX25leHRDb250YWluZXIgPSBmYWxzZTtcbiAgICB0aGlzLm1vZGFsQ29udGFpbmVyID0gZmFsc2U7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZvY3VzRWxlbWVudHMgPSBbXG4gICAgICAnYVtocmVmXScsXG4gICAgICAnaW5wdXQnLFxuICAgICAgJ3NlbGVjdCcsXG4gICAgICAndGV4dGFyZWEnLFxuICAgICAgJ2J1dHRvbicsXG4gICAgICAnaWZyYW1lJyxcbiAgICAgICdbY29udGVudGVkaXRhYmxlXScsXG4gICAgICAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJyxcbiAgICBdO1xuICAgIHRoaXMuX2ZpeEJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maXgtYmxvY2snKTtcbiAgICB0aGlzLmV2ZW50cygpO1xuICB9XG5cbiAgZXZlbnRzKCkge1xuICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdChgW2RhdGEtcGF0aF1gKTtcbiAgICAgICAgICBpZiAoY2xpY2tlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBjbGlja2VkRWxlbWVudC5kYXRhc2V0LnBhdGg7XG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gY2xpY2tlZEVsZW1lbnQuZGF0YXNldC5hbmltYXRpb247XG4gICAgICAgICAgICBsZXQgc3BlZWQgPSBjbGlja2VkRWxlbWVudC5kYXRhc2V0LnNwZWVkO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb24gPyBhbmltYXRpb24gOiAnZmFkZSc7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQgPyBwYXJzZUludChzcGVlZCkgOiA1MDA7XG4gICAgICAgICAgICB0aGlzLl9uZXh0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgYFtkYXRhLXRhcmdldD1cIiR7dGFyZ2V0fVwiXWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1tb2RhbC1jbG9zZScpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICApO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2tleWRvd24nLFxuICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZS53aGljaCA9PSA5ICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzQ2F0Y2goZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICApO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwnKSAmJlxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb3BlbihzZWxlY3Rvcikge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5yZU9wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kYWxDb250YWluZXIgPSB0aGlzLl9uZXh0Q29udGFpbmVyO1xuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLm1vZGFsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLXRhcmdldD1cIiR7c2VsZWN0b3J9XCJdYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5tb2RhbENvbnRhaW5lci5zY3JvbGxUbygwLCAwKTtcblxuICAgIHRoaXMubW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoJy0tdHJhbnNpdGlvbi10aW1lJywgYCR7dGhpcy5zcGVlZCAvIDEwMDB9c2ApO1xuICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5zY3JvbGxCZWhhdmlvciA9ICdhdXRvJztcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSAnYXV0byc7XG5cbiAgICB0aGlzLmRpc2FibGVTY3JvbGwoKTtcblxuICAgIHRoaXMubW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtb3BlbicpO1xuICAgIHRoaXMubW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmFuaW1hdGlvbik7XG5cbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgIC8vIFx0dGhpcy5tb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLW9wZW4nKTtcblxuICAgIC8vIH0sIDApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLW9wZW4nKTtcbiAgICAgIHRoaXMub3B0aW9ucy5pc09wZW4odGhpcyk7XG5cbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuZm9jdXNUcmFwKCk7XG4gICAgfSwgdGhpcy5zcGVlZCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5tb2RhbENvbnRhaW5lcikge1xuICAgICAgdGhpcy5tb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRlLW9wZW4nKTtcblxuICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG5cbiAgICAgIHRoaXMubW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFuaW1hdGlvbik7XG4gICAgICB0aGlzLm1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW4nKTtcbiAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyB9LCB0aGlzLnNwZWVkKTtcblxuICAgICAgdGhpcy5lbmFibGVTY3JvbGwoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSAnYXV0byc7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSAnYXV0byc7XG5cbiAgICAgIHRoaXMub3B0aW9ucy5pc0Nsb3NlKHRoaXMpO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuZm9jdXNUcmFwKCk7XG5cbiAgICAgIGlmICh0aGlzLnJlT3Blbikge1xuICAgICAgICB0aGlzLnJlT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb2N1c0NhdGNoKGUpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMubW9kYWxDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c0VsZW1lbnRzKTtcbiAgICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZXMpO1xuICAgIGNvbnN0IGZvY3VzZWRJdGVtSW5kZXggPSBub2Rlc0FycmF5LmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgaWYgKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgbm9kZXNBcnJheVtub2Rlc0FycmF5Lmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZS5zaGlmdEtleSAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSBub2Rlc0FycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIG5vZGVzQXJyYXlbMF0uZm9jdXMoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBmb2N1c1RyYXAoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLm1vZGFsQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbGVtZW50cyk7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICBpZiAobm9kZXMubGVuZ3RoKSBub2Rlc1swXS5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVTY3JvbGwoKSB7XG4gICAgbGV0IHBhZ2VQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIHRoaXMubG9ja1BhZGRpbmcoKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUtc2Nyb2xsJyk7XG4gICAgZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBvc2l0aW9uID0gcGFnZVBvc2l0aW9uO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG9wID0gLXBhZ2VQb3NpdGlvbiArICdweCc7XG4gIH1cblxuICBlbmFibGVTY3JvbGwoKSB7XG4gICAgbGV0IHBhZ2VQb3NpdGlvbiA9IHBhcnNlSW50KGRvY3VtZW50LmJvZHkuZGF0YXNldC5wb3NpdGlvbiwgMTApO1xuICAgIHRoaXMudW5sb2NrUGFkZGluZygpO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG9wID0gJ2F1dG8nO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgdG9wOiBwYWdlUG9zaXRpb24sXG4gICAgICBsZWZ0OiAwLFxuICAgIH0pO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXBvc2l0aW9uJyk7XG4gIH1cblxuICBsb2NrUGFkZGluZygpIHtcbiAgICBsZXQgcGFkZGluZ09mZnNldCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgdGhpcy5fZml4QmxvY2tzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nT2Zmc2V0O1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZ09mZnNldDtcbiAgfVxuXG4gIHVubG9ja1BhZGRpbmcoKSB7XG4gICAgdGhpcy5fZml4QmxvY2tzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcbiAgICB9KTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcwcHgnO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtb2RhbCA9IG5ldyBNb2RhbCh7XG4gIGlzT3BlbjogKG1vZGFsKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ29wZW5lZCcpO1xuICB9LFxuICBpc0Nsb3NlOiAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2Nsb3NlZCcpO1xuICB9LFxuXG4gIC8vIG5ldyBNb2RhbCgpLm9wZW4oJ3NlY29uZCcpO1xufSk7XG4iLCJpbXBvcnQgeyBjb3VudGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdW50ZXInO1xuaW1wb3J0IHsgaGlkZVByZWxvYWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9wcmVsb2FkZXInO1xuaW1wb3J0IHsgZnVuY3Rpb25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBsb2FkZWQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGVkJztcbmltcG9ydCB7IGRpZ2l0c0NvdW50ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlnaXRzQ291bnRlcic7XG5pbXBvcnQgeyBkcm9wZG93biB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bic7XG5pbXBvcnQgeyB1cGRhdGVHYXVnZSB9IGZyb20gJy4vY29tcG9uZW50cy9nYXVnZSc7XG5pbXBvcnQgeyBzZXRSZXZpZXdCYXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3NldFJldmlld0JhcnMnO1xuaW1wb3J0IHsgbW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgaW5pdCgpO1xufSk7XG5cbmluaXQoKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgaGlkZVByZWxvYWRlcigpO1xuICBjb3VudGVyKCk7XG4gIGxvYWRlZCgpO1xuICBkaWdpdHNDb3VudGVyKCk7XG4gIGRyb3Bkb3duKCk7XG4gIHVwZGF0ZUdhdWdlKDcwKTtcbiAgc2V0UmV2aWV3QmFycygpO1xufVxuIl0sIm5hbWVzIjpbImNvdW50ZXIiLCJsYWJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJ0biIsInJlbmRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbm5lckhUTUwiLCJoaWRlUHJlbG9hZGVyIiwicHJlbG9hZGVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJmb3JFYWNoIiwicHJlbG9hZGVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0VGltZW91dCIsInJlbW92ZSIsIndpbmRvdyIsImJvZHkiLCJfZG9jdW1lbnQiLCJ1bmxvY2siLCJsb2NhdGlvbiIsImhhc2giLCJoc2giLCJyZXBsYWNlIiwicG9wdXBfb3BlbiIsIl9nb3RvIiwiaWNvbk1lbnUiLCJkZWxheSIsIm1lbnVCb2R5IiwiZSIsImJvZHlfbG9jayIsInRvZ2dsZSIsIm1lbnVfY2xvc2UiLCJjb250YWlucyIsImJvZHlfbG9ja19yZW1vdmUiLCJib2R5X2xvY2tfYWRkIiwibG9ja19wYWRkaW5nIiwiaW5kZXgiLCJlbCIsInN0eWxlIiwicGFkZGluZ1JpZ2h0IiwiaW5uZXJXaWR0aCIsIm9mZnNldFdpZHRoIiwiZmlsdGVyT3BlbkJ0bnMiLCJmaWx0ZXJDbG9zZUJ0bnMiLCJmaWx0ZXJzUGFuZWwiLCJmaWx0ZXJPdmVybGF5IiwiZmlsdGVyRGVsYXkiLCJmb3JtcyIsImZvcm0iLCJwcmV2ZW50RGVmYXVsdCIsImluaXREcm9wZG93bnMiLCJkcm9wZG93bnMiLCJkcm9wZG93biIsImRyb3Bkb3duSW5wdXQiLCJkcm9wZG93bkJ1dHRvbiIsImRyb3Bkb3duSXRlbXNXcmFwcGVyIiwiZHJvcGRvd25JY29uIiwidG9nZ2xlRHJvcGRvd24iLCJzZWxlY3RJdGVtIiwiZXZlbnQiLCJpdGVtIiwiY3VycmVudFRhcmdldCIsIm5ld1RleHQiLCJ0ZXh0Q29udGVudCIsIm5ld0ljb25JbWciLCJuZXdJY29uU3JjIiwiZ2V0QXR0cmlidXRlIiwidmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjbG9zZURyb3Bkb3duIiwidGFyZ2V0Iiwic3BvbGxlcnNBcnJheSIsImluaXRTcG9sbGVycyIsIm1hdGNoTWVkaWEiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJzcG9sbGVyc0Jsb2NrIiwibWF0Y2hlcyIsImluaXRTcG9sbGVyQm9keSIsInNldFNwb2xsZXJBY3Rpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGlkZVNwb2xsZXJCb2R5Iiwic3BvbGxlclRpdGxlcyIsInNwb2xsZXJUaXRsZSIsIm5leHRFbGVtZW50U2libGluZyIsImhpZGRlbiIsImhhc0F0dHJpYnV0ZSIsImNsb3Nlc3QiLCJvbmVTcG9sbGVyIiwiaGlkZVNwb2xsZXJzQm9keSIsIl9zbGlkZVRvZ2dsZSIsInNwb2xsZXJBY3RpdmVUaXRsZSIsIl9zbGlkZVVwIiwic3BvbGxlcnNSZWd1bGFyIiwiQXJyYXkiLCJmcm9tIiwiZmlsdGVyIiwic2VsZiIsImRhdGFzZXQiLCJzcG9sbGVycyIsInNwbGl0Iiwic3BvbGxlcnNNZWRpYSIsImJyZWFrcG9pbnRzQXJyYXkiLCJwYXJhbXMiLCJicmVha3BvaW50IiwicGFyYW1zQXJyYXkiLCJ0eXBlIiwidHJpbSIsInB1c2giLCJtZWRpYVF1ZXJpZXMiLCJtYXAiLCJpbmRleE9mIiwibWVkaWFCcmVha3BvaW50IiwibWVkaWFUeXBlIiwiYWRkTGlzdGVuZXIiLCJidG5TaG93UGFzc3dvcmQiLCJwYXJlbnRFbGVtZW50IiwiZm9jdXMiLCJzd2l0Y2hCdG5zIiwic3dpdGNoQnRuIiwiYmxvY2siLCJmaWxlSW5wdXQiLCJmaWxlUHJldmlldyIsImZpbGUiLCJmaWxlcyIsImluY2x1ZGVzIiwiYWxlcnQiLCJzaXplIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImNvbmNhdCIsInJlc3VsdCIsIm9uZXJyb3IiLCJyZWFkQXNEYXRhVVJMIiwiZHVyYXRpb24iLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwicmVtb3ZlUHJvcGVydHkiLCJfc2xpZGVEb3duIiwiRWxlbWVudCIsInByb3RvdHlwZSIsImNzcyIsIm5vZGUiLCJtYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJtc01hdGNoZXNTZWxlY3RvciIsImxvYWRlZCIsImFuaW1JdGVtcyIsImFuaW1PblNjcm9sbCIsImFuaW1JdGVtIiwiYW5pbUl0ZW1IZWlnaHQiLCJhbmltSXRlbU9mZnNldCIsIm9mZnNldCIsInRvcCIsImFuaW1JdGVtUG9pbnQiLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsImRvY3VtZW50RWxlbWVudCIsInNjcm9sbFRvcCIsImxlZnQiLCJkaWdpdHNDb3VudGVySW5pdGlhbGl6ZWQiLCJkaWdpdHNDb3VudGVyIiwiZWxlbWVudCIsImRpZ2l0c0NvdW50ZXJzQW5pbWF0ZSIsInN0YXJ0VGltZXN0YW1wIiwicGFyc2VJbnQiLCJkaWdpdHNDb3VudGVyU3BlZWQiLCJzdGFydFZhbHVlIiwic3RhcnRQb3NpdGlvbiIsInN0ZXAiLCJ0aW1lc3RhbXAiLCJwcm9ncmVzcyIsIk1hdGgiLCJtaW4iLCJmbG9vciIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpZ2l0c0NvdW50ZXJzSW5pdCIsIm9ic2VydmVyT3B0aW9ucyIsInRocmVzaG9sZCIsIm9ic2VydmVyQ2FsbGJhY2siLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwidW5vYnNlcnZlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiaXNEcm9wZG93bkluaXRpYWxpemVkIiwiZHJvcGRvd25JdGVtcyIsImNsb3NlQnRuIiwibGlzdGVuZXJBdHRhY2hlZCIsInN0b3BQcm9wYWdhdGlvbiIsInVwZGF0ZUdhdWdlIiwiYW5nbGUiLCJ3cmFwcGVyIiwic2V0UHJvcGVydHkiLCJjb2xvciIsImFycm93V3JhcHBlciIsInNldFJldmlld0JhcnMiLCJpdGVtcyIsInZhbHVlRWxlbWVudCIsImJhciIsInBlcmNlbnRUZXh0IiwicGVyY2VudCIsInBhcnNlRmxvYXQiLCJ3aWR0aCIsIk1vZGFsIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsImRlZmF1bHRPcHRpb25zIiwiaXNPcGVuIiwiaXNDbG9zZSIsIk9iamVjdCIsImFzc2lnbiIsIm1vZGFsIiwic3BlZWQiLCJhbmltYXRpb24iLCJfcmVPcGVuIiwiX25leHRDb250YWluZXIiLCJtb2RhbENvbnRhaW5lciIsInByZXZpb3VzQWN0aXZlRWxlbWVudCIsIl9mb2N1c0VsZW1lbnRzIiwiX2ZpeEJsb2NrcyIsImV2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsImNsaWNrZWRFbGVtZW50IiwicGF0aCIsIm9wZW4iLCJjbG9zZSIsImJpbmQiLCJrZXlDb2RlIiwid2hpY2giLCJmb2N1c0NhdGNoIiwic2VsZWN0b3IiLCJfdGhpcyIsImFjdGl2ZUVsZW1lbnQiLCJyZU9wZW4iLCJzY3JvbGxUbyIsInNjcm9sbEJlaGF2aW9yIiwiZGlzYWJsZVNjcm9sbCIsImZvY3VzVHJhcCIsImVuYWJsZVNjcm9sbCIsIm5vZGVzIiwibm9kZXNBcnJheSIsInNsaWNlIiwiY2FsbCIsImZvY3VzZWRJdGVtSW5kZXgiLCJzaGlmdEtleSIsInBhZ2VQb3NpdGlvbiIsInNjcm9sbFkiLCJsb2NrUGFkZGluZyIsInBvc2l0aW9uIiwidW5sb2NrUGFkZGluZyIsInBhZGRpbmdPZmZzZXQiLCJjb25zb2xlIiwibG9nIiwiZnVuY3Rpb25zIiwiaW5pdCJdLCJzb3VyY2VSb290IjoiIn0=