/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/apps/js/frontend/api.js":
/*!********************************************!*\
  !*** ./assets/src/apps/js/frontend/api.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * List API on backend
 */
if (undefined === lpGlobalSettings) {
  throw new Error('lpGlobalSettings is undefined');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  apiCourses: lpGlobalSettings.lp_rest_url + 'lp/v1/courses/archive-course'
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/*!******************************************************!*\
  !*** ./assets/src/apps/js/frontend/course-filter.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./assets/src/apps/js/frontend/api.js");

const classCourseFilter = 'lp-form-course-filter';

// Events
// Submit form filter
document.addEventListener('submit', function (e) {
  const target = e.target;
  if (!target.classList.contains(classCourseFilter)) {
    return;
  }
  e.preventDefault();
  window.lpCourseFilter.submit(target);
});

// Click element
document.addEventListener('click', function (e) {
  const target = e.target;
  if (target.classList.contains('course-filter-reset')) {
    e.preventDefault();
    window.lpCourseFilter.reset(target);
  }

  // Show/hide search suggest result
  window.lpCourseFilter.showHideSearchResult(target);
});

// Search course suggest
document.addEventListener('keyup', function (e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('lp-course-filter-search')) {
    window.lpCourseFilter.searchSuggestion(target);
  }
});
let timeOutSearch;
let controller;
let signal;
window.lpCourseFilter = {
  searchSuggestion: inputSearch => {
    const enable = parseInt(inputSearch.dataset.searchSuggest || 1);
    if (1 !== enable) {
      return;
    }
    const keyword = inputSearch.value.trim();
    const form = inputSearch.closest(`.${classCourseFilter}`);
    const elLoading = form.querySelector('.lp-loading-circle');
    if (undefined !== timeOutSearch) {
      clearTimeout(timeOutSearch);
    }
    if (keyword && keyword.length > 2) {
      elLoading.classList.remove('hide');
      timeOutSearch = setTimeout(function () {
        const callBackDone = response => {
          const elResult = document.querySelector('.lp-course-filter-search-result');
          elResult.innerHTML = response.data.content;
          elLoading.classList.add('hide');
        };
        window.lpCourseFilter.callAPICourseSuggest(keyword, callBackDone);
      }, 500);
    } else {
      const elResult = form.querySelector('.lp-course-filter-search-result');
      elResult.innerHTML = '';
      elLoading.classList.add('hide');
    }
  },
  callAPICourseSuggest: (keyword, callBackDone, callBackFinally) => {
    if (undefined !== controller) {
      controller.abort();
    }
    controller = new AbortController();
    signal = controller.signal;
    const url = _api__WEBPACK_IMPORTED_MODULE_0__["default"].apiCourses + '?c_search=' + keyword + '&c_suggest=1';
    let paramsFetch = {
      method: 'GET'
    };
    if (0 !== lpGlobalSettings.user_id) {
      paramsFetch = {
        ...paramsFetch,
        headers: {
          'X-WP-Nonce': lpGlobalSettings.nonce
        }
      };
    }
    fetch(url, {
      ...paramsFetch,
      signal
    }).then(response => response.json()).then(response => {
      if (undefined !== callBackDone) {
        callBackDone(response);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (undefined !== callBackFinally) {
        callBackFinally();
      }
    });
  },
  submit: form => {
    const formData = new FormData(form); // Create a FormData object from the form
    const elListCourse = document.querySelector('.learn-press-courses');
    const skeleton = document.querySelector('.lp-archive-course-skeleton');
    const filterCourses = {
      paged: 1
    };
    for (const pair of formData.entries()) {
      const key = pair[0];
      const value = formData.getAll(key);
      if (!filterCourses.hasOwnProperty(key)) {
        filterCourses[key] = value;
      }
    }
    if (lpGlobalSettings.is_course_archive && lpGlobalSettings.lpArchiveLoadAjax && elListCourse && skeleton) {
      lpArchiveRequestCourse(filterCourses);
    } else {
      const courseUrl = lpGlobalSettings.courses_url || '';
      const url = new URL(courseUrl);
      Object.keys(filterCourses).forEach(arg => {
        url.searchParams.set(arg, filterCourses[arg]);
      });
      document.location.href = url.href;
    }
  },
  reset: btnReset => {
    const form = btnReset.closest(`.${classCourseFilter}`);
    const btnSubmit = form.querySelector('.course-filter-submit');
    const elResult = form.querySelector('.lp-course-filter-search-result');
    form.reset();
    if (elResult) {
      elResult.innerHTML = '';
    }
    // Empty the values in the form.
    for (let i = 0; i < form.elements.length; i++) {
      form.elements[i].value = '';
      form.elements[i].removeAttribute('checked');
    }
    // If on the page archive course will call btnSubmit click.
    if (lpGlobalSettings.is_course_archive) {
      btnSubmit.click();
    }
  },
  showHideSearchResult: target => {
    const elResult = document.querySelector('.lp-course-filter-search-result');
    if (!elResult) {
      return;
    }
    const parent = target.closest('.lp-course-filter-search-result');
    if (!parent && !target.classList.contains('lp-course-filter-search-result') && !target.classList.contains('lp-course-filter-search')) {
      elResult.style.display = 'none';
    } else {
      elResult.style.display = 'block';
    }
  }
};
})();

/******/ })()
;
//# sourceMappingURL=course-filter.js.map