/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([150,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Routes; });
/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
 // Configurations

 // Routes

var Routes = {
  // Dashboard
  HOME: {
    path: '/',
    name: 'home'
  },
  // Something
  SOMETHING: {
    path: '/something',
    name: 'something'
  },
  // Empty
  EMPTY: {
    path: "/empty",
    name: 'empty'
  },
  // Not Found: 404 error
  NOTFOUND: {
    path: '/404',
    name: 'notfound'
  }
};

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_store_stores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
 // Store

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Actions

var Actions =
/*#__PURE__*/
function () {
  function Actions() {
    _classCallCheck(this, Actions);
  } // Loading actions


  _createClass(Actions, [{
    key: "LOADING_START",
    value: function LOADING_START() {
      _src_store_stores__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.loading = true;
    }
  }, {
    key: "LOADING_STOP",
    value: function LOADING_STOP() {
      _src_store_stores__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.loading = false;
    } // Navbar actions

  }, {
    key: "NAVBAR_SHOW",
    value: function NAVBAR_SHOW() {
      _src_store_stores__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.navbar = true;
    }
  }, {
    key: "NAVBAR_HIDE",
    value: function NAVBAR_HIDE() {
      _src_store_stores__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.navbar = false;
    } // User actions

  }, {
    key: "USER_SET",
    value: function USER_SET(item) {
      _src_store_stores__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].user = item;
    }
  }]);

  return Actions;
}();

;
/* unused harmony default export */ var _unused_webpack_default_export = (new Actions());

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var vue_currency_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(139);
/* harmony import */ var vue_currency_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_currency_filter__WEBPACK_IMPORTED_MODULE_1__);
 // Requirements



vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].use(vue_currency_filter__WEBPACK_IMPORTED_MODULE_1___default.a, {
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
});
vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].filter('date_medium', function (datetime, format) {
  // return moment(datetime).format(format || 'YYYY-MM-DD hh:mm:ss');
  return moment(datetime).format(format || 'LLL');
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 15,
	"./af.js": 15,
	"./ar": 16,
	"./ar-dz": 17,
	"./ar-dz.js": 17,
	"./ar-kw": 18,
	"./ar-kw.js": 18,
	"./ar-ly": 19,
	"./ar-ly.js": 19,
	"./ar-ma": 20,
	"./ar-ma.js": 20,
	"./ar-sa": 21,
	"./ar-sa.js": 21,
	"./ar-tn": 22,
	"./ar-tn.js": 22,
	"./ar.js": 16,
	"./az": 23,
	"./az.js": 23,
	"./be": 24,
	"./be.js": 24,
	"./bg": 25,
	"./bg.js": 25,
	"./bm": 26,
	"./bm.js": 26,
	"./bn": 27,
	"./bn.js": 27,
	"./bo": 28,
	"./bo.js": 28,
	"./br": 29,
	"./br.js": 29,
	"./bs": 30,
	"./bs.js": 30,
	"./ca": 31,
	"./ca.js": 31,
	"./cs": 32,
	"./cs.js": 32,
	"./cv": 33,
	"./cv.js": 33,
	"./cy": 34,
	"./cy.js": 34,
	"./da": 35,
	"./da.js": 35,
	"./de": 36,
	"./de-at": 37,
	"./de-at.js": 37,
	"./de-ch": 38,
	"./de-ch.js": 38,
	"./de.js": 36,
	"./dv": 39,
	"./dv.js": 39,
	"./el": 40,
	"./el.js": 40,
	"./en-au": 41,
	"./en-au.js": 41,
	"./en-ca": 42,
	"./en-ca.js": 42,
	"./en-gb": 43,
	"./en-gb.js": 43,
	"./en-ie": 44,
	"./en-ie.js": 44,
	"./en-il": 45,
	"./en-il.js": 45,
	"./en-nz": 46,
	"./en-nz.js": 46,
	"./eo": 47,
	"./eo.js": 47,
	"./es": 48,
	"./es-do": 49,
	"./es-do.js": 49,
	"./es-us": 50,
	"./es-us.js": 50,
	"./es.js": 48,
	"./et": 51,
	"./et.js": 51,
	"./eu": 52,
	"./eu.js": 52,
	"./fa": 53,
	"./fa.js": 53,
	"./fi": 54,
	"./fi.js": 54,
	"./fo": 55,
	"./fo.js": 55,
	"./fr": 56,
	"./fr-ca": 57,
	"./fr-ca.js": 57,
	"./fr-ch": 58,
	"./fr-ch.js": 58,
	"./fr.js": 56,
	"./fy": 59,
	"./fy.js": 59,
	"./gd": 60,
	"./gd.js": 60,
	"./gl": 61,
	"./gl.js": 61,
	"./gom-latn": 62,
	"./gom-latn.js": 62,
	"./gu": 63,
	"./gu.js": 63,
	"./he": 64,
	"./he.js": 64,
	"./hi": 65,
	"./hi.js": 65,
	"./hr": 66,
	"./hr.js": 66,
	"./hu": 67,
	"./hu.js": 67,
	"./hy-am": 68,
	"./hy-am.js": 68,
	"./id": 69,
	"./id.js": 69,
	"./is": 70,
	"./is.js": 70,
	"./it": 71,
	"./it.js": 71,
	"./ja": 72,
	"./ja.js": 72,
	"./jv": 73,
	"./jv.js": 73,
	"./ka": 74,
	"./ka.js": 74,
	"./kk": 75,
	"./kk.js": 75,
	"./km": 76,
	"./km.js": 76,
	"./kn": 77,
	"./kn.js": 77,
	"./ko": 78,
	"./ko.js": 78,
	"./ku": 79,
	"./ku.js": 79,
	"./ky": 80,
	"./ky.js": 80,
	"./lb": 81,
	"./lb.js": 81,
	"./lo": 82,
	"./lo.js": 82,
	"./lt": 83,
	"./lt.js": 83,
	"./lv": 84,
	"./lv.js": 84,
	"./me": 85,
	"./me.js": 85,
	"./mi": 86,
	"./mi.js": 86,
	"./mk": 87,
	"./mk.js": 87,
	"./ml": 88,
	"./ml.js": 88,
	"./mn": 89,
	"./mn.js": 89,
	"./mr": 90,
	"./mr.js": 90,
	"./ms": 91,
	"./ms-my": 92,
	"./ms-my.js": 92,
	"./ms.js": 91,
	"./mt": 93,
	"./mt.js": 93,
	"./my": 94,
	"./my.js": 94,
	"./nb": 95,
	"./nb.js": 95,
	"./ne": 96,
	"./ne.js": 96,
	"./nl": 97,
	"./nl-be": 98,
	"./nl-be.js": 98,
	"./nl.js": 97,
	"./nn": 99,
	"./nn.js": 99,
	"./pa-in": 100,
	"./pa-in.js": 100,
	"./pl": 101,
	"./pl.js": 101,
	"./pt": 102,
	"./pt-br": 103,
	"./pt-br.js": 103,
	"./pt.js": 102,
	"./ro": 104,
	"./ro.js": 104,
	"./ru": 105,
	"./ru.js": 105,
	"./sd": 106,
	"./sd.js": 106,
	"./se": 107,
	"./se.js": 107,
	"./si": 108,
	"./si.js": 108,
	"./sk": 109,
	"./sk.js": 109,
	"./sl": 110,
	"./sl.js": 110,
	"./sq": 111,
	"./sq.js": 111,
	"./sr": 112,
	"./sr-cyrl": 113,
	"./sr-cyrl.js": 113,
	"./sr.js": 112,
	"./ss": 114,
	"./ss.js": 114,
	"./sv": 115,
	"./sv.js": 115,
	"./sw": 116,
	"./sw.js": 116,
	"./ta": 117,
	"./ta.js": 117,
	"./te": 118,
	"./te.js": 118,
	"./tet": 119,
	"./tet.js": 119,
	"./tg": 120,
	"./tg.js": 120,
	"./th": 121,
	"./th.js": 121,
	"./tl-ph": 122,
	"./tl-ph.js": 122,
	"./tlh": 123,
	"./tlh.js": 123,
	"./tr": 124,
	"./tr.js": 124,
	"./tzl": 125,
	"./tzl.js": 125,
	"./tzm": 126,
	"./tzm-latn": 127,
	"./tzm-latn.js": 127,
	"./tzm.js": 126,
	"./ug-cn": 128,
	"./ug-cn.js": 128,
	"./uk": 129,
	"./uk.js": 129,
	"./ur": 130,
	"./ur.js": 130,
	"./uz": 131,
	"./uz-latn": 132,
	"./uz-latn.js": 132,
	"./uz.js": 131,
	"./vi": 133,
	"./vi.js": 133,
	"./x-pseudo": 134,
	"./x-pseudo.js": 134,
	"./yo": 135,
	"./yo.js": 135,
	"./zh-cn": 136,
	"./zh-cn.js": 136,
	"./zh-hk": 137,
	"./zh-hk.js": 137,
	"./zh-tw": 138,
	"./zh-tw.js": 138
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 149;

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/toastr/build/toastr.css
var toastr = __webpack_require__(140);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__(141);

// EXTERNAL MODULE: ./src/scss/app.scss
var app = __webpack_require__(142);

// CONCATENATED MODULE: ./src/styles.js
/*
  Application styles
*/
// Default styles

 // Custom styles


// EXTERNAL MODULE: ./node_modules/bootstrap/dist/js/bootstrap.js
var js_bootstrap = __webpack_require__(143);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/App.vue?vue&type=template&id=617ab0be&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("loading"),
      _vm._v(" "),
      _c("navbar"),
      _vm._v(" "),
      _c("router-view"),
      _vm._v(" "),
      _c("footerBottom")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/App.vue?vue&type=template&id=617ab0be&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/loading/index.vue?vue&type=template&id=07f7e478&
var loadingvue_type_template_id_07f7e478_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.shared.uxui.loading
    ? _c("div", { staticClass: "dashboard-on-loading" }, [_vm._m(0)])
    : _vm._e()
}
var loadingvue_type_template_id_07f7e478_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticStyle: { "padding-top": "10%" } }, [
      _c("div", { staticClass: "spinner" }, [
        _c("div", { staticClass: "rect1" }),
        _vm._v(" "),
        _c("div", { staticClass: "rect2" }),
        _vm._v(" "),
        _c("div", { staticClass: "rect3" }),
        _vm._v(" "),
        _c("div", { staticClass: "rect4" }),
        _vm._v(" "),
        _c("div", { staticClass: "rect5" })
      ])
    ])
  }
]
loadingvue_type_template_id_07f7e478_render._withStripped = true


