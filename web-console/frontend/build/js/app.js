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
/******/ 	deferredModules.push([281,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 // Shared stores

var Store = {
  uxui: {
    loading: false,
    navbar: true
  },
  blocks: []
};
/* harmony default export */ __webpack_exports__["a"] = (Store);

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(282);
module.exports = __webpack_require__(512);


/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 // App configuration settings

var Configs = {
  baseurl: BASEURL_FROM_BE,
  alerts: {
    successAdded: 'Data added with success!',
    deleted: 'Deleted data with success!',
    error: 'Sorry, there was an error: contact the administrator...'
  }
};
/* harmony default export */ __webpack_exports__["a"] = (Configs);

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var vue_currency_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(280);
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
vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].filter('dateMedium', function (datetime, format) {
  // return moment(datetime).format(format || 'YYYY-MM-DD hh:mm:ss');
  return moment(datetime).format(format || 'LLL');
}); // Shortify a string if is longer than a defined length

vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].filter('readMore', function (text, length, suffix) {
  suffix = text.length <= length ? '' : suffix || '…';
  return text.substring(0, length) + suffix;
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 156,
	"./af.js": 156,
	"./ar": 157,
	"./ar-dz": 158,
	"./ar-dz.js": 158,
	"./ar-kw": 159,
	"./ar-kw.js": 159,
	"./ar-ly": 160,
	"./ar-ly.js": 160,
	"./ar-ma": 161,
	"./ar-ma.js": 161,
	"./ar-sa": 162,
	"./ar-sa.js": 162,
	"./ar-tn": 163,
	"./ar-tn.js": 163,
	"./ar.js": 157,
	"./az": 164,
	"./az.js": 164,
	"./be": 165,
	"./be.js": 165,
	"./bg": 166,
	"./bg.js": 166,
	"./bm": 167,
	"./bm.js": 167,
	"./bn": 168,
	"./bn.js": 168,
	"./bo": 169,
	"./bo.js": 169,
	"./br": 170,
	"./br.js": 170,
	"./bs": 171,
	"./bs.js": 171,
	"./ca": 172,
	"./ca.js": 172,
	"./cs": 173,
	"./cs.js": 173,
	"./cv": 174,
	"./cv.js": 174,
	"./cy": 175,
	"./cy.js": 175,
	"./da": 176,
	"./da.js": 176,
	"./de": 177,
	"./de-at": 178,
	"./de-at.js": 178,
	"./de-ch": 179,
	"./de-ch.js": 179,
	"./de.js": 177,
	"./dv": 180,
	"./dv.js": 180,
	"./el": 181,
	"./el.js": 181,
	"./en-au": 182,
	"./en-au.js": 182,
	"./en-ca": 183,
	"./en-ca.js": 183,
	"./en-gb": 184,
	"./en-gb.js": 184,
	"./en-ie": 185,
	"./en-ie.js": 185,
	"./en-il": 186,
	"./en-il.js": 186,
	"./en-nz": 187,
	"./en-nz.js": 187,
	"./eo": 188,
	"./eo.js": 188,
	"./es": 189,
	"./es-do": 190,
	"./es-do.js": 190,
	"./es-us": 191,
	"./es-us.js": 191,
	"./es.js": 189,
	"./et": 192,
	"./et.js": 192,
	"./eu": 193,
	"./eu.js": 193,
	"./fa": 194,
	"./fa.js": 194,
	"./fi": 195,
	"./fi.js": 195,
	"./fo": 196,
	"./fo.js": 196,
	"./fr": 197,
	"./fr-ca": 198,
	"./fr-ca.js": 198,
	"./fr-ch": 199,
	"./fr-ch.js": 199,
	"./fr.js": 197,
	"./fy": 200,
	"./fy.js": 200,
	"./gd": 201,
	"./gd.js": 201,
	"./gl": 202,
	"./gl.js": 202,
	"./gom-latn": 203,
	"./gom-latn.js": 203,
	"./gu": 204,
	"./gu.js": 204,
	"./he": 205,
	"./he.js": 205,
	"./hi": 206,
	"./hi.js": 206,
	"./hr": 207,
	"./hr.js": 207,
	"./hu": 208,
	"./hu.js": 208,
	"./hy-am": 209,
	"./hy-am.js": 209,
	"./id": 210,
	"./id.js": 210,
	"./is": 211,
	"./is.js": 211,
	"./it": 212,
	"./it.js": 212,
	"./ja": 213,
	"./ja.js": 213,
	"./jv": 214,
	"./jv.js": 214,
	"./ka": 215,
	"./ka.js": 215,
	"./kk": 216,
	"./kk.js": 216,
	"./km": 217,
	"./km.js": 217,
	"./kn": 218,
	"./kn.js": 218,
	"./ko": 219,
	"./ko.js": 219,
	"./ku": 220,
	"./ku.js": 220,
	"./ky": 221,
	"./ky.js": 221,
	"./lb": 222,
	"./lb.js": 222,
	"./lo": 223,
	"./lo.js": 223,
	"./lt": 224,
	"./lt.js": 224,
	"./lv": 225,
	"./lv.js": 225,
	"./me": 226,
	"./me.js": 226,
	"./mi": 227,
	"./mi.js": 227,
	"./mk": 228,
	"./mk.js": 228,
	"./ml": 229,
	"./ml.js": 229,
	"./mn": 230,
	"./mn.js": 230,
	"./mr": 231,
	"./mr.js": 231,
	"./ms": 232,
	"./ms-my": 233,
	"./ms-my.js": 233,
	"./ms.js": 232,
	"./mt": 234,
	"./mt.js": 234,
	"./my": 235,
	"./my.js": 235,
	"./nb": 236,
	"./nb.js": 236,
	"./ne": 237,
	"./ne.js": 237,
	"./nl": 238,
	"./nl-be": 239,
	"./nl-be.js": 239,
	"./nl.js": 238,
	"./nn": 240,
	"./nn.js": 240,
	"./pa-in": 241,
	"./pa-in.js": 241,
	"./pl": 242,
	"./pl.js": 242,
	"./pt": 243,
	"./pt-br": 244,
	"./pt-br.js": 244,
	"./pt.js": 243,
	"./ro": 245,
	"./ro.js": 245,
	"./ru": 246,
	"./ru.js": 246,
	"./sd": 247,
	"./sd.js": 247,
	"./se": 248,
	"./se.js": 248,
	"./si": 249,
	"./si.js": 249,
	"./sk": 250,
	"./sk.js": 250,
	"./sl": 251,
	"./sl.js": 251,
	"./sq": 252,
	"./sq.js": 252,
	"./sr": 253,
	"./sr-cyrl": 254,
	"./sr-cyrl.js": 254,
	"./sr.js": 253,
	"./ss": 255,
	"./ss.js": 255,
	"./sv": 256,
	"./sv.js": 256,
	"./sw": 257,
	"./sw.js": 257,
	"./ta": 258,
	"./ta.js": 258,
	"./te": 259,
	"./te.js": 259,
	"./tet": 260,
	"./tet.js": 260,
	"./tg": 261,
	"./tg.js": 261,
	"./th": 262,
	"./th.js": 262,
	"./tl-ph": 263,
	"./tl-ph.js": 263,
	"./tlh": 264,
	"./tlh.js": 264,
	"./tr": 265,
	"./tr.js": 265,
	"./tzl": 266,
	"./tzl.js": 266,
	"./tzm": 267,
	"./tzm-latn": 268,
	"./tzm-latn.js": 268,
	"./tzm.js": 267,
	"./ug-cn": 269,
	"./ug-cn.js": 269,
	"./uk": 270,
	"./uk.js": 270,
	"./ur": 271,
	"./ur.js": 271,
	"./uz": 272,
	"./uz-latn": 273,
	"./uz-latn.js": 273,
	"./uz.js": 272,
	"./vi": 274,
	"./vi.js": 274,
	"./x-pseudo": 275,
	"./x-pseudo.js": 275,
	"./yo": 276,
	"./yo.js": 276,
	"./zh-cn": 277,
	"./zh-cn.js": 277,
	"./zh-hk": 278,
	"./zh-hk.js": 278,
	"./zh-tw": 279,
	"./zh-tw.js": 279
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
webpackContext.id = 511;

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__(483);

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/css/all.css
var css_all = __webpack_require__(484);

// EXTERNAL MODULE: ./node_modules/toastr/build/toastr.css
var toastr = __webpack_require__(485);

// EXTERNAL MODULE: ./src/scss/app.scss
var app = __webpack_require__(486);

// CONCATENATED MODULE: ./src/styles.js
/*
  Application styles
*/
// Default styles


 // Custom styles


// EXTERNAL MODULE: ./node_modules/bootstrap/dist/js/bootstrap.js
var js_bootstrap = __webpack_require__(487);

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/js/fontawesome.js
var fontawesome = __webpack_require__(488);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__(35);

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
  return _vm.STORE.uxui.loading
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

// EXTERNAL MODULE: ./src/store/store.js
var store = __webpack_require__(14);

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
      STORE: store["a" /* default */]
    };
  }
});
// CONCATENATED MODULE: ./src/components/commons/loading/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var commons_loadingvue_type_script_lang_js_ = (loadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(12);

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
                  [_vm._v("Status")]
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
                  [_vm._v("Documentation")]
                )
              ]),
              _vm._v(" "),
              _vm._m(3)
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "navbar-nav mr-right" }, [
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
                  [_vm._v("\n            Menu\n          ")]
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
                      _vm._v("Blocks")
                    ]),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: _vm.Routes.BLOCKS.LIST.path }
                      },
                      [_vm._v("List")]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: _vm.Routes.BLOCKS.PROPOSE.path }
                      },
                      [_vm._v("Propose")]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "dropdown-divider" }),
                    _vm._v(" "),
                    _c("h6", { staticClass: "dropdown-header" }, [
                      _vm._v("Admin")
                    ]),
                    _vm._v(" "),
                    _c(
                      "a",
                      { staticClass: "dropdown-item", attrs: { href: "#" } },
                      [_vm._v("Something else here")]
                    )
                  ]
                )
              ])
            ])
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
    return _c("li", { staticClass: "nav-item" }, [
      _c(
        "a",
        {
          staticClass: "nav-link",
          attrs: {
            href: "https://github.com/davidemiceli/chainode",
            target: "_blank"
          }
        },
        [_c("i", { staticClass: "fab fa-github" }), _vm._v(" Github")]
      )
    ])
  }
]
navbarvue_type_template_id_8be2602c_render._withStripped = true


