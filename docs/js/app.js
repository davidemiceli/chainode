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
/******/ 	deferredModules.push([262,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(263);
module.exports = __webpack_require__(475);


/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var vue_currency_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(261);
/* harmony import */ var vue_currency_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_currency_filter__WEBPACK_IMPORTED_MODULE_1__);
 // Requirements


 // Format currency

vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].use(vue_currency_filter__WEBPACK_IMPORTED_MODULE_1___default.a, {
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
}); // Format a datetime

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

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 137,
	"./af.js": 137,
	"./ar": 138,
	"./ar-dz": 139,
	"./ar-dz.js": 139,
	"./ar-kw": 140,
	"./ar-kw.js": 140,
	"./ar-ly": 141,
	"./ar-ly.js": 141,
	"./ar-ma": 142,
	"./ar-ma.js": 142,
	"./ar-sa": 143,
	"./ar-sa.js": 143,
	"./ar-tn": 144,
	"./ar-tn.js": 144,
	"./ar.js": 138,
	"./az": 145,
	"./az.js": 145,
	"./be": 146,
	"./be.js": 146,
	"./bg": 147,
	"./bg.js": 147,
	"./bm": 148,
	"./bm.js": 148,
	"./bn": 149,
	"./bn.js": 149,
	"./bo": 150,
	"./bo.js": 150,
	"./br": 151,
	"./br.js": 151,
	"./bs": 152,
	"./bs.js": 152,
	"./ca": 153,
	"./ca.js": 153,
	"./cs": 154,
	"./cs.js": 154,
	"./cv": 155,
	"./cv.js": 155,
	"./cy": 156,
	"./cy.js": 156,
	"./da": 157,
	"./da.js": 157,
	"./de": 158,
	"./de-at": 159,
	"./de-at.js": 159,
	"./de-ch": 160,
	"./de-ch.js": 160,
	"./de.js": 158,
	"./dv": 161,
	"./dv.js": 161,
	"./el": 162,
	"./el.js": 162,
	"./en-au": 163,
	"./en-au.js": 163,
	"./en-ca": 164,
	"./en-ca.js": 164,
	"./en-gb": 165,
	"./en-gb.js": 165,
	"./en-ie": 166,
	"./en-ie.js": 166,
	"./en-il": 167,
	"./en-il.js": 167,
	"./en-nz": 168,
	"./en-nz.js": 168,
	"./eo": 169,
	"./eo.js": 169,
	"./es": 170,
	"./es-do": 171,
	"./es-do.js": 171,
	"./es-us": 172,
	"./es-us.js": 172,
	"./es.js": 170,
	"./et": 173,
	"./et.js": 173,
	"./eu": 174,
	"./eu.js": 174,
	"./fa": 175,
	"./fa.js": 175,
	"./fi": 176,
	"./fi.js": 176,
	"./fo": 177,
	"./fo.js": 177,
	"./fr": 178,
	"./fr-ca": 179,
	"./fr-ca.js": 179,
	"./fr-ch": 180,
	"./fr-ch.js": 180,
	"./fr.js": 178,
	"./fy": 181,
	"./fy.js": 181,
	"./gd": 182,
	"./gd.js": 182,
	"./gl": 183,
	"./gl.js": 183,
	"./gom-latn": 184,
	"./gom-latn.js": 184,
	"./gu": 185,
	"./gu.js": 185,
	"./he": 186,
	"./he.js": 186,
	"./hi": 187,
	"./hi.js": 187,
	"./hr": 188,
	"./hr.js": 188,
	"./hu": 189,
	"./hu.js": 189,
	"./hy-am": 190,
	"./hy-am.js": 190,
	"./id": 191,
	"./id.js": 191,
	"./is": 192,
	"./is.js": 192,
	"./it": 193,
	"./it.js": 193,
	"./ja": 194,
	"./ja.js": 194,
	"./jv": 195,
	"./jv.js": 195,
	"./ka": 196,
	"./ka.js": 196,
	"./kk": 197,
	"./kk.js": 197,
	"./km": 198,
	"./km.js": 198,
	"./kn": 199,
	"./kn.js": 199,
	"./ko": 200,
	"./ko.js": 200,
	"./ku": 201,
	"./ku.js": 201,
	"./ky": 202,
	"./ky.js": 202,
	"./lb": 203,
	"./lb.js": 203,
	"./lo": 204,
	"./lo.js": 204,
	"./lt": 205,
	"./lt.js": 205,
	"./lv": 206,
	"./lv.js": 206,
	"./me": 207,
	"./me.js": 207,
	"./mi": 208,
	"./mi.js": 208,
	"./mk": 209,
	"./mk.js": 209,
	"./ml": 210,
	"./ml.js": 210,
	"./mn": 211,
	"./mn.js": 211,
	"./mr": 212,
	"./mr.js": 212,
	"./ms": 213,
	"./ms-my": 214,
	"./ms-my.js": 214,
	"./ms.js": 213,
	"./mt": 215,
	"./mt.js": 215,
	"./my": 216,
	"./my.js": 216,
	"./nb": 217,
	"./nb.js": 217,
	"./ne": 218,
	"./ne.js": 218,
	"./nl": 219,
	"./nl-be": 220,
	"./nl-be.js": 220,
	"./nl.js": 219,
	"./nn": 221,
	"./nn.js": 221,
	"./pa-in": 222,
	"./pa-in.js": 222,
	"./pl": 223,
	"./pl.js": 223,
	"./pt": 224,
	"./pt-br": 225,
	"./pt-br.js": 225,
	"./pt.js": 224,
	"./ro": 226,
	"./ro.js": 226,
	"./ru": 227,
	"./ru.js": 227,
	"./sd": 228,
	"./sd.js": 228,
	"./se": 229,
	"./se.js": 229,
	"./si": 230,
	"./si.js": 230,
	"./sk": 231,
	"./sk.js": 231,
	"./sl": 232,
	"./sl.js": 232,
	"./sq": 233,
	"./sq.js": 233,
	"./sr": 234,
	"./sr-cyrl": 235,
	"./sr-cyrl.js": 235,
	"./sr.js": 234,
	"./ss": 236,
	"./ss.js": 236,
	"./sv": 237,
	"./sv.js": 237,
	"./sw": 238,
	"./sw.js": 238,
	"./ta": 239,
	"./ta.js": 239,
	"./te": 240,
	"./te.js": 240,
	"./tet": 241,
	"./tet.js": 241,
	"./tg": 242,
	"./tg.js": 242,
	"./th": 243,
	"./th.js": 243,
	"./tl-ph": 244,
	"./tl-ph.js": 244,
	"./tlh": 245,
	"./tlh.js": 245,
	"./tr": 246,
	"./tr.js": 246,
	"./tzl": 247,
	"./tzl.js": 247,
	"./tzm": 248,
	"./tzm-latn": 249,
	"./tzm-latn.js": 249,
	"./tzm.js": 248,
	"./ug-cn": 250,
	"./ug-cn.js": 250,
	"./uk": 251,
	"./uk.js": 251,
	"./ur": 252,
	"./ur.js": 252,
	"./uz": 253,
	"./uz-latn": 254,
	"./uz-latn.js": 254,
	"./uz.js": 253,
	"./vi": 255,
	"./vi.js": 255,
	"./x-pseudo": 256,
	"./x-pseudo.js": 256,
	"./yo": 257,
	"./yo.js": 257,
	"./zh-cn": 258,
	"./zh-cn.js": 258,
	"./zh-hk": 259,
	"./zh-hk.js": 259,
	"./zh-tw": 260,
	"./zh-tw.js": 260
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
webpackContext.id = 474;

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__(464);

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/css/all.css
var css_all = __webpack_require__(465);