// CONCATENATED MODULE: ./src/components/commons/loading/index.vue?vue&type=template&id=07f7e478&

// EXTERNAL MODULE: ./src/store/stores.js
var stores = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/loading/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Store

/* harmony default export */ var loadingvue_type_script_lang_js_ = ({
  name: 'Loading',
  data: function data() {
    return {
      shared: stores["a" /* default */]
    };
  }
});
// CONCATENATED MODULE: ./src/components/commons/loading/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var commons_loadingvue_type_script_lang_js_ = (loadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./src/components/commons/loading/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  commons_loadingvue_type_script_lang_js_,
  loadingvue_type_template_id_07f7e478_render,
  loadingvue_type_template_id_07f7e478_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/commons/loading/index.vue"
/* harmony default export */ var loading = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/navbar/index.vue?vue&type=template&id=8be2602c&
var navbarvue_type_template_id_8be2602c_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "nav",
    {
      staticClass:
        "navbar navbar-expand-lg navbar-light bg-light bg-light-white"
    },
    [
      _c("div", { staticClass: "container" }, [
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "collapse navbar-collapse",
            attrs: { id: "navbarSupportedContent" }
          },
          [
            _c("ul", { staticClass: "navbar-nav mr-auto" }, [
              _vm._m(2),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item" }, [
                _c(
                  "a",
                  {
                    staticClass: "nav-link",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        _vm.Hello($event)
                      }
                    }
                  },
                  [_vm._v("One")]
                )
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item" }, [
                _c(
                  "a",
                  {
                    staticClass: "nav-link",
                    attrs: { href: _vm.Routes.HOME.path }
                  },
                  [_vm._v("Two")]
                )
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item" }, [
                _c(
                  "a",
                  {
                    staticClass: "nav-link",
                    attrs: { href: _vm.Routes.HOME.path }
                  },
                  [_vm._v("Three")]
                )
              ])
            ]),
            _vm._v(" "),
            _vm._m(3)
          ]
        )
      ])
    ]
  )
}
var navbarvue_type_template_id_8be2602c_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "navbar-brand", attrs: { href: "#" } }, [
      _c("img", {
        staticStyle: {
          "margin-top": "-5px",
          height: "25px",
          display: "inline-block"
        },
        attrs: { src: "/img/logo.png" }
      }),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "brand-title-name",
          staticStyle: { display: "inline-block" }
        },
        [_vm._v("CHAINODE")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "navbar-toggler",
        attrs: {
          type: "button",
          "data-toggle": "collapse",
          "data-target": "#navbarSupportedContent",
          "aria-controls": "navbarSupportedContent",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation"
        }
      },
      [_c("span", { staticClass: "navbar-toggler-icon" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item active" }, [
      _c("a", { staticClass: "nav-link", attrs: { href: "#" } }, [
        _vm._v("Home "),
        _c("span", { staticClass: "sr-only" }, [_vm._v("(current)")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "navbar-nav mr-right" }, [
      _c("li", { staticClass: "nav-item dropdown" }, [
        _c(
          "a",
          {
            staticClass: "nav-link dropdown-toggle",
            attrs: {
              href: "#",
              id: "navbarDropdown",
              role: "button",
              "data-toggle": "dropdown",
              "aria-haspopup": "true",
              "aria-expanded": "false"
            }
          },
          [_vm._v("\n            Dropdown\n          ")]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "dropdown-menu",
            attrs: { "aria-labelledby": "navbarDropdown" }
          },
          [
            _c("h6", { staticClass: "dropdown-header" }, [
              _vm._v("Dropdown header")
            ]),
            _vm._v(" "),
            _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
              _vm._v("Action")
            ]),
            _vm._v(" "),
            _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
              _vm._v("Another action")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "dropdown-divider" }),
            _vm._v(" "),
            _c("h6", { staticClass: "dropdown-header" }, [
              _vm._v("Dropdown header")
            ]),
            _vm._v(" "),
            _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
              _vm._v("Something else here")
            ])
          ]
        )
      ])
    ])
  }
]
navbarvue_type_template_id_8be2602c_render._withStripped = true


