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
/******/ 	deferredModules.push([284,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 // Shared stores

var Store = {
  uxui: {
    loading: false,
    navbar: true,
    footer: true
  },
  system: {},
  blocks: []
};
/* harmony default export */ __webpack_exports__["a"] = (Store);

/***/ }),

/***/ 15:
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

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusServices; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
 // Requirements

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Configurations

 // Services

var Status =
/*#__PURE__*/
function () {
  function Status() {
    _classCallCheck(this, Status);

    this.API_URL = "".concat(_src_configs__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].baseurl, "/api");
  } // Propose block data


  _createClass(Status, [{
    key: "stats",
    value: function () {
      var _stats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var r;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(this.API_URL, "/stats"));

              case 3:
                r = _context.sent;
                return _context.abrupt("return", r.data);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function stats() {
        return _stats.apply(this, arguments);
      }

      return stats;
    }()
  }]);

  return Status;
}();

;
var StatusServices = new Status();

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/blocks/pagination/Pagination.vue?vue&type=template&id=e04d02d4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.STORE.blocks.length
    ? _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6 text-left" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-light",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.goTo($event, -1)
                }
              }
            },
            [_vm._v("Previous")]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 text-right" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-light",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.goTo($event, 1)
                }
              }
            },
            [_vm._v("Next")]
          )
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/blocks/pagination/Pagination.vue?vue&type=template&id=e04d02d4&

// EXTERNAL MODULE: ./src/configs.js
var configs = __webpack_require__(15);

// EXTERNAL MODULE: ./src/router/routes.js
var routes = __webpack_require__(8);

// EXTERNAL MODULE: ./src/services/blocks.js
var blocks = __webpack_require__(60);

// EXTERNAL MODULE: ./src/store/store.js
var store = __webpack_require__(11);

// EXTERNAL MODULE: ./src/store/actions.js
var actions = __webpack_require__(36);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/blocks/pagination/Pagination.vue?vue&type=script&lang=js&
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var Paginationvue_type_script_lang_js_ = ({
  name: 'ListBlocksPagination',
  data: function data() {
    return {
      STORE: store["a" /* default */],
      pag: 0
    };
  },
  methods: {
    goTo: function () {
      var _goTo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(e, pag) {
        var blocksBkc;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e && e.preventDefault();
                this.pag += pag;
                this.pag = this.pag < 0 ? 0 : this.pag;
                blocksBkc = _.clone(this.STORE.blocks, true);
                _context.next = 6;
                return this.$parent.List({
                  pag: this.pag
                });

              case 6:
                if (this.STORE.blocks.length === 0 && pag > 0) {
                  this.pag -= pag;
                  actions["a" /* default */].BLOCKS_SET([]);
                  actions["a" /* default */].BLOCKS_SET(blocksBkc);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function goTo(_x, _x2) {
        return _goTo.apply(this, arguments);
      }

      return goTo;
    }()
  }
});
// CONCATENATED MODULE: ./src/components/blocks/pagination/Pagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var pagination_Paginationvue_type_script_lang_js_ = (Paginationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// CONCATENATED MODULE: ./src/components/blocks/pagination/Pagination.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagination_Paginationvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/blocks/pagination/Pagination.vue"
/* harmony default export */ var Pagination = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(285);
module.exports = __webpack_require__(516);


/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
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
    } // Footer actions

  }, {
    key: "FOOTER_SHOW",
    value: function FOOTER_SHOW() {
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.footer = true;
    }
  }, {
    key: "FOOTER_HIDE",
    value: function FOOTER_HIDE() {
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].uxui.footer = false;
    } // System actions

  }, {
    key: "SYSTEM_SET",
    value: function SYSTEM_SET(items) {
      _src_store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].system = items;
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

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var vue_currency_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(282);
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
}); // Format a time duration

vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].filter('timeDuration', function (duration) {
  return new moment.duration(duration).humanize();
}); // Format bytes in a readable way

vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].filter('formatBytes', function (bytes) {
  if (bytes < 1024) return bytes + " Bytes";else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
  return (bytes / 1073741824).toFixed(3) + " GB";
}); // Shortify a string if is longer than a defined length

vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].filter('readMore', function (text, length, suffix) {
  suffix = text.length <= length ? '' : suffix || '…';
  return text.substring(0, length) + suffix;
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 157,
	"./af.js": 157,
	"./ar": 158,
	"./ar-dz": 159,
	"./ar-dz.js": 159,
	"./ar-kw": 160,
	"./ar-kw.js": 160,
	"./ar-ly": 161,
	"./ar-ly.js": 161,
	"./ar-ma": 162,
	"./ar-ma.js": 162,
	"./ar-sa": 163,
	"./ar-sa.js": 163,
	"./ar-tn": 164,
	"./ar-tn.js": 164,
	"./ar.js": 158,
	"./az": 165,
	"./az.js": 165,
	"./be": 166,
	"./be.js": 166,
	"./bg": 167,
	"./bg.js": 167,
	"./bm": 168,
	"./bm.js": 168,
	"./bn": 169,
	"./bn.js": 169,
	"./bo": 170,
	"./bo.js": 170,
	"./br": 171,
	"./br.js": 171,
	"./bs": 172,
	"./bs.js": 172,
	"./ca": 173,
	"./ca.js": 173,
	"./cs": 174,
	"./cs.js": 174,
	"./cv": 175,
	"./cv.js": 175,
	"./cy": 176,
	"./cy.js": 176,
	"./da": 177,
	"./da.js": 177,
	"./de": 178,
	"./de-at": 179,
	"./de-at.js": 179,
	"./de-ch": 180,
	"./de-ch.js": 180,
	"./de.js": 178,
	"./dv": 181,
	"./dv.js": 181,
	"./el": 182,
	"./el.js": 182,
	"./en-au": 183,
	"./en-au.js": 183,
	"./en-ca": 184,
	"./en-ca.js": 184,
	"./en-gb": 185,
	"./en-gb.js": 185,
	"./en-ie": 186,
	"./en-ie.js": 186,
	"./en-il": 187,
	"./en-il.js": 187,
	"./en-nz": 188,
	"./en-nz.js": 188,
	"./eo": 189,
	"./eo.js": 189,
	"./es": 190,
	"./es-do": 191,
	"./es-do.js": 191,
	"./es-us": 192,
	"./es-us.js": 192,
	"./es.js": 190,
	"./et": 193,
	"./et.js": 193,
	"./eu": 194,
	"./eu.js": 194,
	"./fa": 195,
	"./fa.js": 195,
	"./fi": 196,
	"./fi.js": 196,
	"./fo": 197,
	"./fo.js": 197,
	"./fr": 198,
	"./fr-ca": 199,
	"./fr-ca.js": 199,
	"./fr-ch": 200,
	"./fr-ch.js": 200,
	"./fr.js": 198,
	"./fy": 201,
	"./fy.js": 201,
	"./gd": 202,
	"./gd.js": 202,
	"./gl": 203,
	"./gl.js": 203,
	"./gom-latn": 204,
	"./gom-latn.js": 204,
	"./gu": 205,
	"./gu.js": 205,
	"./he": 206,
	"./he.js": 206,
	"./hi": 207,
	"./hi.js": 207,
	"./hr": 208,
	"./hr.js": 208,
	"./hu": 209,
	"./hu.js": 209,
	"./hy-am": 210,
	"./hy-am.js": 210,
	"./id": 211,
	"./id.js": 211,
	"./is": 212,
	"./is.js": 212,
	"./it": 213,
	"./it.js": 213,
	"./ja": 214,
	"./ja.js": 214,
	"./jv": 215,
	"./jv.js": 215,
	"./ka": 216,
	"./ka.js": 216,
	"./kk": 217,
	"./kk.js": 217,
	"./km": 218,
	"./km.js": 218,
	"./kn": 219,
	"./kn.js": 219,
	"./ko": 220,
	"./ko.js": 220,
	"./ku": 221,
	"./ku.js": 221,
	"./ky": 222,
	"./ky.js": 222,
	"./lb": 223,
	"./lb.js": 223,
	"./lo": 224,
	"./lo.js": 224,
	"./lt": 225,
	"./lt.js": 225,
	"./lv": 226,
	"./lv.js": 226,
	"./me": 227,
	"./me.js": 227,
	"./mi": 228,
	"./mi.js": 228,
	"./mk": 229,
	"./mk.js": 229,
	"./ml": 230,
	"./ml.js": 230,
	"./mn": 231,
	"./mn.js": 231,
	"./mr": 232,
	"./mr.js": 232,
	"./ms": 233,
	"./ms-my": 234,
	"./ms-my.js": 234,
	"./ms.js": 233,
	"./mt": 235,
	"./mt.js": 235,
	"./my": 236,
	"./my.js": 236,
	"./nb": 237,
	"./nb.js": 237,
	"./ne": 238,
	"./ne.js": 238,
	"./nl": 239,
	"./nl-be": 240,
	"./nl-be.js": 240,
	"./nl.js": 239,
	"./nn": 241,
	"./nn.js": 241,
	"./pa-in": 242,
	"./pa-in.js": 242,
	"./pl": 243,
	"./pl.js": 243,
	"./pt": 244,
	"./pt-br": 245,
	"./pt-br.js": 245,
	"./pt.js": 244,
	"./ro": 246,
	"./ro.js": 246,
	"./ru": 247,
	"./ru.js": 247,
	"./sd": 248,
	"./sd.js": 248,
	"./se": 249,
	"./se.js": 249,
	"./si": 250,
	"./si.js": 250,
	"./sk": 251,
	"./sk.js": 251,
	"./sl": 252,
	"./sl.js": 252,
	"./sq": 253,
	"./sq.js": 253,
	"./sr": 254,
	"./sr-cyrl": 255,
	"./sr-cyrl.js": 255,
	"./sr.js": 254,
	"./ss": 256,
	"./ss.js": 256,
	"./sv": 257,
	"./sv.js": 257,
	"./sw": 258,
	"./sw.js": 258,
	"./ta": 259,
	"./ta.js": 259,
	"./te": 260,
	"./te.js": 260,
	"./tet": 261,
	"./tet.js": 261,
	"./tg": 262,
	"./tg.js": 262,
	"./th": 263,
	"./th.js": 263,
	"./tl-ph": 264,
	"./tl-ph.js": 264,
	"./tlh": 265,
	"./tlh.js": 265,
	"./tr": 266,
	"./tr.js": 266,
	"./tzl": 267,
	"./tzl.js": 267,
	"./tzm": 268,
	"./tzm-latn": 269,
	"./tzm-latn.js": 269,
	"./tzm.js": 268,
	"./ug-cn": 270,
	"./ug-cn.js": 270,
	"./uk": 271,
	"./uk.js": 271,
	"./ur": 272,
	"./ur.js": 272,
	"./uz": 273,
	"./uz-latn": 274,
	"./uz-latn.js": 274,
	"./uz.js": 273,
	"./vi": 275,
	"./vi.js": 275,
	"./x-pseudo": 276,
	"./x-pseudo.js": 276,
	"./yo": 277,
	"./yo.js": 277,
	"./zh-cn": 278,
	"./zh-cn.js": 278,
	"./zh-hk": 279,
	"./zh-hk.js": 279,
	"./zh-tw": 280,
	"./zh-tw.js": 280
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
webpackContext.id = 515;

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__(486);

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/css/all.css
var css_all = __webpack_require__(487);

// EXTERNAL MODULE: ./node_modules/toastr/build/toastr.css
var toastr = __webpack_require__(488);

// EXTERNAL MODULE: ./src/scss/app.scss
var app = __webpack_require__(489);

// CONCATENATED MODULE: ./src/styles.js
/*
  Application styles
*/
// Default styles


 // Custom styles


// EXTERNAL MODULE: ./node_modules/bootstrap/dist/js/bootstrap.js
var js_bootstrap = __webpack_require__(490);

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(491);

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-free/js/fontawesome.js
var fontawesome = __webpack_require__(492);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__(29);

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
var store = __webpack_require__(11);

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
var componentNormalizer = __webpack_require__(13);

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
              _c("li", { staticClass: "nav-item" }, [
                _c(
                  "a",
                  {
                    staticClass: "nav-link",
                    attrs: { href: _vm.Routes.HOME.path }
                  },
                  [_vm._v("Status")]
                )
              ]),
              _vm._v(" "),
              _vm._m(2),
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
    return _c("li", { staticClass: "nav-item" }, [
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
var navbarvue_type_script_lang_js_ = __webpack_require__(79);

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
  return _vm.STORE.uxui.footer
    ? _c("footer", { staticClass: "m-t-40" })
    : _vm._e()
}
var footervue_type_template_id_4e6c37b5_staticRenderFns = []
footervue_type_template_id_4e6c37b5_render._withStripped = true


// CONCATENATED MODULE: ./src/components/commons/footer/index.vue?vue&type=template&id=4e6c37b5&

// EXTERNAL MODULE: ./src/configs.js
var configs = __webpack_require__(15);

// EXTERNAL MODULE: ./src/router/routes.js
var routes = __webpack_require__(8);

// EXTERNAL MODULE: ./src/store/actions.js
var actions = __webpack_require__(36);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/commons/footer/index.vue?vue&type=script&lang=js&
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
      STORE: store["a" /* default */],
      Routes: routes["a" /* Routes */]
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
var vue_router_esm = __webpack_require__(112);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Home.vue?vue&type=template&id=8dc7cce2&
var Homevue_type_template_id_8dc7cce2_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "p-t-80 container" }, [
    _c("h1", { staticClass: "title text-center" }, [
      _vm._v("Peer system statistics")
    ]),
    _vm._v(" "),
    Object.keys(_vm.STORE.system).length
      ? _c("table", { staticClass: "table table-bordered" }, [
          _c("tbody", [
            _c("tr", [
              _vm._m(0),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(_vm.STORE.system.status))])
            ]),
            _vm._v(" "),
            _c("tr", [
              _vm._m(1),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(_vm.STORE.system.peer.blockchain))])
            ]),
            _vm._v(" "),
            _c("tr", [
              _vm._m(2),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(_vm.STORE.system.peer.id))])
            ]),
            _vm._v(" "),
            _c("tr", [
              _vm._m(3),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(_vm.STORE.system.peer.role))])
            ]),
            _vm._v(" "),
            _c("tr", [
              _vm._m(4),
              _vm._v(" "),
              _c("td", [_vm._v(_vm._s(_vm.STORE.system.peer.organization))])
            ]),
            _vm._v(" "),
            _c("tr", [
              _vm._m(5),
              _vm._v(" "),
              _c("td", [
                _vm._v(
                  _vm._s(_vm._f("timeDuration")(_vm.STORE.system.peer.role))
                )
              ])
            ]),
            _vm._v(" "),
            _c("tr", [
              _vm._m(6),
              _vm._v(" "),
              _c("td", [
                _vm._v(
                  _vm._s(
                    _vm._f("formatBytes")(
                      _vm.STORE.system.system.memoryUsage.heapTotal
                    )
                  )
                )
              ])
            ]),
            _vm._v(" "),
            _c("tr", [
              _vm._m(7),
              _vm._v(" "),
              _c("td", [
                _vm._v(
                  _vm._s(
                    _vm._f("formatBytes")(_vm.STORE.system.system.freemem)
                  ) +
                    " / " +
                    _vm._s(_vm._f("formatBytes")(_vm.STORE.system.system.mem))
                )
              ])
            ])
          ])
        ])
      : _vm._e()
  ])
}
var Homevue_type_template_id_8dc7cce2_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Status")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Blockchain")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Id")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Role")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Organization")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Uptime")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Used memory")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-right" }, [
      _c("strong", [_c("em", [_vm._v("Free memory")])])
    ])
  }
]
Homevue_type_template_id_8dc7cce2_render._withStripped = true