// CONCATENATED MODULE: ./src/components/commons/navbar/index.vue?vue&type=template&id=8be2602c&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/navbar/index.vue?vue&type=script&lang=js&
var navbarvue_type_script_lang_js_ = __webpack_require__(75);

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
var footervue_type_script_lang_js_ = __webpack_require__(77);

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
var vue_router_esm = __webpack_require__(112);

// EXTERNAL MODULE: ./src/router/routes.js
var routes = __webpack_require__(8);

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
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6 text-right" }, [
          _c("img", {
            staticStyle: { width: "400px" },
            attrs: { src: "/img/image.png" }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("h1", { staticClass: "top-title" }, [_vm._v("Chainode")]),
          _vm._v(" "),
          _c("h1", { staticClass: "title" }, [
            _vm._v("\n        Private"),
            _c("br"),
            _vm._v("Blockchain"),
            _c("br"),
            _vm._v("Network\n      ")
          ])
        ])
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
            _vm._v(" of two types.\n        "),
            _c("br"),
            _vm._v("Here there are other icons from Font Awesome "),
            _c("i", { staticClass: "fas fa-igloo" }),
            _vm._v(" "),
            _c("i", { staticClass: "fab fa-github" })
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
            _c("i", { staticClass: "material-icons" }, [_vm._v("cloud")]),
            _vm._v(" "),
            _c("i", { staticClass: "material-icons" }, [
              _vm._v("insert_emoticon")
            ]),
            _vm._v(" of two types.\n        "),
            _c("br"),
            _vm._v("Here there are other icons from Font Awesome "),
            _c("i", { staticClass: "fas fa-igloo" }),
            _vm._v(" "),
            _c("i", { staticClass: "fab fa-github" })
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/blocks/List.vue?vue&type=template&id=7218f372&
var Listvue_type_template_id_7218f372_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "p-t-40 container" }, [
    _c("h1", { staticClass: "title text-center" }, [_vm._v("Blocks")]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    !_vm.STORE.blocks.length
      ? _c("p", { staticClass: "text-center" }, [
          _vm._v("\n    There are no blocks yet...\n  ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.STORE.blocks.length
      ? _c("table", { staticClass: "table table-striped table-sm" }, [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.STORE.blocks, function(block) {
              return _c("tr", [
                _c("td", [_vm._v(_vm._s(_vm._f("readMore")(block.hash, 10)))]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(_vm._s(_vm._f("readMore")(block.eventId, 10)))
                ]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(_vm._s(_vm._f("readMore")(block.company, 10)))
                ]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(_vm._s(_vm._f("dateMedium")(block.proposedTime)))
                ]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(_vm._s(_vm._f("dateMedium")(block.generatedTime)))
                ]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm._f("readMore")(block.data, 20)))])
              ])
            }),
            0
          )
        ])
      : _vm._e()
  ])
}
var Listvue_type_template_id_7218f372_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "text-center" }, [
      _c("small", [_vm._v("List of transactions of the ledger.")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("hash")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("eventId")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("company")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("proposedTime")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("generatedTime")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("data")])
      ])
    ])
  }
]
Listvue_type_template_id_7218f372_render._withStripped = true


