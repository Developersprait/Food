/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/js/modules/calculator.js":
/*!***************************************!*\
  !*** ./dist/js/modules/calculator.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calculator(){
    //Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}
module.exports = calculator;

/***/ }),

/***/ "./dist/js/modules/cards.js":
/*!**********************************!*\
  !*** ./dist/js/modules/cards.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
    class Tab {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes || '.menu__item';
            this.parent = document.querySelector(parentSelector);
            this.transfer = 2.56;
            this.changeToBYN();
        }
        changeToBYN() {
            this.price *= this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }


            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> byn/????????</div>
                    </div>
            `;
            this.parent.append(element);
        };
    }

    const getResourse = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status is ${res.status}`);
        }
        return res.json();
    }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new Tab(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}
module.exports = cards;

/***/ }),

/***/ "./dist/js/modules/forms.js":
/*!**********************************!*\
  !*** ./dist/js/modules/forms.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms(){
       //forms
       const forms = document.querySelectorAll('form');

       const message = {
           loading: 'spinner.svg',
           success: 'Uspekh',
           fail: 'Fatal Error'
       };
   
       forms.forEach(item => {
           bindPostData(item)
       });
   
       const postData = async (url, data) => {
           const res = await fetch(url, {
               method: "POST",
               headers: {
                   'Content-type': 'application/json'
               },
               body: data
           });
           return res.json();
       }
   
       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
               const statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;`;
               form.insertAdjacentElement('afterend', statusMessage);
   
               // const request = new XMLHttpRequest();
               // request.open('POST', 'server.php');
   
   
               // request.setRequestHeader();
   
               const formData = new FormData(form);
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
   
               postData('  http://localhost:3000/requests', json)
                   .then(data => {
                       console.log(data)
                       showThanksModal(message.success);
                       statusMessage.remove();
                   })
                   .catch(() => {
                       showThanksModal(message.fail);
                   })
                   .finally(() => {
                       form.reset();
                   });
   
               // request.addEventListener('load', () => {
               //     if (request.status === 200) {
               //         console.log(request.response);
               //         showThanksModal(message.success);
               //         form.reset();
               //         setTimeout(() => {
               //             statusMessage.remove();
               //             console.log('works');
               //         }, 5000);
               //     } else {
               //         showThanksModal(message.fail);
               //     }
               // });
           });
       }
   
       function showThanksModal(message) {
           const prevModalDialog = document.querySelector('.modal__dialog');
           prevModalDialog.classList.add('hide');
           openModal('.modal'. modalTimerID);
           const thanksModal = document.createElement('div');
           thanksModal.classList.add('modal__dialog');
           thanksModal.innerHTML = `
           <div class="modal__content">
                <div class="modal__close" data-close>??</div>
                <div class="modal__title">${message}</div>
           </div>
           `;
           document.querySelector('.modal').append(thanksModal);
           setTimeout(() => {
               thanksModal.remove();
               prevModalDialog.classList.add('show');
               prevModalDialog.classList.remove('hide');
               closeModal();
           }, 7000);
       }
   
       fetch('http://localhost:3000/menu')
           .then(data => data.json())
           .then(res => console.log(res))
}
module.exports = forms;

/***/ }),

/***/ "./dist/js/modules/modal.js":
/*!**********************************!*\
  !*** ./dist/js/modules/modal.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
    //modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerID);
    }


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });
    const modalTimerID = setTimeout(openModal, 30000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}
module.exports = modal;

/***/ }),

/***/ "./dist/js/modules/slider.js":
/*!***********************************!*\
  !*** ./dist/js/modules/slider.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
    // Slider

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = []
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (+width.replace(/\D/g, '') * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}
module.exports = slider;

/***/ }),

/***/ "./dist/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./dist/js/modules/tabs.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(element => {
            element.style.display = 'none';
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });
}
module.exports = tabs;

/***/ }),

/***/ "./dist/js/modules/timer.js":
/*!**********************************!*\
  !*** ./dist/js/modules/timer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    //Timer
    const deadline = '2021-10-15';

    function getTimeRemainind(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / 1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemainind(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

}
module.exports = timer;

/***/ }),

/***/ "./dist/js/script.js":
/*!***************************!*\
  !*** ./dist/js/script.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

document.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./dist/js/modules/tabs.js"),
        modal =__webpack_require__(/*! ./modules/modal */ "./dist/js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./dist/js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./dist/js/modules/cards.js"),
        calculator = __webpack_require__(/*! ./modules/calculator */ "./dist/js/modules/calculator.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./dist/js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./dist/js/modules/slider.js");

        tabs();
        modal();
        timer();
        cards();
        calculator();
        forms();
        slider();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map