// CONCATENATED MODULE: ./src/components/Home.vue?vue&type=template&id=8dc7cce2&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Home.vue?vue&type=script&lang=js&
var Homevue_type_script_lang_js_ = __webpack_require__(80);

// CONCATENATED MODULE: ./src/components/Home.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Homevue_type_script_lang_js_ = (Homevue_type_script_lang_js_["a" /* default */]); 
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
  return _c(
    "div",
    { staticClass: "p-t-40 container" },
    [
      _c("h1", { staticClass: "title text-center" }, [_vm._v("Blocks")]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      !_vm.STORE.blocks.length
        ? _c("p", { staticClass: "text-center" }, [
            _vm._v("\n    There are no blocks...\n  ")
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("ListBlocksPagination", { staticClass: "m-b-15" }),
      _vm._v(" "),
      _vm.STORE.blocks.length
        ? _c(
            "table",
            { staticClass: "table table-striped table-sm table-small-text" },
            [
              _vm._m(1),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.STORE.blocks, function(block) {
                  return _c("tr", [
                    _c("td", [
                      _vm._v(_vm._s(_vm._f("readMore")(block.id, 10)))
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(_vm._s(_vm._f("readMore")(block.event_id, 10)))
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(_vm._s(_vm._f("readMore")(block.organization, 10)))
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(_vm._s(_vm._f("dateMedium")(block.generated_time)))
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(_vm._s(_vm._f("readMore")(block.data, 20)))
                    ])
                  ])
                }),
                0
              )
            ]
          )
        : _vm._e()
    ],
    1
  )
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
        _c("th", { attrs: { scope: "col" } }, [_vm._v("id")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("event_id")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("organization")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("generated_time")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("data")])
      ])
    ])
  }
]
Listvue_type_template_id_7218f372_render._withStripped = true