// CONCATENATED MODULE: ./src/components/blocks/List.vue?vue&type=template&id=7218f372&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/blocks/List.vue?vue&type=script&lang=js&
var Listvue_type_script_lang_js_ = __webpack_require__(78);

// CONCATENATED MODULE: ./src/components/blocks/List.vue?vue&type=script&lang=js&
 /* harmony default export */ var blocks_Listvue_type_script_lang_js_ = (Listvue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./src/components/blocks/List.vue





/* normalize component */

var List_component = Object(componentNormalizer["a" /* default */])(
  blocks_Listvue_type_script_lang_js_,
  Listvue_type_template_id_7218f372_render,
  Listvue_type_template_id_7218f372_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var List_api; }
List_component.options.__file = "src/components/blocks/List.vue"
/* harmony default export */ var List = (List_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/blocks/Propose.vue?vue&type=template&id=e1b3aeb6&
var Proposevue_type_template_id_e1b3aeb6_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "p-t-80 container" }, [
    _c("h1", { staticClass: "title text-center" }, [
      _vm._v("Propose a new block")
    ]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("form", [
      _c("div", { staticClass: "form-group" }, [
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.block,
              expression: "block"
            }
          ],
          staticClass: "form-control coding",
          attrs: { id: "block-proposed", rows: "8" },
          domProps: { value: _vm.block },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.block = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "text-right" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-light",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                _vm.Propose($event)
              }
            }
          },
          [_vm._v("Propose")]
        )
      ])
    ])
  ])
}
var Proposevue_type_template_id_e1b3aeb6_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "text-center" }, [
      _c("small", [
        _vm._v(
          "Compose a new transaction to candidate as block into the ledger."
        )
      ])
    ])
  }
]
Proposevue_type_template_id_e1b3aeb6_render._withStripped = true