// CONCATENATED MODULE: ./src/components/commons/navbar/index.vue?vue&type=template&id=8be2602c&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/navbar/index.vue?vue&type=script&lang=js&
var navbarvue_type_script_lang_js_ = __webpack_require__(6);

// CONCATENATED MODULE: ./src/components/commons/navbar/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var commons_navbarvue_type_script_lang_js_ = (navbarvue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./src/components/commons/navbar/index.vue





/* normalize component */

var navbar_component = Object(componentNormalizer["a" /* default */])(
  commons_navbarvue_type_script_lang_js_,
  navbarvue_type_template_id_8be2602c_render,
  navbarvue_type_template_id_8be2602c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var navbar_api; }
navbar_component.options.__file = "src/components/commons/navbar/index.vue"
/* harmony default export */ var navbar = (navbar_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/footer/index.vue?vue&type=template&id=4e6c37b5&
var footervue_type_template_id_4e6c37b5_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var footervue_type_template_id_4e6c37b5_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("footer", { staticClass: "footer bg-light" }, [
      _c("div", { staticClass: "container" }, [
        _c("span", { staticClass: "text-muted" }, [_vm._v("Just a footer.")])
      ])
    ])
  }
]
footervue_type_template_id_4e6c37b5_render._withStripped = true


// CONCATENATED MODULE: ./src/components/commons/footer/index.vue?vue&type=template&id=4e6c37b5&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/footer/index.vue?vue&type=script&lang=js&
var footervue_type_script_lang_js_ = __webpack_require__(7);

// CONCATENATED MODULE: ./src/components/commons/footer/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var commons_footervue_type_script_lang_js_ = (footervue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./src/components/commons/footer/index.vue





/* normalize component */

var footer_component = Object(componentNormalizer["a" /* default */])(
  commons_footervue_type_script_lang_js_,
  footervue_type_template_id_4e6c37b5_render,
  footervue_type_template_id_4e6c37b5_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var footer_api; }
footer_component.options.__file = "src/components/commons/footer/index.vue"
/* harmony default export */ var footer = (footer_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
// Components



/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'App',
  components: {
    'loading': loading,
    'navbar': navbar,
    'footerBottom': footer
  }
});
// CONCATENATED MODULE: ./src/components/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/App.vue





/* normalize component */

var App_component = Object(componentNormalizer["a" /* default */])(
  components_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var App_api; }