// EXTERNAL MODULE: ./node_modules/toastr/build/toastr.css
var toastr = __webpack_require__(466);

// EXTERNAL MODULE: ./src/scss/app.scss
var app = __webpack_require__(467);

// CONCATENATED MODULE: ./src/styles.js
/*
  Application styles
*/
// Default styles


 // Custom styles


// EXTERNAL MODULE: ./node_modules/bootstrap/dist/js/bootstrap.js
var js_bootstrap = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/js/fontawesome.js
var fontawesome = __webpack_require__(469);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__(31);

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

// CONCATENATED MODULE: ./src/store/store.js
 // Shared stores

var Store = {
  uxui: {
    loading: false,
    navbar: true,
    footer: true
  }
};
/* harmony default export */ var store = (Store);
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
      STORE: store
    };
  }
});
// CONCATENATED MODULE: ./src/components/commons/loading/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var commons_loadingvue_type_script_lang_js_ = (loadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(19);

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
  return _vm._m(0)
}
var navbarvue_type_template_id_8be2602c_staticRenderFns = [
  function() {
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
          _c("a", { staticClass: "navbar-brand", attrs: { href: "#" } }, [
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
          ]),
          _vm._v(" "),
          _c(
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
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse navbar-collapse",
              attrs: { id: "navbarSupportedContent" }
            },
            [
              _c("ul", { staticClass: "navbar-nav mr-auto" }),
              _vm._v(" "),
              _c("ul", { staticClass: "navbar-nav mr-right" }, [
                _c("li", { staticClass: "nav-item" }, [
                  _c(
                    "a",
                    {
                      staticClass: "nav-link",
                      attrs: {
                        href:
                          "https://github.com/davidemiceli/chainode/blob/develop/README.md",
                        target: "_blank"
                      }
                    },
                    [_vm._v("Documentation")]
                  )
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "nav-item" }, [
                  _c(
                    "a",
                    {
                      staticClass: "nav-link",
                      attrs: {
                        href: "https://github.com/davidemiceli/chainode",
                        target: "_blank"
                      }
                    },
                    [
                      _c("i", { staticClass: "fab fa-github" }),
                      _vm._v(" Github")
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
]
navbarvue_type_template_id_8be2602c_render._withStripped = true


// CONCATENATED MODULE: ./src/components/commons/navbar/index.vue?vue&type=template&id=8be2602c&

// CONCATENATED MODULE: ./src/configs.js
 // App configuration settings

var Configs = {
  alerts: {
    successAdded: 'Data added with success!',
    deleted: 'Deleted data with success!',
    error: 'Sorry, there was an error: contact the administrator...'
  }
};
/* harmony default export */ var configs = (Configs);
// CONCATENATED MODULE: ./src/router/routes.js
 // Routes

var Routes = {
  // Dashboard
  HOME: {
    path: '/',
    name: 'home'
  },
  // Not Found: 404 error
  NOTFOUND: {
    path: '/404',
    name: 'notfound'
  }
};
// CONCATENATED MODULE: ./src/store/actions.js
 // Store

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Actions

var actions_Actions =
/*#__PURE__*/
function () {
  function Actions() {
    _classCallCheck(this, Actions);
  } // Loading actions


  _createClass(Actions, [{
    key: "LOADING_START",
    value: function LOADING_START() {
      store.uxui.loading = true;
    }
  }, {
    key: "LOADING_STOP",
    value: function LOADING_STOP() {
      store.uxui.loading = false;
    } // Navbar actions

  }, {
    key: "NAVBAR_SHOW",
    value: function NAVBAR_SHOW() {
      store.uxui.navbar = true;
    }
  }, {
    key: "NAVBAR_HIDE",
    value: function NAVBAR_HIDE() {
      store.uxui.navbar = false;
    } // Footer actions

  }, {
    key: "FOOTER_SHOW",
    value: function FOOTER_SHOW() {
      store.uxui.footer = true;
    }
  }, {
    key: "FOOTER_HIDE",
    value: function FOOTER_HIDE() {
      store.uxui.footer = false;
    } // Block actions

  }, {
    key: "BLOCKS_SET",
    value: function BLOCKS_SET(items) {
      store.blocks = items;
    }
  }]);

  return Actions;
}();

;
/* harmony default export */ var actions = (new actions_Actions());
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/navbar/index.vue?vue&type=script&lang=js&
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



/* harmony default export */ var navbarvue_type_script_lang_js_ = ({
  name: 'Navbar',
  data: function data() {
    return {
      STORE: store,
      Routes: Routes
    };
  }
});
// CONCATENATED MODULE: ./src/components/commons/navbar/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var commons_navbarvue_type_script_lang_js_ = (navbarvue_type_script_lang_js_); 
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
  return _vm.STORE.uxui.footer
    ? _c("footer", { staticClass: "footer bg-light" }, [_vm._m(0)])
    : _vm._e()
}
var footervue_type_template_id_4e6c37b5_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container text-center" }, [
      _c("span", { staticClass: "text-muted" }, [
        _c("img", {
          staticStyle: {
            "margin-top": "-5px",
            height: "20px",
            display: "inline-block"
          },
          attrs: { src: "/img/logo.png" }
        }),
        _vm._v(" © 2017-2019 - \n      Documentation licensed under "),
        _c(
          "a",
          {
            attrs: {
              href: "http://creativecommons.org/licenses/by/4.0/",
              target: "_blank"
            }
          },
          [_vm._v("CC BY 4.0")]
        ),
        _vm._v(".\n    ")
      ])
    ])
  }
]
footervue_type_template_id_4e6c37b5_render._withStripped = true


// CONCATENATED MODULE: ./src/components/commons/footer/index.vue?vue&type=template&id=4e6c37b5&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/footer/index.vue?vue&type=script&lang=js&
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



/* harmony default export */ var footervue_type_script_lang_js_ = ({
  name: 'Footer',
  data: function data() {
    return {
      STORE: store,
      Routes: Routes
    };
  }
});
// CONCATENATED MODULE: ./src/components/commons/footer/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var commons_footervue_type_script_lang_js_ = (footervue_type_script_lang_js_); 
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
var vue_router_esm = __webpack_require__(98);

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
      _c("p", { staticClass: "sentences m-t-40" }, [
        _vm._v(
          "\n    Chainode is a private blockchain designed to be fast, lightweight, and highly scalable. The network allows to exchange data (i.e. transactions) between trusted participants.\n    These transactions are stored as blocks in a distributed ledger.\n  "
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-t-50 row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Highly scalable")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Each peer can be deployed, executed, and scaled up and down asynchronously and independently from the others peers.\n        Peers can be runned as containers on different clusters handled by different container orchestrators (like Kubernetes, Mesos, etc).\n      "
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Load balancing")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Designed to support high data volumes, the blocks and the ledger are load balanced: \n        the blocks are distributed between different peers that acts as a single one, sharing the same Kafka group id.\n      "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-t-50 row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Resilient")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Each peer is resistant to failures. If a peer service (or the node where it is running) falls,\n        it can be immediately restarted on another node without (thanks to Kafka retention features) losing data and starting from where he had stopped.\n      "
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Fast")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Every block is propagated to the network and added to the ledger as soon as it was generated (if it was considered valid by the peers),\n        so without any delay or emission at every defined time interval.\n      "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-t-50 row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Lightweight")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        A chainode instance (a simple peer) is very lightweight: can be runned on cheap machines (like a Raspberry Pi, so as many docker containers on a single machine).\n      "
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Message driven")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        The network communication is Kafka based. The peers communicate with each other by exchanging messages asynchronously. Communication can be public or private.\n      "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-t-50 row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("REST APIs")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Every peer exposes web APIs to be handled more easily by other applications.\n      "
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Web Console")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Every peer exposes a Web Console UI for status monitoring, use, and general testing too.\n      "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-t-50 row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("p", { staticClass: "small-title" }, [_vm._v("Open Source")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\n        Chainode is an Open Source project, written in pure Javascript for Node.js, and it is based on Kafka as communication system and block order.\n        The documentation is Creative Commons Licensed.\n      "
            )
          ])
        ])
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
  name: Routes.HOME.name,
  data: function data() {
    return {};
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
var routes = [{
  path: Routes.HOME.path,
  name: Routes.HOME.name,
  component: Home
}, {
  path: Routes.NOTFOUND.path,
  component: _404
}, {
  path: '*',
  redirect: Routes.NOTFOUND.path
}];
/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  mode: 'hash',
  // https://router.vuejs.org/api/#mode
  routes: routes
}));
// EXTERNAL MODULE: ./src/lib/filters.js
var filters = __webpack_require__(473);

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

/***/ })

/******/ });