// CONCATENATED MODULE: ./src/components/blocks/Propose.vue?vue&type=template&id=e1b3aeb6&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/blocks/Propose.vue?vue&type=script&lang=js&
var Proposevue_type_script_lang_js_ = __webpack_require__(79);

// CONCATENATED MODULE: ./src/components/blocks/Propose.vue?vue&type=script&lang=js&
 /* harmony default export */ var blocks_Proposevue_type_script_lang_js_ = (Proposevue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./src/components/blocks/Propose.vue





/* normalize component */

var Propose_component = Object(componentNormalizer["a" /* default */])(
  blocks_Proposevue_type_script_lang_js_,
  Proposevue_type_template_id_e1b3aeb6_render,
  Proposevue_type_template_id_e1b3aeb6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Propose_api; }
Propose_component.options.__file = "src/components/blocks/Propose.vue"
/* harmony default export */ var Propose = (Propose_component.exports);
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
  path: routes["a" /* Routes */].BLOCKS.LIST.path,
  name: routes["a" /* Routes */].BLOCKS.LIST.name,
  component: List
}, {
  path: routes["a" /* Routes */].BLOCKS.PROPOSE.path,
  name: routes["a" /* Routes */].BLOCKS.PROPOSE.name,
  component: Propose
}, {
  path: routes["a" /* Routes */].SOMETHING.path,
  redirect: routes["a" /* Routes */].HOME.path
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
// EXTERNAL MODULE: ./src/lib/filters.js
var filters = __webpack_require__(510);

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

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76);
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
      STORE: _src_store_store__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74)))

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
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
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.loading = true;
    }
  }, {
    key: "LOADING_STOP",
    value: function LOADING_STOP() {
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.loading = false;
    } // Navbar actions

  }, {
    key: "NAVBAR_SHOW",
    value: function NAVBAR_SHOW() {
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.navbar = true;
    }
  }, {
    key: "NAVBAR_HIDE",
    value: function NAVBAR_HIDE() {
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.navbar = false;
    } // Block actions

  }, {
    key: "BLOCKS_SET",
    value: function BLOCKS_SET(items) {
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].blocks = items;
    }
  }]);

  return Actions;
}();

