/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/action-timer.js":
/*!************************************!*\
  !*** ./js/modules/action-timer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function actionTimer() {
  // Timer

  const deadline = new Date("2021,03,12");
  const date = deadline - new Date();

  const actionDays = document.querySelector("#days"),
    actionHours = document.querySelector("#hours"),
    actionMinutes = document.querySelector("#minutes"),
    actionSeconds = document.querySelector("#seconds");

  function parseDate() {
    const t = deadline - new Date();
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    const time = {
      difference: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
    return time;
  }

  setActionTimer(parseDate());

  const timer = setInterval(() => {
    setActionTimer(parseDate());
  }, 1000);

  function setActionTimer(t) {
    actionDays.textContent = setZero(t.days);
    actionHours.textContent = setZero(t.hours);
    actionMinutes.textContent = setZero(t.minutes);
    actionSeconds.textContent = setZero(t.seconds);
  }

  function setZero(t) {
    if (t < 10) {
      return `0${parseInt(t)}`;
    }
    return t;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actionTimer);


/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  console.log(sex);

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initCalc(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        console.log(elem.getAttribute("id"));
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  initCalc("#gender div", "calculating__choose-item_active");
  initCalc(".calculating__choose_big div", "calculating__choose-item_active");

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "_____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", sex);
        }

        console.log(elements);
        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
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

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sevices_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sevices/services */ "./js/sevices/services.js");


function cards() {
  class MenuItem {
    constructor(subtitle, descr, price, img, alt, parentSelector, ...classes) {
      this.subtitle = subtitle;
      this.descr = descr;
      this.price = price;
      this.img = img;
      this.alt = alt;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 65;
      this.changeToRUB();
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
				<img src="${this.img}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">Меню "${this.subtitle}"</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
				`;
      this.parent.append(element);
    }

    changeToRUB() {
      this.price = this.price * this.transfer;
    }
  }

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuItem(
        title,
        descr,
        price,
        img,
        altimg,
        ".menu .container"
      ).render();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sevices_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sevices/services */ "./js/sevices/services.js");


function modal(triggerSelector, modalSelector) {
  const btnShowModal = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);

  const modalTimerId = setTimeout(openModal, 10000);

  function closeModal() {
    modalWindow.style.display = "none";
    document.body.style.overflow = "";
  }

  function openModal() {
    modalWindow.style.display = "block";
    document.body.style.overflow = "hidden";

		console.log(modalTimerId);

		if(modalTimerId){
			clearInterval(modalTimerId);
		}
    
  }

  btnShowModal.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.style.display != "none") {
      closeModal();
    }
  });

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/spinner.svg",
    succes: "Спасибо! Скоро мы с вами свяжемся",
    fail: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });



  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
							display: block;
							margin: auto;
						`;
      form.append(statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_sevices_services__WEBPACK_IMPORTED_MODULE_0__.postData)("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.succes);
          form.reset();
          setTimeout(() => {
            statusMessage.textContent = "";
          }, 3000);
        })
        .catch(() => {
          showThanksModal(message.fail);
          setTimeout(() => {
            statusMessage.textContent = "";
          }, 3000);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.style.display = "none";

    openModal();
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
						<div class="modal__content">
							<div class="modal__close" data-close>&times;</div>
							<div class="modal__title">${message}</div>
						</div>
					`;

    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.style.display = "block";
      closeModal();
    }, 5000);
  }
	

  function showModalByScroll(){
  	if( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
  		openModal();
  		window.removeEventListener('scroll', showModalByScroll);
  	}
  }
  window.addEventListener('scroll', showModalByScroll);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    btnNext = document.querySelector(".offer__slider-next"),
    btnPrev = document.querySelector(".offer__slider-prev"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "all 0.5s ease 0s";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const dots = document.createElement("ol"),
    dotsArr = [];
  dots.classList.add("carousel-indicators");

  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    dots.append(dot);
    dotsArr.push(dot);
  }

  btnNext.addEventListener("click", () => {
    if (offset == parseInt(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseInt(width);
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

    dotsArr.forEach((dot) => (dot.style.opacity = ".5"));
    dotsArr[slideIndex - 1].style.opacity = 1;
  });

  btnPrev.addEventListener("click", () => {
    if (offset == 0) {
      offset = parseInt(width) * (slides.length - 1);
    } else {
      offset -= parseInt(width);
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

    dotsArr.forEach((dot) => (dot.style.opacity = ".5"));
    dotsArr[slideIndex - 1].style.opacity = 1;
  });

  dotsArr.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = parseInt(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dotsArr.forEach((dot) => (dot.style.opacity = ".5"));
      dotsArr[slideIndex - 1].style.opacity = 1;
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  const tabs = document.querySelectorAll(".tabcontent"),
    menu = document.querySelectorAll(".tabheader__item");

  function hideTabs() {
    tabs.forEach((item, i) => {
      item.style.display = "none";
    });
  }

  function showTab(i = 0) {
    tabs[i].style.display = "block";
  }

  function hideActivMenuClass() {
    menu.forEach((item) => {
      if (item.classList.contains("tabheader__item_active")) {
        item.classList.remove("tabheader__item_active");
      }
    });
  }

  menu.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      const target = e.target;
      hideTabs();
      showTab(i);
      hideActivMenuClass();
      target.classList.add("tabheader__item_active");
    });
  });

  hideTabs();
  showTab();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/sevices/services.js":
/*!********************************!*\
  !*** ./js/sevices/services.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await res.json();
};

const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_action_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/action-timer */ "./js/modules/action-timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");


//const { nextTick } = require("node:process");







//import { openModal } from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {

  

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)("[data-modal]", ".modal");
  (0,_modules_action_timer__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map