App_component.options.__file = "src/components/App.vue"
/* harmony default export */ var App = (App_component.exports);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__(10);

// EXTERNAL MODULE: ./src/router/routes.js
var routes = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Home.vue?vue&type=template&id=8dc7cce2&
var Homevue_type_template_id_8dc7cce2_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var Homevue_type_template_id_8dc7cce2_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "p-t-80 container" }, [
      _c("h1", { staticClass: "top-title text-center" }, [_vm._v("Chainode")]),
      _vm._v(" "),
      _c("p", { staticClass: "m-t-50 text-center" }, [
        _c("img", { attrs: { src: "/img/image.png" } })
      ]),
      _vm._v(" "),
      _c("h1", { staticClass: "m-t-100 title text-center" }, [
        _vm._v("Lorem ipsum")
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "sentences" }, [
        _vm._v(
          "\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n  "
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-t-50 row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("About something")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        "
            ),
            _c("br"),
            _vm._v("Here there are some icon examples "),
            _c("i", { staticClass: "material-icons" }, [_vm._v("cloud")]),
            _vm._v(" "),
            _c("i", { staticClass: "material-icons" }, [
              _vm._v("insert_emoticon")
            ]),
            _vm._v(" of two types.\n      ")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("a", { staticClass: "highlighted-link", attrs: { href: "#" } }, [
              _vm._v("Learn more")
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Another section")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        "
            ),
            _c("br"),
            _vm._v("Here there are some icon examples "),
            _c("i", { staticClass: "material-icons" }, [_vm._v("folder")]),
            _vm._v(" "),
            _c("i", { staticClass: "material-icons" }, [_vm._v("show_chart")]),
            _vm._v(" of two types.\n      ")
          ]),
          _vm._v(" "),
          _c("p", [
            _c("a", { staticClass: "highlighted-link", attrs: { href: "#" } }, [
              _vm._v("Learn more")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-t-100 box-section" }, [
        _c("p", { staticClass: "small-title" }, [_vm._v("Just a box")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n    "
          )
        ])
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "m-t-50 text-center" }, [
        _vm._v("\n    And that all folks!\n  ")
      ])
    ])
  }
]
Homevue_type_template_id_8dc7cce2_render._withStripped = true


// CONCATENATED MODULE: ./src/components/Home.vue?vue&type=template&id=8dc7cce2&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Home.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Routes

/* harmony default export */ var Homevue_type_script_lang_js_ = ({
  name: routes["a" /* Routes */].HOME.name,
  data: function data() {
    return {
      msg: 'nothing'
    };
  }
});
// CONCATENATED MODULE: ./src/components/Home.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Homevue_type_script_lang_js_ = (Homevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Home.vue





/* normalize component */

var Home_component = Object(componentNormalizer["a" /* default */])(
  components_Homevue_type_script_lang_js_,
  Homevue_type_template_id_8dc7cce2_render,
  Homevue_type_template_id_8dc7cce2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Home_api; }
Home_component.options.__file = "src/components/Home.vue"
/* harmony default export */ var Home = (Home_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Empty.vue?vue&type=template&id=cbb9fa66&
var Emptyvue_type_template_id_cbb9fa66_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "p-t-80 m-lr-10" }, [
    _c("h1", [_vm._v("Empty " + _vm._s(_vm.msg))]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _vm._m(1)
  ])
}
var Emptyvue_type_template_id_cbb9fa66_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c(
        "a",
        {
          staticClass: "btn btn-default",
          attrs: { href: "#", role: "button" }
        },
        [_vm._v("Link")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _c("i", {
        staticClass: "fa fa-address-book",
        attrs: { "aria-hidden": "true" }
      })
    ])
  }
]
Emptyvue_type_template_id_cbb9fa66_render._withStripped = true


// CONCATENATED MODULE: ./src/components/Empty.vue?vue&type=template&id=cbb9fa66&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Empty.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
// Routes

/* harmony default export */ var Emptyvue_type_script_lang_js_ = ({
  name: routes["a" /* Routes */].EMPTY.name,
  data: function data() {
    return {
      msg: 'nothing'
    };
  }
});
// CONCATENATED MODULE: ./src/components/Empty.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Emptyvue_type_script_lang_js_ = (Emptyvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Empty.vue





/* normalize component */