;
/* harmony default export */ __webpack_exports__["a"] = (new Actions());

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76);
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
      STORE: _src_store_store__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74)))

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_services_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80);
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76);
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





/* harmony default export */ __webpack_exports__["a"] = ({
  name: _src_router_routes__WEBPACK_IMPORTED_MODULE_1__[/* Routes */ "a"].BLOCKS.LIST.name,
  data: function data() {
    return {
      STORE: _src_store_store__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
    };
  },
  methods: {
    List: function List(e) {
      if (e) e.preventDefault();
      return _src_services_blocks__WEBPACK_IMPORTED_MODULE_2__[/* BlockServices */ "a"].list().then(function (r) {
        _src_store_actions__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].BLOCKS_SET(r);
      }).catch(function (err) {
        toastr.error(_src_configs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].alerts.error);
      });
    },
    Details: function Details(e) {
      return;
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    return next(function (vm) {
      return vm.List();
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74)))

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_services_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80);
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


 // Check if data can be serialized as json

var canBeSerialized = function canBeSerialized(block) {
  try {
    var serialized = JSON.stringify(block);
    JSON.parse(serialized);
    return true;
  } catch (err) {
    return false;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: _src_router_routes__WEBPACK_IMPORTED_MODULE_1__[/* Routes */ "a"].BLOCKS.PROPOSE.name,
  data: function data() {
    return {
      block: ''
    };
  },
  methods: {
    Propose: function Propose(e) {
      var _this = this;

      e.preventDefault();
      var block = this.block;

      if (!canBeSerialized(block)) {
        toastr.error('Data is a not valid json.');
        return;
      }

      return _src_services_blocks__WEBPACK_IMPORTED_MODULE_2__[/* BlockServices */ "a"].propose(block).then(function (r) {
        toastr.success(_src_configs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].alerts.successAdded);
        _this.block = '';
        return _this.$router.push({
          name: _src_router_routes__WEBPACK_IMPORTED_MODULE_1__[/* Routes */ "a"].BLOCKS.LIST.name
        });
      }).catch(function (err) {
        toastr.error(_src_configs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].alerts.error);
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74)))

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Routes; });
/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
 // Configurations

 // Routes

var Routes = {
  // Dashboard
  HOME: {
    path: '/',
    name: 'home'
  },
  // Blocks
  BLOCKS: {
    LIST: {
      path: '/dashboard/blocks/list',
      name: 'BlocksList'
    },
    PROPOSE: {
      path: '/dashboard/blocks/propose',
      name: 'BlocksPropose'
    }
  },
  // Something
  SOMETHING: {
    path: '/dashboard/something',
    name: 'something'
  },
  // Not Found: 404 error
  NOTFOUND: {
    path: '/404',
    name: 'notfound'
  }
};

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockServices; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(111);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
 // Requirements

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Configurations

 // Services

var Blocks =
/*#__PURE__*/
function () {
  function Blocks() {
    _classCallCheck(this, Blocks);

    this.API_URL = "".concat(_src_configs__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].baseurl, "/api/block");
  } // Propose block data


  _createClass(Blocks, [{
    key: "propose",
    value: function () {
      var _propose = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(block) {
        var data, r;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                data = {
                  data: block
                };
                _context.next = 4;
                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(this.API_URL, "/propose"), data);

              case 4:
                r = _context.sent;
                return _context.abrupt("return", r.data);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function propose(_x) {
        return _propose.apply(this, arguments);
      }

      return propose;
    }() // Send data to one peer

  }, {
    key: "list",
    value: function () {
      var _list = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(condition) {
        var r;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(this.API_URL, "/list"), condition);

              case 3:
                r = _context2.sent;
                return _context2.abrupt("return", r.data);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function list(_x2) {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }]);

  return Blocks;
}();

;
var BlockServices = new Blocks();

/***/ })

/******/ });