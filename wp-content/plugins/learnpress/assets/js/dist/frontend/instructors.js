/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/apps/js/frontend/instructors/instructor-list.js":
/*!********************************************************************!*\
  !*** ./assets/src/apps/js/frontend/instructors/instructor-list.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InstructorList)
/* harmony export */ });
let query = {};
function InstructorList() {
  // Call API get instructors without wait element ready
  let htmlListItemInstructor = '';
  let htmlPagination = '';
  getInstructors({
    paged: 1
  }, true, function (res) {
    htmlListItemInstructor = res.data.content;
    if (res.data.pagination !== undefined) {
      htmlPagination = res.data.pagination;
    }
  });
  let totalTimeDetect = 0;
  const detectedElArchive = setInterval(function () {
    totalTimeDetect++;

    // Stop if detected more than 10 seconds
    if (totalTimeDetect > 10000) {
      clearInterval(detectedElArchive);
    }
    const elListInstructors = document.querySelector('.lp-list-instructors');
    if (elListInstructors && htmlListItemInstructor !== '') {
      clearInterval(detectedElArchive);
      const elUlListInstructors = document.querySelector('.ul-list-instructors');
      elListInstructors.classList.add('detected');
      elUlListInstructors.innerHTML = htmlListItemInstructor;
      elListInstructors.insertAdjacentHTML('beforeend', htmlPagination);
    }
  }, 1);

  // For case multiple ul list instructors on a page.
  /*document.addEventListener( 'DOMContentLoaded', function( event ) {
  	const elListInstructors = document.querySelectorAll( '.lp-list-instructors:not(.detected)' );
  	if ( elListInstructors.length > 0 ) {
  		elListInstructors.forEach( function( el ) {
  			const elUlListInstructors = el.querySelector( '.ul-list-instructors' );
  			query = { paged: 1 };
  			getInstructors( query, true, function( res ) {
  				elUlListInstructors.innerHTML = res.data.content;
  					if ( res.data.pagination !== undefined ) {
  					el.insertAdjacentHTML( 'beforeend', res.data.pagination );
  				}
  			} );
  		} );
  	}
  } );*/

  pagination();
}
const getInstructors = function (queryParam) {
  let firstLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let callBack = arguments.length > 2 ? arguments[2] : undefined;
  const url = urlListInstructorsAPI + '?paged=' + queryParam.paged;
  const paramsFetch = {
    method: 'GET'
  };
  fetch(url, paramsFetch).then(response => response.json()).then(res => {
    if (res.data.content !== undefined) {
      if (callBack) {
        callBack(res);
      }
    }
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    if (firstLoad === false) {
      const urlPush = lpInstructorsUrl + '?paged=' + queryParam.paged;
      window.history.pushState('', '', urlPush);
    }
  });
};
const pagination = () => {
  document.addEventListener('click', function (event) {
    const target = event.target;
    const elListInstructors = target.closest('.lp-list-instructors');
    const elUlListInstructors = elListInstructors.querySelector('.ul-list-instructors');
    const pagination = target.closest('.learn-press-pagination');
    if (!pagination || !elListInstructors || !elUlListInstructors) {
      return;
    }
    let pageLinkNode;
    if (target.tagName.toLowerCase() === 'a') {
      pageLinkNode = target;
    } else if (target.closest('a.page-numbers')) {
      pageLinkNode = target.closest('a.page-numbers');
    } else {
      return;
    }
    event.preventDefault();
    const currentPage = parseInt(pagination.querySelector('.current').innerHTML);
    let paged;
    if (pageLinkNode.classList.contains('next')) {
      paged = currentPage + 1;
    } else if (pageLinkNode.classList.contains('prev')) {
      paged = currentPage - 1;
    } else {
      paged = pageLinkNode.innerHTML;
    }
    query = {
      ...query,
      paged
    };
    getInstructors(query, false, function (res) {
      elUlListInstructors.innerHTML = res.data.content;
      pagination.remove();
      if (res.data.pagination !== undefined) {
        elListInstructors.insertAdjacentHTML('beforeend', res.data.pagination);
      }
    });
  });
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
/*!****************************************************!*\
  !*** ./assets/src/apps/js/frontend/instructors.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instructors_instructor_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instructors/instructor-list */ "./assets/src/apps/js/frontend/instructors/instructor-list.js");

(0,_instructors_instructor_list__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=instructors.js.map