var Empty_component = Object(componentNormalizer["a" /* default */])(
  components_Emptyvue_type_script_lang_js_,
  Emptyvue_type_template_id_cbb9fa66_render,
  Emptyvue_type_template_id_cbb9fa66_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Empty_api; }
Empty_component.options.__file = "src/components/Empty.vue"
/* harmony default export */ var Empty = (Empty_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/404.vue?vue&type=template&id=a1e40950&
var _404vue_type_template_id_a1e40950_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("div", [_vm._v(_vm._s(_vm.msg))])])
}
var _404vue_type_template_id_a1e40950_staticRenderFns = []
_404vue_type_template_id_a1e40950_render._withStripped = true


// CONCATENATED MODULE: ./src/components/404.vue?vue&type=template&id=a1e40950&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/404.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var _404vue_type_script_lang_js_ = ({
  name: 'ErrorPage',
  data: function data() {
    return {
      msg: 'Sorry, the page you are looking for does not exist.'
    };
  }
});
// CONCATENATED MODULE: ./src/components/404.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_404vue_type_script_lang_js_ = (_404vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/404.vue





/* normalize component */

var _404_component = Object(componentNormalizer["a" /* default */])(
  components_404vue_type_script_lang_js_,
  _404vue_type_template_id_a1e40950_render,
  _404vue_type_template_id_a1e40950_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var _404_api; }
_404_component.options.__file = "src/components/404.vue"
/* harmony default export */ var _404 = (_404_component.exports);
// CONCATENATED MODULE: ./src/router/index.js
 // Requirements


 // Routes

 // Routes




vue_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
var router_routes = [{
  path: routes["a" /* Routes */].HOME.path,
  name: routes["a" /* Routes */].HOME.name,
  component: Home
}, {
  path: routes["a" /* Routes */].SOMETHING.path,
  redirect: routes["a" /* Routes */].HOME.path
}, {
  path: routes["a" /* Routes */].EMPTY.path,
  name: routes["a" /* Routes */].EMPTY.name,
  component: Empty
}, {
  path: routes["a" /* Routes */].NOTFOUND.path,
  component: _404
}, {
  path: '*',
  redirect: routes["a" /* Routes */].NOTFOUND.path
}];
/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  mode: 'history',
  routes: router_routes
}));
// EXTERNAL MODULE: ./src/libs/filters.js
var filters = __webpack_require__(148);

// CONCATENATED MODULE: ./src/main.js

/*
  Main application entrypoint
*/
// CSS styles

 // Javascript libraries

 // Vue requirements




 // Turn off the production tip on the console

vue_esm["a" /* default */].config.productionTip = false; // App

new vue_esm["a" /* default */]({
  el: '#app',
  router: router,
  components: {
    App: App
  },
  template: '<App/>'
});

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 // Shared stores

var stores = {
  uxui: {
    loading: false,
    navbar: true
  },
  user: {}
};
/* harmony default export */ __webpack_exports__["a"] = (stores);

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _src_store_stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Configurations
 // Routes

 // Stores and actions



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Navbar',
  data: function data() {
    return {
      shared: _src_store_stores__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
      Routes: _src_router_routes__WEBPACK_IMPORTED_MODULE_1__[/* Routes */ "a"]
    };
  },
  methods: {
    Hello: function Hello(e) {
      e.preventDefault(); // this.$router.push({name: Routes.HOME});
      // toastr.error(Configs.alerts.error);

      toastr.success('Hello!');
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _src_store_stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
//
//
//
//
//
//
//
//
// Configurations
 // Routes

 // Stores and actions



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Footer',
  data: function data() {
    return {
      shared: _src_store_stores__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
      Routes: _src_router_routes__WEBPACK_IMPORTED_MODULE_1__[/* Routes */ "a"]
    };
  },
  methods: {
    Hello: function Hello(e) {
      e.preventDefault(); // this.$router.push({name: Routes.HOME});
      // toastr.error(Configs.alerts.error);

      toastr.success('Hello!');
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 // App configuration settings

var Configs = {
  alerts: {
    success_added: 'Data added with success!',
    deleted: 'Deleted data with success!',
    error: 'Sorry, there was an error: contact the administrator...'
  }
};
/* unused harmony default export */ var _unused_webpack_default_export = (Configs);

/***/ })

/******/ });