// CONCATENATED MODULE: ./src/components/blocks/List.vue?vue&type=template&id=7218f372&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/lib??vue-loader-options!./src/components/blocks/List.vue?vue&type=script&lang=js&
var Listvue_type_script_lang_js_ = __webpack_require__(81);

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
var Proposevue_type_script_lang_js_ = __webpack_require__(82);

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
var filters = __webpack_require__(514);

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

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockServices; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
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

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(78)))

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Routes; });
/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
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
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_services_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(281);
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: _src_router_routes__WEBPACK_IMPORTED_MODULE_1__[/* Routes */ "a"].HOME.name,
  data: function data() {
    return {
      STORE: _src_store_store__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
    };
  },
  methods: {
    getStats: function getStats() {
      return _src_services_status__WEBPACK_IMPORTED_MODULE_2__[/* StatusServices */ "a"].stats().then(function (r) {
        _src_store_actions__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].SYSTEM_SET(r);
      }).catch(function (err) {
        toastr.error(_src_configs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].alerts.error);
      });
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    return next(function (vm) {
      return vm.getStats();
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(78)))

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_services_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);
/* harmony import */ var _src_store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _src_store_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony import */ var _src_components_blocks_pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(283);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    ListBlocksPagination: _src_components_blocks_pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
  },
  data: function data() {
    return {
      STORE: _src_store_store__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
    };
  },
  methods: {
    List: function List(condition) {
      return _src_services_blocks__WEBPACK_IMPORTED_MODULE_2__[/* BlockServices */ "a"].list(condition).then(function (r) {
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(78)))

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(toastr) {/* harmony import */ var _src_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _src_router_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_services_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);
//
//
//
//
//
//
//
//
//
//
//
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(78)))

/***/ })

/******/ });