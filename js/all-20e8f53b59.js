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
window.addEventListener('load', function () {
  document.documentElement.classList.add('loaded');
});
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
function digitsCounter() {
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
function dropdown() {
  var dropdownItems = document.querySelectorAll('.dropdown-item');
  if (dropdownItems.length > 0) {
    dropdownItems.forEach(function (item) {
      var btn = item.querySelector('.dropdown-btn');
      var closeBtn = item.querySelector('.dropdown .dropdown-close');

      // Открытие/переключение дропдауна
      if (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();

          // Закрыть все дропдауны кроме текущего
          dropdownItems.forEach(function (el) {
            if (el !== item) {
              el.classList.remove('active');
            }
          });

          // Переключить текущий
          item.classList.toggle('active');
        });
      }

      // Закрытие по крестику внутри .dropdown
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          item.classList.remove('active');
        });
      }
    });

    // Клик вне дропдаунов — закрыть все
    document.body.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown-item')) {
        dropdownItems.forEach(function (item) {
          return item.classList.remove('active');
        });
      }
    }, true);
  }
}
;// ./src/js/index.js






window.addEventListener('load', function () {
  hidePreloader();
  counter();
  loaded();
  digitsCounter();
  dropdown();
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNMLElBQUksQ0FBQ0EsQ0FBQyxDQUFDb0QsTUFBTSxDQUFDaUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDdkM4RixhQUFhLENBQUNyTCxPQUFPLENBQUMsVUFBQ3dELElBQUk7VUFBQSxPQUFLQSxJQUFJLENBQUN0RCxTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFBQSxFQUFDO01BQ2xFO0lBQ0YsQ0FBQyxFQUNELElBQ0YsQ0FBQztFQUNIO0FBQ0Y7O0FDN0MrQztBQUNRO0FBQ0o7QUFDTjtBQUNjO0FBRVY7QUFFakRDLE1BQU0sQ0FBQ1osZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQU07RUFDcENFLGFBQWEsQ0FBQyxDQUFDO0VBQ2ZSLE9BQU8sQ0FBQyxDQUFDO0VBQ1RzSixNQUFNLENBQUMsQ0FBQztFQUNSaUIsYUFBYSxDQUFDLENBQUM7RUFDZmhILFFBQVEsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvY291bnRlci5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvcHJlbG9hZGVyLmpzIiwid2VicGFjazovL2d1bHAtdGVtcGxhdGUvLi9zcmMvanMvY29tcG9uZW50cy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9jb21wb25lbnRzL2xvYWRlZC5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvZGlnaXRzQ291bnRlci5qcyIsIndlYnBhY2s6Ly9ndWxwLXRlbXBsYXRlLy4vc3JjL2pzL2NvbXBvbmVudHMvZHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8vZ3VscC10ZW1wbGF0ZS8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY291bnRlcigpIHtcbiAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY291bnRlcl9fbGFiZWwnKTtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvdW50ZXJfX2J0bicpO1xuXG4gIGlmICghbGFiZWwgfHwgIWJ0bikgcmV0dXJuO1xuXG4gIGxldCBjb3VudGVyID0gMDtcbiAgcmVuZGVyKCk7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb3VudGVyKys7XG4gICAgcmVuZGVyKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBjb3VudGVyO1xuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGlkZVByZWxvYWRlcigpIHtcbiAgY29uc3QgcHJlbG9hZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVsb2FkZXInKTtcblxuICBpZiAocHJlbG9hZGVycyAmJiBwcmVsb2FkZXJzLmxlbmd0aCkge1xuICAgIHByZWxvYWRlcnMuZm9yRWFjaCgocHJlbG9hZGVyKSA9PiB7XG4gICAgICBwcmVsb2FkZXIuY2xhc3NMaXN0LmFkZCgncHJlbG9hZGVyX2hpZGRlbicpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHByZWxvYWRlci5yZW1vdmUoKTtcbiAgICAgIH0sIDYwMCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcclxufSk7XHJcblxyXG5sZXQgdW5sb2NrID0gdHJ1ZTtcclxuXHJcbi8vPT09PT09PT09PT09PT09PT1cclxuLy9BY3Rpb25zT25IYXNoXHJcbmlmIChsb2NhdGlvbi5oYXNoKSB7XHJcbiAgY29uc3QgaHNoID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfJyArIGhzaCkpIHtcclxuICAgIHBvcHVwX29wZW4oaHNoKTtcclxuICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi4nICsgaHNoKSkge1xyXG4gICAgX2dvdG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBoc2gpLCA1MDAsICcnKTtcclxuICB9XHJcbn1cclxuLy89PT09PT09PT09PT09PT09PVxyXG4vL01lbnVcclxubGV0IGljb25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24tbWVudScpO1xyXG5pZiAoaWNvbk1lbnUgIT0gbnVsbCkge1xyXG4gIGxldCBkZWxheSA9IDUwMDtcclxuICBsZXQgbWVudUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpO1xyXG4gIGljb25NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmICh1bmxvY2spIHtcclxuICAgICAgYm9keV9sb2NrKGRlbGF5KTtcclxuICAgICAgaWNvbk1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnX2FjdGl2ZScpO1xyXG4gICAgICBtZW51Qm9keS5jbGFzc0xpc3QudG9nZ2xlKCdfYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lbnVfY2xvc2UoKSB7XHJcbiAgbGV0IGljb25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24tbWVudScpO1xyXG4gIGxldCBtZW51Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5Jyk7XHJcbiAgaWNvbk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpO1xyXG4gIG1lbnVCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKTtcclxufVxyXG4vLz09PT09PT09PT09PT09PT09XHJcbi8vQm9keUxvY2tcclxuZnVuY3Rpb24gYm9keV9sb2NrKGRlbGF5KSB7XHJcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdfbG9jaycpKSB7XHJcbiAgICBib2R5X2xvY2tfcmVtb3ZlKGRlbGF5KTtcclxuICB9IGVsc2Uge1xyXG4gICAgYm9keV9sb2NrX2FkZChkZWxheSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBib2R5X2xvY2tfcmVtb3ZlKGRlbGF5KSB7XHJcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgaWYgKHVubG9jaykge1xyXG4gICAgbGV0IGxvY2tfcGFkZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5fbHAnKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9ja19wYWRkaW5nLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGNvbnN0IGVsID0gbG9ja19wYWRkaW5nW2luZGV4XTtcclxuICAgICAgICBlbC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcclxuICAgICAgfVxyXG4gICAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcwcHgnO1xyXG4gICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ19sb2NrJyk7XHJcbiAgICB9LCBkZWxheSk7XHJcblxyXG4gICAgdW5sb2NrID0gZmFsc2U7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgdW5sb2NrID0gdHJ1ZTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvZHlfbG9ja19hZGQoZGVsYXkpIHtcclxuICBsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICBpZiAodW5sb2NrKSB7XHJcbiAgICBsZXQgbG9ja19wYWRkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLl9scCcpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxvY2tfcGFkZGluZy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWwgPSBsb2NrX3BhZGRpbmdbaW5kZXhdO1xyXG4gICAgICBlbC5zdHlsZS5wYWRkaW5nUmlnaHQgPVxyXG4gICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC1cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpLm9mZnNldFdpZHRoICtcclxuICAgICAgICAncHgnO1xyXG4gICAgfVxyXG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPVxyXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJykub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdfbG9jaycpO1xyXG5cclxuICAgIHVubG9jayA9IGZhbHNlO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHVubG9jayA9IHRydWU7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBmaWx0ZXJPcGVuQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXJzLW9wZW4nKTtcclxuY29uc3QgZmlsdGVyQ2xvc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcnMtY2xvc2UnKTtcclxuY29uc3QgZmlsdGVyc1BhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlci1yZXZpZXdzJyk7XHJcbmNvbnN0IGZpbHRlck92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyLW92ZXJsYXknKTtcclxuY29uc3QgZmlsdGVyRGVsYXkgPSA1MDA7XHJcblxyXG5pZiAoZmlsdGVyc1BhbmVsICYmIGZpbHRlck92ZXJsYXkpIHtcclxuICBmaWx0ZXJPcGVuQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKHVubG9jaykge1xyXG4gICAgICAgIGZpbHRlcnNQYW5lbC5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgZmlsdGVyT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgYm9keV9sb2NrKGZpbHRlckRlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGZpbHRlckNsb3NlQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKHVubG9jaykge1xyXG4gICAgICAgIGZpbHRlcnNQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgZmlsdGVyT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgYm9keV9sb2NrKGZpbHRlckRlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vINCX0LDQutGA0YvRgtC40LUg0L/QviDQutC70LjQutGDINC90LAg0YTQvtC9XHJcbiAgZmlsdGVyT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGlmICh1bmxvY2spIHtcclxuICAgICAgZmlsdGVyc1BhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKTtcclxuICAgICAgZmlsdGVyT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgIGJvZHlfbG9jayhmaWx0ZXJEZWxheSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0nKTtcclxuXHJcbmlmIChmb3Jtcykge1xyXG4gIGZvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0RHJvcGRvd25zKCkge1xyXG4gIGNvbnN0IGRyb3Bkb3ducyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnB1dC1zZWxlY3QnKTtcclxuXHJcbiAgZHJvcGRvd25zLmZvckVhY2goKGRyb3Bkb3duKSA9PiB7XHJcbiAgICBjb25zdCBkcm9wZG93bklucHV0ID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWlucHV0Jyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkJ1dHRvbiA9IGRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1idXR0b24nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duSXRlbXNXcmFwcGVyID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLXNlbGVjdCcpO1xyXG4gICAgY29uc3QgZHJvcGRvd25JY29uID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLmlucHV0X19pY29uJyk7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRUb2tlbiA9IHtcclxuICAgICAgdGV4dDogZHJvcGRvd25JbnB1dC52YWx1ZSxcclxuICAgICAgaWNvbjogZHJvcGRvd25JY29uID8gZHJvcGRvd25JY29uLmdldEF0dHJpYnV0ZSgnc3JjJykgOiBudWxsLFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bigpIHtcclxuICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdEl0ZW0oZXZlbnQpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgIGNvbnN0IG5ld1RleHQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS50ZXh0Q29udGVudDtcclxuICAgICAgY29uc3QgbmV3SWNvbkltZyA9IGl0ZW0ucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgIGNvbnN0IG5ld0ljb25TcmMgPSBuZXdJY29uSW1nID8gbmV3SWNvbkltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpIDogbnVsbDtcclxuXHJcbiAgICAgIC8vIDEuINCh0L7Qt9C00LDRkdC8INC90L7QstGL0Lkg0Y3Qu9C10LzQtdC90YIg0LTQu9GPINCy0L7Qt9Cy0YDQsNGC0LAg0YLQtdC60YPRidC10LPQviDRgtC+0LrQtdC90LAg0LIg0YHQv9C40YHQvtC6XHJcbiAgICAgIGNvbnN0IG9sZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICBvbGRJdGVtLmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duLXNlbGVjdF9faXRlbScpO1xyXG5cclxuICAgICAgaWYgKGN1cnJlbnRUb2tlbi5pY29uKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgb2xkSW1nLmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duLXNlbGVjdF9faWNvbicpO1xyXG4gICAgICAgIG9sZEltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGN1cnJlbnRUb2tlbi5pY29uKTtcclxuICAgICAgICBvbGRJdGVtLmFwcGVuZENoaWxkKG9sZEltZyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG9sZFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIG9sZFNwYW4udGV4dENvbnRlbnQgPSBjdXJyZW50VG9rZW4udGV4dDtcclxuICAgICAgb2xkSXRlbS5hcHBlbmRDaGlsZChvbGRTcGFuKTtcclxuXHJcbiAgICAgIGRyb3Bkb3duSXRlbXNXcmFwcGVyLmFwcGVuZENoaWxkKG9sZEl0ZW0pO1xyXG4gICAgICBvbGRJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0SXRlbSk7XHJcblxyXG4gICAgICAvLyAyLiDQntCx0L3QvtCy0LvRj9C10LwgaW5wdXQg0Lgg0LjQutC+0L3QutGDXHJcbiAgICAgIGRyb3Bkb3duSW5wdXQudmFsdWUgPSBuZXdUZXh0O1xyXG4gICAgICBpZiAoZHJvcGRvd25JY29uICYmIG5ld0ljb25TcmMpIHtcclxuICAgICAgICBkcm9wZG93bkljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdJY29uU3JjKTtcclxuICAgICAgfSBlbHNlIGlmIChkcm9wZG93bkljb24gJiYgIW5ld0ljb25TcmMpIHtcclxuICAgICAgICBkcm9wZG93bkljb24ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gMy4g0KPQtNCw0LvRj9C10Lwg0LLRi9Cx0YDQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCINC40Lcg0YHQv9C40YHQutCwXHJcbiAgICAgIGl0ZW0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICAvLyA0LiDQntCx0L3QvtCy0LvRj9C10Lwg0YLQtdC60YPRidC40Lkg0YLQvtC60LXQvVxyXG4gICAgICBjdXJyZW50VG9rZW4gPSB7XHJcbiAgICAgICAgdGV4dDogbmV3VGV4dCxcclxuICAgICAgICBpY29uOiBuZXdJY29uU3JjLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlRHJvcGRvd24oZXZlbnQpIHtcclxuICAgICAgaWYgKCFkcm9wZG93bi5jb250YWlucyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJvcGRvd25JbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZURyb3Bkb3duKTtcclxuICAgIGRyb3Bkb3duQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRHJvcGRvd24pO1xyXG4gICAgZHJvcGRvd25cclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi1zZWxlY3RfX2l0ZW0nKVxyXG4gICAgICAuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEl0ZW0pKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VEcm9wZG93bik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtc2VsZWN0JykpIHtcclxuICBpbml0RHJvcGRvd25zKCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT1cclxuLypcclxu0JTQu9GPINGA0L7QtNC40YLQtdC70Y8g0YHQu9C+0LnQu9C10YDQvtCyINC/0LjRiNC10Lwg0LDRgtGA0LjQsdGD0YIgZGF0YS1zcG9sbGVyc1xyXG7QlNC70Y8g0LfQsNCz0L7Qu9C+0LLQutC+0LIg0YHQu9C+0LnQu9C10YDQvtCyINC/0LjRiNC10Lwg0LDRgtGA0LjQsdGD0YIgZGF0YS1zcG9sbGVyXHJcbtCV0YHQu9C4INC90YPQttC90L4g0LLQutC70Y7Rh9Cw0YLRjFxc0LLRi9C60LvRjtGH0LDRgtGMINGA0LDQsdC+0YLRgyDRgdC/0L7QudC70LXRgNC+0LIg0L3QsCDRgNCw0LfQvdGL0YUg0YDQsNC30LzQtdGA0LDRhSDRjdC60YDQsNC90L7QslxyXG7Qv9C40YjQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDRiNC40YDQuNC90Ysg0Lgg0YLQuNC/0LAg0LHRgNC10LnQutC/0L7QuNC90YLQsC5cclxu0J3QsNC/0YDQuNC80LXRgDpcclxuZGF0YS1zcG9sbGVycz1cIjk5MixtYXhcIiAtINGB0L/QvtC50LvQtdGA0Ysg0LHRg9C00YPRgiDRgNCw0LHQvtGC0LDRgtGMINGC0L7Qu9GM0LrQviDQvdCwINGN0LrRgNCw0L3QsNGFINC80LXQvdGM0YjQtSDQuNC70Lgg0YDQsNCy0L3QviA5OTJweFxyXG5kYXRhLXNwb2xsZXJzPVwiNzY4LG1pblwiIC0g0YHQv9C+0LnQu9C10YDRiyDQsdGD0LTRg9GCINGA0LDQsdC+0YLQsNGC0Ywg0YLQvtC70YzQutC+INC90LAg0Y3QutGA0LDQvdCw0YUg0LHQvtC70YzRiNC1INC40LvQuCDRgNCw0LLQvdC+IDc2OHB4XHJcblxyXG7QldGB0LvQuCDQvdGD0LbQvdC+INGH0YLQviDQsdGLINCyINCx0LvQvtC60LUg0L7RgtC60YDRi9Cy0LDQu9GB0Y8g0LHQvtC70YzQutC+INC+0LTQuNC9INGB0LvQvtC50LvQtdGAINC00L7QsdCw0LLQu9GP0LXQvCDQsNGC0YDQuNCx0YPRgiBkYXRhLW9uZS1zcG9sbGVyXHJcbiovXHJcblxyXG4vLyBTUE9MTEVSU1xyXG5jb25zdCBzcG9sbGVyc0FycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BvbGxlcnNdJyk7XHJcbmlmIChzcG9sbGVyc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAvLyDQn9C+0LvRg9GH0LXQvdC40LUg0L7QsdGL0YfQvdGL0YUg0YHQu9C+0LnQu9C10YDQvtCyXHJcbiAgY29uc3Qgc3BvbGxlcnNSZWd1bGFyID0gQXJyYXkuZnJvbShzcG9sbGVyc0FycmF5KS5maWx0ZXIoZnVuY3Rpb24gKFxyXG4gICAgaXRlbSxcclxuICAgIGluZGV4LFxyXG4gICAgc2VsZixcclxuICApIHtcclxuICAgIHJldHVybiAhaXRlbS5kYXRhc2V0LnNwb2xsZXJzLnNwbGl0KCcsJylbMF07XHJcbiAgfSk7XHJcbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0L7QsdGL0YfQvdGL0YUg0YHQu9C+0LnQu9C10YDQvtCyXHJcbiAgaWYgKHNwb2xsZXJzUmVndWxhci5sZW5ndGggPiAwKSB7XHJcbiAgICBpbml0U3BvbGxlcnMoc3BvbGxlcnNSZWd1bGFyKTtcclxuICB9XHJcblxyXG4gIC8vINCf0L7Qu9GD0YfQtdC90LjQtSDRgdC70L7QudC70LXRgNC+0LIg0YEg0LzQtdC00LjQsCDQt9Cw0L/RgNC+0YHQsNC80LhcclxuICBjb25zdCBzcG9sbGVyc01lZGlhID0gQXJyYXkuZnJvbShzcG9sbGVyc0FycmF5KS5maWx0ZXIoZnVuY3Rpb24gKFxyXG4gICAgaXRlbSxcclxuICAgIGluZGV4LFxyXG4gICAgc2VsZixcclxuICApIHtcclxuICAgIHJldHVybiBpdGVtLmRhdGFzZXQuc3BvbGxlcnMuc3BsaXQoJywnKVswXTtcclxuICB9KTtcclxuXHJcbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQu9C+0LnQu9C10YDQvtCyINGBINC80LXQtNC40LAg0LfQsNC/0YDQvtGB0LDQvNC4XHJcbiAgaWYgKHNwb2xsZXJzTWVkaWEubGVuZ3RoID4gMCkge1xyXG4gICAgY29uc3QgYnJlYWtwb2ludHNBcnJheSA9IFtdO1xyXG4gICAgc3BvbGxlcnNNZWRpYS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGl0ZW0uZGF0YXNldC5zcG9sbGVycztcclxuICAgICAgY29uc3QgYnJlYWtwb2ludCA9IHt9O1xyXG4gICAgICBjb25zdCBwYXJhbXNBcnJheSA9IHBhcmFtcy5zcGxpdCgnLCcpO1xyXG4gICAgICBicmVha3BvaW50LnZhbHVlID0gcGFyYW1zQXJyYXlbMF07XHJcbiAgICAgIGJyZWFrcG9pbnQudHlwZSA9IHBhcmFtc0FycmF5WzFdID8gcGFyYW1zQXJyYXlbMV0udHJpbSgpIDogJ21heCc7XHJcbiAgICAgIGJyZWFrcG9pbnQuaXRlbSA9IGl0ZW07XHJcbiAgICAgIGJyZWFrcG9pbnRzQXJyYXkucHVzaChicmVha3BvaW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCf0L7Qu9GD0YfQsNC10Lwg0YPQvdC40LrQsNC70YzQvdGL0LUg0LHRgNC10LnQutC/0L7QuNC90YLRi1xyXG4gICAgbGV0IG1lZGlhUXVlcmllcyA9IGJyZWFrcG9pbnRzQXJyYXkubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgJygnICtcclxuICAgICAgICBpdGVtLnR5cGUgK1xyXG4gICAgICAgICctd2lkdGg6ICcgK1xyXG4gICAgICAgIGl0ZW0udmFsdWUgK1xyXG4gICAgICAgICdweCksJyArXHJcbiAgICAgICAgaXRlbS52YWx1ZSArXHJcbiAgICAgICAgJywnICtcclxuICAgICAgICBpdGVtLnR5cGVcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgbWVkaWFRdWVyaWVzID0gbWVkaWFRdWVyaWVzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcclxuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQoNCw0LHQvtGC0LDQtdC8INGBINC60LDQttC00YvQvCDQsdGA0LXQudC60L/QvtC40L3RgtC+0LxcclxuICAgIG1lZGlhUXVlcmllcy5mb3JFYWNoKChicmVha3BvaW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gYnJlYWtwb2ludC5zcGxpdCgnLCcpO1xyXG4gICAgICBjb25zdCBtZWRpYUJyZWFrcG9pbnQgPSBwYXJhbXNBcnJheVsxXTtcclxuICAgICAgY29uc3QgbWVkaWFUeXBlID0gcGFyYW1zQXJyYXlbMl07XHJcbiAgICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShwYXJhbXNBcnJheVswXSk7XHJcblxyXG4gICAgICAvLyDQntCx0YrQtdC60YLRiyDRgSDQvdGD0LbQvdGL0LzQuCDRg9GB0LvQvtCy0LjRj9C80LhcclxuICAgICAgY29uc3Qgc3BvbGxlcnNBcnJheSA9IGJyZWFrcG9pbnRzQXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0udmFsdWUgPT09IG1lZGlhQnJlYWtwb2ludCAmJiBpdGVtLnR5cGUgPT09IG1lZGlhVHlwZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgLy8g0KHQvtCx0YvRgtC40LVcclxuICAgICAgbWF0Y2hNZWRpYS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaW5pdFNwb2xsZXJzKHNwb2xsZXJzQXJyYXksIG1hdGNoTWVkaWEpO1xyXG4gICAgICB9KTtcclxuICAgICAgaW5pdFNwb2xsZXJzKHNwb2xsZXJzQXJyYXksIG1hdGNoTWVkaWEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPXHJcbiAgZnVuY3Rpb24gaW5pdFNwb2xsZXJzKHNwb2xsZXJzQXJyYXksIG1hdGNoTWVkaWEgPSBmYWxzZSkge1xyXG4gICAgc3BvbGxlcnNBcnJheS5mb3JFYWNoKChzcG9sbGVyc0Jsb2NrKSA9PiB7XHJcbiAgICAgIHNwb2xsZXJzQmxvY2sgPSBtYXRjaE1lZGlhID8gc3BvbGxlcnNCbG9jay5pdGVtIDogc3BvbGxlcnNCbG9jaztcclxuICAgICAgaWYgKG1hdGNoTWVkaWEubWF0Y2hlcyB8fCAhbWF0Y2hNZWRpYSkge1xyXG4gICAgICAgIHNwb2xsZXJzQmxvY2suY2xhc3NMaXN0LmFkZCgnX2luaXQnKTtcclxuICAgICAgICBpbml0U3BvbGxlckJvZHkoc3BvbGxlcnNCbG9jayk7XHJcbiAgICAgICAgc3BvbGxlcnNCbG9jay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldFNwb2xsZXJBY3Rpb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNwb2xsZXJzQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnX2luaXQnKTtcclxuICAgICAgICBpbml0U3BvbGxlckJvZHkoc3BvbGxlcnNCbG9jaywgZmFsc2UpO1xyXG4gICAgICAgIHNwb2xsZXJzQmxvY2sucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXRTcG9sbGVyQWN0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8vINCg0LDQsdC+0YLQsCDRgSDQutC+0L3RgtC10L3RgtC+0LxcclxuICBmdW5jdGlvbiBpbml0U3BvbGxlckJvZHkoc3BvbGxlcnNCbG9jaywgaGlkZVNwb2xsZXJCb2R5ID0gdHJ1ZSkge1xyXG4gICAgY29uc3Qgc3BvbGxlclRpdGxlcyA9IHNwb2xsZXJzQmxvY2sucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BvbGxlcl0nKTtcclxuICAgIGlmIChzcG9sbGVyVGl0bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgc3BvbGxlclRpdGxlcy5mb3JFYWNoKChzcG9sbGVyVGl0bGUpID0+IHtcclxuICAgICAgICBpZiAoaGlkZVNwb2xsZXJCb2R5KSB7XHJcbiAgICAgICAgICBzcG9sbGVyVGl0bGUucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG4gICAgICAgICAgaWYgKCFzcG9sbGVyVGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdfYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgc3BvbGxlclRpdGxlLm5leHRFbGVtZW50U2libGluZy5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBzcG9sbGVyVGl0bGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgICAgc3BvbGxlclRpdGxlLm5leHRFbGVtZW50U2libGluZy5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2V0U3BvbGxlckFjdGlvbihlKSB7XHJcbiAgICBjb25zdCBlbCA9IGUudGFyZ2V0O1xyXG4gICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zcG9sbGVyJykgfHwgZWwuY2xvc2VzdCgnW2RhdGEtc3BvbGxlcl0nKSkge1xyXG4gICAgICBjb25zdCBzcG9sbGVyVGl0bGUgPSBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3BvbGxlcicpXHJcbiAgICAgICAgPyBlbFxyXG4gICAgICAgIDogZWwuY2xvc2VzdCgnW2RhdGEtc3BvbGxlcl0nKTtcclxuICAgICAgY29uc3Qgc3BvbGxlcnNCbG9jayA9IHNwb2xsZXJUaXRsZS5jbG9zZXN0KCdbZGF0YS1zcG9sbGVyc10nKTtcclxuICAgICAgY29uc3Qgb25lU3BvbGxlciA9IHNwb2xsZXJzQmxvY2suaGFzQXR0cmlidXRlKCdkYXRhLW9uZS1zcG9sbGVyJylcclxuICAgICAgICA/IHRydWVcclxuICAgICAgICA6IGZhbHNlO1xyXG4gICAgICBpZiAoIXNwb2xsZXJzQmxvY2sucXVlcnlTZWxlY3RvckFsbCgnLl9zbGlkZScpLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChvbmVTcG9sbGVyICYmICFzcG9sbGVyVGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdfYWN0aXZlJykpIHtcclxuICAgICAgICAgIGhpZGVTcG9sbGVyc0JvZHkoc3BvbGxlcnNCbG9jayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwb2xsZXJUaXRsZS5jbGFzc0xpc3QudG9nZ2xlKCdfYWN0aXZlJyk7XHJcbiAgICAgICAgX3NsaWRlVG9nZ2xlKHNwb2xsZXJUaXRsZS5uZXh0RWxlbWVudFNpYmxpbmcsIDUwMCk7XHJcbiAgICAgIH1cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZVNwb2xsZXJzQm9keShzcG9sbGVyc0Jsb2NrKSB7XHJcbiAgICBjb25zdCBzcG9sbGVyQWN0aXZlVGl0bGUgPSBzcG9sbGVyc0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICdbZGF0YS1zcG9sbGVyXS5fYWN0aXZlJyxcclxuICAgICk7XHJcbiAgICBpZiAoc3BvbGxlckFjdGl2ZVRpdGxlKSB7XHJcbiAgICAgIHNwb2xsZXJBY3RpdmVUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJyk7XHJcbiAgICAgIF9zbGlkZVVwKHNwb2xsZXJBY3RpdmVUaXRsZS5uZXh0RWxlbWVudFNpYmxpbmcsIDUwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBidG5TaG93UGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hvdy1wYXNzJyk7XHJcblxyXG5pZiAoYnRuU2hvd1Bhc3N3b3JkKSB7XHJcbiAgYnRuU2hvd1Bhc3N3b3JkLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0X19jb250cm9sJykudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0X19jb250cm9sJykuZm9jdXMoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0X19jb250cm9sJykudHlwZSA9ICdwYXNzd29yZCc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLz09PT09PT09PT09PT09PT09XHJcbi8vU2xpZGVUb2dnbGVcclxubGV0IF9zbGlkZVVwID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDApID0+IHtcclxuICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRhcmdldC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctdG9wJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93Jyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG4gIH1cclxufTtcclxubGV0IF9zbGlkZURvd24gPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCkgPT4ge1xyXG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcclxuICAgIGlmICh0YXJnZXQuaGlkZGVuKSB7XHJcbiAgICAgIHRhcmdldC5oaWRkZW4gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGxldCBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XHJcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctdG9wJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScpO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93Jyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG4gIH1cclxufTtcclxubGV0IF9zbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcbiAgaWYgKHRhcmdldC5oaWRkZW4pIHtcclxuICAgIHJldHVybiBfc2xpZGVEb3duKHRhcmdldCwgZHVyYXRpb24pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gX3NsaWRlVXAodGFyZ2V0LCBkdXJhdGlvbik7XHJcbiAgfVxyXG59O1xyXG5cclxuLy/Qn9C+0LvQuNGE0LjQu9GLXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC/0L7QtNC00LXRgNC20LrRg1xyXG4gIGlmICghRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xyXG4gICAgLy8g0YDQtdCw0LvQuNC30YPQtdC8XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKGNzcykge1xyXG4gICAgICB2YXIgbm9kZSA9IHRoaXM7XHJcbiAgICAgIHdoaWxlIChub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhjc3MpKSByZXR1cm4gbm9kZTtcclxuICAgICAgICBlbHNlIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufSkoKTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0L/QvtC00LTQtdGA0LbQutGDXHJcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XHJcbiAgICAvLyDQvtC/0YDQtdC00LXQu9GP0LXQvCDRgdCy0L7QudGB0YLQstC+XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID1cclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3I7XHJcbiAgfVxyXG59KSgpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gbG9hZGVkKCkge1xyXG4gIGNvbnN0IGFuaW1JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbmltYXRlJyk7XHJcblxyXG4gIGlmIChhbmltSXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFuaW1PblNjcm9sbCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbU9uU2Nyb2xsKCkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYW5pbUl0ZW1zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGNvbnN0IGFuaW1JdGVtID0gYW5pbUl0ZW1zW2luZGV4XTtcclxuICAgICAgICBjb25zdCBhbmltSXRlbUhlaWdodCA9IGFuaW1JdGVtLm9mZnNldEhlaWdodDtcclxuICAgICAgICBjb25zdCBhbmltSXRlbU9mZnNldCA9IG9mZnNldChhbmltSXRlbSkudG9wO1xyXG5cclxuICAgICAgICAvLyDQo9GB0LvQvtCy0LjQtTog0Y3Qu9C10LzQtdC90YIg0LTQvtC70LbQtdC9INCx0YvRgtGMINC/0L7Qu9C90L7RgdGC0YzRjiDQsiDQt9C+0L3QtSDQstC40LTQuNC80L7RgdGC0LhcclxuICAgICAgICBjb25zdCBhbmltSXRlbVBvaW50ID0gd2luZG93LmlubmVySGVpZ2h0IC0gYW5pbUl0ZW1IZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHBhZ2VZT2Zmc2V0ID4gYW5pbUl0ZW1PZmZzZXQgLSBhbmltSXRlbVBvaW50ICsgMTAgJiZcclxuICAgICAgICAgIHBhZ2VZT2Zmc2V0IDwgYW5pbUl0ZW1PZmZzZXQgKyBhbmltSXRlbUhlaWdodFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgYW5pbUl0ZW0uY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghYW5pbUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdfYW5pbS1uby1oaWRlJykpIHtcclxuICAgICAgICAgICAgYW5pbUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb2Zmc2V0KGVsKSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxyXG4gICAgICAgIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogcmVjdC50b3AgKyBzY3JvbGxUb3AsXHJcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgc2Nyb2xsTGVmdCxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgYW5pbU9uU2Nyb2xsKCk7XHJcbiAgICB9LCAzMDApO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZGlnaXRzQ291bnRlcigpIHtcclxuICAvLyDQntCx0L3Rg9C70LXQvdC40LUg0LfQvdCw0YfQtdC90LjQuVxyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaWdpdHMtY291bnRlcl0nKS5sZW5ndGgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpZ2l0cy1jb3VudGVyXScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgZWxlbWVudC5kYXRhc2V0LmRpZ2l0c0NvdW50ZXIgPSBlbGVtZW50LmlubmVySFRNTDtcclxuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBgMGA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vINCk0YPQvdC60YbQuNGPINCw0L3QuNC80LDRhtC40Lgg0YHRh9C10YLRh9C40LrQsFxyXG4gIGZ1bmN0aW9uIGRpZ2l0c0NvdW50ZXJzQW5pbWF0ZShkaWdpdHNDb3VudGVyKSB7XHJcbiAgICBsZXQgc3RhcnRUaW1lc3RhbXAgPSBudWxsO1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBwYXJzZUludChkaWdpdHNDb3VudGVyLmRhdGFzZXQuZGlnaXRzQ291bnRlclNwZWVkKSB8fCAxMDAwOyAvLyDQodC60L7RgNC+0YHRgtGMINCw0L3QuNC80LDRhtC40LggKNC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOIDEwMDAg0LzRgSlcclxuICAgIGNvbnN0IHN0YXJ0VmFsdWUgPSBwYXJzZUludChkaWdpdHNDb3VudGVyLmRhdGFzZXQuZGlnaXRzQ291bnRlcik7IC8vINCa0L7QvdC10YfQvdC+0LUg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IDA7IC8vINCd0LDRh9Cw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1ICgwKVxyXG5cclxuICAgIGNvbnN0IHN0ZXAgPSAodGltZXN0YW1wKSA9PiB7XHJcbiAgICAgIGlmICghc3RhcnRUaW1lc3RhbXApIHN0YXJ0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKCh0aW1lc3RhbXAgLSBzdGFydFRpbWVzdGFtcCkgLyBkdXJhdGlvbiwgMSk7IC8vINCf0YDQvtCz0YDQtdGB0YEgKDAg0LTQviAxKVxyXG4gICAgICBkaWdpdHNDb3VudGVyLmlubmVySFRNTCA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgcHJvZ3Jlc3MgKiAoc3RhcnRQb3NpdGlvbiArIHN0YXJ0VmFsdWUpLFxyXG4gICAgICApOyAvLyDQotC10LrRg9GJ0LXQtSDQt9C90LDRh9C10L3QuNC1XHJcblxyXG4gICAgICBpZiAocHJvZ3Jlc3MgPCAxKSB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTsgLy8g0J/RgNC+0LTQvtC70LbQtdC90LjQtSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApOyAvLyDQl9Cw0L/Rg9GB0Log0LDQvdC40LzQsNGG0LjQuFxyXG4gIH1cclxuXHJcbiAgLy8g0J3QsNGB0YLRgNC+0LnQutCwIEludGVyc2VjdGlvbiBPYnNlcnZlclxyXG4gIGZ1bmN0aW9uIGRpZ2l0c0NvdW50ZXJzSW5pdCgpIHtcclxuICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcclxuICAgICAgdGhyZXNob2xkOiAwLjIsIC8vINCf0L7Qu9C+0LLQuNC90LAg0Y3Qu9C10LzQtdC90YLQsCDQtNC+0LvQttC90LAg0LHRi9GC0Ywg0LLQuNC00L3QsFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9ic2VydmVyQ2FsbGJhY2sgPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcclxuICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgLy8g0JXRgdC70Lgg0Y3Qu9C10LzQtdC90YIg0LIg0LfQvtC90LUg0LLQuNC00LjQvNC+0YHRgtC4XHJcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlbnRyeS50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgLy8g0JTQvtCx0LDQstC70Y/QtdC8INC30LDQtNC10YDQttC60YMg0LIgMiDRgdC10LrRg9C90LTRiyDQv9C10YDQtdC0INC90LDRh9Cw0LvQvtC8INCw0L3QuNC80LDRhtC40LhcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBkaWdpdHNDb3VudGVyc0FuaW1hdGUodGFyZ2V0KTsgLy8g0JfQsNC/0YPRgdC6INCw0L3QuNC80LDRhtC40LhcclxuICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHRhcmdldCk7IC8vINCh0L3Rj9GC0Ywg0L3QsNCx0LvRjtC00LXQvdC40LUg0L/QvtGB0LvQtSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgICAgICAgICB9LCAxMDApOyAvLyDQl9Cw0LTQtdGA0LbQutCwINCyIDIwMDAg0LzRgSAoMiDRgdC10LrRg9C90LTRiylcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcclxuICAgICAgb2JzZXJ2ZXJDYWxsYmFjayxcclxuICAgICAgb2JzZXJ2ZXJPcHRpb25zLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyDQn9C+0LTQutC70Y7Rh9Cw0LXQvCBvYnNlcnZlciDQuiDQutCw0LbQtNC+0LzRgyDRjdC70LXQvNC10L3RgtGDINGBIGRhdGEtZGlnaXRzLWNvdW50ZXJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpZ2l0cy1jb3VudGVyXScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8g0JfQsNC/0YPRgdC6INGE0YPQvdC60YbQuNC4XHJcbiAgZGlnaXRzQ291bnRlcnNJbml0KCk7XHJcbn1cclxuXHQiLCJleHBvcnQgZnVuY3Rpb24gZHJvcGRvd24oKSB7XHJcbiAgY29uc3QgZHJvcGRvd25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi1pdGVtJyk7XHJcblxyXG4gIGlmIChkcm9wZG93bkl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgIGRyb3Bkb3duSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBidG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1idG4nKTtcclxuICAgICAgY29uc3QgY2xvc2VCdG4gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93biAuZHJvcGRvd24tY2xvc2UnKTtcclxuXHJcbiAgICAgIC8vINCe0YLQutGA0YvRgtC40LUv0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC00YDQvtC/0LTQsNGD0L3QsFxyXG4gICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgLy8g0JfQsNC60YDRi9GC0Ywg0LLRgdC1INC00YDQvtC/0LTQsNGD0L3RiyDQutGA0L7QvNC1INGC0LXQutGD0YnQtdCz0L5cclxuICAgICAgICAgIGRyb3Bkb3duSXRlbXMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsICE9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vINCf0LXRgNC10LrQu9GO0YfQuNGC0Ywg0YLQtdC60YPRidC40LlcclxuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vINCX0LDQutGA0YvRgtC40LUg0L/QviDQutGA0LXRgdGC0LjQutGDINCy0L3Rg9GC0YDQuCAuZHJvcGRvd25cclxuICAgICAgaWYgKGNsb3NlQnRuKSB7XHJcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCa0LvQuNC6INCy0L3QtSDQtNGA0L7Qv9C00LDRg9C90L7QsiDigJQg0LfQsNC60YDRi9GC0Ywg0LLRgdC1XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcuZHJvcGRvd24taXRlbScpKSB7XHJcbiAgICAgICAgICBkcm9wZG93bkl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdHJ1ZSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGNvdW50ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvY291bnRlcic7XG5pbXBvcnQgeyBoaWRlUHJlbG9hZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZWxvYWRlcic7XG5pbXBvcnQgeyBmdW5jdGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZnVuY3Rpb25zJztcbmltcG9ydCB7IGxvYWRlZCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FkZWQnO1xuaW1wb3J0IHsgZGlnaXRzQ291bnRlciB9IGZyb20gJy4vY29tcG9uZW50cy9kaWdpdHNDb3VudGVyJztcblxuaW1wb3J0IHsgZHJvcGRvd24gfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgaGlkZVByZWxvYWRlcigpO1xuICBjb3VudGVyKCk7XG4gIGxvYWRlZCgpO1xuICBkaWdpdHNDb3VudGVyKCk7XG4gIGRyb3Bkb3duKCk7XG59KTtcblxuXG4iXSwibmFtZXMiOlsiY291bnRlciIsImxhYmVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYnRuIiwicmVuZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlubmVySFRNTCIsImhpZGVQcmVsb2FkZXIiLCJwcmVsb2FkZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImZvckVhY2giLCJwcmVsb2FkZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwid2luZG93IiwiZG9jdW1lbnRFbGVtZW50IiwidW5sb2NrIiwibG9jYXRpb24iLCJoYXNoIiwiaHNoIiwicmVwbGFjZSIsInBvcHVwX29wZW4iLCJfZ290byIsImljb25NZW51IiwiZGVsYXkiLCJtZW51Qm9keSIsImUiLCJib2R5X2xvY2siLCJ0b2dnbGUiLCJtZW51X2Nsb3NlIiwiYm9keSIsImNvbnRhaW5zIiwiYm9keV9sb2NrX3JlbW92ZSIsImJvZHlfbG9ja19hZGQiLCJsb2NrX3BhZGRpbmciLCJpbmRleCIsImVsIiwic3R5bGUiLCJwYWRkaW5nUmlnaHQiLCJpbm5lcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJmaWx0ZXJPcGVuQnRucyIsImZpbHRlckNsb3NlQnRucyIsImZpbHRlcnNQYW5lbCIsImZpbHRlck92ZXJsYXkiLCJmaWx0ZXJEZWxheSIsImZvcm1zIiwiZm9ybSIsInByZXZlbnREZWZhdWx0IiwiaW5pdERyb3Bkb3ducyIsImRyb3Bkb3ducyIsImRyb3Bkb3duIiwiZHJvcGRvd25JbnB1dCIsImRyb3Bkb3duQnV0dG9uIiwiZHJvcGRvd25JdGVtc1dyYXBwZXIiLCJkcm9wZG93bkljb24iLCJjdXJyZW50VG9rZW4iLCJ0ZXh0IiwidmFsdWUiLCJpY29uIiwiZ2V0QXR0cmlidXRlIiwidG9nZ2xlRHJvcGRvd24iLCJzZWxlY3RJdGVtIiwiZXZlbnQiLCJpdGVtIiwiY3VycmVudFRhcmdldCIsIm5ld1RleHQiLCJ0ZXh0Q29udGVudCIsIm5ld0ljb25JbWciLCJuZXdJY29uU3JjIiwib2xkSXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJvbGRJbWciLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm9sZFNwYW4iLCJyZW1vdmVBdHRyaWJ1dGUiLCJjbG9zZURyb3Bkb3duIiwidGFyZ2V0Iiwic3BvbGxlcnNBcnJheSIsImluaXRTcG9sbGVycyIsIm1hdGNoTWVkaWEiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJzcG9sbGVyc0Jsb2NrIiwibWF0Y2hlcyIsImluaXRTcG9sbGVyQm9keSIsInNldFNwb2xsZXJBY3Rpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGlkZVNwb2xsZXJCb2R5Iiwic3BvbGxlclRpdGxlcyIsInNwb2xsZXJUaXRsZSIsIm5leHRFbGVtZW50U2libGluZyIsImhpZGRlbiIsImhhc0F0dHJpYnV0ZSIsImNsb3Nlc3QiLCJvbmVTcG9sbGVyIiwiaGlkZVNwb2xsZXJzQm9keSIsIl9zbGlkZVRvZ2dsZSIsInNwb2xsZXJBY3RpdmVUaXRsZSIsIl9zbGlkZVVwIiwic3BvbGxlcnNSZWd1bGFyIiwiQXJyYXkiLCJmcm9tIiwiZmlsdGVyIiwic2VsZiIsImRhdGFzZXQiLCJzcG9sbGVycyIsInNwbGl0Iiwic3BvbGxlcnNNZWRpYSIsImJyZWFrcG9pbnRzQXJyYXkiLCJwYXJhbXMiLCJicmVha3BvaW50IiwicGFyYW1zQXJyYXkiLCJ0eXBlIiwidHJpbSIsInB1c2giLCJtZWRpYVF1ZXJpZXMiLCJtYXAiLCJpbmRleE9mIiwibWVkaWFCcmVha3BvaW50IiwibWVkaWFUeXBlIiwiYWRkTGlzdGVuZXIiLCJidG5TaG93UGFzc3dvcmQiLCJwYXJlbnRFbGVtZW50IiwiZm9jdXMiLCJkdXJhdGlvbiIsInRyYW5zaXRpb25Qcm9wZXJ0eSIsInRyYW5zaXRpb25EdXJhdGlvbiIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsIm92ZXJmbG93IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJyZW1vdmVQcm9wZXJ0eSIsIl9zbGlkZURvd24iLCJFbGVtZW50IiwicHJvdG90eXBlIiwiY3NzIiwibm9kZSIsIm1hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIm1vek1hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwibG9hZGVkIiwiYW5pbUl0ZW1zIiwiYW5pbU9uU2Nyb2xsIiwiYW5pbUl0ZW0iLCJhbmltSXRlbUhlaWdodCIsImFuaW1JdGVtT2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwiYW5pbUl0ZW1Qb2ludCIsImlubmVySGVpZ2h0IiwicGFnZVlPZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsTGVmdCIsInBhZ2VYT2Zmc2V0Iiwic2Nyb2xsVG9wIiwibGVmdCIsImRpZ2l0c0NvdW50ZXIiLCJlbGVtZW50IiwiZGlnaXRzQ291bnRlcnNBbmltYXRlIiwic3RhcnRUaW1lc3RhbXAiLCJwYXJzZUludCIsImRpZ2l0c0NvdW50ZXJTcGVlZCIsInN0YXJ0VmFsdWUiLCJzdGFydFBvc2l0aW9uIiwic3RlcCIsInRpbWVzdGFtcCIsInByb2dyZXNzIiwiTWF0aCIsIm1pbiIsImZsb29yIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZGlnaXRzQ291bnRlcnNJbml0Iiwib2JzZXJ2ZXJPcHRpb25zIiwidGhyZXNob2xkIiwib2JzZXJ2ZXJDYWxsYmFjayIsImVudHJpZXMiLCJvYnNlcnZlciIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJkcm9wZG93bkl0ZW1zIiwiY2xvc2VCdG4iLCJzdG9wUHJvcGFnYXRpb24iLCJmdW5jdGlvbnMiXSwic291cmNlUm9vdCI6IiJ9