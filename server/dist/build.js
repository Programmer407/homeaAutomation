require("source-map-support").install()
module.exports =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "../public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 190);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0;

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function createStyleElement() {
	var styleElement = document.createElement("style");
	var head = getHeadElement();
	styleElement.type = "text/css";
	head.appendChild(styleElement);
	return styleElement;
}

function createLinkElement() {
	var linkElement = document.createElement("link");
	var head = getHeadElement();
	linkElement.rel = "stylesheet";
	head.appendChild(linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement());
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement();
		update = updateLink.bind(null, styleElement);
		remove = function() {
			styleElement.parentNode.removeChild(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement();
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			styleElement.parentNode.removeChild(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(32);

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _reduxFormMaterialUI = __webpack_require__(183);

Object.keys(_reduxFormMaterialUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reduxFormMaterialUI[key];
    }
  });
});

var _buildFeedReducer = __webpack_require__(180);

Object.defineProperty(exports, 'buildFeedReducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buildFeedReducer).default;
  }
});

var _buildEntityReducer = __webpack_require__(179);

Object.defineProperty(exports, 'buildEntityReducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buildEntityReducer).default;
  }
});

var _ensureEntity = __webpack_require__(181);

Object.defineProperty(exports, 'ensureEntity', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ensureEntity).default;
  }
});

var _bindForm = __webpack_require__(178);

Object.defineProperty(exports, 'bindForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bindForm).default;
  }
});

var _logoutWhenIdle = __webpack_require__(182);

Object.defineProperty(exports, 'logoutWhenIdle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_logoutWhenIdle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("redux-form");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-document-title");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLOSE_NICKNAME_DIALOG = exports.OPEN_NICKNAME_DIALOG = exports.CLOSE_FORM_DIALOG = exports.OPEN_FORM_DIALOG = exports.RESET_ERROR_MESSAGE = exports.META_LOGO_LINK_SET = undefined;

var _entities = __webpack_require__(91);

Object.keys(_entities).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _entities[key];
        }
    });
});
exports.setLogoLink = setLogoLink;
exports.resetErrorMessages = resetErrorMessages;
exports.openFormDialog = openFormDialog;
exports.closeFormDialog = closeFormDialog;
exports.openNicknameDialog = openNicknameDialog;
exports.closeNicknameDialog = closeNicknameDialog;

var _api = __webpack_require__(20);

var META_LOGO_LINK_SET = exports.META_LOGO_LINK_SET = 'META_LOGO_LINK_SET';

// src
function setLogoLink(link) {
    return {
        type: META_LOGO_LINK_SET,
        payload: link
    };
}

var RESET_ERROR_MESSAGE = exports.RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
function resetErrorMessages() {
    return {
        type: RESET_ERROR_MESSAGE
    };
}

var OPEN_FORM_DIALOG = exports.OPEN_FORM_DIALOG = 'OPEN_FORM_DIALOG';
function openFormDialog() {
    return {
        type: OPEN_FORM_DIALOG
    };
}

var CLOSE_FORM_DIALOG = exports.CLOSE_FORM_DIALOG = 'CLOSE_FORM_DIALOG';
function closeFormDialog() {
    return {
        type: CLOSE_FORM_DIALOG
    };
}

var OPEN_NICKNAME_DIALOG = exports.OPEN_NICKNAME_DIALOG = 'OPEN_NICKNAME_DIALOG';
function openNicknameDialog() {
    return {
        type: OPEN_NICKNAME_DIALOG
    };
}

var CLOSE_NICKNAME_DIALOG = exports.CLOSE_NICKNAME_DIALOG = 'CLOSE_NICKNAME_DIALOG';
function closeNicknameDialog() {
    return {
        type: CLOSE_NICKNAME_DIALOG
    };
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMySQLConnection = undefined;

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _continuationLocalStorage = __webpack_require__(258);

var _continuationLocalStorage2 = _interopRequireDefault(_continuationLocalStorage);

var _dbConfig = __webpack_require__(57);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sequelize2.default.cls = _continuationLocalStorage2.default.createNamespace('my-very-own-namespace');

// src
// libs


var sequelize = new _sequelize2.default(_dbConfig.dbName, _dbConfig.username, _dbConfig.password, {
  host: _dbConfig.host,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: _dbConfig.multiStatement
  },
  logging: _dbConfig.enableLogging,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.sync({
  force: false
}).then(function (err) {}, function (err) {
  console.log('Unable to connect to the database:', err);
});
exports.default = sequelize;


var cache = {};

var makeKey = function makeKey(host0, username0) {
  return host0 + '#!#' + username0;
};

var getMySQLConnection = exports.getMySQLConnection = function getMySQLConnection(database0, host0, username0, password0) {
  var key = makeKey(host0, username0);

  if (!cache[key]) {
    cache[key] = new _sequelize2.default(database0, username0, password0, {
      host: host0,
      dialect: 'mysql',
      dialectOptions: {
        multipleStatements: true
      },
      logging: _dbConfig.enableLogging,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });
  }

  return cache[key];
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("material-ui");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("rc-queue-anim");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CommonUI = __webpack_require__(147);

Object.keys(_CommonUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CommonUI[key];
    }
  });
});

var _Forms = __webpack_require__(38);

Object.keys(_Forms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Forms[key];
    }
  });
});

var _TableViews = __webpack_require__(31);

Object.keys(_TableViews).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TableViews[key];
    }
  });
});

var _TabView = __webpack_require__(165);

Object.defineProperty(exports, 'TabView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TabView).default;
  }
});

var _FilterToolbar = __webpack_require__(149);

Object.defineProperty(exports, 'FilterToolbar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FilterToolbar).default;
  }
});

var _AssociatedAddressesView = __webpack_require__(54);

Object.defineProperty(exports, 'AssociatedAddressesView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AssociatedAddressesView).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _Role = __webpack_require__(42);

var _Role2 = _interopRequireDefault(_Role);

var _UserAccountType = __webpack_require__(46);

var _UserAccountType2 = _interopRequireDefault(_UserAccountType);

var _TimeZone = __webpack_require__(43);

var _TimeZone2 = _interopRequireDefault(_TimeZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _sequelize4.default.define("users", {
  firstName: { type: _sequelize2.default.STRING(128), field: "first_name" },
  lastName: { type: _sequelize2.default.STRING(128), field: "last_name" },
  email: { type: _sequelize2.default.STRING(128), field: "email" },
  password: { type: _sequelize2.default.STRING(128), field: "password" },
  resetPasswordToken: { type: _sequelize2.default.STRING(128), defaultValue: null, field: "reset_pass_token" },
  resetPasswordExpires: { type: _sequelize2.default.STRING(128), defaultValue: null, field: "reset_pass_expires" },
  registerToken: { type: _sequelize2.default.STRING(128), defaultValue: null, field: "register_token" },
  registerExpires: { type: _sequelize2.default.STRING(128), defaultValue: null, field: "register_expires" },
  status: { type: _sequelize2.default.INTEGER, defaultValue: 1, field: "status" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
}); // libs

User.belongsTo(_Role2.default);
User.belongsTo(_UserAccountType2.default);
User.belongsTo(_TimeZone2.default);

exports.default = User;
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var AssociatedAddress = _sequelize4.default.define("associatedaddresses", {
  address: { type: _sequelize2.default.STRING(128), field: "address" },
  nickName: { type: _sequelize2.default.STRING(128), field: "nick_name" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});

exports.default = AssociatedAddress;
module.exports = exports["default"];

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALL_API = exports.Schemas = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _normalizr = __webpack_require__(279);

__webpack_require__(266);

var delay = 5000;

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, options) {
  var promise = new Promise(function (resolve) {
    if (delay > 0) {
      setTimeout(function () {
        return resolve();
      }, delay);
    } else {
      resolve();
    }
  });

  return promise.then(function () {
    return fetch(endpoint, options);
  })
  /*
  // this part copied from here: https://blog.hospodarets.com/fetch_in_action
  .then(response => {
  const {status, statusText} = response
   // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
  if (status === 200 || status === 0) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(statusText)
  }
  })
  */
  .then(function (response) {
    return response.json().then(function (json) {
      return { json: json, response: response };
    });
  }).then(function (_ref) {
    var json = _ref.json,
        ok = _ref.response.ok;

    if (!ok) {
      return Promise.reject(json);
    }

    // const camelizedJson = camelizeKeys(json)
    // const nextPageUrl = getNextPageUrl(response)

    /*
    return Object.assign({},
    normalize(json, schema)
    )
    */

    return json;
  });
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

var eventSchema = new _normalizr.Schema("events");
var eventInteractionSchema = new _normalizr.Schema("eventInteractions");
var userSchema = new _normalizr.Schema("users");

eventSchema.define({
  eventInteractions: (0, _normalizr.arrayOf)(eventInteractionSchema)
});

// Schemas for Github API responses.
var Schemas = exports.Schemas = {
  EVENT: eventSchema,
  EVENT_ARRAY: (0, _normalizr.arrayOf)(eventSchema),
  EVENT_INTERACTION: eventInteractionSchema,
  EVENT_INTERACTION_ARRAY: (0, _normalizr.arrayOf)(eventInteractionSchema),
  USER: userSchema,
  USER_ARRAY: (0, _normalizr.arrayOf)(userSchema)

  // Action key that carries API call info interpreted by this Redux middleware.
};var CALL_API = exports.CALL_API = Symbol("Call API");

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.

exports.default = function (store) {
  return function (next) {
    return function (action) {
      var callAPI = action[CALL_API];

      if (typeof callAPI === "undefined") {
        return next(action);
      }

      var endpoint = callAPI.endpoint;
      var schema = callAPI.schema,
          types = callAPI.types,
          method = callAPI.method;
      var fetchOptions = callAPI.fetchOptions;


      if (typeof endpoint === "function") {
        endpoint = endpoint(store.getState());
      }

      if (typeof endpoint !== "string") {
        throw new Error("Specify a string endpoint URL.");
      }

      /*
      if (!schema) {
        throw new Error('Specify one of the exported Schemas.')
      }
      */

      if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("Expected an array of three action types.");
      }

      if (!types.every(function (type) {
        return typeof type === "string";
      })) {
        throw new Error("Expected action types to be strings.");
      }

      function actionWith(data) {
        var finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];

        return finalAction;
      }

      var _types = _slicedToArray(types, 3),
          requestType = _types[0],
          successType = _types[1],
          failureType = _types[2];

      next(actionWith({
        type: requestType
      }));

      if (!fetchOptions) {
        fetchOptions = {
          method: method || "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "same-origin",
          body: JSON.stringify(action.payload)
        };
      }

      return callApi(endpoint, schema, fetchOptions).then(function (response) {
        return next(actionWith({
          payload: response,
          type: successType
        }));
      }, function (error) {
        return next(actionWith({
          type: failureType,
          payload: error || "Something bad happened",
          error: true
        }));
      });
    };
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/colors");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appUtils = __webpack_require__(69);

Object.keys(_appUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _appUtils[key];
    }
  });
});

var _authUtils = __webpack_require__(199);

Object.keys(_authUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authUtils[key];
    }
  });
});

var _errorUtils = __webpack_require__(34);

Object.keys(_errorUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errorUtils[key];
    }
  });
});

var _influx = __webpack_require__(205);

Object.keys(_influx).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _influx[key];
    }
  });
});

var _sequelize = __webpack_require__(11);

Object.keys(_sequelize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sequelize[key];
    }
  });
});

var _buildEntityManagerFunctions = __webpack_require__(201);

Object.defineProperty(exports, 'buildEntityManagerFunctions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buildEntityManagerFunctions).default;
  }
});

var _bindEntityApiRoutes = __webpack_require__(200);

Object.defineProperty(exports, 'bindEntityApiRoutes', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bindEntityApiRoutes).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var build404ErrorHandler = exports.build404ErrorHandler = function build404ErrorHandler(options) {

  // this func is partially inspired by:
  // http://stackoverflow.com/a/9802006/162461
  return function (req, res) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ errorMessage: 'Page not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  };
};

var handle500Error = exports.handle500Error = function handle500Error(err, req, res) {
  var m = 'An internal server error occurred: ' + err;
  console.error("\x1b[31m", 'An internal server error occurred: ', err.stack, "\x1b[0m");

  res.status(500);

  // respond with html page
  if (req.accepts('html')) {
    res.render('500', { errorMessage: m });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ errorMessage: m });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send(m);
};

var build500ErrorHandler = exports.build500ErrorHandler = function build500ErrorHandler(options) {
  return function (err, req, res, next) {
    return handle500Error(err, req, res);
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_RESEND_ACTIVATION_FAILURE = exports.USER_RESEND_ACTIVATION_SUCCESS = exports.USER_RESEND_ACTIVATION = exports.CHECK_TOKEN_RESET_FAILURE = exports.CHECK_TOKEN_RESET_SUCCESS = exports.CHECK_TOKEN_RESET = exports.USER_SEARCH_BY_NAME_FAILURE = exports.USER_SEARCH_BY_NAME_SUCCESS = exports.USER_SEARCH_BY_NAME = exports.USER_SEARCH_BY_EMAIL_FAILURE = exports.USER_SEARCH_BY_EMAIL_SUCCESS = exports.USER_SEARCH_BY_EMAIL = exports.USER_CHANGE_PASSWORD_FAILURE = exports.USER_CHANGE_PASSWORD_SUCCESS = exports.USER_CHANGE_PASSWORD = exports.USER_RESET_PASSWORD_FAILURE = exports.USER_RESET_PASSWORD_SUCCESS = exports.USER_RESET_PASSWORD = exports.USER_CONFIRM_REGISTRATION_FAILURE = exports.USER_CONFIRM_REGISTRATION_SUCCESS = exports.USER_CONFIRM_REGISTRATION = exports.USER_FORGOT_PASSWORD_FAILURE = exports.USER_FORGOT_PASSWORD_SUCCESS = exports.USER_FORGOT_PASSWORD = exports.USER_REGISTER_FAILURE = exports.USER_REGISTER_SUCCESS = exports.USER_REGISTER = exports.USER_LOGOUT_FAILURE = exports.USER_LOGOUT_SUCCESS = exports.USER_LOGOUT = exports.USER_LOGIN_FAILURE = exports.USER_LOGIN_SUCCESS = exports.USER_LOGIN = undefined;
exports.login = login;
exports.logout = logout;
exports.register = register;
exports.forgotPassword = forgotPassword;
exports.confirmRegistration = confirmRegistration;
exports.resetPassword = resetPassword;
exports.changePassword = changePassword;
exports.searchUsersByEmail = searchUsersByEmail;
exports.searchUsersByName = searchUsersByName;
exports.isValidResetToken = isValidResetToken;
exports.resendActivation = resendActivation;

var _reactRouterRedux = __webpack_require__(17);

var _api = __webpack_require__(20);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // libs


// src


var USER_LOGIN = exports.USER_LOGIN = 'USER_LOGIN';
var USER_LOGIN_SUCCESS = exports.USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
var USER_LOGIN_FAILURE = exports.USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

function callApiLogin(email, password, rememberMe) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, _api.CALL_API, {
    types: [USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    endpoint: '/api/login',
    method: 'POST'
  }), _defineProperty(_ref, 'payload', { email: email, password: password, rememberMe: rememberMe }), _ref;
}

function login(email, password, rememberMe) {
  return function (dispatch, getState) {
    return dispatch(callApiLogin(email, password, rememberMe));
  };
}

var USER_LOGOUT = exports.USER_LOGOUT = 'USER_LOGOUT';
var USER_LOGOUT_SUCCESS = exports.USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
var USER_LOGOUT_FAILURE = exports.USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

function callApiLogout() {
  return _defineProperty({}, _api.CALL_API, {
    types: [USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE],
    endpoint: '/api/logout',
    method: 'GET'
  });
}

function logout() {
  return function (dispatch, getState) {
    return dispatch(callApiLogout()).then(function () {
      return dispatch((0, _reactRouterRedux.push)('/login'));
    });
  };
}

var USER_REGISTER = exports.USER_REGISTER = 'USER_REGISTER';
var USER_REGISTER_SUCCESS = exports.USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
var USER_REGISTER_FAILURE = exports.USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

function register(firstName, lastName, email, password) {
  var _ref3;

  return _ref3 = {}, _defineProperty(_ref3, _api.CALL_API, {
    types: [USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE],
    endpoint: '/api/users/create',
    method: 'POST'
  }), _defineProperty(_ref3, 'payload', { firstName: firstName, lastName: lastName, email: email, password: password }), _ref3;
}

var USER_FORGOT_PASSWORD = exports.USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD';
var USER_FORGOT_PASSWORD_SUCCESS = exports.USER_FORGOT_PASSWORD_SUCCESS = 'USER_FORGOT_PASSWORD_SUCCESS';
var USER_FORGOT_PASSWORD_FAILURE = exports.USER_FORGOT_PASSWORD_FAILURE = 'USER_FORGOT_PASSWORD_FAILURE';

function forgotPassword(email) {
  var _ref4;

  return _ref4 = {}, _defineProperty(_ref4, _api.CALL_API, {
    types: [USER_FORGOT_PASSWORD, USER_FORGOT_PASSWORD_SUCCESS, USER_FORGOT_PASSWORD_FAILURE],
    endpoint: '/api/users/forgot-password',
    method: 'POST'
  }), _defineProperty(_ref4, 'payload', { email: email }), _ref4;
}

var USER_CONFIRM_REGISTRATION = exports.USER_CONFIRM_REGISTRATION = 'USER_CONFIRM_REGISTRATION';
var USER_CONFIRM_REGISTRATION_SUCCESS = exports.USER_CONFIRM_REGISTRATION_SUCCESS = 'USER_CONFIRM_REGISTRATION_SUCCESS';
var USER_CONFIRM_REGISTRATION_FAILURE = exports.USER_CONFIRM_REGISTRATION_FAILURE = 'USER_CONFIRM_REGISTRATION_FAILURE';

function confirmRegistration(token) {
  var _ref5;

  return _ref5 = {}, _defineProperty(_ref5, _api.CALL_API, {
    types: [USER_CONFIRM_REGISTRATION, USER_CONFIRM_REGISTRATION_SUCCESS, USER_CONFIRM_REGISTRATION_FAILURE],
    endpoint: '/api/users/verify-account?token=' + token,
    method: 'POST'
  }), _defineProperty(_ref5, 'payload', { token: token }), _ref5;
}

var USER_RESET_PASSWORD = exports.USER_RESET_PASSWORD = 'USER_RESET_PASSWORD';
var USER_RESET_PASSWORD_SUCCESS = exports.USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';
var USER_RESET_PASSWORD_FAILURE = exports.USER_RESET_PASSWORD_FAILURE = 'USER_RESET_PASSWORD_FAILURE';

function resetPassword(token, password, confirmPassword) {
  var _ref6;

  return _ref6 = {}, _defineProperty(_ref6, _api.CALL_API, {
    types: [USER_RESET_PASSWORD, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAILURE],
    endpoint: '/api/users/reset-password?token=' + token,
    method: 'POST'
  }), _defineProperty(_ref6, 'payload', { token: token, password: password, confirmPassword: confirmPassword }), _ref6;
}

var USER_CHANGE_PASSWORD = exports.USER_CHANGE_PASSWORD = 'USER_CHANGE_PASSWORD';
var USER_CHANGE_PASSWORD_SUCCESS = exports.USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
var USER_CHANGE_PASSWORD_FAILURE = exports.USER_CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE';

function changePassword(currentPassword, newPassword, confirmNewPassword) {
  var _ref7;

  return _ref7 = {}, _defineProperty(_ref7, _api.CALL_API, {
    types: [USER_CHANGE_PASSWORD, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_FAILURE],
    endpoint: '/api/users/change-password',
    method: 'POST'
  }), _defineProperty(_ref7, 'payload', { currentPassword: currentPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword }), _ref7;
}

var USER_SEARCH_BY_EMAIL = exports.USER_SEARCH_BY_EMAIL = 'USER_SEARCH_BY_EMAIL';
var USER_SEARCH_BY_EMAIL_SUCCESS = exports.USER_SEARCH_BY_EMAIL_SUCCESS = 'USER_SEARCH_BY_EMAIL_SUCCESS';
var USER_SEARCH_BY_EMAIL_FAILURE = exports.USER_SEARCH_BY_EMAIL_FAILURE = 'USER_SEARCH_BY_EMAIL_FAILURE';

function searchUsersByEmail(searchString) {
  return _defineProperty({}, _api.CALL_API, {
    types: [USER_SEARCH_BY_EMAIL, USER_SEARCH_BY_EMAIL_SUCCESS, USER_SEARCH_BY_EMAIL_FAILURE],
    endpoint: '/api/users/search-by-email?search=' + searchString
  });
}

var USER_SEARCH_BY_NAME = exports.USER_SEARCH_BY_NAME = 'USER_SEARCH_BY_NAME';
var USER_SEARCH_BY_NAME_SUCCESS = exports.USER_SEARCH_BY_NAME_SUCCESS = 'USER_SEARCH_BY_NAME_SUCCESS';
var USER_SEARCH_BY_NAME_FAILURE = exports.USER_SEARCH_BY_NAME_FAILURE = 'USER_SEARCH_BY_NAME_FAILURE';

function searchUsersByName(searchString) {
  return _defineProperty({}, _api.CALL_API, {
    types: [USER_SEARCH_BY_NAME, USER_SEARCH_BY_NAME_SUCCESS, USER_SEARCH_BY_NAME_FAILURE],
    endpoint: '/api/users/search-by-name?search=' + searchString
  });
}

var CHECK_TOKEN_RESET = exports.CHECK_TOKEN_RESET = 'CHECK_TOKEN_RESET';
var CHECK_TOKEN_RESET_SUCCESS = exports.CHECK_TOKEN_RESET_SUCCESS = 'CHECK_TOKEN_RESET_SUCCESS';
var CHECK_TOKEN_RESET_FAILURE = exports.CHECK_TOKEN_RESET_FAILURE = 'CHECK_TOKEN_RESET_FAILURE';

function isValidResetToken(tokenString) {
  var _ref10;

  return _ref10 = {}, _defineProperty(_ref10, _api.CALL_API, {
    types: [CHECK_TOKEN_RESET, CHECK_TOKEN_RESET_SUCCESS, CHECK_TOKEN_RESET_FAILURE],
    endpoint: '/api/users/search-user-token?search=' + tokenString,
    method: 'POST'
  }), _defineProperty(_ref10, 'payload', { tokenString: tokenString }), _ref10;
}

var USER_RESEND_ACTIVATION = exports.USER_RESEND_ACTIVATION = 'USER_RESEND_ACTIVATION';
var USER_RESEND_ACTIVATION_SUCCESS = exports.USER_RESEND_ACTIVATION_SUCCESS = 'USER_RESEND_ACTIVATION_SUCCESS';
var USER_RESEND_ACTIVATION_FAILURE = exports.USER_RESEND_ACTIVATION_FAILURE = 'USER_RESEND_ACTIVATION_FAILURE';

function resendActivation(userId) {
  var _ref11;

  return _ref11 = {}, _defineProperty(_ref11, _api.CALL_API, {
    types: [USER_RESEND_ACTIVATION, USER_RESEND_ACTIVATION_SUCCESS, USER_RESEND_ACTIVATION_FAILURE],
    endpoint: '/api/users/resend-activation?id=' + userId,
    method: 'POST'
  }), _defineProperty(_ref11, 'payload', { userId: userId }), _ref11;
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _TransactionType = __webpack_require__(45);

var _TransactionType2 = _interopRequireDefault(_TransactionType);

var _UserWallet = __webpack_require__(26);

var _UserWallet2 = _interopRequireDefault(_UserWallet);

var _UserAddress = __webpack_require__(33);

var _UserAddress2 = _interopRequireDefault(_UserAddress);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _TransactionImportType = __webpack_require__(44);

var _TransactionImportType2 = _interopRequireDefault(_TransactionImportType);

var _AssociatedAddress = __webpack_require__(18);

var _AssociatedAddress2 = _interopRequireDefault(_AssociatedAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var Transaction = _sequelize4.default.define("transactions", {
  trxId: { type: _sequelize2.default.STRING(128), field: "trx_id" },
  destination: { type: _sequelize2.default.STRING(128), field: "destination" },
  note: { type: _sequelize2.default.STRING(128), field: "note" },
  amount: { type: _sequelize2.default.STRING(128), field: "amount" },
  asset: { type: _sequelize2.default.STRING(128), field: "asset" },
  value: { type: _sequelize2.default.STRING(128), field: "value" },
  transactionDate: { type: _sequelize2.default.STRING(128), field: "transaction_date" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});
Transaction.belongsTo(_TransactionType2.default);
Transaction.belongsTo(_TransactionImportType2.default);
Transaction.belongsTo(_UserWallet2.default);
Transaction.belongsTo(_UserAddress2.default);
Transaction.belongsTo(_User2.default);
Transaction.belongsTo(_AssociatedAddress2.default, { onDelete: 'cascade', hooks: true });
_UserWallet2.default.hasMany(Transaction, { as: 'Transactions', onDelete: 'cascade', hooks: true });
_UserAddress2.default.hasMany(Transaction, { as: 'AddressTransactions', onDelete: 'cascade', hooks: true });

exports.default = Transaction;
module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _UserProvider = __webpack_require__(47);

var _UserProvider2 = _interopRequireDefault(_UserProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserWallet = _sequelize4.default.define("userwallet", {
  walletId: { type: _sequelize2.default.STRING(128), field: "wallet_id" },
  walletName: { type: _sequelize2.default.STRING(128), field: "wallet_name" },
  walletType: { type: _sequelize2.default.STRING(128), field: "wallet_type" },
  balance: { type: _sequelize2.default.STRING(128), field: "balance" },
  currency: { type: _sequelize2.default.STRING(128), field: "currency" },
  updatedWalletAt: { type: _sequelize2.default.DATE, field: "updated_wallet_at" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
}); // libs

UserWallet.belongsTo(_UserProvider2.default);
_UserProvider2.default.hasMany(UserWallet, { as: 'UserWallets' });

exports.default = UserWallet;
module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/action/delete");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/editor/mode-edit");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageLoading = __webpack_require__(119);

var _PageLoading2 = _interopRequireDefault(_PageLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageLoading2.default;
module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TradingView = __webpack_require__(169);

Object.defineProperty(exports, 'TradingView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TradingView).default;
  }
});

var _IncomeView = __webpack_require__(166);

Object.defineProperty(exports, 'IncomeView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_IncomeView).default;
  }
});

var _SpendingView = __webpack_require__(168);

Object.defineProperty(exports, 'SpendingView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SpendingView).default;
  }
});

var _Pagination = __webpack_require__(167);

Object.defineProperty(exports, 'Pagination', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Pagination).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindInheritedFunctionScopes = exports.parseQueryString = exports.hasPropChanged = exports.getSystemCriticalCount = exports.getSystemWarningCount = exports.getSystemSummary = exports.getSystemStatus = exports.getEnvironmentCriticalCount = exports.getEnvironmentWarningCount = exports.getEnvironmentSummary = exports.getEnvironmentStatus = exports.getNodeSummary = exports.getNodeStatus = exports.NODE_STATUS_CRITICAL = exports.NODE_STATUS_WARNING = exports.NODE_STATUS_NORMAL = exports.NODE_STATUS_UNTRACKED = exports.getNodeStatusList = exports.getEntityStatus = exports.getFeed = exports.hasFeed = exports.hasNodeData = exports.popEntitiesStatus = exports.pushEntitiesStatus = exports.replaceNewEntities = exports.mergeNewEntities = exports.getCurrentUser = exports.isUserLoggedIn = exports.getEntity = exports.hasEntity = exports.isServer = exports.ENTITY_STATUS_UPDATING = exports.ENTITY_STATUS_DELETING = exports.ENTITY_STATUS_DATA_AVAILABLE = exports.ENTITY_STATUS_DATA_UNAVAILABLE = exports.ENTITY_STATUS_LOADING = exports.ENTITY_STATUS_UNATTEMPTED = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// libs


var _has = __webpack_require__(73);

var _has2 = _interopRequireDefault(_has);

var _get = __webpack_require__(35);

var _get2 = _interopRequireDefault(_get);

var _isEqual = __webpack_require__(268);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _fromPairs = __webpack_require__(267);

var _fromPairs2 = _interopRequireDefault(_fromPairs);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTITY_STATUS_UNATTEMPTED = exports.ENTITY_STATUS_UNATTEMPTED = "ENTITY_STATUS_UNATTEMPTED";
var ENTITY_STATUS_LOADING = exports.ENTITY_STATUS_LOADING = "ENTITY_STATUS_LOADING";
var ENTITY_STATUS_DATA_UNAVAILABLE = exports.ENTITY_STATUS_DATA_UNAVAILABLE = "ENTITY_STATUS_DATA_UNAVAILABLE";
var ENTITY_STATUS_DATA_AVAILABLE = exports.ENTITY_STATUS_DATA_AVAILABLE = "ENTITY_STATUS_DATA_AVAILABLE";
var ENTITY_STATUS_DELETING = exports.ENTITY_STATUS_DELETING = "ENTITY_STATUS_DELETING";
var ENTITY_STATUS_UPDATING = exports.ENTITY_STATUS_UPDATING = "ENTITY_STATUS_UPDATING";

/**
 * @returns {boolean} - Determines whether the code is running in a server
 */
var isServer = exports.isServer = function isServer() {
  return typeof window === "undefined" || !window.document;
};

/**
 * Given a store state and an entity id, the func returns whether the entity object
 * is present in the store.
 * 
 * @param {Object} state 
 * @param {string} key 
 * @param {number} id 
 */
var hasEntity = exports.hasEntity = function hasEntity(state, key, id) {
  return (0, _has2.default)(state, "entities." + key + "." + id);
};

/**
 * Given a store state and an entity id, the func returns the entity object if found.
 * Returns 'undefined' otherwise
 */
var getEntity = exports.getEntity = function getEntity(state, key, id) {
  return (0, _get2.default)(state, "entities." + key + "." + id);
};

/**
 * A utility func that, given a redux store state, finds out if a user is logged
 * in at the moment.
 * @param {Object} state - redux store state
 * @return {boolean} - A boolean value that determines if user is logged in
 */
var isUserLoggedIn = exports.isUserLoggedIn = function isUserLoggedIn(state) {
  return !!(0, _get2.default)(state, "auth.user");
};

/**
 * Given a redux store state, 
 * 
 * @param {Object} state 
 * @return {Object|undefined}
 */
var getCurrentUser = exports.getCurrentUser = function getCurrentUser(state) {
  return getEntity(state, "users", (0, _get2.default)(state, "auth.user"));
};

/**
 * A utility functions for reducers, that merges an array of new entities into
 * an existing store state.
 *
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @param {string} status - (optional) value of meta key __status__
 * @returns {Object} - A new state object for redux store with merged entities
 */
var mergeNewEntities = exports.mergeNewEntities = function mergeNewEntities(state, entities, status) {
  var newEntitiesMap = {};
  var newStatusObject = status ? { __status__: status } : {};

  entities.forEach(function (item) {
    newEntitiesMap[item.id] = Object.assign({}, state[item.id] || {}, item, newStatusObject);
  });

  return _extends({}, state, newEntitiesMap);
};

/**
 * A utility functions for reducers, that replaces an array of new entities into
 * an existing store state.
 *
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @param {string} status - (optional) value of meta key __status__
 * @returns {Object} - A new state object for redux store with replaced entities
 */
var replaceNewEntities = exports.replaceNewEntities = function replaceNewEntities(state, entities, status) {
  var newEntitiesMap = {};
  var newStatusObject = status ? { __status__: status } : {};

  entities.forEach(function (item) {
    newEntitiesMap[item.id] = Object.assign({}, item, newStatusObject);
  });

  return _extends({}, state, newEntitiesMap);
};

/**
 * Sets provided status as __status__ and pushes current __status__ into a property __previousStatus__ 
 * 
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @param {string} status - (optional) value of meta key __status__
 * @returns {Object} - A new state object for redux store with replaced entities
 */
var pushEntitiesStatus = exports.pushEntitiesStatus = function pushEntitiesStatus(state, entities) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ENTITY_STATUS_DATA_AVAILABLE;
  return mergeNewEntities(state, entities.map(function (e) {
    return _extends({}, e, { __previousStatus__: e.__status__ });
  }), status);
};

/**
 * If there's any __previousStatus__, puts it back to __status__
 * 
 * @param {Object} state - entities state object from redux store
 * @param {Array} entities - an array of new entities
 * @returns {Object} - A new state object for redux store with replaced entities
 */
var popEntitiesStatus = exports.popEntitiesStatus = function popEntitiesStatus(state, entities) {
  return mergeNewEntities(state, entities.map(function (e) {
    return _extends({}, e, {
      __status__: e.__previousStatus__ || e.__status__,
      __previousStatus__: null
    });
  }));
};

/**
 * Given a store state and a nodeId, the func confirms
 * if the store contains data about that node
 *
 * @param {Object} state - Redux store state
 * @param {number} nodeId - a node id
 * @return {boolean} - Whether store contains node with given id or not
 */
var hasNodeData = exports.hasNodeData = function hasNodeData(state, nodeId) {
  var nodes = state.entities.nodes;


  return _typeof(nodes[nodeId]) !== undefined;
};

/**
 * Given a store state and a feed key, func confirms if the store contains
 * any items for the feed.
 * 
 * If entityKey is provided, the func ANDs the check with presence of entity
 * against each item in the feed.
 * 
 * @param {Object} state - Redux store state
 * @param {string} key - feed key
 * @param {string} entityKey - (options) entity key
 * @return {boolean} - A boolean value
 */
var hasFeed = exports.hasFeed = function hasFeed(state, key, entityKey) {
  var items = (0, _get2.default)(state, "feed." + key + ".items", []);
  var hasItems = Boolean(items.length);

  if (!(hasItems && entityKey)) {
    return hasItems;
  }

  // $FlowFixMe
  return items.every(function (id) {
    return hasEntity(state, entityKey, id);
  });
};

/**
 * Given a store state and a feed key, returns feed object {items, isLoading, meta}.
 * If entityKey is provided, it returns full objects in items array instead of IDs.
 * 
 * @param {Object} state 
 * @param {string} feedKey 
 * @param {string} entityKey
 */
var getFeed = exports.getFeed = function getFeed(state, feedKey, entityKey) {
  var feed = (0, _get2.default)(state, "feed." + feedKey, { items: [] });

  if (!entityKey) {
    return feed;
  }

  return _extends({}, feed, {
    // $FlowFixMe
    items: feed.items.map(function (id) {
      return getEntity(state, entityKey, id);
    })
  });
};

/**
 * Given a store state and an entity id, the func returns one of the four
 * states of the given entity
 */
var getEntityStatus = exports.getEntityStatus = function getEntityStatus(state, entity, id) {
  var instance = getEntity(state, entity, id);

  return instance ? instance.__status__ : ENTITY_STATUS_UNATTEMPTED;
};

/**
 * Given a store stata and a node id, the func returns an array of node status
 * @deprecated This should be removed
 */
var getNodeStatusList = exports.getNodeStatusList = function getNodeStatusList(state, id) {
  var node = getEntity(state, "nodes", id);
  var __nodeStatus = (0, _get2.default)(state, "nodeStatus." + (node && node.universalIdentifier), {});

  return Object.keys(__nodeStatus).map(function (key) {
    return _extends({}, __nodeStatus[key], { time: parseInt(key, 10) });
  }).sort(function (a, b) {
    return b - a;
  }) || [];
};

var NODE_STATUS_UNTRACKED = exports.NODE_STATUS_UNTRACKED = "NODE_STATUS_UNTRACKED";
var NODE_STATUS_NORMAL = exports.NODE_STATUS_NORMAL = "NODE_STATUS_NORMAL";
var NODE_STATUS_WARNING = exports.NODE_STATUS_WARNING = "NODE_STATUS_WARNING";
var NODE_STATUS_CRITICAL = exports.NODE_STATUS_CRITICAL = "NODE_STATUS_CRITICAL";

var getNodeStatus = exports.getNodeStatus = function getNodeStatus(state, id) {
  var entity = getEntity(state, "nodes", id);
  var universalIdentifier = (0, _get2.default)(entity, "universalIdentifier");
  var nStatus = (0, _get2.default)(state, "aggregatedData.nodeStatus.data['" + universalIdentifier + "'][0].status");
  var status = nStatus === 0 ? NODE_STATUS_NORMAL : nStatus === 1 ? NODE_STATUS_WARNING : nStatus === 2 ? NODE_STATUS_CRITICAL : NODE_STATUS_UNTRACKED;

  return status;
};

var getNodeSummary = exports.getNodeSummary = function getNodeSummary(state, id) {
  var entity = getEntity(state, "nodes", id);
  var universalIdentifier = (0, _get2.default)(entity, "universalIdentifier");
  return (0, _get2.default)(state, "aggregatedData.nodeStatus.data['" + universalIdentifier + "'][0].summaryParsed", []);
};

var getEnvironmentStatus = exports.getEnvironmentStatus = function getEnvironmentStatus(state, id) {
  return (0, _get2.default)(state, "aggregatedData.environmentStatus.data." + id + "[0].status", 0);
};
var getEnvironmentSummary = exports.getEnvironmentSummary = function getEnvironmentSummary(state, id) {
  return (0, _get2.default)(state, "aggregatedData.environmentStatus.data." + id + "[0].summaryParsed", []);
};

var getEnvironmentWarningCount = exports.getEnvironmentWarningCount = function getEnvironmentWarningCount(state, id) {
  return getEnvironmentSummary(state, id).detail.reduce(function (memo, node) {
    return memo + node.status % 2;
  }, 0);
};

var getEnvironmentCriticalCount = exports.getEnvironmentCriticalCount = function getEnvironmentCriticalCount(state, id) {
  return getEnvironmentSummary(state, id).detail.reduce(function (memo, node) {
    return memo + (node.status === 2 ? 1 : 0);
  }, 0);
};

var getSystemStatus = exports.getSystemStatus = function getSystemStatus(state) {
  return (0, _get2.default)(state, "aggregatedData.systemStatus.data[0].status", 0);
};
var getSystemSummary = exports.getSystemSummary = function getSystemSummary(state) {
  return (0, _get2.default)(state, "aggregatedData.systemStatus.data[0].summaryParsed", []);
};

var getSystemWarningCount = exports.getSystemWarningCount = function getSystemWarningCount(state) {
  return getSystemSummary(state).reduce(function (memo, env) {
    return memo + env.detail.reduce(function (memo0, node) {
      return memo0 + node.status % 2;
    }, 0);
  }, 0);
};

var getSystemCriticalCount = exports.getSystemCriticalCount = function getSystemCriticalCount(state) {
  return getSystemSummary(state).reduce(function (memo, env) {
    return memo + env.detail.reduce(function (memo0, node) {
      return memo0 + (node.status === 2 ? 1 : 0);
    }, 0);
  }, 0);
};

/**
 * 
 * @param {string} key 
 * @param {Object} thisProps 
 * @param {Object} nextProps 
 */
var hasPropChanged = exports.hasPropChanged = function hasPropChanged(key, thisProps, nextProps) {
  return !(0, _isEqual2.default)(thisProps[key], nextProps[key]);
};

/**
 * Converts a query string into a map
 * @param {*} query 
 */
var parseQueryString = exports.parseQueryString = function parseQueryString(query) {
  return (0, _fromPairs2.default)(query.substring(1).split("&").map(function (s) {
    return s.split("=").map(decodeURIComponent);
  }));
};

/**
 * A higher order function that binds inherited function scopes to parent component
 */
var bindInheritedFunctionScopes = exports.bindInheritedFunctionScopes = function bindInheritedFunctionScopes() {
  return function (WrappedComponent) {
    return function (_React$Component) {
      _inherits(ComponentWithBoundInheritedFunctionScopes, _React$Component);

      function ComponentWithBoundInheritedFunctionScopes() {
        _classCallCheck(this, ComponentWithBoundInheritedFunctionScopes);

        return _possibleConstructorReturn(this, (ComponentWithBoundInheritedFunctionScopes.__proto__ || Object.getPrototypeOf(ComponentWithBoundInheritedFunctionScopes)).apply(this, arguments));
      }

      _createClass(ComponentWithBoundInheritedFunctionScopes, [{
        key: "render",
        value: function render() {
          var _this2 = this;

          var scope = (0, _get2.default)(this, "_reactInternalInstance._currentElement._owner._instance");

          if (!scope) {
            throw new Error("scope is undefined");
          }

          var boundFuncs = {};
          Object.keys(this.props).filter(function (key) {
            return typeof _this2.props[key] === "function";
          }).forEach(function (key) {
            boundFuncs[key] = _this2.props[key].bind(scope);
          });

          var props = Object.assign({}, this.props, boundFuncs);

          return _react2.default.createElement(WrappedComponent, props);
        }
      }]);

      return ComponentWithBoundInheritedFunctionScopes;
    }(_react2.default.Component);
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserAddress = _sequelize4.default.define("useraddresses", {
  address: { type: _sequelize2.default.STRING(255), field: "address" },
  nickName: { type: _sequelize2.default.STRING(255), field: "nick_name" },
  balance: { type: _sequelize2.default.STRING(128), field: "balance" },
  currency: { type: _sequelize2.default.STRING(128), field: "currency" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
}); // libs

UserAddress.belongsTo(_User2.default);

exports.default = UserAddress;
module.exports = exports['default'];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reportError = function reportError(res, status, message) {
  res.status(status);
  res.send({ message: message });
};

var NotFoundError = exports.NotFoundError = function (_Error) {
  _inherits(NotFoundError, _Error);

  function NotFoundError(message) {
    _classCallCheck(this, NotFoundError);

    var _this = _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).call(this, message));

    _this.message = message;
    _this.name = 'NotFoundError';
    return _this;
  }

  return NotFoundError;
}(Error);

var BadRequestError = exports.BadRequestError = function (_Error2) {
  _inherits(BadRequestError, _Error2);

  function BadRequestError(message) {
    _classCallCheck(this, BadRequestError);

    var _this2 = _possibleConstructorReturn(this, (BadRequestError.__proto__ || Object.getPrototypeOf(BadRequestError)).call(this, message));

    _this2.message = message;
    _this2.name = 'BadRequestError';
    return _this2;
  }

  return BadRequestError;
}(Error);

var InternalServerError = exports.InternalServerError = function (_Error3) {
  _inherits(InternalServerError, _Error3);

  function InternalServerError(message) {
    _classCallCheck(this, InternalServerError);

    var _this3 = _possibleConstructorReturn(this, (InternalServerError.__proto__ || Object.getPrototypeOf(InternalServerError)).call(this, message));

    _this3.message = message;
    _this3.name = 'InternalServerError';
    return _this3;
  }

  return InternalServerError;
}(Error);

var AccessDeniedError = exports.AccessDeniedError = function (_Error4) {
  _inherits(AccessDeniedError, _Error4);

  function AccessDeniedError(message) {
    _classCallCheck(this, AccessDeniedError);

    var _this4 = _possibleConstructorReturn(this, (AccessDeniedError.__proto__ || Object.getPrototypeOf(AccessDeniedError)).call(this, message));

    _this4.message = message;
    _this4.name = 'AccessDeniedError';
    return _this4;
  }

  return AccessDeniedError;
}(Error);

var caughtError = exports.caughtError = function caughtError(res, error) {
  var m = 'An internal server error occurred: ' + error;
  // console.error('\x1b[31m', m)
  // console.error(error.stack, '\x1b[0m')

  if (error && (error instanceof BadRequestError || error.name === 'BadRequestError' || error instanceof InternalServerError || error.name === 'InternalServerError' || error instanceof NotFoundError || error.name === 'NotFoundError' || error instanceof AccessDeniedError || error.name === 'AccessDeniedError')) {
    if (error instanceof BadRequestError || error.name === 'BadRequestError') {
      res.status(400);
    } else if (error instanceof NotFoundError || error.name === 'NotFoundError') {
      res.status(404);
    } else if (error instanceof InternalServerError || error.name === 'InternalServerError') {
      res.status(500);
    } else if (error instanceof AccessDeniedError || error.name === 'AccessDeniedError') {
      res.status(401);
    }
  } else {
    res.status(500);
  }

  res.send({ message: m });
};

exports.default = {
  reportError: reportError,
  NotFoundError: NotFoundError,
  AccessDeniedError: AccessDeniedError,
  BadRequestError: BadRequestError,
  InternalServerError: InternalServerError,
  caughtError: caughtError
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("lodash/get");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("material-ui/RaisedButton");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_ASSOCIATED_WALLETADD_FAILURE = exports.UPDATE_ASSOCIATED_WALLETADD_SUCCESS = exports.UPDATE_ASSOCIATED_WALLETADD = exports.UPDATE_ASSOCIATED_MYADD_FAILURE = exports.UPDATE_ASSOCIATED_MYADD_SUCCESS = exports.UPDATE_ASSOCIATED_MYADD = exports.UPDATE_USER_ADDRESS_FAILURE = exports.UPDATE_USER_ADDRESS_SUCCESS = exports.UPDATE_USER_ADDRESS = exports.DELETE_USER_ADDRESS_FAILURE = exports.DELETE_USER_ADDRESS_SUCCESS = exports.DELETE_USER_ADDRESS = exports.REFRESH_USER_ADDRESSES_FAILURE = exports.REFRESH_USER_ADDRESSES_SUCCESS = exports.REFRESH_USER_ADDRESSES = exports.ADD_USER_ADDRESSES_FAILURE = exports.ADD_USER_ADDRESSES_SUCCESS = exports.ADD_USER_ADDRESSES = exports.REFRESH_USERPROVIDERS_FAILURE = exports.REFRESH_USERPROVIDERS_SUCCESS = exports.REFRESH_USERPROVIDERS = exports.DELETE_WALLET_FAILURE = exports.DELETE_WALLET_SUCCESS = exports.DELETE_WALLET = exports.PROVIDER_CALLBACK_FAILURE = exports.PROVIDER_CALLBACK_SUCCESS = exports.PROVIDER_CALLBACK = exports.MYACCOUNT_CONNECT_FAILURE = exports.MYACCOUNT_CONNECT_SUCCESS = exports.MYACCOUNT_CONNECT = exports.MYACCOUNT_DATA_FAILURE = exports.MYACCOUNT_DATA_SUCCESS = exports.MYACCOUNT_DATA = undefined;
exports.myAccountData = myAccountData;
exports.accountconnectUrl = accountconnectUrl;
exports.providerCallback = providerCallback;
exports.deleteWallet = deleteWallet;
exports.refreshUserProviders = refreshUserProviders;
exports.addUserAddresses = addUserAddresses;
exports.refreshUserAddresses = refreshUserAddresses;
exports.deleteUserAddress = deleteUserAddress;
exports.updateUserAddress = updateUserAddress;
exports.updateAssociatedMyAdd = updateAssociatedMyAdd;
exports.updateAssociatedWalletAdd = updateAssociatedWalletAdd;

var _api = __webpack_require__(20);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // libs

// src


var MYACCOUNT_DATA = exports.MYACCOUNT_DATA = 'MYACCOUNT_DATA';
var MYACCOUNT_DATA_SUCCESS = exports.MYACCOUNT_DATA_SUCCESS = 'MYACCOUNT_DATA_SUCCESS';
var MYACCOUNT_DATA_FAILURE = exports.MYACCOUNT_DATA_FAILURE = 'MYACCOUNT_DATA_FAILURE';

function myAccountData() {
  return _defineProperty({}, _api.CALL_API, {
    types: [MYACCOUNT_DATA, MYACCOUNT_DATA_SUCCESS, MYACCOUNT_DATA_FAILURE],
    endpoint: '/api/accounts/my-account-all-data'
  });
}

var MYACCOUNT_CONNECT = exports.MYACCOUNT_CONNECT = 'MYACCOUNT_CONNECT';
var MYACCOUNT_CONNECT_SUCCESS = exports.MYACCOUNT_CONNECT_SUCCESS = 'MYACCOUNT_CONNECT_SUCCESS';
var MYACCOUNT_CONNECT_FAILURE = exports.MYACCOUNT_CONNECT_FAILURE = 'MYACCOUNT_CONNECT_FAILURE';

function accountconnectUrl(providerId) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, _api.CALL_API, {
    types: [MYACCOUNT_CONNECT, MYACCOUNT_CONNECT_SUCCESS, MYACCOUNT_CONNECT_FAILURE],
    endpoint: '/api/accounts/my-account-connect-url',
    method: 'POST'
  }), _defineProperty(_ref2, 'payload', { providerId: providerId }), _ref2;
}

var PROVIDER_CALLBACK = exports.PROVIDER_CALLBACK = 'PROVIDER_CALLBACK';
var PROVIDER_CALLBACK_SUCCESS = exports.PROVIDER_CALLBACK_SUCCESS = 'PROVIDER_CALLBACK_SUCCESS';
var PROVIDER_CALLBACK_FAILURE = exports.PROVIDER_CALLBACK_FAILURE = 'PROVIDER_CALLBACK_FAILURE';

function providerCallback(providerName, tokenCode) {
  var _ref3;

  return _ref3 = {}, _defineProperty(_ref3, _api.CALL_API, {
    types: [PROVIDER_CALLBACK, PROVIDER_CALLBACK_SUCCESS, PROVIDER_CALLBACK_FAILURE],
    endpoint: '/api/accounts/wallet-provider-callback',
    method: 'POST'
  }), _defineProperty(_ref3, 'payload', { providerName: providerName, tokenCode: tokenCode }), _ref3;
}

var DELETE_WALLET = exports.DELETE_WALLET = 'DELETE_WALLET';
var DELETE_WALLET_SUCCESS = exports.DELETE_WALLET_SUCCESS = 'DELETE_WALLET_SUCCESS';
var DELETE_WALLET_FAILURE = exports.DELETE_WALLET_FAILURE = 'DELETE_WALLET_FAILURE';

function deleteWallet(userWalletId) {
  var _ref4;

  return _ref4 = {}, _defineProperty(_ref4, _api.CALL_API, {
    types: [DELETE_WALLET, DELETE_WALLET_SUCCESS, DELETE_WALLET_FAILURE],
    endpoint: '/api/accounts/delete-userprovider-wallet',
    method: 'POST'
  }), _defineProperty(_ref4, 'payload', { userWalletId: userWalletId }), _ref4;
}

var REFRESH_USERPROVIDERS = exports.REFRESH_USERPROVIDERS = 'REFRESH_USERPROVIDERS';
var REFRESH_USERPROVIDERS_SUCCESS = exports.REFRESH_USERPROVIDERS_SUCCESS = 'REFRESH_USERPROVIDERS_SUCCESS';
var REFRESH_USERPROVIDERS_FAILURE = exports.REFRESH_USERPROVIDERS_FAILURE = 'REFRESH_USERPROVIDERS_FAILURE';

function refreshUserProviders(userProviderId) {
  var _ref5;

  return _ref5 = {}, _defineProperty(_ref5, _api.CALL_API, {
    types: [REFRESH_USERPROVIDERS, REFRESH_USERPROVIDERS_SUCCESS, REFRESH_USERPROVIDERS_FAILURE],
    endpoint: '/api/accounts/refresh-userproviders',
    method: 'POST'
  }), _defineProperty(_ref5, 'payload', { userProviderId: userProviderId }), _ref5;
}

var ADD_USER_ADDRESSES = exports.ADD_USER_ADDRESSES = 'ADD_USER_ADDRESSES';
var ADD_USER_ADDRESSES_SUCCESS = exports.ADD_USER_ADDRESSES_SUCCESS = 'ADD_USER_ADDRESSES_SUCCESS';
var ADD_USER_ADDRESSES_FAILURE = exports.ADD_USER_ADDRESSES_FAILURE = 'ADD_USER_ADDRESSES_FAILURE';

function addUserAddresses(coinAddresses) {
  var _ref6;

  return _ref6 = {}, _defineProperty(_ref6, _api.CALL_API, {
    types: [ADD_USER_ADDRESSES, ADD_USER_ADDRESSES_SUCCESS, ADD_USER_ADDRESSES_FAILURE],
    endpoint: '/api/accounts/user-addresses-insert',
    method: 'POST'
  }), _defineProperty(_ref6, 'payload', { coinAddresses: coinAddresses }), _ref6;
}

var REFRESH_USER_ADDRESSES = exports.REFRESH_USER_ADDRESSES = 'REFRESH_USER_ADDRESSES';
var REFRESH_USER_ADDRESSES_SUCCESS = exports.REFRESH_USER_ADDRESSES_SUCCESS = 'REFRESH_USER_ADDRESSES_SUCCESS';
var REFRESH_USER_ADDRESSES_FAILURE = exports.REFRESH_USER_ADDRESSES_FAILURE = 'REFRESH_USER_ADDRESSES_FAILURE';

function refreshUserAddresses(userAddressId) {
  var _ref7;

  return _ref7 = {}, _defineProperty(_ref7, _api.CALL_API, {
    types: [REFRESH_USER_ADDRESSES, REFRESH_USER_ADDRESSES_SUCCESS, REFRESH_USER_ADDRESSES_FAILURE],
    endpoint: '/api/accounts/user-addresses-refresh',
    method: 'POST'
  }), _defineProperty(_ref7, 'payload', { userAddressId: userAddressId }), _ref7;
}

var DELETE_USER_ADDRESS = exports.DELETE_USER_ADDRESS = 'DELETE_USER_ADDRESS';
var DELETE_USER_ADDRESS_SUCCESS = exports.DELETE_USER_ADDRESS_SUCCESS = 'DELETE_USER_ADDRESS_SUCCESS';
var DELETE_USER_ADDRESS_FAILURE = exports.DELETE_USER_ADDRESS_FAILURE = 'DELETE_USER_ADDRESS_FAILURE';

function deleteUserAddress(userAddressId) {
  var _ref8;

  return _ref8 = {}, _defineProperty(_ref8, _api.CALL_API, {
    types: [DELETE_USER_ADDRESS, DELETE_USER_ADDRESS_SUCCESS, DELETE_USER_ADDRESS_FAILURE],
    endpoint: '/api/accounts/user-address-delete',
    method: 'POST'
  }), _defineProperty(_ref8, 'payload', { userAddressId: userAddressId }), _ref8;
}

var UPDATE_USER_ADDRESS = exports.UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS';
var UPDATE_USER_ADDRESS_SUCCESS = exports.UPDATE_USER_ADDRESS_SUCCESS = 'UPDATE_USER_ADDRESS_SUCCESS';
var UPDATE_USER_ADDRESS_FAILURE = exports.UPDATE_USER_ADDRESS_FAILURE = 'UPDATE_USER_ADDRESS_FAILURE';

function updateUserAddress(userAddressId, userAddressNickName) {
  var _ref9;

  return _ref9 = {}, _defineProperty(_ref9, _api.CALL_API, {
    types: [UPDATE_USER_ADDRESS, UPDATE_USER_ADDRESS_SUCCESS, UPDATE_USER_ADDRESS_FAILURE],
    endpoint: '/api/accounts/user-address-update',
    method: 'POST'
  }), _defineProperty(_ref9, 'payload', { userAddressId: userAddressId, userAddressNickName: userAddressNickName }), _ref9;
}

var UPDATE_ASSOCIATED_MYADD = exports.UPDATE_ASSOCIATED_MYADD = 'UPDATE_ASSOCIATED_MYADD';
var UPDATE_ASSOCIATED_MYADD_SUCCESS = exports.UPDATE_ASSOCIATED_MYADD_SUCCESS = 'UPDATE_ASSOCIATED_MYADD_SUCCESS';
var UPDATE_ASSOCIATED_MYADD_FAILURE = exports.UPDATE_ASSOCIATED_MYADD_FAILURE = 'UPDATE_ASSOCIATED_MYADD_FAILURE';

function updateAssociatedMyAdd(associatedAddId, associatedAddNick) {
  var _ref10;

  return _ref10 = {}, _defineProperty(_ref10, _api.CALL_API, {
    types: [UPDATE_ASSOCIATED_MYADD, UPDATE_ASSOCIATED_MYADD_SUCCESS, UPDATE_ASSOCIATED_MYADD_FAILURE],
    endpoint: '/api/accounts/associated-myaddress-update',
    method: 'POST'
  }), _defineProperty(_ref10, 'payload', { associatedAddId: associatedAddId, associatedAddNick: associatedAddNick }), _ref10;
}

var UPDATE_ASSOCIATED_WALLETADD = exports.UPDATE_ASSOCIATED_WALLETADD = 'UPDATE_ASSOCIATED_WALLETADD';
var UPDATE_ASSOCIATED_WALLETADD_SUCCESS = exports.UPDATE_ASSOCIATED_WALLETADD_SUCCESS = 'UPDATE_ASSOCIATED_WALLETADD_SUCCESS';
var UPDATE_ASSOCIATED_WALLETADD_FAILURE = exports.UPDATE_ASSOCIATED_WALLETADD_FAILURE = 'UPDATE_ASSOCIATED_WALLETADD_FAILURE';

function updateAssociatedWalletAdd(associatedAddId, associatedAddNick) {
  var _ref11;

  return _ref11 = {}, _defineProperty(_ref11, _api.CALL_API, {
    types: [UPDATE_ASSOCIATED_WALLETADD, UPDATE_ASSOCIATED_WALLETADD_SUCCESS, UPDATE_ASSOCIATED_WALLETADD_FAILURE],
    endpoint: '/api/accounts/associated-walletaddress-update',
    method: 'POST'
  }), _defineProperty(_ref11, 'payload', { associatedAddId: associatedAddId, associatedAddNick: associatedAddNick }), _ref11;
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FilterBarForm = __webpack_require__(154);

Object.defineProperty(exports, 'FilterBar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FilterBarForm).default;
  }
});

var _ProviderForm = __webpack_require__(163);

Object.defineProperty(exports, 'ProviderForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ProviderForm).default;
  }
});

var _NicknameForm = __webpack_require__(160);

Object.defineProperty(exports, 'NicknameForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_NicknameForm).default;
  }
});

var _NewAddressForm = __webpack_require__(157);

Object.defineProperty(exports, 'NewAddressForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_NewAddressForm).default;
  }
});

var _AddTransactionForm = __webpack_require__(152);

Object.defineProperty(exports, 'AddTransactionForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AddTransactionForm).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appDevelopment = __webpack_require__(184);

var _appDevelopment2 = _interopRequireDefault(_appDevelopment);

var _appStaging = __webpack_require__(186);

var _appStaging2 = _interopRequireDefault(_appStaging);

var _appProduction = __webpack_require__(185);

var _appProduction2 = _interopRequireDefault(_appProduction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENV_DEVELOPMENT = 'development';
var ENV_STAGING = 'staging';
var ENV_PRODUCTION = 'production';

var env = process.env.CONFIG;
var config = _appDevelopment2.default;

if (env === ENV_STAGING) {
    config = _appStaging2.default;
} else if (env === ENV_PRODUCTION) {
    config = _appProduction2.default;
}

exports.default = config;
module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderResponse = undefined;

var _ejs = __webpack_require__(51);

var _ejs2 = _interopRequireDefault(_ejs);

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(286);

var _reactRouter = __webpack_require__(289);

var _request = __webpack_require__(50);

var _request2 = _interopRequireDefault(_request);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _configureStore = __webpack_require__(176);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _utils = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
var enableUniversalRendering = process.env.UNIVERSAL_RENDERING === 'true'; // libs


var makeUniversalHTML = function makeUniversalHTML(req, res, preloadedState) {
  var App = __webpack_require__(90);

  var store = (0, _configureStore2.default)(preloadedState);
  var context = {};
  var html = (0, _server.renderToString)(_react2.default.createElement(App, { store: store, Router: _reactRouter.StaticRouter, routerProps: { location: req.url, context: context }, userAgent: req.headers['user-agent'] }));
  var title = _reactDocumentTitle2.default.rewind();
  var terminate = false;

  if (context.url) {
    res.redirect(302, context.url);
    terminate = true;
  }

  return { title: title, html: html, terminate: terminate };
};

var makeEmptyHTML = function makeEmptyHTML() {
  var html = '';
  var title = 'Wisdom';
  var terminate = false;

  return { html: html, title: title, terminate: terminate };
};

var renderSPA = function renderSPA(req, res, preloadedState) {
  var user = req.user;

  // console.log(`[renderSPA] preloadedState: ${JSON.stringify(preloadedState)}`)

  preloadedState.auth = preloadedState.auth || {};
  preloadedState.auth.user = preloadedState.auth.user || user ? user.id : null;
  preloadedState.entities = preloadedState.entities || {};
  preloadedState.entities.users = preloadedState.entities.users || {};

  if (user) {
    preloadedState.entities.users[user.id] = user;
    returnSPAResponse(req, res, preloadedState);
  } else {
    returnSPAResponse(req, res, preloadedState);
  }
};

var returnSPAResponse = function returnSPAResponse(req, res, preloadedState) {
  // console.log(`[renderSPAResponse] preloadedState: ${JSON.stringify(preloadedState)}`)

  var makeHTML = enableUniversalRendering ? makeUniversalHTML : makeEmptyHTML;

  var _makeHTML = makeHTML(req, res, preloadedState),
      title = _makeHTML.title,
      html = _makeHTML.html,
      terminate = _makeHTML.terminate;

  if (terminate) return;

  (0, _request2.default)('http://localhost:' + (0, _utils.getPort)() + '/manifest.json', function (err, response, str) {
    if (err) {
      throw err;
    }

    var manifest = JSON.parse(str);

    _ejs2.default.renderFile(_path2.default.resolve('./server/templates/web/app.ejs'), { preloadedState: preloadedState, html: html, title: title, manifest: manifest }, {}, function (err0, str0) {
      if (err0) {
        throw err0;
      }

      res.send(str0);
    });
  });
};

var renderResponse = exports.renderResponse = function renderResponse(req, res) {
  var preloadedState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return renderSPA(req, res, preloadedState);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var Provider = _sequelize4.default.define("providers", {
  providerName: { type: _sequelize2.default.STRING(128), field: "provider_name" },
  displayName: { type: _sequelize2.default.STRING(128), field: "display_name" },
  clientId: { type: _sequelize2.default.STRING(128), field: "client_id" },
  clientSecret: { type: _sequelize2.default.STRING(128), field: "client_secret" },
  grantType: { type: _sequelize2.default.STRING(128), field: "grant_type" },
  redirectUrl1: { type: _sequelize2.default.STRING(128), field: "redirect_url1" },
  redirectUrl2: { type: _sequelize2.default.STRING(128), field: "redirect_url2" },
  status: { type: _sequelize2.default.INTEGER, field: "status" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});
exports.default = Provider;
module.exports = exports["default"];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var Role = _sequelize4.default.define("roles", {
  roleName: { type: _sequelize2.default.STRING(128), field: "role_name" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});
exports.default = Role;
module.exports = exports["default"];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var TimeZone = _sequelize4.default.define("timezone", {
  zoneName: { type: _sequelize2.default.STRING(128), field: "zone" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});
exports.default = TimeZone;
module.exports = exports["default"];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var TransactionImportType = _sequelize4.default.define("transactionimporttype", {
  importTypeName: { type: _sequelize2.default.STRING(128), field: "import_type_name" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});
exports.default = TransactionImportType;
module.exports = exports["default"];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var TransactionType = _sequelize4.default.define("transactiontype", {
  typeName: { type: _sequelize2.default.STRING(128), field: "type_name" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});
exports.default = TransactionType;
module.exports = exports["default"];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var UserAccountType = _sequelize4.default.define("useraccounttype", {
  typeName: { type: _sequelize2.default.STRING(128), field: "type_name" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});

exports.default = UserAccountType;
module.exports = exports["default"];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = __webpack_require__(11);

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _Provider = __webpack_require__(41);

var _Provider2 = _interopRequireDefault(_Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var UserProvider = _sequelize4.default.define("userprovider", {
  accountName: { type: _sequelize2.default.STRING(128), field: "account_name" },
  accessToken: { type: _sequelize2.default.STRING(128), field: "access_token" },
  refreshToken: { type: _sequelize2.default.STRING(128), field: "refresh_token" }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // disable the modification of table names
  freezeTableName: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true
});
UserProvider.belongsTo(_User2.default);
UserProvider.belongsTo(_Provider2.default);

exports.default = UserProvider;
module.exports = exports['default'];

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Paper");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("material-ui/TextField");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // libs


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _reactRedux = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
  var user = state.auth.user;


  return { user: user };
};

var PrivateRoute = (_dec = (0, _reactRedux.connect)(mapStateToProps), _dec(_class = function (_React$Component) {
  _inherits(PrivateRoute, _React$Component);

  function PrivateRoute(props) {
    _classCallCheck(this, PrivateRoute);

    return _possibleConstructorReturn(this, (PrivateRoute.__proto__ || Object.getPrototypeOf(PrivateRoute)).call(this, props));
  }

  _createClass(PrivateRoute, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          _render = _props.render,
          user = _props.user,
          rest = _objectWithoutProperties(_props, ['component', 'render', 'user']);

      return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, { render: function render(props) {
          return user ? component ? _react2.default.createElement(component, props) : _render ? _render(props) : null : _react2.default.createElement(_reactRouterDom.Redirect, { to: {
              pathname: '/login',
              state: { from: rest.location }
            } });
        } }));
    }
  }]);

  return PrivateRoute;
}(_react2.default.Component)) || _class);
exports.default = PrivateRoute;
module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _materialUi = __webpack_require__(12);

var _modeEdit = __webpack_require__(28);

var _modeEdit2 = _interopRequireDefault(_modeEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssociatedAddressesView = function AssociatedAddressesView(props) {
	var relatedTransactions = props.relatedTransactions,
	    isRefreshing = props.isRefreshing,
	    isDeleting = props.isDeleting,
	    triggerDialogModal = props.triggerDialogModal,
	    type = props.type,
	    onNicknameDialogOpen = props.onNicknameDialogOpen;

	var filteredTrx1 = _.filter(relatedTransactions, function (o) {
		return !_.isNil(o.associatedaddress);
	});
	var filteredTrx = _.uniqBy(filteredTrx1, 'associatedaddress.address');
	var cyan500 = 'rgba(0, 188, 212, 0.6)';

	return _react2.default.createElement(
		'div',
		{ className: 'box box-default table-box table-responsive mdl-shadow--2dp' },
		_react2.default.createElement(
			'table',
			{ className: 'mdl-data-table' },
			_react2.default.createElement(
				'thead',
				{ className: 'tbl-header' },
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						'Nickname'
					),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						'Address'
					),
					_react2.default.createElement('th', null)
				)
			),
			_react2.default.createElement(
				'tbody',
				{ className: 'tbl-body' },
				isRefreshing || isDeleting ? _react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '4', className: 'text-center' },
						_react2.default.createElement(_materialUi.CircularProgress, { size: 30, thickness: 3 })
					)
				) : filteredTrx && filteredTrx.length > 0 ? filteredTrx.map(function (transaction, index) {
					var _transaction$associat = transaction.associatedaddress,
					    id = _transaction$associat.id,
					    address = _transaction$associat.address,
					    nickName = _transaction$associat.nickName;


					return _react2.default.createElement(
						'tr',
						{ key: index },
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							nickName
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							address
						),
						_react2.default.createElement(
							'td',
							null,
							_react2.default.createElement(
								_materialUi.IconButton,
								{ onClick: onNicknameDialogOpen.bind(undefined, { id: id, address: address, oldNickname: nickName, type: type }) },
								_react2.default.createElement(_modeEdit2.default, { color: cyan500 })
							)
						)
					);
				}) : _react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '4', className: 'text-center' },
						'No associated addresses found.'
					)
				)
			)
		)
	);
};

// assets
// libs
exports.default = AssociatedAddressesView;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.meta = meta;

var _redux = __webpack_require__(29);

var _reduxForm = __webpack_require__(5);

var _reactRouterRedux = __webpack_require__(17);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _actions = __webpack_require__(10);

var ActionTypes = _interopRequireWildcard(_actions);

var _entities = __webpack_require__(172);

var _entities2 = _interopRequireDefault(_entities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Updates error message to notify about the failed fetches.
function errorMessage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];
  var type = action.type,
      error = action.error,
      payload = action.payload;


  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return payload || null;
  } else if (!error && payload && payload.message) {
    return payload || null;
  }

  return state;
}

function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { user: null };
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case ActionTypes.USER_LOGIN_SUCCESS:
      {
        return _extends({}, state, { user: payload.user.id });
      }
    /*case ActionTypes.USER_REGISTER_SUCCESS: {
      return {...state, user: payload.user.id}
    }*/
    case ActionTypes.USER_LOGOUT_SUCCESS:
      {
        return _extends({}, state, { user: null });
      }
    default:
      {
        return state;
      }
  }
}

function hashes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  return state;
}

function meta() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case ActionTypes.META_ALERT_BAR_HIDE:
      {
        return _extends({}, state, { showAlertBar: false });
      }
    case ActionTypes.META_ALERT_BAR_SHOW:
      {
        return _extends({}, state, { showAlertBar: true });
      }
    case ActionTypes.META_SEARCH_BAR_HIDE:
      {
        return _extends({}, state, { showSearchBar: false });
      }
    case ActionTypes.META_SEARCH_BAR_SHOW:
      {
        return _extends({}, state, { showSearchBar: true });
      }
    case ActionTypes.META_LOGO_LINK_SET:
      {
        return _extends({}, state, { logoLink: payload });
      }
    default:
      {
        return state;
      }
  }
}

var rootReducer = (0, _redux.combineReducers)({
  auth: auth,
  meta: meta,
  entities: _entities2.default,
  form: _reduxForm.reducer,
  errorMessage: errorMessage,
  hashes: hashes,
  routing: _reactRouterRedux.routerReducer
});

exports.default = rootReducer;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = exports.history = undefined;

var _createBrowserHistory = __webpack_require__(263);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reactRouterRedux = __webpack_require__(17);

var _ = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = exports.history = (0, _.isServer)() ? null : (0, _createBrowserHistory2.default)();

// src
var middleware = exports.middleware = (0, _.isServer)() ? function (store) {
  return function (next) {
    return function (action) {
      return next(action);
    };
  };
} : (0, _reactRouterRedux.routerMiddleware)(history);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config$mysql = _app2.default.mysql,
    username = _config$mysql.username,
    password = _config$mysql.password,
    multiStatement = _config$mysql.multiStatement,
    dbName = _config$mysql.dbName,
    host = _config$mysql.host,
    enableLogging = _config$mysql.enableLogging;
exports.default = { username: username, password: password, multiStatement: multiStatement, dbName: dbName, host: host, enableLogging: enableLogging };
module.exports = exports['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // libs


// src


var _express = __webpack_require__(23);

var _express2 = _interopRequireDefault(_express);

var _async = __webpack_require__(70);

var _async2 = _interopRequireDefault(_async);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _request = __webpack_require__(50);

var _request2 = _interopRequireDefault(_request);

var _blockexplorer = __webpack_require__(255);

var _blockexplorer2 = _interopRequireDefault(_blockexplorer);

var _isNil = __webpack_require__(269);

var _isNil2 = _interopRequireDefault(_isNil);

var _coinBaseUtils = __webpack_require__(202);

var _addressUtils = __webpack_require__(198);

var _utils = __webpack_require__(22);

var _UserProvider = __webpack_require__(47);

var _UserProvider2 = _interopRequireDefault(_UserProvider);

var _UserWallet = __webpack_require__(26);

var _UserWallet2 = _interopRequireDefault(_UserWallet);

var _UserAddress = __webpack_require__(33);

var _UserAddress2 = _interopRequireDefault(_UserAddress);

var _Transaction = __webpack_require__(25);

var _Transaction2 = _interopRequireDefault(_Transaction);

var _AssociatedAddress = __webpack_require__(18);

var _AssociatedAddress2 = _interopRequireDefault(_AssociatedAddress);

var _providerManager = __webpack_require__(64);

var _userProviderManager = __webpack_require__(196);

var _userWalletManager = __webpack_require__(197);

var _userAddressesManager = __webpack_require__(195);

var _transactionManager = __webpack_require__(66);

var _transactionTypeManager = __webpack_require__(67);

var _transactionImportManager = __webpack_require__(65);

var _associatedAddressManager = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/accounts/my-account-all-data', _utils.ensureAuthorization, function (req, res) {
	var user = req.user;


	Promise.all([(0, _providerManager.findAllProviderList)(), (0, _userProviderManager.findAllUserProviderList)(user.id), (0, _userAddressesManager.findAllUserAddresses)(user.id)]).then(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 3),
		    providerList = _ref2[0],
		    userProviderList = _ref2[1],
		    userAddressesList = _ref2[2];

		return res.send({ providerList: providerList, userProviderList: userProviderList, userAddressesList: userAddressesList });
	}).catch(function (error) {
		return (0, _utils.caughtError)(res, error);
	});
});

router.post('/api/accounts/my-account-connect-url', _utils.ensureAuthorization, function (req, res) {
	var body = req.body;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var providerId = body.providerId;

	if (!providerId) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	(0, _providerManager.findProviderByID)(providerId).then(function (providerObj) {
		if (providerObj) {
			if (providerId === 1) {
				res.status(200).send({
					redirecturl: (0, _coinBaseUtils.getCoinBaseRedirectURL)(providerObj, req)
				});
			}
		} else {
			(0, _utils.rejectRequest)('Provider not found', res);
			return;
		}
	});
});

router.post('/api/accounts/wallet-provider-callback', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var providerName = body.providerName,
	    tokenCode = body.tokenCode;

	if (!providerName) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	(0, _providerManager.findProviderByName)(providerName).then(function (providerObj) {
		if (providerObj) {
			if (providerObj.id === 1) {
				if (tokenCode) {
					var redirectURL = req.protocol + '://' + req.get('host') + providerObj.redirectUrl1;
					var headers = {
						'User-Agent': 'Super Agent/0.0.1',
						'Content-Type': 'application/json'

						// Configure the request
					};var options = {
						url: 'https://api.coinbase.com/oauth/token',
						method: 'POST',
						headers: headers,
						form: { 'code': tokenCode,
							'grant_type': providerObj.grantType,
							'client_id': providerObj.clientId,
							'client_secret': providerObj.clientSecret,
							'redirect_uri': redirectURL }

						// Start the request
					};(0, _request2.default)(options, function (error, response, responseBody) {
						if (!error && response.statusCode === 200) {
							// console.log('no errors')
							var access_token_string = responseBody.substring(responseBody.indexOf('access_token') + 15, responseBody.indexOf(',') - 1);
							var refresh_token_string = responseBody.substring(responseBody.indexOf('refresh_token') + 16);
							refresh_token_string = refresh_token_string.substring(0, refresh_token_string.indexOf(',') - 1);

							var Client = __webpack_require__(71).Client;
							var client = new Client({ 'accessToken': access_token_string, 'refreshToken': refresh_token_string });
							client.getCurrentUser(function (err, accountUser) {
								if (err && !accountUser) (0, _utils.caughtError)(res, err);else {
									_async2.default.waterfall([function (callback) {
										(0, _userProviderManager.findUserProviderByAccountName)(accountUser.id).then(function (userProvider) {
											if (userProvider) {
												userProvider.accessToken = access_token_string;
												userProvider.refreshToken = refresh_token_string;
												callback(null, userProvider);
											} else {
												var userProviderNew = _UserProvider2.default.build({ accountName: accountUser.id, accessToken: access_token_string, refreshToken: refresh_token_string });
												userProviderNew.setUser(user, { save: false });
												userProviderNew.setProvider(providerObj, { save: false });
												callback(null, userProviderNew);
											}
										});
									}, function (userProvider, callback) {
										(0, _userProviderManager.updateUserProvider)(userProvider).then(function (updatedUserProvider) {
											return callback(null, updatedUserProvider);
										});
									}, function (updatedUserProvider, callback) {
										client.getAccounts({}, function (err, accounts) {
											_async2.default.eachOfSeries(accounts, function (acct, key, nextCallback) {
												_async2.default.waterfall([function (callback) {
													(0, _userWalletManager.findUserWalletByWalletId)(acct.id).then(function (userWallet) {
														var currentDate = new Date();
														if (userWallet) {
															userWallet.walletName = acct.name;
															userWallet.walletType = acct.type;
															userWallet.balance = acct.balance.amount;
															userWallet.currency = acct.currency.code;
															userWallet.updatedWalletAt = currentDate;
															callback(userWallet);
														} else {
															var userWalletNew = _UserWallet2.default.build({ walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code, updatedWalletAt: currentDate });
															userWalletNew.setUserprovider(updatedUserProvider, { save: false });
															callback(userWalletNew);
														}
													});
												}], function (userWallet) {
													(0, _userWalletManager.updateUserWallet)(userWallet).then(function (updatedUserWallet) {
														acct.getTransactions({}, function (transactionsErr, txs) {
															if (txs && txs.length > 0) {
																_async2.default.eachOfSeries(txs, function (trans, key1, transCallback) {
																	(0, _transactionManager.findTransactionByTrxId)(trans.id).then(function (transactionObj) {
																		var trx_date = new Date(trans.created_at); // The 0 there is the key, which sets the date to the epoch
																		var moment_date = (0, _moment2.default)(trx_date).format("YYYY-MM-DD HH:MM:SS");
																		if (transactionObj) {
																			if (trans.type === 'exchange_deposit' || trans.type === 'exchange_withdrawal' || trans.type === 'send' || trans.type === 'fiat_deposit' || trans.type === 'fiat_withdrawal' || trans.type === 'buy') {
																				transactionObj.destination = trans.details.title + ' ' + trans.details.subtitle;
																				transactionObj.amount = trans.amount.amount;
																				transactionObj.asset = trans.amount.currency;
																				transactionObj.value = trans.native_amount.amount;
																				transactionObj.transactionDate = moment_date;
																				var transType = 2;
																				if (trans.type === 'exchange_withdrawal' || trans.type === 'fiat_withdrawal' || trans.type === 'buy' || trans.type === 'send' && (0, _isNil2.default)(trans.to)) {
																					transType = 3;
																				}
																				(0, _transactionTypeManager.findTransactionTypeById)(transType).then(function (transactionTypeObj) {
																					transactionObj.setTransactiontype(transactionTypeObj, { save: false });
																					(0, _transactionImportManager.findTrxImportTypeById)(1).then(function (trxImportTypeObj) {
																						transactionObj.setTransactionimporttype(trxImportTypeObj, { save: false });
																						if (trans.type === 'send' && !(0, _isNil2.default)(trans.to) && !(0, _isNil2.default)(trans.to.address)) {
																							(0, _associatedAddressManager.findAssociatedAddByAdd)(trans.to.address).then(function (associatedAddObj) {
																								if (associatedAddObj) {
																									transactionObj.setAssociatedaddress(associatedAddObj, { save: false });
																									(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																										transCallback();
																									});
																								} else {
																									var associatedAddNew = _AssociatedAddress2.default.build({ address: trans.to.address, nickName: trans.to.address });
																									(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
																										transactionObj.setAssociatedaddress(updatedAssociatedAdd, { save: false });
																										(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																											transCallback();
																										});
																									});
																								}
																							});
																						} else {
																							(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																								transCallback();
																							});
																						}
																					});
																				});
																			} else {
																				transCallback();
																			}
																		} else {
																			if (trans.type === 'exchange_deposit' || trans.type === 'exchange_withdrawal' || trans.type === 'send' || trans.type === 'fiat_deposit' || trans.type === 'fiat_withdrawal' || trans.type === 'buy') {
																				var transactionNew = _Transaction2.default.build({ trxId: trans.id, destination: trans.details.title + ' ' + trans.details.subtitle, transactionDate: moment_date, amount: trans.amount.amount, asset: trans.amount.currency, value: trans.native_amount.amount });
																				transactionNew.setUser(user, { save: false });
																				transactionNew.setUserwallet(updatedUserWallet, { save: false });
																				(0, _transactionTypeManager.findTransactionTypeById)(2).then(function (transactionTypeObj) {
																					var transType = 2;
																					if (trans.type === 'exchange_withdrawal' || trans.type === 'fiat_withdrawal' || trans.type === 'buy' || trans.type === 'send' && (0, _isNil2.default)(trans.to)) {
																						transType = 3;
																					}
																					(0, _transactionTypeManager.findTransactionTypeById)(transType);
																					transactionNew.setTransactiontype(transactionTypeObj, { save: false });
																					(0, _transactionImportManager.findTrxImportTypeById)(1).then(function (trxImportTypeObj) {
																						transactionNew.setTransactionimporttype(trxImportTypeObj, { save: false });
																						if (trans.type === 'send' && !(0, _isNil2.default)(trans.to) && !(0, _isNil2.default)(trans.to.address)) {
																							(0, _associatedAddressManager.findAssociatedAddByAdd)(trans.to.address).then(function (associatedAddObj) {
																								if (associatedAddObj) {
																									transactionNew.setAssociatedaddress(associatedAddObj, { save: false });
																									(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																										transCallback();
																									});
																								} else {
																									var associatedAddNew = _AssociatedAddress2.default.build({ address: trans.to.address, nickName: trans.to.address });
																									(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
																										transactionNew.setAssociatedaddress(updatedAssociatedAdd, { save: false });
																										(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																											transCallback();
																										});
																									});
																								}
																							});
																						} else {
																							(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																								transCallback();
																							});
																						}
																					});
																				});
																			} else {
																				transCallback();
																			}
																		}
																	});
																}, function (err) {
																	nextCallback();
																});
															} else {
																nextCallback();
															}
														});
													});
												});
											}, function (err) {
												callback(null, 'some parameter');
											});
										});
									}], function (err, args1) {
										res.status(200).send({
											message: 'UserProvider inserted'
										});
									});
								}
							});
						} else {
							res.status(200).send({
								message: 'Something went wrong, Please try again'
							});
							return;
						}
					});
				}
			}
		} else {
			(0, _utils.rejectRequest)('Provider not found', res);
			return;
		}
	});
});

router.post('/api/accounts/delete-userprovider-wallet', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var userWalletId = body.userWalletId;

	if (!userWalletId) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	(0, _userWalletManager.deleteUserWalletById)(userWalletId).then(function (result) {
		if (result) {
			(0, _userProviderManager.findAllUserProviderList)(user.id).then(function (userProviderList) {
				res.status(200).send({
					userProviderList: userProviderList
				});
			});
		} else {
			(0, _utils.rejectRequest)('Something went wrong, Please try again', res);
			return;
		}
	});
});

router.post('/api/accounts/refresh-userproviders', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var userProviderId = body.userProviderId;

	if (!userProviderId) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	(0, _userProviderManager.findUserProviderByID)(userProviderId).then(function (userProviderObj) {
		var Client = __webpack_require__(71).Client;
		var client = new Client({ 'accessToken': userProviderObj.accessToken, 'refreshToken': userProviderObj.refreshToken });
		client.getAccounts({}, function (err, accounts) {
			if (err) {
				console.log('err : ' + err);
				if (err === 'RevokedToken: The access token was revoked') {
					var redirectURL = (0, _coinBaseUtils.getCoinBaseRedirectURL)(userProviderObj.provider, req);
					res.status(200).send({
						redirecturl: redirectURL
					});
				} else {
					// Configure the request
					var headers = {
						'User-Agent': 'Super Agent/0.0.1',
						'Content-Type': 'application/json'
					};

					var options = {
						url: 'https://api.coinbase.com/oauth/token',
						method: 'POST',
						headers: headers,
						form: { 'grant_type': 'refresh_token',
							'client_id': userProviderObj.provider.clientId,
							'client_secret': userProviderObj.provider.clientSecret,
							'refresh_token': userProviderObj.refreshToken }

						// Start the request
					};(0, _request2.default)(options, function (error, response, responseBody) {
						if (!error && response.statusCode === 200) {
							var access_token_string = responseBody.substring(responseBody.indexOf('access_token') + 15, responseBody.indexOf(',') - 1);
							var refresh_token_string = responseBody.substring(responseBody.indexOf('refresh_token') + 16);
							refresh_token_string = refresh_token_string.substring(0, refresh_token_string.indexOf(',') - 1);

							userProviderObj.accessToken = access_token_string;
							userProviderObj.refreshToken = refresh_token_string;

							(0, _userProviderManager.updateUserProvider)(userProviderObj).then(function (updatedUserProvider) {
								client = new Client({ 'accessToken': updatedUserProvider.accessToken, 'refreshToken': updatedUserProvider.refreshToken });
								client.getAccounts({}, function (err, accounts) {
									_async2.default.eachOfSeries(accounts, function (acct, key, nextCallback) {
										_async2.default.waterfall([function (callback) {
											(0, _userWalletManager.findUserWalletByWalletId)(acct.id).then(function (userWallet) {
												var currentDate = new Date();
												if (userWallet) {
													userWallet.walletName = acct.name;
													userWallet.walletType = acct.type;
													userWallet.balance = acct.balance.amount;
													userWallet.currency = acct.currency.code;
													userWallet.updatedWalletAt = currentDate;
													callback(null, userWallet, acct);
												} else {
													var userWalletNew = _UserWallet2.default.build({ walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code, updatedWalletAt: currentDate });
													userWalletNew.setUserprovider(userProviderObj, { save: false });
													callback(null, userWalletNew, acct);
												}
											});
										}], function (err, userWallet, acct) {
											(0, _userWalletManager.updateUserWallet)(userWallet).then(function (updatedUserWallet) {
												acct.getTransactions({}, function (transactionsErr, txs) {
													if (txs && txs.length > 0) {
														_async2.default.eachOfSeries(txs, function (trans, transIndex, transCallback) {
															(0, _transactionManager.findTransactionByTrxId)(trans.id).then(function (transactionObj) {
																var trx_date = new Date(trans.created_at); // The 0 there is the key, which sets the date to the epoch
																var moment_date = (0, _moment2.default)(trx_date).format("YYYY-MM-DD HH:MM:SS");
																if (transactionObj) {
																	if (trans.type === 'exchange_deposit' || trans.type === 'exchange_withdrawal' || trans.type === 'send' || trans.type === 'fiat_deposit' || trans.type === 'fiat_withdrawal' || trans.type === 'buy') {
																		transactionObj.destination = trans.details.title + ' ' + trans.details.subtitle;
																		transactionObj.amount = trans.amount.amount;
																		transactionObj.asset = trans.amount.currency;
																		transactionObj.value = trans.native_amount.amount;
																		transactionObj.transactionDate = moment_date;
																		var transType = 2;
																		if (trans.type === 'exchange_withdrawal' || trans.type === 'fiat_withdrawal' || trans.type === 'buy' || trans.type === 'send' && (0, _isNil2.default)(trans.to)) {
																			transType = 3;
																		}
																		(0, _transactionTypeManager.findTransactionTypeById)(transType).then(function (transactionTypeObj) {
																			transactionObj.setTransactiontype(transactionTypeObj, { save: false });
																			(0, _transactionImportManager.findTrxImportTypeById)(1).then(function (trxImportTypeObj) {
																				transactionObj.setTransactionimporttype(trxImportTypeObj, { save: false });
																				if (trans.type === 'send' && !(0, _isNil2.default)(trans.to) && !(0, _isNil2.default)(trans.to.address)) {
																					(0, _associatedAddressManager.findAssociatedAddByAdd)(trans.to.address).then(function (associatedAddObj) {
																						if (associatedAddObj) {
																							transactionObj.setAssociatedaddress(associatedAddObj, { save: false });
																							(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																								transCallback();
																							});
																						} else {
																							var associatedAddNew = _AssociatedAddress2.default.build({ address: trans.to.address, nickName: trans.to.address });
																							(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
																								transactionObj.setAssociatedaddress(updatedAssociatedAdd, { save: false });
																								(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																									transCallback();
																								});
																							});
																						}
																					});
																				} else {
																					(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																						transCallback();
																					});
																				}
																			});
																		});
																	} else {
																		transCallback();
																	}
																} else {
																	if (trans.type === 'exchange_deposit' || trans.type === 'exchange_withdrawal' || trans.type === 'send' || trans.type === 'fiat_deposit' || trans.type === 'fiat_withdrawal' || trans.type === 'buy') {
																		var transactionNew = _Transaction2.default.build({ trxId: trans.id, destination: trans.details.title + ' ' + trans.details.subtitle, transactionDate: moment_date, amount: trans.amount.amount, asset: trans.amount.currency, value: trans.native_amount.amount });
																		transactionNew.setUser(user, { save: false });
																		transactionNew.setUserwallet(updatedUserWallet, { save: false });

																		var _transType = 2;
																		if (trans.type === 'exchange_withdrawal' || trans.type === 'fiat_withdrawal' || trans.type === 'buy' || trans.type === 'send' && (0, _isNil2.default)(trans.to)) {
																			_transType = 3;
																		}

																		(0, _transactionTypeManager.findTransactionTypeById)(_transType).then(function (transactionTypeObj) {
																			transactionNew.setTransactiontype(transactionTypeObj, { save: false });
																			(0, _transactionImportManager.findTrxImportTypeById)(1).then(function (trxImportTypeObj) {
																				transactionNew.setTransactionimporttype(trxImportTypeObj, { save: false });
																				if (trans.type === 'send' && !(0, _isNil2.default)(trans.to) && !(0, _isNil2.default)(trans.to.address)) {
																					(0, _associatedAddressManager.findAssociatedAddByAdd)(trans.to.address).then(function (associatedAddObj) {
																						if (associatedAddObj) {
																							transactionNew.setAssociatedaddress(associatedAddObj, { save: false });
																							(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																								transCallback();
																							});
																						} else {
																							var associatedAddNew = _AssociatedAddress2.default.build({ address: trans.to.address, nickName: trans.to.address });
																							(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
																								transactionNew.setAssociatedaddress(updatedAssociatedAdd, { save: false });
																								(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																									transCallback();
																								});
																							});
																						}
																					});
																				} else {
																					(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																						transCallback();
																					});
																				}
																			});
																		});
																	} else {
																		transCallback();
																	}
																}
															});
														}, function (err) {
															nextCallback();
														});
													} else {
														console.log('transaction length is less*******************************');
														nextCallback();
													}
												});
											});
										});
									}, function (err) {
										(0, _userProviderManager.findAllUserProviderList)(user.id).then(function (userProviderList) {
											res.status(200).send({
												userProviderList: userProviderList
											});
										});
										return;
									});
								});
							});
						}
					});
				}
			} else {
				_async2.default.eachOfSeries(accounts, function (acct, key, nextCallback) {
					_async2.default.waterfall([function (callback) {
						(0, _userWalletManager.findUserWalletByWalletId)(acct.id).then(function (userWallet) {
							var currentDate = new Date();
							if (userWallet) {
								userWallet.walletName = acct.name;
								userWallet.walletType = acct.type;
								userWallet.balance = acct.balance.amount;
								userWallet.currency = acct.currency.code;
								userWallet.updatedWalletAt = currentDate;
								callback(null, userWallet, acct);
							} else {
								var userWalletNew = _UserWallet2.default.build({ walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code, updatedWalletAt: currentDate });
								userWalletNew.setUserprovider(userProviderObj, { save: false });
								callback(null, userWalletNew, acct);
							}
						});
					}], function (err, userWallet, acct) {
						(0, _userWalletManager.updateUserWallet)(userWallet).then(function (updatedUserWallet) {
							acct.getTransactions({}, function (transactionsErr, txs) {
								if (txs && txs.length > 0) {
									_async2.default.eachOfSeries(txs, function (trans, transIndex, transCallback) {
										(0, _transactionManager.findTransactionByTrxId)(trans.id).then(function (transactionObj) {
											var trx_date = new Date(trans.created_at); // The 0 there is the key, which sets the date to the epoch
											var moment_date = (0, _moment2.default)(trx_date).format("YYYY-MM-DD HH:MM:SS");
											if (transactionObj) {
												if (trans.type === 'exchange_deposit' || trans.type === 'exchange_withdrawal' || trans.type === 'send' || trans.type === 'fiat_deposit' || trans.type === 'fiat_withdrawal' || trans.type === 'buy') {
													transactionObj.destination = trans.details.title + ' ' + trans.details.subtitle;
													transactionObj.amount = trans.amount.amount;
													transactionObj.asset = trans.amount.currency;
													transactionObj.value = trans.native_amount.amount;
													transactionObj.transactionDate = moment_date;
													var transType = 2;
													if (trans.type === 'exchange_withdrawal' || trans.type === 'fiat_withdrawal' || trans.type === 'buy' || trans.type === 'send' && (0, _isNil2.default)(trans.to)) {
														transType = 3;
													}
													(0, _transactionTypeManager.findTransactionTypeById)(transType).then(function (transactionTypeObj) {
														transactionObj.setTransactiontype(transactionTypeObj, { save: false });
														(0, _transactionImportManager.findTrxImportTypeById)(1).then(function (trxImportTypeObj) {
															transactionObj.setTransactionimporttype(trxImportTypeObj, { save: false });
															if (trans.type === 'send' && !(0, _isNil2.default)(trans.to) && !(0, _isNil2.default)(trans.to.address)) {
																(0, _associatedAddressManager.findAssociatedAddByAdd)(trans.to.address).then(function (associatedAddObj) {
																	if (associatedAddObj) {
																		transactionObj.setAssociatedaddress(associatedAddObj, { save: false });
																		(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																			transCallback();
																		});
																	} else {
																		var associatedAddNew = _AssociatedAddress2.default.build({ address: trans.to.address, nickName: trans.to.address });
																		(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
																			transactionObj.setAssociatedaddress(updatedAssociatedAdd, { save: false });
																			(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																				transCallback();
																			});
																		});
																	}
																});
															} else {
																(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
																	transCallback();
																});
															}
														});
													});
												} else {
													transCallback();
												}
											} else {
												if (trans.type === 'exchange_deposit' || trans.type === 'exchange_withdrawal' || trans.type === 'send' || trans.type === 'fiat_deposit' || trans.type === 'fiat_withdrawal' || trans.type === 'buy') {
													var transactionNew = _Transaction2.default.build({ trxId: trans.id, destination: trans.details.title + ' ' + trans.details.subtitle, transactionDate: moment_date, amount: trans.amount.amount, asset: trans.amount.currency, value: trans.native_amount.amount });
													transactionNew.setUser(user, { save: false });
													transactionNew.setUserwallet(updatedUserWallet, { save: false });

													var _transType2 = 2;
													if (trans.type === 'exchange_withdrawal' || trans.type === 'fiat_withdrawal' || trans.type === 'buy' || trans.type === 'send' && (0, _isNil2.default)(trans.to)) {
														_transType2 = 3;
													}

													(0, _transactionTypeManager.findTransactionTypeById)(_transType2).then(function (transactionTypeObj) {
														transactionNew.setTransactiontype(transactionTypeObj, { save: false });
														(0, _transactionImportManager.findTrxImportTypeById)(1).then(function (trxImportTypeObj) {
															transactionNew.setTransactionimporttype(trxImportTypeObj, { save: false });
															if (trans.type === 'send' && !(0, _isNil2.default)(trans.to) && !(0, _isNil2.default)(trans.to.address)) {
																(0, _associatedAddressManager.findAssociatedAddByAdd)(trans.to.address).then(function (associatedAddObj) {
																	if (associatedAddObj) {
																		transactionNew.setAssociatedaddress(associatedAddObj, { save: false });
																		(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																			transCallback();
																		});
																	} else {
																		var associatedAddNew = _AssociatedAddress2.default.build({ address: trans.to.address, nickName: trans.to.address });
																		(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
																			transactionNew.setAssociatedaddress(updatedAssociatedAdd, { save: false });
																			(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																				transCallback();
																			});
																		});
																	}
																});
															} else {
																(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
																	transCallback();
																});
															}
														});
													});
												} else {
													transCallback();
												}
											}
										});
									}, function (err) {
										nextCallback();
									});
								} else {
									nextCallback();
								}
							});
						});
					});
				}, function (err) {
					(0, _userProviderManager.findAllUserProviderList)(user.id).then(function (userProviderList) {
						res.status(200).send({
							userProviderList: userProviderList
						});
					});
					return;
				});
			}
		});
	});
});

function insertTransactions(transactionArr, index, done, userObj, userAddressObj) {
	if (index === transactionArr.length) {
		done();
	} else {
		var transaction = transactionArr[index];
		(0, _transactionManager.findTransactionByTrxId)(transaction.tx_index).then(function (transactionObj) {
			// console.log('inside promise************************')
			var utcSeconds = transaction.time;
			var trx_date = new Date(utcSeconds * 1000); // The 0 there is the key, which sets the date to the epoch
			var moment_date = (0, _moment2.default)(trx_date).format("YYYY-MM-DD HH:MM:SS");

			var transaction_Input_Arr = transaction.inputs;
			var transType = 2;
			transaction_Input_Arr.forEach(function (trx_input, j) {
				if (trx_input.prev_out.addr !== userAddressObj.address) {
					transType = 3;
				}
			});

			var transaction_Out_Arr = transaction.out;
			var myAssociateAdd = '';
			var transAmount = '';
			transaction_Out_Arr.forEach(function (trx_out, j) {
				if (trx_out.addr !== userAddressObj.address) {
					myAssociateAdd = trx_out.addr;
				} else if (trx_out.addr === userAddressObj.address && transType === 3) {
					transAmount = trx_out.value;
				}
			});

			if (transactionObj) {
				transactionObj.transactionDate = moment_date;
				transactionObj.amount = transAmount;
				transactionObj.asset = userAddressObj.currency;
				(0, _transactionTypeManager.findTransactionTypeById)(transType).then(function (transactionTypeObj) {
					transactionObj.setTransactiontype(transactionTypeObj, { save: false });
					(0, _transactionImportManager.findTrxImportTypeById)(2).then(function (trxImportTypeObj) {
						transactionObj.setTransactionimporttype(trxImportTypeObj, { save: false });
						if (myAssociateAdd) {
							(0, _associatedAddressManager.findAssociatedAddByAdd)(myAssociateAdd).then(function (associatedAddObj) {
								if (associatedAddObj) {
									transactionObj.setAssociatedaddress(associatedAddObj, { save: false });
									(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
										insertTransactions(transactionArr, ++index, done, userObj, userAddressObj);
									});
								} else {
									var associatedAddNew = _AssociatedAddress2.default.build({ address: myAssociateAdd, nickName: myAssociateAdd });
									(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
										transactionObj.setAssociatedaddress(updatedAssociatedAdd, { save: false });
										(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
											insertTransactions(transactionArr, ++index, done, userObj, userAddressObj);
										});
									});
								}
							});
						} else {
							transactionObj.destination = userAddressObj.address;
							(0, _transactionManager.updateTransaction)(transactionObj).then(function () {
								insertTransactions(transactionArr, ++index, done, userObj, userAddressObj);
							});
						}
					});
				});
			} else {
				var transactionNew = _Transaction2.default.build({ trxId: transaction.tx_index, transactionDate: moment_date, amount: transAmount, asset: userAddressObj.currency });
				transactionNew.setUser(userObj, { save: false });
				transactionNew.setUseraddress(userAddressObj, { save: false });
				(0, _transactionTypeManager.findTransactionTypeById)(transType).then(function (transactionTypeObj) {
					transactionNew.setTransactiontype(transactionTypeObj, { save: false });
					(0, _transactionImportManager.findTrxImportTypeById)(2).then(function (trxImportTypeObj) {
						transactionNew.setTransactionimporttype(trxImportTypeObj, { save: false });
						if (myAssociateAdd) {
							(0, _associatedAddressManager.findAssociatedAddByAdd)(myAssociateAdd).then(function (associatedAddObj) {
								if (associatedAddObj) {
									transactionNew.setAssociatedaddress(associatedAddObj, { save: false });
									(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
										insertTransactions(transactionArr, ++index, done, userObj, userAddressObj);
									});
								} else {
									var associatedAddNew = _AssociatedAddress2.default.build({ address: myAssociateAdd, nickName: myAssociateAdd });
									(0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
										transactionNew.setAssociatedaddress(updatedAssociatedAdd, { save: false });
										(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
											insertTransactions(transactionArr, ++index, done, userObj, userAddressObj);
										});
									});
								}
							});
						} else {
							transactionNew.destination = userAddressObj.address;
							(0, _transactionManager.updateTransaction)(transactionNew).then(function () {
								insertTransactions(transactionArr, ++index, done, userObj, userAddressObj);
							});
						}
					});
				});
			}
		});
	}
}

router.post('/api/accounts/user-addresses-insert', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var coinAddresses = body.coinAddresses;

	if (!coinAddresses) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	var addressArray = coinAddresses.toString().split(',');
	var inValidAddresses = new Array();

	_async2.default.eachOfSeries(addressArray, function (coinAddress, index, nextAddCallback) {
		(0, _addressUtils.addressInfo)(coinAddress).then(function (addressObj) {
			if (addressObj.isValid) {
				_async2.default.waterfall([function (callback) {
					(0, _userAddressesManager.findUserAddressByAddress)(user.id, coinAddress).then(function (userAddress) {
						if (userAddress) {
							userAddress.balance = addressObj.balance;
							callback(null, userAddress);
						} else {
							var userAddressNew = _UserAddress2.default.build({ address: coinAddress, nickName: coinAddress, balance: addressObj.balance, currency: addressObj.addressType });
							userAddressNew.setUser(user, { save: false });
							callback(null, userAddressNew);
						}
					});
				}, function (userAddress, callback) {
					(0, _userAddressesManager.updateUserAddress)(userAddress).then(function (updatedUserAddress) {
						callback(null, updatedUserAddress);
					});
				}, function (userAddress, callback) {
					if (addressObj.addressType === 'BTC') {
						_blockexplorer2.default.getAddress(coinAddress).then(function (address) {
							var transIndex = 0;
							var transactionArr = address.txs;
							insertTransactions(transactionArr, transIndex, callback, user, userAddress);
						});
					} else {
						callback();
					}
				}], function () {
					nextAddCallback();
				});
			} else {
				inValidAddresses.push(coinAddress);
				nextAddCallback();
			}
		});
	}, function (err) {
		if (err) {
			(0, _utils.rejectRequest)('Failed to process addresses, please try again', res);
		} else {
			if (addressArray.length === inValidAddresses.length) {
				(0, _userAddressesManager.findAllUserAddresses)(user.id).then(function (userAddressesList) {
					res.status(200).send({
						userAddressesList: userAddressesList,
						message: 'Invalid Addresses'
					});
				});
			} else {
				(0, _userAddressesManager.findAllUserAddresses)(user.id).then(function (userAddressesList) {
					res.status(200).send({
						userAddressesList: userAddressesList
					});
				});
			}
		}
	});
});

router.post('/api/accounts/user-addresses-refresh', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var userAddressId = body.userAddressId;

	if (!userAddressId) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	_async2.default.waterfall([function (callback) {
		(0, _userAddressesManager.findUserAddressById)(userAddressId).then(function (userAddress) {
			(0, _addressUtils.addressInfo)(userAddress.address).then(function (address) {
				userAddress.balance = address.final_balance;
				callback(null, userAddress, address);
			}).catch(function (error) {
				return (0, _utils.caughtError)(res, error);
			});
		});
	}, function (userAddress, address, callback) {
		(0, _userAddressesManager.updateUserAddress)(userAddress).then(function (updatedUserAddress) {
			return callback(null, updatedUserAddress, address);
		});
	}, function (userAddress, address, callback) {
		if (address.addressType === 'BTC') {
			_blockexplorer2.default.getAddress(userAddress.address).then(function (addressObj) {
				var transIndex = 0;
				var transactionArr = addressObj.txs;
				insertTransactions(transactionArr, transIndex, callback, user, userAddress);
			});
		} else {
			callback();
		}
	}], function () {
		(0, _userAddressesManager.findAllUserAddresses)(user.id).then(function (userAddressesList) {
			res.status(200).send({
				userAddressesList: userAddressesList
			});
		});
	});
});

router.post('/api/accounts/user-address-delete', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var userAddressId = body.userAddressId;

	if (!userAddressId) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	(0, _userAddressesManager.deleteUserAddressById)(userAddressId).then(function () {
		(0, _userAddressesManager.findAllUserAddresses)(user.id).then(function (userAddressesList) {
			res.status(200).send({
				userAddressesList: userAddressesList
			});
		});
	});
});

router.post('/api/accounts/user-address-update', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;


	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var userAddressId = body.userAddressId,
	    userAddressNickName = body.userAddressNickName;

	if (!userAddressId || !userAddressNickName) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}
	(0, _userAddressesManager.findUserAddressById)(userAddressId).then(function (userAddress) {
		if (userAddress) {
			userAddress.nickName = userAddressNickName;
			(0, _userAddressesManager.updateUserAddress)(userAddress).then(function () {
				(0, _userAddressesManager.findAllUserAddresses)(user.id).then(function (userAddressesList) {
					res.status(200).send({
						userAddressesList: userAddressesList
					});
				});
			});
		} else {
			(0, _utils.rejectRequest)('Address not found', res);
			return;
		}
	});
});

router.post('/api/accounts/associated-myaddress-update', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var associatedAddId = body.associatedAddId,
	    associatedAddNick = body.associatedAddNick;

	if (!associatedAddId || !associatedAddNick) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	(0, _associatedAddressManager.findAssociatedAddById)(associatedAddId).then(function (associatedAdd) {
		if (associatedAdd) {
			associatedAdd.nickName = associatedAddNick;
			(0, _associatedAddressManager.updateAssociatedAdd)(associatedAdd).then(function () {
				(0, _userAddressesManager.findAllUserAddresses)(user.id).then(function (userAddressesList) {
					res.status(200).send({
						userAddressesList: userAddressesList
					});
				});
			});
		} else {
			(0, _utils.rejectRequest)('Address not found', res);
			return;
		}
	});
});

router.post('/api/accounts/associated-walletaddress-update', _utils.ensureAuthorization, function (req, res) {
	var body = req.body,
	    user = req.user;

	if (!body) {
		(0, _utils.rejectRequest)('Missing request body', res);
		return;
	}

	var associatedAddId = body.associatedAddId,
	    associatedAddNick = body.associatedAddNick;

	if (!associatedAddId || !associatedAddNick) {
		(0, _utils.rejectRequest)('Missing required arguments', res);
		return;
	}

	(0, _associatedAddressManager.findAssociatedAddById)(associatedAddId).then(function (associatedAdd) {
		if (associatedAdd) {
			associatedAdd.nickName = associatedAddNick;
			(0, _associatedAddressManager.updateAssociatedAdd)(associatedAdd).then(function () {
				(0, _userProviderManager.findAllUserProviderList)(user.id).then(function (userProviderList) {
					res.status(200).send({
						userProviderList: userProviderList
					});
				});
			});
		} else {
			(0, _utils.rejectRequest)('Address not found', res);
			return;
		}
	});
});

exports.default = router;
module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorUtils = __webpack_require__(34);

var _errorUtils2 = _interopRequireDefault(_errorUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = function get(req, res, manager) {
  var id = req.params.id;
  var promise = null;
  var resultCount = 0;
  var offset = parseInt(req.query.offset || 0);
  var limit = parseInt(req.query.limit || 15);

  if (null == id) {
    promise = manager.count().then(function (count) {
      resultCount = count;
      return manager.findAll({ offset: offset, limit: limit });
    });
  } else promise = manager.findById(id);

  promise.then(function (result) {
    var response = null == id ? { offset: offset, count: limit, totalCount: resultCount, list: result } : result;
    res.send(response);
  }).catch(function (error) {
    return _errorUtils2.default.caughtError(res, error);
  });
};

exports.default = {
  get: get
};
module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(23);

var _express2 = _interopRequireDefault(_express);

var _walletAddressValidator = __webpack_require__(293);

var _walletAddressValidator2 = _interopRequireDefault(_walletAddressValidator);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _async = __webpack_require__(70);

var _async2 = _interopRequireDefault(_async);

var _Transaction = __webpack_require__(25);

var _Transaction2 = _interopRequireDefault(_Transaction);

var _AssociatedAddress = __webpack_require__(18);

var _AssociatedAddress2 = _interopRequireDefault(_AssociatedAddress);

var _utils = __webpack_require__(22);

var _transactionManager = __webpack_require__(66);

var _transactionTypeManager = __webpack_require__(67);

var _transactionImportManager = __webpack_require__(65);

var _associatedAddressManager = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// src
// libs


router.post('/api/transactions/transaction-data', _utils.ensureAuthorization, function (req, res) {
  console.log('/api/transactions/transaction-data called.');
  var body = req.body,
      user = req.user;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var listingParameters = body.listingParameters;

  if (!listingParameters) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  var trxType = 'Sale';
  if (listingParameters.trxType) trxType = listingParameters.trxType;

  var searchParam = '';
  if (listingParameters.queryString) searchParam = listingParameters.queryString;

  var startDate = '';
  if (listingParameters.startDate) {
    var start_date = new Date(listingParameters.startDate);
    var moment_start_date = (0, _moment2.default)(start_date).format("YYYY-MM-DD HH:MM:SS");
    startDate = moment_start_date;
  }

  var endDate = '';
  if (listingParameters.endDate) {
    var end_date = new Date(listingParameters.endDate);
    var moment_end_date = (0, _moment2.default)(end_date).format("YYYY-MM-DD HH:MM:SS");
    endDate = moment_end_date;
  }

  var limit = 10;
  if (listingParameters.limit) limit = listingParameters.limit;

  var offset = 0;
  if (listingParameters.offset) offset = listingParameters.offset;

  // let orderBy = 'transactionimporttype.import_type_name,useraddress.nick_name,userwallet.wallet_name'
  var orderBy = 'transactionDate';
  if (listingParameters.orderBy) orderBy = listingParameters.orderBy;

  var orderWay = 'DESC';
  if (listingParameters.orderWay) orderWay = listingParameters.orderWay;

  var orderbyArray = orderBy.toString().split(',');
  var order = '';
  _async2.default.eachOfSeries(orderbyArray, function (ordering, index, nextAddCallback) {
    order += ordering + ' ' + orderWay + ', ';
    nextAddCallback();
  });
  order = order.substring(0, order.length - 2);
  console.log('order : ' + order);

  if (searchParam && startDate && endDate) {
    console.log('searchParam : ' + searchParam + ' AND startDate : ' + startDate + ' AND endDate : ' + endDate);
    (0, _transactionManager.findTransactionsBySearchTextDate)(user.id, trxType, searchParam, startDate, endDate, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  } else if (searchParam && startDate) {
    console.log('searchParam : ' + searchParam + ' AND startDate : ' + startDate);
    (0, _transactionManager.findTransactionsBySearchTextStartDate)(user.id, trxType, searchParam, startDate, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  } else if (searchParam && endDate) {
    console.log('searchParam : ' + searchParam + ' AND endDate : ' + endDate);
    (0, _transactionManager.findTransactionsBySearchTextEndDate)(user.id, trxType, searchParam, endDate, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  } else if (startDate && endDate) {
    console.log('startDate : ' + startDate + ' AND endDate : ' + endDate);
    (0, _transactionManager.findTransactionsBySearchDate)(user.id, trxType, startDate, endDate, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  } else if (searchParam) {
    console.log('searchParam : ' + searchParam);
    (0, _transactionManager.findTransactionsBySearchText)(user.id, trxType, searchParam, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  } else if (startDate) {
    console.log('startDate : ' + startDate);
    (0, _transactionManager.findTransactionsBySearchStartDate)(user.id, trxType, startDate, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  } else if (endDate) {
    console.log('endDate : ' + endDate);
    (0, _transactionManager.findTransactionsBySearchEndDate)(user.id, trxType, endDate, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  } else {
    console.log('else default listing.');
    (0, _transactionManager.findTransactionsByUserId)(user.id, trxType, order, limit, offset).then(function (transactionList) {
      res.status(200).send({
        transactionList: transactionList,
        trxType: trxType
      });
    });
  }
});

router.post('/api/transactions/insert-transaction', _utils.ensureAuthorization, function (req, res) {
  console.log('/api/transactions/insert-transaction');
  var body = req.body,
      user = req.user;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var trxData = body.trxData,
      listingParameters = body.listingParameters;

  if (!trxData || !listingParameters) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  var limit = 10;
  if (listingParameters.limit) limit = listingParameters.limit;

  var offset = 0;
  if (listingParameters.offset) offset = listingParameters.offset;

  var transactionDate = trxData.transactionDate,
      destination = trxData.destination,
      note = trxData.note,
      amount = trxData.amount,
      asset = trxData.asset,
      value = trxData.value,
      transactionTypeId = trxData.transactionTypeId;

  var trx_date = new Date(transactionDate);
  var moment_date = (0, _moment2.default)(trx_date).format("YYYY-MM-DD HH:MM:SS");

  var transactionObj = _Transaction2.default.build({ destination: destination, note: note, transactionDate: moment_date, amount: amount, asset: asset, value: value });
  transactionObj.setUser(user, { save: false });
  (0, _transactionTypeManager.findTransactionTypeById)(transactionTypeId).then(function (transactionTypeObj) {
    transactionObj.setTransactiontype(transactionTypeObj, { save: false });
    (0, _transactionImportManager.findTrxImportTypeById)(4).then(function (trxImportTypeObj) {
      transactionObj.setTransactionimporttype(trxImportTypeObj, { save: false });
      if (_walletAddressValidator2.default.validate(destination)) {
        (0, _associatedAddressManager.findAssociatedAddByAdd)(destination).then(function (associatedAddObj) {
          if (associatedAddObj) {
            transactionObj.setAssociatedaddress(associatedAddObj, { save: false });
            (0, _transactionManager.updateTransaction)(transactionObj).then(function () {
              (0, _transactionManager.findTransactionsByUserId)(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset).then(function (transactionList) {
                res.status(200).send({
                  transactionList: transactionList
                });
              });
            });
          } else {
            var associatedAddNew = _AssociatedAddress2.default.build({ address: destination, nickName: destination });
            (0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
              transactionObj.setAssociatedaddress(updatedAssociatedAdd, { save: false });
              (0, _transactionManager.updateTransaction)(transactionObj).then(function () {
                (0, _transactionManager.findTransactionsByUserId)(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset).then(function (transactionList) {
                  res.status(200).send({
                    transactionList: transactionList
                  });
                });
              });
            });
          }
        });
      } else {
        (0, _transactionManager.updateTransaction)(transactionObj).then(function () {
          (0, _transactionManager.findTransactionsByUserId)(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset).then(function (transactionList) {
            res.status(200).send({
              transactionList: transactionList
            });
          });
        });
      }
    });
  });
});

router.post('/api/transactions/update-transaction', _utils.ensureAuthorization, function (req, res) {
  console.log('/api/transactions/-transaction');
  var body = req.body,
      user = req.user;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var trxData = body.trxData,
      listingParameters = body.listingParameters;

  if (!trxData || !listingParameters) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  var transactionId = trxData.transactionId,
      transactionDate = trxData.transactionDate,
      destination = trxData.destination,
      note = trxData.note,
      amount = trxData.amount,
      asset = trxData.asset,
      value = trxData.value,
      transactionTypeId = trxData.transactionTypeId;

  if (!transactionId || !transactionDate || !destination || !note || !amount || !asset || !value || !transactionTypeId) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  var limit = 10;
  if (listingParameters.limit) limit = listingParameters.limit;

  var offset = 0;
  if (listingParameters.offset) offset = listingParameters.offset;

  (0, _transactionManager.findTransactionById)(transactionId).then(function (transactionObj) {
    transactionObj.destination = destination;

    var trx_date = new Date(transactionDate);
    var moment_date = (0, _moment2.default)(trx_date).format("YYYY-MM-DD HH:MM:SS");
    transactionObj.transactionDate = moment_date;

    transactionObj.amount = amount;
    transactionObj.asset = asset;
    transactionObj.value = value;
    (0, _transactionTypeManager.findTransactionTypeById)(transactionTypeId).then(function (transactionTypeObj) {
      transactionObj.setTransactiontype(transactionTypeObj, { save: false });
      if (_walletAddressValidator2.default.validate(destination)) {
        (0, _associatedAddressManager.findAssociatedAddByAdd)(destination).then(function (associatedAddObj) {
          if (associatedAddObj) {
            transactionObj.setAssociatedaddress(associatedAddObj, { save: false });
            (0, _transactionManager.updateTransaction)(transactionObj).then(function () {
              (0, _transactionManager.findTransactionsByUserId)(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset).then(function (transactionList) {
                res.status(200).send({
                  transactionList: transactionList
                });
              });
            });
          } else {
            var associatedAddNew = _AssociatedAddress2.default.build({ address: destination, nickName: destination });
            (0, _associatedAddressManager.updateAssociatedAdd)(associatedAddNew).then(function (updatedAssociatedAdd) {
              transactionObj.setAssociatedaddress(updatedAssociatedAdd, { save: false });
              (0, _transactionManager.updateTransaction)(transactionObj).then(function () {
                (0, _transactionManager.findTransactionsByUserId)(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset).then(function (transactionList) {
                  res.status(200).send({
                    transactionList: transactionList
                  });
                });
              });
            });
          }
        });
      } else {
        (0, _transactionManager.updateTransaction)(transactionObj).then(function () {
          (0, _transactionManager.findTransactionsByUserId)(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset).then(function (transactionList) {
            res.status(200).send({
              transactionList: transactionList
            });
          });
        });
      }
    });
  });
});

router.post('/api/transactions/delete-transaction', _utils.ensureAuthorization, function (req, res) {
  console.log('/api/transactions/delete-transaction');
  var body = req.body,
      user = req.user;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var transactionIds = body.transactionIds,
      listingParameters = body.listingParameters;

  if (!transactionIds || !listingParameters) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  var trxType = 'Sale';
  if (listingParameters.trxType) trxType = listingParameters.trxType;

  var limit = 10;
  if (listingParameters.limit) limit = listingParameters.limit;

  var offset = 0;
  if (listingParameters.offset) offset = listingParameters.offset;

  _async2.default.eachOfSeries(transactionIds, function (trxId, index, nextAddCallback) {
    (0, _transactionManager.deleteTransactionById)(trxId).then(function () {
      nextAddCallback();
    });
  }, function (err) {
    if (err) {
      (0, _utils.rejectRequest)('Failed to process addresses, please try again', res);
    } else {
      (0, _transactionManager.findTransactionsByUserId)(user.id, trxType, 'transactionDate DESC', limit, offset).then(function (transactionList) {
        res.status(200).send({
          transactionList: transactionList
        });
      });
    }
  });
});

router.post('/api/transactions/update-transactions-type', _utils.ensureAuthorization, function (req, res) {
  console.log('/api/transactions/update-transactions-type');
  var body = req.body,
      user = req.user;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var transactionIds = body.transactionIds,
      selectedTrxTypeId = body.selectedTrxTypeId,
      listingParameters = body.listingParameters;

  if (!transactionIds || !selectedTrxTypeId || !listingParameters) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  var trxType = 'Sale';
  if (listingParameters.trxType) trxType = listingParameters.trxType;

  var limit = 10;
  if (listingParameters.limit) limit = listingParameters.limit;

  var offset = 0;
  if (listingParameters.offset) offset = listingParameters.offset;

  _async2.default.eachOfSeries(transactionIds, function (trxId, index, nextAddCallback) {
    (0, _transactionManager.findTransactionById)(trxId).then(function (transactionObj) {
      (0, _transactionTypeManager.findTransactionTypeById)(selectedTrxTypeId).then(function (transactionTypeObj) {
        transactionObj.setTransactiontype(transactionTypeObj, { save: false });
        (0, _transactionManager.updateTransaction)(transactionObj).then(function () {
          nextAddCallback();
        });
      });
    });
  }, function (err) {
    if (err) {
      (0, _utils.rejectRequest)('Failed to process addresses, please try again', res);
    } else {
      (0, _transactionManager.findTransactionsByUserId)(user.id, trxType, 'transactionDate DESC', limit, offset).then(function (transactionList) {
        res.status(200).send({
          transactionList: transactionList
        });
      });
    }
  });
});

exports.default = router;
module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(23);

var _express2 = _interopRequireDefault(_express);

var _crypto = __webpack_require__(72);

var _crypto2 = _interopRequireDefault(_crypto);

var _encryptionUtils = __webpack_require__(204);

var _utils = __webpack_require__(22);

var _userManager = __webpack_require__(68);

var _roleManager = __webpack_require__(192);

var _userAccountTypeManager = __webpack_require__(194);

var _timeZoneManager = __webpack_require__(193);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _emailUtils = __webpack_require__(203);

var _emailUtils2 = _interopRequireDefault(_emailUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
// libs
var router = _express2.default.Router();

// requires email and password
router.post('/api/login', _utils.ensureAnonymity, function (req, res) {
  var body = req.body;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var email = body.email,
      password = body.password;

  if (!email || !password) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  (0, _userManager.findUserByEmail)(email).then(function (user) {
    if (user) {
      var decryptedPassword = (0, _encryptionUtils.decrypt)(user.password);
      if (password === decryptedPassword) {
        (0, _userManager.isActiveUser)(user.id).then(function (isActive) {
          if (isActive) {
            req.login(user, function (err) {
              if (err) (0, _utils.caughtError)(res, err);else res.send({ user: user });
            });
          } else {
            res.status(404).send({
              message: 'Your account is currently inactive. Please click <a href="/resend/activation/' + user.id + '">here</a> to resend the email containing activation link'
            });
          }
        });
      } else {
        res.status(404).send({
          message: 'Invalid username or password'
        });
      }
    } else {
      res.status(404).send({
        message: 'Invalid username or password'
      });
    }
  });
});

router.get('/api/logout', function (req, res) {
  req.logout();
  res.status(200).send({
    message: 'User logged out successfully!'
  });
});

router.post('/api/users/create', _utils.ensureAnonymity, function (req, res) {
  var body = req.body;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var firstName = body.firstName,
      lastName = body.lastName,
      email = body.email,
      password = body.password;

  if (!firstName || !lastName || !email || !password) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  (0, _userManager.findUserByEmail)(email).then(function (user) {
    if (user) {
      res.status(404).send({
        message: 'Username already exist'
      });
    } else {
      var encryptedPassword = (0, _encryptionUtils.encrypt)(password);

      // now instantiate an object
      var userObj = _User2.default.build({ firstName: firstName, lastName: lastName, email: email, password: encryptedPassword });

      (0, _roleManager.findRoleById)(2).then(function (role) {
        userObj.setRole(role, { save: false });
        (0, _userAccountTypeManager.findUserAccountTypeById)(1).then(function (userAccountType) {
          userObj.setUseraccounttype(userAccountType, { save: false });
          (0, _timeZoneManager.findTimeZoneById)(1).then(function (timeZone) {
            userObj.setTimezone(timeZone, { save: false });
            userObj.status = 0;

            _crypto2.default.randomBytes(20, function (err, buf) {
              var token = buf.toString('hex');
              userObj.registerToken = token;
              userObj.registerExpires = Date.now() + 86400000; // 24 hours 1 hour = 3600000

              (0, _userManager.updateUser)(userObj).then(function (updatedUser) {
                var activationUrl = req.protocol + '://' + req.get('host') + '/activateAccount/' + updatedUser.registerToken;
                var data = { firstName: updatedUser.firstName, activationUrl: activationUrl };

                var allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com'];
                var toEmailAddress = 'majid.hussain@emumba.com';
                if (allowedEmailList.indexOf(email) > -1) {
                  toEmailAddress = email;
                }

                _emailUtils2.default.sendAccountActivationEmail(toEmailAddress, data).then(function () {
                  res.status(200).send({
                    message: 'Sign up Successfully! Please follow a link in your email to activate your account'
                  });
                }).catch(function (error) {
                  return (0, _utils.caughtError)(res, error);
                });
              });
            });
          });
        });
      });
    }
  });
});

router.post('/api/users/forgot-password', _utils.ensureAnonymity, function (req, res) {
  var body = req.body;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var email = body.email;

  if (!email) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  (0, _userManager.findUserByEmail)(email).then(function (user) {
    if (user) {
      _crypto2.default.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 86400000; // 24 hours 1 hour = 3600000
        (0, _userManager.updateUser)(user).then(function (userObj) {
          var activationUrl = req.protocol + '://' + req.get('host') + '/activateAccount/' + userObj.registerToken;
          var data = { firstName: userObj.firstName, activationUrl: activationUrl };

          var allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com'];
          var toEmailAddress = 'majid.hussain@emumba.com';
          if (allowedEmailList.indexOf(userObj.email) > -1) {
            toEmailAddress = userObj.email;
          }

          _emailUtils2.default.sendResendPasswordEmail(toEmailAddress, data).then(function () {
            res.status(200).send({
              message: 'Reset password email has been sent to the email address'
            });
          }).catch(function (error) {
            return (0, _utils.caughtError)(res, error);
          });
        });
      });
    } else {
      res.status(404).send({
        message: 'Invalid username'
      });
    }
  });
});

router.post('/api/users/search-user-token', function (req, res) {
  var body = req.body;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var tokenString = body.tokenString;

  if (!tokenString) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  (0, _userManager.findUserByToken)(tokenString).then(function (user) {
    if (user) {
      res.status(200).send({
        message: 'true'
      });
    } else {
      res.status(400).send({
        message: 'false'
      });
    }
  });
});

router.post('/api/users/reset-password', function (req, res) {
  var body = req.body;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var token = body.token,
      password = body.password,
      confirmPassword = body.confirmPassword;

  if (!token || !password || !confirmPassword) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  } else if (password !== confirmPassword) {
    (0, _utils.rejectRequest)('Password and Confirm Password does not match', res);
    return;
  }

  (0, _userManager.findUserByToken)(token).then(function (user) {
    if (user) {
      var encryptedPassword = (0, _encryptionUtils.encrypt)(password);
      user.password = encryptedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      (0, _userManager.updateUser)(user).then(function () {
        res.status(200).send({
          message: 'Password has been changed, please <a href="/login">login</a>'
        });
      });
    } else {
      res.status(400).send({
        message: 'User does not exist'
      });
    }
  });
});

router.post('/api/users/verify-account', function (req, res) {
  var body = req.body;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var token = body.token;

  if (!token) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  (0, _userManager.findUserByRegistrationToken)(token).then(function (user) {
    if (user) {
      user.status = 1;
      user.registerToken = null;
      user.registerExpires = null;
      (0, _userManager.updateUser)(user).then(function () {
        res.status(200).send({
          message: 'Your account has been activated, please login'
        });
      });
    } else {
      res.status(400).send({
        message: 'User does not exist'
      });
    }
  });
});

router.post('/api/users/resend-activation', function (req, res) {
  var body = req.body;

  if (!body) {
    (0, _utils.rejectRequest)('Missing request body', res);
    return;
  }

  var userId = body.userId;

  if (!userId) {
    (0, _utils.rejectRequest)('Missing required arguments', res);
    return;
  }

  (0, _userManager.findUserByID)(userId).then(function (user) {
    if (user) {
      _crypto2.default.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        user.registerToken = token;
        user.registerExpires = Date.now() + 86400000; // 24 hours 1 hour = 3600000
        user.status = 0;
        (0, _userManager.updateUser)(user).then(function (userObj) {
          var activationUrl = req.protocol + '://' + req.get('host') + '/activateAccount/' + userObj.registerToken;
          var data = { firstName: userObj.firstName, activationUrl: activationUrl };

          var allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com'];
          var toEmailAddress = 'majid.hussain@emumba.com';
          if (allowedEmailList.indexOf(userObj.email) > -1) {
            toEmailAddress = userObj.email;
          }

          _emailUtils2.default.resendAccountActivationEmail(toEmailAddress, data).then(function () {
            res.status(200).send({
              message: 'Activation email sent Successfully! Please follow a link in your email to activate your account'
            });
          }).catch(function (error) {
            return (0, _utils.caughtError)(res, error);
          });
        }).catch(function (error) {
          return (0, _utils.caughtError)(res, error);
        });
      });
    } else {
      res.status(400).send({
        message: 'User does not exist'
      });
    }
  });
});

exports.default = router;
module.exports = exports['default'];

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(23);

var _express2 = _interopRequireDefault(_express);

var _spa = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var router = _express2.default.Router();

// src


router.get('*', function (req, res) {
  return (0, _spa.renderResponse)(req, res);
});

exports.default = router;
module.exports = exports['default'];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAssociatedAdd = exports.findAssociatedAddByAdd = exports.findAssociatedAddById = undefined;

var _AssociatedAddress = __webpack_require__(18);

var _AssociatedAddress2 = _interopRequireDefault(_AssociatedAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findAssociatedAddById = exports.findAssociatedAddById = function findAssociatedAddById(id) {
  return _AssociatedAddress2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
}; // libs
var findAssociatedAddByAdd = exports.findAssociatedAddByAdd = function findAssociatedAddByAdd(address) {
  return _AssociatedAddress2.default.findOne(Object.assign({
    where: {
      address: address
    }
  })).then(function (obj) {
    return obj;
  });
};

var updateAssociatedAdd = exports.updateAssociatedAdd = function updateAssociatedAdd(associatedAddObj) {
  return associatedAddObj.save().then(function (obj) {
    return obj;
  });
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProviderByName = exports.findAllProviderList = exports.findProviderByID = undefined;

var _Provider = __webpack_require__(41);

var _Provider2 = _interopRequireDefault(_Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findProviderByID = exports.findProviderByID = function findProviderByID(id) {
  return _Provider2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
}; // libs
var findAllProviderList = exports.findAllProviderList = function findAllProviderList() {
  return _Provider2.default.findAll().then(function (obj) {
    return obj;
  });
};

var findProviderByName = exports.findProviderByName = function findProviderByName(providerName) {
  return _Provider2.default.findOne(Object.assign({
    where: {
      providerName: providerName
    }
  })).then(function (obj) {
    return obj;
  });
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findTrxImportTypeById = undefined;

var _TransactionImportType = __webpack_require__(44);

var _TransactionImportType2 = _interopRequireDefault(_TransactionImportType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findTrxImportTypeById = exports.findTrxImportTypeById = function findTrxImportTypeById(id) {
  return _TransactionImportType2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
}; // libs

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTransactionById = exports.updateTransaction = exports.findTransactionByTrxId = exports.findTransactionById = exports.findTransactionsBySearchEndDate = exports.findTransactionsBySearchStartDate = exports.findTransactionsBySearchDate = exports.findTransactionsBySearchTextEndDate = exports.findTransactionsBySearchTextStartDate = exports.findTransactionsBySearchTextDate = exports.findTransactionsBySearchText = exports.findTransactionsByUserId = undefined;

var _sequelize = __webpack_require__(9);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _Transaction = __webpack_require__(25);

var _Transaction2 = _interopRequireDefault(_Transaction);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _TransactionType = __webpack_require__(45);

var _TransactionType2 = _interopRequireDefault(_TransactionType);

var _AssociatedAddress = __webpack_require__(18);

var _AssociatedAddress2 = _interopRequireDefault(_AssociatedAddress);

var _UserAddress = __webpack_require__(33);

var _UserAddress2 = _interopRequireDefault(_UserAddress);

var _UserWallet = __webpack_require__(26);

var _UserWallet2 = _interopRequireDefault(_UserWallet);

var _TransactionImportType = __webpack_require__(44);

var _TransactionImportType2 = _interopRequireDefault(_TransactionImportType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findTransactionsByUserId = exports.findTransactionsByUserId = function findTransactionsByUserId(id, typeName, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    // order: [[Sequelize.literal(orderBy + ' ' + orderWay)], [Sequelize.literal('destination ASC')]]
    // order: [[Sequelize.literal('transactionimporttype.import_type_name ASC, useraddress.nick_name ASC, userwallet.wallet_name ASC')], [Sequelize.literal('useraddress.nick_name ASC')], [Sequelize.literal('userwallet.wallet_name ASC')]]
    // order: Sequelize.literal('transactionimporttype.import_type_name ASC, useraddress.nick_name ASC, userwallet.wallet_name ASC')
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

// src
var findTransactionsBySearchText = exports.findTransactionsBySearchText = function findTransactionsBySearchText(id, typeName, searchParam, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    where: {
      $or: [{ destination: { $like: '%' + searchParam + '%' } }, { note: { $like: '%' + searchParam + '%' } }, { amount: { $like: '%' + searchParam + '%' } }, { asset: { $like: '%' + searchParam + '%' } }, { value: { $like: '%' + searchParam + '%' } }, _sequelize2.default.literal("associatedaddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("useraddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("userwallet.wallet_name like '%" + searchParam + "%'")]
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionsBySearchTextDate = exports.findTransactionsBySearchTextDate = function findTransactionsBySearchTextDate(id, typeName, searchParam, startDate, endDate, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    where: {
      $and: [{ transactionDate: { $between: [startDate, endDate] } }, { $or: [{ destination: { $like: '%' + searchParam + '%' } }, { note: { $like: '%' + searchParam + '%' } }, { amount: { $like: '%' + searchParam + '%' } }, { asset: { $like: '%' + searchParam + '%' } }, { value: { $like: '%' + searchParam + '%' } }, _sequelize2.default.literal("associatedaddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("useraddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("userwallet.wallet_name like '%" + searchParam + "%'")] }]
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionsBySearchTextStartDate = exports.findTransactionsBySearchTextStartDate = function findTransactionsBySearchTextStartDate(id, typeName, searchParam, startDate, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    where: {
      $and: [{ transactionDate: { $gte: [startDate] } }, { $or: [{ destination: { $like: '%' + searchParam + '%' } }, { note: { $like: '%' + searchParam + '%' } }, { amount: { $like: '%' + searchParam + '%' } }, { asset: { $like: '%' + searchParam + '%' } }, { value: { $like: '%' + searchParam + '%' } }, _sequelize2.default.literal("associatedaddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("useraddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("userwallet.wallet_name like '%" + searchParam + "%'")] }]
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionsBySearchTextEndDate = exports.findTransactionsBySearchTextEndDate = function findTransactionsBySearchTextEndDate(id, typeName, searchParam, endDate, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    where: {
      $and: [{ transactionDate: { $lte: [endDate] } }, { $or: [{ destination: { $like: '%' + searchParam + '%' } }, { note: { $like: '%' + searchParam + '%' } }, { amount: { $like: '%' + searchParam + '%' } }, { asset: { $like: '%' + searchParam + '%' } }, { value: { $like: '%' + searchParam + '%' } }, _sequelize2.default.literal("associatedaddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("useraddress.nick_name like '%" + searchParam + "%'"), _sequelize2.default.literal("userwallet.wallet_name like '%" + searchParam + "%'")] }]
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionsBySearchDate = exports.findTransactionsBySearchDate = function findTransactionsBySearchDate(id, typeName, startDate, endDate, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    where: {
      transactionDate: { $between: [startDate, endDate] }
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionsBySearchStartDate = exports.findTransactionsBySearchStartDate = function findTransactionsBySearchStartDate(id, typeName, startDate, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    where: {
      transactionDate: { $gte: [startDate] }
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionsBySearchEndDate = exports.findTransactionsBySearchEndDate = function findTransactionsBySearchEndDate(id, typeName, endDate, orderBy, limit, offset) {
  return _Transaction2.default.findAll(Object.assign({
    where: {
      transactionDate: { $lte: [endDate] }
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _TransactionType2.default,
      where: { typeName: typeName }
    }, { model: _AssociatedAddress2.default }, { model: _UserAddress2.default }, { model: _UserWallet2.default }, { model: _TransactionImportType2.default }],
    limit: limit,
    offset: offset,
    order: _sequelize2.default.literal(orderBy)
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionById = exports.findTransactionById = function findTransactionById(id) {
  return _Transaction2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
};

var findTransactionByTrxId = exports.findTransactionByTrxId = function findTransactionByTrxId(trxId) {
  return _Transaction2.default.findOne(Object.assign({
    where: {
      trxId: trxId
    }
  })).then(function (obj) {
    return obj;
  });
};

var updateTransaction = exports.updateTransaction = function updateTransaction(transactionObj) {
  return transactionObj.save().then(function (obj) {
    return obj;
  });
};

var deleteTransactionById = exports.deleteTransactionById = function deleteTransactionById(transactionId) {
  return _Transaction2.default.findById(transactionId).then(function (object) {
    if (object === null) return;

    return object.destroy({ force: true });
  });
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findTransactionTypeByName = exports.findTransactionTypeById = undefined;

var _TransactionType = __webpack_require__(45);

var _TransactionType2 = _interopRequireDefault(_TransactionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findTransactionTypeById = exports.findTransactionTypeById = function findTransactionTypeById(id) {
  return _TransactionType2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
}; // libs
var findTransactionTypeByName = exports.findTransactionTypeByName = function findTransactionTypeByName(typeName) {
  return _TransactionType2.default.findOne(Object.assign({
    where: {
      typeName: typeName
    }
  })).then(function (obj) {
    return obj;
  });
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserByRegistrationToken = exports.findUserByToken = exports.updateUser = exports.insertUser = exports.findUserByEmail = exports.isActiveUser = exports.findUserByEmailAndPassword = exports.findUserByID = undefined;

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _Role = __webpack_require__(42);

var _Role2 = _interopRequireDefault(_Role);

var _UserAccountType = __webpack_require__(46);

var _UserAccountType2 = _interopRequireDefault(_UserAccountType);

var _TimeZone = __webpack_require__(43);

var _TimeZone2 = _interopRequireDefault(_TimeZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var findUserByID = exports.findUserByID = function findUserByID(id) {
  return _User2.default.findOne(Object.assign({
    where: {
      id: id
    },
    include: [_Role2.default, _UserAccountType2.default, _TimeZone2.default]
  })).then(function (obj) {
    return obj;
  });
};

var findUserByEmailAndPassword = exports.findUserByEmailAndPassword = function findUserByEmailAndPassword(email, password) {
  return _User2.default.findOne(Object.assign({
    where: {
      email: email,
      password: password
    },
    include: [_Role2.default, _UserAccountType2.default, _TimeZone2.default]
  })).then(function (obj) {
    return obj;
  });
};

var isActiveUser = exports.isActiveUser = function isActiveUser(id) {
  return _User2.default.findOne(Object.assign({
    where: {
      id: id,
      status: 1
    }
  })).then(function (obj) {
    if (obj) return true;else return false;
  });
};

var findUserByEmail = exports.findUserByEmail = function findUserByEmail(email) {
  return _User2.default.findOne(Object.assign({
    where: {
      email: email
    }
  })).then(function (obj) {
    return obj;
  });
};

var insertUser = exports.insertUser = function insertUser(userObj) {
  return userObj.save().then(function (obj) {
    return obj;
  });
};

var updateUser = exports.updateUser = function updateUser(userObj) {
  return userObj.save().then(function (obj) {
    return obj;
  });
};

var findUserByToken = exports.findUserByToken = function findUserByToken(resetPasswordToken) {
  return _User2.default.findOne(Object.assign({
    where: {
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    }
  })).then(function (obj) {
    return obj;
  });
};

var findUserByRegistrationToken = exports.findUserByRegistrationToken = function findUserByRegistrationToken(registerToken) {
  return _User2.default.findOne(Object.assign({
    where: {
      registerToken: registerToken,
      registerExpires: { $gt: Date.now() }
    }
  })).then(function (obj) {
    return obj;
  });
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSessionStore = exports.getPort = exports.stringEndsWith = exports.makeLogContextString = exports.isTest = exports.isProduction = undefined;

var _expressSession = __webpack_require__(260);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressMysqlSession = __webpack_require__(259);

var _expressMysqlSession2 = _interopRequireDefault(_expressMysqlSession);

var _db = __webpack_require__(57);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
// libs
var COOKIE_NAME = 'guardians_of_galaxy_vol_2';
var SESSION_SECRET = 'Hoaysdris_ids_a_sCehampion_3n59dn39fns';

var isProduction = exports.isProduction = function isProduction() {
  return process.env.NODE_ENV === 'production';
};

var isTest = exports.isTest = function isTest() {
  return process.env.NODE_ENV === 'test';
};

var makeLogContextString = exports.makeLogContextString = function makeLogContextString(req) {
  var strUser = void 0;
  var user = req.user,
      headers = req.headers,
      remoteAddress = req.connection.remoteAddress;

  // to get forwarded header, added this line on nginx website config
  // proxy_set_header  X-Forwarded-For $remote_addr

  var ip = headers['x-forwarded-for'] || remoteAddress;

  if (user) {
    strUser = user.id + ' (' + user.email + ')';
  } else {
    strUser = 'Anonymous';
  }

  return '[' + strUser + ', ' + ip + ']';
};

var stringEndsWith = exports.stringEndsWith = function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var getPort = exports.getPort = function getPort() {
  return isProduction() ? 80 : 80;
};

var setupSessionStore = exports.setupSessionStore = function setupSessionStore(app) {
  var MySQLStore = (0, _expressMysqlSession2.default)(_expressSession2.default);
  var options = {
    host: _db.host, // Host name for database connection.
    port: 3306, // Port number for database connection.
    user: _db.username, // Database user.
    password: _db.password, // Password for the above database user.
    database: _db.dbName, // Database name.
    // checkExpirationInterval: 900000, // How frequently expired sessions will be cleared milliseconds.
    // expiration: 86400000, // The maximum age of a valid session milliseconds.
    checkExpirationInterval: 600000, // How frequently expired sessions will be cleared milliseconds.
    expiration: 1800000, // The maximum age of a valid session milliseconds.
    createDatabaseTable: true, // Whether or not to create the sessions database table, if one does not already exist.
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  };

  var sessionStore = new MySQLStore(options);

  // http://stackoverflow.com/questions/1134290/cookies-on-localhost-with-explicit-domain
  var domain = _app2.default.app.host;

  // https://www.npmjs.com/package/express-session
  app.use((0, _expressSession2.default)({
    key: COOKIE_NAME,
    secret: SESSION_SECRET,
    store: sessionStore,
    cookie: {
      domain: domain,
      // maxAge: 31536000000
      maxAge: 1800000
    },
    resave: false,
    saveUninitialized: true,
    rolling: true
  }));

  return sessionStore;
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("coinbase");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("lodash/has");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/action/cached");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/navigation/expand-less");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/navigation/expand-more");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("react-spinner-material");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chokidar = __webpack_require__(256);

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpack = __webpack_require__(80);
var webpackMiddleware = __webpack_require__(294);
var webpackHotMiddleware = __webpack_require__(295);
var config = __webpack_require__(206);


var setupWebpack = function setupWebpack(app) {
  console.log('[devUtils] Setting up HMR for frontend');

  var compiler = webpack(config);

  var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
};

var setupHMR = function setupHMR() {
  console.log('[devUtils] Setting up HMR for backend');

  var compiler = webpack(config);

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var serverPath = _path2.default.resolve('./server');
  // console.log(serverPath)
  var watcher = _chokidar2.default.watch(serverPath);

  watcher.on('ready', function () {
    watcher.on('all', function () {
      console.log("Clearing /server/ module cache from server");
      Object.keys(__webpack_require__.c).forEach(function (id) {
        if (/[\/\\]server[\/\\]/.test(id)) delete __webpack_require__.c[id];
      });
    });
  });

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', function () {
    console.log("Clearing /client/ module cache from server");
    Object.keys(__webpack_require__.c).forEach(function (id) {
      if (/[\/\\]client[\/\\]/.test(id)) delete __webpack_require__.c[id];
    });
  });
};

exports.default = {
  setupWebpack: setupWebpack,
  setupHMR: setupHMR
};
module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(79);

var _underscore2 = _interopRequireDefault(_underscore);

var _appUtils = __webpack_require__(69);

var appUtils = _interopRequireWildcard(_appUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import winston from 'winston'
var excludedFilesFromWinstonLogging = ['.js', '.css', '.jpg', '.png', '.ico', '.json'];
var excludePostBodyFromWinstonLogging = ['/api/users/change-password', '/api/users/reset-password', '/api/users/verify-account', '/api/login'];

var setupWinstonProductionLogs = function setupWinstonProductionLogs() {
  __webpack_require__(189);
};

var setupUrlLogs = function setupUrlLogs(req, res, next) {
  var url = req.originalUrl;

  if (req.user) {
    if (!_underscore2.default.any(excludedFilesFromWinstonLogging, function (file) {
      return appUtils.stringEndsWith(url, file);
    })) {
      console.log(appUtils.makeLogContextString(req) + '[' + req.method + ']: ' + req.hostname + req.url);

      if (req.method === 'POST' && !_underscore2.default.any(excludePostBodyFromWinstonLogging, function (url) {
        return req.url === url;
      })) console.log('POST BODY: ' + JSON.stringify(req.body));
    }
  }
  next();
};

exports.default = {
  setupUrlLogs: setupUrlLogs,
  setupWinstonProductionLogs: setupWinstonProductionLogs
};
module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./api/accountApiController": 58,
	"./api/accountApiController.js": 58,
	"./api/baseApiController": 59,
	"./api/baseApiController.js": 59,
	"./api/transactionApiController": 60,
	"./api/transactionApiController.js": 60,
	"./api/userApiController": 61,
	"./api/userApiController.js": 61,
	"./defaultController": 62,
	"./defaultController.js": 62,
	"./spa": 40,
	"./spa.js": 40
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 83;

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; // libs


// src

// custom


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _reactRouterDom = __webpack_require__(8);

var _getMuiTheme = __webpack_require__(274);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _reactDnd = __webpack_require__(283);

var _reactDndHtml5Backend = __webpack_require__(284);

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _App = __webpack_require__(230);

var _App2 = _interopRequireDefault(_App);

__webpack_require__(249);

__webpack_require__(250);

__webpack_require__(251);

__webpack_require__(252);

__webpack_require__(248);

var _theme = __webpack_require__(188);

var _theme2 = _interopRequireDefault(_theme);

var _components = __webpack_require__(170);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = (_temp = _class = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: "getChildContext",
    value: function getChildContext() {
      var userAgent = this.props.userAgent;

      var theme = userAgent ? Object.assign({ userAgent: userAgent }, _theme2.default) : _theme2.default;

      return {
        muiTheme: (0, _getMuiTheme2.default)(theme)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          store = _props.store,
          Router = _props.Router,
          routerProps = _props.routerProps;


      return _react2.default.createElement(
        _reactDnd.DragDropContextProvider,
        { backend: _reactDndHtml5Backend2.default },
        _react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(
            Router,
            routerProps,
            _react2.default.createElement(
              "div",
              { className: _App2.default.root },
              _react2.default.createElement(_components.Header, null),
              _react2.default.createElement(
                "div",
                { className: _App2.default.layout },
                _react2.default.createElement(
                  "div",
                  { className: _App2.default.primaryColumn },
                  _react2.default.createElement(
                    "div",
                    { className: "container-fluid" },
                    _react2.default.createElement(
                      _reactRouterDom.Switch,
                      null,
                      _react2.default.createElement(_components.PublicRoute, { path: "/login", component: _components.PageLogin }),
                      _react2.default.createElement(_components.PublicRoute, { path: "/activateAccount/:usertoken", component: _components.PageLogin }),
                      _react2.default.createElement(_components.PublicRoute, { path: "/register", component: _components.PageRegister }),
                      _react2.default.createElement(_components.PublicRoute, { path: "/forgotPassword", component: _components.PageForgotPassword }),
                      _react2.default.createElement(_components.PublicRoute, { path: "/resetPassword/:usertoken", component: _components.PageResetPassword }),
                      _react2.default.createElement(_components.PublicRoute, { path: "/privacy", component: _components.PagePrivacy }),
                      _react2.default.createElement(_components.PublicRoute, { path: "/terms", component: _components.PageTerms }),
                      _react2.default.createElement(_components.PublicRoute, { path: "/resend/activation/:id", component: _components.PageLogin }),
                      _react2.default.createElement(_reactRouterDom.Route, { path: "/logout", component: _components.PageLogout }),
                      _react2.default.createElement(_components.PrivateRoute, {
                        exact: true,
                        path: "/",
                        render: function render() {
                          return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/system" });
                        }
                      }),
                      _react2.default.createElement(_components.PrivateRoute, {
                        exact: true,
                        path: "/system",
                        component: _components.PageSystemView
                      }),
                      _react2.default.createElement(_components.PrivateRoute, {
                        exact: true,
                        path: "/account",
                        component: _components.PageAccountView
                      }),
                      _react2.default.createElement(_components.PrivateRoute, {
                        exact: true,
                        path: "/account/:providername/callback",
                        component: _components.PageAccountView
                      }),
                      _react2.default.createElement(_components.PrivateRoute, {
                        exact: true,
                        path: "/calculate",
                        component: _components.PageCalculateView
                      }),
                      _react2.default.createElement(_components.PrivateRoute, {
                        exact: true,
                        path: "/reports",
                        component: _components.PageReportsView
                      }),
                      _react2.default.createElement(_components.PrivateRoute, {
                        exact: true,
                        path: "/charts",
                        component: _components.PageChartsView
                      }),
                      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/errors", component: _components.PageErrorView }),
                      _react2.default.createElement(_reactRouterDom.Route, { component: _components.Page404 })
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component), _class.propTypes = {
  userAgent: _react.PropTypes.string,
  store: _react.PropTypes.object
  // Router: React.PropTypes.element,
  // routerProps: React.PropTypes.routerProps
}, _class.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object
}, _temp);
exports.default = App;
module.exports = exports["default"];

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = __webpack_require__(24);

Object.keys(_users).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _users[key];
    }
  });
});

var _accounts = __webpack_require__(37);

Object.keys(_accounts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _accounts[key];
    }
  });
});

var _transactions = __webpack_require__(92);

Object.keys(_transactions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transactions[key];
    }
  });
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_TRANSACTIONS_TYPE_FAILURE = exports.UPDATE_TRANSACTIONS_TYPE_SUCCESS = exports.UPDATE_TRANSACTIONS_TYPE = exports.UPDATE_TRANSACTION_FAILURE = exports.UPDATE_TRANSACTION_SUCCESS = exports.UPDATE_TRANSACTION = exports.DELETE_TRANSACTION_FAILURE = exports.DELETE_TRANSACTION_SUCCESS = exports.DELETE_TRANSACTION = exports.INSERT_TRANSACTION_FAILURE = exports.INSERT_TRANSACTION_SUCCESS = exports.INSERT_TRANSACTION = exports.TRANSACTION_DATA_FAILURE = exports.TRANSACTION_DATA_SUCCESS = exports.TRANSACTION_DATA = undefined;
exports.transactionsData = transactionsData;
exports.insertTransaction = insertTransaction;
exports.deleteTransaction = deleteTransaction;
exports.updateTransaction = updateTransaction;
exports.updateTransactionsType = updateTransactionsType;

var _api = __webpack_require__(20);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // libs

// src


var TRANSACTION_DATA = exports.TRANSACTION_DATA = 'TRANSACTION_DATA';
var TRANSACTION_DATA_SUCCESS = exports.TRANSACTION_DATA_SUCCESS = 'TRANSACTION_DATA_SUCCESS';
var TRANSACTION_DATA_FAILURE = exports.TRANSACTION_DATA_FAILURE = 'TRANSACTION_DATA_FAILURE';

function transactionsData(listingParameters) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, _api.CALL_API, {
    types: [TRANSACTION_DATA, TRANSACTION_DATA_SUCCESS, TRANSACTION_DATA_FAILURE],
    endpoint: '/api/transactions/transaction-data',
    method: 'POST'
  }), _defineProperty(_ref, 'payload', { listingParameters: listingParameters }), _ref;
}

var INSERT_TRANSACTION = exports.INSERT_TRANSACTION = 'INSERT_TRANSACTION';
var INSERT_TRANSACTION_SUCCESS = exports.INSERT_TRANSACTION_SUCCESS = 'INSERT_TRANSACTION_SUCCESS';
var INSERT_TRANSACTION_FAILURE = exports.INSERT_TRANSACTION_FAILURE = 'INSERT_TRANSACTION_FAILURE';

function insertTransaction(trxData) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, _api.CALL_API, {
    types: [INSERT_TRANSACTION, INSERT_TRANSACTION_SUCCESS, INSERT_TRANSACTION_FAILURE],
    endpoint: '/api/transactions/insert-transaction',
    method: 'POST'
  }), _defineProperty(_ref2, 'payload', { trxData: trxData }), _ref2;
}

var DELETE_TRANSACTION = exports.DELETE_TRANSACTION = 'DELETE_TRANSACTION';
var DELETE_TRANSACTION_SUCCESS = exports.DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
var DELETE_TRANSACTION_FAILURE = exports.DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE';

function deleteTransaction(transactionIds, listingParameters) {
  var _ref3;

  return _ref3 = {}, _defineProperty(_ref3, _api.CALL_API, {
    types: [DELETE_TRANSACTION, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAILURE],
    endpoint: '/api/transactions/delete-transaction',
    method: 'POST'
  }), _defineProperty(_ref3, 'payload', { transactionIds: transactionIds, listingParameters: listingParameters }), _ref3;
}

var UPDATE_TRANSACTION = exports.UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
var UPDATE_TRANSACTION_SUCCESS = exports.UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
var UPDATE_TRANSACTION_FAILURE = exports.UPDATE_TRANSACTION_FAILURE = 'UPDATE_TRANSACTION_FAILURE';

function updateTransaction(trxData) {
  var _ref4;

  return _ref4 = {}, _defineProperty(_ref4, _api.CALL_API, {
    types: [UPDATE_TRANSACTION, UPDATE_TRANSACTION_SUCCESS, UPDATE_TRANSACTION_FAILURE],
    endpoint: '/api/transactions/update-transaction',
    method: 'POST'
  }), _defineProperty(_ref4, 'payload', { trxData: trxData }), _ref4;
}

var UPDATE_TRANSACTIONS_TYPE = exports.UPDATE_TRANSACTIONS_TYPE = 'UPDATE_TRANSACTIONS_TYPE';
var UPDATE_TRANSACTIONS_TYPE_SUCCESS = exports.UPDATE_TRANSACTIONS_TYPE_SUCCESS = 'UPDATE_TRANSACTIONS_TYPE_SUCCESS';
var UPDATE_TRANSACTIONS_TYPE_FAILURE = exports.UPDATE_TRANSACTIONS_TYPE_FAILURE = 'UPDATE_TRANSACTIONS_TYPE_FAILURE';

function updateTransactionsType(transactionIds, selectedTrxTypeId, listingParameters) {
  var _ref5;

  return _ref5 = {}, _defineProperty(_ref5, _api.CALL_API, {
    types: [UPDATE_TRANSACTIONS_TYPE, UPDATE_TRANSACTIONS_TYPE_SUCCESS, UPDATE_TRANSACTIONS_TYPE_FAILURE],
    endpoint: '/api/transactions/update-transactions-type',
    method: 'POST'
  }), _defineProperty(_ref5, 'payload', { transactionIds: transactionIds, selectedTrxTypeId: selectedTrxTypeId, listingParameters: listingParameters }), _ref5;
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _reactRouterRedux = __webpack_require__(17);

var _HeaderInner = __webpack_require__(94);

var _HeaderInner2 = _interopRequireDefault(_HeaderInner);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	var isLogoutLoading = state.entities.users.isLogoutLoading;
	var user = (0, _utils.getCurrentUser)(state);
	return { user: user, isLogoutLoading: isLogoutLoading };
};

var Header = (_dec = (0, _reactRedux.connect)(mapStateToProps), _dec(_class = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header(props) {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_HeaderInner2.default, _extends({}, this.props, this.state));
		}
	}]);

	return Header;
}(_react2.default.Component)) || _class);
exports.default = Header;
module.exports = exports['default'];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _reactRouterDom = __webpack_require__(8);

var _classnames = __webpack_require__(257);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = __webpack_require__(282);

var _reactRouterBootstrap = __webpack_require__(290);

var _HeaderInner = __webpack_require__(231);

var _HeaderInner2 = _interopRequireDefault(_HeaderInner);

var _reactSpinnerMaterial = __webpack_require__(77);

var _reactSpinnerMaterial2 = _interopRequireDefault(_reactSpinnerMaterial);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PublicHeader = _react2.default.createClass({
  displayName: 'PublicHeader',
  getInitialState: function getInitialState() {
    return {
      navExpanded: false
    };
  },
  setNavExpanded: function setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  },
  closeNav: function closeNav() {
    this.setState({ navExpanded: false });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Navbar,
        { fluid: true, onToggle: this.setNavExpanded,
          expanded: this.state.navExpanded,
          className: 'my-navbar' },
        _react2.default.createElement(
          _reactBootstrap.Navbar.Header,
          null,
          _react2.default.createElement(
            _reactBootstrap.Navbar.Brand,
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/login' },
              'Wisdom'
            )
          ),
          _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null)
        ),
        _react2.default.createElement(
          _reactBootstrap.Navbar.Collapse,
          null,
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { onSelect: this.closeNav },
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '#' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 1, className: 'nav-item' },
                'Features'
              )
            ),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '#' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 2, className: 'nav-item' },
                'Pricing'
              )
            ),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '#' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 3, className: 'nav-item' },
                'Contact Us'
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { onSelect: this.closeNav, pullRight: true },
            _react2.default.createElement(_reactBootstrap.MenuItem, { className: 'menu-divider', divider: true }),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/login', activeClassName: 'activeNavLink' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 1 },
                'Login'
              )
            ),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/register', activeClassName: 'activeNavLink' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 2 },
                'Sign Up'
              )
            )
          )
        )
      )
    );
  }
});

var LogoutInProgress = _react2.default.createClass({
  displayName: 'LogoutInProgress',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'page-login' },
      _react2.default.createElement(
        'div',
        { className: 'main-body' },
        _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Wisdom' }),
        _react2.default.createElement(
          _rcQueueAnim2.default,
          { type: 'bottom', className: 'ui-animate' },
          _react2.default.createElement(
            'div',
            { key: '1' },
            _react2.default.createElement(
              'div',
              { className: 'text-center' },
              _react2.default.createElement(_reactSpinnerMaterial2.default, { width: 100,
                height: 120,
                spinnerColor: "#333",
                spinnerWidth: 2,
                show: true })
            )
          )
        )
      )
    );
  }
});

var PrivateHeader = _react2.default.createClass({
  displayName: 'PrivateHeader',
  getInitialState: function getInitialState() {
    return {
      navExpanded: false
    };
  },
  setNavExpanded: function setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  },
  closeNav: function closeNav() {
    this.setState({ navExpanded: false });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Navbar,
        { fluid: true, onToggle: this.setNavExpanded,
          expanded: this.state.navExpanded,
          className: 'my-navbar collapse-early' },
        _react2.default.createElement(
          _reactBootstrap.Navbar.Header,
          null,
          _react2.default.createElement(
            _reactBootstrap.Navbar.Brand,
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/' },
              'Wisdom'
            )
          ),
          _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null)
        ),
        _react2.default.createElement(
          _reactBootstrap.Navbar.Collapse,
          null,
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { onSelect: this.closeNav },
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/system', activeClassName: 'activeNavLink' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 1, className: 'nav-item' },
                'Transactions'
              )
            ),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/account', activeClassName: 'activeNavLink' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 2, className: 'nav-item' },
                'Accounts'
              )
            ),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/calculate', activeClassName: 'activeNavLink' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 3, className: 'nav-item' },
                'Calculate'
              )
            ),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/reports', activeClassName: 'activeNavLink' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 3, className: 'nav-item' },
                'Reports'
              )
            ),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/charts', activeClassName: 'activeNavLink' },
              _react2.default.createElement(
                _reactBootstrap.NavItem,
                { eventKey: 3, className: 'nav-item' },
                'Charts'
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { className: 'nav-right-dropdown', onSelect: this.closeNav, pullRight: true },
            _react2.default.createElement(
              _reactBootstrap.NavDropdown,
              { eventKey: 1, title: this.props.user.firstName, id: 'basic-nav-dropdown' },
              _react2.default.createElement(
                _reactRouterBootstrap.LinkContainer,
                { to: '/logout' },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: 1.1 },
                  'Logout'
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { className: 'nav-right', pullRight: true },
            _react2.default.createElement(_reactBootstrap.MenuItem, { className: 'menu-divider', divider: true }),
            _react2.default.createElement(
              _reactRouterBootstrap.LinkContainer,
              { to: '/logout' },
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: 1 },
                'Logout'
              )
            )
          )
        )
      )
    );
  }
});

var HeaderInner = function HeaderInner(props) {
  var onToggle = props.onToggle,
      expanded = props.expanded,
      fluid = props.fluid,
      onSelect = props.onSelect,
      pullRight = props.pullRight,
      eventKey = props.eventKey,
      bsClass = props.bsClass,
      bsStyle = props.bsStyle,
      user = props.user,
      isLogoutLoading = props.isLogoutLoading;


  return isLogoutLoading ? _react2.default.createElement(LogoutInProgress, null) : user ? _react2.default.createElement(PrivateHeader, { user: user }) : _react2.default.createElement(PublicHeader, null);
};

exports.default = HeaderInner;
module.exports = exports['default'];

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Header = __webpack_require__(93);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Header2.default;
module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // libs


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _reactNotificationSystem = __webpack_require__(288);

var _reactNotificationSystem2 = _interopRequireDefault(_reactNotificationSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
  var errorMessage = state.errorMessage;


  return { errorMessage: errorMessage };
};

var NotificationSystemConnector = (_dec = (0, _reactRedux.connect)(mapStateToProps), _dec(_class = function (_React$Component) {
  _inherits(NotificationSystemConnector, _React$Component);

  function NotificationSystemConnector(props) {
    _classCallCheck(this, NotificationSystemConnector);

    return _possibleConstructorReturn(this, (NotificationSystemConnector.__proto__ || Object.getPrototypeOf(NotificationSystemConnector)).call(this, props));
  }

  _createClass(NotificationSystemConnector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.notificationSystem = this.refs.notificationSystem;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var errorNext = nextProps.errorMessage;
      var errorNow = this.props.errorMessage;


      if (!errorNow && errorNext) {
        this.errorDidAppear(errorNext);
      } else if (errorNow && !errorNext) {
        this.errorDidDisappear();
      }
    }
  }, {
    key: 'errorDidAppear',
    value: function errorDidAppear(error) {
      var message = error.message;


      this.notificationSystem.addNotification({
        message: message,
        level: 'error',
        position: 'br',
        autoDismiss: 0
      });
    }
  }, {
    key: 'errorDidDisappear',
    value: function errorDidDisappear() {
      this.notificationSystem.clearNotifications();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactNotificationSystem2.default, { ref: 'notificationSystem' });
    }
  }]);

  return NotificationSystemConnector;
}(_react2.default.Component)) || _class);
exports.default = NotificationSystemConnector;
module.exports = exports['default'];

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _NotificationSystemConnector = __webpack_require__(96);

var _NotificationSystemConnector2 = _interopRequireDefault(_NotificationSystemConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _NotificationSystemConnector2.default;
module.exports = exports['default'];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Page404Inner = __webpack_require__(99);

var _Page404Inner2 = _interopRequireDefault(_Page404Inner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


// src


var Page404 = function (_React$Component) {
  _inherits(Page404, _React$Component);

  function Page404(props) {
    _classCallCheck(this, Page404);

    return _possibleConstructorReturn(this, (Page404.__proto__ || Object.getPrototypeOf(Page404)).call(this, props));
  }

  _createClass(Page404, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Page404Inner2.default, this.props);
    }
  }]);

  return Page404;
}(_react2.default.Component);

exports.default = Page404;
module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _Page404Inner = __webpack_require__(232);

var _Page404Inner2 = _interopRequireDefault(_Page404Inner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var Page404Inner = function Page404Inner(props) {
  return _react2.default.createElement(
    'div',
    { className: _Page404Inner2.default.root + ' row' },
    _react2.default.createElement(_reactDocumentTitle2.default, { title: '404 - Wisdom' }),
    _react2.default.createElement(
      'div',
      { className: 'col-lg-6 col-lg-offset-3' },
      _react2.default.createElement(
        'h1',
        null,
        '404'
      ),
      _react2.default.createElement(
        'h2',
        null,
        'Looks like you\'ve wandered into an unknown land'
      ),
      _react2.default.createElement(
        _reactRouterDom.Link,
        { to: '/' },
        'Take me back home'
      )
    )
  );
};

// src
exports.default = Page404Inner;
module.exports = exports['default'];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Page = __webpack_require__(98);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Page2.default;
module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _MyAccountsViewInner = __webpack_require__(102);

var _MyAccountsViewInner2 = _interopRequireDefault(_MyAccountsViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyAccounts = (_temp = _class = function (_React$Component) {
	_inherits(MyAccounts, _React$Component);

	function MyAccounts(props) {
		_classCallCheck(this, MyAccounts);

		var _this = _possibleConstructorReturn(this, (MyAccounts.__proto__ || Object.getPrototypeOf(MyAccounts)).call(this, props));

		_initialiseProps.call(_this);

		var userProviderList = props.userProviderList;


		if (!_.isNil(userProviderList) && !_.isNil(userProviderList[0])) {
			var userWallets = userProviderList[0].UserWallets;


			if (userWallets && userWallets.length > 0) {
				_this.state = {
					selectedKey: userWallets[0].id,
					selectedWallet: userWallets[0]
				};
			}
		}
		return _this;
	}

	_createClass(MyAccounts, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (!_.isNil(this.state)) {
				var userWallets = [];
				var selectedKey = this.state.selectedKey;
				var userProviderList = nextProps.userProviderList;


				userWallets = _.flatten(userProviderList.map(function (userProviderListItem) {
					return _.concat(userWallets, userProviderListItem.UserWallets);
				}));

				if (!_.isNil(userProviderList) && !_.isNil(userProviderList[0]) && userWallets.length > 0) {
					var isWalletFound = _.find(userWallets, function (w) {
						return w.id === selectedKey;
					});

					if (!_.isNil(selectedKey) && !_.isNil(isWalletFound)) {
						this.setState({
							selectedWallet: userWallets[_.findIndex(userWallets, { id: selectedKey })]
						});
					} else {
						this.setState({
							selectedKey: userWallets[0].id,
							selectedWallet: userWallets[0]
						});
					}
				} else {
					delete this.state.selectedKey;
					delete this.state.selectedWallet;
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_MyAccountsViewInner2.default, _extends({}, this.props, this.state, {
					handleRowClick: this.handleRowClick
				}))
			);
		}
	}]);

	return MyAccounts;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.handleRowClick = function (value) {
		var userWallets = [];
		var userProviderList = _this2.props.userProviderList;


		userWallets = _.flatten(userProviderList.map(function (userProviderListItem) {
			return _.concat(userWallets, userProviderListItem.UserWallets);
		}));

		_this2.setState({
			selectedKey: value,
			selectedWallet: userWallets[_.findIndex(userWallets, { id: value })]
		});
	};
}, _temp);


function mapStateToProps(state, ownProps) {
	var selectedKey = 0;
	var selectedWallet = {};

	return {
		selectedKey: selectedKey,
		selectedWallet: selectedWallet
	};
}

MyAccounts.propTypes = {
	providerList: _react.PropTypes.array,
	userProviderList: _react.PropTypes.array,
	onSelectionChange: _react2.default.PropTypes.func.isRequired,
	onSelectionSubmit: _react2.default.PropTypes.func.isRequired
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MyAccounts);
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // libs


// src


// assets


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _materialUi = __webpack_require__(12);

var _AssociatedAddressesView = __webpack_require__(54);

var _AssociatedAddressesView2 = _interopRequireDefault(_AssociatedAddressesView);

var _Forms = __webpack_require__(38);

var _cached = __webpack_require__(74);

var _cached2 = _interopRequireDefault(_cached);

var _delete = __webpack_require__(27);

var _delete2 = _interopRequireDefault(_delete);

var _modeEdit = __webpack_require__(28);

var _modeEdit2 = _interopRequireDefault(_modeEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyAccountsViewInner = function MyAccountsViewInner(props) {
	var onDeleteClick = props.onDeleteClick,
	    onRefreshClick = props.onRefreshClick,
	    userProviderList = props.userProviderList,
	    isAddUserWalletList = props.isAddUserWalletList,
	    isRefreshUserWalletList = props.isRefreshUserWalletList,
	    isDeleteUserWalletList = props.isDeleteUserWalletList,
	    handleRowClick = props.handleRowClick,
	    selectedWallet = props.selectedWallet,
	    selectedKey = props.selectedKey,
	    actionOnThisWallet = props.actionOnThisWallet;
	var selectedWalletTransactions = selectedWallet.Transactions,
	    selectedWalletName = selectedWallet.walletName;

	var cyan500 = 'rgba(0, 188, 212, 0.6)';

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'h2',
			{ className: 'article-title' },
			'Wallets'
		),
		_react2.default.createElement(
			'div',
			{ className: 'row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-8 ' },
				_react2.default.createElement(
					'div',
					{ className: 'box box-default' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'box-header box-header-primary' },
							'Wallets & Exchanges'
						),
						_react2.default.createElement(
							'div',
							{ className: 'box-body' },
							_react2.default.createElement(
								'p',
								null,
								'Your connected wallet and exchange accounts are listed here.'
							),
							_react2.default.createElement(
								'div',
								{ className: 'box box-default table-box table-responsive mdl-shadow--2dp' },
								_react2.default.createElement(
									'table',
									{ className: 'mdl-data-table' },
									_react2.default.createElement(
										'thead',
										{ className: 'tbl-header' },
										_react2.default.createElement(
											'tr',
											null,
											_react2.default.createElement(
												'th',
												{ className: 'mdl-data-table__cell--non-numeric' },
												'Wallet'
											),
											_react2.default.createElement(
												'th',
												{ className: 'mdl-data-table__cell--non-numeric' },
												'Provider'
											),
											_react2.default.createElement(
												'th',
												{ className: 'mdl-data-table__cell--non-numeric' },
												'Balance'
											),
											_react2.default.createElement('th', null)
										)
									),
									_react2.default.createElement(
										'tbody',
										{ className: 'tbl-body' },
										isAddUserWalletList ? _react2.default.createElement(
											'tr',
											null,
											_react2.default.createElement(
												'td',
												{ colSpan: '4', className: 'text-center' },
												_react2.default.createElement(_materialUi.CircularProgress, { size: 30, thickness: 3 })
											)
										) : userProviderList && userProviderList[0] && userProviderList[0].UserWallets.length > 0 ? userProviderList.map(function (userProviderListItem) {
											return userProviderListItem.UserWallets.map(function (userWallet) {
												var id = userWallet.id,
												    walletId = userWallet.walletId,
												    walletName = userWallet.walletName,
												    balance = userWallet.balance,
												    currency = userWallet.currency,
												    updatedWalletAt = userWallet.updatedWalletAt;
												var userProviderId = userProviderListItem.id,
												    provider = userProviderListItem.provider;


												return _react2.default.createElement(
													'tr',
													{ key: id, onClick: handleRowClick.bind(undefined, id) },
													_react2.default.createElement(
														'td',
														{ className: 'mdl-data-table__cell--non-numeric' },
														walletName,
														_react2.default.createElement('br', null),
														_react2.default.createElement(
															'span',
															{ className: 'secondary-text' },
															walletId
														)
													),
													_react2.default.createElement(
														'td',
														{ className: 'mdl-data-table__cell--non-numeric' },
														provider.displayName
													),
													_react2.default.createElement(
														'td',
														{ className: 'mdl-data-table__cell--non-numeric' },
														balance,
														' ',
														currency,
														' ',
														_react2.default.createElement('br', null),
														_react2.default.createElement(
															'span',
															{ className: 'secondary-text' },
															(0, _moment2.default)(updatedWalletAt).fromNow()
														)
													),
													_react2.default.createElement(
														'td',
														null,
														_react2.default.createElement(
															_materialUi.IconButton,
															{
																onClick: onRefreshClick.bind(undefined, userProviderId),
																disabled: isRefreshUserWalletList || isDeleteUserWalletList },
															isRefreshUserWalletList && actionOnThisWallet == userProviderId ? _react2.default.createElement(_materialUi.RefreshIndicator, { status: 'loading', top: 12, left: 12, size: 25 }) : _react2.default.createElement(_cached2.default, { color: cyan500 })
														),
														_react2.default.createElement(
															_materialUi.IconButton,
															{
																onClick: onDeleteClick.bind(undefined, id),
																disabled: isRefreshUserWalletList || isDeleteUserWalletList },
															isDeleteUserWalletList && actionOnThisWallet == id ? _react2.default.createElement(_materialUi.RefreshIndicator, { status: 'loading', top: 12, left: 12, size: 25 }) : _react2.default.createElement(_delete2.default, { color: cyan500 })
														)
													)
												);
											});
										}) : _react2.default.createElement(
											'tr',
											null,
											_react2.default.createElement(
												'td',
												{ colSpan: '4', className: 'text-center' },
												'Wallets from connected accounts will show up here.'
											)
										)
									)
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'box-header box-header-primary' },
							_.isNil(selectedWalletName) ? 'Associated Addresses' : 'Associated Addresses of ' + selectedWalletName
						),
						_react2.default.createElement(
							'div',
							{ className: 'box-body' },
							_react2.default.createElement(
								'p',
								null,
								'These addresses were found in the transaction histories of your connected wallets.'
							),
							_react2.default.createElement(_AssociatedAddressesView2.default, _extends({}, props, {
								isRefreshing: isRefreshUserWalletList,
								isDeleting: isDeleteUserWalletList,
								relatedTransactions: selectedWalletTransactions,
								type: 'WALLET_ASSOC_ADDRESS_NICK' }))
						)
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-4' },
				_react2.default.createElement(
					'div',
					{ className: 'box box-default' },
					_react2.default.createElement(
						'div',
						{ className: 'box-header box-header-primary' },
						'Add Account'
					),
					_react2.default.createElement(
						'div',
						{ className: 'box-body' },
						_react2.default.createElement(
							'p',
							null,
							'Connect to an online account by selecting a service provider from the dropdown.'
						),
						_react2.default.createElement(_Forms.ProviderForm, props)
					)
				)
			)
		)
	);
};

exports.default = MyAccountsViewInner;


{/* <div className="form-group">
 <SelectField
 	fullWidth
 	className="primary-select-field"
 	onChange={ onSelectionChange }
 	value={ selectedProvider }>
 	<MenuItem value={0} primaryText="Select a provider..." />
 	{providerList.map(provider => 
 		<MenuItem key={ provider.id } value={ provider.id } primaryText={ provider.displayName } />
 	)}
 </SelectField>
 </div>
 <RaisedButton label="Connect" onClick={ onSelectionSubmit } primary />
 <div className="divider" /> */}
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactRedux = __webpack_require__(4);

var _MyAddressesViewInner = __webpack_require__(104);

var _MyAddressesViewInner2 = _interopRequireDefault(_MyAddressesViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


//src


var MyAddresses = function (_React$Component) {
	_inherits(MyAddresses, _React$Component);

	function MyAddresses(props) {
		_classCallCheck(this, MyAddresses);

		var _this = _possibleConstructorReturn(this, (MyAddresses.__proto__ || Object.getPrototypeOf(MyAddresses)).call(this, props));

		_this.handleRowClick = function (value) {
			_this.setState({
				selectedKey: value,
				selectedAddress: _this.props.userAddressesList[_.findIndex(_this.props.userAddressesList, { id: value })]
			});
		};

		if (props.userAddressesList && props.userAddressesList[0] && props.userAddressesList[0].id) {
			_this.state = {
				selectedKey: props.userAddressesList[0].id,
				selectedAddress: props.userAddressesList[0]
			};
		}
		return _this;
	}

	_createClass(MyAddresses, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (!_.isNil(this.state)) {
				var _state = this.state,
				    selectedKey = _state.selectedKey,
				    selectedAddress = _state.selectedAddress;
				var userAddressesList = nextProps.userAddressesList;


				if (!_.isNil(userAddressesList) && !_.isNil(userAddressesList[0]) && !_.isNil(userAddressesList[0].id)) {
					var isAddressFound = _.find(userAddressesList, { id: selectedKey });

					if (!_.isNil(selectedKey) && !_.isNil(isAddressFound)) {
						this.setState({
							selectedAddress: userAddressesList[_.findIndex(userAddressesList, { id: selectedKey })]
						});
						return true;
					} else {
						this.setState({
							selectedKey: userAddressesList[0].id,
							selectedAddress: userAddressesList[0]
						});
						return true;
					}
				} else {
					delete this.state.selectedKey;
					delete this.state.selectedAddress;
					return true;
				}
			} else {
				var _userAddressesList = nextProps.userAddressesList;


				if (_userAddressesList && _userAddressesList[0] && _userAddressesList[0].id) {
					this.state = {
						selectedKey: _userAddressesList[0].id,
						selectedAddress: _userAddressesList[0]
					};
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_MyAddressesViewInner2.default, _extends({}, this.props, this.state, {
					handleRowClick: this.handleRowClick
				}))
			);
		}
	}]);

	return MyAddresses;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
	var selectedKey = 0;
	var selectedAddress = {};

	return {
		selectedKey: selectedKey,
		selectedAddress: selectedAddress
	};
}

MyAddresses.propTypes = {
	userAddressesList: _react.PropTypes.array
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MyAddresses);
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // libs


// src


// assets


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _reduxForm = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _materialUi = __webpack_require__(12);

var _commons = __webpack_require__(15);

var _cached = __webpack_require__(74);

var _cached2 = _interopRequireDefault(_cached);

var _delete = __webpack_require__(27);

var _delete2 = _interopRequireDefault(_delete);

var _modeEdit = __webpack_require__(28);

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _colors = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyAddressesViewInner = function MyAddressesViewInner(props) {
	var selectedKey = props.selectedKey,
	    handleRowClick = props.handleRowClick,
	    selectedAddress = props.selectedAddress,
	    userAddressesList = props.userAddressesList,
	    onDeleteAddressClick = props.onDeleteAddressClick,
	    onNicknameDialogOpen = props.onNicknameDialogOpen,
	    onRefreshAddressClick = props.onRefreshAddressClick,
	    isRefreshUserAddressList = props.isRefreshUserAddressList,
	    isDeleteUserAddressList = props.isDeleteUserAddressList,
	    isUpdateUserAddressList = props.isUpdateUserAddressList,
	    actionOnThisAddress = props.actionOnThisAddress;
	var selectedAddressNickname = selectedAddress.nickName,
	    selectedAddressTransactions = selectedAddress.AddressTransactions;


	return _react2.default.createElement(
		'div',
		{ className: 'border-top' },
		_react2.default.createElement(
			'h2',
			{ className: 'article-title' },
			'Addresses'
		),
		_react2.default.createElement(
			'div',
			{ className: 'row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-8' },
				_react2.default.createElement(
					'div',
					{ className: 'box box-default' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'box-header box-header-primary' },
							'My Addresses'
						),
						_react2.default.createElement(
							'div',
							{ className: 'box-body' },
							_react2.default.createElement(
								'p',
								null,
								'These are the addresses you added manually.'
							),
							_react2.default.createElement(
								'div',
								{ className: 'box box-default table-box table-responsive mdl-shadow--2dp' },
								_react2.default.createElement(
									'table',
									{ className: 'mdl-data-table' },
									_react2.default.createElement(
										'thead',
										{ className: 'tbl-header' },
										_react2.default.createElement(
											'tr',
											null,
											_react2.default.createElement(
												'th',
												{ className: 'mdl-data-table__cell--non-numeric' },
												'Nickname'
											),
											_react2.default.createElement(
												'th',
												{ className: 'mdl-data-table__cell--non-numeric' },
												'Address'
											),
											_react2.default.createElement(
												'th',
												{ className: 'mdl-data-table__cell--non-numeric' },
												'Balance'
											),
											_react2.default.createElement('th', null)
										)
									),
									_react2.default.createElement(
										'tbody',
										{ className: 'tbl-body' },
										userAddressesList && userAddressesList.length > 0 ? userAddressesList.map(function (userAddressesListItem) {
											var id = userAddressesListItem.id,
											    address = userAddressesListItem.address,
											    nickname = userAddressesListItem.nickName,
											    currency = userAddressesListItem.currency,
											    balance = userAddressesListItem.balance,
											    updated_at = userAddressesListItem.updated_at;


											return _react2.default.createElement(
												'tr',
												{ key: id, onClick: handleRowClick.bind(undefined, id) },
												_react2.default.createElement(
													'td',
													{ className: 'mdl-data-table__cell--non-numeric' },
													nickname
												),
												_react2.default.createElement(
													'td',
													{ className: 'mdl-data-table__cell--non-numeric' },
													address
												),
												_react2.default.createElement(
													'td',
													{ className: 'mdl-data-table__cell--non-numeric' },
													balance,
													' ',
													currency,
													' ',
													_react2.default.createElement('br', null),
													_react2.default.createElement(
														'span',
														{ className: 'secondary-text' },
														(0, _moment2.default)(updated_at).fromNow()
													)
												),
												_react2.default.createElement(
													'td',
													null,
													_react2.default.createElement(
														_materialUi.IconButton,
														{
															onClick: onRefreshAddressClick.bind(undefined, id),
															disabled: isRefreshUserAddressList || isUpdateUserAddressList || isDeleteUserAddressList },
														isRefreshUserAddressList && actionOnThisAddress == id ? _react2.default.createElement(_materialUi.RefreshIndicator, { status: 'loading', top: 12, left: 12, size: 25 }) : _react2.default.createElement(_cached2.default, { color: _colors.cyan300 })
													),
													_react2.default.createElement(
														_materialUi.IconButton,
														{
															onClick: onNicknameDialogOpen.bind(undefined, { id: id, address: address, oldNickname: nickname, type: 'ADDRESS_NICK' }),
															disabled: isRefreshUserAddressList || isUpdateUserAddressList || isDeleteUserAddressList },
														isUpdateUserAddressList && actionOnThisAddress == id ? _react2.default.createElement(_materialUi.RefreshIndicator, { status: 'loading', top: 12, left: 12, size: 25 }) : _react2.default.createElement(_modeEdit2.default, { color: _colors.cyan300 })
													),
													_react2.default.createElement(
														_materialUi.IconButton,
														{
															onClick: onDeleteAddressClick.bind(undefined, id),
															disabled: isRefreshUserAddressList || isUpdateUserAddressList || isDeleteUserAddressList },
														isDeleteUserAddressList && actionOnThisAddress == id ? _react2.default.createElement(_materialUi.RefreshIndicator, { status: 'loading', top: 12, left: 12, size: 25 }) : _react2.default.createElement(_delete2.default, { color: _colors.cyan300 })
													)
												)
											);
										}) : _react2.default.createElement(
											'tr',
											null,
											_react2.default.createElement(
												'td',
												{ colSpan: '4', className: 'text-center' },
												'BTC addresses you add manually will show up here.'
											)
										)
									)
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'box-header box-header-primary' },
							_.isNil(selectedAddressNickname) ? 'Associated Addresses' : 'Associated Addresses of ' + selectedAddressNickname
						),
						_react2.default.createElement(
							'div',
							{ className: 'box-body' },
							_react2.default.createElement(
								'p',
								null,
								'These addresses were found in the transaction histories of the addresses you manually added.'
							),
							_react2.default.createElement(_commons.AssociatedAddressesView, _extends({}, props, {
								isRefreshing: isRefreshUserAddressList,
								isDeleting: isDeleteUserAddressList,
								relatedTransactions: selectedAddressTransactions,
								type: 'ASSOC_ADDRESS_NICK' }))
						)
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-4' },
				_react2.default.createElement(_commons.NewAddressForm, props)
			)
		),
		_react2.default.createElement(_commons.NicknameDialog, props)
	);
};

exports.default = MyAddressesViewInner;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _PageAccountViewInner = __webpack_require__(106);

var _PageAccountViewInner2 = _interopRequireDefault(_PageAccountViewInner);

var _actions = __webpack_require__(10);

var _PageLoading = __webpack_require__(30);

var _PageLoading2 = _interopRequireDefault(_PageLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


var PageAccountView = function (_React$Component) {
	_inherits(PageAccountView, _React$Component);

	function PageAccountView(props) {
		_classCallCheck(this, PageAccountView);

		var _this = _possibleConstructorReturn(this, (PageAccountView.__proto__ || Object.getPrototypeOf(PageAccountView)).call(this, props));

		_this.connectProvider = function (event) {
			event.preventDefault();
			var selectedProvider = _this.state.selectedProvider;
			if (selectedProvider !== 0) {
				return _this.props.dispatch((0, _actions.accountconnectUrl)(selectedProvider)).then(function (action) {
					var error = action.error,
					    payload = action.payload;

					if (!error) {
						var url = payload.redirecturl;
						window.location = url;
						return action;
					}
				});
			}
		};

		_this.updateProviderSelection = function (event, index, value) {
			_this.setState({ selectedProvider: value });
		};

		_this.deleteUserWallet = function (value) {
			_this.setState({
				actionOnThisWallet: value
			}, function () {
				this.props.dispatch((0, _actions.deleteWallet)(value));
			});
		};

		_this.refreshUserWallets = function (value) {
			_this.setState({
				actionOnThisWallet: value
			}, function () {
				this.props.dispatch((0, _actions.refreshUserProviders)(value)).then(function (action) {
					var error = action.error,
					    payload = action.payload;


					if (!error && payload.redirecturl) {
						var url = payload.redirecturl;
						window.location = url;
						return action;
					}
				});
			});
		};

		_this.onRefreshAddressClick = function (value) {
			_this.setState({
				actionOnThisAddress: value
			}, function () {
				this.props.dispatch((0, _actions.refreshUserAddresses)(value));
			});
		};

		_this.onDeleteAddressClick = function (value) {
			_this.setState({
				actionOnThisAddress: value
			}, function () {
				this.props.dispatch((0, _actions.deleteUserAddress)(value));
			});
		};

		_this.handleSnackbarOpen = function (params) {
			var message = params.message,
			    duration = params.duration;


			_this.setState({
				isSnackbarOpen: true,
				snackMessage: message,
				autoHideDuration: duration ? duration : 4000
			});
		};

		_this.handleSnackbarClose = function () {
			_this.setState({
				isSnackbarOpen: false,
				snackMessage: null,
				autoHideDuration: 4000
			});
		};

		_this.handleNickDialogOpen = function (params) {
			var id = params.id,
			    address = params.address,
			    oldNickname = params.oldNickname,
			    type = params.type;
			var dispatch = _this.props.dispatch;


			_this.setState({
				addressId: id,
				address: address,
				oldNickname: oldNickname,
				nicknameType: type
			}, function () {
				dispatch((0, _actions.openNicknameDialog)());
			});
		};

		_this.handleNickDialogClose = function () {
			var dispatch = _this.props.dispatch;


			_this.setState({
				addressId: null,
				address: null,
				oldNickname: null,
				nicknameType: null
			}, function () {
				dispatch((0, _actions.closeNicknameDialog)());
			});
		};

		_this.state = {
			check: 1,
			addressId: null,
			address: null,
			oldNickname: null,
			nicknameType: null,
			isSnackbarOpen: false,
			snackMessage: null,
			autoHideDuration: 4000,
			actionOnThisAddress: null,
			actionOnThisWallet: null
		};
		return _this;
	}

	/* CONNECT TO WALLET OR EXCHANGE PROVIDER */


	/* UPDATE PROVIDER SELECTION FROM LIST */


	/* DELETE USER WALLETS */


	/* REFRESH USER WALLETS */


	/* REFRESH BTC ADDRESSES */


	/* DELETE BTC ADDRESS */


	_createClass(PageAccountView, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var dispatch = this.props.dispatch;

			var providerName = this.props.match.params.providername;
			if (providerName) {
				var paramsString = this.props.location.search;
				var tokenCode = paramsString.substring(paramsString.indexOf('=') + 1);
				if (tokenCode) {
					dispatch((0, _actions.providerCallback)(providerName, tokenCode)).then(function (action) {
						var error = action.error;

						if (!error) {
							dispatch((0, _actions.myAccountData)()).then(function (action) {
								var error = action.error;

								if (!error) {
									_this2.setState({
										check: 2
									});
								}
							});
						}
					});
				} else {
					dispatch((0, _actions.myAccountData)()).then(function (action) {
						var error = action.error;

						if (!error) {
							_this2.setState({
								check: 2
							});
						}
					});
				}
			} else {
				dispatch((0, _actions.myAccountData)()).then(function (action) {
					var error = action.error;

					if (!error) {
						_this2.setState({
							check: 2
						});
					}
				});
			}
		}

		/* HANDLER FUNCTIONS FOR SNACKBAR, MODALS */

	}, {
		key: "render",
		value: function render() {
			if (this.state.check === 1) {
				return _react2.default.createElement(_PageLoading2.default, this.props);
			} else if (this.state.check === 2) {
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(_PageAccountViewInner2.default, _extends({
						onSelectionChange: this.updateProviderSelection,
						onDeleteClick: this.deleteUserWallet,
						onRefreshClick: this.refreshUserWallets,
						onSelectionSubmit: this.connectProvider,
						updateAddressesValue: this.updateAddressesValue,
						onRefreshAddressClick: this.onRefreshAddressClick,
						onDeleteAddressClick: this.onDeleteAddressClick,
						onNicknameDialogOpen: this.handleNickDialogOpen,
						onNicknameDialogClose: this.handleNickDialogClose,
						onSnackbarOpen: this.handleSnackbarOpen,
						onSnackbarClose: this.handleSnackbarClose
					}, this.props, this.state))
				);
			}
		}
	}]);

	return PageAccountView;
}(_react2.default.Component);

/* redux connect() and related functions */


function mapStateToProps(state, ownProps) {
	var providerList = state.entities.accounts.providerList;
	var userProviderList = state.entities.accounts.userProviderList;
	var userAddressesList = state.entities.accounts.userAddressesList;
	var isRefreshUserWalletList = state.entities.accounts.refreshUserWalletList;
	var isDeleteUserWalletList = state.entities.accounts.deleteUserWalletList;
	var isAddUserAddressList = state.entities.accounts.addUserAddressList;
	var isRefreshUserAddressList = state.entities.accounts.refreshUserAddressList;
	var isDeleteUserAddressList = state.entities.accounts.deleteUserAddressList;
	var isUpdateUserAddressList = state.entities.accounts.updateUserAddressList;
	var isNicknameDialogOpen = state.entities.accounts.isNicknameDialogOpen;

	return {
		providerList: providerList,
		userProviderList: userProviderList,
		userAddressesList: userAddressesList,
		isRefreshUserWalletList: isRefreshUserWalletList,
		isDeleteUserWalletList: isDeleteUserWalletList,
		isAddUserAddressList: isAddUserAddressList,
		isRefreshUserAddressList: isRefreshUserAddressList,
		isDeleteUserAddressList: isDeleteUserAddressList,
		isUpdateUserAddressList: isUpdateUserAddressList,
		isNicknameDialogOpen: isNicknameDialogOpen
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PageAccountView);
module.exports = exports["default"];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _MyAddressesView = __webpack_require__(103);

var _MyAddressesView2 = _interopRequireDefault(_MyAddressesView);

var _MyAccountsView = __webpack_require__(101);

var _MyAccountsView2 = _interopRequireDefault(_MyAccountsView);

var _PageAccountViewInner = __webpack_require__(233);

var _PageAccountViewInner2 = _interopRequireDefault(_PageAccountViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var PageAccountViewInner = function PageAccountViewInner(props) {
		return _react2.default.createElement(
				"section",
				{ className: "container-fluid chapter" },
				_react2.default.createElement(_reactDocumentTitle2.default, { title: "Accounts" }),
				_react2.default.createElement(
						_rcQueueAnim2.default,
						{ type: "bottom", className: "ui-animate" },
						_react2.default.createElement(
								"article",
								{ key: "1", className: "article" },
								_react2.default.createElement(
										"div",
										null,
										_react2.default.createElement(_MyAccountsView2.default, props)
								),
								_react2.default.createElement("div", { className: "divider" }),
								_react2.default.createElement(
										"div",
										null,
										_react2.default.createElement(_MyAddressesView2.default, props)
								)
						)
				)
		);
};

PageAccountViewInner.propTypes = {
		providerList: _react.PropTypes.array,
		userProviderList: _react.PropTypes.array,
		userAddressesList: _react.PropTypes.array,
		onSelectionChange: _react2.default.PropTypes.func.isRequired,
		onSelectionSubmit: _react2.default.PropTypes.func.isRequired,
		onRefreshAddressClick: _react2.default.PropTypes.func.isRequired,
		onDeleteAddressClick: _react2.default.PropTypes.func.isRequired
};

exports.default = PageAccountViewInner;
module.exports = exports["default"];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageAccountView = __webpack_require__(105);

var _PageAccountView2 = _interopRequireDefault(_PageAccountView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageAccountView2.default;
module.exports = exports['default'];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _PageCalculateViewInner = __webpack_require__(109);

var _PageCalculateViewInner2 = _interopRequireDefault(_PageCalculateViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


var PageCalculateView = function (_React$Component) {
  _inherits(PageCalculateView, _React$Component);

  function PageCalculateView(props) {
    _classCallCheck(this, PageCalculateView);

    var _this = _possibleConstructorReturn(this, (PageCalculateView.__proto__ || Object.getPrototypeOf(PageCalculateView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PageCalculateView, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_PageCalculateViewInner2.default, this.props);
    }
  }]);

  return PageCalculateView;
}(_react2.default.Component);

exports.default = PageCalculateView;
module.exports = exports["default"];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageCalculateViewInner = __webpack_require__(234);

var _PageCalculateViewInner2 = _interopRequireDefault(_PageCalculateViewInner);

var _reactRouterDom = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageCalculateViewInner = function PageCalculateViewInner(props) {
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_reactDocumentTitle2.default, { title: "Calculate" }),
		_react2.default.createElement(
			"section",
			{ className: "container-fluid" },
			_react2.default.createElement(
				_rcQueueAnim2.default,
				{ type: "bottom", className: "ui-animate" },
				_react2.default.createElement(
					"div",
					{ key: "1" },
					_react2.default.createElement(
						"article",
						{ className: "article" },
						_react2.default.createElement(
							"h2",
							{ className: "article-title article-title-primary" },
							"Calculate"
						)
					)
				)
			)
		)
	);
}; // libs
exports.default = PageCalculateViewInner;
module.exports = exports["default"];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageCalculateView = __webpack_require__(108);

var _PageCalculateView2 = _interopRequireDefault(_PageCalculateView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageCalculateView2.default;
module.exports = exports['default'];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _PageChartsViewInner = __webpack_require__(112);

var _PageChartsViewInner2 = _interopRequireDefault(_PageChartsViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


var PageChartsView = function (_React$Component) {
  _inherits(PageChartsView, _React$Component);

  function PageChartsView(props) {
    _classCallCheck(this, PageChartsView);

    var _this = _possibleConstructorReturn(this, (PageChartsView.__proto__ || Object.getPrototypeOf(PageChartsView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PageChartsView, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_PageChartsViewInner2.default, this.props);
    }
  }]);

  return PageChartsView;
}(_react2.default.Component);

exports.default = PageChartsView;
module.exports = exports["default"];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageChartsViewInner = __webpack_require__(235);

var _PageChartsViewInner2 = _interopRequireDefault(_PageChartsViewInner);

var _reactRouterDom = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageChartsViewInner = function PageChartsViewInner(props) {
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_reactDocumentTitle2.default, { title: "Charts" }),
		_react2.default.createElement(
			"section",
			{ className: "container-fluid" },
			_react2.default.createElement(
				_rcQueueAnim2.default,
				{ type: "bottom", className: "ui-animate" },
				_react2.default.createElement(
					"div",
					{ key: "1" },
					_react2.default.createElement(
						"article",
						{ className: "article" },
						_react2.default.createElement(
							"h2",
							{ className: "article-title article-title-primary" },
							"Charts"
						)
					)
				)
			)
		)
	);
}; // libs
exports.default = PageChartsViewInner;
module.exports = exports["default"];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageChartsView = __webpack_require__(111);

var _PageChartsView2 = _interopRequireDefault(_PageChartsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageChartsView2.default;
module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // libs


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageErrorView = __webpack_require__(236);

var _PageErrorView2 = _interopRequireDefault(_PageErrorView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
  var events = state.entities.events;


  return {
    events: events
  };
};

var PageErrorView = (_dec = (0, _reactRedux.connect)(mapStateToProps), _dec(_class = function (_React$Component) {
  _inherits(PageErrorView, _React$Component);

  function PageErrorView(props) {
    _classCallCheck(this, PageErrorView);

    var _this = _possibleConstructorReturn(this, (PageErrorView.__proto__ || Object.getPrototypeOf(PageErrorView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PageErrorView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: _PageErrorView2.default.root + ' row' },
        _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Dashboard - Wisdom' }),
        _react2.default.createElement('div', { className: 'col-lg-2' }),
        _react2.default.createElement(
          'div',
          { className: 'col-lg-8' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-lg-8' },
              _react2.default.createElement(
                'h1',
                null,
                'Error Page'
              )
            ),
            _react2.default.createElement('div', { className: 'col-lg-4' })
          )
        )
      );
    }
  }]);

  return PageErrorView;
}(_react2.default.Component)) || _class);
exports.default = PageErrorView;
module.exports = exports['default'];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageErrorView = __webpack_require__(114);

var _PageErrorView2 = _interopRequireDefault(_PageErrorView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageErrorView2.default;
module.exports = exports['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _PageForgotPasswordInner = __webpack_require__(117);

var _PageForgotPasswordInner2 = _interopRequireDefault(_PageForgotPasswordInner);

var _users = __webpack_require__(24);

var _utils = __webpack_require__(3);

var _actions = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['email'];

var validate = function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field';
    hasErrors = true;
  } else if (!/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    hasErrors = true;
  }
  return hasErrors && errors;
};

var PageForgotPassword = (_dec = (0, _reduxForm.reduxForm)({
  form: 'forgotPasswordForm',
  fields: fields,
  validate: validate,
  touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
  onSubmit: function onSubmit(values, dispatch, props) {
    var email = values.email;


    return dispatch((0, _users.forgotPassword)(email)).then(function (action) {
      return action;
    });
  }
}), _dec(_class = _dec2(_class = function (_React$Component) {
  _inherits(PageForgotPassword, _React$Component);

  _createClass(PageForgotPassword, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _actions.resetErrorMessages)());
    }
  }]);

  function PageForgotPassword(props) {
    _classCallCheck(this, PageForgotPassword);

    return _possibleConstructorReturn(this, (PageForgotPassword.__proto__ || Object.getPrototypeOf(PageForgotPassword)).call(this, props));
  }

  _createClass(PageForgotPassword, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_PageForgotPasswordInner2.default, this.props);
    }
  }]);

  return PageForgotPassword;
}(_react2.default.Component)) || _class) || _class);
exports.default = PageForgotPassword;
module.exports = exports['default'];

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(8);

var _Paper = __webpack_require__(48);

var _Paper2 = _interopRequireDefault(_Paper);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _RaisedButton = __webpack_require__(36);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _TextField = __webpack_require__(49);

var _TextField2 = _interopRequireDefault(_TextField);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

__webpack_require__(237);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
// libs
var PageForgotPasswordInner = function PageForgotPasswordInner(props) {
  var onSubmit = props.onSubmit,
      renderSubmitButton = props.renderSubmitButton,
      renderMessage = props.renderMessage;


  return _react2.default.createElement(
    'div',
    { className: 'page-login' },
    _react2.default.createElement(
      'div',
      { className: 'main-body' },
      _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Forgot Password - Wisdom' }),
      _react2.default.createElement(
        _rcQueueAnim2.default,
        { type: 'bottom', className: 'ui-animate' },
        _react2.default.createElement(
          'div',
          { key: '1' },
          _react2.default.createElement(
            'div',
            { className: 'body-inner' },
            _react2.default.createElement(
              'div',
              { className: 'card bg-white' },
              _react2.default.createElement(
                'div',
                { className: 'card-content' },
                _react2.default.createElement(
                  'section',
                  { className: 'logo text-center' },
                  _react2.default.createElement(
                    'h1',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '#/' },
                      'Forgot Password'
                    )
                  ),
                  renderMessage()
                ),
                _react2.default.createElement(
                  'form',
                  null,
                  _react2.default.createElement(
                    'fieldset',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'email', label: 'Email', component: _utils.renderTextField, autoComplete: 'off' }),
                      _react2.default.createElement(
                        'div',
                        { className: 'additional-info text-center text-small' },
                        'Provide the email address that you used to register. We\'ll send you an email with a link to reset your password.'
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-action no-border text-right' },
                renderSubmitButton({
                  label: 'Reset',
                  labelWhenSubmitting: 'Reset'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'additional-info' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/login' },
                'Login'
              ),
              _react2.default.createElement('span', { className: 'divider-h' }),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/register' },
                'Sign Up'
              )
            )
          )
        )
      )
    )
  )
  /*
      <div className={`${styles.root} row`}>
        <div className="col-lg-6 col-lg-offset-3">
          <DocumentTitle title="Login - Sauron"/>
          <Paper>
            <form className={styles.root} onSubmit={onSubmit}>
              <h2 className="dialog-heading" style={{textAlign: 'center'}}>Sign in</h2>
              {
                renderMessage()
              }
              <Field name="email" label="Email" component={renderTextField} autoFocus/>
              <Field name="password" label="Password" component={renderTextField} type="password"/>
              <div className={styles.btnSubmitContainer}>
                {
                    renderSubmitButton({
                        label: 'Login',
                        labelWhenSubmitting: 'Logging in ...'
                    })
                }
              </div>
              <div className={styles.instructionsContainer}>
              </div>
              <input type="submit" style={{display: 'none'}}/>
            </form>
          </Paper>
        </div>
      </div>
      */
  ;
};

exports.default = PageForgotPasswordInner;
module.exports = exports['default'];

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageForgotPassword = __webpack_require__(116);

var _PageForgotPassword2 = _interopRequireDefault(_PageForgotPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageForgotPassword2.default;
module.exports = exports['default'];

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _reactSpinnerMaterial = __webpack_require__(77);

var _reactSpinnerMaterial2 = _interopRequireDefault(_reactSpinnerMaterial);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


//import './PageLoading.scss';

var PageLoading = function (_React$Component) {
  _inherits(PageLoading, _React$Component);

  function PageLoading(props) {
    _classCallCheck(this, PageLoading);

    var _this = _possibleConstructorReturn(this, (PageLoading.__proto__ || Object.getPrototypeOf(PageLoading)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PageLoading, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "page-login" },
        _react2.default.createElement(
          "div",
          { className: "main-body" },
          _react2.default.createElement(_reactDocumentTitle2.default, { title: "Wisdom" }),
          _react2.default.createElement(
            _rcQueueAnim2.default,
            { type: "bottom", className: "ui-animate" },
            _react2.default.createElement(
              "div",
              { key: "1" },
              _react2.default.createElement(
                "div",
                { className: "text-center" },
                _react2.default.createElement(_reactSpinnerMaterial2.default, { width: 100,
                  height: 120,
                  spinnerColor: "#333",
                  spinnerWidth: 2,
                  show: true })
              )
            )
          )
        )
      );
    }
  }]);

  return PageLoading;
}(_react2.default.Component);

exports.default = PageLoading;
module.exports = exports["default"];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class; // libs


// src 


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactRouterRedux = __webpack_require__(17);

var _reactRedux = __webpack_require__(4);

var _PageLoginInner = __webpack_require__(121);

var _PageLoginInner2 = _interopRequireDefault(_PageLoginInner);

var _PageLoading = __webpack_require__(30);

var _PageLoading2 = _interopRequireDefault(_PageLoading);

var _users = __webpack_require__(24);

var _actions = __webpack_require__(10);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['email', 'password', 'rememberMe'];

var validate = function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field';
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    hasErrors = true;
  }

  if (!values.password || !values.password.trim() === '') {
    errors.password = 'Missing password field';
    hasErrors = true;
  }
  return hasErrors && errors;
};

var PageLogin = (_dec = (0, _reduxForm.reduxForm)({
  form: 'loginForm',
  fields: fields,
  validate: validate,
  touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
  onSubmit: function onSubmit(values, dispatch, props) {
    var email = values.email,
        password = values.password,
        rememberMe = values.rememberMe;


    return dispatch((0, _users.login)(email, password, rememberMe)).then(function (action) {
      var error = action.error;

      if (!error) {
        // const linkNext = _.get(payload, 'user.linkHome', '/')
        dispatch((0, _reactRouterRedux.push)('/system'));
      }
      return action;
    });
  }
}), _dec(_class = _dec2(_class = function (_React$Component) {
  _inherits(PageLogin, _React$Component);

  function PageLogin(props) {
    _classCallCheck(this, PageLogin);

    var _this = _possibleConstructorReturn(this, (PageLogin.__proto__ || Object.getPrototypeOf(PageLogin)).call(this, props));

    _this.handleNoSpaces = function (e) {
      var fieldName = e.target.name;
      var fieldValue = e.target.value;
      if (fieldValue === ' ') {
        _this.props.dispatch((0, _reduxForm.change)('registerForm', fieldName, ''));
        e.preventDefault();
      }
    };

    _this.state = {
      check: 1
      /* check : 1,
      isSnackbarOpen: false,
      snackMessage: null,
      autoHideDuration: 4000 */
    };
    return _this;
  }

  _createClass(PageLogin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.props.dispatch((0, _reduxForm.change)('loginForm', 'password', ' '));
        _this2.props.dispatch((0, _reduxForm.change)('loginForm', 'password', ''));
      }, 50);

      var dispatch = this.props.dispatch;


      var token = this.props.match.params.usertoken;
      var userId = this.props.match.params.id;
      if (token) {
        dispatch((0, _users.confirmRegistration)(token)).then(function (action) {
          var error = action.error;

          if (!error) {
            _this2.setState({
              check: 2
            });
          } else {
            _this2.setState({
              check: 3
            });
          }
        });
      } else if (userId) {
        dispatch((0, _users.resendActivation)(userId)).then(function (action) {
          var error = action.error;

          if (!error) {
            _this2.setState({
              check: 2
            });
          } else {
            _this2.setState({
              check: 3
            });
          }
        });
      } else {
        this.setState({
          check: 2
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _actions.resetErrorMessages)());
    }
    /* HANDLER FUNCTIONS FOR SNACKBAR, MODALS */
    /* handleSnackbarOpen = (params) => {
    	const { message, duration } = params
    	
    	this.setState({
    		isSnackbarOpen: true,
    		snackMessage: message,
    		autoHideDuration: duration ? duration : 4000
    	})
    }
    
    handleSnackbarClose = () => {
    	this.setState({
    		isSnackbarOpen: false, 
    		snackMessage: null,
    		autoHideDuration: 4000
    	})
    }*/

  }, {
    key: 'render',
    value: function render() {
      if (this.state.check === 1) {
        return _react2.default.createElement(_PageLoading2.default, this.props);
      } else if (this.state.check === 2) {
        return _react2.default.createElement(_PageLoginInner2.default, _extends({}, this.props, {
          // onSnackbarOpen={ this.handleSnackbarOpen }
          // onSnackbarClose={ this.handleSnackbarClose}
          onHandleNoSpaces: this.handleNoSpaces }));
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Bad Request!'
          ),
          _react2.default.createElement(
            'h3',
            null,
            'Activate account token is invalid'
          )
        );
      }
    }
  }]);

  return PageLogin;
}(_react2.default.Component)) || _class) || _class);


var mapStateToProps = function mapStateToProps(state) {
  var isLoadingLogin = state.entities.users.isLoading;
  if (state.errorMessage) {
    var message = state.errorMessage.message;

    return { message: message, isLoadingLogin: isLoadingLogin };
  } else {
    var user = state.auth.user;

    return { user: user, isLoadingLogin: isLoadingLogin };
  }
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PageLogin);
module.exports = exports['default'];

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(8);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _CircularProgress = __webpack_require__(270);

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

__webpack_require__(238);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
// libs
var PageLoginInner = function PageLoginInner(props) {
  var onSubmit = props.onSubmit,
      renderSubmitButton = props.renderSubmitButton,
      renderMessage = props.renderMessage,
      isLoadingLogin = props.isLoadingLogin,
      message = props.message,
      onHandleNoSpaces = props.onHandleNoSpaces;


  return _react2.default.createElement(
    'div',
    { className: 'page-login' },
    _react2.default.createElement(
      'div',
      { className: 'main-body' },
      _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Login - Wisdom' }),
      _react2.default.createElement(
        _rcQueueAnim2.default,
        { type: 'bottom', className: 'ui-animate' },
        _react2.default.createElement(
          'div',
          { key: '1' },
          _react2.default.createElement(
            'div',
            { className: 'body-inner' },
            _react2.default.createElement(
              'div',
              { className: 'card bg-white' },
              _react2.default.createElement(
                'div',
                { className: 'card-content' },
                _react2.default.createElement(
                  'section',
                  { className: 'logo text-center' },
                  _react2.default.createElement(
                    'h1',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '#/' },
                      'Wisdom'
                    )
                  ),
                  !_.isNil(message) ? renderMessage(message) : null
                ),
                _react2.default.createElement(
                  'form',
                  { className: 'form-horizontal', onSubmit: onSubmit },
                  _react2.default.createElement(
                    'fieldset',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'email', label: 'Email', component: _utils.renderTextField, autoComplete: 'off', onChange: onHandleNoSpaces.bind(undefined) })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'password', label: 'Password', type: 'password', component: _utils.renderTextField,
                        autoComplete: 'off' })
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'card-action no-border text-right' },
                    isLoadingLogin ? _react2.default.createElement(_CircularProgress2.default, { size: 15, thickness: 2 }) : null,
                    renderSubmitButton({
                      label: 'Login',
                      labelWhenSubmitting: 'Logging in ...'
                    })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'additional-info back-plate' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/register' },
                'Sign Up'
              ),
              _react2.default.createElement('span', { className: 'divider-h' }),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/forgotPassword' },
                'Forgot your password?'
              )
            )
          )
        )
      )
    )
  );
};
// import iSnackbar from '../commons/MySnackbar'
exports.default = PageLoginInner;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageLogin = __webpack_require__(120);

var _PageLogin2 = _interopRequireDefault(_PageLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageLogin2.default;
module.exports = exports['default'];

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageLogout = (_dec = (0, _reactRedux.connect)(null, { logout: _actions.logout }), _dec(_class = function (_React$Component) {
  _inherits(PageLogout, _React$Component);

  function PageLogout(props) {
    _classCallCheck(this, PageLogout);

    return _possibleConstructorReturn(this, (PageLogout.__proto__ || Object.getPrototypeOf(PageLogout)).call(this, props));
  }

  _createClass(PageLogout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var logout = this.props.logout;

      logout();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return PageLogout;
}(_react2.default.Component)) || _class);
exports.default = PageLogout;
module.exports = exports['default'];

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageLogout = __webpack_require__(123);

var _PageLogout2 = _interopRequireDefault(_PageLogout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageLogout2.default;
module.exports = exports['default'];

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _PagePrivacyInner = __webpack_require__(126);

var _PagePrivacyInner2 = _interopRequireDefault(_PagePrivacyInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


var PagePrivacy = function (_React$Component) {
  _inherits(PagePrivacy, _React$Component);

  function PagePrivacy(props) {
    _classCallCheck(this, PagePrivacy);

    var _this = _possibleConstructorReturn(this, (PagePrivacy.__proto__ || Object.getPrototypeOf(PagePrivacy)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PagePrivacy, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_PagePrivacyInner2.default, this.props);
    }
  }]);

  return PagePrivacy;
}(_react2.default.Component);

exports.default = PagePrivacy;
module.exports = exports["default"];

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PagePrivacyInner = __webpack_require__(239);

var _PagePrivacyInner2 = _interopRequireDefault(_PagePrivacyInner);

var _reactRouterDom = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var PagePrivacyInner = function PagePrivacyInner(props) {
  return _react2.default.createElement(
    "div",
    { className: "" + _PagePrivacyInner2.default.root },
    _react2.default.createElement(_reactDocumentTitle2.default, { title: "Privacy - Wisdom" }),
    _react2.default.createElement(
      "h2",
      null,
      "Privacy Policy"
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "/login", className: "color-primary" },
      "Login"
    ),
    _react2.default.createElement("span", { className: "divider-pipe" }),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "/register", className: "color-primary" },
      "Register"
    )
  );
};

exports.default = PagePrivacyInner;
module.exports = exports["default"];

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PagePrivacy = __webpack_require__(125);

var _PagePrivacy2 = _interopRequireDefault(_PagePrivacy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PagePrivacy2.default;
module.exports = exports['default'];

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class; // libs


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactRouterRedux = __webpack_require__(17);

var _PageRegisterInner = __webpack_require__(129);

var _PageRegisterInner2 = _interopRequireDefault(_PageRegisterInner);

var _users = __webpack_require__(24);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['firstName', 'lastName', 'email', 'password'];

var validate = function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.firstName || !values.firstName.trim() === '') {
    errors.firstName = 'Missing first name field';
    hasErrors = true;
  } else {
    if (!/^[A-Za-z]/.test(values.firstName)) {
      errors.firstName = 'Invalid input. Type with an open eye?';
      hasErrors = true;
    }
    if (values.firstName.length > 32) {
      errors.firstName = 'You can\'t possibly have that huge a first name. Try again?';
      hasErrors = true;
    }
  }
  if (!values.lastName || !values.lastName.trim() === '') {
    errors.lastName = 'Missing last name field';
    hasErrors = true;
  } else {
    if (!/^[A-Za-z]/.test(values.lastName)) {
      errors.lastName = 'Invalid input. Type with an open eye?';
      hasErrors = true;
    }
    if (values.lastName.length > 32) {
      errors.lastName = 'You can\'t possibly have that huge a first name. Try again?';
      hasErrors = true;
    }
  }
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field';
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    hasErrors = true;
  }
  if (!values.password || !values.password.trim() === '') {
    errors.password = 'Missing password field';
    hasErrors = true;
  } else if (values.password.length < 6) {
    errors.password = "Password should have at least 6 characters";
    hasErrors = true;
  }
  if (!values.confirmPassword || !values.confirmPassword.trim() === '') {
    if (values.password) {
      errors.confirmPassword = 'Re-type password';
      hasErrors = true;
    } else {
      errors.confirmPassword = 'Missing confirm password field';
      hasErrors = true;
    }
  }
  if (values.password && values.confirmPassword) {
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = 'These passwords don\'t match. Try again?';
      hasErrors = true;
    }
  }
  return hasErrors && errors;
};

var PageRegister = (_dec = (0, _reduxForm.reduxForm)({
  form: 'registerForm',
  fields: fields,
  validate: validate,
  touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
  onSubmit: function onSubmit(values, dispatch, props) {
    var firstName = values.firstName,
        lastName = values.lastName,
        email = values.email,
        password = values.password;


    return dispatch((0, _users.register)(firstName, lastName, email, password)).then(function (action) {
      return action;
    });
  }
}), _dec(_class = _dec2(_class = function (_React$Component) {
  _inherits(PageRegister, _React$Component);

  function PageRegister(props) {
    _classCallCheck(this, PageRegister);

    var _this = _possibleConstructorReturn(this, (PageRegister.__proto__ || Object.getPrototypeOf(PageRegister)).call(this, props));

    _this.handleNoSpaces = function (e) {
      var fieldName = e.target.name;
      var fieldValue = e.target.value;
      if (fieldValue == ' ') {
        _this.props.dispatch((0, _reduxForm.change)('registerForm', fieldName, ''));
        e.preventDefault();
      }
    };

    return _this;
  }

  _createClass(PageRegister, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_PageRegisterInner2.default, _extends({}, this.props, { onHandleNoSpaces: this.handleNoSpaces }));
    }
  }]);

  return PageRegister;
}(_react2.default.Component)) || _class) || _class);
exports.default = PageRegister;
module.exports = exports['default'];

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(8);

var _Paper = __webpack_require__(48);

var _Paper2 = _interopRequireDefault(_Paper);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _RaisedButton = __webpack_require__(36);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _TextField = __webpack_require__(49);

var _TextField2 = _interopRequireDefault(_TextField);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

__webpack_require__(240);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
// libs
var PageRegisterInner = function PageRegisterInner(props) {
  var onSubmit = props.onSubmit,
      renderSubmitButton = props.renderSubmitButton,
      renderMessage = props.renderMessage,
      onHandleNoSpaces = props.onHandleNoSpaces;


  return _react2.default.createElement(
    'div',
    { className: 'page-login' },
    _react2.default.createElement(
      'div',
      { className: 'main-body main-body-primary' },
      _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Register - Wisdom' }),
      _react2.default.createElement(
        _rcQueueAnim2.default,
        { type: 'bottom', className: 'ui-animate' },
        _react2.default.createElement(
          'div',
          { key: '1' },
          _react2.default.createElement(
            'div',
            { className: 'body-inner' },
            _react2.default.createElement(
              'div',
              { className: 'card bg-white' },
              _react2.default.createElement(
                'div',
                { className: 'card-content' },
                _react2.default.createElement(
                  'section',
                  { className: 'logo text-center' },
                  _react2.default.createElement(
                    'h1',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '#/' },
                      'Sign Up'
                    )
                  ),
                  renderMessage()
                ),
                _react2.default.createElement(
                  'form',
                  { className: 'form-horizontal' },
                  _react2.default.createElement(
                    'fieldset',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'firstName', label: 'First Name', autoComplete: 'off', component: _utils.renderTextField, onChange: onHandleNoSpaces.bind(undefined) })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'lastName', label: 'Last Name', autoComplete: 'off', component: _utils.renderTextField, onChange: onHandleNoSpaces.bind(undefined) })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'email', label: 'Email', autoComplete: 'off', component: _utils.renderTextField, onChange: onHandleNoSpaces.bind(undefined) })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'password', label: 'Password', type: 'password', autoComplete: 'off', component: _utils.renderTextField })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'confirmPassword', label: 'Confirm Password', type: 'password', autoComplete: 'off', component: _utils.renderTextField })
                    ),
                    _react2.default.createElement('div', { className: 'divider' }),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'p',
                        { className: 'text-small' },
                        'By clicking on sign up, you agree to ',
                        _react2.default.createElement(
                          _reactRouterDom.Link,
                          { to: '/terms' },
                          _react2.default.createElement(
                            'i',
                            null,
                            'terms'
                          )
                        ),
                        ' and ',
                        _react2.default.createElement(
                          _reactRouterDom.Link,
                          { to: '/privacy' },
                          _react2.default.createElement(
                            'i',
                            null,
                            'privacy policy'
                          )
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'card-action no-border text-right' },
                    _react2.default.createElement(
                      _reactRouterDom.Link,
                      { to: '/login', className: 'color-gray-light' },
                      'Login'
                    ),
                    renderSubmitButton({
                      label: 'Sign Up',
                      labelWhenSubmitting: 'Sign Up'
                    })
                  )
                )
              )
            )
          )
        )
      )
    )
  )
  /*
      <div className={`${styles.root} row`}>
        <div className="col-lg-6 col-lg-offset-3">
          <DocumentTitle title="Login - Sauron"/>
          <Paper>
            <form className={styles.root} onSubmit={onSubmit}>
              <h2 className="dialog-heading" style={{textAlign: 'center'}}>Sign in</h2>
              {
                renderMessage()
              }
              <Field name="email" label="Email" component={renderTextField} autoFocus/>
              <Field name="password" label="Password" component={renderTextField} type="password"/>
              <div className={styles.btnSubmitContainer}>
                {
                    renderSubmitButton({
                        label: 'Login',
                        labelWhenSubmitting: 'Logging in ...'
                    })
                }
              </div>
              <div className={styles.instructionsContainer}>
              </div>
              <input type="submit" style={{display: 'none'}}/>
            </form>
          </Paper>
        </div>
      </div>
      */
  ;
};

exports.default = PageRegisterInner;
module.exports = exports['default'];

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageRegister = __webpack_require__(128);

var _PageRegister2 = _interopRequireDefault(_PageRegister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageRegister2.default;
module.exports = exports['default'];

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _PageReportsViewInner = __webpack_require__(132);

var _PageReportsViewInner2 = _interopRequireDefault(_PageReportsViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


var PageReportsView = function (_React$Component) {
  _inherits(PageReportsView, _React$Component);

  function PageReportsView(props) {
    _classCallCheck(this, PageReportsView);

    var _this = _possibleConstructorReturn(this, (PageReportsView.__proto__ || Object.getPrototypeOf(PageReportsView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PageReportsView, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_PageReportsViewInner2.default, this.props);
    }
  }]);

  return PageReportsView;
}(_react2.default.Component);

exports.default = PageReportsView;
module.exports = exports["default"];

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageReportsViewInner = __webpack_require__(241);

var _PageReportsViewInner2 = _interopRequireDefault(_PageReportsViewInner);

var _reactRouterDom = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageReportsViewInner = function PageReportsViewInner(props) {
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_reactDocumentTitle2.default, { title: "Reports" }),
		_react2.default.createElement(
			"section",
			{ className: "container-fluid" },
			_react2.default.createElement(
				_rcQueueAnim2.default,
				{ type: "bottom", className: "ui-animate" },
				_react2.default.createElement(
					"div",
					{ key: "1" },
					_react2.default.createElement(
						"article",
						{ className: "article" },
						_react2.default.createElement(
							"h2",
							{ className: "article-title article-title-primary" },
							"Reports"
						)
					)
				)
			)
		)
	);
}; // libs
exports.default = PageReportsViewInner;
module.exports = exports["default"];

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageReportsView = __webpack_require__(131);

var _PageReportsView2 = _interopRequireDefault(_PageReportsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageReportsView2.default;
module.exports = exports['default'];

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class; // libs


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _PageResetPasswordInner = __webpack_require__(135);

var _PageResetPasswordInner2 = _interopRequireDefault(_PageResetPasswordInner);

var _PageLoading = __webpack_require__(30);

var _PageLoading2 = _interopRequireDefault(_PageLoading);

var _users = __webpack_require__(24);

var _actions = __webpack_require__(10);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['password', 'confirmPassword'];

var validate = function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.password || !values.password.trim() === '') {
    errors.password = 'Missing password field';
    hasErrors = true;
  } else if (values.password.length < 6) {
    errors.password = "Password should have at least 6 characters";
    hasErrors = true;
  }

  if (!values.confirmPassword || !values.confirmPassword.trim() === '') {
    if (values.password) {
      errors.confirmPassword = 'Re-type password';
      hasErrors = true;
    } else {
      errors.confirmPassword = 'Missing confirm password field';
      hasErrors = true;
    }
  }

  if (values.password && values.confirmPassword) {
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = 'These passwords don\'t match. Try again?';
      hasErrors = true;
    }
  }
  return hasErrors && errors;
};

var PageResetPassword = (_dec = (0, _reduxForm.reduxForm)({
  form: 'resetPasswordForm',
  fields: fields,
  validate: validate,
  touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
  onSubmit: function onSubmit(values, dispatch, props) {
    var password = values.password,
        confirmPassword = values.confirmPassword;

    var userToken = props.match.params.usertoken;
    return dispatch((0, _users.resetPassword)(userToken, password, confirmPassword)).then(function (action) {
      return action;
    });
  }
}), _dec(_class = _dec2(_class = function (_React$Component) {
  _inherits(PageResetPassword, _React$Component);

  _createClass(PageResetPassword, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var dispatch = this.props.dispatch;

      var token = this.props.match.params.usertoken;

      dispatch((0, _users.isValidResetToken)(token)).then(function (action) {
        var error = action.error,
            payload = action.payload;

        if (!error) {
          var tokenMessage = _.get(payload, 'message', '');
          if (tokenMessage === 'true') {
            _this2.setState({
              check: 2
            });
          } else {
            _this2.setState({
              check: 3
            });
          }
        } else {
          _this2.setState({
            check: 3
          });
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _actions.resetErrorMessages)());
    }
  }]);

  function PageResetPassword(props) {
    _classCallCheck(this, PageResetPassword);

    var _this = _possibleConstructorReturn(this, (PageResetPassword.__proto__ || Object.getPrototypeOf(PageResetPassword)).call(this, props));

    _this.state = {
      check: 1
    };
    return _this;
  }

  _createClass(PageResetPassword, [{
    key: 'render',
    value: function render() {
      if (this.state.check === 1) {
        return _react2.default.createElement(_PageLoading2.default, this.props);
      } else if (this.state.check === 2) {
        return _react2.default.createElement(_PageResetPasswordInner2.default, this.props);
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Bad Request!'
          ),
          _react2.default.createElement(
            'h3',
            null,
            'Reset Password Token is invalid'
          )
        );
      }
    }
  }]);

  return PageResetPassword;
}(_react2.default.Component)) || _class) || _class);
exports.default = PageResetPassword;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(8);

var _Paper = __webpack_require__(48);

var _Paper2 = _interopRequireDefault(_Paper);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _RaisedButton = __webpack_require__(36);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _TextField = __webpack_require__(49);

var _TextField2 = _interopRequireDefault(_TextField);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

__webpack_require__(242);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageResetPasswordInner = function PageResetPasswordInner(props) {
  var onSubmit = props.onSubmit,
      renderSubmitButton = props.renderSubmitButton,
      renderMessage = props.renderMessage;


  return _react2.default.createElement(
    'div',
    { className: 'page-login' },
    _react2.default.createElement(
      'div',
      { className: 'main-body' },
      _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Reset Password - Wisdom' }),
      _react2.default.createElement(
        _rcQueueAnim2.default,
        { type: 'bottom', className: 'ui-animate' },
        _react2.default.createElement(
          'div',
          { key: '1' },
          _react2.default.createElement(
            'div',
            { className: 'body-inner' },
            _react2.default.createElement(
              'div',
              { className: 'card bg-white' },
              _react2.default.createElement(
                'div',
                { className: 'card-content' },
                _react2.default.createElement(
                  'section',
                  { className: 'logo text-center' },
                  _react2.default.createElement(
                    'h1',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '#/' },
                      'Reset Password'
                    )
                  ),
                  renderMessage()
                ),
                _react2.default.createElement(
                  'form',
                  { className: 'form-horizontal', onSubmit: onSubmit },
                  _react2.default.createElement(
                    'fieldset',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'password', label: 'Password', component: _utils.renderTextField, type: 'password' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_reduxForm.Field, { name: 'confirmPassword', label: 'Confirm Password', component: _utils.renderTextField, type: 'password' })
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-action no-border text-right' },
                renderSubmitButton({
                  label: 'Reset',
                  labelWhenSubmitting: 'Reset'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'additional-info' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/login' },
                'Login'
              ),
              _react2.default.createElement('span', { className: 'divider-h' }),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/register' },
                'Sign Up'
              )
            )
          )
        )
      )
    )
  )
  /*
      <div className={`${styles.root} row`}>
        <div className="col-lg-6 col-lg-offset-3">
          <DocumentTitle title="Login - Sauron"/>
          <Paper>
            <form className={styles.root} onSubmit={onSubmit}>
              <h2 className="dialog-heading" style={{textAlign: 'center'}}>Sign in</h2>
              {
                renderMessage()
              }
              <Field name="email" label="Email" component={renderTextField} autoFocus/>
              <Field name="password" label="Password" component={renderTextField} type="password"/>
              <div className={styles.btnSubmitContainer}>
                {
                    renderSubmitButton({
                        label: 'Login',
                        labelWhenSubmitting: 'Logging in ...'
                    })
                }
              </div>
              <div className={styles.instructionsContainer}>
              </div>
              <input type="submit" style={{display: 'none'}}/>
            </form>
          </Paper>
        </div>
      </div>
      */
  ;
};

// src
// libs
exports.default = PageResetPasswordInner;
module.exports = exports['default'];

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageResetPassword = __webpack_require__(134);

var _PageResetPassword2 = _interopRequireDefault(_PageResetPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageResetPassword2.default;
module.exports = exports['default'];

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _PageSystemViewInner = __webpack_require__(138);

var _PageSystemViewInner2 = _interopRequireDefault(_PageSystemViewInner);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _actions = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


// src


var orderByColumns = {
	date: 'transactionDate',
	destination: 'destination',
	volume: 'amount',
	value: 'amount',
	action: 'transactiontype.type_name',
	source: 'transactionimporttype.import_type_name, useraddress.nick_name, userwallet.wallet_name'
};

var PageSystemView = function (_React$Component) {
	_inherits(PageSystemView, _React$Component);

	function PageSystemView(props) {
		_classCallCheck(this, PageSystemView);

		var _this = _possibleConstructorReturn(this, (PageSystemView.__proto__ || Object.getPrototypeOf(PageSystemView)).call(this, props));

		_this.getTransactionData = function () {
			console.log('Fetching transaction data...');

			var dispatch = _this.props.dispatch;
			var listingParameters = _this.state.listingParameters;


			dispatch((0, _actions.transactionsData)(listingParameters));
		};

		_this.deleteTransactions = function (trxIds) {
			console.log('Deleting transactions...');

			var dispatch = _this.props.dispatch;
			var listingParameters = _this.state.listingParameters;


			return dispatch((0, _actions.deleteTransaction)(trxIds, listingParameters)).then(function (action) {
				_this.setState({
					selectedRows: [],
					allSelected: false,
					rowSelected: false,
					deletingAll: false
				});
				return action;
			});
		};

		_this.handleQueryStringChange = function (queryString) {
			var listingParameters = _this.state.listingParameters;


			_this.setState({
				listingParameters: _.set(listingParameters, 'queryString', queryString)
			});
		};

		_this.handleStartDateChange = function (e, date) {
			var listingParameters = _this.state.listingParameters;


			if (date && !(0, _moment2.default)(date).isSame(listingParameters.startDate)) {
				_this.setState({
					listingParameters: _.set(listingParameters, 'startDate', date)
				}, function () {
					return _this.getTransactionData(listingParameters);
				});
			}
		};

		_this.handleEndDateChange = function (e, date) {
			var listingParameters = _this.state.listingParameters;


			if (date && !(0, _moment2.default)(date).isSame(listingParameters.endDate)) {
				_this.setState({
					listingParameters: _.set(listingParameters, 'endDate', date)
				}, function () {
					return _this.getTransactionData(listingParameters);
				});
			}
		};

		_this.resetFilterParams = function () {
			var listingParameters = _this.state.listingParameters;

			listingParameters = _.set(listingParameters, 'queryString', '');
			listingParameters = _.set(listingParameters, 'startDate', null);
			listingParameters = _.set(listingParameters, 'endDate', null);

			_this.setState({
				listingParameters: listingParameters
			}, function () {
				return _this.getTransactionData(listingParameters);
			});
		};

		_this.handleHelpDialogToggle = function () {
			var isHelpDialogOpen = _this.state.isHelpDialogOpen;


			_this.setState({
				isHelpDialogOpen: !isHelpDialogOpen
			});
		};

		_this.handleFormDialogOpen = function () {
			var dispatch = _this.props.dispatch;


			_this.setState({
				trxId: null
			}, function () {
				dispatch((0, _actions.openFormDialog)());
			});
		};

		_this.handleFormDialogClose = function () {
			var dispatch = _this.props.dispatch;


			_this.setState({
				trxId: null
			}, function () {
				dispatch((0, _actions.closeFormDialog)());
			});
		};

		_this.handleUploadDialogToggle = function () {
			var isUploadDialogOpen = _this.state.isUploadDialogOpen;


			_this.setState({
				isUploadDialogOpen: !isUploadDialogOpen
			});
		};

		_this.handleActionTypeDialogToggle = function () {
			var isActionTypeDialogOpen = _this.state.isActionTypeDialogOpen;


			_this.setState({
				isActionTypeDialogOpen: !isActionTypeDialogOpen
			});
		};

		_this.handleHeadCheckboxClick = function () {
			var newSelectedRows = [];
			var allSelected = false;
			var rowSelected = false;
			var _this$state = _this.state,
			    selectedRows = _this$state.selectedRows,
			    modifiedTrxs = _this$state.modifiedTrxs;


			console.log('handleHeadCheckboxClick', selectedRows, modifiedTrxs);

			if (modifiedTrxs.length === selectedRows.length) {
				newSelectedRows = [];
				allSelected = false;
			} else {
				var dataIds = modifiedTrxs.map(function (trx) {
					return trx.id;
				});
				newSelectedRows = _.concat(newSelectedRows, dataIds);
				allSelected = true;
			}

			rowSelected = newSelectedRows.length > 0 ? true : false;

			_this.setState({
				allSelected: allSelected,
				rowSelected: rowSelected,
				selectedRows: newSelectedRows
			});
		};

		_this.handleCheckboxClick = function (checkedRow) {
			var allSelected = false;
			var rowSelected = false;
			var newSelectedRows = [];
			var _this$state2 = _this.state,
			    selectedRows = _this$state2.selectedRows,
			    modifiedTrxs = _this$state2.modifiedTrxs;

			var keyCount = _.keys(modifiedTrxs).length;

			newSelectedRows = _.indexOf(selectedRows, checkedRow) !== -1 ? _.pull(selectedRows, checkedRow) : _.concat(selectedRows, checkedRow);
			allSelected = keyCount === newSelectedRows.length ? true : false;
			rowSelected = newSelectedRows.length > 0 ? true : false;

			_this.setState({
				allSelected: allSelected,
				rowSelected: rowSelected,
				selectedRows: newSelectedRows
			});
		};

		_this.handleRowHover = function (hoveredRow) {
			_this.setState({ hoveredRow: hoveredRow.currentTarget.rowIndex - 1 });
		};

		_this.handleRowHoverExit = function () {
			_this.setState({ hoveredRow: null });
		};

		_this.handleTabChange = function (tabIndex) {
			var trxType = null;
			var listingParameters = _this.state.listingParameters;


			switch (tabIndex) {
				case 0:
					trxType = 'Purchase';
					break;

				case 1:
					trxType = 'Sale';
					break;

				case 2:
					trxType = 'Trading';
					break;

				default:
					break;
			}

			_this.setState({
				tabIndex: tabIndex,
				selectedRows: [],
				allSelected: false,
				rowSelected: false,
				listingParameters: _.set(listingParameters, 'trxType', trxType)
			}, function () {
				return _this.getTransactionData(_this.state.listingParameters);
			});
		};

		_this.handleDatesCheckboxClick = function () {
			var isSearchDatesChecked = _this.state.isSearchDatesChecked;


			_this.setState({
				isSearchDatesChecked: !isSearchDatesChecked
			});
		};

		_this.handleEditTrxClick = function (params) {
			var id = params.id;
			var dispatch = _this.props.dispatch;


			_this.setState({
				trxId: id
			}, function () {
				dispatch((0, _actions.openFormDialog)());
			});
		};

		_this.handleDeleteClick = function (trxId) {
			_this.setState({
				trxId: trxId
			}, _this.deleteTransactions([trxId]));
		};

		_this.handleMultipleDelete = function () {
			var selectedRows = _this.state.selectedRows;


			_this.setState({
				deletingAll: true
			}, _this.deleteTransactions(selectedRows));
		};

		_this.handleMultipleTypeChange = function (trxType) {
			var dispatch = _this.props.dispatch;
			var _this$state3 = _this.state,
			    selectedRows = _this$state3.selectedRows,
			    listingParameters = _this$state3.listingParameters;


			dispatch((0, _actions.updateTransactionsType)(selectedRows, trxType, listingParameters));
		};

		_this.handleColHeaderClick = function (orderBy) {
			var listingParameters = _this.state.listingParameters;
			// console.log('HANDLER CALLED:', orderByColumns[orderBy])

			if (listingParameters.orderBy !== orderByColumns[orderBy]) {
				_.set(listingParameters, 'orderBy', orderByColumns[orderBy]);
				_.set(listingParameters, 'orderWay', 'DESC');
			} else {
				listingParameters.orderWay === 'DESC' ? _.set(listingParameters, 'orderWay', 'ASC') : _.set(listingParameters, 'orderWay', 'DESC');
			}

			_this.setState({
				orderBy: orderBy,
				listingParameters: listingParameters
			}, _this.getTransactionData());

			console.log('UPDATED LISTING PARAMS:', listingParameters);
		};

		_this.state = {
			trxId: null,
			deletingAll: false,
			isHelpDialogOpen: false,
			isUploadDialogOpen: false,
			isActionTypeDialogOpen: false,
			hoveredRow: null,
			selectedRows: [],
			allSelected: false,
			rowSelected: false,
			pageOffset: 0,
			pageLimit: 15,
			totalRecords: 2000,
			tabIndex: 0,
			modifiedTrxs: [],
			isSearchDatesChecked: false,
			orderBy: 'date',
			listingParameters: {
				trxType: 'Purchase',
				startDate: null,
				endDate: null,
				queryString: '',
				orderBy: 'transactionDate',
				orderWay: 'DESC'
			},
			tblData: [{
				id: 10,
				date: '03-Aug-2017',
				source: 'Coinbase',
				action: 'BUY',
				coin: 'BTC',
				volume: '17.7869',
				price: '$ 13,687.7866',
				fee: '$ 3.45',
				cost: '$ -450.50',
				operations: '',
				selected: false
			}, {
				id: 11,
				date: '03-Aug-2017',
				source: 'Coinbase',
				action: 'BUY',
				coin: 'BTC',
				volume: '17.7869',
				price: '$ 13,687.7866',
				fee: '$ 3.45',
				cost: '$ -450.50',
				operations: '',
				selected: false
			}, {
				id: 12,
				date: '03-Aug-2017',
				source: 'Coinbase',
				action: 'BUY',
				coin: 'BTC',
				volume: '17.7869',
				price: '$ 13,687.7866',
				fee: '$ 3.45',
				cost: '$ -450.50',
				operations: '',
				selected: false
			}, {
				id: 13,
				date: '03-Aug-2017',
				source: 'Coinbase',
				action: 'BUY',
				coin: 'BTC',
				volume: '17.7869',
				price: '$ 13,687.7866',
				fee: '$ 3.45',
				cost: '$ -450.50',
				operations: '',
				selected: false
			}, {
				id: 14,
				date: '03-Aug-2017',
				source: 'Coinbase',
				action: 'BUY',
				coin: 'BTC',
				volume: '17.7869',
				price: '$ 13,687.7866',
				fee: '$ 3.45',
				cost: '$ -450.50',
				operations: '',
				selected: false
			}]
		};
		return _this;
	}

	/* DATA ACTIONS */


	/* EVENT HANDLERS */


	_createClass(PageSystemView, [{
		key: "componentDidMount",


		/* LIFECYCLE METHODS */
		value: function componentDidMount() {
			console.log('ORIGNAL LISTING PARAMS:', this.state.listingParameters);
			this.getTransactionData();
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			var modifiedTrxs = [];
			var transactionList = nextProps.transactionList;


			if (!_.isNil(transactionList)) {
				modifiedTrxs = transactionList.map(function (trx) {
					return _.pick(trx, ['transactionDate', 'asset', 'userwallet', 'useraddress.nickName', 'destination', 'transactionimporttype', 'associatedaddress.nickName', 'transactiontype.id', 'transactiontype.typeName', 'amount', 'useraddress.currency', 'value', 'id']);
				});
			}

			this.setState({
				modifiedTrxs: modifiedTrxs
			});
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_PageSystemViewInner2.default, _extends({}, this.props, this.state, {
				onDeleteClick: this.handleDeleteClick,
				onEditClick: this.handleEditTrxClick,
				onHelpDialogToggle: this.handleHelpDialogToggle,
				onFormDialogOpen: this.handleFormDialogOpen,
				onFormDialogClose: this.handleFormDialogClose,
				onUploadDialogToggle: this.handleUploadDialogToggle,
				onRowHover: this.handleRowHover,
				onRowHoverExit: this.handleRowHoverExit,
				onCheckboxClick: this.handleCheckboxClick,
				onHeadCheckboxClick: this.handleHeadCheckboxClick,
				onPageClick: this.handlePageClick,
				onTabChange: this.handleTabChange,
				onBatchDeleteClick: this.handleMultipleDelete,
				onBatchTypeClick: this.handleMultipleTypeChange,
				onQueryStringChange: this.handleQueryStringChange,
				onStartDateChange: this.handleStartDateChange,
				onEndDateChange: this.handleEndDateChange,
				resetFilterParams: this.resetFilterParams,
				onColHeaderClick: this.handleColHeaderClick,
				getTransactionData: this.getTransactionData
			}));
		}
	}]);

	return PageSystemView;
}(_react2.default.Component);

/* redux connect() and related functions */


function mapStateToProps(state, ownProps) {
	var transactionList = state.entities.transactions.transactionList;
	var thisTrxType = state.entities.transactions.trxType;
	var isRefreshTransactionList = state.entities.transactions.refreshTransactionList;
	var isDeletingTrxListItem = state.entities.transactions.deleteTransactionList;
	var isUpdatingTrxListItem = state.entities.transactions.updateTransactionList;
	var isFormDialogOpen = state.entities.transactions.isFormDialogOpen;

	return {
		transactionList: transactionList,
		thisTrxType: thisTrxType,
		isRefreshTransactionList: isRefreshTransactionList,
		isDeletingTrxListItem: isDeletingTrxListItem,
		isUpdatingTrxListItem: isUpdatingTrxListItem,
		isFormDialogOpen: isFormDialogOpen
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PageSystemView);
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // libs


// src


// assets


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _rcQueueAnim = __webpack_require__(13);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageSystemViewInner = __webpack_require__(243);

var _PageSystemViewInner2 = _interopRequireDefault(_PageSystemViewInner);

var _commons = __webpack_require__(15);

var _help = __webpack_require__(275);

var _help2 = _interopRequireDefault(_help);

var _colors = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageSystemViewInner = function PageSystemViewInner(props) {
	var isHelpDialogOpen = props.isHelpDialogOpen,
	    isFormDialogOpen = props.isFormDialogOpen,
	    onHelpDialogToggle = props.onHelpDialogToggle,
	    onFormDialogOpen = props.onFormDialogOpen,
	    isUploadDialogOpen = props.isUploadDialogOpen,
	    onUploadDialogToggle = props.onUploadDialogToggle,
	    isActionTypeDialogOpen = props.isActionTypeDialogOpen,
	    onActionTypeDialogToggle = props.onActionTypeDialogToggle,
	    tblData = props.tblData,
	    trxId = props.trxId;


	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_reactDocumentTitle2.default, { title: "Transactions" }),
		_react2.default.createElement(
			"section",
			{ className: "container-fluid" },
			_react2.default.createElement(
				_rcQueueAnim2.default,
				{ type: "bottom", className: "ui-animate" },
				_react2.default.createElement(
					"div",
					{ key: "1" },
					_react2.default.createElement(
						"article",
						{ className: "article" },
						_react2.default.createElement(
							"h2",
							{ className: "article-title article-title-primary" },
							"Transactions ",
							_react2.default.createElement(_help2.default, { color: _colors.grey600, cursor: "pointer", onClick: onHelpDialogToggle.bind(undefined) })
						),
						_react2.default.createElement(_commons.FilterToolbar, _extends({ data: props.tblData }, props)),
						_react2.default.createElement("br", null),
						_react2.default.createElement(
							"section",
							{ className: "box box-transparent" },
							_react2.default.createElement(_commons.TabView, _extends({ data: tblData }, props))
						)
					),
					_react2.default.createElement(_commons.InfoDialog, {
						title: 'Help',
						open: isHelpDialogOpen,
						onDialogClose: onHelpDialogToggle }),
					_react2.default.createElement(_commons.FormDialog, _extends({}, props, {
						trxId: trxId,
						title: 'Add Transaction',
						open: isFormDialogOpen,
						onDialogClose: onFormDialogOpen })),
					_react2.default.createElement(_commons.UploadDialog, {
						title: 'Upload CSV',
						open: isUploadDialogOpen,
						onDialogClose: onUploadDialogToggle }),
					_react2.default.createElement(_commons.ActionTypeDialog, {
						title: 'Select transaction type...',
						open: isActionTypeDialogOpen,
						onDialogClose: onActionTypeDialogToggle })
				)
			)
		)
	);
};

exports.default = PageSystemViewInner;
module.exports = exports["default"];

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageSystemView = __webpack_require__(137);

var _PageSystemView2 = _interopRequireDefault(_PageSystemView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageSystemView2.default;
module.exports = exports['default'];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _PageTermsInner = __webpack_require__(141);

var _PageTermsInner2 = _interopRequireDefault(_PageTermsInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


var PageTerms = function (_React$Component) {
  _inherits(PageTerms, _React$Component);

  function PageTerms(props) {
    _classCallCheck(this, PageTerms);

    var _this = _possibleConstructorReturn(this, (PageTerms.__proto__ || Object.getPrototypeOf(PageTerms)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PageTerms, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_PageTermsInner2.default, this.props);
    }
  }]);

  return PageTerms;
}(_react2.default.Component);

exports.default = PageTerms;
module.exports = exports["default"];

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDocumentTitle = __webpack_require__(7);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageTermsInner = __webpack_require__(244);

var _PageTermsInner2 = _interopRequireDefault(_PageTermsInner);

var _reactRouterDom = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var PageTermsInner = function PageTermsInner(props) {
  return _react2.default.createElement(
    "div",
    { className: "" + _PageTermsInner2.default.root },
    _react2.default.createElement(_reactDocumentTitle2.default, { title: "Terms - Wisdom" }),
    _react2.default.createElement(
      "h2",
      null,
      "Terms"
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "/login", className: "color-primary" },
      "Login"
    ),
    _react2.default.createElement("span", { className: "divider-pipe" }),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "/register", className: "color-primary" },
      "Register"
    )
  );
};

exports.default = PageTermsInner;
module.exports = exports["default"];

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageTerms = __webpack_require__(140);

var _PageTerms2 = _interopRequireDefault(_PageTerms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageTerms2.default;
module.exports = exports['default'];

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterRedux = __webpack_require__(17);

var _reactRedux = __webpack_require__(4);

var _pathToRegexp = __webpack_require__(280);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _PrivateRoute = __webpack_require__(53);

var _PrivateRoute2 = _interopRequireDefault(_PrivateRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var dataURIs = state.dataURIs;
  var dataURI = ownProps.dataURI,
      params = ownProps.computedMatch.params;


  var makeURI = _pathToRegexp2.default.compile(dataURI);
  var uri = makeURI(params);

  console.log('fetching data for uri: ' + uri);

  return {
    isLoadingData: true
  };
};

var PrivateDataRoute = (_dec = (0, _reactRedux.connect)(mapStateToProps), _dec(_class = function (_React$Component) {
  _inherits(PrivateDataRoute, _React$Component);

  function PrivateDataRoute(props) {
    _classCallCheck(this, PrivateDataRoute);

    return _possibleConstructorReturn(this, (PrivateDataRoute.__proto__ || Object.getPrototypeOf(PrivateDataRoute)).call(this, props));
  }

  _createClass(PrivateDataRoute, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          hasData = _props.hasData,
          isLoadingData = _props.isLoadingData,
          errorLoadingData = _props.errorLoadingData,
          component = _props.component,
          rest = _objectWithoutProperties(_props, ['hasData', 'isLoadingData', 'errorLoadingData', 'component']);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_PrivateRoute2.default, _extends({}, rest, { render: function render(props) {
            return hasData ? _react2.default.createElement(props) : isLoadingData ? _react2.default.createElement(
              'div',
              null,
              'Loading ...'
            ) : errorLoadingData ? _react2.default.createElement(
              'div',
              null,
              'Error loading data!'
            ) : null;
          } }))
      );
    }
  }]);

  return PrivateDataRoute;
}(_react2.default.Component)) || _class);
exports.default = PrivateDataRoute;
module.exports = exports['default'];

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivateDataRoute = exports.default = undefined;

var _PrivateDataRoute = __webpack_require__(143);

Object.defineProperty(exports, 'PrivateDataRoute', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrivateDataRoute).default;
  }
});

var _PrivateRoute = __webpack_require__(53);

var _PrivateRoute2 = _interopRequireDefault(_PrivateRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PrivateRoute2.default;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // libs


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _reactRedux = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
  var user = state.auth.user;


  return { user: user };
};

var PublicRoute = (_dec = (0, _reactRedux.connect)(mapStateToProps), _dec(_class = function (_React$Component) {
  _inherits(PublicRoute, _React$Component);

  function PublicRoute(props) {
    _classCallCheck(this, PublicRoute);

    return _possibleConstructorReturn(this, (PublicRoute.__proto__ || Object.getPrototypeOf(PublicRoute)).call(this, props));
  }

  _createClass(PublicRoute, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          _render = _props.render,
          user = _props.user,
          rest = _objectWithoutProperties(_props, ['component', 'render', 'user']);

      return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, { render: function render(props) {
          return !user ? component ? _react2.default.createElement(component, props) : _render ? _render(props) : null : _react2.default.createElement(_reactRouterDom.Redirect, { to: {
              pathname: '/',
              state: { from: rest.location }
            } });
        } }));
    }
  }]);

  return PublicRoute;
}(_react2.default.Component)) || _class);
exports.default = PublicRoute;
module.exports = exports['default'];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PublicRoute = __webpack_require__(145);

var _PublicRoute2 = _interopRequireDefault(_PublicRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PublicRoute2.default;
module.exports = exports['default'];

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ResetBtn = exports.Operations = exports.Selection = exports.ActionTypeDialog = exports.UploadDialog = exports.NicknameDialog = exports.InfoDialog = exports.FormDialog = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _materialUi = __webpack_require__(12);

var _Forms = __webpack_require__(38);

var _delete = __webpack_require__(27);

var _delete2 = _interopRequireDefault(_delete);

var _modeEdit = __webpack_require__(28);

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _colors = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
var FormDialog = exports.FormDialog = function FormDialog(props) {
	var title = props.title,
	    open = props.open;


	return _react2.default.createElement(
		_materialUi.Dialog,
		{
			title: title,
			modal: false,
			open: open,
			autoScrollBodyContent: true },
		_react2.default.createElement(_Forms.AddTransactionForm, props)
	);
};

// assets
// libs
var InfoDialog = exports.InfoDialog = function InfoDialog(props) {
	var title = props.title,
	    actions = props.actions,
	    open = props.open,
	    onDialogClose = props.onDialogClose;


	return _react2.default.createElement(
		_materialUi.Dialog,
		{
			title: title,
			actions: actions,
			modal: false,
			open: open,
			onRequestClose: onDialogClose,
			autoScrollBodyContent: true },
		_react2.default.createElement(HelpText, null)
	);
};

var NicknameDialog = exports.NicknameDialog = function NicknameDialog(props) {
	var isNicknameDialogOpen = props.isNicknameDialogOpen,
	    address = props.address;

	return _react2.default.createElement(
		_materialUi.Dialog,
		{
			title: title('Enter nickname for ', address),
			modal: false,
			open: isNicknameDialogOpen },
		_react2.default.createElement(_Forms.NicknameForm, props)
	);
};

var UploadDialog = exports.UploadDialog = function UploadDialog(props) {
	var title = props.title,
	    actions = props.actions,
	    open = props.open,
	    onDialogClose = props.onDialogClose;


	return _react2.default.createElement(
		_materialUi.Dialog,
		{
			title: title,
			actions: actions,
			modal: false,
			open: open,
			onRequestClose: onDialogClose,
			autoScrollBodyContent: true },
		_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'p',
				null,
				'Read about supported formats ',
				_react2.default.createElement(
					_reactRouterDom.Link,
					{ to: '#' },
					'here'
				),
				'.'
			),
			_react2.default.createElement(
				'label',
				{ className: 'custom-file' },
				_react2.default.createElement('input', { type: 'file', id: 'file', className: 'custom-file-input' }),
				_react2.default.createElement('span', { className: 'custom-file-control' })
			)
		)
	);
};

var ActionTypeDialog = exports.ActionTypeDialog = function ActionTypeDialog(props) {
	var title = props.title,
	    actions = props.actions,
	    open = props.open,
	    onDialogClose = props.onDialogClose;


	return _react2.default.createElement(
		_materialUi.Dialog,
		{
			title: title,
			actions: actions,
			modal: false,
			open: open,
			onRequestClose: onDialogClose,
			autoScrollBodyContent: true },
		_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_materialUi.RadioButtonGroup,
				{ name: 'actionType', defaultSelected: 'not_light' },
				_react2.default.createElement(_materialUi.RadioButton, {
					labelStyle: { fontWeight: 400 },
					value: 'DONATION',
					label: 'Donation' }),
				_react2.default.createElement(_materialUi.RadioButton, {
					labelStyle: { fontWeight: 400 },
					value: 'GIFT_RECEIVED',
					label: 'Gift Received' }),
				_react2.default.createElement(_materialUi.RadioButton, {
					labelStyle: { fontWeight: 400 },
					value: 'GIFT_SENT',
					label: 'Gift Sent' }),
				_react2.default.createElement(_materialUi.RadioButton, {
					labelStyle: { fontWeight: 400 },
					value: 'INCOME',
					label: 'Income' }),
				_react2.default.createElement(_materialUi.RadioButton, {
					labelStyle: { fontWeight: 400 },
					value: 'PURCHASE',
					label: 'Purchase' }),
				_react2.default.createElement(_materialUi.RadioButton, {
					labelStyle: { fontWeight: 400 },
					value: 'SALE',
					label: 'Sale' }),
				_react2.default.createElement(_materialUi.RadioButton, {
					labelStyle: { fontWeight: 400 },
					value: 'TRANSFER',
					label: 'Transfer' })
			),
			_react2.default.createElement('br', null),
			_react2.default.createElement(_materialUi.RaisedButton, { label: 'Submit', primary: true })
		)
	);
};

var Selection = exports.Selection = function Selection(props) {
	var onCheckboxClick = props.onCheckboxClick,
	    onHeadCheckboxClick = props.onHeadCheckboxClick,
	    index = props.index,
	    type = props.type,
	    selectedRows = props.selectedRows,
	    allSelected = props.allSelected;


	if (type === 'ROW') {
		return _react2.default.createElement(_materialUi.Checkbox, {
			onClick: onCheckboxClick.bind(undefined, index),
			checked: _.includes(selectedRows, index) ? true : false });
	} else if (type === "HEADER") {
		return _react2.default.createElement(_materialUi.Checkbox, {
			onClick: onHeadCheckboxClick.bind(undefined),
			checked: allSelected });
	}
};

var Operations = exports.Operations = function Operations(props) {
	var id = props.id,
	    onDeleteClick = props.onDeleteClick,
	    onEditClick = props.onEditClick,
	    isDeletingTrxListItem = props.isDeletingTrxListItem,
	    isUpdatingTrxListItem = props.isUpdatingTrxListItem,
	    trxId = props.trxId;


	return _react2.default.createElement(
		'span',
		null,
		_react2.default.createElement(
			_materialUi.IconButton,
			{
				className: 'actionIcon',
				disabled: isUpdatingTrxListItem || isDeletingTrxListItem,
				onClick: function onClick() {
					return onEditClick(id);
				} },
			isUpdatingTrxListItem && trxId === id ? _react2.default.createElement(_materialUi.RefreshIndicator, { status: 'loading', top: 12, left: 12, size: 25 }) : _react2.default.createElement(_modeEdit2.default, { color: _colors.cyan200, hoverColor: _colors.cyan500 })
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{
				className: 'actionIcon',
				disabled: isDeletingTrxListItem || isUpdatingTrxListItem,
				onClick: function onClick() {
					return onDeleteClick(id);
				} },
			isDeletingTrxListItem && trxId === id ? _react2.default.createElement(_materialUi.RefreshIndicator, { status: 'loading', top: 12, left: 12, size: 25 }) : _react2.default.createElement(_delete2.default, { color: _colors.cyan200, hoverColor: _colors.cyan500 })
		)
	);
};

var ResetBtn = exports.ResetBtn = function ResetBtn(props) {
	return _react2.default.createElement(
		'p',
		{ onClick: props.onStartDatePickerDismiss },
		'Reset'
	);
};

var title = function title(text, boldText) {
	return _react2.default.createElement(
		'p',
		null,
		text,
		' ',
		_react2.default.createElement(
			'b',
			{ style: { fontWeight: '500' } },
			boldText
		)
	);
};

/* STATICS */
var HelpText = function HelpText() {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'h5',
			null,
			'Acquisitions'
		),
		_react2.default.createElement(
			'ul',
			null,
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Purchase'
				),
				' = You bought coins'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Income'
				),
				' = You received coins as payment (mining, paycheck)'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Gift Received'
				),
				' = You received coins in exchange for nothing'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Transfer'
				),
				' = You move coins from one location to another but they remain in your possession'
			)
		),
		_react2.default.createElement(
			'h5',
			null,
			'Disposals'
		),
		_react2.default.createElement(
			'ul',
			null,
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Sale'
				),
				' = You sold coins -OR- you used coins to buy something'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Gift Sent'
				),
				' = You gave coins in exchange for nothing'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Donation'
				),
				' = You gave coins to a qualified organization'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Transfer'
				),
				' = You move coins from one location to another but they remain in your possession'
			)
		),
		_react2.default.createElement(
			'p',
			null,
			_react2.default.createElement(
				'b',
				null,
				'M'
			),
			' next to a value denotes Fair Market Value, a 24 hour average for that date'
		),
		_react2.default.createElement(
			'h5',
			null,
			'Non-taxable Events'
		),
		_react2.default.createElement(
			'ul',
			null,
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Purchase'
				),
				' = Cost Basis is established at a specific rate or fair market value'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Gift Received'
				),
				' = Cost Basis is established from previous owner\u2019s original cost basis'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Gift Sent'
				),
				' = No Capital Gains/Losses are realized (unless amount exceeds $14,000)'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Transfer'
				),
				' = No effect'
			)
		),
		_react2.default.createElement(
			'h5',
			null,
			'Taxable Events'
		),
		_react2.default.createElement(
			'ul',
			null,
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Income'
				),
				' = Cost Basis is established at a specific rate or fair market value and that value is added to earned income'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Sale'
				),
				' = Capital Gains/Losses are realized'
			),
			_react2.default.createElement(
				'li',
				null,
				_react2.default.createElement(
					'b',
					null,
					'Donation'
				),
				' = No Gains/Losses are realized - fair market value of coins creates a tax deduction'
			)
		),
		_react2.default.createElement(
			'p',
			null,
			'You can find more helpful information in our ',
			_react2.default.createElement(
				'a',
				{ target: '_blank', href: '/faq' },
				'FAQ'
			),
			'.'
		)
	);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _materialUi = __webpack_require__(12);

__webpack_require__(245);

var _commons = __webpack_require__(15);

var _search = __webpack_require__(277);

var _search2 = _interopRequireDefault(_search);

var _colors = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// assets


// src
// libs
var styles = {
	checkboxLabelStyle: {
		color: '#555',
		fontWeight: 400
	},

	checkboxIconStyle: {
		fill: '#777'
	},

	checkboxStyle: {
		bottom: -5
	}
};

var FilterToolbar = function FilterToolbar(props) {
	var data = props.data,
	    getTransactionData = props.getTransactionData,
	    onQueryStringChange = props.onQueryStringChange,
	    onStartDateChange = props.onStartDateChange,
	    onEndDateChange = props.onEndDateChange,
	    listingParameters = props.listingParameters,
	    resetFilterParams = props.resetFilterParams;

	var flatData = _.uniq(_.compact(_.flatten(data.map(function (dat) {
		return _.flatMap(dat);
	}))));
	var startDate = listingParameters.startDate,
	    endDate = listingParameters.endDate,
	    queryString = listingParameters.queryString;
	// let minDate
	// let maxDate

	// if (startDate && endDate) {
	// 	minDate = new Date(startDate)
	// 	maxDate = new Date(endDate)
	// }

	// console.log('START DATE', startDate)
	// console.log('END DATE', endDate)
	// console.log('MIN DATE', minDate)
	// console.log('MAX DATE', maxDate)

	return _react2.default.createElement(
		'div',
		{ className: 'row filterToolbar' },
		_react2.default.createElement(
			'div',
			{ className: 'col-md-7 col-sm-12' },
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-md-5 searchBar' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_materialUi.AutoComplete, {
							className: 'autoComplete',
							underlineShow: false,
							inputStyle: { paddingLeft: 15 },
							fullWidth: true,
							filter: _materialUi.AutoComplete.caseInsensitiveFilter,
							hintText: 'Search...',
							dataSource: flatData,
							hintStyle: { fontSize: 16, paddingLeft: 15 },
							onUpdateInput: onQueryStringChange,
							onNewRequest: getTransactionData,
							searchText: queryString })
					),
					_react2.default.createElement(
						'span',
						{ className: 'iconBtn', onClick: getTransactionData },
						_react2.default.createElement(_search2.default, { color: _colors.grey600, hoverColor: _colors.grey700, style: { width: 28, height: 28, position: 'relative', top: 9 } })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-md-7' },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-5' },
							_react2.default.createElement(_materialUi.DatePicker, {
								autoOk: true,
								fullWidth: true,
								maxDate: endDate ? new Date(endDate) : '',
								underlineShow: false,
								style: { border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 },
								textFieldStyle: { maxHeight: 46 },
								hintText: 'Start Date',
								onChange: onStartDateChange,
								value: startDate })
						),
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-5' },
							_react2.default.createElement(_materialUi.DatePicker, {
								autoOk: true,
								fullWidth: true,
								minDate: new Date(startDate),
								underlineShow: false,
								style: { border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 },
								textFieldStyle: { maxHeight: 46 },
								hintText: 'End Date',
								onChange: onEndDateChange,
								value: endDate })
						),
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-2' },
							queryString || startDate || endDate ? _react2.default.createElement(_materialUi.FlatButton, { label: 'Reset', primary: true, style: { top: 7 }, onClick: resetFilterParams }) : ''
						)
					)
				)
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'col-md-5 col-sm-12 text-right' },
			_react2.default.createElement(_materialUi.RaisedButton, { label: 'Upload CSV', primary: true, style: { top: 7, marginRight: 26 } })
		)
	);
};

exports.default = FilterToolbar;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _FilterToolbar = __webpack_require__(148);

var _FilterToolbar2 = _interopRequireDefault(_FilterToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FilterToolbar2.default;
module.exports = exports['default'];

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _AddTransactionFormInner = __webpack_require__(151);

var _AddTransactionFormInner2 = _interopRequireDefault(_AddTransactionFormInner);

var _actions = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['transactionDate', 'destination', 'amount', 'asset', 'value', 'transactionTypeId', 'note'];

var validate = function validate(values) {
	var errors = {};
	var hasErrors = false;
	var transactionDate = values.transactionDate,
	    destination = values.destination,
	    amount = values.amount,
	    asset = values.asset,
	    value = values.value,
	    note = values.note,
	    transactionTypeId = values.transactionTypeId;


	if (!transactionDate) {
		errors.transactionDate = 'Missing date field.';
		hasErrors = true;
	}
	if (!destination || destination.trim() === '') {
		errors.destination = 'Provide at least one address.';
		hasErrors = true;
	}
	if (!amount || amount.trim() === '') {
		errors.amount = 'Provide at least one address.';
		hasErrors = true;
	}
	if (!asset) {
		errors.asset = 'Select a valid asset from the list.';
		hasErrors = true;
	}

	if (!value || value.trim() === '') {
		errors.value = 'Missing value field.';
		hasErrors = true;
	} else if (value < 0) {
		errors.value = "Think positive.";
		hasErrors = true;
	}

	if (!transactionTypeId) {
		errors.transactionTypeId = 'Select a valid type from the list.';
		hasErrors = true;
	}

	return hasErrors && errors;
};
var AddTransactionForm = (_dec = (0, _reduxForm.reduxForm)({
	form: 'addTransactionForm',
	fields: fields,
	validate: validate,
	touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
	onSubmit: function onSubmit(values, dispatch, props) {
		if (!_.isNil(values.transactionId)) {
			return dispatch((0, _actions.updateTransaction)(values)).then(function (action) {
				dispatch((0, _actions.closeFormDialog)());
				return action;
			});
		}
		return dispatch((0, _actions.insertTransaction)(values)).then(function (action) {
			dispatch((0, _actions.closeFormDialog)());
			return action;
		});
	}
}), _dec(_class = _dec2(_class = function (_Component) {
	_inherits(AddTransactionForm, _Component);

	function AddTransactionForm(props) {
		_classCallCheck(this, AddTransactionForm);

		return _possibleConstructorReturn(this, (AddTransactionForm.__proto__ || Object.getPrototypeOf(AddTransactionForm)).call(this, props));
	}

	_createClass(AddTransactionForm, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    trxId = _props.trxId,
			    modifiedTrxs = _props.modifiedTrxs,
			    change = _props.change;


			if (!_.isNil(trxId)) {
				var currentTrx = _.find(modifiedTrxs, function (trx) {
					return trx.id === trxId;
				});
				var transactionDate = currentTrx.transactionDate,
				    destination = currentTrx.destination,
				    amount = currentTrx.amount,
				    asset = currentTrx.asset,
				    value = currentTrx.value,
				    transactiontype = currentTrx.transactiontype,
				    note = currentTrx.note;

				change('transactionId', trxId);
				change('note', note);
				change('asset', asset);
				change('value', value);
				change('amount', amount);
				change('destination', destination);
				change('transactionDate', transactionDate);
				change('transactionTypeId', transactiontype.id);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_AddTransactionFormInner2.default, this.props);
		}
	}]);

	return AddTransactionForm;
}(_react.Component)) || _class) || _class);
exports.default = AddTransactionForm;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _materialUi = __webpack_require__(12);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddTransactionFormInner = function AddTransactionFormInner(props) {
	var renderRaisedSubmitButton = props.renderRaisedSubmitButton,
	    onFormDialogClose = props.onFormDialogClose;


	return _react2.default.createElement(
		'form',
		{ role: 'form' },
		_react2.default.createElement(
			'div',
			{ className: 'form-group' },
			_react2.default.createElement(_reduxForm.Field, { name: 'transactionId', component: 'input', type: 'hidden' }),
			_react2.default.createElement(_reduxForm.Field, { name: 'transactionDate', label: 'Date', maxDate: new Date(), component: _utils.renderDatePicker, fullWidth: true, autoFocus: true }),
			_react2.default.createElement(_reduxForm.Field, { name: 'destination', label: 'Destination', autoComplete: 'off', component: _utils.renderTextField, fullWidth: true }),
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-md-6' },
					_react2.default.createElement(_reduxForm.Field, { name: 'amount', label: 'Amount (+/-)', autoComplete: 'off', component: _utils.renderTextField, type: 'number', fullWidth: true })
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-md-6' },
					_react2.default.createElement(
						_reduxForm.Field,
						{ name: 'asset', label: 'Asset', component: _utils.renderSelectField, fullWidth: true },
						_react2.default.createElement(_materialUi.MenuItem, { value: 'BTC', primaryText: 'BTC' }),
						_react2.default.createElement(_materialUi.MenuItem, { value: 'LTC', primaryText: 'LTC' }),
						_react2.default.createElement(_materialUi.MenuItem, { value: 'ETH', primaryText: 'ETH' }),
						_react2.default.createElement(_materialUi.MenuItem, { value: 'DOGE', primaryText: 'DOGE' })
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-md-6' },
					_react2.default.createElement(_reduxForm.Field, { name: 'value', label: 'Total Value', autoComplete: 'off', component: _utils.renderTextField, type: 'number', fullWidth: true })
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-md-6' },
					_react2.default.createElement(
						_reduxForm.Field,
						{ name: 'transactionTypeId', label: 'Type', component: _utils.renderSelectField, fullWidth: true },
						_react2.default.createElement(_materialUi.MenuItem, { value: 1, primaryText: 'Income' }),
						_react2.default.createElement(_materialUi.MenuItem, { value: 2, primaryText: 'Sale' }),
						_react2.default.createElement(_materialUi.MenuItem, { value: 3, primaryText: 'Purchase' }),
						_react2.default.createElement(_materialUi.MenuItem, { value: 4, primaryText: 'Transfer' })
					)
				)
			),
			_react2.default.createElement(_reduxForm.Field, { name: 'note', label: 'Note', autoComplete: 'off', component: _utils.renderTextArea, fullWidth: true })
		),
		_react2.default.createElement(
			'div',
			{ className: 'text-right', style: { marginTop: 40 } },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'Cancel', onTouchTap: onFormDialogClose, style: { marginRight: 8 }, primary: true }),
			renderRaisedSubmitButton({
				label: 'Submit',
				labelWhenSubmitting: 'Submitting'
			})
		)
	);
};

// src
// libs
exports.default = AddTransactionFormInner;
module.exports = exports['default'];

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AddTransactionForm = __webpack_require__(150);

var _AddTransactionForm2 = _interopRequireDefault(_AddTransactionForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AddTransactionForm2.default;
module.exports = exports['default'];

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

__webpack_require__(246);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src 
// libs
var FilterBarForm = function FilterBarForm(props) {
	var flatData = _.uniq(_.compact(_.flatten(props.data.map(function (dat) {
		return _.flatMap(dat);
	}))));

	return _react2.default.createElement(
		'form',
		{ role: 'form', className: 'form-inline filter-form' },
		_react2.default.createElement(
			'div',
			{ className: 'row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-4' },
				_react2.default.createElement(_reduxForm.Field, { name: 'startDateFilter', label: 'Start Date', component: _utils.renderInlineDateField })
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-4' },
				_react2.default.createElement(_reduxForm.Field, { name: 'endDateFilter', label: 'End Date', component: _utils.renderInlineDateField })
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-4' },
				_react2.default.createElement(_reduxForm.Field, { name: 'textFilter', label: 'Search (ex. BTC, XRP, My Wallet)', dataSource: flatData, component: _utils.renderAutocomplete })
			)
		)
	);
};

exports.default = FilterBarForm;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _FilterBarForm = __webpack_require__(153);

var _FilterBarForm2 = _interopRequireDefault(_FilterBarForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FilterBarForm2.default;
module.exports = exports['default'];

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _accounts = __webpack_require__(37);

var _NewAddressFormInner = __webpack_require__(156);

var _NewAddressFormInner2 = _interopRequireDefault(_NewAddressFormInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['newAddresses'];
var initialValues = { newAddresses: '' };

var validate = function validate(values) {
	var errors = {};
	var hasErrors = false;
	var newAddresses = values.newAddresses;


	if (!_.isNil(newAddresses)) {
		var newAddressesArr = _.split(newAddresses, '\n');
		var uniqAddressesArr = _.uniq(newAddressesArr);

		if (!newAddresses || !newAddresses.trim() === '') {
			errors.newAddresses = 'Provide at least one address.';
			hasErrors = true;
		}

		if (newAddressesArr.length != uniqAddressesArr.length) {
			errors.newAddresses = 'Provide distinct addresses.';
			hasErrors = true;
		}

		newAddressesArr.map(function (newAddress) {
			if (newAddress.length > 40) {
				errors.newAddresses = 'No address is that large. Try again?';
				hasErrors = true;
			}
		});
	}

	return hasErrors && errors;
};

var NewAddressForm = (_dec = (0, _reduxForm.reduxForm)({
	form: 'newAddressForm',
	fields: fields,
	validate: validate,
	initialValues: initialValues,
	touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
	onSubmit: function onSubmit(values, dispatch, props) {
		var newAddresses = values.newAddresses;


		if (!_.isNil(newAddresses)) {
			var newAddressesArr = _.split(values.newAddresses, '\n');

			return dispatch((0, _accounts.addUserAddresses)(newAddressesArr)).then(function (action) {
				dispatch(props.reset('newAddressForm'));
				dispatch(props.untouch.apply(props, ['newAddressForm'].concat(fields)));
				return action;
			});
		}
	}
}), _dec(_class = _dec2(_class = function (_Component) {
	_inherits(NewAddressForm, _Component);

	function NewAddressForm(props) {
		_classCallCheck(this, NewAddressForm);

		var _this = _possibleConstructorReturn(this, (NewAddressForm.__proto__ || Object.getPrototypeOf(NewAddressForm)).call(this, props));

		_this.handleNoSpaces = function (e) {
			var fieldName = e.target.name;
			var fieldValue = e.target.value;
			if (fieldValue === ' ') {
				_this.props.dispatch((0, _reduxForm.change)('newAddressForm', fieldName, ''));
				e.preventDefault();
			}
		};

		return _this;
	}

	_createClass(NewAddressForm, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_NewAddressFormInner2.default, _extends({}, this.props, { onHandleNoSpaces: this.handleNoSpaces }));
		}
	}]);

	return NewAddressForm;
}(_react.Component)) || _class) || _class);
exports.default = NewAddressForm;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _info = __webpack_require__(276);

var _info2 = _interopRequireDefault(_info);

var _colors = __webpack_require__(21);

var _materialUi = __webpack_require__(12);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var NewAddressFormInner = function NewAddressFormInner(props) {
	var onSubmit = props.onSubmit,
	    renderRaisedSubmitButton = props.renderRaisedSubmitButton,
	    renderMessage = props.renderMessage,
	    onHandleNoSpaces = props.onHandleNoSpaces;


	return _react2.default.createElement(
		'div',
		{ className: 'box box-default' },
		_react2.default.createElement(
			'div',
			{ className: 'box-header box-header-primary' },
			'Add Addresses'
		),
		_react2.default.createElement(
			'div',
			{ className: 'box-body' },
			_react2.default.createElement(
				'p',
				null,
				'Other addresses that are yours based on Wisdom\'s analysis of the blockchain will be automatically added for you.'
			),
			renderMessage(props.message),
			_react2.default.createElement(
				'form',
				{ role: 'form', onSubmit: onSubmit },
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-10', style: { paddingRight: 0 } },
						_react2.default.createElement(_reduxForm.Field, { name: 'newAddresses', label: 'Enter your addresses', rows: 1, rowsMax: 10, component: _utils.renderTextArea, multiLine: true, onChange: onHandleNoSpaces.bind(undefined) })
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-xs-2', style: { alignSelf: 'center', bottom: -15, padding: 0 } },
						_react2.default.createElement(
							_materialUi.IconButton,
							{ className: 'actionIcon', tooltip: 'To specify multiple addresses, click Enter after each address', tooltipPosition: 'top-left', tooltipStyles: { fontSize: 13 } },
							_react2.default.createElement(_info2.default, { color: _colors.cyan200, hoverColor: _colors.cyan500 })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'btn-space' },
					renderRaisedSubmitButton({
						label: 'Submit',
						labelWhenSubmitting: 'Validating'
					})
				)
			)
		)
	);
};

// src
exports.default = NewAddressFormInner;
module.exports = exports['default'];

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _NewAddressForm = __webpack_require__(155);

var _NewAddressForm2 = _interopRequireDefault(_NewAddressForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _NewAddressForm2.default;
module.exports = exports['default'];

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp, _initialiseProps; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _actions = __webpack_require__(10);

var _NicknameFormInner = __webpack_require__(159);

var _NicknameFormInner2 = _interopRequireDefault(_NicknameFormInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['newNickname', 'addressId', 'oldNickname', 'nicknameType'];
var initialValues = { newNickname: '' };
var NICK_EDIT_TYPES = {
	ADDRESS_NICK: 'ADDRESS_NICK',
	ASSOC_ADDRESS_NICK: 'ASSOC_ADDRESS_NICK',
	WALLET_ASSOC_ADDRESS_NICK: 'WALLET_ASSOC_ADDRESS_NICK'
};

var validate = function validate(values) {
	var errors = {};
	var hasErrors = false;
	var newNickname = values.newNickname,
	    oldNickname = values.oldNickname;


	if (!_.isNil(newNickname)) {
		if (!newNickname || !newNickname.trim() === '') {
			errors.newNickname = 'Provide a nickname.';
			hasErrors = true;
		}

		if (newNickname.length > 40) {
			errors.newNickname = 'Keep it under 40 characters.';
			hasErrors = true;
		}

		if (newNickname === oldNickname) {
			errors.newNickname = 'Think different. This is the same nickname as before.';
			hasErrors = true;
		}
	}

	return hasErrors && errors;
};

var NicknameForm = (_dec = (0, _reduxForm.reduxForm)({
	form: 'nicknameForm',
	fields: fields,
	validate: validate,
	initialValues: initialValues,
	touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
	onSubmit: function onSubmit(values, dispatch, props) {
		var addressId = values.addressId,
		    newNickname = values.newNickname,
		    nicknameType = values.nicknameType;


		if (!_.isNil(newNickname)) {
			switch (nicknameType) {
				case NICK_EDIT_TYPES.ADDRESS_NICK:
					return dispatch((0, _actions.updateUserAddress)(addressId, newNickname)).then(function (action) {
						dispatch((0, _actions.closeNicknameDialog)());
						return action;
					});
					break;

				case NICK_EDIT_TYPES.ASSOC_ADDRESS_NICK:
					return dispatch((0, _actions.updateAssociatedMyAdd)(addressId, newNickname)).then(function (action) {
						dispatch((0, _actions.closeNicknameDialog)());
						return action;
					});
					break;

				case NICK_EDIT_TYPES.WALLET_ASSOC_ADDRESS_NICK:
					return dispatch((0, _actions.updateAssociatedWalletAdd)(addressId, newNickname)).then(function (action) {
						dispatch((0, _actions.closeNicknameDialog)());
						return action;
					});
					break;

				default:
					break;
			}
		}
	}
}), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
	_inherits(NicknameForm, _Component);

	function NicknameForm(props) {
		_classCallCheck(this, NicknameForm);

		var _this = _possibleConstructorReturn(this, (NicknameForm.__proto__ || Object.getPrototypeOf(NicknameForm)).call(this, props));

		_initialiseProps.call(_this);

		return _this;
	}

	_createClass(NicknameForm, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.changeFields(nextProps);
			return true;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_NicknameFormInner2.default, _extends({}, this.props, { onHandleNoSpaces: this.handleNoSpaces }));
		}
	}]);

	return NicknameForm;
}(_react.Component), _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.changeFields = function (props) {
		var change = props.change,
		    addressId = props.addressId,
		    oldNickname = props.oldNickname,
		    nicknameType = props.nicknameType;


		change('addressId', addressId);
		change('oldNickname', oldNickname);
		change('nicknameType', nicknameType);
	};

	this.handleNoSpaces = function (e) {
		var fieldName = e.target.name;
		var fieldValue = e.target.value;
		if (fieldValue === ' ') {
			_this2.props.dispatch((0, _reduxForm.change)('registerForm', fieldName, ''));
			e.preventDefault();
		}
	};
}, _temp)) || _class) || _class);
exports.default = NicknameForm;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _materialUi = __webpack_require__(12);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var NicknameFormInner = function NicknameFormInner(props) {
	var renderRaisedSubmitButton = props.renderRaisedSubmitButton,
	    onSubmit = props.onSubmit,
	    oldNickname = props.oldNickname,
	    onHandleNoSpaces = props.onHandleNoSpaces,
	    onNicknameDialogClose = props.onNicknameDialogClose;


	return _react2.default.createElement(
		'form',
		{ onSubmit: onSubmit },
		_react2.default.createElement(_reduxForm.Field, { component: 'input', name: 'addressId', type: 'hidden' }),
		_react2.default.createElement(_reduxForm.Field, { component: 'input', name: 'oldNickname', type: 'hidden' }),
		_react2.default.createElement(_reduxForm.Field, { component: 'input', name: 'nicknameType', type: 'hidden' }),
		_react2.default.createElement(_reduxForm.Field, { name: 'newNickname', hintText: oldNickname, label: 'Nickname', component: _utils.renderTextField, autoComplete: 'off', autoFocus: true, onChange: onHandleNoSpaces.bind(undefined) }),
		_react2.default.createElement(
			'div',
			{ className: 'text-right', style: { marginTop: '10px' } },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'Cancel', onTouchTap: onNicknameDialogClose, style: { marginRight: 8 }, primary: true }),
			renderRaisedSubmitButton({
				label: 'Submit',
				labelWhenSubmitting: 'Submitting'
			})
		)
	);
};

// src
exports.default = NicknameFormInner;
module.exports = exports['default'];

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _NicknameForm = __webpack_require__(158);

var _NicknameForm2 = _interopRequireDefault(_NicknameForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _NicknameForm2.default;
module.exports = exports['default'];

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(5);

var _reactDom = __webpack_require__(285);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = __webpack_require__(3);

var _accounts = __webpack_require__(37);

var _ProviderFormInner = __webpack_require__(162);

var _ProviderFormInner2 = _interopRequireDefault(_ProviderFormInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['selectedProvider', 'submitBtn'];
var initialValues = { selectedProvider: 0 };

var validate = function validate(values) {
	var errors = {};
	var hasErrors = false;
	var selectedProvider = values.selectedProvider;

	console.log('VALS', values);

	if (!_.isNil(selectedProvider)) {
		if (selectedProvider === 0) {
			errors.selectedProvider = "Select a valid provider from the list.";
			hasErrors = true;
		}
	}

	return hasErrors && errors;
};

var ProviderForm = (_dec = (0, _reduxForm.reduxForm)({
	form: 'providerForm',
	fields: fields,
	validate: validate,
	initialValues: initialValues,
	touchOnBlur: false
}), _dec2 = (0, _utils.bindForm)({
	onSubmit: function onSubmit(values, dispatch, props) {
		var selectedProvider = values.selectedProvider;


		if (!_.isNil(selectedProvider)) {
			return dispatch((0, _accounts.accountconnectUrl)(selectedProvider)).then(function (action) {
				var error = action.error,
				    payload = action.payload;

				if (!error) {
					var url = payload.redirecturl;
					window.location = url;
					return action;
				}
			});
		}
	}
}), _dec(_class = _dec2(_class = function (_Component) {
	_inherits(ProviderForm, _Component);

	function ProviderForm(props) {
		_classCallCheck(this, ProviderForm);

		var _this = _possibleConstructorReturn(this, (ProviderForm.__proto__ || Object.getPrototypeOf(ProviderForm)).call(this, props));

		_this.handleOnChangeProvider = function (e) {
			// const { dispatch } = this.props
			// focus('providerForm', 'submitBtn')
			// const btn = document.getElementsByClassName('submitBtn')[0].children[0].children[0].children[0].children[0]
			// btn.focus()
			// const fieldName = e.target.name
			// const fieldValue = e.target.value
			// console.log('fieldName : ' + fieldName + ' AND fieldValue : ' + fieldValue)
			console.log('Event called', _this.props);
		};

		return _this;
	}

	_createClass(ProviderForm, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_ProviderFormInner2.default, _extends({}, this.props, { handleOnChangeProvider: this.handleOnChangeProvider }));
		}
	}]);

	return ProviderForm;
}(_react.Component)) || _class) || _class);
exports.default = ProviderForm;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MenuItem = __webpack_require__(272);

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reduxForm = __webpack_require__(5);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var ProviderFormInner = function ProviderFormInner(props) {
	var providerList = props.providerList,
	    onSubmit = props.onSubmit,
	    renderRaisedSubmitButton = props.renderRaisedSubmitButton,
	    handleOnChangeProvider = props.handleOnChangeProvider;


	return _react2.default.createElement(
		'form',
		{ onSubmit: onSubmit },
		_react2.default.createElement(
			_reduxForm.Field,
			{ name: 'selectedProvider', label: 'Provider', component: _utils.renderSelectField, onChange: handleOnChangeProvider },
			_react2.default.createElement(_MenuItem2.default, { key: 0, value: 0, primaryText: 'Select a provider...', selected: true }),
			providerList.map(function (provider) {
				return _react2.default.createElement(_MenuItem2.default, { key: provider.id, value: provider.id, primaryText: provider.displayName });
			})
		),
		_react2.default.createElement(
			'div',
			{ className: 'btn-space' },
			renderRaisedSubmitButton({ label: 'Connect', labelWhenSubmitting: 'Connecting' })
		)
	);
};

// src
exports.default = ProviderFormInner;
module.exports = exports['default'];

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _ProviderForm = __webpack_require__(161);

var _ProviderForm2 = _interopRequireDefault(_ProviderForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ProviderForm2.default;
module.exports = exports['default'];

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // libs


// src


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactSwipeableViews = __webpack_require__(291);

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _delete = __webpack_require__(27);

var _delete2 = _interopRequireDefault(_delete);

var _materialUi = __webpack_require__(12);

__webpack_require__(247);

var _ = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabContainerStyles = {
	maxWidth: '500px',
	float: 'left',
	height: '52px'
};

var inkBarStyles = {
	backgroundColor: '#0097A7',
	height: '3px',
	bottom: '52px',
	zIndex: '1'
};

var btnStyle = {
	textTransform: 'none',
	color: 'rgba(0,96,100,0.45)',
	backgroundColor: '#d2e7ea',
	fontSize: '16px',
	minWidth: 140,
	height: '54px'
};

var activeBtnStyle = {
	textTransform: 'none',
	color: '#0097A7',
	backgroundColor: '#FFF',
	fontSize: 18,
	minWidth: 140,
	height: '54px',
	transition: '0.5s'
};

var trxTypes = ['Income', 'Sale', 'Purchase', 'Transfer'];

var Operations = function Operations(props) {
	var selected = props.selected,
	    onBatchDeleteClick = props.onBatchDeleteClick,
	    onBatchTypeClick = props.onBatchTypeClick;


	return _react2.default.createElement(
		'span',
		null,
		_react2.default.createElement(
			'span',
			{ className: selected ? 'selectiveActionBtn' : 'hide' },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'Delete', labelPosition: 'after', icon: _react2.default.createElement(_delete2.default, null), hoverColor: 'rgba(0,188,212,0.1)', onClick: onBatchDeleteClick, primary: true })
		),
		_react2.default.createElement(
			'span',
			{ className: selected ? 'selectiveDropdownMenu' : 'hide' },
			_react2.default.createElement(
				_materialUi.SelectField,
				{
					selectedMenuItemStyle: { color: '#00ACC1' },
					hintText: 'Transaction Type',
					hintStyle: { fontWeight: 500, color: '#00BCD4', textAlign: 'center', top: 6, textTransform: 'uppercase', fontSize: 15 },
					underlineDisabledStyle: { display: 'none' },
					underlineFocusStyle: { display: 'none' },
					underlineStyle: { display: 'none' } },
				trxTypes.map(function (type, index) {
					return _react2.default.createElement(_materialUi.MenuItem, { value: index + 1, primaryText: type, onClick: function onClick() {
							return onBatchTypeClick(index + 1);
						} });
				})
			)
		)
	);
};

// <FlatButton label="Set Transaction Type" onClick={ onActionTypeDialogToggle } hoverColor={'rgba(0,188,212,0.1)'} primary />

var TabView = function TabView(props) {
	var tabIndex = props.tabIndex,
	    onTabChange = props.onTabChange,
	    onFormDialogOpen = props.onFormDialogOpen,
	    rowSelected = props.rowSelected;

	var tabLbls = ['Income', 'Spending', 'Trading'];

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: 'navSpan' },
			_react2.default.createElement(
				_materialUi.Tabs,
				{
					onChange: onTabChange,
					value: tabIndex,
					style: tabContainerStyles,
					inkBarStyle: inkBarStyles },
				tabLbls.map(function (lbl, index) {
					return _react2.default.createElement(_materialUi.Tab, { key: index, buttonStyle: tabIndex === index ? activeBtnStyle : btnStyle, value: index, label: lbl });
				})
			),
			_react2.default.createElement(_materialUi.RaisedButton, { className: 'actionBtn', label: 'Add Transaction', onClick: onFormDialogOpen, primary: true }),
			_react2.default.createElement(
				'span',
				null,
				_react2.default.createElement(Operations, _extends({ selected: rowSelected }, props))
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'box box-default' },
			_react2.default.createElement(
				'div',
				{ className: 'box-body' },
				_react2.default.createElement(
					_reactSwipeableViews2.default,
					{
						index: tabIndex,
						onChangeIndex: onTabChange },
					_react2.default.createElement(
						'div',
						{ className: 'slide' },
						_react2.default.createElement(_.IncomeView, props)
					),
					_react2.default.createElement(
						'div',
						{ className: 'slide' },
						_react2.default.createElement(_.SpendingView, props)
					),
					_react2.default.createElement(
						'div',
						{ className: 'slide' },
						_react2.default.createElement(_.TradingView, props)
					)
				)
			)
		)
	);
};

exports.default = TabView;
module.exports = exports['default'];

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _TabView = __webpack_require__(164);

var _TabView2 = _interopRequireDefault(_TabView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TabView2.default;
module.exports = exports['default'];

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // libs


// src


// assets


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _materialUi = __webpack_require__(12);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _2 = __webpack_require__(31);

var _3 = __webpack_require__(15);

var _commons = __webpack_require__(15);

var _expandMore = __webpack_require__(76);

var _expandMore2 = _interopRequireDefault(_expandMore);

var _expandLess = __webpack_require__(75);

var _expandLess2 = _interopRequireDefault(_expandLess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tblCols = {
	date: 'Date',
	destination: 'Destination',
	volume: 'Volume',
	value: 'Value',
	action: 'Action',
	source: 'Imported From'
};

var IncomeView = function IncomeView(props) {
	var onRowHover = props.onRowHover,
	    onRowHoverExit = props.onRowHoverExit,
	    hoveredRow = props.hoveredRow,
	    modifiedTrxs = props.modifiedTrxs,
	    isRefreshTransactionList = props.isRefreshTransactionList,
	    thisTrxType = props.thisTrxType,
	    listingParameters = props.listingParameters,
	    onColHeaderClick = props.onColHeaderClick,
	    orderBy = props.orderBy,
	    trxId = props.trxId,
	    deletingAll = props.deletingAll;
	var trxType = listingParameters.trxType,
	    orderWay = listingParameters.orderWay;


	return _react2.default.createElement(
		'div',
		{ className: 'box box-default table-box table-responsive mdl-shadow--2dp' },
		_react2.default.createElement(
			'table',
			{ className: 'mdl-data-table' },
			_react2.default.createElement(
				'thead',
				{ className: 'tbl-header' },
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						_react2.default.createElement(_3.Selection, _extends({ type: 'HEADER' }, props))
					),
					Object.keys(tblCols).map(function (key) {
						return _react2.default.createElement(
							'th',
							{
								key: key,
								style: { cursor: 'pointer' },
								className: 'mdl-data-table__cell--non-numeric',
								onClick: function onClick() {
									return onColHeaderClick(key);
								} },
							tblCols[key],
							key === orderBy && orderWay === 'DESC' ? _react2.default.createElement(_expandMore2.default, { className: 'carretIcon', style: { position: 'absolute', top: 20, marginLeft: 5, width: 16, height: 16 } }) : key === orderBy && orderWay === 'ASC' ? _react2.default.createElement(_expandLess2.default, { className: 'carretIcon', style: { position: 'absolute', top: 20, marginLeft: 5, width: 16, height: 16 } }) : null
						);
					}),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						tblCols.operations
					)
				)
			),
			_react2.default.createElement(
				'tbody',
				{ className: 'tbl-body' },
				isRefreshTransactionList || deletingAll || trxType !== thisTrxType ? _react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '8', className: 'text-center' },
						_react2.default.createElement(_materialUi.CircularProgress, { size: 30, thickness: 3 })
					)
				) : !_.isNil(modifiedTrxs) && modifiedTrxs.length > 0 ? modifiedTrxs.map(function (trx, index) {
					return _react2.default.createElement(
						'tr',
						{
							key: trx.id,
							onMouseEnter: onRowHover,
							onMouseLeave: onRowHoverExit,
							className: 'fixedHeightRow' },
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							_react2.default.createElement(_3.Selection, _extends({ index: trx.id, type: 'ROW' }, props))
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							(0, _moment2.default)(trx.transactionDate).format('ll')
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							!_.isNil(trx.destination) ? trx.destination : trx.associatedaddress.nickName
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.amount,
							' ',
							trx.asset
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							1700.54
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.transactiontype.typeName
						),
						trx.transactionimporttype.id === 4 || trx.transactionimporttype.id === 3 ? _react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.transactionimporttype.importTypeName
						) : trx.transactionimporttype.id === 1 ? _react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.userwallet.walletName
						) : _react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.useraddress.nickName
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric text-center fixedWidthCol' },
							(hoveredRow === index || trxId === trx.id) && _react2.default.createElement(_commons.Operations, _extends({ index: true, id: trx.id, type: trx.transactiontype.typeName, hovered: hoveredRow === index }, props))
						)
					);
				}) : _react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '8', className: 'text-center' },
						'No transactions found.'
					)
				)
			),
			_react2.default.createElement(
				'tfoot',
				null,
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '10' },
						_react2.default.createElement(_2.Pagination, props)
					)
				)
			)
		)
	);
};

exports.default = IncomeView;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pagination = function Pagination(props) {
	var pageOffset = props.pageOffset,
	    pageLimit = props.pageLimit,
	    totalRecords = props.totalRecords;


	return _react2.default.createElement(
		"div",
		{ className: "paginationNav" },
		_react2.default.createElement(
			"span",
			{ className: "pageCountText" },
			Math.min(pageOffset + 1, totalRecords) + '-' + Math.min(pageOffset + pageLimit, totalRecords) + ' of ' + totalRecords
		),
		_react2.default.createElement(
			"nav",
			null,
			_react2.default.createElement(
				"ul",
				{ className: "pagination" },
				_react2.default.createElement(
					"li",
					{ className: "page-item" },
					_react2.default.createElement(
						"a",
						{ className: "page-link ", href: "#", "aria-label": "Previous" },
						_react2.default.createElement(
							"span",
							{ "aria-hidden": "true" },
							"\xAB"
						)
					)
				),
				_react2.default.createElement(
					"li",
					{ className: "page-item" },
					_react2.default.createElement(
						"a",
						{ className: "page-link", href: "#" },
						"1"
					)
				),
				_react2.default.createElement(
					"li",
					{ className: "page-item active" },
					_react2.default.createElement(
						"a",
						{ className: "page-link", href: "#" },
						"2 ",
						_react2.default.createElement(
							"span",
							{ className: "sr-only" },
							"(current)"
						)
					)
				),
				_react2.default.createElement(
					"li",
					{ className: "page-item" },
					_react2.default.createElement(
						"a",
						{ className: "page-link", href: "#" },
						"3"
					)
				),
				_react2.default.createElement(
					"li",
					{ className: "page-item" },
					_react2.default.createElement(
						"a",
						{ className: "page-link", href: "#", "aria-label": "Next" },
						_react2.default.createElement(
							"span",
							{ "aria-hidden": "true" },
							"\xBB"
						)
					)
				)
			)
		)
	);
};

exports.default = Pagination;

// import React from 'react';
// import {TableFooter as TF, TableRow, TableRowColumn, FontIcon, IconButton} from 'material-ui';

// const styles = {
//   footerContent: {
//     float: 'right'
//   },
//   footerText: {
//     float: 'right',
//     paddingTop: 16,
//     height: 16
//   }
// };

// const TableFooter = React.createClass({

//   propTypes: {
//     offset: React.PropTypes.number.isRequired, // current offset
//     total: React.PropTypes.number.isRequired, // total number of rows
//     limit: React.PropTypes.number.isRequired, // num of rows in each page
//     onPageClick: React.PropTypes.func // what to do after clicking page number
//   },

//   render() {
//     let offset = this.props.offset;
//     let total = this.props.total;
//     let limit = this.props.limit;
//     return (
//       <TF adjustForCheckbox={false}>
//         <TableRow>
//           <TableRowColumn style={styles.footerContent}>
//             <IconButton disabled={offset === 0} onClick={this.props.onPageClick.bind(null, offset - limit)}>
//               <FontIcon className="material-icons">chevron_left</FontIcon>
//             </IconButton>
//             <IconButton disabled={offset + limit >= total} onClick={this.props.onPageClick.bind(null, offset + limit)}>
//               <FontIcon className="material-icons">chevron_right</FontIcon>
//             </IconButton>
//           </TableRowColumn>
//           <TableRowColumn style={styles.footerText}>
//             {Math.min((offset + 1), total) + '-' + Math.min((offset + limit), total) + ' of ' + total}
//           </TableRowColumn>
//         </TableRow>
//       </TF>
//     );
//   }

// });

// export default TableFooter;

module.exports = exports["default"];

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // libs


// src


// assets


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _materialUi = __webpack_require__(12);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _2 = __webpack_require__(31);

var _3 = __webpack_require__(15);

var _commons = __webpack_require__(15);

var _expandMore = __webpack_require__(76);

var _expandMore2 = _interopRequireDefault(_expandMore);

var _expandLess = __webpack_require__(75);

var _expandLess2 = _interopRequireDefault(_expandLess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tblCols = {
	date: 'Date',
	destination: 'Destination',
	volume: 'Volume',
	value: 'Value',
	action: 'Action',
	source: 'Imported From'
};

var SpendingView = function SpendingView(props) {
	var onRowHover = props.onRowHover,
	    onRowHoverExit = props.onRowHoverExit,
	    hoveredRow = props.hoveredRow,
	    modifiedTrxs = props.modifiedTrxs,
	    isRefreshTransactionList = props.isRefreshTransactionList,
	    thisTrxType = props.thisTrxType,
	    listingParameters = props.listingParameters,
	    onColHeaderClick = props.onColHeaderClick,
	    orderBy = props.orderBy,
	    trxId = props.trxId;
	var trxType = listingParameters.trxType,
	    orderWay = listingParameters.orderWay;


	return _react2.default.createElement(
		'div',
		{ className: 'box box-default table-box table-responsive mdl-shadow--2dp' },
		_react2.default.createElement(
			'table',
			{ className: 'mdl-data-table' },
			_react2.default.createElement(
				'thead',
				{ className: 'tbl-header' },
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						_react2.default.createElement(_3.Selection, _extends({ type: 'HEADER' }, props))
					),
					Object.keys(tblCols).map(function (key) {
						return _react2.default.createElement(
							'th',
							{
								key: key,
								style: { cursor: 'pointer' },
								className: 'mdl-data-table__cell--non-numeric',
								onClick: function onClick() {
									return onColHeaderClick(key);
								} },
							tblCols[key],
							key === orderBy && orderWay === 'DESC' ? _react2.default.createElement(_expandMore2.default, { className: 'carretIcon', style: { position: 'absolute', top: 20, marginLeft: 5, width: 16, height: 16 } }) : key === orderBy && orderWay === 'ASC' ? _react2.default.createElement(_expandLess2.default, { className: 'carretIcon', style: { position: 'absolute', top: 20, marginLeft: 5, width: 16, height: 16 } }) : null
						);
					}),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						tblCols.operations
					)
				)
			),
			_react2.default.createElement(
				'tbody',
				{ className: 'tbl-body' },
				isRefreshTransactionList || trxType !== thisTrxType ? _react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '8', className: 'text-center' },
						_react2.default.createElement(_materialUi.CircularProgress, { size: 30, thickness: 3 })
					)
				) : !_.isNil(modifiedTrxs) && modifiedTrxs.length > 0 ? modifiedTrxs.map(function (trx, index) {
					return _react2.default.createElement(
						'tr',
						{
							key: trx.id,
							onMouseEnter: onRowHover,
							onMouseLeave: onRowHoverExit,
							className: 'fixedHeightRow' },
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							_react2.default.createElement(_3.Selection, _extends({ index: trx.id, type: 'ROW' }, props))
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							(0, _moment2.default)(trx.transactionDate).format('ll')
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							!_.isNil(trx.destination) ? trx.destination : trx.associatedaddress.nickName
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.amount,
							' ',
							trx.asset
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							1700.54
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.transactiontype.typeName
						),
						trx.transactionimporttype.id === 4 || trx.transactionimporttype.id === 3 ? _react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.transactionimporttype.importTypeName
						) : trx.transactionimporttype.id === 1 ? _react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.userwallet.walletName
						) : _react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric' },
							trx.useraddress.nickName
						),
						_react2.default.createElement(
							'td',
							{ className: 'mdl-data-table__cell--non-numeric text-center fixedWidthCol' },
							(hoveredRow === index || trxId === trx.id) && _react2.default.createElement(_commons.Operations, _extends({ index: true, id: trx.id, type: trx.transactiontype.typeName, hovered: hoveredRow === index }, props))
						)
					);
				}) : _react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '8', className: 'text-center' },
						'No transactions found.'
					)
				)
			),
			_react2.default.createElement(
				'tfoot',
				null,
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '10' },
						_react2.default.createElement(_2.Pagination, props)
					)
				)
			)
		)
	);
};

exports.default = SpendingView;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // libs


// src


// assets


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _materialUi = __webpack_require__(12);

var _ = __webpack_require__(31);

var _2 = __webpack_require__(15);

var _delete = __webpack_require__(27);

var _delete2 = _interopRequireDefault(_delete);

var _modeEdit = __webpack_require__(28);

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _colors = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tblCols = {
	checkbox: '',
	date: 'Date',
	source: 'Source',
	action: 'Action',
	volume: 'Volume',
	price: 'Price',
	fee: 'Fees',
	cost: 'Cost',
	operations: ''
};

var Operations = function Operations(props) {
	return _react2.default.createElement(
		'span',
		null,
		_react2.default.createElement(
			_materialUi.IconButton,
			{ className: 'actionIcon' },
			_react2.default.createElement(_modeEdit2.default, { color: _colors.cyan200, hoverColor: _colors.cyan500 })
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ className: 'actionIcon' },
			_react2.default.createElement(_delete2.default, { color: _colors.cyan200, hoverColor: _colors.cyan500 })
		)
	);
};

var TradingView = function TradingView(props) {
	var tblData = props.tblData,
	    onRowHover = props.onRowHover,
	    onRowHoverExit = props.onRowHoverExit,
	    hoveredRow = props.hoveredRow;


	return _react2.default.createElement(
		'div',
		{ className: 'box box-default table-box table-responsive mdl-shadow--2dp' },
		_react2.default.createElement(
			'table',
			{ className: 'mdl-data-table' },
			_react2.default.createElement(
				'thead',
				{ className: 'tbl-header' },
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						_react2.default.createElement(_2.Selection, _extends({ type: 'HEADER' }, props))
					),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						tblCols.date
					),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						tblCols.source
					),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						tblCols.action
					),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						tblCols.volume,
						' ',
						tblCols.coin
					),
					_react2.default.createElement(
						'th',
						null,
						tblCols.price
					),
					_react2.default.createElement(
						'th',
						null,
						tblCols.fee
					),
					_react2.default.createElement(
						'th',
						null,
						tblCols.cost
					),
					_react2.default.createElement(
						'th',
						{ className: 'mdl-data-table__cell--non-numeric' },
						tblCols.operations
					)
				)
			),
			_react2.default.createElement(
				'tbody',
				{ className: 'tbl-body' },

				/* tblData.map((rowData, index) => {
    	return (
    		<tr 
    			key={ rowData.id }
    			onMouseEnter={ onRowHover }
    			onMouseLeave={ onRowHoverExit }
    			className="fixedHeightRow">
    				<td className="mdl-data-table__cell--non-numeric">{ <Selection index={ rowData.id } type={'ROW'} {...props} /> }</td>
    				<td className="mdl-data-table__cell--non-numeric">{ rowData.date }</td>
    				<td className="mdl-data-table__cell--non-numeric">{ rowData.source }</td>
    				<td className="mdl-data-table__cell--non-numeric">{ rowData.action }</td>
    				<td className="mdl-data-table__cell--non-numeric">{ rowData.volume } { rowData.coin }</td>
    				<td>{ rowData.price }</td>
    				<td>{ rowData.fee }</td>
    				<td>{ rowData.cost }</td>
    				<td className="mdl-data-table__cell--non-numeric text-center fixedWidthCol">{ (hoveredRow === index) ? <Operations /> : '' }</td>
    		</tr>
    	)
    }) */
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '8', className: 'text-center' },
						'No transactions found.'
					)
				)
			),
			_react2.default.createElement(
				'tfoot',
				null,
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ colSpan: '10' },
						_react2.default.createElement(_.Pagination, props)
					)
				)
			)
		)
	);
};

exports.default = TradingView;
module.exports = exports['default'];

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Header = __webpack_require__(95);

Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Header).default;
  }
});

var _PageLogin = __webpack_require__(122);

Object.defineProperty(exports, "PageLogin", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageLogin).default;
  }
});

var _PageRegister = __webpack_require__(130);

Object.defineProperty(exports, "PageRegister", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageRegister).default;
  }
});

var _PageForgotPassword = __webpack_require__(118);

Object.defineProperty(exports, "PageForgotPassword", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageForgotPassword).default;
  }
});

var _PageResetPassword = __webpack_require__(136);

Object.defineProperty(exports, "PageResetPassword", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageResetPassword).default;
  }
});

var _PagePrivacy = __webpack_require__(127);

Object.defineProperty(exports, "PagePrivacy", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PagePrivacy).default;
  }
});

var _PageTerms = __webpack_require__(142);

Object.defineProperty(exports, "PageTerms", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageTerms).default;
  }
});

var _PageLogout = __webpack_require__(124);

Object.defineProperty(exports, "PageLogout", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageLogout).default;
  }
});

var _Page = __webpack_require__(100);

Object.defineProperty(exports, "Page404", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Page).default;
  }
});

var _PageErrorView = __webpack_require__(115);

Object.defineProperty(exports, "PageErrorView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageErrorView).default;
  }
});

var _PageAccountView = __webpack_require__(107);

Object.defineProperty(exports, "PageAccountView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageAccountView).default;
  }
});

var _PageCalculateView = __webpack_require__(110);

Object.defineProperty(exports, "PageCalculateView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageCalculateView).default;
  }
});

var _PageChartsView = __webpack_require__(113);

Object.defineProperty(exports, "PageChartsView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageChartsView).default;
  }
});

var _PageReportsView = __webpack_require__(133);

Object.defineProperty(exports, "PageReportsView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageReportsView).default;
  }
});

var _PageSystemView = __webpack_require__(139);

Object.defineProperty(exports, "PageSystemView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageSystemView).default;
  }
});

var _PrivateRoute = __webpack_require__(144);

Object.defineProperty(exports, "PrivateRoute", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrivateRoute).default;
  }
});

var _PublicRoute = __webpack_require__(146);

Object.defineProperty(exports, "PublicRoute", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PublicRoute).default;
  }
});

var _NotificationSystemConnector = __webpack_require__(97);

Object.defineProperty(exports, "NotificationSystemConnector", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_NotificationSystemConnector).default;
  }
});

var _PageLoading = __webpack_require__(30);

Object.defineProperty(exports, "PageLoading", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageLoading).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = accounts;

var _actions = __webpack_require__(10);

var ActionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function accounts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    /** ***************************************myAccountData*****************************************************************/
    case ActionTypes.MYACCOUNT_DATA_SUCCESS:
      {
        var payload = action.payload;
        var providerList = payload.providerList,
            userProviderList = payload.userProviderList,
            userAddressesList = payload.userAddressesList;

        if (!payload) {
          throw new Error('Can\'t execute ' + ActionTypes.GET_ALL_PROVIDERS_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { providerList: providerList, userProviderList: userProviderList, userAddressesList: userAddressesList });
      }

    /** ***************************************deleteWallet*****************************************************************/
    case ActionTypes.DELETE_WALLET:
      {
        return _extends({}, state, { deleteUserWalletList: true });
      }
    case ActionTypes.DELETE_WALLET_SUCCESS:
      {
        var _payload = action.payload;
        var _userProviderList = _payload.userProviderList;

        if (!_payload) {
          throw new Error('Can\'t execute ' + ActionTypes.DELETE_WALLET_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userProviderList: _userProviderList, deleteUserWalletList: false });
      }
    case ActionTypes.DELETE_WALLET_FAILURE:
      {
        return _extends({}, state, { deleteUserWalletList: false });
      }
    /** ***************************************refreshUserProviders*****************************************************************/
    case ActionTypes.REFRESH_USERPROVIDERS:
      {
        return _extends({}, state, { refreshUserWalletList: true });
      }
    case ActionTypes.REFRESH_USERPROVIDERS_SUCCESS:
      {
        var _payload2 = action.payload;
        var _userProviderList2 = _payload2.userProviderList;

        if (!_payload2) {
          throw new Error('Can\'t execute ' + ActionTypes.REFRESH_USERPROVIDERS_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userProviderList: _userProviderList2, refreshUserWalletList: false });
      }
    case ActionTypes.REFRESH_USERPROVIDERS_FAILURE:
      {
        return _extends({}, state, { refreshUserWalletList: false });
      }
    /** ***************************************updateAssociatedWalletAdd*****************************************************************/
    case ActionTypes.UPDATE_ASSOCIATED_WALLETADD:
      {
        return _extends({}, state, { refreshUserWalletList: true });
      }
    case ActionTypes.UPDATE_ASSOCIATED_WALLETADD_SUCCESS:
      {
        var _payload3 = action.payload;
        var _userProviderList3 = _payload3.userProviderList;

        if (!_payload3) {
          throw new Error('Can\'t execute ' + ActionTypes.UPDATE_ASSOCIATED_WALLETADD_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userProviderList: _userProviderList3, refreshUserWalletList: false });
      }
    case ActionTypes.UPDATE_ASSOCIATED_WALLETADD_FAILURE:
      {
        return _extends({}, state, { refreshUserWalletList: false });
      }
    /** ***************************************addUserAddresses*****************************************************************/
    case ActionTypes.ADD_USER_ADDRESSES:
      {
        return _extends({}, state, { addUserAddressList: true });
      }
    case ActionTypes.ADD_USER_ADDRESSES_SUCCESS:
      {
        var _payload4 = action.payload;
        var _userAddressesList = _payload4.userAddressesList;

        if (!_payload4) {
          throw new Error('Can\'t execute ' + ActionTypes.ADD_USER_ADDRESSES_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userAddressesList: _userAddressesList, addUserAddressList: false });
      }
    case ActionTypes.ADD_USER_ADDRESSES_FAILURE:
      {
        return _extends({}, state, { addUserAddressList: false });
      }
    /** **************************************refreshUserAddresses******************************************************************/
    case ActionTypes.REFRESH_USER_ADDRESSES:
      {
        return _extends({}, state, { refreshUserAddressList: true });
      }
    case ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS:
      {
        var _payload5 = action.payload;
        var _userAddressesList2 = _payload5.userAddressesList;

        if (!_payload5) {
          throw new Error('Can\'t execute ' + ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userAddressesList: _userAddressesList2, refreshUserAddressList: false });
      }
    case ActionTypes.REFRESH_USER_ADDRESSES_FAILURE:
      {
        return _extends({}, state, { refreshUserAddressList: false });
      }
    /** ************************************deleteUserAddress********************************************************************/
    case ActionTypes.DELETE_USER_ADDRESS:
      {
        return _extends({}, state, { deleteUserAddressList: true });
      }
    case ActionTypes.DELETE_USER_ADDRESS_SUCCESS:
      {
        var _payload6 = action.payload;
        var _userAddressesList3 = _payload6.userAddressesList;

        if (!_payload6) {
          throw new Error('Can\'t execute ' + ActionTypes.DELETE_USER_ADDRESS_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userAddressesList: _userAddressesList3, deleteUserAddressList: false });
      }
    case ActionTypes.DELETE_USER_ADDRESS_FAILURE:
      {
        return _extends({}, state, { deleteUserAddressList: false });
      }
    /** ************************************updateUserAddress********************************************************************/
    case ActionTypes.UPDATE_USER_ADDRESS:
      {
        return _extends({}, state, { updateUserAddressList: true });
      }
    case ActionTypes.UPDATE_USER_ADDRESS_SUCCESS:
      {
        var _payload7 = action.payload;
        var _userAddressesList4 = _payload7.userAddressesList;

        if (!_payload7) {
          throw new Error('Can\'t execute ' + ActionTypes.UPDATE_USER_ADDRESS_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userAddressesList: _userAddressesList4, updateUserAddressList: false });
      }
    case ActionTypes.UPDATE_USER_ADDRESS_FAILURE:
      {
        return _extends({}, state, { updateUserAddressList: false });
      }
    /** ************************************updateAssociatedMyAdd********************************************************************/
    case ActionTypes.UPDATE_ASSOCIATED_MYADD:
      {
        return _extends({}, state, { refreshUserAddressList: true });
      }
    case ActionTypes.UPDATE_ASSOCIATED_MYADD_SUCCESS:
      {
        var _payload8 = action.payload;
        var _userAddressesList5 = _payload8.userAddressesList;

        if (!_payload8) {
          throw new Error('Can\'t execute ' + ActionTypes.UPDATE_ASSOCIATED_MYADD_SUCCESS + '. {payload} isn\'t available in action');
        }
        return _extends({}, state, { userAddressesList: _userAddressesList5, refreshUserAddressList: false });
      }
    case ActionTypes.UPDATE_ASSOCIATED_MYADD_FAILURE:
      {
        return _extends({}, state, { refreshUserAddressList: false });
      }
    /** ************************************ NICKNAME DIALOG ********************************************************************/
    case ActionTypes.CLOSE_NICKNAME_DIALOG:
      {
        return _extends({}, state, { isNicknameDialogOpen: false });
      }

    case ActionTypes.OPEN_NICKNAME_DIALOG:
      {
        return _extends({}, state, { isNicknameDialogOpen: true });
      }
    /** ************************************default********************************************************************/
    default:
      {
        return state;
      }
  }
}
module.exports = exports['default'];

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(29);

var _users = __webpack_require__(174);

var _users2 = _interopRequireDefault(_users);

var _accounts = __webpack_require__(171);

var _accounts2 = _interopRequireDefault(_accounts);

var _transactions = __webpack_require__(173);

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  users: _users2.default,
  accounts: _accounts2.default,
  transactions: _transactions2.default
});
module.exports = exports['default'];

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = accounts;

var _actions = __webpack_require__(10);

var ActionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function accounts() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {

		/** ***************************************transactionsData*****************************************************************/
		case ActionTypes.TRANSACTION_DATA:
			{
				return _extends({}, state, { refreshTransactionList: true });
			}
		case ActionTypes.TRANSACTION_DATA_SUCCESS:
			{
				var payload = action.payload;
				var transactionList = payload.transactionList,
				    trxType = payload.trxType;

				if (!payload) {
					throw new Error('Can\'t execute ' + ActionTypes.TRANSACTION_DATA_SUCCESS + '. {payload} isn\'t available in action');
				}
				return _extends({}, state, { transactionList: transactionList, trxType: trxType, refreshTransactionList: false });
			}
		case ActionTypes.TRANSACTION_DATA_FAILURE:
			{
				return _extends({}, state, { refreshTransactionList: false });
			}

		/** *************************************** INSERT NEW MANUAL TRANSACTION *****************************************************************/
		case ActionTypes.INSERT_TRANSACTION:
			{
				return _extends({}, state, { refreshTransactionList: true });
			}
		case ActionTypes.INSERT_TRANSACTION_SUCCESS:
			{
				var _payload = action.payload;
				var _transactionList = _payload.transactionList;

				if (!_payload) {
					throw new Error('Can\'t execute ' + ActionTypes.INSERT_TRANSACTION_SUCCESS + '. {payload} isn\'t available in action');
				}
				return _extends({}, state, { transactionList: _transactionList, refreshTransactionList: false });
			}
		case ActionTypes.INSERT_TRANSACTION_FAILURE:
			{
				return _extends({}, state, { refreshTransactionList: false });
			}

		/** *************************************** DELETE TRANSACTION *****************************************************************/
		case ActionTypes.DELETE_TRANSACTION:
			{
				return _extends({}, state, { deleteTransactionList: true });
			}
		case ActionTypes.DELETE_TRANSACTION_SUCCESS:
			{
				var _payload2 = action.payload;
				var _transactionList2 = _payload2.transactionList;

				if (!_payload2) {
					throw new Error('Can\'t execute ' + ActionTypes.DELETE_TRANSACTION_SUCCESS + '. {payload} isn\'t available in action');
				}
				return _extends({}, state, { transactionList: _transactionList2, deleteTransactionList: false });
			}
		case ActionTypes.DELETE_TRANSACTION_FAILURE:
			{
				return _extends({}, state, { deleteTransactionList: false });
			}

		/** *************************************** UPDATE TRANSACTION *****************************************************************/
		case ActionTypes.UPDATE_TRANSACTION:
			{
				return _extends({}, state, { updateTransactionList: true });
			}
		case ActionTypes.UPDATE_TRANSACTION_SUCCESS:
			{
				var _payload3 = action.payload;
				var _transactionList3 = _payload3.transactionList;

				if (!_payload3) {
					throw new Error('Can\'t execute ' + ActionTypes.UPDATE_TRANSACTION_SUCCESS + '. {payload} isn\'t available in action');
				}
				return _extends({}, state, { transactionList: _transactionList3, updateTransactionList: false });
			}
		case ActionTypes.UPDATE_TRANSACTION_FAILURE:
			{
				return _extends({}, state, { updateTransactionList: false });
			}

		/** *************************************** UPDATE TRANSACTION *****************************************************************/
		case ActionTypes.UPDATE_TRANSACTIONS_TYPE:
			{
				return _extends({}, state, { updateTransactionList: true });
			}
		case ActionTypes.UPDATE_TRANSACTIONS_TYPE_SUCCESS:
			{
				var _payload4 = action.payload;
				var _transactionList4 = _payload4.transactionList;

				if (!_payload4) {
					throw new Error('Can\'t execute ' + ActionTypes.UPDATE_TRANSACTIONS_TYPE_SUCCESS + '. {payload} isn\'t available in action');
				}
				return _extends({}, state, { transactionList: _transactionList4, updateTransactionList: false });
			}
		case ActionTypes.UPDATE_TRANSACTIONS_TYPE_FAILURE:
			{
				return _extends({}, state, { updateTransactionList: false });
			}

		/** *************************************** MODAL DIALOG *****************************************************************/
		case ActionTypes.CLOSE_FORM_DIALOG:
			{
				return _extends({}, state, { isFormDialogOpen: false });
			}

		case ActionTypes.OPEN_FORM_DIALOG:
			{
				return _extends({}, state, { isFormDialogOpen: true });
			}
		/** ************************************default********************************************************************/
		default:
			{
				return state;
			}
	}
}
module.exports = exports['default'];

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = users;

var _actions = __webpack_require__(10);

var ActionTypes = _interopRequireWildcard(_actions);

var _utils = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      {
        return _extends({}, state, { isLoading: true });
      }
    case ActionTypes.USER_LOGIN_SUCCESS:
      {
        if (!action.payload) {
          throw new Error('Can\'t execute ' + ActionTypes.USER_LOGIN_SUCCESS + '. {payload} isn\'t available in action');
        }

        var user = action.payload.user;

        return (0, _utils.mergeNewEntities)(state, [user], _utils.ENTITY_STATUS_DATA_AVAILABLE);
      }
    case ActionTypes.USER_LOGIN_FAILURE:
      {
        return _extends({}, state, { isLoading: false });
      }
    case ActionTypes.USER_LOGOUT:
      {
        return _extends({}, state, { isLoading: false, isLogoutLoading: true });
      }
    case ActionTypes.USER_LOGOUT_SUCCESS:
      {
        return _extends({}, state, { isLoading: false, isLogoutLoading: false });
      }
    case ActionTypes.USER_LOGOUT_FAILURE:
      {
        return _extends({}, state, { isLoading: false, isLogoutLoading: false });
      }
    /*case ActionTypes.USER_REGISTER_SUCCESS: {
      if (!action.payload) {
        throw new Error(`Can't execute ${ ActionTypes.USER_REGISTER_SUCCESS }. {payload} isn't available in action`)
      }
        const { payload: { user } } = action
        return mergeNewEntities(state, [user], ENTITY_STATUS_DATA_AVAILABLE)
    }*/
    default:
      {
        return state;
      }
  }
}
module.exports = exports['default'];

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(29);

var _reduxThunk = __webpack_require__(78);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(292);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _api = __webpack_require__(20);

var _api2 = _interopRequireDefault(_api);

var _reducers = __webpack_require__(55);

var _reducers2 = _interopRequireDefault(_reducers);

var _configureRouter = __webpack_require__(56);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(preloadedState) {
  var composeEnhancers = !(0, _utils.isServer)() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

  var store = (0, _redux.createStore)(_reducers2.default, preloadedState, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, _api2.default, (0, _reduxLogger2.default)({
    collapsed: true
  }), _configureRouter.middleware)));

  /*
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  */

  return store;
}
module.exports = exports['default'];

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(177);
} else {
  module.exports = __webpack_require__(175);
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(29);

var _reduxThunk = __webpack_require__(78);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _api = __webpack_require__(20);

var _api2 = _interopRequireDefault(_api);

var _reducers = __webpack_require__(55);

var _reducers2 = _interopRequireDefault(_reducers);

var _configureRouter = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(preloadedState) {
  return (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, _api2.default, _configureRouter.middleware));
}
module.exports = exports['default'];

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _RaisedButton = __webpack_require__(36);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = __webpack_require__(271);

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _utils = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// libs


// src


/**
 * A higher order function that injects some additional params to a form component
 * @param {Object} param0 
 */
exports.default = function (options) {
  return function (WrappedComponent) {
    var onSubmit = options.onSubmit;

    var getDefaultState = function getDefaultState() {
      return {
        error: false,
        errorMessage: ''
      };
    };

    return function (_React$Component) {
      _inherits(BoundForm, _React$Component);

      function BoundForm(props) {
        _classCallCheck(this, BoundForm);

        var _this = _possibleConstructorReturn(this, (BoundForm.__proto__ || Object.getPrototypeOf(BoundForm)).call(this, props));

        _this.state = getDefaultState();

        _this.handleChangeEntityStatus = function (entity, status) {
          if (status === _utils.ENTITY_STATUS_DATA_AVAILABLE) {
            var initialize = _this.props.initialize;

            initialize(entity);
          }
        };

        _this.wrapSubmit = function (submit) {
          return function () {
            _this.setState(getDefaultState());

            return submit.apply(undefined, arguments).then(function (action) {
              if (!action) {
                /*
                console && console.error && console.error(
                  'nothing returned in then'
                )
                */
              }
              var error = action.error,
                  payload = action.payload;


              if (error) {
                _this.setState({
                  error: true,
                  errorMessage: payload.message
                });

                throw new Error('An error occurred while submitting the form: ' + payload.message);
              } else {
                // console.log('action is : ' + JSON.stringify(action))
                _this.setState({
                  error: false,
                  errorMessage: payload.message
                });
              }

              return action;
            });
          };
        };

        _this.renderSubmitButton = function (_ref) {
          var label = _ref.label,
              labelWhenSubmitting = _ref.labelWhenSubmitting;
          var submitting = _this.props.submitting;


          return _react2.default.createElement(_FlatButton2.default, {
            className: 'submitBtn',
            type: 'submit',
            label: submitting ? labelWhenSubmitting : label,
            onClick: _this.handleSubmit,
            disabled: submitting,
            primary: true });
        };

        _this.renderRaisedSubmitButton = function (_ref2) {
          var label = _ref2.label,
              labelWhenSubmitting = _ref2.labelWhenSubmitting;
          var submitting = _this.props.submitting;


          return _react2.default.createElement(_RaisedButton2.default, {
            type: 'submit',
            label: submitting ? labelWhenSubmitting : label,
            onClick: _this.handleSubmit,
            disabled: submitting,
            primary: true });
        };

        _this.renderMessage = function (msg) {
          // console.log('msg : ' + msg)
          var _this$state = _this.state,
              error = _this$state.error,
              errorMessage = _this$state.errorMessage;


          if (error) {
            return _react2.default.createElement('div', { style: { color: '#EF5350', fontSize: '12pt' }, dangerouslySetInnerHTML: { __html: errorMessage } });
          } else if (!error && errorMessage !== '') {
            return _react2.default.createElement('div', { style: { color: '#4F8A10', fontSize: '12pt' }, dangerouslySetInnerHTML: { __html: errorMessage } });
          } else if (msg) {
            return _react2.default.createElement('div', { style: { color: '#4F8A10', fontSize: '12pt' }, dangerouslySetInnerHTML: { __html: msg } });
          } else {
            return _react2.default.createElement('span', null);
          }

          // return error ? <div style={{color: '#EF5350', fontSize: '12pt'}} dangerouslySetInnerHTML={{__html: errorMessage}}></div> : !error && errorMessage !== '' ? <div style={{color: '#4F8A10', fontSize: '12pt'}} dangerouslySetInnerHTML={{__html: errorMessage}}></div> : <span></span>
        };

        var handleSubmit = props.handleSubmit;

        _this.handleSubmit = handleSubmit(_this.wrapSubmit(onSubmit));
        return _this;
      }

      _createClass(BoundForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var hasEntity = _.has(this.props, 'entity');

          if (hasEntity) {
            var entity = _.get(this.props, 'entity');
            var status = _.get(this.props, 'entity.__status__');

            this.handleChangeEntityStatus(entity, status);
          }
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var hasEntity = _.has(this.props, 'entity');
          var status = _.get(this.props, 'entity.__status__');
          var nextStatus = _.get(nextProps, 'entity.__status__');

          // debugger

          if (hasEntity && status !== nextStatus) {
            this.handleChangeEntityStatus(nextProps.entity, nextStatus);
          }
        }
        /**
         * Will only be called when two conditions are met:
         * 1. Form is being used for updating an entity
         * 2. __status__ of that entity _.has changed
         * 
         */

      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
            onSubmit: this.handleSubmit,
            renderRaisedSubmitButton: this.renderRaisedSubmitButton,
            renderSubmitButton: this.renderSubmitButton,
            renderMessage: this.renderMessage }));
        }
      }]);

      return BoundForm;
    }(_react2.default.Component);
  };
};

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// libs


// src


var _has = __webpack_require__(73);

var _has2 = _interopRequireDefault(_has);

var _get = __webpack_require__(35);

var _get2 = _interopRequireDefault(_get);

var _utils = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  var _options$fetchOneActi = options.fetchOneActions;
  _options$fetchOneActi = _options$fetchOneActi === undefined ? ["1", "1s", "1f"] : _options$fetchOneActi;

  var _options$fetchOneActi2 = _slicedToArray(_options$fetchOneActi, 3),
      FETCH_ONE = _options$fetchOneActi2[0],
      FETCH_ONE_SUCCESS = _options$fetchOneActi2[1],
      FETCH_ONE_FAILURE = _options$fetchOneActi2[2],
      _options$fetchAllActi = options.fetchAllActions;

  _options$fetchAllActi = _options$fetchAllActi === undefined ? ["2", "2s", "2f"] : _options$fetchAllActi;

  var _options$fetchAllActi2 = _slicedToArray(_options$fetchAllActi, 3),
      FETCH_ALL = _options$fetchAllActi2[0],
      FETCH_ALL_SUCCESS = _options$fetchAllActi2[1],
      FETCH_ALL_FAILURE = _options$fetchAllActi2[2],
      _options$deleteAction = options.deleteActions;

  _options$deleteAction = _options$deleteAction === undefined ? ["3", "3s", "3f"] : _options$deleteAction;

  var _options$deleteAction2 = _slicedToArray(_options$deleteAction, 3),
      DELETE_ONE = _options$deleteAction2[0],
      DELETE_ONE_SUCCESS = _options$deleteAction2[1],
      DELETE_ONE_FAILURE = _options$deleteAction2[2],
      _options$updateAction = options.updateActions;

  _options$updateAction = _options$updateAction === undefined ? ["4", "4s", "4f"] : _options$updateAction;

  var _options$updateAction2 = _slicedToArray(_options$updateAction, 3),
      UPDATE_ONE = _options$updateAction2[0],
      UPDATE_ONE_SUCCESS = _options$updateAction2[1],
      UPDATE_ONE_FAILURE = _options$updateAction2[2],
      _options$createAction = options.createActions;

  _options$createAction = _options$createAction === undefined ? ["5", "5s", "5f"] : _options$createAction;

  var _options$createAction2 = _slicedToArray(_options$createAction, 3),
      CREATE_ONE = _options$createAction2[0],
      CREATE_ONE_SUCCESS = _options$createAction2[1],
      CREATE_ONE_FAILURE = _options$createAction2[2],
      reducer = options.reducer;

  function __entityReducer__() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var type = action.type;

    switch (type) {
      case FETCH_ONE:
        {
          if (!(0, _has2.default)(action, "meta.id")) {
            throw new Error("Can't execute " + FETCH_ONE + " without required data. Did you forget to include {meta: {id}} in action?");
          }

          var id = (0, _get2.default)(action, "meta.id");

          return (0, _utils.mergeNewEntities)(state, [{
            id: id
          }], _utils.ENTITY_STATUS_LOADING);
        }
      case FETCH_ONE_SUCCESS:
        {
          if (!action.payload) {
            throw new Error("Can't execute " + FETCH_ONE_SUCCESS + ". {payload} isn't available in action");
          }

          var payload = action.payload;


          return (0, _utils.mergeNewEntities)(state, [payload], _utils.ENTITY_STATUS_DATA_AVAILABLE);
        }
      case FETCH_ONE_FAILURE:
        {
          if (!(0, _has2.default)(action, "payload.message") || !(0, _has2.default)(action, "meta.id")) {
            throw new Error("Can't execute " + FETCH_ONE_FAILURE + ", payload.message or meta.id were not found in action");
          }

          var message = action.payload.message,
              _id = action.meta.id;


          return (0, _utils.mergeNewEntities)(state, [{
            id: _id,
            __message__: message
          }], _utils.ENTITY_STATUS_DATA_UNAVAILABLE);
        }
      case CREATE_ONE:
        {
          return state;
        }
      case CREATE_ONE_SUCCESS:
        {
          return (0, _utils.mergeNewEntities)(state, [action.payload], _utils.ENTITY_STATUS_DATA_AVAILABLE);
        }
      case CREATE_ONE_FAILURE:
        {
          return state;
        }
      case UPDATE_ONE:
        {
          var _id2 = (0, _get2.default)(action, "meta.id");

          if (!_id2) {
            throw new Error("Couldn't complete action " + UPDATE_ONE + ". Did you forget to specify {meta: {id}} in action?");
          }

          return (0, _utils.pushEntitiesStatus)(state, [{ id: _id2 }], _utils.ENTITY_STATUS_UPDATING);
        }
      case UPDATE_ONE_SUCCESS:
        {
          return (0, _utils.mergeNewEntities)(state, [action.payload], _utils.ENTITY_STATUS_DATA_AVAILABLE);
        }
      case UPDATE_ONE_FAILURE:
        {
          var _id3 = (0, _get2.default)(action, "meta.id");

          if (!_id3) {
            throw new Error("Couldn't complete action " + UPDATE_ONE_FAILURE + ". Did you forget to specify {meta: {id}} in action?");
          }

          return (0, _utils.popEntitiesStatus)(state, [{ id: _id3 }]);
        }
      case DELETE_ONE:
        {
          var _id4 = (0, _get2.default)(action, "meta.id");

          if (!_id4) {
            throw new Error("Couldn't complete action " + DELETE_ONE + ". Did you forget to specify {meta: {id}} in action?");
          }

          return (0, _utils.pushEntitiesStatus)(state, [{ id: _id4 }], _utils.ENTITY_STATUS_DELETING);
        }
      case DELETE_ONE_SUCCESS:
        {
          var _id5 = (0, _get2.default)(action, "meta.id");

          if (!_id5) {
            throw new Error("Couldn't complete action " + DELETE_ONE_SUCCESS + ". Did you forget to specify {meta: {id}} in action?");
          }

          return (0, _utils.replaceNewEntities)(state, [{ id: _id5 }], _utils.ENTITY_STATUS_DATA_UNAVAILABLE);
        }
      case DELETE_ONE_FAILURE:
        {
          var _id6 = (0, _get2.default)(action, "meta.id");

          if (!_id6) {
            throw new Error("Couldn't complete action " + DELETE_ONE_FAILURE + ". Did you forget to specify {meta: {id}} in action?");
          }

          return (0, _utils.popEntitiesStatus)(state, [{ id: _id6 }]);
        }
      case FETCH_ALL:
        {
          return state;
        }
      case FETCH_ALL_SUCCESS:
        {
          return (0, _utils.mergeNewEntities)(state, action.payload, _utils.ENTITY_STATUS_DATA_AVAILABLE);
        }
      case FETCH_ALL_FAILURE:
        {
          return state;
        }
      default:
        {
          return state;
        }
    }
  }

  return function entityReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var newState = __entityReducer__(state, action);

    return reducer ? reducer(newState, action) : newState;
  };
};

module.exports = exports["default"];

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// libs


var _redux = __webpack_require__(29);

var _get = __webpack_require__(35);

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (options) {
  var _options$actions = _slicedToArray(options.actions, 3),
      ACTION_FETCH = _options$actions[0],
      ACTION_SUCCESS = _options$actions[1],
      ACTION_FAILURE = _options$actions[2],
      _options$entityCreate = options.entityCreateActions;

  _options$entityCreate = _options$entityCreate === undefined ? ["e0", "e0s", "e0f"] : _options$entityCreate;

  var _options$entityCreate2 = _slicedToArray(_options$entityCreate, 3),
      ENTITY_CREATE_ONE = _options$entityCreate2[0],
      ENTITY_CREATE_ONE_SUCCESS = _options$entityCreate2[1],
      ENTITY_CREATE_ONE_FAILURE = _options$entityCreate2[2],
      _options$entityDelete = options.entityDeleteActions;

  _options$entityDelete = _options$entityDelete === undefined ? ["e1", "e1s", "e1f"] : _options$entityDelete;

  var _options$entityDelete2 = _slicedToArray(_options$entityDelete, 3),
      ENTITY_DELETE_ONE = _options$entityDelete2[0],
      ENTITY_DELETE_ONE_SUCCESS = _options$entityDelete2[1],
      ENTITY_DELETE_ONE_FAILURE = _options$entityDelete2[2],
      reducerItems = options.reducerItems;

  function isLoading() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
      case ACTION_FETCH:
        {
          return true;
        }
      case ACTION_FAILURE:
      case ACTION_SUCCESS:
        {
          return false;
        }
      default:
        {
          return state;
        }
    }
  }

  function __items__() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
      case ACTION_SUCCESS:
        {
          return [].concat(_toConsumableArray(action.payload.map(function (item) {
            return item.id;
          })));
        }
      case ENTITY_CREATE_ONE_SUCCESS:
        {
          return [].concat(_toConsumableArray(state), [action.payload.id]);
        }
      case ENTITY_DELETE_ONE_SUCCESS:
        {
          var newState = [].concat(_toConsumableArray(state));
          var id = (0, _get2.default)(action, "meta.id");
          var index = newState.indexOf(id);

          if (index > -1) {
            newState.splice(index, 1);
          }

          return newState;
        }
      default:
        {
          return state;
        }
    }
  }

  function items() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    var newState = __items__(state, action);

    return reducerItems ? reducerItems(newState, action) : newState;
  }

  function meta() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      offset: 0,
      limit: 10,
      total: 0,
      requestCount: 0,
      lastItemsFetchedCount: 0
    };
    var action = arguments[1];

    switch (action.type) {
      case ACTION_SUCCESS:
        {
          return _extends({}, state, {
            offset: 0,
            total: action.payload.length,
            requestCount: state.requestCount + 1,
            lastItemsFetchedCount: action.payload.length
          });
        }
      default:
        {
          return state;
        }
    }
  }

  return (0, _redux.combineReducers)({
    isLoading: isLoading,
    items: items,
    meta: meta
  });
};

module.exports = exports["default"];

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _utils = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// libs


// src


/**
 * A utility higher order function to make sure that a particular entity (or entities) are present in redux store
 * when a React component is mounted. Here are two different types of operations you can do with this:
 * 
 * 1. Fetch specific nodes by ID
 * You must provide following items in the `options` to make it work:
 * - entityKey
 * - fetchEntity
 * - id
 * 
 * 2. Fetch all nodes
 * You must provide following items in the `options` to make it work:
 * - entityKey
 * - fetchAll
 * - feedKey
 */
exports.default = function (options) {
    return function (WrappedComponent) {
        var entityKey = options.entityKey,
            fetchEntity = options.fetchEntity,
            fetchAll = options.fetchAll,
            feedKey = options.feedKey,
            _options$skip = options.skip,
            skip = _options$skip === undefined ? false : _options$skip,
            _options$id = options.id,
            fnGetId = _options$id === undefined ? function (props) {
            return _.get(props, 'match.params.id');
        } : _options$id;


        if (skip) return WrappedComponent;

        return (0, _reactRedux.connect)(function (state, ownProps) {
            if (fetchAll) {
                // this is a fetchAll action

                if (!feedKey) throw new Error('You must provide a feedKey if you\'re providing fetchAll.');

                var feed = (0, _utils.getFeed)(state, feedKey, entityKey);
                var _entity = feed && feed.items;

                return {
                    __ensureEntity__entity__: _entity,
                    __ensureEntity__type__: 'fetchAll'
                };
            }

            // this is a fetch on action
            var id = fnGetId(ownProps);

            if (!id) {
                return {
                    __ensureEntity__type__: 'skip'
                };
            }
            // if ( !id ) throw new Error(`Couldn't find an entity id. Make sure your @ensureEntity config is correct.`)

            id = Array.isArray(id) ? id : [id];

            var entity = id.map(function (n) {
                return (0, _utils.getEntity)(state, entityKey, n);
            });
            var status = id.map(function (n) {
                return (0, _utils.getEntityStatus)(state, entityKey, n);
            });

            // console.log(`[ensureEntity/connect/${entityKey}] `, entityKey, entity, status, ownProps.match)

            return {
                __ensureEntity__entity__: entity,
                __ensureEntity__type__: 'fetchEntity',
                __ensureEntity__id__: id,
                __ensureEntity__status__: status
            };
        })(function (_React$Component) {
            _inherits(EnsureEntity, _React$Component);

            function EnsureEntity() {
                _classCallCheck(this, EnsureEntity);

                return _possibleConstructorReturn(this, (EnsureEntity.__proto__ || Object.getPrototypeOf(EnsureEntity)).apply(this, arguments));
            }

            _createClass(EnsureEntity, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _props = this.props,
                        __ensureEntity__id__ = _props.__ensureEntity__id__,
                        __ensureEntity__status__ = _props.__ensureEntity__status__,
                        __ensureEntity__type__ = _props.__ensureEntity__type__,
                        dispatch = _props.dispatch;


                    if (__ensureEntity__type__ === 'fetchAll') {
                        dispatch(fetchAll());
                    } else if (__ensureEntity__type__ === 'fetchEntity') {
                        this.handleChangeId(__ensureEntity__id__, __ensureEntity__status__);
                    }
                }
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var __ensureEntity__type__ = nextProps.__ensureEntity__type__,
                        __ensureEntity__id__ = nextProps.__ensureEntity__id__,
                        __ensureEntity__status__ = nextProps.__ensureEntity__status__;


                    if (__ensureEntity__type__ === 'fetchEntity' && (0, _utils.hasPropChanged)('__ensureEntity__id__', this.props, nextProps)) {
                        this.handleChangeId(__ensureEntity__id__, __ensureEntity__status__);
                    }
                }
            }, {
                key: 'handleChangeId',
                value: function handleChangeId(nextId, nextStatus) {
                    var dispatch = this.props.dispatch;


                    nextStatus.forEach(function (status, index) {
                        if (status === _utils.ENTITY_STATUS_UNATTEMPTED) {
                            dispatch(fetchEntity(nextId[index]));
                        }
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    var _props2 = this.props,
                        __ensureEntity__entity__ = _props2.__ensureEntity__entity__,
                        __ensureEntity__type__ = _props2.__ensureEntity__type__,
                        __ensureEntity__status__ = _props2.__ensureEntity__status__,
                        rest = _objectWithoutProperties(_props2, ['__ensureEntity__entity__', '__ensureEntity__type__', '__ensureEntity__status__']);

                    return _react2.default.createElement(WrappedComponent, _extends({}, rest, _defineProperty({}, entityKey, __ensureEntity__entity__)));
                }
            }]);

            return EnsureEntity;
        }(_react2.default.Component));
    };
};

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _reactRouterRedux = __webpack_require__(17);

var _reactIdleTimer = __webpack_require__(287);

var _reactIdleTimer2 = _interopRequireDefault(_reactIdleTimer);

var _actions = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// libs

// import Idle from 'away'

// src


exports.default = function (options) {
	return function (WrappedComponent) {
		var _dec, _class;

		return _dec = (0, _reactRedux.connect)(), _dec(_class = function (_React$Component) {
			_inherits(LogoutWhenIdle, _React$Component);

			function LogoutWhenIdle(props) {
				_classCallCheck(this, LogoutWhenIdle);

				var _this = _possibleConstructorReturn(this, (LogoutWhenIdle.__proto__ || Object.getPrototypeOf(LogoutWhenIdle)).call(this, props));

				_this.isIdleOrNot = function () {
					var _this$state = _this.state,
					    remaining = _this$state.remaining,
					    timeout = _this$state.timeout,
					    isIdle = _this$state.isIdle;


					if (remaining < timeout) {
						_this.setState({ isIdle: true });
					} else if (remaining >= timeout) {
						_this.setState({ isIdle: false });
					}
				};

				_this.componentDidMount = function () {
					if (_this.refs.idleTimer) {
						_this.setState({
							remaining: _this.refs.idleTimer.getRemainingTime(),
							lastActive: _this.refs.idleTimer.getLastActiveTime(),
							elapsed: _this.refs.idleTimer.getElapsedTime()
						});

						setInterval(_this.updateState, 1000);
					}
				};

				_this.componentWillUnmount = function () {
					_this._pause();
					_this._reset();
				};

				_this.updateState = function () {
					if (_this.refs.idleTimer) {
						_this.setState({
							remaining: _this.refs.idleTimer.getRemainingTime(),
							lastActive: _this.refs.idleTimer.getLastActiveTime(),
							elapsed: _this.refs.idleTimer.getElapsedTime()
						});
					}
				};

				_this.render = function () {
					return _react2.default.createElement(
						_reactIdleTimer2.default,
						{
							ref: 'idleTimer',
							activeAction: _this._onActive,
							idleAction: _this._onIdle,
							timeout: _this.state.timeout,
							startOnLoad: true,
							format: 'MM-DD-YYYY HH:MM:ss' },
						_react2.default.createElement(WrappedComponent, _extends({}, _this.props, _this.state))
					);
				};

				_this._onActive = function () {
					_this.setState({ isIdle: false });
					console.log('---> User is active.');
				};

				_this._onIdle = function () {
					console.log('---> User is inactive/idle.');
					var dispatch = _this.props.dispatch;

					dispatch((0, _actions.logout)()).then(function () {
						return dispatch((0, _reactRouterRedux.push)('/login'));
					});
				};

				_this._changeTimeout = function () {
					_this.setState({
						timeout: _this.refs.timeoutInput.state.value()
					});
				};

				_this._reset = function () {
					_this.refs.idleTimer.reset();
				};

				_this._pause = function () {
					_this.refs.idleTimer.pause();
				};

				_this._resume = function () {
					_this.refs.idleTimer.resume();
				};

				_this.state = {
					timeout: 10 * 60 * 1000,
					remaining: null,
					isIdle: false,
					lastActive: null,
					elapsed: null
				};
				return _this;
			}

			return LogoutWhenIdle;
		}(_react2.default.Component)) || _class;
	};
};

module.exports = exports['default'];

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.renderStyledDatePicker = exports.renderDatePicker = exports.renderSelectField = exports.renderRadioGroup = exports.renderCheckbox = exports.renderAutocomplete = exports.renderTextArea = exports.renderTextField = exports.renderTextFieldWithFixedLabel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _materialUi = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // libs


// src

var renderTextFieldWithFixedLabel = function renderTextFieldWithFixedLabel(_ref) {
		var input = _ref.input,
		    label = _ref.label,
		    innerRef = _ref.innerRef,
		    _ref$meta = _ref.meta,
		    touched = _ref$meta.touched,
		    error = _ref$meta.error,
		    custom = _objectWithoutProperties(_ref, ['input', 'label', 'innerRef', 'meta']);

		return _react2.default.createElement(_materialUi.TextField, _extends({
				floatingLabelText: label,
				floatingLabelFixed: true,
				fullWidth: true,
				errorText: touched && error,
				ref: innerRef,
				hintStyle: { fontSize: 12 }
		}, input, custom));
};

exports.renderTextFieldWithFixedLabel = renderTextFieldWithFixedLabel;
var renderTextField = function renderTextField(_ref2) {
		var input = _ref2.input,
		    label = _ref2.label,
		    autoComplete = _ref2.autoComplete,
		    innerRef = _ref2.innerRef,
		    _ref2$meta = _ref2.meta,
		    touched = _ref2$meta.touched,
		    error = _ref2$meta.error,
		    submitting = _ref2$meta.submitting,
		    custom = _objectWithoutProperties(_ref2, ['input', 'label', 'autoComplete', 'innerRef', 'meta']);

		return _react2.default.createElement(_materialUi.TextField, _extends({
				floatingLabelText: label,
				floatingLabelStyle: { fontWeight: 400 },
				fullWidth: true,
				disabled: submitting,
				errorText: touched && error,
				ref: innerRef,
				autoComplete: autoComplete,
				hintStyle: { fontSize: 14 }
		}, input, custom));
};

exports.renderTextField = renderTextField;
var renderTextArea = function renderTextArea(_ref3) {
		var input = _ref3.input,
		    label = _ref3.label,
		    rows = _ref3.rows,
		    rowsMax = _ref3.rowsMax,
		    autoComplete = _ref3.autoComplete,
		    innerRef = _ref3.innerRef,
		    _ref3$meta = _ref3.meta,
		    touched = _ref3$meta.touched,
		    error = _ref3$meta.error,
		    submitting = _ref3$meta.submitting,
		    custom = _objectWithoutProperties(_ref3, ['input', 'label', 'rows', 'rowsMax', 'autoComplete', 'innerRef', 'meta']);

		return _react2.default.createElement(_materialUi.TextField, _extends({
				floatingLabelText: label,
				floatingLabelStyle: { fontWeight: 400 },
				fullWidth: true,
				disabled: submitting,
				multiLine: true,
				rows: rows,
				rowsMax: rowsMax,
				errorText: touched && error,
				ref: innerRef,
				autoComplete: autoComplete,
				hintStyle: { fontSize: 12 }
		}, input, custom));
};

exports.renderTextArea = renderTextArea;
var renderAutocomplete = function renderAutocomplete(_ref4) {
		var input = _ref4.input,
		    label = _ref4.label,
		    dataSource = _ref4.dataSource,
		    innerRef = _ref4.innerRef,
		    _ref4$meta = _ref4.meta,
		    touched = _ref4$meta.touched,
		    error = _ref4$meta.error,
		    custom = _objectWithoutProperties(_ref4, ['input', 'label', 'dataSource', 'innerRef', 'meta']);

		return _react2.default.createElement(_materialUi.AutoComplete, _extends({
				underlineShow: false,
				inputStyle: { border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 },
				fullWidth: true,
				hintText: label,
				errorText: touched && error,
				dataSource: dataSource,
				hintStyle: { fontSize: 16, paddingLeft: 15 },
				ref: innerRef,
				filter: _materialUi.AutoComplete.caseInsensitiveFilter
		}, input, custom));
};

exports.renderAutocomplete = renderAutocomplete;
var renderCheckbox = exports.renderCheckbox = function renderCheckbox(_ref5) {
		var input = _ref5.input,
		    label = _ref5.label,
		    padding = _ref5.padding;
		return _react2.default.createElement(_materialUi.Checkbox, { label: label,
				checked: input.value ? true : false,
				onCheck: input.onChange,
				style: { paddingTop: padding[0], paddingRight: padding[1], paddingBottom: padding[2], paddingLeft: padding[3] }
		});
};

var renderRadioGroup = function renderRadioGroup(_ref6) {
		var input = _ref6.input,
		    label = _ref6.label,
		    rest = _objectWithoutProperties(_ref6, ['input', 'label']);

		return _react2.default.createElement(
				'div',
				{ style: { margin: '10px 0' } },
				_react2.default.createElement(
						'label',
						{ style: { fontSize: 12, color: 'rgba(0, 0, 0, 0.298039)' } },
						label
				),
				_react2.default.createElement(_materialUi.RadioButtonGroup, _extends({}, input, rest, {
						valueSelected: input.value,
						onChange: function onChange(event, value) {
								return input.onChange(value);
						} }))
		);
};

exports.renderRadioGroup = renderRadioGroup;
var renderSelectField = exports.renderSelectField = function renderSelectField(_ref7) {
		var input = _ref7.input,
		    label = _ref7.label,
		    _ref7$meta = _ref7.meta,
		    touched = _ref7$meta.touched,
		    error = _ref7$meta.error,
		    submitting = _ref7$meta.submitting,
		    children = _ref7.children;
		return _react2.default.createElement(_materialUi.SelectField, _extends({
				disabled: submitting,
				selectedMenuItemStyle: { color: '#00ACC1' },
				floatingLabelText: label,
				floatingLabelStyle: { fontWeight: 400 },
				hintStyle: { fontSize: 14 },
				floatingLabelFixed: false,
				fullWidth: true,
				errorText: touched && error
		}, input, {
				onChange: function onChange(event, index, value) {
						return input.onChange(value);
				},
				children: children }));
};

var renderDatePicker = exports.renderDatePicker = function renderDatePicker(_ref8) {
		var input = _ref8.input,
		    label = _ref8.label,
		    maxDate = _ref8.maxDate,
		    minDate = _ref8.minDate,
		    _ref8$meta = _ref8.meta,
		    touched = _ref8$meta.touched,
		    error = _ref8$meta.error,
		    submitting = _ref8$meta.submitting;
		return _react2.default.createElement(_materialUi.DatePicker, _extends({
				autoOk: true,
				disabled: submitting,
				fullWidth: true,
				minDate: minDate,
				maxDate: maxDate,
				floatingLabelText: label,
				floatingLabelStyle: { fontWeight: 400 },
				errorText: touched && error
		}, input, {
				value: input.value !== '' ? new Date(input.value) : null,
				onChange: function onChange(event, value) {
						input.onChange(value);
				} }));
};

var renderStyledDatePicker = exports.renderStyledDatePicker = function renderStyledDatePicker(_ref9) {
		var input = _ref9.input,
		    label = _ref9.label,
		    _ref9$meta = _ref9.meta,
		    touched = _ref9$meta.touched,
		    error = _ref9$meta.error;
		return _react2.default.createElement(_materialUi.DatePicker, _extends({
				autoOk: true,
				fullWidth: true,
				underlineShow: false,
				style: { border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 },
				textFieldStyle: { maxHeight: 46 },
				hintText: label,
				errorText: touched && error
		}, input, {
				value: input.value !== '' ? new Date(input.value) : null,
				onChange: function onChange(event, value) {
						input.onChange(value);
				} }));
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'development',
    mysql: {
        username: 'root',
        password: 'root',
        multiStatement: false,
        dbName: 'cryptax',
        host: 'localhost',
        enableLogging: false
    },
    influx: {
        // TODO remove url property, use host instead
        url: 'http://54.245.163.213:8086/sensu',
        // this is staging server URL
        host: 'http://54.245.163.213:8086/sensu'
    },
    grafana: {
        host: '54.245.163.213:4000'
    },
    app: {
        // host: 'ec2-52-53-128-32.us-west-1.compute.amazonaws.com',
        host: 'localhost',
        serveDummyStatusData: true
    }
};
module.exports = exports['default'];

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'production',
    mysql: {
        username: 'root',
        password: 'root',
        multiStatement: false,
        dbName: 'cryptax',
        host: 'localhost',
        enableLogging: false
    },
    influx: {
        // TODO remove url property, use host instead
        url: 'http://localhost:8086/sensu',
        host: 'http://localhost:8086/sensu'
    },
    grafana: {
        host: '172.16.2.103:4000'
    },
    app: {
        // host: 'ec2-52-53-128-32.us-west-1.compute.amazonaws.com',
        host: 'localhost',
        serveDummyStatusData: true
    }
};
module.exports = exports['default'];

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'staging',
    mysql: {
        username: 'root',
        password: 'root',
        multiStatement: false,
        dbName: 'cryptax',
        host: 'localhost',
        enableLogging: false
    },
    influx: {
        // TODO remove url
        url: 'http://localhost:8086/sensu',
        host: 'http://localhost:8086/sensu'
    },
    grafana: {
        host: '54.245.163.213:4000'
    },
    app: {
        // host: 'ec2-52-53-128-32.us-west-1.compute.amazonaws.com',
        host: 'localhost',
        serveDummyStatusData: true
    }
};
module.exports = exports['default'];

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "accessKeyId": "AKIAJQR3NUMNWHWHK4YA",
    "secretAccessKey": "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",
    "region": "us-east-1"
};
module.exports = exports["default"];

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styles = __webpack_require__(273);

var _colorManipulator = __webpack_require__(278);

// import {Colors, ColorManipulator, Spacing, zIndex} from 'material-ui'

// import Colors from 'material-ui/styles/colors'
// import Spacing from 'material-ui/lib/styles/spacing'
// import zIndex from 'material-ui/lib/styles/zIndex'
// import ColorManipulator from 'material-ui/lib/utils/color-manipulator'

exports.default = {
  spacing: _styles.spacing,
  zIndex: _styles.zIndex,
  textTransform: 'none',
  palette: {
    // Changed colors @muhammadkasim
    primary1Color: _styles.colors.cyan500,
    primary2Color: _styles.colors.cyan600,
    primary3Color: _styles.colors.lightBlack,
    accent1Color: 'rgb(0, 123, 255)',
    accent2Color: _styles.colors.grey100,
    accent3Color: _styles.colors.grey500,
    textColor: _styles.colors.darkBlack,
    alternateTextColor: _styles.colors.white,
    canvasColor: _styles.colors.white,
    borderColor: _styles.colors.grey300,
    disabledColor: (0, _colorManipulator.fade)(_styles.colors.darkBlack, 0.3),
    pickerHeaderColor: _styles.colors.cyan600
  }
};
module.exports = exports['default'];

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _winston = __webpack_require__(297);

var _winston2 = _interopRequireDefault(_winston);

var _winstonDailyRotateFile = __webpack_require__(298);

var _winstonDailyRotateFile2 = _interopRequireDefault(_winstonDailyRotateFile);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_winston2.default.remove(_winston2.default.transports.Console);
_winston2.default.add(_winstonDailyRotateFile2.default, {
  level: 'info',
  prepend: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  timestamp: function timestamp() {
    return (0, _moment2.default)().format();
  },
  "colorize": true,
  "filename": _path2.default.resolve("./server/logs/sauron.log"),
  "maxsize": 10485760,
  "maxfiles": 30
});

console.log = _winston2.default.info;
console.info = _winston2.default.info;
console.warn = _winston2.default.warn;
console.error = _winston2.default.error;
console.debug = _winston2.default.debug;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(23);

var _express2 = _interopRequireDefault(_express);

var _cookieParser = __webpack_require__(86);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(84);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = __webpack_require__(52);

var _passport2 = _interopRequireDefault(_passport);

var _helmet = __webpack_require__(88);

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = __webpack_require__(85);

var _compression2 = _interopRequireDefault(_compression);

var _http = __webpack_require__(89);

var _ejs = __webpack_require__(51);

var _cors = __webpack_require__(87);

var _cors2 = _interopRequireDefault(_cors);

var _devUtils = __webpack_require__(81);

var _devUtils2 = _interopRequireDefault(_devUtils);

var _logUtils = __webpack_require__(82);

var _logUtils2 = _interopRequireDefault(_logUtils);

var _utils = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = (0, _utils.getPort)();

// src
// libs

var app = (0, _express2.default)();
var httpServer = (0, _http.Server)(app);
(0, _utils.setupSessionStore)(app);

// gzip filter
app.use((0, _compression2.default)());
app.disable('etag');

// parse application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse application/json
app.use(_bodyParser2.default.json());
app.engine('ejs', _ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', _path2.default.resolve('./server/templates/web'));
app.use(_express2.default.static(_path2.default.resolve('./client/dist')));
app.use(_express2.default.static(_path2.default.resolve('./server/public')));
// app.use('/images', express.static(__dirname + "/images"))
// If you declare your session and passport configs above static directory configs then all requests 
// for static content will also get a session, which is not good.
app.use((0, _cookieParser2.default)());
// security package
app.use((0, _helmet2.default)());
// see setting details here: https://github.com/expressjs/session
// app.use(expressSession(, store: new MySQLStore(options)}))
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
(0, _utils.setupPassport)();

app.use((0, _cors2.default)());

if ((0, _utils.isProduction)()) {
  // handle logging
  _logUtils2.default.setupWinstonProductionLogs();
  app.use(_logUtils2.default.setupUrlLogs);
} else {
  _devUtils2.default.setupWebpack(app);
}

if (process.env.UNIVERSAL_RENDERING === 'false') {
  _devUtils2.default.setupHMR();
}

// Include server routes as a middleware
['api/userApiController', 'api/accountApiController', 'api/transactionApiController', 'defaultController'].forEach(function (name) {
  return app.use(__webpack_require__(83)("./" + name));
});

app.use((0, _utils.build404ErrorHandler)());
app.use((0, _utils.build500ErrorHandler)());

httpServer.listen(port, function (err) {
  if (err) {
    console.error('Server startup failed: ', err);
  }

  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userManager = __webpack_require__(68);

Object.keys(_userManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userManager[key];
    }
  });
});

var _providerManager = __webpack_require__(64);

Object.keys(_providerManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _providerManager[key];
    }
  });
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRoleById = undefined;

var _Role = __webpack_require__(42);

var _Role2 = _interopRequireDefault(_Role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findRoleById = exports.findRoleById = function findRoleById(id) {
  return _Role2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
}; // libs

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findTimeZoneById = undefined;

var _TimeZone = __webpack_require__(43);

var _TimeZone2 = _interopRequireDefault(_TimeZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findTimeZoneById = exports.findTimeZoneById = function findTimeZoneById(id) {
  return _TimeZone2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
}; // libs

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserAccountTypeById = undefined;

var _UserAccountType = __webpack_require__(46);

var _UserAccountType2 = _interopRequireDefault(_UserAccountType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findUserAccountTypeById = exports.findUserAccountTypeById = function findUserAccountTypeById(id) {
  return _UserAccountType2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
}; // libs

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserAddressById = exports.updateUserAddress = exports.insertUserAddress = exports.findUserAddressById = exports.findUserAddressByAddress = exports.findAllUserAddresses = undefined;

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _UserAddress = __webpack_require__(33);

var _UserAddress2 = _interopRequireDefault(_UserAddress);

var _Transaction = __webpack_require__(25);

var _Transaction2 = _interopRequireDefault(_Transaction);

var _AssociatedAddress = __webpack_require__(18);

var _AssociatedAddress2 = _interopRequireDefault(_AssociatedAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var findAllUserAddresses = exports.findAllUserAddresses = function findAllUserAddresses(id) {
  return _UserAddress2.default.findAll(Object.assign({
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _Transaction2.default,
      as: 'AddressTransactions',
      include: {
        model: _AssociatedAddress2.default
      }
    }]
  })).then(function (obj) {
    return obj;
  });
};

var findUserAddressByAddress = exports.findUserAddressByAddress = function findUserAddressByAddress(id, address) {
  return _UserAddress2.default.findOne(Object.assign({
    where: {
      address: address
    },
    include: [{
      model: _User2.default,
      where: { id: id }
    }]
  })).then(function (obj) {
    return obj;
  });
};

var findUserAddressById = exports.findUserAddressById = function findUserAddressById(id) {
  return _UserAddress2.default.findOne(Object.assign({
    where: {
      id: id
    }
  })).then(function (obj) {
    return obj;
  });
};

var insertUserAddress = exports.insertUserAddress = function insertUserAddress(userAddressObj) {
  return userAddressObj.save().then(function (obj) {
    return obj;
  });
};

var updateUserAddress = exports.updateUserAddress = function updateUserAddress(userAddressObj) {
  return userAddressObj.save().then(function (obj) {
    return obj;
  });
};

var deleteUserAddressById = exports.deleteUserAddressById = function deleteUserAddressById(userAddressId) {
  return _UserAddress2.default.findById(userAddressId).then(function (object) {
    if (null == object) return;

    return object.destroy({ force: true });
  });
};

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProvider = exports.insertUserProvider = exports.findUserProviderByAccountName = exports.findUserProviderByID = exports.findAllUserProviderList = undefined;

var _UserProvider = __webpack_require__(47);

var _UserProvider2 = _interopRequireDefault(_UserProvider);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

var _Provider = __webpack_require__(41);

var _Provider2 = _interopRequireDefault(_Provider);

var _UserWallet = __webpack_require__(26);

var _UserWallet2 = _interopRequireDefault(_UserWallet);

var _Transaction = __webpack_require__(25);

var _Transaction2 = _interopRequireDefault(_Transaction);

var _AssociatedAddress = __webpack_require__(18);

var _AssociatedAddress2 = _interopRequireDefault(_AssociatedAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var findAllUserProviderList = exports.findAllUserProviderList = function findAllUserProviderList(id) {
  return _UserProvider2.default.findAll(Object.assign({
    include: [{
      model: _User2.default,
      where: { id: id }
    }, {
      model: _Provider2.default
    }, {
      model: _UserWallet2.default,
      as: 'UserWallets',
      include: [{
        model: _Transaction2.default,
        as: 'Transactions',
        include: {
          model: _AssociatedAddress2.default
        }
      }]
    }]
  })).then(function (obj) {
    return obj;
  });
};

var findUserProviderByID = exports.findUserProviderByID = function findUserProviderByID(id) {
  return _UserProvider2.default.findOne(Object.assign({
    where: {
      id: id
    },
    include: {
      model: _Provider2.default
    }
  })).then(function (obj) {
    return obj;
  });
};

var findUserProviderByAccountName = exports.findUserProviderByAccountName = function findUserProviderByAccountName(accountName) {
  return _UserProvider2.default.findOne(Object.assign({
    where: {
      accountName: accountName
    }
  })).then(function (obj) {
    return obj;
  });
};

var insertUserProvider = exports.insertUserProvider = function insertUserProvider(userProviderObj) {
  return userProviderObj.save().then(function (obj) {
    return obj;
  });
};

var updateUserProvider = exports.updateUserProvider = function updateUserProvider(userProviderObj) {
  return userProviderObj.save().then(function (obj) {
    return obj;
  });
};

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUserWalletById = exports.insertUserWallet = exports.updateUserWallet = exports.findUserWalletByWalletId = undefined;

var _UserWallet = __webpack_require__(26);

var _UserWallet2 = _interopRequireDefault(_UserWallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findUserWalletByWalletId = exports.findUserWalletByWalletId = function findUserWalletByWalletId(walletId) {
  return _UserWallet2.default.findOne(Object.assign({
    where: {
      walletId: walletId
    }
  })).then(function (obj) {
    return obj;
  });
};

var updateUserWallet = exports.updateUserWallet = function updateUserWallet(userWalletObj) {
  return userWalletObj.save().then(function (obj) {
    return obj;
  });
};

var insertUserWallet = exports.insertUserWallet = function insertUserWallet(userWalletObj) {
  return userWalletObj.save().then(function (obj) {
    return obj;
  });
};

var deleteUserWalletById = exports.deleteUserWalletById = function deleteUserWalletById(walletId) {
  return _UserWallet2.default.findById(walletId).then(function (object) {
    if (null == object) return;

    return object.destroy({ force: true });
  });
};

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressInfo = undefined;

var _request = __webpack_require__(50);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addressInfo = exports.addressInfo = function addressInfo(coinAddress) {
  return new Promise(function (resolve, reject) {
    isValidBTCAddress(coinAddress).then(function (result) {
      if (result.isValid) {
        var myaddress = { isValid: true, addressType: 'BTC', balance: result.balance };
        resolve(myaddress);
      } else isValidLTCAddress(coinAddress).then(function (resultLTC) {
        if (resultLTC.isValid) {
          var _myaddress = { isValid: true, addressType: 'LTC', balance: resultLTC.balance };
          resolve(_myaddress);
        } else isValidDOGEAddress(coinAddress).then(function (resultDOGE) {
          if (resultDOGE.isValid) {
            var _myaddress2 = { isValid: true, addressType: 'DOGE', balance: resultDOGE.balance };
            resolve(_myaddress2);
          } else {
            isValidETHAddress(coinAddress).then(function (resultLTH) {
              if (resultLTH.isValid) {
                var _myaddress3 = { isValid: true, addressType: 'ETH', balance: resultLTH.balance };
                resolve(_myaddress3);
              } else {
                var _myaddress4 = { isValid: false, addressType: '' };
                resolve(_myaddress4);
              }
            });
          }
        });
      });
    });
  });
};

var isValidBTCAddress = function isValidBTCAddress(add) {
  return new Promise(function (resolve, reject) {
    var btcURL = 'https://api.blockcypher.com/v1/btc/main/addrs/' + add;
    (0, _request2.default)(btcURL, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        var resultObj = { isValid: true, balance: bodyObj.final_balance };
        resolve(resultObj);
      } else {
        var _resultObj = { isValid: false, balance: '' };
        resolve(_resultObj);
      }
    });
  });
};

var isValidLTCAddress = function isValidLTCAddress(add) {
  return new Promise(function (resolve, reject) {
    var ltcURL = 'https://api.blockcypher.com/v1/ltc/main/addrs/' + add;
    (0, _request2.default)(ltcURL, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        var resultObj = { isValid: true, balance: bodyObj.final_balance };
        resolve(resultObj);
      } else {
        var _resultObj2 = { isValid: false, balance: '' };
        resolve(_resultObj2);
      }
    });
  });
};

var isValidDOGEAddress = function isValidDOGEAddress(add) {
  return new Promise(function (resolve, reject) {
    var dogeURL = 'https://api.blockcypher.com/v1/doge/main/addrs/' + add;
    (0, _request2.default)(dogeURL, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        var resultObj = { isValid: true, balance: bodyObj.final_balance };
        resolve(resultObj);
      } else {
        var _resultObj3 = { isValid: false, balance: '' };
        resolve(_resultObj3);
      }
    });
  });
};

var isValidETHAddress = function isValidETHAddress(add) {
  return new Promise(function (resolve, reject) {
    var ethURL = 'https://etherchain.org/api/account/' + add;
    (0, _request2.default)(ethURL, function (error, response, body) {
      if (!error && response.statusCode === 200 && body) {
        var bodyObj = JSON.parse(body);
        if (bodyObj && bodyObj.data && bodyObj.data[0]) {
          var resultObj = { isValid: true, balance: bodyObj.data[0].balance };
          resolve(resultObj);
        } else {
          var _resultObj4 = { isValid: false, balance: '' };
          resolve(_resultObj4);
        }
      } else {
        var _resultObj5 = { isValid: false, balance: '' };
        resolve(_resultObj5);
      }
    });
  });
};

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rejectRequest = exports.ensureAuthorization = exports.authorizePath = exports.ensureAnonymity = exports.setupPassport = undefined;

var _passport = __webpack_require__(52);

var _passport2 = _interopRequireDefault(_passport);

var _managers = __webpack_require__(191);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var setupPassport = exports.setupPassport = function setupPassport() {
  _passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
  });

  _passport2.default.deserializeUser(function (id, done) {
    (0, _managers.findUserByID)(id).then(function (user) {
      done(null, user);
    });
  });
};

// use where you want to make sure that
// a user is not and should not be already logged-in


// src
var ensureAnonymity = exports.ensureAnonymity = function ensureAnonymity(req, res, next) {
  var user = req.user;


  if (user) {
    res.status(401).send({ message: 'This url cannot be called since a user is already logged in: ' + user.email });
    return;
  }

  next();
};

var handleAuthError = function handleAuthError(req, res) {
  var url = req.url,
      user = req.user,
      path = req.path;


  if (url.indexOf('/api') > -1) {
    res.status(401).send({
      message: 'Access denied'
    });
  } else {
    if (!user) {
      res.redirect('/login?redirectUrl=' + path);
    } else {
      res.render('error', { message: 'Access Denied, you are not authorized to view this page.' });
    }
  }
};

var authorizePath = exports.authorizePath = function authorizePath(req, res, next) {
  var user = req.user;


  if (!user) {
    handleAuthError(req, res);
  }

  next();
};

var ensureAuthorization = exports.ensureAuthorization = authorizePath;

var rejectRequest = exports.rejectRequest = function rejectRequest(message, res) {
  return res.status(400).send({
    message: message
  });
};

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = __webpack_require__(35);

var _get2 = _interopRequireDefault(_get);

var _errorUtils = __webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A utility function that binds API routes with a given router
 */


// libs
exports.default = function (router, path, functions) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var findAll = functions.findAll,
        findByID = functions.findByID,
        create = functions.create,
        deleteByID = functions.deleteByID,
        updateByID = functions.updateByID;
    var _options$toJSON = options.toJSON,
        toJSON = _options$toJSON === undefined ? function (item) {
        return item.get({ raw: true });
    } : _options$toJSON,
        _options$parse = options.parse,
        parse = _options$parse === undefined ? function (item) {
        return item;
    } : _options$parse;


    findAll && router.get(path, function (req, res) {
        findAll().then(function (items) {
            return items.map(toJSON);
        }).then(function (items) {
            res.send(items);
        }).catch(function (error) {
            return (0, _errorUtils.caughtError)(res, error);
        });
    });

    findByID && router.get(path + '/:id', function (req, res) {
        var id = (0, _get2.default)(req, 'params.id');

        findByID(id).then(function (item) {
            return toJSON(item);
        }).then(function (item) {
            res.send(item);
        }).catch(function (error) {
            return (0, _errorUtils.caughtError)(res, error);
        });
    });

    create && router.post(path, function (req, res) {
        create(parse(req.body)).then(function (item) {
            return toJSON(item);
        }).then(function (entity) {
            res.send(entity);
        }).catch(function (error) {
            return (0, _errorUtils.caughtError)(res, error);
        });
    });

    deleteByID && router.delete(path + '/:id', function (req, res) {
        var id = (0, _get2.default)(req, 'params.id');

        deleteByID(id).then(function (item) {
            res.send(item);
        }).catch(function (error) {
            return (0, _errorUtils.caughtError)(res, error);
        });
    });

    updateByID && router.put(path + '/:id', function (req, res) {
        var id = req.params.id,
            attributes = req.body;


        updateByID(id, parse(attributes)).then(function (item) {
            return toJSON(item);
        }).then(function (item) {
            res.send(item);
        }).catch(function (error) {
            return (0, _errorUtils.caughtError)(res, error);
        });
    });
};

// src


module.exports = exports['default'];

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errorUtils = __webpack_require__(34);

/**
 * A factory function that generates basic entity management
 * functions for a give entity
 */
exports.default = function (entity) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$queryOptions = options.queryOptions,
        queryOptions = _options$queryOptions === undefined ? {} : _options$queryOptions;

    var findByID = function findByID(id) {
        return entity.findOne(Object.assign({
            where: {
                id: id
            }
        }, queryOptions)).then(function (item) {
            if (!item) {
                throw new _errorUtils.NotFoundError('Couldn\'t find an object with id ' + id);
            }

            return item;
        });
    };

    var deleteByID = function deleteByID(id) {
        return findByID(id).then(function (item) {
            return item.destroy();
        });
    };

    var findAll = function findAll() {
        return entity.findAll(queryOptions);
    };

    var create = function create(attributes) {
        return entity.create(attributes);
    };

    var updateByID = function updateByID(id, attributes) {
        return findByID(id).then(function (item) {
            return item.update(attributes);
        });
    };

    return { findByID: findByID, findAll: findAll, create: create, updateByID: updateByID, deleteByID: deleteByID };
}; // src


module.exports = exports['default'];

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCoinBaseRedirectURL = exports.getCoinBaseRedirectURL = function getCoinBaseRedirectURL(providerObj, req) {
  var callBackUrl = req.protocol + '://' + req.get('host') + providerObj.redirectUrl1;
  var encodedCallBackUrl = encodeURIComponent(callBackUrl);
  //console.log('encodedCallBackUrl : ' + encodedCallBackUrl)
  var redirectUrl = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id=' + providerObj.clientId + '&redirect_uri=' + encodedCallBackUrl + '&account=all&scope=wallet:user:read,wallet:accounts:read,wallet:addresses:read,wallet:transactions:read';
  return redirectUrl;
};

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = __webpack_require__(253);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _underscore = __webpack_require__(79);

var _fs = __webpack_require__(262);

var _fs2 = _interopRequireDefault(_fs);

var _q = __webpack_require__(281);

var _q2 = _interopRequireDefault(_q);

var _path = __webpack_require__(19);

var _path2 = _interopRequireDefault(_path);

var _awsConfig = __webpack_require__(187);

var _awsConfig2 = _interopRequireDefault(_awsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update(_awsConfig2.default);
var ses = new _awsSdk2.default.SES({ apiVersion: '2010-12-01' });
var FROM_EMAIL = 'majid.hussain@emumba.com';

var sendResendPasswordEmail = function sendResendPasswordEmail(to, data) {
  return sendEmail('reset-password.html', to, 'Wisdom - Reset Password', data);
};

var sendAccountActivationEmail = function sendAccountActivationEmail(to, data) {
  return sendEmail("confirm-your-account.html", to, 'Verify your email account', data);
};

var resendAccountActivationEmail = function resendAccountActivationEmail(to, data) {
  return sendEmail("confirm-your-account.html", to, 'Verify your email account', data);
};

var sendEmail = function sendEmail(templateName, to, subject, data) {

  // console.log('sending email to: ' + to + ' AND data is : ' + data)
  var promise = _q2.default.defer();

  // read template file from disk

  _fs2.default.readFile(_path2.default.resolve('./server/templates/email/' + templateName), 'utf-8', function (err, content) {

    if (err) {
      console.log('Error while reading temaplte: ' + err);
      return promise.reject(err);
    }
    // feed the content to _.template
    var template = _underscore._.template(content);
    var result = template(data);
    // console.log('result : ' + result)
    var receivers = typeof to === 'string' ? [to] : to;

    // if(appUtils.isTest())
    //  return promise.resolve()

    ses.sendEmail({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: receivers },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: result
          }
        }
      }
    }, function (err, data) {
      if (err) return promise.reject(err);

      return promise.resolve();
    });
  });

  return promise.promise;
};

var sendSimpleEmail = function sendSimpleEmail(to, subject, data) {
  // console.log('awsConfig accessKeyId : ' + awsConfig.accessKeyId)

  // console.log('sending email to: ' + to + ' AND data is : ' + data)
  var promise = _q2.default.defer();

  var receivers = typeof to === 'string' ? [to] : to;

  ses.sendEmail({
    Source: FROM_EMAIL,
    Destination: { ToAddresses: receivers },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Text: {
          Data: data
        }
      }
    }
  }, function (err, data) {
    if (err) return promise.reject(err);

    return promise.resolve();
  });

  return promise.promise;
};

exports.default = {
  sendResendPasswordEmail: sendResendPasswordEmail,
  sendAccountActivationEmail: sendAccountActivationEmail,
  resendAccountActivationEmail: resendAccountActivationEmail
};
module.exports = exports['default'];

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = __webpack_require__(72);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALGORITHM = 'AES-256-CTR'; // CBC because CTR isn't possible with the current version of the Node.JS crypto library
var HMAC_ALGORITHM = 'SHA256';
var KEY = new Buffer(32);
KEY.write('snjflsnjflwjfpakfkdkfwjfpakfkdkf'); // []//crypto.randomBytes(32) // This key should be stored in an environment variable
var HMAC_KEY = new Buffer(32); //crypto.randomBytes(32) // This key should be stored in an environment variable
HMAC_KEY.write('snjflsnjflssssakfkdkqaswpakfkdkf');
var DELIMETER = '=';

var encryptUserIdAndEventId = function encryptUserIdAndEventId(userId, eventId) {
  return encrypt(userId + DELIMETER + eventId);
};

var decryptUserIdAndEventId = function decryptUserIdAndEventId(data) {
  try {
    var decrypedData = decrypt(data);

    if (null === decrypedData) return null;

    var parts = decrypedData.split(DELIMETER);

    return { userId: parts[0], eventId: parts[1] };
  } catch (e) {
    return null;
  }
};

var encrypt = function encrypt(plain_text) {

  var IV = new Buffer(_crypto2.default.randomBytes(16)); // ensure that the IV (initialization vector) is random
  var encryptor = _crypto2.default.createCipheriv(ALGORITHM, KEY, IV);
  encryptor.setEncoding('hex');
  encryptor.write(plain_text);
  encryptor.end();

  var cipher_text = encryptor.read();

  var hmac = _crypto2.default.createHmac(HMAC_ALGORITHM, HMAC_KEY);
  hmac.update(cipher_text);
  hmac.update(IV.toString('hex')); // ensure that both the IV and the cipher-text is protected by the HMAC

  // The IV isn't a secret so it can be stored along side everything else
  return cipher_text + "$" + IV.toString('hex') + "$" + hmac.digest('hex');
};

var decrypt = function decrypt(cipher_text) {
  var cipher_blob = cipher_text.split("$");
  var ct = cipher_blob[0];
  var IV = new Buffer(cipher_blob[1], 'hex');
  var hmac = cipher_blob[2];

  var chmac = _crypto2.default.createHmac(HMAC_ALGORITHM, HMAC_KEY);
  chmac.update(ct);
  chmac.update(IV.toString('hex'));

  if (!constant_time_compare(chmac.digest('hex'), hmac)) {
    console.log("Encrypted Blob has been tampered with...");
    return null;
  }

  var decryptor = _crypto2.default.createDecipheriv(ALGORITHM, KEY, IV);
  var decryptedText = decryptor.update(ct, 'hex', 'utf-8');
  return decryptedText + decryptor.final('utf-8');
};

var constant_time_compare = function constant_time_compare(val1, val2) {
  var sentinel = void 0;

  if (val1.length !== val2.length) return false;

  for (var i = 0; i <= val1.length - 1; i++) {
    sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
  }return sentinel === 0;
};

exports.default = {
  decryptUserIdAndEventId: decryptUserIdAndEventId,
  encryptUserIdAndEventId: encryptUserIdAndEventId,
  encrypt: encrypt,
  decrypt: decrypt
};
module.exports = exports['default'];

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.influx = exports.MEASUREMENT_NAME_STATUS_SYSTEM = exports.MEASUREMENT_NAME_STATUS_ENVIRONMENT = exports.MEASUREMENT_NAME_STATUS_NODE = undefined;

var _influx = __webpack_require__(265);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var MEASUREMENT_NAME_STATUS_NODE = exports.MEASUREMENT_NAME_STATUS_NODE = 'status_node';

// src
var MEASUREMENT_NAME_STATUS_ENVIRONMENT = exports.MEASUREMENT_NAME_STATUS_ENVIRONMENT = 'status_environment';
var MEASUREMENT_NAME_STATUS_SYSTEM = exports.MEASUREMENT_NAME_STATUS_SYSTEM = 'status_system';

var influx = exports.influx = new _influx.InfluxDB(_app2.default.influx.url);

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(254);

var path = __webpack_require__(19);
var webpack = __webpack_require__(80);
var HtmlWebpackPlugin = __webpack_require__(264);
var ExtractTextPlugin = __webpack_require__(261);
var ManifestPlugin = __webpack_require__(296);

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: ['webpack-hot-middleware/client?reload=true', path.resolve('./client/pages/app.js')
    //      path.join(__dirname, '../../client/pages/app.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../../client/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/), new webpack.ProvidePlugin({
    _: 'lodash'
  }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }), new ExtractTextPlugin("[name].css"), new ManifestPlugin()],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        "plugins": [["react-transform", {
          "transforms": [{
            "transform": "react-transform-hmr",
            "imports": ["react"],
            "locals": ["module"]
          }]
        }], "add-module-exports", "transform-decorators-legacy", "jsx-control-statements"],
        "presets": ["es2015", "react", "stage-0"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
    }, {
      test: /bootstrap\/js\//,
      loader: 'imports-loader?jQuery=jquery'
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.scss$/,
      include: /.client/,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  }
};

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".pageContainer:before {\n  width: 26rem;\n  display: block;\n  content: \"\";\n  position: fixed;\n  z-index: -1;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: #8895b3; }\n\n.layout {\n  display: flex; }\n\n.primaryColumn {\n  flex-grow: 1; }\n\n.secondaryColumn {\n  width: 26rem;\n  flex-shrink: 0; }\n", ""]);

// exports


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".my-navbar {\n  display: inherit;\n  background-color: #00ACC1;\n  padding: 0px;\n  border: 1px solid transparent;\n  border-radius: 0px; }\n  .my-navbar .navbar-brand {\n    flex-direction: inherit !important;\n    padding: 30px 15px 30px 30px !important;\n    font-weight: 700;\n    font-size: 2.5em;\n    text-transform: lowercase;\n    color: #B2EBF2;\n    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);\n    height: auto !important; }\n  .my-navbar .navbar-brand:hover, .my-navbar .navbar-brand:focus {\n    color: #B2EBF2 !important;\n    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); }\n  .my-navbar .nav-right {\n    display: none; }\n  .my-navbar .navbar-nav {\n    flex-direction: inherit !important; }\n    .my-navbar .navbar-nav li > a {\n      color: #FFF;\n      font-size: 1.1em;\n      font-weight: 400;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      padding: 30px 15px; }\n    .my-navbar .navbar-nav li > a:focus, .my-navbar .navbar-nav li > a:active {\n      color: #FFF; }\n    .my-navbar .navbar-nav li > a:hover {\n      color: #B2EBF2; }\n    .my-navbar .navbar-nav .dropdown-menu {\n      background-color: #00ACC1; }\n      .my-navbar .navbar-nav .dropdown-menu li > a {\n        padding: 10px 55px;\n        background-color: #00ACC1; }\n    .my-navbar .navbar-nav .dropdown-toggle .caret {\n      display: none; }\n    .my-navbar .navbar-nav .open > a, .my-navbar .navbar-nav .open > a:focus, .my-navbar .navbar-nav .open > a:hover, .my-navbar .navbar-nav .open > a:active {\n      color: #FFF;\n      background-color: #00ACC1; }\n  .my-navbar .navbar-toggle {\n    border: 0px;\n    padding: 37px 20px;\n    color: #B2EBF2 !important;\n    margin: 0px; }\n    .my-navbar .navbar-toggle .icon-bar {\n      background-color: #B2EBF2; }\n  .my-navbar .navbar-toggle:hover, .my-navbar .navbar-toggle:focus {\n    background-color: #00ACC1;\n    color: #B2EBF2 !important; }\n  @media (min-width: 320px) and (max-width: 767px) {\n    .my-navbar .menu-divider {\n      background-color: #0097A7;\n      margin-top: 20px;\n      margin-bottom: 20px;\n      overflow: hidden; }\n    .my-navbar .navbar-nav {\n      flex-direction: column !important; }\n      .my-navbar .navbar-nav li > a {\n        padding: 15px 15px; }\n    .my-navbar .navbar-collapse.in {\n      overflow-x: hidden; }\n    .my-navbar .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; }\n    .my-navbar .navbar-brand {\n      padding: 22px 20px !important; }\n    .my-navbar .navbar-toggle {\n      padding: 25px 20px; } }\n\n@media (max-width: 1030px) {\n  .collapse-early .container-fluid {\n    padding: 0px; }\n  .collapse-early .menu-divider {\n    background-color: #0097A7;\n    margin-top: 20px;\n    margin-bottom: 20px;\n    overflow: hidden; }\n  .collapse-early .navbar-header {\n    float: none; }\n  .collapse-early .navbar-brand {\n    padding: 34px 50px !important; }\n  .collapse-early .navbar-left, .collapse-early .navbar-right {\n    float: none !important; }\n  .collapse-early .navbar-toggle {\n    padding-left: 45px;\n    padding-right: 45px;\n    display: block; }\n  .collapse-early .navbar-toggle:focus {\n    background-color: #00ACC1; }\n  .collapse-early .navbar-collapse {\n    border-top: 1px solid transparent !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n    padding: 0px; }\n  .collapse-early .navbar-fixed-top {\n    top: 0;\n    border-width: 0 0 1px; }\n  .collapse-early .navbar-collapse.collapse {\n    display: none !important; }\n  .collapse-early .nav-right-dropdown {\n    display: none; }\n  .collapse-early .nav-right {\n    display: block; }\n  .collapse-early .navbar-nav {\n    flex-direction: column !important;\n    float: none !important; }\n    .collapse-early .navbar-nav .open > .dropdown-menu {\n      position: static;\n      float: none;\n      width: auto;\n      margin-top: 0;\n      background-color: transparent;\n      border: 0;\n      -webkit-box-shadow: none;\n      box-shadow: none; }\n    .collapse-early .navbar-nav .open > a, .collapse-early .navbar-nav .open > a:focus, .collapse-early .navbar-nav .open > a:hover, .collapse-early .navbar-nav .open > a:active {\n      color: #FFF;\n      background-color: #00ACC1; }\n    .collapse-early .navbar-nav li {\n      float: none; }\n      .collapse-early .navbar-nav li a {\n        padding: 15px 30px; }\n  .collapse-early .navbar-nav > .active > a, .collapse-early .navbar-nav > .active > a:hover, .collapse-early .navbar-nav > .active > a:focus, .collapse-early .navbar-nav > .active > a:active {\n    background-color: #00ACC1;\n    color: #FFF; }\n  .collapse-early .collapse.in {\n    display: block !important; } }\n\n@media (min-width: 320px) and (max-width: 767px) {\n  .collapse-early .navbar-nav {\n    flex-direction: column !important; }\n    .collapse-early .navbar-nav .open > .dropdown-menu > li > a {\n      color: #FFF; }\n  .collapse-early .navbar-nav > li > a {\n    padding: 15px 35px; }\n  .collapse-early .container-fluid {\n    padding-right: 15px;\n    padding-left: 15px; }\n  .collapse-early .navbar-brand {\n    padding: 22px 25px !important; }\n  .collapse-early .navbar-toggle {\n    padding: 25px 30px; } }\n\n.activeNavLink {\n  color: #FFF !important;\n  background-color: #0097A7 !important; }\n", ""]);

// exports


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".root {\n  text-align: center;\n  color: #999; }\n  .root h1 {\n    font-size: 12.8rem; }\n", ""]);

// exports


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/* VARIABLES */\n@media (min-width: 1030px) {\n  .chapter {\n    padding-left: 18px;\n    padding-right: 18px; } }\n\n@media (min-width: 767px) and (max-width: 1030px) {\n  .chapter {\n    padding-left: 6px;\n    padding-right: 6px; } }\n\n@media (max-width: 767px) {\n  .chapter {\n    padding: 0px; } }\n\narticle.article {\n  margin-bottom: 100px; }\n  article.article h2.article-title {\n    color: #444;\n    font-size: 34px;\n    font-weight: 300;\n    padding-top: 50px;\n    margin: 0px 0px 30px !important; }\n  article.article .border-top {\n    border-top: 1px solid rgba(0, 0, 0, 0.117647) !important; }\n  article.article table {\n    border: 0px; }\n    article.article table thead {\n      background-color: #E6E6E6; }\n      article.article table thead tr > th {\n        font-size: 16px;\n        color: #555;\n        font-weight: 500;\n        border-bottom: 1px solid #CCC; }\n    article.article table tbody tr td {\n      font-size: 14px;\n      border-bottom: 1px solid #DDD; }\n      article.article table tbody tr td .secondary-text {\n        font-size: 0.9em;\n        color: #777; }\n      article.article table tbody tr td a {\n        margin-left: 10px; }\n        article.article table tbody tr td a svg > path {\n          fill: rgba(0, 188, 212, 0.6); }\n    article.article table tbody tr tr td {\n      padding: 0px; }\n      article.article table tbody tr tr td .no-padding div {\n        padding: 0px !important; }\n        article.article table tbody tr tr td .no-padding div div {\n          padding: 0px !important; }\n          article.article table tbody tr tr td .no-padding div div div {\n            display: block !important; }\n      article.article table tbody tr tr td .no-padding td {\n        border: 0px; }\n  article.article .box .box-header {\n    padding-top: 30px;\n    font-size: 1.6em;\n    font-weight: 400;\n    color: #444; }\n  article.article .box .box-body {\n    padding-top: 0px; }\n    article.article .box .box-body .connect-btn-box {\n      align-self: center; }\n  article.article .mono-text {\n    font-family: 'Roboto Mono'; }\n  article.article .btn-space {\n    margin-top: 10px; }\n", ""]);

// exports


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".actionContainer {\n  text-align: right; }\n  .actionContainer > * {\n    margin: 2rem; }\n\n.divider-pipe {\n  color: #999;\n  padding-left: 8px; }\n\n.divider-pipe:after {\n  content: \"|\";\n  padding-right: 8px; }\n\n.article-title-primary {\n  font-size: 3rem;\n  color: #444; }\n", ""]);

// exports


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".actionContainer {\n  text-align: right; }\n  .actionContainer > * {\n    margin: 2rem; }\n\n.divider-pipe {\n  color: #999;\n  padding-left: 8px; }\n\n.divider-pipe:after {\n  content: \"|\";\n  padding-right: 8px; }\n\n.article-title-primary {\n  font-size: 3rem;\n  color: #444; }\n", ""]);

// exports


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".root h2 {\n  margin: 0 0 25px 0; }\n\n.root h3 {\n  margin: 0; }\n\n.root .scrollableListContainer {\n  text-align: center; }\n  .root .scrollableListContainer .scrollableList {\n    text-align: left; }\n  .root .scrollableListContainer .tabContentContainer {\n    margin-top: 20px; }\n\n.root .rowProfile .columnLeft .pictureUploader {\n  width: 200px;\n  height: 200px;\n  text-align: center;\n  line-height: 200px;\n  cursor: pointer;\n  outline: 2px dashed white;\n  color: transparent;\n  font-weight: bold; }\n  .root .rowProfile .columnLeft .pictureUploader:hover {\n    color: white;\n    outline: 2px dashed #ccc;\n    text-shadow: 1px 1px #666; }\n\n.root .rowProfile .columnRight {\n  vertical-align: top; }\n  .root .rowProfile .columnRight .legend {\n    text-align: left;\n    display: inline-block; }\n    .root .rowProfile .columnRight .legend p .box {\n      width: 10px;\n      height: 10px;\n      display: inline-block;\n      margin-right: 10px; }\n", ""]);

// exports


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".errorMessage {\n  border-left: 2px solid #f44336;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef;\n  color: #f44336; }\n\n.successMessage {\n  border-left: 2px solid #27b927;\n  color: #27b927;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef; }\n\n.root {\n  margin: 0 20px;\n  padding: 20px 0; }\n  .root .error {\n    color: #f00;\n    padding: 5px 10px;\n    background: #FFC3C3;\n    font-size: 14px; }\n  .root .btnSubmitContainer {\n    margin-top: 20px;\n    margin-bottom: 20px;\n    display: flex; }\n    .root .btnSubmitContainer .btnSubmit {\n      color: inherit; }\n    .root .btnSubmitContainer .forgotPassword {\n      margin: 0;\n      align-self: center;\n      text-align: right;\n      flex-grow: 1; }\n", ""]);

// exports


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".errorMessage {\n  border-left: 2px solid #f44336;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef;\n  color: #f44336; }\n\n.successMessage {\n  border-left: 2px solid #27b927;\n  color: #27b927;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef; }\n\n.page-login h1 > a {\n  color: #00BCD4; }\n\n.page-login .body-inner:before {\n  background-color: #00BCD4 !important; }\n\n.page-login .card-action > button > div > span {\n  color: #00BCD4; }\n\n.card-action {\n  padding: 30px 0px 0px !important; }\n\ninput:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {\n  -webkit-box-shadow: 0 0 0 40px white inset; }\n", ""]);

// exports


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".actionContainer {\n  text-align: right; }\n  .actionContainer > * {\n    margin: 2rem; }\n\n.divider-pipe {\n  color: #999;\n  padding-left: 8px; }\n\n.divider-pipe:after {\n  content: \"|\";\n  padding-right: 8px; }\n", ""]);

// exports


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".errorMessage {\n  border-left: 2px solid #f44336;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef;\n  color: #f44336; }\n\n.successMessage {\n  border-left: 2px solid #27b927;\n  color: #27b927;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef; }\n\n.root {\n  margin: 0 20px;\n  padding: 20px 0; }\n  .root .error {\n    color: #f00;\n    padding: 5px 10px;\n    background: #FFC3C3;\n    font-size: 14px; }\n  .root .btnSubmitContainer {\n    margin-top: 20px;\n    margin-bottom: 20px;\n    display: flex; }\n    .root .btnSubmitContainer .btnSubmit {\n      color: inherit; }\n    .root .btnSubmitContainer .forgotPassword {\n      margin: 0;\n      align-self: center;\n      text-align: right;\n      flex-grow: 1; }\n\n.main-body-primary {\n  padding-top: 50px !important; }\n\n.card-action {\n  padding: 30px 0px 0px !important; }\n", ""]);

// exports


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".actionContainer {\n  text-align: right; }\n  .actionContainer > * {\n    margin: 2rem; }\n\n.divider-pipe {\n  color: #999;\n  padding-left: 8px; }\n\n.divider-pipe:after {\n  content: \"|\";\n  padding-right: 8px; }\n\n.article-title-primary {\n  font-size: 3rem;\n  color: #444; }\n", ""]);

// exports


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".errorMessage {\n  border-left: 2px solid #f44336;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef;\n  color: #f44336; }\n\n.successMessage {\n  border-left: 2px solid #27b927;\n  color: #27b927;\n  margin-bottom: 10px;\n  padding: 10px;\n  background: #efefef; }\n\n.root {\n  margin: 0 20px;\n  padding: 20px 0; }\n  .root .error {\n    color: #f00;\n    padding: 5px 10px;\n    background: #FFC3C3;\n    font-size: 14px; }\n  .root .btnSubmitContainer {\n    margin-top: 20px;\n    margin-bottom: 20px;\n    display: flex; }\n    .root .btnSubmitContainer .btnSubmit {\n      color: inherit; }\n    .root .btnSubmitContainer .forgotPassword {\n      margin: 0;\n      align-self: center;\n      text-align: right;\n      flex-grow: 1; }\n", ""]);

// exports


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".actionContainer {\n  text-align: right; }\n  .actionContainer > * {\n    margin: 2rem; }\n\n.divider-pipe {\n  color: #999;\n  padding-left: 8px; }\n\n.divider-pipe:after {\n  content: \"|\";\n  padding-right: 8px; }\n\n.article-title-primary {\n  font-size: 3rem;\n  color: #444; }\n\n.info-snackbar {\n  margin-bottom: 20px;\n  bottom: 0px !important; }\n\narticle.article .right-align {\n  align-self: center;\n  text-align: right; }\n  article.article .right-align .icon-btn {\n    top: 6px; }\n\narticle.article .filter-bar-btn {\n  float: right;\n  top: 6px; }\n\narticle.article .float-left {\n  float: left; }\n\narticle.article .page-item.active .page-link {\n  background-color: #00BCD4;\n  border-color: #00ACC1; }\n\narticle.article .pagination > li > a, article.article .pagination > li > span {\n  color: #0097A7; }\n\narticle.article div.paginationNav nav {\n  float: right; }\n\narticle.article div.paginationNav span.pageCountText {\n  float: left;\n  padding-top: 28px; }\n", ""]);

// exports


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".actionContainer {\n  text-align: right; }\n  .actionContainer > * {\n    margin: 2rem; }\n\n.divider-pipe {\n  color: #999;\n  padding-left: 8px; }\n\n.divider-pipe:after {\n  content: \"|\";\n  padding-right: 8px; }\n", ""]);

// exports


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".filterToolbar .searchBar {\n  display: flex;\n  align-items: center; }\n  .filterToolbar .searchBar .iconBtn {\n    background-color: #DEDEDE;\n    cursor: pointer;\n    border: 1px solid #CCC;\n    height: 48px;\n    width: 56px;\n    text-align: center;\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px; }\n  .filterToolbar .searchBar div {\n    width: 100%; }\n    .filterToolbar .searchBar div .autoComplete {\n      border: 1px solid #CCC;\n      border-right-width: 0px;\n      border-top-left-radius: 4px;\n      border-bottom-left-radius: 4px; }\n", ""]);

// exports


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".filter-form {\n  float: left; }\n  .filter-form div div {\n    padding-right: 15px; }\n", ""]);

// exports


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "div.navSpan {\n  width: 100%;\n  background-color: #D2E7EA;\n  overflow: hidden; }\n  div.navSpan .actionBtn {\n    float: right;\n    margin: 9px 24px; }\n  div.navSpan .selectiveActionBtn {\n    border: 1px solid #00BCD4;\n    float: right;\n    margin: 8px 5px; }\n  div.navSpan .selectiveDropdownMenu {\n    border: 1px solid #00BCD4;\n    float: right;\n    margin: 8px 5px;\n    max-height: 38px; }\n    div.navSpan .selectiveDropdownMenu div {\n      width: 180px !important; }\n      div.navSpan .selectiveDropdownMenu div label {\n        color: #00BCD4 !important; }\n      div.navSpan .selectiveDropdownMenu div div {\n        margin: 0px !important; }\n        div.navSpan .selectiveDropdownMenu div div button {\n          display: none; }\n          div.navSpan .selectiveDropdownMenu div div button div {\n            display: none; }\n\ndiv.box-default {\n  box-shadow: none; }\n  div.box-default div.slide {\n    padding: 20px; }\n    div.box-default div.slide table {\n      margin-top: 20px; }\n      div.box-default div.slide table thead {\n        background-color: #E6E6E6; }\n        div.box-default div.slide table thead tr > th {\n          font-size: 16px;\n          color: #555;\n          font-weight: 500;\n          border-bottom: 1px solid #B8B8B8; }\n      div.box-default div.slide table tbody tr.fixedHeightRow {\n        cursor: pointer;\n        height: 73px; }\n        div.box-default div.slide table tbody tr.fixedHeightRow td {\n          font-size: 14px;\n          border-bottom: 1px solid #DDD; }\n          div.box-default div.slide table tbody tr.fixedHeightRow td .secondary-text {\n            font-size: 0.9em;\n            color: #777; }\n          div.box-default div.slide table tbody tr.fixedHeightRow td .actionIcon {\n            padding: 12px !important;\n            max-height: 90px; }\n        div.box-default div.slide table tbody tr.fixedHeightRow td.fixedWidthCol {\n          min-width: 138px; }\n\n.show {\n  float: right;\n  padding: 0px;\n  margin: 0px;\n  visibility: visible; }\n\n.hide {\n  visibility: hidden; }\n\n.icon {\n  transform: rotate(360deg);\n  transition: 300ms transform; }\n\n.icon.selected {\n  animation: spin 300ms;\n  transform: rotate(180deg); }\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(180deg); } }\n", ""]);

// exports


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\ndiv.btn-w-xs {\n  min-width: 80px !important; }\n\ndiv.btn-w-sm {\n  min-width: 100px !important; }\n\ndiv.btn-w-md {\n  min-width: 135px !important; }\n\ndiv.btn-w-lg {\n  min-width: 160px !important; }\n\n.app-sidebar .nav-icon,\n.app-sidebar .nav-text {\n  vertical-align: middle; }\n\n.app-sidebar .nav-icon {\n  margin-top: -2px; }\n\n.app-sidebar .nav li > a {\n  display: block !important;\n  text-align: left !important;\n  min-width: inherit !important;\n  padding: 10px 16px;\n  border-radius: 0 !important;\n  height: inherit !important;\n  line-height: 24px !important; }\n\n.app-header .bg-color-dark .header-btn,\n.app-header .bg-color-primary .header-btn,\n.app-header .bg-color-success .header-btn,\n.app-header .bg-color-info .header-btn,\n.app-header .bg-color-danger .header-btn {\n  color: #fff !important; }\n\n.header-icon-dropdown-item {\n  font-size: 14px !important; }\n  .header-icon-dropdown-item > div > div {\n    padding-left: 56px !important; }\n  .header-icon-dropdown-item .text-muted {\n    font-size: 0.75rem !important; }\n\n.theme-dark .app-header .bg-color-light .header-btn,\n.theme-dark .app-header .bg-color-warning .header-btn,\n.theme-gray .app-header .bg-color-light .header-btn,\n.theme-gray .app-header .bg-color-warning .header-btn {\n  color: #fff !important; }\n\n.quickview-wrapper .customizer-layout-options label {\n  color: rgba(0, 0, 0, 0.87) !important; }\n\n.quickview-wrapper .customizer-layout-options .sidebar-width-select > div > div > div {\n  color: rgba(0, 0, 0, 0.87) !important; }\n\n.quickview-wrapper .customizer-layout-options .sidebar-width-select > div > hr {\n  border-color: rgba(0, 0, 0, 0.15) !important; }\n\n#app-container,\n#app-inner,\n.main-app-container {\n  height: 100%; }\n\n.logo-react .react-dot,\n.logo-react .react-curve {\n  opacity: .9; }\n\n.logo-react .react-dot {\n  fill: #fff; }\n\n.logo-react .react-curve {\n  stroke: #fff; }\n\n.bg-color-warning > .logo-react .react-dot,\n.bg-color-light > .logo-react .react-dot {\n  fill: rgba(0, 0, 0, 0.87); }\n\n.bg-color-warning > .logo-react .react-curve,\n.bg-color-light > .logo-react .react-curve {\n  stroke: rgba(0, 0, 0, 0.87); }\n\n.theme-gray .bg-color-warning > .logo-react .react-dot,\n.theme-gray .bg-color-warning > .logo-react .react-curve,\n.theme-gray .bg-color-light > .logo-react .react-dot,\n.theme-gray .bg-color-light > .logo-react .react-curve,\n.theme-dark .bg-color-warning > .logo-react .react-dot,\n.theme-dark .bg-color-warning > .logo-react .react-curve,\n.theme-dark .bg-color-light > .logo-react .react-dot,\n.theme-dark .bg-color-light > .logo-react .react-curve {\n  opacity: .7; }\n\n.theme-gray .bg-color-warning > .logo-react .react-dot,\n.theme-gray .bg-color-light > .logo-react .react-dot,\n.theme-dark .bg-color-warning > .logo-react .react-dot,\n.theme-dark .bg-color-light > .logo-react .react-dot {\n  fill: #fff; }\n\n.theme-gray .bg-color-warning > .logo-react .react-curve,\n.theme-gray .bg-color-light > .logo-react .react-curve,\n.theme-dark .bg-color-warning > .logo-react .react-curve,\n.theme-dark .bg-color-light > .logo-react .react-curve {\n  stroke: #fff; }\n\n@media only screen and (min-width: 992px) {\n  .nav-collapsed .app-sidebar .sidebar-header .logo-react {\n    margin-bottom: -5px; } }\n\n.chapter .ui-animate > div > .article .article-title {\n  margin: 48px 0 30px;\n  border-top: 1px solid black; }\n\n.chapter .ui-animate > div:nth-of-type(1) > .article .article-title {\n  margin: 0 0 30px;\n  border-top: 0; }\n\n.typo-styles dt {\n  display: block;\n  float: left;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.24);\n  width: 32px;\n  height: 32px;\n  border-radius: 16px;\n  line-height: 32px;\n  text-align: center;\n  font-weight: 500;\n  margin-top: 5px; }\n\n.typo-styles dd {\n  display: block;\n  margin-left: 80px;\n  margin-bottom: 20px; }\n\n.typo-styles .typo-styles__demo {\n  margin-bottom: 8px; }\n\n.page-icons .card .fa,\n.page-icons .card .material-icons,\n.page-icons .card .wi {\n  color: rgba(0, 0, 0, 0.5); }\n\n.page-icons .card .fa,\n.page-icons .card .wi {\n  font-size: 20px;\n  margin: 5px; }\n\n.theme-gray .page-icons .card .fa,\n.theme-gray .page-icons .card .material-icons,\n.theme-gray .page-icons .card .wi,\n.theme-dark .page-icons .card .fa,\n.theme-dark .page-icons .card .material-icons,\n.theme-dark .page-icons .card .wi {\n  color: rgba(255, 255, 255, 0.7);\n  opacity: .7; }\n\n.page-grids .grid-structure .row {\n  margin-top: .8rem; }\n  .page-grids .grid-structure .row .widget-container {\n    margin-top: 5px;\n    background: rgba(0, 0, 0, 0.1);\n    padding: 10px 15px 12px;\n    font-size: 0.875rem;\n    min-height: 0;\n    border-radius: 0.2rem; }\n\n.color-palette {\n  color: rgba(255, 255, 255, 0.87);\n  font-size: 14px;\n  font-weight: 500;\n  padding-bottom: 60px; }\n  .color-palette ul {\n    margin: 0;\n    padding: 0; }\n  .color-palette .dark {\n    color: rgba(0, 0, 0, 0.87); }\n  .color-palette .color-group {\n    padding-bottom: 40px; }\n  .color-palette .color-group:first-child,\n  .color-palette .color-group:nth-of-type(3n+1),\n  .color-palette .color-group:last-child:first-child,\n  .color-palette .color-group:last-child:nth-of-type(3n+1) {\n    clear: left;\n    margin-left: 0; }\n  .color-palette .color-group li.divide,\n  .color-palette .color-group:last-child li.divide {\n    border-top: 4px solid #fafafa; }\n  .color-palette .color-group li.color,\n  .color-palette .color-group:last-child li.color {\n    padding: 15px; }\n  .color-palette .color-group li,\n  .color-palette .color-group:last-child li {\n    list-style-type: none; }\n  .color-palette .color-group li.main-color,\n  .color-palette .color-group:last-child li.main-color {\n    border-bottom: 4px solid #fafafa; }\n  .color-palette .color-group li.main-color .name,\n  .color-palette .color-group:last-child li.main-color .name {\n    display: block;\n    margin-bottom: 60px; }\n  .color-palette .color-group li.color .hex,\n  .color-palette .color-group:last-child li.color .hex {\n    float: right;\n    text-transform: uppercase; }\n\n.body-auth {\n  background-color: #F5F5F5;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  background-size: cover; }\n\n.page-auth,\n.page-login,\n.page-signup,\n.page-forgot {\n  padding: 0 10px; }\n  .page-auth .main-body,\n  .page-login .main-body,\n  .page-signup .main-body,\n  .page-forgot .main-body {\n    max-width: 480px;\n    margin: 0 auto;\n    padding-top: 50px; }\n    @media (min-width: 768px) {\n      .page-auth .main-body,\n      .page-login .main-body,\n      .page-signup .main-body,\n      .page-forgot .main-body {\n        padding-top: 150px; } }\n  .page-auth .body-inner,\n  .page-login .body-inner,\n  .page-signup .body-inner,\n  .page-forgot .body-inner {\n    position: relative;\n    padding: 20px; }\n    .page-auth .body-inner:before,\n    .page-login .body-inner:before,\n    .page-signup .body-inner:before,\n    .page-forgot .body-inner:before {\n      z-index: 0;\n      content: ' ';\n      line-height: 0;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: #2196F3;\n      height: 220px; }\n  .page-auth .additional-info,\n  .page-login .additional-info,\n  .page-signup .additional-info,\n  .page-forgot .additional-info {\n    position: relative;\n    z-index: 1;\n    text-align: center;\n    font-size: 12px; }\n    .page-auth .additional-info a,\n    .page-login .additional-info a,\n    .page-signup .additional-info a,\n    .page-forgot .additional-info a {\n      color: #fafafa; }\n    .page-auth .additional-info .divider-h,\n    .page-login .additional-info .divider-h,\n    .page-signup .additional-info .divider-h,\n    .page-forgot .additional-info .divider-h {\n      border-right: 1px solid #fafafa;\n      margin: 0 15px; }\n  .page-auth h1,\n  .page-login h1,\n  .page-signup h1,\n  .page-forgot h1 {\n    font-weight: normal;\n    color: #2196F3;\n    font-size: 38px;\n    margin-bottom: 40px; }\n    .page-auth h1 a,\n    .page-login h1 a,\n    .page-signup h1 a,\n    .page-forgot h1 a {\n      color: #2196F3; }\n  .page-auth .card,\n  .page-login .card,\n  .page-signup .card,\n  .page-forgot .card {\n    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n    .page-auth .card .card-content,\n    .page-login .card .card-content,\n    .page-signup .card .card-content,\n    .page-forgot .card .card-content {\n      padding: 30px 20px; }\n  .page-auth .ui-input-group .form-control,\n  .page-login .ui-input-group .form-control,\n  .page-signup .ui-input-group .form-control,\n  .page-forgot .ui-input-group .form-control {\n    color: #464a4c; }\n  .page-auth .form-group,\n  .page-login .form-group,\n  .page-signup .form-group,\n  .page-forgot .form-group {\n    position: relative;\n    margin: 0; }\n  .page-auth .wrapper,\n  .page-login .wrapper,\n  .page-signup .wrapper,\n  .page-forgot .wrapper {\n    margin-top: 50px; }\n    @media (min-width: 768px) {\n      .page-auth .wrapper,\n      .page-login .wrapper,\n      .page-signup .wrapper,\n      .page-forgot .wrapper {\n        margin-top: 150px; } }\n  .page-auth .logo,\n  .page-login .logo,\n  .page-signup .logo,\n  .page-forgot .logo {\n    font-size: 26px;\n    font-weight: normal; }\n    .page-auth .logo a:hover,\n    .page-login .logo a:hover,\n    .page-signup .logo a:hover,\n    .page-forgot .logo a:hover {\n      text-decoration: none; }\n\n.page-confirm-email .logo {\n  font-size: 24px;\n  margin-bottom: .8em; }\n\n.page-confirm-email .confirm-mail-icon {\n  text-align: center; }\n  .page-confirm-email .confirm-mail-icon .material-icons {\n    color: #636c72;\n    font-size: 100px; }\n\n.page-err {\n  background-color: #333C44;\n  height: 100%;\n  position: relative; }\n  .page-err .err-container {\n    background-color: #333C44;\n    padding: 45px 10px 0; }\n    @media (min-width: 768px) {\n      .page-err .err-container {\n        padding: 100px 0 0; } }\n  .page-err .err {\n    color: #fafafa; }\n    .page-err .err h1 {\n      margin-bottom: 35px;\n      color: #fafafa;\n      color: rgba(255, 255, 255, 0.8);\n      font-size: 150px;\n      font-weight: 300;\n      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); }\n      @media (min-width: 768px) {\n        .page-err .err h1 {\n          font-size: 180px; } }\n    .page-err .err h2 {\n      color: #fafafa;\n      color: rgba(255, 255, 255, 0.6);\n      margin: 0;\n      font-weight: 300;\n      font-size: 28px;\n      text-transform: uppercase; }\n      @media (min-width: 768px) {\n        .page-err .err h2 {\n          font-size: 36px; } }\n  .page-err .err-body {\n    padding: 20px 10px; }\n  .page-err .btn-goback {\n    color: #fff;\n    color: rgba(255, 255, 255, 0.8);\n    background-color: transparent;\n    border-color: #fff;\n    border-color: rgba(255, 255, 255, 0.8); }\n    .page-err .btn-goback:hover, .page-err .btn-goback:focus, .page-err .btn-goback:active, .page-err .btn-goback.active {\n      color: #fff;\n      background-color: rgba(255, 255, 255, 0.1); }\n    .open .page-err .btn-goback.dropdown-toggle {\n      color: #fff;\n      background-color: rgba(255, 255, 255, 0.1); }\n  .page-err .footer {\n    position: absolute;\n    bottom: 20px;\n    width: 100%; }\n\n.page-lock {\n  height: 100%;\n  background-size: cover; }\n  .page-lock .lock-centered {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    margin-top: -65px; }\n    @media screen and (min-width: 768px) {\n      .page-lock .lock-centered {\n        margin-top: -75px; } }\n  .page-lock .lock-container {\n    position: relative;\n    max-width: 420px;\n    margin: 0 auto; }\n  .page-lock .lock-box {\n    position: absolute;\n    left: 0;\n    right: 0; }\n    .page-lock .lock-box .lock-user {\n      background: #fff;\n      width: 50%;\n      float: left;\n      height: 50px;\n      line-height: 50px;\n      margin-top: 50px;\n      padding: 0 20px;\n      border-left-radius: 0.2rem 0 0 0.2rem;\n      color: #636c72; }\n    .page-lock .lock-box .lock-img img {\n      position: absolute;\n      border-radius: 50%;\n      left: 40%;\n      width: 80px;\n      height: 80px;\n      border: 6px solid #fff;\n      background: #fff; }\n      @media screen and (min-width: 768px) {\n        .page-lock .lock-box .lock-img img {\n          left: 33%;\n          width: 150px;\n          height: 150px;\n          border: 10px solid #fff; } }\n    .page-lock .lock-box .lock-pwd {\n      background: #fff;\n      width: 50%;\n      float: right;\n      height: 50px;\n      line-height: 50px;\n      padding: 0 0 0 50px;\n      margin-top: 50px;\n      border-right-radius: 0 0.2rem 0.2rem 0;\n      color: #2196F3; }\n      @media screen and (min-width: 768px) {\n        .page-lock .lock-box .lock-pwd {\n          padding: 0 0 0 80px; } }\n      .page-lock .lock-box .lock-pwd input {\n        width: 80%;\n        height: 50px;\n        color: #464a4c;\n        border: 0; }\n      .page-lock .lock-box .lock-pwd .btn-submit {\n        position: absolute;\n        top: 50%;\n        right: 20px;\n        color: rgba(0, 0, 0, 0.87); }\n        .page-lock .lock-box .lock-pwd .btn-submit .material-icons {\n          line-height: 50px;\n          height: 50px; }\n\n.page-profile .profile-header {\n  position: relative;\n  margin: 0 0 15px;\n  padding: 50px 30px 90px;\n  background-size: cover; }\n\n.page-profile .profile-img {\n  display: inline-block;\n  margin-right: 20px; }\n  .page-profile .profile-img img {\n    max-width: 120px;\n    height: auto;\n    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(0, 0, 0, 0.2); }\n\n.page-profile .profile-social {\n  display: inline-block; }\n  .page-profile .profile-social > a {\n    margin-right: 15px;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); }\n\n.page-profile .profile-info {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  line-height: 20px;\n  padding: 10px 30px;\n  color: #fafafa; }\n  .page-profile .profile-info ul {\n    margin: 0; }\n\n.page-profile img.media-object {\n  border-radius: 0.2rem; }\n\n.page-invoice {\n  color: rgba(0, 0, 0, 0.87); }\n  .page-invoice .invoice-wrapper {\n    padding: 0 0 30px;\n    background-color: #fff; }\n\n.invoice-inner {\n  padding: 15px 15px 30px;\n  background-color: #fff; }\n  .invoice-inner .invoice-sum li {\n    margin-bottom: 5px;\n    padding: 10px;\n    background-color: rgba(0, 0, 0, 0.05);\n    border-radius: 0.2rem; }\n  .invoice-inner .table.table-bordered {\n    border: 0; }\n  .invoice-inner .table .bg-color-dark > th {\n    border: 0; }\n\n.page-dashboard .metrics {\n  margin-top: 50px; }\n  .page-dashboard .metrics .metric-box {\n    margin-bottom: 15px; }\n  .page-dashboard .metrics .metric {\n    display: block;\n    margin-bottom: 10px;\n    font-size: 26px;\n    color: #00BCD4; }\n  .page-dashboard .metrics .metric-info {\n    text-transform: uppercase;\n    font-size: 16px;\n    color: #aaa; }\n\n.page-dashboard .box {\n  position: relative;\n  border-radius: 0.2rem; }\n  .page-dashboard .box .box-top,\n  .page-dashboard .box .box-bottom {\n    height: 100px;\n    padding: 32px 15px;\n    font-size: 40px;\n    line-height: 40px;\n    text-align: center;\n    font-weight: 300; }\n    .page-dashboard .box .box-top .size-h5,\n    .page-dashboard .box .box-bottom .size-h5 {\n      font-size: 24px;\n      margin-left: 2px; }\n    .page-dashboard .box .box-top .material-icons,\n    .page-dashboard .box .box-bottom .material-icons {\n      font-size: 40px;\n      line-height: 40px; }\n  .page-dashboard .box .box-bottom {\n    border-top: 1px solid rgba(0, 0, 0, 0.15); }\n    @media only screen and (min-width: 768px) {\n      .page-dashboard .box .box-bottom {\n        padding-left: 15%;\n        padding-right: 15%; } }\n  .page-dashboard .box .box-info {\n    position: absolute;\n    width: 100%;\n    top: 50%;\n    margin-top: -12px;\n    text-align: center; }\n    .page-dashboard .box .box-info span {\n      height: 24px;\n      display: inline-block;\n      padding: 4px 10px;\n      text-transform: uppercase;\n      line-height: 14px;\n      background-color: #fff;\n      border: 1px solid rgba(0, 0, 0, 0.15);\n      font-size: 12px;\n      color: #636c72;\n      border-radius: 1em; }\n      .page-dashboard .box .box-info span .material-icons {\n        line-height: 14px;\n        font-size: 11px; }\n\n.theme-gray .box-info .box-icon .material-icons,\n.theme-dark .box-info .box-icon .material-icons {\n  color: rgba(255, 255, 255, 0.54); }\n\n.theme-gray .box-info .box-num,\n.theme-dark .box-info .box-num {\n  color: rgba(255, 255, 255, 0.54); }\n\n.theme-gray .page-dashboard .box .box-info span {\n  background-color: #424242; }\n\n.theme-dark .page-dashboard .box .box-info span {\n  background-color: #38424b; }\n\n.page-maintenance .top-header {\n  padding: 1em 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 32px;\n  line-height: 1; }\n  .page-maintenance .top-header a.logo {\n    text-decoration: none;\n    color: rgba(0, 0, 0, 0.87); }\n\n.page-maintenance .content {\n  max-width: 1140px;\n  margin: 50px auto 0; }\n\n.page-maintenance .main-content {\n  margin-bottom: 80px; }\n  .page-maintenance .main-content h1 {\n    text-transform: uppercase;\n    font-size: 32px;\n    margin-bottom: 15px; }\n  .page-maintenance .main-content p {\n    font-size: 22px; }\n\n.page-about .hero.hero-bg-img {\n  background-size: cover;\n  padding: 0;\n  background-position: center center; }\n\n.page-about .hero .hero-inner {\n  background-color: rgba(0, 0, 0, 0.15);\n  padding: 90px 0; }\n\n.page-about .hero .hero-title,\n.page-about .hero .hero-tagline {\n  color: #fff; }\n\n.page-about .stat-container {\n  margin-bottom: 30px; }\n  .page-about .stat-container .stat-item {\n    margin-bottom: 20px;\n    border-bottom: 2px solid #f5f5f5; }\n  .page-about .stat-container .stat-num {\n    display: block;\n    color: #2196F3;\n    font-size: 72px;\n    font-weight: 300;\n    line-height: 66px; }\n  .page-about .stat-container .stat-desc {\n    display: inline-block;\n    margin-bottom: -2px;\n    padding-bottom: 20px;\n    border-bottom: 2px solid #2196F3;\n    font-size: 20px;\n    line-height: 22px;\n    font-weight: bold; }\n\n.page-about .article:nth-of-type(1) {\n  padding-top: 75px; }\n\n.page-about .space-bar {\n  padding: 3px;\n  border-radius: 0.2rem;\n  margin-right: 5px; }\n\n.page-terms h4 {\n  margin-top: 2em;\n  font-size: 16px;\n  font-weight: 500;\n  text-transform: uppercase; }\n\n.blog-item {\n  border-top: 1px solid rgba(0, 0, 0, 0.117647);\n  margin-top: 70px;\n  padding: 70px 0 10px; }\n  .blog-item:first-child {\n    border-top: 0;\n    padding-top: 0;\n    margin-top: 0; }\n  .blog-item h2 {\n    font-size: 35px;\n    line-height: 1; }\n    .blog-item h2 a {\n      color: rgba(0, 0, 0, 0.87);\n      font-weight: 300;\n      text-decoration: none; }\n  .blog-item .blog-info {\n    margin: 10px 0; }\n    .blog-item .blog-info > span {\n      margin-right: 8px; }\n    .blog-item .blog-info .avatar {\n      width: 30px;\n      height: auto;\n      border-radius: 50%; }\n    .blog-item .blog-info .date {\n      opacity: .7; }\n    .blog-item .blog-info .category {\n      display: inline-block;\n      text-transform: uppercase;\n      font-size: 12px;\n      padding: 2px 5px;\n      border-radius: 0.2rem;\n      background-color: rgba(0, 0, 0, 0.08); }\n      .blog-item .blog-info .category a {\n        color: rgba(0, 0, 0, 0.87);\n        text-decoration: none;\n        opacity: .7; }\n  .blog-item .desc {\n    font-size: 16px;\n    opacity: .7; }\n\n.theme-gray .blog-item h2 a,\n.theme-dark .blog-item h2 a {\n  color: rgba(255, 255, 255, 0.7); }\n\n.theme-gray .blog-item .blog-info .category a,\n.theme-dark .blog-item .blog-info .category a {\n  color: rgba(255, 255, 255, 0.7); }\n", ""]);

// exports


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nfigcaption,\nfigure,\nmain {\n  display: block; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\ndfn {\n  font-style: italic; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\naudio,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\ndetails,\nmenu {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\ncanvas {\n  display: inline-block; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  p::first-letter,\n  div::first-letter,\n  blockquote::first-letter,\n  li::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #F5F5F5; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #2196F3;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #0a6ebd;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #636c72;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #636c72; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #F5F5F5;\n  border: 1px solid #ddd;\n  border-radius: 0.2rem;\n  transition: all 0.2s ease-in-out;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #636c72; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.2rem; }\n  a > code {\n    padding: 0;\n    color: inherit;\n    background-color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #292b2c;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #292b2c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col {\n  flex-basis: 0;\n  flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  flex: 0 0 auto;\n  width: auto; }\n\n.col-1 {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-2 {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-3 {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4 {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-5 {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-6 {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-8 {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-9 {\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-11 {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-12 {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.pull-0 {\n  right: auto; }\n\n.pull-1 {\n  right: 8.33333%; }\n\n.pull-2 {\n  right: 16.66667%; }\n\n.pull-3 {\n  right: 25%; }\n\n.pull-4 {\n  right: 33.33333%; }\n\n.pull-5 {\n  right: 41.66667%; }\n\n.pull-6 {\n  right: 50%; }\n\n.pull-7 {\n  right: 58.33333%; }\n\n.pull-8 {\n  right: 66.66667%; }\n\n.pull-9 {\n  right: 75%; }\n\n.pull-10 {\n  right: 83.33333%; }\n\n.pull-11 {\n  right: 91.66667%; }\n\n.pull-12 {\n  right: 100%; }\n\n.push-0 {\n  left: auto; }\n\n.push-1 {\n  left: 8.33333%; }\n\n.push-2 {\n  left: 16.66667%; }\n\n.push-3 {\n  left: 25%; }\n\n.push-4 {\n  left: 33.33333%; }\n\n.push-5 {\n  left: 41.66667%; }\n\n.push-6 {\n  left: 50%; }\n\n.push-7 {\n  left: 58.33333%; }\n\n.push-8 {\n  left: 66.66667%; }\n\n.push-9 {\n  left: 75%; }\n\n.push-10 {\n  left: 83.33333%; }\n\n.push-11 {\n  left: 91.66667%; }\n\n.push-12 {\n  left: 100%; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-sm-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333%; }\n  .pull-sm-2 {\n    right: 16.66667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333%; }\n  .pull-sm-5 {\n    right: 41.66667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333%; }\n  .pull-sm-8 {\n    right: 66.66667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333%; }\n  .pull-sm-11 {\n    right: 91.66667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333%; }\n  .push-sm-2 {\n    left: 16.66667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333%; }\n  .push-sm-5 {\n    left: 41.66667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333%; }\n  .push-sm-8 {\n    left: 66.66667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333%; }\n  .push-sm-11 {\n    left: 91.66667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-md-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333%; }\n  .pull-md-2 {\n    right: 16.66667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333%; }\n  .pull-md-5 {\n    right: 41.66667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333%; }\n  .pull-md-8 {\n    right: 66.66667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333%; }\n  .pull-md-11 {\n    right: 91.66667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333%; }\n  .push-md-2 {\n    left: 16.66667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333%; }\n  .push-md-5 {\n    left: 41.66667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333%; }\n  .push-md-8 {\n    left: 66.66667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333%; }\n  .push-md-11 {\n    left: 91.66667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-lg-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333%; }\n  .pull-lg-2 {\n    right: 16.66667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333%; }\n  .pull-lg-5 {\n    right: 41.66667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333%; }\n  .pull-lg-8 {\n    right: 66.66667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333%; }\n  .pull-lg-11 {\n    right: 91.66667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333%; }\n  .push-lg-2 {\n    left: 16.66667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333%; }\n  .push-lg-5 {\n    left: 41.66667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333%; }\n  .push-lg-8 {\n    left: 66.66667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333%; }\n  .push-lg-11 {\n    left: 91.66667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-xl-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333%; }\n  .pull-xl-2 {\n    right: 16.66667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333%; }\n  .pull-xl-5 {\n    right: 41.66667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333%; }\n  .pull-xl-8 {\n    right: 66.66667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333%; }\n  .pull-xl-11 {\n    right: 91.66667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333%; }\n  .push-xl-2 {\n    left: 16.66667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333%; }\n  .push-xl-5 {\n    left: 41.66667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333%; }\n  .push-xl-8 {\n    left: 66.66667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333%; }\n  .push-xl-11 {\n    left: 91.66667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid rgba(0, 0, 0, 0.1); }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid rgba(0, 0, 0, 0.1); }\n  .table tbody + tbody {\n    border-top: 2px solid rgba(0, 0, 0, 0.1); }\n  .table .table {\n    background-color: #F5F5F5; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid rgba(0, 0, 0, 0.1); }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid rgba(0, 0, 0, 0.1); }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.045); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.08); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.08); }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.thead-inverse th {\n  color: #F5F5F5;\n  background-color: #292b2c; }\n\n.thead-default th {\n  color: #464a4c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #F5F5F5;\n  background-color: #292b2c; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #F5F5F5; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .table-responsive.table-bordered {\n    border: 0; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #464a4c;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.2rem;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #9acffa;\n    outline: none; }\n  .form-control::placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px); }\n\nselect.form-control:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: calc(0.5rem - 1px * 2);\n  padding-bottom: calc(0.5rem - 1px * 2);\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: calc(0.75rem - 1px * 2);\n  padding-bottom: calc(0.75rem - 1px * 2);\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem - 1px * 2);\n  padding-bottom: calc(0.25rem - 1px * 2);\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),\n.input-group-sm > select.input-group-addon:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),\n.input-group-lg > select.input-group-addon:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.5rem; }\n  .form-check.disabled .form-check-label {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  display: inline-block; }\n  .form-check-inline .form-check-label {\n    vertical-align: middle; }\n  .form-check-inline + .form-check-inline {\n    margin-left: 0.75rem; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  background-size: 1.125rem 1.125rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .col-form-label,\n.has-success .form-check-label,\n.has-success .custom-control {\n  color: #66BB6A; }\n\n.has-success .form-control {\n  border-color: #66BB6A; }\n\n.has-success .input-group-addon {\n  color: #66BB6A;\n  border-color: #66BB6A;\n  background-color: #f3faf4; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%2366BB6A' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .col-form-label,\n.has-warning .form-check-label,\n.has-warning .custom-control {\n  color: #FFCA28; }\n\n.has-warning .form-control {\n  border-color: #FFCA28; }\n\n.has-warning .input-group-addon {\n  color: #FFCA28;\n  border-color: #FFCA28;\n  background-color: #fffcf4; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23FFCA28' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .col-form-label,\n.has-danger .form-check-label,\n.has-danger .custom-control {\n  color: #EF5350; }\n\n.has-danger .form-control {\n  border-color: #EF5350; }\n\n.has-danger .input-group-addon {\n  color: #EF5350;\n  border-color: #EF5350;\n  background-color: white; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23EF5350' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n.form-inline {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: flex;\n      flex: 0 0 auto;\n      flex-flow: row wrap;\n      align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-static {\n      display: inline-block; }\n    .form-inline .input-group {\n      width: auto; }\n    .form-inline .form-control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .form-inline .form-check {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: auto;\n      margin-top: 0;\n      margin-bottom: 0; }\n    .form-inline .form-check-label {\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding-left: 0; }\n    .form-inline .custom-control-indicator {\n      position: static;\n      display: inline-block;\n      margin-right: 0.25rem;\n      vertical-align: text-bottom; }\n    .form-inline .has-feedback .form-control-feedback {\n      top: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.2rem;\n  transition: all 0.2s ease-in-out; }\n  .btn:focus, .btn:hover {\n    text-decoration: none; }\n  .btn:focus, .btn.focus {\n    outline: 0;\n    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.25); }\n  .btn.disabled, .btn:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n  .btn:active, .btn.active {\n    background-image: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #2196F3;\n  border-color: #2196F3; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #0c7cd5;\n    border-color: #0b76cc; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    background-color: #2196F3;\n    border-color: #2196F3; }\n  .btn-primary:active, .btn-primary.active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0c7cd5;\n    background-image: none;\n    border-color: #0b76cc; }\n\n.btn-secondary {\n  color: #292b2c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary:active, .btn-secondary.active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    background-image: none;\n    border-color: #adadad; }\n\n.btn-info {\n  color: #fff;\n  background-color: #00BCD4;\n  border-color: #00BCD4; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #008fa1;\n    border-color: #008697; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    background-color: #00BCD4;\n    border-color: #00BCD4; }\n  .btn-info:active, .btn-info.active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #008fa1;\n    background-image: none;\n    border-color: #008697; }\n\n.btn-success {\n  color: #fff;\n  background-color: #66BB6A;\n  border-color: #66BB6A; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #49a54e;\n    border-color: #469e4a; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 2px rgba(102, 187, 106, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    background-color: #66BB6A;\n    border-color: #66BB6A; }\n  .btn-success:active, .btn-success.active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #49a54e;\n    background-image: none;\n    border-color: #469e4a; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #FFCA28;\n  border-color: #FFCA28; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #f4b800;\n    border-color: #eab000; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    background-color: #FFCA28;\n    border-color: #FFCA28; }\n  .btn-warning:active, .btn-warning.active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f4b800;\n    background-image: none;\n    border-color: #eab000; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #EF5350;\n  border-color: #EF5350; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #eb2521;\n    border-color: #ea1c18; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 2px rgba(239, 83, 80, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    background-color: #EF5350;\n    border-color: #EF5350; }\n  .btn-danger:active, .btn-danger.active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #eb2521;\n    background-image: none;\n    border-color: #ea1c18; }\n\n.btn-outline-primary {\n  color: #2196F3;\n  background-image: none;\n  background-color: transparent;\n  border-color: #2196F3; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #2196F3;\n    border-color: #2196F3; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #2196F3;\n    background-color: transparent; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #2196F3;\n    border-color: #2196F3; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #ccc;\n    background-color: transparent; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n\n.btn-outline-info {\n  color: #00BCD4;\n  background-image: none;\n  background-color: transparent;\n  border-color: #00BCD4; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #00BCD4;\n    border-color: #00BCD4; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #00BCD4;\n    background-color: transparent; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #00BCD4;\n    border-color: #00BCD4; }\n\n.btn-outline-success {\n  color: #66BB6A;\n  background-image: none;\n  background-color: transparent;\n  border-color: #66BB6A; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #66BB6A;\n    border-color: #66BB6A; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 2px rgba(102, 187, 106, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #66BB6A;\n    background-color: transparent; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #66BB6A;\n    border-color: #66BB6A; }\n\n.btn-outline-warning {\n  color: #FFCA28;\n  background-image: none;\n  background-color: transparent;\n  border-color: #FFCA28; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #FFCA28;\n    border-color: #FFCA28; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #FFCA28;\n    background-color: transparent; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #FFCA28;\n    border-color: #FFCA28; }\n\n.btn-outline-danger {\n  color: #EF5350;\n  background-image: none;\n  background-color: transparent;\n  border-color: #EF5350; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #EF5350;\n    border-color: #EF5350; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 2px rgba(239, 83, 80, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #EF5350;\n    background-color: transparent; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #EF5350;\n    border-color: #EF5350; }\n\n.btn-link {\n  font-weight: normal;\n  color: #2196F3;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #0a6ebd;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled {\n    color: #636c72; }\n    .btn-link:disabled:focus, .btn-link:disabled:hover {\n      text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.2rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity 0.15s linear; }\n  .fade.show {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.show {\n    display: block; }\n\ntr.collapse.show {\n  display: table-row; }\n\ntbody.collapse.show {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: rgba(0, 0, 0, 0.87);\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.2rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #eceeef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #292b2c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #1d1e1f;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #2196F3; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: transparent; }\n\n.show > .dropdown-menu {\n  display: block; }\n\n.show > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #636c72;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    flex: 0 1 auto; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 2; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n  .btn-group .btn + .btn,\n  .btn-group .btn + .btn-group,\n  .btn-group .btn-group + .btn,\n  .btn-group .btn-group + .btn-group,\n  .btn-group-vertical .btn + .btn,\n  .btn-group-vertical .btn + .btn-group,\n  .btn-group-vertical .btn-group + .btn,\n  .btn-group-vertical .btn-group + .btn-group {\n    margin-left: -1px; }\n\n.btn-toolbar {\n  display: flex;\n  justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn-group-vertical {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center; }\n  .btn-group-vertical .btn,\n  .btn-group-vertical .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn + .btn,\n  .btn-group-vertical > .btn + .btn-group,\n  .btn-group-vertical > .btn-group + .btn,\n  .btn-group-vertical > .btn-group + .btn-group {\n    margin-top: -1px;\n    margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: flex;\n  width: 100%; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #464a4c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.2rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.2rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative;\n    flex: 1; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > .btn:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: inline-flex;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  margin-right: 1rem;\n  cursor: pointer; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #2196F3; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 1px #F5F5F5, 0 0 0 3px #2196F3; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #cae6fc; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.2rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #2196F3;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked {\n  display: flex;\n  flex-direction: column; }\n  .custom-controls-stacked .custom-control {\n    margin-bottom: 0.25rem; }\n    .custom-controls-stacked .custom-control + .custom-control {\n      margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.25;\n  color: #464a4c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.2rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #9acffa;\n    outline: none; }\n    .custom-select:focus::-ms-value {\n      color: #464a4c;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  height: 2.5rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  pointer-events: none;\n  user-select: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.2rem; }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #464a4c;\n    background-color: #eceeef;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0 0.2rem 0.2rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5em 1em; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.nav-tabs {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-right-radius: 0.2rem;\n    border-top-left-radius: 0.2rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: rgba(0, 0, 0, 0.125) rgba(0, 0, 0, 0.125) rgba(0, 0, 0, 0.125); }\n    .nav-tabs .nav-link.disabled {\n      color: #636c72;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #464a4c;\n    background-color: #F5F5F5;\n    border-color: #ddd #ddd #F5F5F5; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.2rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .nav-item.show .nav-link {\n  color: #fff;\n  cursor: default;\n  background-color: #2196F3; }\n\n.nav-fill .nav-item {\n  flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  flex: 1 1 100%;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem 1rem; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  align-self: flex-start;\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.2rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n.navbar-toggler-left {\n  position: absolute;\n  left: 1rem; }\n\n.navbar-toggler-right {\n  position: absolute;\n  right: 1rem; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-sm > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable-sm .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable-sm .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-sm > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable-sm .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-md > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable-md .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable-md .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-md > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable-md .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-lg > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    flex-direction: row;\n    flex-wrap: nowrap;\n    align-items: center; }\n    .navbar-toggleable-lg .navbar-nav {\n      flex-direction: row; }\n      .navbar-toggleable-lg .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-lg > .container {\n      display: flex;\n      flex-wrap: nowrap;\n      align-items: center; }\n    .navbar-toggleable-lg .navbar-collapse {\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-lg .navbar-toggler {\n      display: none; } }\n\n.navbar-toggleable-xl {\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-xl > .container {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    flex-direction: row; }\n    .navbar-toggleable-xl .navbar-nav .nav-link {\n      padding-right: .5rem;\n      padding-left: .5rem; }\n  .navbar-toggleable-xl > .container {\n    display: flex;\n    flex-wrap: nowrap;\n    align-items: center; }\n  .navbar-toggleable-xl .navbar-collapse {\n    display: flex !important;\n    width: 100%; }\n  .navbar-toggleable-xl .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .open > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n\n.navbar-inverse .navbar-brand,\n.navbar-inverse .navbar-toggler {\n  color: white; }\n  .navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover,\n  .navbar-inverse .navbar-toggler:focus,\n  .navbar-inverse .navbar-toggler:hover {\n    color: white; }\n\n.navbar-inverse .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-inverse .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-inverse .navbar-nav .open > .nav-link,\n.navbar-inverse .navbar-nav .active > .nav-link,\n.navbar-inverse .navbar-nav .nav-link.open,\n.navbar-inverse .navbar-nav .nav-link.active {\n  color: white; }\n\n.navbar-inverse .navbar-toggler {\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-inverse .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-inverse .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.2rem; }\n\n.card-block {\n  flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f7f7f9;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.2rem - 1px) calc(0.2rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7f7f9;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.2rem - 1px) calc(0.2rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #2196F3;\n  border-color: #2196F3; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #66BB6A;\n  border-color: #66BB6A; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #00BCD4;\n  border-color: #00BCD4; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #FFCA28;\n  border-color: #FFCA28; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #EF5350;\n  border-color: #EF5350; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #2196F3; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #00BCD4; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #66BB6A; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #FFCA28; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #EF5350; }\n\n.card-inverse {\n  color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer {\n    background-color: transparent;\n    border-color: rgba(255, 255, 255, 0.2); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer,\n  .card-inverse .card-title,\n  .card-inverse .card-blockquote {\n    color: #fff; }\n  .card-inverse .card-link,\n  .card-inverse .card-text,\n  .card-inverse .card-subtitle,\n  .card-inverse .card-blockquote .blockquote-footer {\n    color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-link:focus, .card-inverse .card-link:hover {\n    color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.2rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.2rem - 1px);\n  border-top-left-radius: calc(0.2rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.2rem - 1px);\n  border-bottom-left-radius: calc(0.2rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: flex;\n    flex-flow: row wrap; }\n    .card-deck .card {\n      display: flex;\n      flex: 1 0 0;\n      flex-direction: column; }\n      .card-deck .card:not(:first-child) {\n        margin-left: 15px; }\n      .card-deck .card:not(:last-child) {\n        margin-right: 15px; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: flex;\n    flex-flow: row wrap; }\n    .card-group .card {\n      flex: 1 0 0; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    column-count: 3;\n    column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%;\n      margin-bottom: 0.75rem; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.2rem; }\n  .breadcrumb::after {\n    display: block;\n    content: \"\";\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #636c72;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #636c72; }\n\n.pagination {\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.2rem; }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #2196F3;\n  border-color: #2196F3; }\n\n.page-item.disabled .page-link {\n  color: #636c72;\n  pointer-events: none;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #2196F3;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #0a6ebd;\n    text-decoration: none;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: normal;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.2rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\na.badge:focus, a.badge:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-default {\n  background-color: #636c72; }\n  .badge-default[href]:focus, .badge-default[href]:hover {\n    background-color: #4b5257; }\n\n.badge-primary {\n  background-color: #2196F3; }\n  .badge-primary[href]:focus, .badge-primary[href]:hover {\n    background-color: #0c7cd5; }\n\n.badge-success {\n  background-color: #66BB6A; }\n  .badge-success[href]:focus, .badge-success[href]:hover {\n    background-color: #49a54e; }\n\n.badge-info {\n  background-color: #00BCD4; }\n  .badge-info[href]:focus, .badge-info[href]:hover {\n    background-color: #008fa1; }\n\n.badge-warning {\n  background-color: #FFCA28; }\n  .badge-warning[href]:focus, .badge-warning[href]:hover {\n    background-color: #f4b800; }\n\n.badge-danger {\n  background-color: #EF5350; }\n  .badge-danger[href]:focus, .badge-danger[href]:hover {\n    background-color: #eb2521; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.2rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.2rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible .close {\n  position: relative;\n  top: -0.75rem;\n  right: -1.25rem;\n  padding: 0.75rem 1.25rem;\n  color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: flex;\n  overflow: hidden;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  text-align: center;\n  background-color: #eceeef;\n  border-radius: 0.2rem; }\n\n.progress-bar {\n  height: 1rem;\n  color: #fff;\n  background-color: #2196F3; }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  animation: progress-bar-stripes 1s linear infinite; }\n\n.media {\n  display: flex;\n  align-items: flex-start; }\n\n.media-body {\n  flex: 1; }\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #464a4c;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #292b2c; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #464a4c;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .list-group-item-action:active {\n    color: rgba(0, 0, 0, 0.87);\n    background-color: #eceeef; }\n\n.list-group-item {\n  position: relative;\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.2rem;\n    border-top-left-radius: 0.2rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.2rem;\n    border-bottom-left-radius: 0.2rem; }\n  .list-group-item:focus, .list-group-item:hover {\n    text-decoration: none; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #fff; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item:disabled .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item:disabled .list-group-item-text {\n      color: #636c72; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #2196F3;\n    border-color: #2196F3; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text {\n      color: white; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active,\n  button.list-group-item-success.active {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active,\n  button.list-group-item-info.active {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active,\n  button.list-group-item-warning.active {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active,\n  button.list-group-item-danger.active {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #ededed; }\n\n.bg-primary {\n  background-color: #2196F3 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #0c7cd5 !important; }\n\n.bg-success {\n  background-color: #66BB6A !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #49a54e !important; }\n\n.bg-info {\n  background-color: #00BCD4 !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #008fa1 !important; }\n\n.bg-warning {\n  background-color: #FFCA28 !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #f4b800 !important; }\n\n.bg-danger {\n  background-color: #EF5350 !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #eb2521 !important; }\n\n.bg-inverse {\n  background-color: #292b2c !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #101112 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.rounded {\n  border-radius: 0.2rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.rounded-0 {\n  border-radius: 0; }\n\n.clearfix::after {\n  display: block;\n  content: \"\";\n  clear: both; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: flex !important; }\n\n.d-inline-flex {\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: inline-flex !important; } }\n\n.flex-first {\n  order: -1; }\n\n.flex-last {\n  order: 1; }\n\n.flex-unordered {\n  order: 0; }\n\n.flex-row {\n  flex-direction: row !important; }\n\n.flex-column {\n  flex-direction: column !important; }\n\n.flex-row-reverse {\n  flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse !important; }\n\n.justify-content-start {\n  justify-content: flex-start !important; }\n\n.justify-content-end {\n  justify-content: flex-end !important; }\n\n.justify-content-center {\n  justify-content: center !important; }\n\n.justify-content-between {\n  justify-content: space-between !important; }\n\n.justify-content-around {\n  justify-content: space-around !important; }\n\n.align-items-start {\n  align-items: flex-start !important; }\n\n.align-items-end {\n  align-items: flex-end !important; }\n\n.align-items-center {\n  align-items: center !important; }\n\n.align-items-baseline {\n  align-items: baseline !important; }\n\n.align-items-stretch {\n  align-items: stretch !important; }\n\n.align-content-start {\n  align-content: flex-start !important; }\n\n.align-content-end {\n  align-content: flex-end !important; }\n\n.align-content-center {\n  align-content: center !important; }\n\n.align-content-between {\n  align-content: space-between !important; }\n\n.align-content-around {\n  align-content: space-around !important; }\n\n.align-content-stretch {\n  align-content: stretch !important; }\n\n.align-self-auto {\n  align-self: auto !important; }\n\n.align-self-start {\n  align-self: flex-start !important; }\n\n.align-self-end {\n  align-self: flex-end !important; }\n\n.align-self-center {\n  align-self: center !important; }\n\n.align-self-baseline {\n  align-self: baseline !important; }\n\n.align-self-stretch {\n  align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    order: -1; }\n  .flex-sm-last {\n    order: 1; }\n  .flex-sm-unordered {\n    order: 0; }\n  .flex-sm-row {\n    flex-direction: row !important; }\n  .flex-sm-column {\n    flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-sm-start {\n    justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    justify-content: center !important; }\n  .justify-content-sm-between {\n    justify-content: space-between !important; }\n  .justify-content-sm-around {\n    justify-content: space-around !important; }\n  .align-items-sm-start {\n    align-items: flex-start !important; }\n  .align-items-sm-end {\n    align-items: flex-end !important; }\n  .align-items-sm-center {\n    align-items: center !important; }\n  .align-items-sm-baseline {\n    align-items: baseline !important; }\n  .align-items-sm-stretch {\n    align-items: stretch !important; }\n  .align-content-sm-start {\n    align-content: flex-start !important; }\n  .align-content-sm-end {\n    align-content: flex-end !important; }\n  .align-content-sm-center {\n    align-content: center !important; }\n  .align-content-sm-between {\n    align-content: space-between !important; }\n  .align-content-sm-around {\n    align-content: space-around !important; }\n  .align-content-sm-stretch {\n    align-content: stretch !important; }\n  .align-self-sm-auto {\n    align-self: auto !important; }\n  .align-self-sm-start {\n    align-self: flex-start !important; }\n  .align-self-sm-end {\n    align-self: flex-end !important; }\n  .align-self-sm-center {\n    align-self: center !important; }\n  .align-self-sm-baseline {\n    align-self: baseline !important; }\n  .align-self-sm-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    order: -1; }\n  .flex-md-last {\n    order: 1; }\n  .flex-md-unordered {\n    order: 0; }\n  .flex-md-row {\n    flex-direction: row !important; }\n  .flex-md-column {\n    flex-direction: column !important; }\n  .flex-md-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-md-start {\n    justify-content: flex-start !important; }\n  .justify-content-md-end {\n    justify-content: flex-end !important; }\n  .justify-content-md-center {\n    justify-content: center !important; }\n  .justify-content-md-between {\n    justify-content: space-between !important; }\n  .justify-content-md-around {\n    justify-content: space-around !important; }\n  .align-items-md-start {\n    align-items: flex-start !important; }\n  .align-items-md-end {\n    align-items: flex-end !important; }\n  .align-items-md-center {\n    align-items: center !important; }\n  .align-items-md-baseline {\n    align-items: baseline !important; }\n  .align-items-md-stretch {\n    align-items: stretch !important; }\n  .align-content-md-start {\n    align-content: flex-start !important; }\n  .align-content-md-end {\n    align-content: flex-end !important; }\n  .align-content-md-center {\n    align-content: center !important; }\n  .align-content-md-between {\n    align-content: space-between !important; }\n  .align-content-md-around {\n    align-content: space-around !important; }\n  .align-content-md-stretch {\n    align-content: stretch !important; }\n  .align-self-md-auto {\n    align-self: auto !important; }\n  .align-self-md-start {\n    align-self: flex-start !important; }\n  .align-self-md-end {\n    align-self: flex-end !important; }\n  .align-self-md-center {\n    align-self: center !important; }\n  .align-self-md-baseline {\n    align-self: baseline !important; }\n  .align-self-md-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    order: -1; }\n  .flex-lg-last {\n    order: 1; }\n  .flex-lg-unordered {\n    order: 0; }\n  .flex-lg-row {\n    flex-direction: row !important; }\n  .flex-lg-column {\n    flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-lg-start {\n    justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    justify-content: center !important; }\n  .justify-content-lg-between {\n    justify-content: space-between !important; }\n  .justify-content-lg-around {\n    justify-content: space-around !important; }\n  .align-items-lg-start {\n    align-items: flex-start !important; }\n  .align-items-lg-end {\n    align-items: flex-end !important; }\n  .align-items-lg-center {\n    align-items: center !important; }\n  .align-items-lg-baseline {\n    align-items: baseline !important; }\n  .align-items-lg-stretch {\n    align-items: stretch !important; }\n  .align-content-lg-start {\n    align-content: flex-start !important; }\n  .align-content-lg-end {\n    align-content: flex-end !important; }\n  .align-content-lg-center {\n    align-content: center !important; }\n  .align-content-lg-between {\n    align-content: space-between !important; }\n  .align-content-lg-around {\n    align-content: space-around !important; }\n  .align-content-lg-stretch {\n    align-content: stretch !important; }\n  .align-self-lg-auto {\n    align-self: auto !important; }\n  .align-self-lg-start {\n    align-self: flex-start !important; }\n  .align-self-lg-end {\n    align-self: flex-end !important; }\n  .align-self-lg-center {\n    align-self: center !important; }\n  .align-self-lg-baseline {\n    align-self: baseline !important; }\n  .align-self-lg-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    order: -1; }\n  .flex-xl-last {\n    order: 1; }\n  .flex-xl-unordered {\n    order: 0; }\n  .flex-xl-row {\n    flex-direction: row !important; }\n  .flex-xl-column {\n    flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .justify-content-xl-start {\n    justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    justify-content: center !important; }\n  .justify-content-xl-between {\n    justify-content: space-between !important; }\n  .justify-content-xl-around {\n    justify-content: space-around !important; }\n  .align-items-xl-start {\n    align-items: flex-start !important; }\n  .align-items-xl-end {\n    align-items: flex-end !important; }\n  .align-items-xl-center {\n    align-items: center !important; }\n  .align-items-xl-baseline {\n    align-items: baseline !important; }\n  .align-items-xl-stretch {\n    align-items: stretch !important; }\n  .align-content-xl-start {\n    align-content: flex-start !important; }\n  .align-content-xl-end {\n    align-content: flex-end !important; }\n  .align-content-xl-center {\n    align-content: center !important; }\n  .align-content-xl-between {\n    align-content: space-between !important; }\n  .align-content-xl-around {\n    align-content: space-around !important; }\n  .align-content-xl-stretch {\n    align-content: stretch !important; }\n  .align-self-xl-auto {\n    align-self: auto !important; }\n  .align-self-xl-start {\n    align-self: flex-start !important; }\n  .align-self-xl-end {\n    align-self: flex-end !important; }\n  .align-self-xl-center {\n    align-self: center !important; }\n  .align-self-xl-baseline {\n    align-self: baseline !important; }\n  .align-self-xl-stretch {\n    align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n.sticky-top {\n  position: sticky;\n  top: 0;\n  z-index: 1030; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem 0.25rem !important; }\n\n.mt-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1 {\n  margin-left: 0.25rem !important; }\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important; }\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem 0.5rem !important; }\n\n.mt-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2 {\n  margin-left: 0.5rem !important; }\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important; }\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem 1rem !important; }\n\n.mt-3 {\n  margin-top: 1rem !important; }\n\n.mr-3 {\n  margin-right: 1rem !important; }\n\n.mb-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3 {\n  margin-left: 1rem !important; }\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4 {\n  margin-left: 1.5rem !important; }\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem 3rem !important; }\n\n.mt-5 {\n  margin-top: 3rem !important; }\n\n.mr-5 {\n  margin-right: 3rem !important; }\n\n.mb-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5 {\n  margin-left: 3rem !important; }\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem 0.25rem !important; }\n\n.pt-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1 {\n  padding-left: 0.25rem !important; }\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important; }\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem 0.5rem !important; }\n\n.pt-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2 {\n  padding-left: 0.5rem !important; }\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important; }\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem 1rem !important; }\n\n.pt-3 {\n  padding-top: 1rem !important; }\n\n.pr-3 {\n  padding-right: 1rem !important; }\n\n.pb-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3 {\n  padding-left: 1rem !important; }\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4 {\n  padding-left: 1.5rem !important; }\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem 3rem !important; }\n\n.pt-5 {\n  padding-top: 3rem !important; }\n\n.pr-5 {\n  padding-right: 3rem !important; }\n\n.pb-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5 {\n  padding-left: 3rem !important; }\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto {\n  margin-top: auto !important; }\n\n.mr-auto {\n  margin-right: auto !important; }\n\n.mb-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto {\n  margin-left: auto !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 0 !important; }\n  .mt-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0 {\n    margin-left: 0 !important; }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1 {\n    margin-left: 0.25rem !important; }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2 {\n    margin-left: 0.5rem !important; }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem 1rem !important; }\n  .mt-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3 {\n    margin-left: 1rem !important; }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4 {\n    margin-left: 1.5rem !important; }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem 3rem !important; }\n  .mt-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5 {\n    margin-left: 3rem !important; }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 0 !important; }\n  .pt-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0 {\n    padding-left: 0 !important; }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1 {\n    padding-left: 0.25rem !important; }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2 {\n    padding-left: 0.5rem !important; }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem 1rem !important; }\n  .pt-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3 {\n    padding-left: 1rem !important; }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4 {\n    padding-left: 1.5rem !important; }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem 3rem !important; }\n  .pt-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5 {\n    padding-left: 3rem !important; }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto {\n    margin-left: auto !important; }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 0 !important; }\n  .mt-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0 {\n    margin-left: 0 !important; }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1 {\n    margin-left: 0.25rem !important; }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2 {\n    margin-left: 0.5rem !important; }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem 1rem !important; }\n  .mt-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3 {\n    margin-left: 1rem !important; }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4 {\n    margin-left: 1.5rem !important; }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem 3rem !important; }\n  .mt-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5 {\n    margin-left: 3rem !important; }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-md-0 {\n    padding: 0 0 !important; }\n  .pt-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0 {\n    padding-left: 0 !important; }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1 {\n    padding-left: 0.25rem !important; }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2 {\n    padding-left: 0.5rem !important; }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem 1rem !important; }\n  .pt-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3 {\n    padding-left: 1rem !important; }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4 {\n    padding-left: 1.5rem !important; }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem 3rem !important; }\n  .pt-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5 {\n    padding-left: 3rem !important; }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto {\n    margin-left: auto !important; }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 0 !important; }\n  .mt-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0 {\n    margin-left: 0 !important; }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1 {\n    margin-left: 0.25rem !important; }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2 {\n    margin-left: 0.5rem !important; }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem 1rem !important; }\n  .mt-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3 {\n    margin-left: 1rem !important; }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4 {\n    margin-left: 1.5rem !important; }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem 3rem !important; }\n  .mt-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5 {\n    margin-left: 3rem !important; }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 0 !important; }\n  .pt-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0 {\n    padding-left: 0 !important; }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1 {\n    padding-left: 0.25rem !important; }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2 {\n    padding-left: 0.5rem !important; }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem 1rem !important; }\n  .pt-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3 {\n    padding-left: 1rem !important; }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4 {\n    padding-left: 1.5rem !important; }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem 3rem !important; }\n  .pt-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5 {\n    padding-left: 3rem !important; }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto {\n    margin-left: auto !important; }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 0 !important; }\n  .mt-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0 {\n    margin-left: 0 !important; }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1 {\n    margin-left: 0.25rem !important; }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2 {\n    margin-left: 0.5rem !important; }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem 1rem !important; }\n  .mt-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3 {\n    margin-left: 1rem !important; }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4 {\n    margin-left: 1.5rem !important; }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem 3rem !important; }\n  .mt-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5 {\n    margin-left: 3rem !important; }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 0 !important; }\n  .pt-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0 {\n    padding-left: 0 !important; }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1 {\n    padding-left: 0.25rem !important; }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2 {\n    padding-left: 0.5rem !important; }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem 1rem !important; }\n  .pt-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3 {\n    padding-left: 1rem !important; }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4 {\n    padding-left: 1.5rem !important; }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem 3rem !important; }\n  .pt-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5 {\n    padding-left: 3rem !important; }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto {\n    margin-left: auto !important; }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #636c72 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: #4b5257 !important; }\n\n.text-primary {\n  color: #2196F3 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #0c7cd5 !important; }\n\n.text-success {\n  color: #66BB6A !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #49a54e !important; }\n\n.text-info {\n  color: #00BCD4 !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #008fa1 !important; }\n\n.text-warning {\n  color: #FFCA28 !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #f4b800 !important; }\n\n.text-danger {\n  color: #EF5350 !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #eb2521 !important; }\n\n.text-gray-dark {\n  color: #292b2c !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #101112 !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n", ""]);

// exports


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\nhtml {\n  height: 100%;\n  background-color: #F5F5F5; }\n\nbody {\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\n.full-height {\n  height: 100% !important; }\n\n.app-header {\n  display: block;\n  position: relative;\n  z-index: 1000;\n  height: 60px;\n  width: 100%;\n  background-color: #fff; }\n  .app-header .toggle-sidebar {\n    display: block; }\n\n.fixed-header .app-header {\n  position: fixed;\n  left: 0;\n  top: 0;\n  right: 0; }\n\n@media only screen and (min-width: 992px) {\n  .app-header .toggle-sidebar-btn {\n    display: none; }\n  .app-header .brand {\n    display: inline-block;\n    width: 250px;\n    padding: 0 0 0 64px;\n    transition: padding 0.25s cubic-bezier(0, 0, 0.2, 1); }\n    .app-header .brand a {\n      text-decoration: none;\n      font-weight: normal; }\n  .nav-behind .app-header .brand {\n    padding-left: 0; } }\n\n.app-sidebar {\n  display: block;\n  z-index: 99;\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  top: 0;\n  height: 100vh;\n  width: 250px;\n  overflow: hidden;\n  background-color: #292b2c; }\n  .app-sidebar .sidebar-header {\n    display: block;\n    position: relative;\n    height: 60px; }\n  .app-sidebar .sidebar-footer {\n    background-color: #292b2c; }\n\n@media only screen and (min-width: 992px) {\n  .app-sidebar {\n    z-index: 1001;\n    overflow-x: hidden; } }\n\n.app-page-container {\n  width: 100%;\n  height: 100%; }\n  .app-page-container .app-content-wrapper {\n    min-height: 100%;\n    position: relative;\n    background-color: #fff; }\n    .app-page-container .app-content-wrapper .app-content {\n      z-index: 10;\n      padding-bottom: 44px;\n      min-height: 100%;\n      transition: all 0.3s ease; }\n      .app-page-container .app-content-wrapper .app-content.full-width {\n        width: 100%; }\n\n.fixed-header .app-page-container .app-content-wrapper .app-content {\n  padding-top: 60px; }\n\n.app-page-container.scroll-disabled {\n  overflow: hidden; }\n\n@media only screen and (max-width: 991px) {\n  .app-page-container {\n    position: relative;\n    z-index: 100;\n    padding-left: 0;\n    transition: transform .25s ease;\n    background-color: #fff; }\n    .app-page-container .app-content-wrapper .app-content {\n      overflow-x: hidden; }\n  .sidebar-mobile-open .app-page-container {\n    overflow: hidden;\n    position: fixed;\n    transform: translateX(250px); } }\n\n@media only screen and (min-width: 992px) {\n  .app-page-container .app-content-wrapper .app-content {\n    padding-left: 250px; }\n  .app-page-container .app-content-wrapper .app-footer {\n    left: 250px; }\n  .nav-collapsed .app-page-container .app-content-wrapper .app-content {\n    padding-left: 64px; }\n  .nav-collapsed .app-page-container .app-content-wrapper .app-footer {\n    left: 64px; } }\n\n.app-page-container .app-footer {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  transition: left 0.3s cubic-bezier(0, 0, 0.2, 1); }\n  .app-page-container .app-footer.fixed {\n    position: fixed; }\n\n.app-page-container .app-footer {\n  padding: 13px 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n  font-size: 11px;\n  line-height: 17px;\n  color: #636c72; }\n  .app-page-container .app-footer .brand {\n    color: rgba(0, 0, 0, 0.87);\n    text-transform: uppercase;\n    letter-spacing: 0.02em; }\n  .app-page-container .app-footer .material-icons {\n    font-size: 0.875rem;\n    vertical-align: text-top; }\n\n.quickview-wrapper {\n  z-index: 1001;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  height: 100vh;\n  right: -300px;\n  width: 300px;\n  background: #fff;\n  transition: right 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);\n  backface-visibility: hidden; }\n\n.quickview-open .quickview-wrapper {\n  right: 0; }\n\n.quickview-wrapper {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); }\n\n.app-overlay {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .3s ease,  visibility .3s ease;\n  z-index: 1040;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: #fff;\n  overflow: hidden; }\n  .app-overlay .overlay-close {\n    position: absolute;\n    right: 20px;\n    top: 25px; }\n\n.overlay-active .app-overlay {\n  visibility: visible;\n  opacity: 1; }\n\n.app-main {\n  max-width: 100%;\n  margin: auto;\n  transition: max-width .35s ease; }\n  .app-main .app-sidebar {\n    left: auto; }\n  .app-main .app-header > .app-header-inner {\n    max-width: 100%;\n    margin: auto;\n    transition: max-width .35s ease; }\n\n@media only screen and (min-width: 992px) {\n  .layout-boxed.app-main {\n    max-width: 1200px;\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2); }\n    .layout-boxed.app-main .app-header > .app-header-inner {\n      max-width: 1200px;\n      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); }\n    .layout-boxed.app-main .app-overlay > .app-overlay-inner {\n      max-width: 1200px;\n      margin: auto; } }\n\n@media only screen and (max-width: 991px) {\n  .no-app-sidebar + .app-page-container .app-header .header-icon {\n    display: none; } }\n\n@media only screen and (min-width: 992px) {\n  .no-app-sidebar + .app-page-container .app-header .brand {\n    padding-left: 0; }\n  .no-app-sidebar + .app-page-container .app-content-wrapper .app-content {\n    padding-left: 0; }\n  .no-app-sidebar + .app-page-container .app-content-wrapper .app-footer {\n    left: 0; } }\n\n.app-sidebar ul.nav {\n  flex-direction: column; }\n  .app-sidebar ul.nav ul {\n    display: none; }\n  .app-sidebar ul.nav li {\n    position: relative; }\n    .app-sidebar ul.nav li.open > .icon-has-ul {\n      transform: rotate(-180deg); }\n  .app-sidebar ul.nav .icon-has-ul {\n    position: absolute;\n    top: 12px;\n    right: 15px;\n    font-size: 18px;\n    line-height: 1;\n    color: #777;\n    transition: transform .3s ease-in-out; }\n  .app-sidebar ul.nav ul .icon-has-ul {\n    top: 11px; }\n  .app-sidebar ul.nav .nav-divider {\n    background-color: rgba(0, 0, 0, 0.15);\n    min-height: 1px;\n    margin: 10px 0 10px;\n    overflow: hidden; }\n\n.app-sidebar .sidebar-content {\n  height: calc(100% - 104px); }\n\n.sidebar-header a.collapsednav-toggler {\n  display: inline-block;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n  right: 18px;\n  top: 20px;\n  color: rgba(255, 255, 255, 0.55); }\n  .sidebar-header a.collapsednav-toggler .material-icons {\n    font-size: 12px; }\n\n@media only screen and (max-width: 991px) {\n  .app-sidebar .sidebar-header a.collapsednav-toggler {\n    display: none; } }\n\n.app-sidebar .sidebar-header {\n  text-align: left; }\n  .app-sidebar .sidebar-header .logo-icon {\n    margin-right: 11px; }\n  .app-sidebar .sidebar-header .logo-img {\n    margin-right: 16px; }\n  .app-sidebar .sidebar-header .brand {\n    display: inline; }\n  .app-sidebar .sidebar-header .collapsednav-toggler {\n    display: inline-block; }\n\n.app-sidebar .sidebar-content .nav-header {\n  display: block; }\n\n.app-sidebar .sidebar-content .nav-text {\n  display: inline; }\n\n.app-sidebar .sidebar-content .icon-has-ul {\n  display: inherit; }\n\n.app-sidebar .sidebar-content .badge {\n  display: inherit;\n  top: 14px;\n  right: 35px; }\n\n.app-sidebar .sidebar-content .nav > li > a {\n  padding: 10px 16px !important;\n  text-align: left !important; }\n  .app-sidebar .sidebar-content .nav > li > a .nav-icon {\n    transition: padding 0.35s cubic-bezier(0, 0, 0.2, 1), margin 0.35s cubic-bezier(0, 0, 0.2, 1);\n    margin-right: 18px; }\n\n.app-sidebar .sidebar-content .nav > li ul li > a {\n  text-align: left !important; }\n  .app-sidebar .sidebar-content .nav > li ul li > a > span {\n    display: inline; }\n  .app-sidebar .sidebar-content .nav > li ul li > a > .material-icons {\n    transition: margin 0.35s cubic-bezier(0, 0, 0.2, 1);\n    margin-right: 18px; }\n  .app-sidebar .sidebar-content .nav > li ul li > a > div > span {\n    display: inline; }\n  .app-sidebar .sidebar-content .nav > li ul li > a > div > .material-icons {\n    transition: margin 0.35s cubic-bezier(0, 0, 0.2, 1);\n    margin-right: 18px; }\n\n.app-sidebar .sidebar-footer .nav-text {\n  display: inline; }\n\n.app-sidebar .sidebar-footer .nav > li > a {\n  padding: 10px 16px !important;\n  text-align: left !important; }\n  .app-sidebar .sidebar-footer .nav > li > a .nav-icon {\n    margin-right: 15px; }\n\n@media only screen and (min-width: 992px) {\n  .app-sidebar {\n    transition: width 0.3s cubic-bezier(0, 0, 0.2, 1);\n    white-space: nowrap; }\n  .nav-collapsed .app-sidebar {\n    width: 64px; }\n    .nav-collapsed .app-sidebar .sidebar-header {\n      text-align: center; }\n      .nav-collapsed .app-sidebar .sidebar-header .logo-icon,\n      .nav-collapsed .app-sidebar .sidebar-header .logo-img {\n        margin-right: 0; }\n      .nav-collapsed .app-sidebar .sidebar-header .brand {\n        display: none; }\n      .nav-collapsed .app-sidebar .sidebar-header .collapsednav-toggler {\n        display: none; }\n    .nav-collapsed .app-sidebar .sidebar-content .nav-header,\n    .nav-collapsed .app-sidebar .sidebar-content .nav-text,\n    .nav-collapsed .app-sidebar .sidebar-content .icon-has-ul,\n    .nav-collapsed .app-sidebar .sidebar-content .nav ul a > span {\n      display: none; }\n    .nav-collapsed .app-sidebar .sidebar-content .nav ul a > div > span {\n      display: none; }\n    .nav-collapsed .app-sidebar .sidebar-content .badge {\n      top: 3px;\n      right: 5px; }\n    .nav-collapsed .app-sidebar .sidebar-content .nav > li > a {\n      padding: 12px 16px !important;\n      text-align: center !important; }\n    .nav-collapsed .app-sidebar .sidebar-content .nav > li .nav-icon {\n      margin-right: 0; }\n    .nav-collapsed .app-sidebar .sidebar-content .nav > li ul li > a {\n      text-align: center !important; }\n      .nav-collapsed .app-sidebar .sidebar-content .nav > li ul li > a > .material-icons {\n        margin-right: 0; }\n      .nav-collapsed .app-sidebar .sidebar-content .nav > li ul li > a > div > .material-icons {\n        margin-right: 0; }\n    .nav-collapsed .app-sidebar .sidebar-footer .nav-text {\n      display: none; }\n    .nav-collapsed .app-sidebar .sidebar-footer .nav > li > a {\n      text-align: center !important; }\n    .nav-collapsed .app-sidebar .sidebar-footer .nav > li .nav-icon {\n      margin-right: 0; }\n  .nav-collapsed .app-sidebar:hover {\n    width: 250px; }\n    .nav-collapsed .app-sidebar:hover > * {\n      width: 250px; }\n    .nav-collapsed .app-sidebar:hover .sidebar-header {\n      text-align: left; }\n      .nav-collapsed .app-sidebar:hover .sidebar-header .logo-icon {\n        margin-right: 11px; }\n      .nav-collapsed .app-sidebar:hover .sidebar-header .logo-img {\n        margin-right: 16px; }\n      .nav-collapsed .app-sidebar:hover .sidebar-header .brand {\n        display: inline; }\n      .nav-collapsed .app-sidebar:hover .sidebar-header .collapsednav-toggler {\n        display: inline-block; }\n    .nav-collapsed .app-sidebar:hover .sidebar-content .nav-header {\n      display: block; }\n    .nav-collapsed .app-sidebar:hover .sidebar-content .nav-text {\n      display: inline; }\n    .nav-collapsed .app-sidebar:hover .sidebar-content .icon-has-ul {\n      display: inherit; }\n    .nav-collapsed .app-sidebar:hover .sidebar-content .badge {\n      display: inherit;\n      top: 14px;\n      right: 35px; }\n    .nav-collapsed .app-sidebar:hover .sidebar-content .nav > li > a {\n      padding: 10px 16px !important;\n      text-align: left !important; }\n      .nav-collapsed .app-sidebar:hover .sidebar-content .nav > li > a .nav-icon {\n        transition: padding 0.35s cubic-bezier(0, 0, 0.2, 1), margin 0.35s cubic-bezier(0, 0, 0.2, 1);\n        margin-right: 18px; }\n    .nav-collapsed .app-sidebar:hover .sidebar-content .nav > li ul li > a {\n      text-align: left !important; }\n      .nav-collapsed .app-sidebar:hover .sidebar-content .nav > li ul li > a > span {\n        display: inline; }\n      .nav-collapsed .app-sidebar:hover .sidebar-content .nav > li ul li > a > .material-icons {\n        transition: margin 0.35s cubic-bezier(0, 0, 0.2, 1);\n        margin-right: 18px; }\n      .nav-collapsed .app-sidebar:hover .sidebar-content .nav > li ul li > a > div > span {\n        display: inline; }\n      .nav-collapsed .app-sidebar:hover .sidebar-content .nav > li ul li > a > div > .material-icons {\n        transition: margin 0.35s cubic-bezier(0, 0, 0.2, 1);\n        margin-right: 18px; }\n    .nav-collapsed .app-sidebar:hover .sidebar-footer .nav-text {\n      display: inline; }\n    .nav-collapsed .app-sidebar:hover .sidebar-footer .nav > li > a {\n      padding: 10px 16px !important;\n      text-align: left !important; }\n      .nav-collapsed .app-sidebar:hover .sidebar-footer .nav > li > a .nav-icon {\n        margin-right: 15px; } }\n\n@media only screen and (min-width: 992px) {\n  .nav-behind .app-sidebar {\n    z-index: 999; } }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-sm.nav-collapsed .app-page-container .app-content-wrapper .app-content,\n  .sidebar-lg.nav-collapsed .app-page-container .app-content-wrapper .app-content {\n    padding-left: 64px; }\n  .sidebar-sm.nav-collapsed .app-page-container .app-content-wrapper .app-footer,\n  .sidebar-lg.nav-collapsed .app-page-container .app-content-wrapper .app-footer {\n    left: 64px; } }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-sm.nav-collapsed .app-sidebar,\n  .sidebar-lg.nav-collapsed .app-sidebar {\n    width: 64px; } }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-sm .app-header .brand {\n    width: 220px; } }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-sm .app-page-container .app-content-wrapper .app-content {\n    padding-left: 220px; }\n  .sidebar-sm .app-page-container .app-content-wrapper .app-footer {\n    left: 220px; } }\n\n@media only screen and (max-width: 991px) {\n  .sidebar-sm.sidebar-mobile-open .app-page-container {\n    transform: translateX(220px); } }\n\n.sidebar-sm .app-sidebar {\n  width: 220px; }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-sm.nav-collapsed .app-sidebar:hover {\n    width: 220px; }\n    .sidebar-sm.nav-collapsed .app-sidebar:hover > * {\n      width: 220px; } }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-lg .app-header .brand {\n    width: 280px; } }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-lg .app-page-container .app-content-wrapper .app-content {\n    padding-left: 280px; }\n  .sidebar-lg .app-page-container .app-content-wrapper .app-footer {\n    left: 280px; } }\n\n@media only screen and (max-width: 991px) {\n  .sidebar-lg.sidebar-mobile-open .app-page-container {\n    transform: translateX(280px); } }\n\n.sidebar-lg .app-sidebar {\n  width: 280px; }\n\n@media only screen and (min-width: 992px) {\n  .sidebar-lg.nav-collapsed .app-sidebar:hover {\n    width: 280px; }\n    .sidebar-lg.nav-collapsed .app-sidebar:hover > * {\n      width: 280px; } }\n\n.app-header {\n  padding: 0;\n  border: 0;\n  text-align: center; }\n  .app-header .app-header-inner {\n    height: 60px;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); }\n  @media only screen and (min-width: 992px) {\n    .app-header {\n      text-align: inherit; } }\n  .app-header.bg-transparent {\n    background-color: transparent !important; }\n  .app-header .brand {\n    display: inline-block;\n    text-align: center;\n    float: left; }\n    .app-header .brand h2 {\n      font-size: 30px;\n      margin: 0;\n      line-height: 60px; }\n  .app-header .header-icon {\n    display: inline-block;\n    height: 60px;\n    padding: 18px 14px; }\n    @media only screen and (min-width: 992px) {\n      .app-header .header-icon {\n        padding-left: 18px;\n        padding-right: 18px; } }\n    .app-header .header-icon .material-icons {\n      font-size: 24px; }\n\n.top-nav-left > ul > .list-inline-item,\n.top-nav-right > ul > .list-inline-item {\n  margin: 0;\n  padding: 0; }\n\n.top-nav-left {\n  display: inline-block; }\n  .top-nav-left > ul {\n    display: inline;\n    margin: 0; }\n\n.top-nav-right {\n  display: inline-block;\n  font-size: 16px;\n  line-height: 24px;\n  float: right; }\n  .top-nav-right ul {\n    margin: 0; }\n  .top-nav-right li {\n    height: 60px;\n    float: left; }\n  .top-nav-right a:hover, .top-nav-right a:focus {\n    text-decoration: none; }\n\n.logo-img {\n  width: 24px;\n  height: 24px;\n  margin-bottom: -3px;\n  margin-right: 12px; }\n  .logo-img .st1 {\n    opacity: .9; }\n\n.bg-color-dark > .logo-img .st0,\n.bg-color-primary > .logo-img .st0,\n.bg-color-info > .logo-img .st0,\n.bg-color-danger > .logo-img .st0,\n.bg-color-success > .logo-img .st0 {\n  fill: #fff; }\n\n.bg-color-warning > .logo-img .st0,\n.bg-color-light > .logo-img .st0 {\n  fill: rgba(0, 0, 0, 0.87); }\n\n.app-sidebar {\n  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.15); }\n  .app-sidebar .sidebar-header {\n    line-height: 60px;\n    padding: 0 18px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); }\n    .app-sidebar .sidebar-header .logo-icon {\n      text-align: center;\n      font-size: 24px; }\n      .app-sidebar .sidebar-header .logo-icon.material-icons {\n        line-height: 60px;\n        height: 60px;\n        vertical-align: sub; }\n    .app-sidebar .sidebar-header a.brand {\n      display: inline-block;\n      font-weight: normal;\n      font-size: 23px;\n      line-height: 60px;\n      text-decoration: none; }\n  .app-sidebar .sidebar-footer {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 44px;\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    background-color: #333C44; }\n\n.app-sidebar .nav a {\n  display: block;\n  position: relative;\n  text-decoration: none; }\n  .app-sidebar .nav a:hover {\n    cursor: pointer; }\n\n.app-sidebar .nav li {\n  position: relative; }\n  .app-sidebar .nav li .badge {\n    position: absolute;\n    padding: 3px 6px; }\n\n.app-sidebar .nav .nav-header {\n  margin: 15px 15px 5px;\n  font-size: 0.875rem; }\n\n.app-sidebar .nav .nav-divider + .nav-header {\n  margin-top: 5px; }\n\n.app-sidebar .nav > li > a {\n  line-height: 24px; }\n\n.app-sidebar .nav .nav-icon {\n  display: inline-block; }\n  .app-sidebar .nav .nav-icon.material-icons {\n    width: 24px;\n    height: 24px;\n    font-size: 18px;\n    line-height: 24px;\n    text-align: center; }\n    .app-sidebar .nav .nav-icon.material-icons.nav-dot {\n      font-size: 16px; }\n\n.app-sidebar .nav ul {\n  list-style: none;\n  padding: 0; }\n  .app-sidebar .nav ul li > a {\n    padding: 10px 18px !important; }\n    .app-sidebar .nav ul li > a .material-icons {\n      width: 20px;\n      height: 20px;\n      font-size: 16px;\n      line-height: 1;\n      text-align: center;\n      vertical-align: middle;\n      margin-bottom: -2px; }\n\n.app-sidebar .nav ul ul li > a {\n  padding: 10px 15px 10px 56px !important; }\n\n.app-sidebar .nav ul ul ul li > a {\n  padding-left: 74px !important; }\n\n.app-sidebar {\n  background-color: #333C44; }\n  .app-sidebar .nav {\n    color: #a1a1a1 !important; }\n    .app-sidebar .nav a {\n      color: #a1a1a1 !important; }\n    .app-sidebar .nav .nav-header {\n      color: #636c72; }\n    .app-sidebar .nav .nav-divider {\n      background-color: rgba(0, 0, 0, 0.15); }\n    .app-sidebar .nav li > a:hover, .app-sidebar .nav li > a:focus {\n      background-color: transparent !important;\n      color: #fafafa !important; }\n    .app-sidebar .nav li.active > a,\n    .app-sidebar .nav li.active > a:hover,\n    .app-sidebar .nav li.active > a:focus {\n      background-color: transparent !important;\n      color: #fafafa !important; }\n    .app-sidebar .nav li.open > a,\n    .app-sidebar .nav li.open > a:hover,\n    .app-sidebar .nav li.open > a:focus {\n      background-color: rgba(0, 0, 0, 0.1) !important;\n      color: #fafafa !important; }\n    .app-sidebar .nav ul {\n      background-color: rgba(0, 0, 0, 0.1); }\n      .app-sidebar .nav ul li.active > a,\n      .app-sidebar .nav ul li.active > a:hover,\n      .app-sidebar .nav ul li.active > a:focus, .app-sidebar .nav ul li.open > a,\n      .app-sidebar .nav ul li.open > a:hover,\n      .app-sidebar .nav ul li.open > a:focus {\n        background-color: rgba(0, 0, 0, 0.1); }\n    .app-sidebar .nav ul ul {\n      background-color: rgba(0, 0, 0, 0.1); }\n      .app-sidebar .nav ul ul > li.active > a,\n      .app-sidebar .nav ul ul > li.active > a:hover,\n      .app-sidebar .nav ul ul > li.active > a:focus, .app-sidebar .nav ul ul > li.open > a,\n      .app-sidebar .nav ul ul > li.open > a:hover,\n      .app-sidebar .nav ul ul > li.open > a:focus {\n        background-color: rgba(0, 0, 0, 0.1);\n        color: #fafafa; }\n    .app-sidebar .nav ul ul ul {\n      background-color: rgba(0, 0, 0, 0.1); }\n\n.app-overlay .app-overlay-inner {\n  max-width: 1090px;\n  margin: 0 auto;\n  padding: 20px 30px; }\n  @media only screen and (min-width: 768px) {\n    .app-overlay .app-overlay-inner {\n      padding: 20px 100px; } }\n\n.app-overlay input.overlay-search-input {\n  border: 0;\n  background-color: transparent;\n  font-size: 35px;\n  font-weight: normal;\n  width: 100%;\n  padding-left: 0;\n  line-height: 1; }\n  @media only screen and (min-width: 768px) {\n    .app-overlay input.overlay-search-input {\n      font-size: 70px; } }\n  .app-overlay input.overlay-search-input:focus {\n    outline: none; }\n\n.app-overlay .overlay-header {\n  position: relative;\n  padding: 60px 0 0; }\n  .app-overlay .overlay-header h2 {\n    font-size: 18px;\n    font-weight: normal;\n    margin: 0; }\n    @media only screen and (min-width: 768px) {\n      .app-overlay .overlay-header h2 {\n        font-size: 24px; } }\n\n.app-overlay a.overlay-close {\n  position: absolute;\n  top: 0;\n  right: 10px;\n  font-weight: 300; }\n  .app-overlay a.overlay-close .material-icons {\n    font-size: 32px; }\n\n.app-overlay .overlay-content {\n  margin: 12px 0 0; }\n\n.app-overlay {\n  background: rgba(255, 255, 255, 0.9); }\n  .app-overlay a.overlay-close {\n    color: rgba(0, 0, 0, 0.87); }\n\n.quickview-open-app #quickview-app {\n  right: 0; }\n\n.quickview-app .quickview-close {\n  display: inline-block;\n  z-index: 1;\n  position: absolute;\n  top: 11px;\n  right: 15px;\n  line-height: 24px;\n  color: rgba(0, 0, 0, 0.87);\n  opacity: .6; }\n  .quickview-app .quickview-close .material-icons {\n    font-size: 1rem;\n    vertical-align: middle; }\n  .quickview-app .quickview-close:hover {\n    opacity: 1; }\n\n#quickview-customizer {\n  width: 410px;\n  right: -410px; }\n\n.quickview-open-customizer #quickview-customizer {\n  right: 0; }\n\n.customizer {\n  padding: 0;\n  background-color: #fafafa; }\n  .customizer .quickview-inner {\n    padding: 15px 45px; }\n  .customizer .customizer-header {\n    text-transform: uppercase;\n    margin-bottom: 3px; }\n  .customizer h4.section-header {\n    margin: 12px 0 0;\n    font-size: 16px;\n    line-height: 1.35;\n    font-weight: normal; }\n  .customizer a {\n    position: relative;\n    display: block;\n    width: 100%;\n    color: rgba(0, 0, 0, 0.87); }\n  .customizer .customizer-close {\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    padding: 7px;\n    width: auto;\n    z-index: 10; }\n    .customizer .customizer-close .material-icons {\n      font-size: 20px; }\n  .customizer a.customizer-toggle,\n  .customizer a.customizer-close {\n    color: rgba(0, 0, 0, 0.87); }\n    .customizer a.customizer-toggle:hover, .customizer a.customizer-toggle:focus,\n    .customizer a.customizer-close:hover,\n    .customizer a.customizer-close:focus {\n      color: rgba(0, 0, 0, 0.87); }\n  .customizer .customizer-toggle {\n    position: absolute;\n    top: 25%;\n    width: 54px;\n    height: 50px;\n    left: -48px;\n    text-align: center;\n    line-height: 50px;\n    cursor: pointer; }\n    .customizer .customizer-toggle .material-icons {\n      font-size: 16px;\n      line-height: 50px; }\n  .customizer:before {\n    position: absolute;\n    content: '';\n    top: 25%;\n    left: -47px;\n    width: 48px;\n    height: 50px;\n    background-color: #fafafa;\n    box-shadow: 0 0 9px rgba(0, 0, 0, 0.1);\n    border-left: 1px solid #e5e5e5;\n    border-radius: 0 4px 4px 0; }\n  .customizer:after {\n    position: absolute;\n    top: 25%;\n    left: 0;\n    content: '';\n    width: 5px;\n    height: 50px;\n    background-color: #fafafa; }\n  .customizer md-list {\n    padding: 0; }\n  .customizer md-list-item, .customizer md-list-item ._md-list-item-inner {\n    min-height: 40px; }\n  .customizer md-list-item ._md-no-style, .customizer md-list-item._md-no-proxy {\n    padding: 0 5px; }\n\n.top-nav-left li .header-btn.md-button,\n.top-nav-right li .header-btn.md-button {\n  margin: 0;\n  line-height: 60px;\n  border-radius: 0;\n  min-width: 52px; }\n  @media only screen and (min-width: 992px) {\n    .top-nav-left li .header-btn.md-button,\n    .top-nav-right li .header-btn.md-button {\n      min-width: 60px; } }\n  .top-nav-left li .header-btn.md-button > .material-icons,\n  .top-nav-right li .header-btn.md-button > .material-icons {\n    vertical-align: middle; }\n  .top-nav-left li .header-btn.md-button .badge,\n  .top-nav-right li .header-btn.md-button .badge {\n    background-color: transparent;\n    position: absolute;\n    top: 6px;\n    right: 3px;\n    color: inherit; }\n\n.app-sidebar .md-button {\n  margin: 0;\n  text-align: left;\n  text-transform: none;\n  border-radius: 0;\n  font-weight: normal;\n  line-height: inherit;\n  min-height: inherit;\n  min-width: inherit; }\n\n.quickview-app md-tabs > md-tabs-wrapper {\n  background-color: #eee;\n  padding: 0 40px; }\n\n.quickview-app md-tabs md-pagination-wrapper {\n  width: 100% !important; }\n\nmd-backdrop.md-sidenav-backdrop,\n.md-sidenav-right {\n  z-index: 1001; }\n\n.md-sidenav-right .md-sidenav-inner {\n  height: 100%; }\n  .md-sidenav-right .md-sidenav-inner > md-tabs {\n    height: 100%; }\n\n.md-sidenav-right md-tabs-canvas > md-pagination-wrapper {\n  width: 100% !important; }\n  .md-sidenav-right md-tabs-canvas > md-pagination-wrapper > md-tab-item {\n    width: 50%; }\n  .md-sidenav-right md-tabs-canvas > md-pagination-wrapper md-ink-bar {\n    color: #2196F3;\n    background: #2196F3; }\n", ""]);

// exports


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.bg-color-dark .bg-color-light a {\n  color: rgba(0, 0, 0, 0.87); }\n\n.bg-color-body {\n  background-color: #F5F5F5;\n  color: rgba(0, 0, 0, 0.87); }\n  .bg-color-body:hover {\n    background-color: #F5F5F5;\n    color: rgba(0, 0, 0, 0.87); }\n  .bg-color-body a {\n    color: rgba(0, 0, 0, 0.87); }\n    .bg-color-body a:hover {\n      color: rgba(0, 0, 0, 0.87); }\n\n.bg-color-page {\n  background-color: #f5f5f5;\n  color: rgba(0, 0, 0, 0.87); }\n  .bg-color-page:hover {\n    background-color: #f5f5f5;\n    color: rgba(0, 0, 0, 0.87); }\n  .bg-color-page a {\n    color: rgba(0, 0, 0, 0.87); }\n    .bg-color-page a:hover {\n      color: rgba(0, 0, 0, 0.87); }\n\n.bg-color-light {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.87); }\n  .bg-color-light:hover {\n    background-color: #fff;\n    color: rgba(0, 0, 0, 0.87); }\n  .bg-color-light a {\n    color: rgba(0, 0, 0, 0.87); }\n    .bg-color-light a:hover {\n      color: rgba(0, 0, 0, 0.87); }\n\n.bg-color-white {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.87); }\n  .bg-color-white:hover {\n    background-color: #fff;\n    color: rgba(0, 0, 0, 0.87); }\n  .bg-color-white a {\n    color: rgba(0, 0, 0, 0.87); }\n    .bg-color-white a:hover {\n      color: rgba(0, 0, 0, 0.87); }\n\n.bg-color-gray {\n  background-color: #636c72;\n  color: #fff; }\n  .bg-color-gray:hover {\n    background-color: #636c72;\n    color: #fff; }\n  .bg-color-gray a {\n    color: #fff; }\n    .bg-color-gray a:hover {\n      color: #fff; }\n\n.bg-color-dark {\n  background-color: #333C44;\n  color: #fff; }\n  .bg-color-dark:hover {\n    background-color: #333C44;\n    color: #fff; }\n  .bg-color-dark a {\n    color: #fff; }\n    .bg-color-dark a:hover {\n      color: #fff; }\n\n.bg-color-primary {\n  background-color: #2196F3;\n  color: #fff; }\n  .bg-color-primary:hover {\n    background-color: #2196F3;\n    color: #fff; }\n  .bg-color-primary a {\n    color: #fff; }\n    .bg-color-primary a:hover {\n      color: #fff; }\n\n.bg-color-success {\n  background-color: #66BB6A;\n  color: #fff; }\n  .bg-color-success:hover {\n    background-color: #66BB6A;\n    color: #fff; }\n  .bg-color-success a {\n    color: #fff; }\n    .bg-color-success a:hover {\n      color: #fff; }\n\n.bg-color-info {\n  background-color: #00BCD4;\n  color: #fff; }\n  .bg-color-info:hover {\n    background-color: #00BCD4;\n    color: #fff; }\n  .bg-color-info a {\n    color: #fff; }\n    .bg-color-info a:hover {\n      color: #fff; }\n\n.bg-color-info-alt {\n  background-color: #7E57C2;\n  color: #fff; }\n  .bg-color-info-alt:hover {\n    background-color: #7E57C2;\n    color: #fff; }\n  .bg-color-info-alt a {\n    color: #fff; }\n    .bg-color-info-alt a:hover {\n      color: #fff; }\n\n.bg-color-warning {\n  background-color: #FFCA28;\n  color: rgba(0, 0, 0, 0.87); }\n  .bg-color-warning:hover {\n    background-color: #FFCA28;\n    color: rgba(0, 0, 0, 0.87); }\n  .bg-color-warning a {\n    color: rgba(0, 0, 0, 0.87); }\n    .bg-color-warning a:hover {\n      color: rgba(0, 0, 0, 0.87); }\n\n.bg-color-danger {\n  background-color: #EF5350;\n  color: #fff; }\n  .bg-color-danger:hover {\n    background-color: #EF5350;\n    color: #fff; }\n  .bg-color-danger a {\n    color: #fff; }\n    .bg-color-danger a:hover {\n      color: #fff; }\n\n.mdl-data-table tbody .bg-color-dark {\n  background-color: #333C44;\n  color: #fff; }\n  .mdl-data-table tbody .bg-color-dark:hover {\n    background-color: #333C44;\n    color: #fff; }\n  .mdl-data-table tbody .bg-color-dark a {\n    color: #fff; }\n    .mdl-data-table tbody .bg-color-dark a:hover {\n      color: #fff; }\n\n.mdl-data-table tbody .bg-color-primary {\n  background-color: #2196F3;\n  color: #fff; }\n  .mdl-data-table tbody .bg-color-primary:hover {\n    background-color: #2196F3;\n    color: #fff; }\n  .mdl-data-table tbody .bg-color-primary a {\n    color: #fff; }\n    .mdl-data-table tbody .bg-color-primary a:hover {\n      color: #fff; }\n\n.mdl-data-table tbody .bg-color-success {\n  background-color: #66BB6A;\n  color: #fff; }\n  .mdl-data-table tbody .bg-color-success:hover {\n    background-color: #66BB6A;\n    color: #fff; }\n  .mdl-data-table tbody .bg-color-success a {\n    color: #fff; }\n    .mdl-data-table tbody .bg-color-success a:hover {\n      color: #fff; }\n\n.mdl-data-table tbody .bg-color-info {\n  background-color: #00BCD4;\n  color: #fff; }\n  .mdl-data-table tbody .bg-color-info:hover {\n    background-color: #00BCD4;\n    color: #fff; }\n  .mdl-data-table tbody .bg-color-info a {\n    color: #fff; }\n    .mdl-data-table tbody .bg-color-info a:hover {\n      color: #fff; }\n\n.mdl-data-table tbody .bg-color-danger {\n  background-color: #EF5350;\n  color: #fff; }\n  .mdl-data-table tbody .bg-color-danger:hover {\n    background-color: #EF5350;\n    color: #fff; }\n  .mdl-data-table tbody .bg-color-danger a {\n    color: #fff; }\n    .mdl-data-table tbody .bg-color-danger a:hover {\n      color: #fff; }\n\n.color-option-check {\n  position: relative;\n  display: block; }\n  .color-option-check input[type=\"radio\"] {\n    display: none; }\n  .color-option-check input[type=\"radio\"] + span:hover {\n    cursor: pointer; }\n  .color-option-check input[type=\"radio\"] + span {\n    position: relative; }\n    .color-option-check input[type=\"radio\"] + span > .overlay {\n      display: none;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: rgba(0, 0, 0, 0.3);\n      text-align: center;\n      line-height: 30px;\n      color: #fff; }\n  .color-option-check input[type=\"radio\"]:checked + span > .overlay {\n    display: block; }\n  .color-option-check .color-option-item {\n    overflow: hidden;\n    display: block;\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\n    margin-bottom: 15px; }\n    .color-option-check .color-option-item > span {\n      display: block;\n      float: left;\n      width: 50%;\n      height: 20px; }\n    .color-option-check .color-option-item .item-header {\n      height: 10px; }\n\n.color-option-check .bg-color-page {\n  background-color: #f1f1f1; }\n\n.theme-options > div {\n  padding: 0; }\n\n.theme-option-check {\n  position: relative;\n  display: block;\n  margin: 0;\n  font-weight: normal; }\n  .theme-option-check input[type=\"radio\"] {\n    display: none; }\n  .theme-option-check input[type=\"radio\"] + span:hover {\n    cursor: pointer; }\n  .theme-option-check input[type=\"radio\"] + span {\n    position: relative; }\n    .theme-option-check input[type=\"radio\"] + span > .overlay {\n      display: none;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n      line-height: 60px;\n      color: #fff; }\n      .theme-option-check input[type=\"radio\"] + span > .overlay .material-icons {\n        vertical-align: bottom;\n        color: #66BB6A; }\n  .theme-option-check input[type=\"radio\"]:checked + span > .overlay {\n    display: block; }\n  .theme-option-check .theme-option-item {\n    overflow: hidden;\n    display: block; }\n    .theme-option-check .theme-option-item > span {\n      display: block;\n      text-align: center;\n      height: 60px;\n      line-height: 60px;\n      text-transform: uppercase; }\n\n.app-sidebar.bg-color-light .nav {\n  color: rgba(0, 0, 0, 0.87) !important; }\n  .app-sidebar.bg-color-light .nav a {\n    color: rgba(0, 0, 0, 0.87) !important; }\n  .app-sidebar.bg-color-light .nav .nav-header {\n    color: #636c72; }\n  .app-sidebar.bg-color-light .nav li > a:hover, .app-sidebar.bg-color-light .nav li > a:focus {\n    background-color: transparent !important;\n    color: #2196F3 !important; }\n  .app-sidebar.bg-color-light .nav li.active > a,\n  .app-sidebar.bg-color-light .nav li.active > a:hover,\n  .app-sidebar.bg-color-light .nav li.active > a:focus {\n    background-color: transparent !important;\n    color: #2196F3 !important; }\n  .app-sidebar.bg-color-light .nav li.open > a,\n  .app-sidebar.bg-color-light .nav li.open > a:hover,\n  .app-sidebar.bg-color-light .nav li.open > a:focus {\n    background-color: rgba(0, 0, 0, 0.05) !important;\n    color: #2196F3 !important; }\n  .app-sidebar.bg-color-light .nav li.open > .icon-has-ul {\n    color: #2196F3; }\n  .app-sidebar.bg-color-light .nav li > a:focus {\n    background-color: transparent; }\n  .app-sidebar.bg-color-light .nav ul {\n    background-color: rgba(0, 0, 0, 0.05); }\n    .app-sidebar.bg-color-light .nav ul li.active > a,\n    .app-sidebar.bg-color-light .nav ul li.active > a:hover,\n    .app-sidebar.bg-color-light .nav ul li.active > a:focus, .app-sidebar.bg-color-light .nav ul li.open > a,\n    .app-sidebar.bg-color-light .nav ul li.open > a:hover,\n    .app-sidebar.bg-color-light .nav ul li.open > a:focus {\n      background-color: rgba(0, 0, 0, 0.05) !important;\n      color: #2196F3 !important; }\n  .app-sidebar.bg-color-light .nav ul ul {\n    background-color: rgba(0, 0, 0, 0.05); }\n    .app-sidebar.bg-color-light .nav ul ul > li.active > a,\n    .app-sidebar.bg-color-light .nav ul ul > li.active > a:hover,\n    .app-sidebar.bg-color-light .nav ul ul > li.active > a:focus, .app-sidebar.bg-color-light .nav ul ul > li.open > a,\n    .app-sidebar.bg-color-light .nav ul ul > li.open > a:hover,\n    .app-sidebar.bg-color-light .nav ul ul > li.open > a:focus {\n      background-color: rgba(0, 0, 0, 0.05) !important;\n      color: #2196F3 !important; }\n  .app-sidebar.bg-color-light .nav ul ul ul {\n    background-color: rgba(0, 0, 0, 0.05) !important; }\n\n.app-sidebar.bg-color-light .sidebar-footer {\n  background-color: #fafafa; }\n\n.app-sidebar .sidebar-header.bg-color-light a.collapsednav-toggler, .app-sidebar .sidebar-header.bg-color-warning a.collapsednav-toggler {\n  color: rgba(0, 0, 0, 0.5); }\n\nhtml,\nbody,\n.app-header {\n  background-color: #F5F5F5; }\n\n.app-page-container .app-content-wrapper {\n  background-color: #f5f5f5; }\n\n@media only screen and (max-width: 991px) {\n  .app-page-container {\n    background-color: #f5f5f5; } }\n\n.theme-gray,\n.theme-dark {\n  color: rgba(255, 255, 255, 0.7); }\n  .theme-gray a:hover, .theme-gray a:focus,\n  .theme-dark a:hover,\n  .theme-dark a:focus {\n    color: #2196F3; }\n  .theme-gray .app-overlay,\n  .theme-dark .app-overlay {\n    background: rgba(0, 0, 0, 0.7);\n    color: rgba(255, 255, 255, 0.7); }\n    .theme-gray .app-overlay input,\n    .theme-dark .app-overlay input {\n      color: rgba(255, 255, 255, 0.7); }\n    .theme-gray .app-overlay a.overlay-close,\n    .theme-dark .app-overlay a.overlay-close {\n      color: #636c72; }\n  .theme-gray .quickview-wrapper,\n  .theme-dark .quickview-wrapper {\n    color: rgba(0, 0, 0, 0.87); }\n  .theme-gray .app-sidebar .sidebar-header,\n  .theme-dark .app-sidebar .sidebar-header {\n    color: #a1a1a1; }\n    .theme-gray .app-sidebar .sidebar-header a,\n    .theme-dark .app-sidebar .sidebar-header a {\n      color: #a1a1a1 !important; }\n  .theme-gray .app-footer .brand,\n  .theme-dark .app-footer .brand {\n    color: rgba(255, 255, 255, 0.7); }\n\n.theme-gray .app-sidebar {\n  background-color: #3c3c3c; }\n  .theme-gray .app-sidebar .sidebar-header {\n    background-color: #3c3c3c; }\n  .theme-gray .app-sidebar .sidebar-footer {\n    background-color: #3c3c3c; }\n  .theme-gray .app-sidebar .nav {\n    color: #a1a1a1 !important; }\n    .theme-gray .app-sidebar .nav a {\n      color: #a1a1a1 !important; }\n\n.theme-gray .app-page-container .app-content-wrapper {\n  background-color: #424242; }\n\n@media only screen and (max-width: 991px) {\n  .theme-gray .app-page-container {\n    background-color: #424242; } }\n\n.theme-gray .app-header-inner.bg-color-light, .theme-gray .app-header-inner.bg-color-dark, .theme-gray .app-header-inner.bg-color-primary, .theme-gray .app-header-inner.bg-color-success, .theme-gray .app-header-inner.bg-color-info, .theme-gray .app-header-inner.bg-color-warning, .theme-gray .app-header-inner.bg-color-danger {\n  background-color: #4b4b4b;\n  color: rgba(255, 255, 255, 0.7); }\n  .theme-gray .app-header-inner.bg-color-light a, .theme-gray .app-header-inner.bg-color-dark a, .theme-gray .app-header-inner.bg-color-primary a, .theme-gray .app-header-inner.bg-color-success a, .theme-gray .app-header-inner.bg-color-info a, .theme-gray .app-header-inner.bg-color-warning a, .theme-gray .app-header-inner.bg-color-danger a {\n    color: rgba(255, 255, 255, 0.7); }\n\n.theme-dark .app-sidebar {\n  background-color: #333C44; }\n  .theme-dark .app-sidebar .sidebar-header {\n    background-color: #333C44; }\n  .theme-dark .app-sidebar .sidebar-footer {\n    background-color: #333C44; }\n  .theme-dark .app-sidebar .nav {\n    color: #a1a1a1 !important; }\n    .theme-dark .app-sidebar .nav a {\n      color: #a1a1a1 !important; }\n\n.theme-dark .app-page-container .app-content-wrapper {\n  background-color: #38424b; }\n\n@media only screen and (max-width: 991px) {\n  .theme-dark .app-page-container {\n    background-color: #38424b; } }\n\n.theme-dark .app-header-inner.bg-color-light, .theme-dark .app-header-inner.bg-color-dark, .theme-dark .app-header-inner.bg-color-primary, .theme-dark .app-header-inner.bg-color-success, .theme-dark .app-header-inner.bg-color-info, .theme-dark .app-header-inner.bg-color-warning, .theme-dark .app-header-inner.bg-color-danger {\n  background-color: #404b55;\n  color: rgba(255, 255, 255, 0.7); }\n  .theme-dark .app-header-inner.bg-color-light a, .theme-dark .app-header-inner.bg-color-dark a, .theme-dark .app-header-inner.bg-color-primary a, .theme-dark .app-header-inner.bg-color-success a, .theme-dark .app-header-inner.bg-color-info a, .theme-dark .app-header-inner.bg-color-warning a, .theme-dark .app-header-inner.bg-color-danger a {\n    color: rgba(255, 255, 255, 0.7); }\n", ""]);

// exports


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n/* Material Design Lite */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\nhtml, body {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px; }\n\nh1, h2, h3, h4, h5, h6, p {\n  margin: 0;\n  padding: 0; }\n\n/**\n  * Styles for HTML elements\n  */\nh1 small, h2 small, h3 small, h4 small, h5 small, h6 small {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em;\n  opacity: 0.54;\n  font-size: 0.6em; }\n\nh1 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em;\n  margin-top: 24px;\n  margin-bottom: 24px; }\n\nh2 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 48px;\n  margin-top: 24px;\n  margin-bottom: 24px; }\n\nh3 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px;\n  margin-top: 24px;\n  margin-bottom: 24px; }\n\nh4 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px;\n  -moz-osx-font-smoothing: grayscale;\n  margin-top: 24px;\n  margin-bottom: 16px; }\n\nh5 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0.02em;\n  margin-top: 24px;\n  margin-bottom: 16px; }\n\nh6 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.04em;\n  margin-top: 24px;\n  margin-bottom: 16px; }\n\np {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  margin-bottom: 16px; }\n\na {\n  color: #2196F3;\n  font-weight: 500; }\n\nblockquote {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  position: relative;\n  font-size: 24px;\n  font-weight: 300;\n  font-style: italic;\n  line-height: 1.35;\n  letter-spacing: 0.08em; }\n  blockquote:before {\n    position: absolute;\n    left: -0.5em;\n    content: '\\201C'; }\n  blockquote:after {\n    content: '\\201D';\n    margin-left: -0.05em; }\n\nmark {\n  background-color: #f4ff81; }\n\ndt {\n  font-weight: 700; }\n\naddress {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0;\n  font-style: normal; }\n\nul, ol {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n/**\n * Class Name Styles\n */\n.mdl-typography--display-4 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 112px;\n  font-weight: 300;\n  line-height: 1;\n  letter-spacing: -0.04em; }\n\n.mdl-typography--display-4-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 112px;\n  font-weight: 300;\n  line-height: 1;\n  letter-spacing: -0.04em;\n  opacity: 0.54; }\n\n.mdl-typography--display-3 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em; }\n\n.mdl-typography--display-3-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em;\n  opacity: 0.54; }\n\n.mdl-typography--display-2 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 48px; }\n\n.mdl-typography--display-2-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 48px;\n  opacity: 0.54; }\n\n.mdl-typography--display-1 {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px; }\n\n.mdl-typography--display-1-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px;\n  opacity: 0.54; }\n\n.mdl-typography--headline {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px;\n  -moz-osx-font-smoothing: grayscale; }\n\n.mdl-typography--headline-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px;\n  -moz-osx-font-smoothing: grayscale;\n  opacity: 0.87; }\n\n.mdl-typography--title {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0.02em; }\n\n.mdl-typography--title-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0.02em;\n  opacity: 0.87; }\n\n.mdl-typography--subhead {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.04em; }\n\n.mdl-typography--subhead-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.04em;\n  opacity: 0.87; }\n\n.mdl-typography--body-2 {\n  font-size: 14px;\n  font-weight: bold;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-2-color-contrast {\n  font-size: 14px;\n  font-weight: bold;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--body-1 {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-1-color-contrast {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--body-2-force-preferred-font {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-2-force-preferred-font-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--body-1-force-preferred-font {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-1-force-preferred-font-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--caption {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--caption-force-preferred-font {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--caption-color-contrast {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.54; }\n\n.mdl-typography--caption-force-preferred-font-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.54; }\n\n.mdl-typography--menu {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--menu-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--button {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--button-color-contrast {\n  font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--text-left {\n  text-align: left; }\n\n.mdl-typography--text-right {\n  text-align: right; }\n\n.mdl-typography--text-center {\n  text-align: center; }\n\n.mdl-typography--text-justify {\n  text-align: justify; }\n\n.mdl-typography--text-nowrap {\n  white-space: nowrap; }\n\n.mdl-typography--text-lowercase {\n  text-transform: lowercase; }\n\n.mdl-typography--text-uppercase {\n  text-transform: uppercase; }\n\n.mdl-typography--text-capitalize {\n  text-transform: capitalize; }\n\n.mdl-typography--font-thin {\n  font-weight: 200 !important; }\n\n.mdl-typography--font-light {\n  font-weight: 300 !important; }\n\n.mdl-typography--font-regular {\n  font-weight: 400 !important; }\n\n.mdl-typography--font-medium {\n  font-weight: 500 !important; }\n\n.mdl-typography--font-bold {\n  font-weight: 700 !important; }\n\n.mdl-typography--font-black {\n  font-weight: 900 !important; }\n\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  word-wrap: normal;\n  font-feature-settings: 'liga';\n  -webkit-font-feature-settings: 'liga';\n  -webkit-font-smoothing: antialiased; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n.mdl-badge {\n  position: relative;\n  white-space: nowrap;\n  margin-right: 24px; }\n  .mdl-badge:not([data-badge]) {\n    margin-right: auto; }\n  .mdl-badge[data-badge]:after {\n    content: attr(data-badge);\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-content: center;\n    align-items: center;\n    position: absolute;\n    top: -11px;\n    right: -24px;\n    font-family: \"Roboto\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n    font-weight: 600;\n    font-size: 75%;\n    width: 22px;\n    height: 22px;\n    border-radius: 50%;\n    background: #00BCD4;\n    color: #fff; }\n    .mdl-button .mdl-badge[data-badge]:after {\n      top: -10px;\n      right: -5px; }\n  .mdl-badge.mdl-badge--no-background[data-badge]:after {\n    color: #00BCD4;\n    background: #999;\n    box-shadow: 0 0 1px gray; }\n  .mdl-badge.mdl-badge--overlap {\n    margin-right: 10px; }\n    .mdl-badge.mdl-badge--overlap:after {\n      right: -10px; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n.mdl-card {\n  display: flex;\n  flex-direction: column;\n  font-size: 16px;\n  font-weight: 400;\n  min-height: 200px;\n  overflow: hidden;\n  width: 330px;\n  z-index: 1;\n  position: relative;\n  background: rgb(255,255,255);\n  border-radius: 2px;\n  box-sizing: border-box; }\n\n.mdl-card__media {\n  background-color: rgb(#66BB6A);\n  background-repeat: repeat;\n  background-position: 50% 50%;\n  background-size: cover;\n  background-origin: padding-box;\n  background-attachment: scroll;\n  box-sizing: border-box; }\n\n.mdl-card__title {\n  align-items: center;\n  color: rgb(0,0,0);\n  display: block;\n  display: flex;\n  justify-content: stretch;\n  line-height: normal;\n  padding: 16px 16px;\n  perspective-origin: 165px 56px;\n  transform-origin: 165px 56px;\n  box-sizing: border-box; }\n  .mdl-card__title.mdl-card--border {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n\n.mdl-card__title-text {\n  align-self: flex-end;\n  color: inherit;\n  display: block;\n  display: flex;\n  font-size: 24px;\n  font-weight: 300;\n  line-height: normal;\n  overflow: hidden;\n  transform-origin: 149px 48px;\n  margin: 0; }\n\n.mdl-card__subtitle-text {\n  font-size: 14px;\n  color: rgba(0,0,0, 0.54);\n  margin: 0; }\n\n.mdl-card__supporting-text {\n  color: rgba(0,0,0, 0.54);\n  font-size: 14px;\n  line-height: 18px;\n  overflow: hidden;\n  padding: 16px 16px;\n  width: 90%; }\n  .mdl-card__supporting-text.mdl-card--border {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n\n.mdl-card__actions {\n  font-size: 16px;\n  line-height: normal;\n  width: 100%;\n  background-color: transparent;\n  padding: 8px;\n  box-sizing: border-box; }\n  .mdl-card__actions.mdl-card--border {\n    border-top: 1px solid rgba(0, 0, 0, 0.125); }\n\n.mdl-card--expand {\n  flex-grow: 1; }\n\n.mdl-card__menu {\n  position: absolute;\n  right: 16px;\n  top: 16px; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-data-table {\n  position: relative;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-collapse: collapse;\n  white-space: nowrap;\n  font-size: 13px;\n  background-color: rgb(255,255,255); }\n  .mdl-data-table thead {\n    padding-bottom: 3px; }\n    .mdl-data-table thead .mdl-data-table__select {\n      margin-top: 0; }\n  .mdl-data-table tbody tr {\n    position: relative;\n    height: 48px;\n    transition-duration: 0.28s;\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transition-property: background-color; }\n    .mdl-data-table tbody tr.is-selected {\n      background-color: #e0e0e0; }\n    .mdl-data-table tbody tr:hover {\n      background-color: rgba(0, 0, 0, 0.08); }\n  .mdl-data-table td, .mdl-data-table th {\n    padding: 0 18px 12px 18px;\n    text-align: right; }\n    .mdl-data-table td:first-of-type, .mdl-data-table th:first-of-type {\n      padding-left: 24px; }\n    .mdl-data-table td:last-of-type, .mdl-data-table th:last-of-type {\n      padding-right: 24px; }\n  .mdl-data-table td {\n    position: relative;\n    vertical-align: middle;\n    height: 48px;\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    padding-top: 12px;\n    box-sizing: border-box; }\n    .mdl-data-table td .mdl-data-table__select {\n      vertical-align: middle; }\n  .mdl-data-table th {\n    position: relative;\n    vertical-align: bottom;\n    text-overflow: ellipsis;\n    font-size: 14px;\n    font-weight: bold;\n    line-height: 24px;\n    letter-spacing: 0;\n    height: 48px;\n    font-size: 12px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-bottom: 8px;\n    box-sizing: border-box; }\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending, .mdl-data-table th.mdl-data-table__header--sorted-descending {\n      color: rgba(0, 0, 0, 0.87); }\n      .mdl-data-table th.mdl-data-table__header--sorted-ascending:before, .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n        font-family: 'Material Icons';\n        font-weight: normal;\n        font-style: normal;\n        font-size: 24px;\n        line-height: 1;\n        letter-spacing: normal;\n        text-transform: none;\n        display: inline-block;\n        word-wrap: normal;\n        font-feature-settings: 'liga';\n        -webkit-font-feature-settings: 'liga';\n        -webkit-font-smoothing: antialiased;\n        font-size: 16px;\n        content: \"\\E5D8\";\n        margin-right: 5px;\n        vertical-align: sub; }\n      .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover, .mdl-data-table th.mdl-data-table__header--sorted-descending:hover {\n        cursor: pointer; }\n        .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover:before, .mdl-data-table th.mdl-data-table__header--sorted-descending:hover:before {\n          color: rgba(0, 0, 0, 0.26); }\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n      content: \"\\E5DB\"; }\n\n.mdl-data-table__select {\n  width: 16px; }\n\n.mdl-data-table__cell--non-numeric.mdl-data-table__cell--non-numeric {\n  text-align: left; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-shadow--2dp {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n\n.mdl-shadow--3dp {\n  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12); }\n\n.mdl-shadow--4dp {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--6dp {\n  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--8dp {\n  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--16dp {\n  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--24dp {\n  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2); }\n\naddress {\n  line-height: 1.5; }\n\nh1, h2, h3, h4, h5, h6 {\n  line-height: 1.1; }\n\n.divider {\n  display: block;\n  border: 0;\n  border-top: 1px solid transparent;\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  .divider.divider-solid {\n    border-style: solid;\n    border-color: rgba(0, 0, 0, 0.1); }\n  .divider.divider-dashed {\n    border-style: dashed;\n    border-color: rgba(0, 0, 0, 0.1); }\n  .divider.divider-dotted {\n    border-style: dotted;\n    border-color: rgba(0, 0, 0, 0.1); }\n\n.divider-xs {\n  margin-top: 3px;\n  margin-bottom: 3px; }\n\n.divider-sm {\n  margin-top: 5px;\n  margin-bottom: 5px; }\n\n.divider-md {\n  margin-top: 15px;\n  margin-bottom: 15px; }\n\n.divider-lg {\n  margin-top: 20px;\n  margin-bottom: 20px; }\n\n.divider-xl {\n  margin-top: 30px;\n  margin-bottom: 30px; }\n\n.divider-xxl {\n  margin-top: 50px;\n  margin-bottom: 50px; }\n\n.space {\n  display: inline;\n  padding: 6px; }\n\n.space-md {\n  padding: 15px; }\n\n.space-lg {\n  padding: 25px; }\n\nspan.block {\n  display: block; }\n\n.no-margin {\n  margin: 0 !important; }\n\n.no-margin-h {\n  margin-left: 0 !important;\n  margin-right: 0 !important; }\n\n.no-margin-top {\n  margin-top: 0 !important; }\n\n.no-margin-bottom {\n  margin-bottom: 0 !important; }\n\n.no-margin-left {\n  margin-left: 0 !important; }\n\n.no-margin-right {\n  margin-right: 0 !important; }\n\n.no-border {\n  border: 0 !important; }\n\n.no-border-radius {\n  border-radius: 0; }\n\n.no-padding {\n  padding: 0 !important; }\n\n.no-padding-h {\n  padding-left: 0 !important;\n  padding-right: 0 !important; }\n\n.no-shadow {\n  box-shadow: 0; }\n\n.full-width {\n  width: 100%; }\n\n.pull-in {\n  margin-left: -15px;\n  margin-right: -15px; }\n\n.margin-b-lg {\n  margin-bottom: 30px; }\n\n.article-title,\n.article-title-style {\n  font-size: 24px;\n  font-weight: normal;\n  line-height: 32px;\n  margin: .6em 0;\n  color: #2196F3; }\n  .article-title.color-dark,\n  .article-title-style.color-dark {\n    color: rgba(0, 0, 0, 0.87); }\n\n.chapter .article {\n  padding-bottom: 30px; }\n  .chapter .article:nth-of-type(1) .article-title {\n    margin: 0 0 30px;\n    border-top: none; }\n  .chapter .article.article-dark {\n    background-color: rgba(0, 0, 0, 0.015); }\n  .chapter .article.article-bordered {\n    border-top: 1px solid rgba(0, 0, 0, 0.117647);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.117647); }\n    .chapter .article.article-bordered:last-child {\n      border-bottom: 0; }\n  .chapter .article.padding-lg-v {\n    padding: 75px 0; }\n\n.chapter .article-title {\n  font-size: 24px;\n  padding-top: 80px;\n  font-weight: normal;\n  line-height: 32px;\n  margin: 48px 0 30px;\n  border-top: 1px solid rgba(0, 0, 0, 0.117647);\n  color: #2196F3; }\n\n.hero {\n  padding: 70px 0 75px;\n  text-align: center; }\n\n.hero-title {\n  -webkit-font-smoothing: antialiased; }\n\n.hero-title {\n  color: rgba(0, 0, 0, 0.87);\n  font-size: 45px;\n  font-weight: 300;\n  line-height: 50px;\n  margin-bottom: 10px; }\n\n.hero-tagline {\n  margin: 10px auto 30px;\n  max-width: 700px;\n  color: rgba(0, 0, 0, 0.87);\n  font-weight: 300;\n  font-size: 24px;\n  line-height: 32px; }\n\n.theme-gray .hero-title,\n.theme-gray .hero-tagline,\n.theme-dark .hero-title,\n.theme-dark .hero-tagline {\n  color: rgba(255, 255, 255, 0.7); }\n\n.theme-gray .article-title.color-dark,\n.theme-dark .article-title.color-dark {\n  color: rgba(255, 255, 255, 0.7); }\n\n.container-fluid {\n  padding-left: 30px;\n  padding-right: 30px; }\n  .container-fluid.padding-lg-h {\n    padding-left: 30px;\n    padding-right: 30px; }\n  .container-fluid.with-maxwidth {\n    max-width: 1400px; }\n  .container-fluid.with-maxwidth-lg {\n    max-width: 960px; }\n  .container-fluid.with-maxwidth-md {\n    max-width: 960px; }\n  .container-fluid.with-maxwidth-sm {\n    max-width: 720px; }\n  .container-fluid.no-breadcrumbs {\n    padding-top: 2em;\n    padding-bottom: 1em; }\n\n.gradient-text {\n  font-size: 150px;\n  font-weight: 300;\n  color: #2196F3;\n  background: -webkit-linear-gradient(92deg, #fb83fa, #00aced);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent; }\n\n.text-small {\n  font-size: 12px; }\n\n.text-normal {\n  font-size: 1rem; }\n\n.text-huge {\n  font-size: 72px; }\n\n.text-large {\n  font-size: 50px; }\n\n.text-thin {\n  font-weight: 300; }\n\n.text-ultralight {\n  font-weight: 100; }\n\n.bold {\n  font-weight: 500; }\n\n.color-primary,\na.color-primary {\n  color: #2196F3; }\n  .color-primary:hover,\n  a.color-primary:hover {\n    color: #2196F3; }\n\n.color-success,\na.color-success {\n  color: #66BB6A; }\n  .color-success:hover,\n  a.color-success:hover {\n    color: #66BB6A; }\n\n.color-info,\na.color-info {\n  color: #00BCD4; }\n  .color-info:hover,\n  a.color-info:hover {\n    color: #00BCD4; }\n\n.color-info-alt,\na.color-info-alt {\n  color: #7E57C2; }\n  .color-info-alt:hover,\n  a.color-info-alt:hover {\n    color: #7E57C2; }\n\n.color-warning,\na.color-warning {\n  color: #FFCA28; }\n  .color-warning:hover,\n  a.color-warning:hover {\n    color: #FFCA28; }\n\n.color-danger,\na.color-danger {\n  color: #EF5350; }\n  .color-danger:hover,\n  a.color-danger:hover {\n    color: #EF5350; }\n\n.color-dark,\na.color-dark {\n  color: #333C44; }\n  .color-dark:hover,\n  a.color-dark:hover {\n    color: #333C44; }\n\n.color-white,\na.color-white {\n  color: #fff; }\n  .color-white:hover,\n  a.color-white:hover {\n    color: #fff; }\n\n.color-gray-darker,\na.color-gray-darker {\n  color: #222; }\n  .color-gray-darker:hover,\n  a.color-gray-darker:hover {\n    color: #222; }\n\n.color-gray-dark,\na.color-gray-dark {\n  color: #292b2c; }\n  .color-gray-dark:hover,\n  a.color-gray-dark:hover {\n    color: #292b2c; }\n\n.color-gray,\na.color-gray {\n  color: #464a4c; }\n  .color-gray:hover,\n  a.color-gray:hover {\n    color: #464a4c; }\n\n.color-gray-light,\na.color-gray-light {\n  color: #636c72; }\n  .color-gray-light:hover,\n  a.color-gray-light:hover {\n    color: #636c72; }\n\n.color-gray-lighter,\na.color-gray-lighter {\n  color: #eceeef; }\n  .color-gray-lighter:hover,\n  a.color-gray-lighter:hover {\n    color: #eceeef; }\n\n.dropcap,\n.dropcap-square,\n.dropcap-circle {\n  display: block;\n  float: left;\n  font-weight: normal;\n  line-height: 36px;\n  margin-right: 6px;\n  text-shadow: none; }\n\n.dropcap {\n  font-size: 3.1em; }\n\n.dropcap-square,\n.dropcap-circle {\n  background-color: #eceeef;\n  color: rgba(0, 0, 0, 0.87);\n  width: 36px;\n  text-align: center; }\n\n.dropcap-square {\n  border-radius: 0.2rem;\n  font-size: 2.3em; }\n\n.dropcap-circle {\n  border-radius: 50%;\n  font-size: 1.78em; }\n\n.dropcap.colored {\n  color: #2196F3; }\n\n.dropcap-square.colored,\n.dropcap-circle.colored {\n  background-color: #2196F3;\n  color: #fff; }\n\n.ui-highlight {\n  background-color: #333C44;\n  color: #fff;\n  border-radius: 0.2rem;\n  padding: 2px 5px; }\n  .ui-highlight.colored {\n    background-color: #2196F3; }\n\na.btn-w-xs,\nbutton.btn-w-xs {\n  min-width: 80px; }\n\na.btn-w-sm,\nbutton.btn-w-sm {\n  min-width: 100px; }\n\na.btn-w-md,\nbutton.btn-w-md {\n  min-width: 135px; }\n\na.btn-w-lg,\nbutton.btn-w-lg {\n  min-width: 160px; }\n\na.btn-round,\nbutton.btn-round {\n  border-radius: 2em; }\n\na.btn-gap,\nbutton.btn-gap {\n  margin: 5px; }\n\na.btn-gap-h,\nbutton.btn-gap-h {\n  margin: 0 5px; }\n\na.btn-gap-v,\nbutton.btn-gap-v {\n  margin: 0 0 5px; }\n\n.btn-icon {\n  height: 35px;\n  width: 35px;\n  line-height: 35px;\n  padding: 0;\n  display: inline-block;\n  text-align: center;\n  border-radius: 0.2rem; }\n  .btn-icon i {\n    line-height: 35px; }\n  .btn-icon.btn-icon-lined {\n    line-height: 31px; }\n    .btn-icon.btn-icon-lined i {\n      line-height: 31px; }\n    .btn-icon.btn-icon-lined.btn-icon-thin {\n      line-height: 33px; }\n      .btn-icon.btn-icon-lined.btn-icon-thin i {\n        line-height: 33px; }\n\n.btn-icon-round {\n  border-radius: 50%; }\n\n.btn-icon-sm {\n  height: 30px;\n  width: 30px;\n  line-height: 30px; }\n  .btn-icon-sm i {\n    line-height: 30px; }\n  .btn-icon-sm.btn-icon-lined {\n    line-height: 26px; }\n    .btn-icon-sm.btn-icon-lined i {\n      line-height: 26px; }\n    .btn-icon-sm.btn-icon-lined.btn-icon-thin {\n      line-height: 28px; }\n      .btn-icon-sm.btn-icon-lined.btn-icon-thin i {\n        line-height: 28px; }\n\n.btn-icon-md {\n  height: 45px;\n  width: 45px;\n  line-height: 45px;\n  font-size: 18px; }\n  .btn-icon-md i {\n    line-height: 45px; }\n  .btn-icon-md.btn-icon-lined {\n    line-height: 41px; }\n    .btn-icon-md.btn-icon-lined i {\n      line-height: 41px; }\n    .btn-icon-md.btn-icon-lined.btn-icon-thin {\n      line-height: 43px; }\n      .btn-icon-md.btn-icon-lined.btn-icon-thin i {\n        line-height: 43px; }\n\n.btn-icon-lg {\n  height: 65px;\n  width: 65px;\n  line-height: 65px;\n  font-size: 28px; }\n  .btn-icon-lg i {\n    line-height: 65px; }\n  .btn-icon-lg.btn-icon-lined {\n    line-height: 61px; }\n    .btn-icon-lg.btn-icon-lined i {\n      line-height: 61px; }\n    .btn-icon-lg.btn-icon-lined.btn-icon-thin {\n      line-height: 63px; }\n      .btn-icon-lg.btn-icon-lined.btn-icon-thin i {\n        line-height: 63px; }\n\n.btn-icon-lg-alt {\n  height: 70px;\n  width: 70px;\n  line-height: 70px; }\n  .btn-icon-lg-alt i {\n    line-height: 70px; }\n  .btn-icon-lg-alt.btn-icon-lined {\n    line-height: 66px; }\n    .btn-icon-lg-alt.btn-icon-lined i {\n      line-height: 66px; }\n    .btn-icon-lg-alt.btn-icon-lined.btn-icon-thin {\n      line-height: 68px; }\n      .btn-icon-lg-alt.btn-icon-lined.btn-icon-thin i {\n        line-height: 68px; }\n\n.btn-icon-xl {\n  height: 80px;\n  width: 80px;\n  line-height: 80px; }\n  .btn-icon-xl i {\n    line-height: 80px; }\n  .btn-icon-xl.btn-icon-lined {\n    line-height: 76px; }\n    .btn-icon-xl.btn-icon-lined i {\n      line-height: 76px; }\n    .btn-icon-xl.btn-icon-lined.btn-icon-thin {\n      line-height: 78px; }\n      .btn-icon-xl.btn-icon-lined.btn-icon-thin i {\n        line-height: 78px; }\n\n.btn-twitter {\n  color: #fff;\n  background-color: #00c7f7;\n  border-color: #00c7f7; }\n  .btn-twitter:hover, .btn-twitter:focus, .btn-twitter:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #00a6ce;\n    border-color: #0096ba; }\n\n.btn-facebook {\n  color: #fff;\n  background-color: #335397;\n  border-color: #335397; }\n  .btn-facebook:hover, .btn-facebook:focus, .btn-facebook:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #294279;\n    border-color: #243a69; }\n\n.btn-gplus,\n.btn-google-plus {\n  color: #fff;\n  background-color: #dd4a38;\n  border-color: #dd4a38; }\n  .btn-gplus:hover, .btn-gplus:focus, .btn-gplus:active,\n  .btn-google-plus:hover,\n  .btn-google-plus:focus,\n  .btn-google-plus:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #ca3522;\n    border-color: #b8301f; }\n\n.btn-instagram {\n  color: #fff;\n  background-color: #82685A;\n  border-color: #82685A; }\n  .btn-instagram:hover, .btn-instagram:focus, .btn-instagram:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #6a5549;\n    border-color: #5e4b41; }\n\n.btn-vimeo {\n  color: #fff;\n  background-color: #63879C;\n  border-color: #63879C; }\n  .btn-vimeo:hover, .btn-vimeo:focus, .btn-vimeo:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #537183;\n    border-color: #4b6777; }\n\n.btn-flickr {\n  color: #fff;\n  background-color: #0061DB;\n  border-color: #0061DB; }\n  .btn-flickr:hover, .btn-flickr:focus, .btn-flickr:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #004fb2;\n    border-color: #00469e; }\n\n.btn-github {\n  color: #fff;\n  background-color: #3B3B3B;\n  border-color: #3B3B3B; }\n  .btn-github:hover, .btn-github:focus, .btn-github:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #272727;\n    border-color: #1c1c1c; }\n\n.btn-pinterest {\n  color: #fff;\n  background-color: #D73532;\n  border-color: #D73532; }\n  .btn-pinterest:hover, .btn-pinterest:focus, .btn-pinterest:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #bc2725;\n    border-color: #ab2421; }\n\n.btn-tumblr {\n  color: #fff;\n  background-color: #586980;\n  border-color: #586980; }\n  .btn-tumblr:hover, .btn-tumblr:focus, .btn-tumblr:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #475568;\n    border-color: #3f4b5c; }\n\n.btn-linkedin {\n  color: #fff;\n  background-color: #018FAF;\n  border-color: #018FAF; }\n  .btn-linkedin:hover, .btn-linkedin:focus, .btn-linkedin:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #016e86;\n    border-color: #015d72; }\n\n.btn-dribbble {\n  color: #fff;\n  background-color: #EA73A0;\n  border-color: #EA73A0; }\n  .btn-dribbble:hover, .btn-dribbble:focus, .btn-dribbble:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #e55088;\n    border-color: #e23e7c; }\n\n.btn-stumbleupon {\n  color: #fff;\n  background-color: #EA4B24;\n  border-color: #EA4B24; }\n  .btn-stumbleupon:hover, .btn-stumbleupon:focus, .btn-stumbleupon:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #d13914;\n    border-color: #bf3412; }\n\n.btn-lastfm {\n  color: #fff;\n  background-color: #B80638;\n  border-color: #B80638; }\n  .btn-lastfm:hover, .btn-lastfm:focus, .btn-lastfm:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #90052c;\n    border-color: #7d0426; }\n\n.btn-evernote {\n  color: #fff;\n  background-color: #3BAB27;\n  border-color: #3BAB27; }\n  .btn-evernote:hover, .btn-evernote:focus, .btn-evernote:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #308a1f;\n    border-color: #2a791c; }\n\n.btn-skype {\n  color: #fff;\n  background-color: #00B0F6;\n  border-color: #00B0F6; }\n  .btn-skype:hover, .btn-skype:focus, .btn-skype:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0093cd;\n    border-color: #0084b9; }\n\n.btn-soundcloud {\n  color: #fff;\n  background-color: #0066FF;\n  border-color: #0066FF; }\n  .btn-soundcloud:hover, .btn-soundcloud:focus, .btn-soundcloud:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0056d6;\n    border-color: #004ec2; }\n\n.btn-behance {\n  color: #fff;\n  background-color: #B80638;\n  border-color: #B80638; }\n  .btn-behance:hover, .btn-behance:focus, .btn-behance:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #90052c;\n    border-color: #7d0426; }\n\n.btn-rss {\n  color: #fff;\n  background-color: #F79638;\n  border-color: #F79638; }\n  .btn-rss:hover, .btn-rss:focus, .btn-rss:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #f58111;\n    border-color: #e87709; }\n\n.btn-youtube {\n  color: #fff;\n  background-color: #CC181E;\n  border-color: #CC181E; }\n  .btn-youtube:hover, .btn-youtube:focus, .btn-youtube:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #a71419;\n    border-color: #951216; }\n\n.theme-gray .btn-default,\n.theme-gray .btn-secondary,\n.theme-dark .btn-default,\n.theme-dark .btn-secondary {\n  background-color: rgba(255, 255, 255, 0.05);\n  border-color: rgba(0, 0, 0, 0.15);\n  color: rgba(255, 255, 255, 0.7); }\n\n@media only screen and (max-width: 800px) {\n  .table-flip-scroll {\n    /* sort out borders */ }\n    .table-flip-scroll .cf:after {\n      visibility: hidden;\n      display: block;\n      font-size: 0;\n      content: \" \";\n      clear: both;\n      height: 0; }\n    .table-flip-scroll * html .cf {\n      zoom: 1; }\n    .table-flip-scroll *:first-child + html .cf {\n      zoom: 1; }\n    .table-flip-scroll table {\n      width: 100%;\n      border-collapse: collapse;\n      border-spacing: 0; }\n    .table-flip-scroll th,\n    .table-flip-scroll td {\n      margin: 0;\n      vertical-align: top; }\n    .table-flip-scroll th {\n      text-align: left; }\n    .table-flip-scroll table {\n      display: block;\n      position: relative;\n      width: 100%; }\n    .table-flip-scroll thead {\n      display: block;\n      float: left; }\n    .table-flip-scroll tbody {\n      display: block;\n      width: auto;\n      position: relative;\n      overflow-x: auto;\n      white-space: nowrap; }\n    .table-flip-scroll thead tr {\n      display: block; }\n    .table-flip-scroll .table > thead > tr > th:first-child {\n      border-top: 1px solid #ddd; }\n    .table-flip-scroll th {\n      display: block;\n      text-align: right; }\n    .table-flip-scroll tbody tr {\n      display: inline-block;\n      vertical-align: top; }\n    .table-flip-scroll td {\n      display: block;\n      min-height: 1.25em;\n      text-align: left; }\n    .table-flip-scroll th {\n      border-bottom: 0;\n      border-left: 0; }\n    .table-flip-scroll td {\n      border-left: 0;\n      border-right: 0;\n      border-bottom: 0; }\n    .table-flip-scroll tbody tr {\n      border-left: 1px solid #babcbf; }\n    .table-flip-scroll th:last-child,\n    .table-flip-scroll td:last-child {\n      border-bottom: 1px solid #babcbf; }\n    .table-flip-scroll .mdl-data-table tbody tr {\n      height: auto; } }\n\n.theme-gray .form-control,\n.theme-gray .input-group-addon,\n.theme-dark .form-control,\n.theme-dark .input-group-addon {\n  background-color: rgba(255, 255, 255, 0.05);\n  border-color: rgba(0, 0, 0, 0.15);\n  color: rgba(255, 255, 255, 0.7); }\n\n.theme-gray .help-block,\n.theme-dark .help-block {\n  color: #636c72; }\n\n.input-round {\n  border-radius: 2em; }\n\ninput.input-primary {\n  border-color: #2196F3; }\n  input.input-primary:focus {\n    border-color: #2196F3; }\n\ninput.input-info {\n  border-color: #00BCD4; }\n  input.input-info:focus {\n    border-color: #00BCD4; }\n\ninput.input-success {\n  border-color: #66BB6A; }\n  input.input-success:focus {\n    border-color: #66BB6A; }\n\ninput.input-warning {\n  border-color: #FFCA28; }\n  input.input-warning:focus {\n    border-color: #FFCA28; }\n\ninput.input-danger {\n  border-color: #EF5350; }\n  input.input-danger:focus {\n    border-color: #EF5350; }\n\n.box {\n  position: relative;\n  margin-bottom: 1.5rem;\n  border: 0;\n  border-radius: 0.2rem;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15); }\n  .box.box-transparent {\n    box-shadow: none; }\n  .box .box-dark {\n    background-color: rgba(0, 0, 0, 0.03); }\n\n.box-default {\n  background-color: #fff; }\n\n.box-header,\n.box-heading {\n  padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid transparent;\n  border-radius: -0.8rem -0.8rem 0 0;\n  font-weight: 500; }\n\n.box-toolbar {\n  position: absolute;\n  top: 1.25rem;\n  right: 1.25rem; }\n  .box-toolbar a {\n    color: #636c72; }\n    .box-toolbar a .material-icons {\n      font-size: 1rem; }\n\n.box-divider {\n  height: 1px;\n  background: rgba(0, 0, 0, 0.08);\n  margin: 0 1.25rem; }\n\n.box-body {\n  padding: 1.25rem; }\n  .box-body::after {\n    display: block;\n    content: \"\";\n    clear: both; }\n  .box-body.padding-lg {\n    padding: 30px 15px; }\n  .box-body.padding-xl {\n    padding: 60px 15px; }\n  .box-body.padding-lg-h {\n    padding: 15px 30px; }\n  .box-body.padding-lg-v {\n    padding: 30px 15px; }\n\n.theme-gray .box-default {\n  background-color: #4b4b4b; }\n\n.theme-dark .box-default {\n  background-color: #404b55; }\n\n.breadcrumb {\n  display: block;\n  margin: 0;\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n  background-color: transparent;\n  padding: 15px 0;\n  text-transform: uppercase;\n  color: #ccc;\n  text-shadow: none;\n  font-size: 11px; }\n  .breadcrumb a {\n    color: #ccc;\n    text-decoration: none; }\n    .breadcrumb a:hover {\n      color: #2196F3; }\n  .breadcrumb li {\n    padding-left: 0; }\n\n.call-to-action {\n  position: relative;\n  text-align: center; }\n  .call-to-action .cta-inner {\n    padding: 2em 0; }\n  .call-to-action .cta-text {\n    font-size: 24px;\n    line-height: 30px; }\n  .call-to-action .cta-btn {\n    margin: 30px 0 10px; }\n  .call-to-action .cta-muted {\n    opacity: .7; }\n  .call-to-action.cta-inline .cta-text {\n    font-size: 20px;\n    font-weight: 300; }\n  .call-to-action.cta-inline .cta-btn {\n    display: inline-block;\n    margin: 0 0 0 30px; }\n  .call-to-action.cta-full-width .cta-inner {\n    padding: 6em 1em; }\n  .call-to-action.cta-bg-img {\n    background-size: cover;\n    background-position: center;\n    color: rgba(255, 255, 255, 0.8); }\n    .call-to-action.cta-bg-img .cta-inner {\n      background-color: rgba(0, 0, 0, 0.35);\n      padding: 7em 1em; }\n\n.callout {\n  margin: 20px 0;\n  padding: 20px;\n  border-left: 3px solid #eee; }\n  .callout h4 {\n    margin-top: 0;\n    margin-bottom: 5px;\n    font-size: 1.25rem;\n    line-height: 1.5; }\n  .callout p:last-child {\n    margin-bottom: 0; }\n\n.callout-success {\n  background-color: rgba(102, 187, 106, 0.08);\n  border-color: #66BB6A; }\n  .callout-success h4 {\n    color: #66BB6A; }\n\n.callout-info {\n  background-color: rgba(0, 188, 212, 0.05);\n  border-color: #00BCD4; }\n  .callout-info h4 {\n    color: #00BCD4; }\n\n.callout-warning {\n  background-color: rgba(255, 202, 40, 0.08);\n  border-color: #FFCA28; }\n  .callout-warning h4 {\n    color: #FFCA28; }\n\n.callout-danger {\n  background-color: rgba(239, 83, 80, 0.05);\n  border-color: #EF5350; }\n  .callout-danger h4 {\n    color: #EF5350; }\n\n.card-white {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #fff; }\n\na.item-card {\n  display: block;\n  text-decoration: none; }\n  a.item-card:hover {\n    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); }\n\n.item-card {\n  position: relative;\n  transition: 0.2s linear; }\n  .item-card img {\n    max-width: 100%;\n    max-height: 100%; }\n  .item-card .card__image {\n    padding: 30px 15px;\n    height: 300px;\n    background-color: rgba(0, 0, 0, 0.035);\n    text-align: center; }\n  .item-card h1, .item-card h2, .item-card h3, .item-card h4, .item-card h5, .item-card h6 {\n    margin: 0;\n    color: rgba(0, 0, 0, 0.87);\n    line-height: 1.5; }\n  .item-card h6 {\n    font-size: 10px;\n    opacity: .5; }\n  .item-card h4 {\n    font-size: 16px; }\n  .item-card .card__body {\n    position: relative;\n    padding: 30px 15px;\n    margin-bottom: 30px; }\n  .item-card .card__price {\n    position: absolute;\n    top: 30px;\n    right: 15px; }\n    .item-card .card__price span {\n      display: block;\n      color: #636c72; }\n      .item-card .card__price span.type--strikethrough {\n        opacity: .5;\n        text-decoration: line-through; }\n  .item-card.card__horizontal {\n    position: relative;\n    margin-bottom: 30px; }\n    .item-card.card__horizontal .card__image {\n      width: 50%; }\n    .item-card.card__horizontal .card__body {\n      width: 50%;\n      height: 100%;\n      position: absolute;\n      top: 0;\n      right: 0;\n      padding: 40px 30px; }\n    .item-card.card__horizontal .card__price {\n      top: 30px;\n      right: 30px; }\n    .item-card.card__horizontal .card__desc {\n      margin: 0 25% 3em 0;\n      opacity: .7; }\n\n.theme-gray .card-white,\n.theme-dark .card-white {\n  color: rgba(255, 255, 255, 0.7); }\n  .theme-gray .card-white h1, .theme-gray .card-white h2, .theme-gray .card-white h3, .theme-gray .card-white h4, .theme-gray .card-white h5, .theme-gray .card-white h6,\n  .theme-dark .card-white h1,\n  .theme-dark .card-white h2,\n  .theme-dark .card-white h3,\n  .theme-dark .card-white h4,\n  .theme-dark .card-white h5,\n  .theme-dark .card-white h6 {\n    color: rgba(255, 255, 255, 0.7); }\n\n.theme-gray .card-white {\n  background-color: #4b4b4b; }\n\n.theme-dark .card-white {\n  background-color: #404b55; }\n\n.feature-callout {\n  position: relative;\n  clear: both; }\n  @media (min-width: 768px) {\n    .feature-callout.feature-content-left .callout-feature-content {\n      padding-right: 2em; } }\n  @media (min-width: 1200px) {\n    .feature-callout.feature-content-left .callout-feature-content {\n      padding-right: 3em; } }\n  @media (min-width: 768px) {\n    .feature-callout.feature-content-right .callout-feature-content {\n      padding-left: 2em; } }\n  @media (min-width: 1200px) {\n    .feature-callout.feature-content-right .callout-feature-content {\n      padding-left: 3em; } }\n  .feature-callout.feature-content-center .callout-feature-content {\n    text-align: center;\n    max-width: 75%;\n    margin: 0 auto; }\n  .feature-callout .md-button {\n    padding: 5px 0;\n    min-width: 150px; }\n\n.feature-callout-cover,\n.feature-callout-image-pull {\n  background-size: cover;\n  background-position: center; }\n\n.feature-callout-image-pull {\n  min-height: 200px; }\n  @media (min-width: 768px) {\n    .feature-callout-image-pull {\n      position: absolute;\n      top: 0;\n      bottom: 0; } }\n\n.callout-feature-content {\n  padding: 3em 0; }\n  @media (min-width: 768px) {\n    .callout-feature-content {\n      padding-top: 6em;\n      padding-bottom: 6em; } }\n  @media (min-width: 992px) {\n    .callout-feature-content {\n      padding-top: 8em;\n      padding-bottom: 8em; } }\n  @media (min-width: 1200px) {\n    .callout-feature-content {\n      padding-top: 12em;\n      padding-bottom: 12em; } }\n  .callout-feature-content h2 {\n    font-size: 24px;\n    margin-top: 0; }\n    @media (min-width: 768px) {\n      .callout-feature-content h2 {\n        font-size: 30px;\n        font-weight: 400;\n        line-height: 1.9;\n        margin: 0; } }\n  .callout-feature-content p {\n    line-height: 1.75;\n    hyphens: none; }\n    .callout-feature-content p:last-child {\n      margin-bottom: 0; }\n    @media (min-width: 768px) {\n      .callout-feature-content p {\n        line-height: 2;\n        margin: 1.5em 0; } }\n\n.feature-callout-cover.has-overlay {\n  color: #fff; }\n  .feature-callout-cover.has-overlay:after {\n    content: ' ';\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.25); }\n\n.feature-callout-cover .with-maxwidth {\n  position: relative;\n  z-index: 2; }\n\n.feature-callout-cover h2 {\n  font-size: 30px;\n  font-weight: bold;\n  letter-spacing: .1em; }\n  @media (min-width: 768px) {\n    .feature-callout-cover h2 {\n      font-size: 48px; } }\n\n.ih-item {\n  position: relative;\n  border-radius: 0.2rem;\n  transition: all 0.35s ease-in-out; }\n  .ih-item a {\n    color: #333; }\n    .ih-item a:hover {\n      text-decoration: none; }\n  .ih-item img {\n    border-radius: 0.2rem;\n    width: 100%;\n    height: 100%; }\n\n.ih-item.square {\n  position: relative;\n  margin-bottom: 30px; }\n  .ih-item.square .info {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    text-align: center;\n    backface-visibility: hidden; }\n\n.ih-item.ih-material {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  .ih-item.ih-material .info-mask {\n    content: '';\n    position: absolute;\n    top: -25%;\n    left: 0;\n    right: 0;\n    padding-bottom: 100%;\n    border-radius: 50%;\n    opacity: 0;\n    transform: scale(0);\n    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }\n  .ih-item.ih-material .info-content {\n    opacity: 0;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    backface-visibility: hidden;\n    transform: scale(0.5);\n    transition: all .3s ease; }\n    .ih-item.ih-material .info-content:before {\n      content: '';\n      display: inline-block;\n      vertical-align: middle;\n      height: 100%;\n      margin-left: -0.5em; }\n    .ih-item.ih-material .info-content .info-inner {\n      display: inline-block;\n      width: 100%;\n      vertical-align: middle;\n      text-align: center; }\n      .ih-item.ih-material .info-content .info-inner h3 {\n        margin: 0 0 10px;\n        text-transform: uppercase;\n        color: #fff;\n        font-size: 18px;\n        line-height: 1; }\n      .ih-item.ih-material .info-content .info-inner p {\n        font-style: italic;\n        font-size: 12px;\n        color: #eceeef; }\n  .ih-item.ih-material .bg-color-white + .info-content .info-inner h3,\n  .ih-item.ih-material .bg-color-warning + .info-content .info-inner h3 {\n    color: rgba(0, 0, 0, 0.87); }\n  .ih-item.ih-material .bg-color-white + .info-content .info-inner p,\n  .ih-item.ih-material .bg-color-warning + .info-content .info-inner p {\n    color: #999; }\n  .ih-item.ih-material a:hover .info-content {\n    opacity: 1;\n    transform: scale(1); }\n  .ih-item.ih-material a:hover .info-mask {\n    opacity: .8;\n    transform: scale(1.21); }\n\n.ih-item.square.effect3 {\n  overflow: hidden; }\n  .ih-item.square.effect3 .info {\n    height: 65px;\n    background-color: rgba(0, 0, 0, 0.8);\n    opacity: 0;\n    transition: all .35s ease-in-out; }\n    .ih-item.square.effect3 .info h3 {\n      text-transform: uppercase;\n      color: #fff;\n      text-align: center;\n      font-size: 17px;\n      line-height: 1;\n      padding: 10px 10px 0 4px;\n      margin: 4px 0 0 0; }\n    .ih-item.square.effect3 .info p {\n      margin: 0;\n      font-style: italic;\n      font-size: 12px;\n      line-height: 20px;\n      position: relative;\n      color: rgba(255, 255, 255, 0.7);\n      padding: 5px;\n      text-align: center; }\n    .ih-item.square.effect3 .info.bg-color-primary {\n      background-color: rgba(33, 150, 243, 0.8); }\n    .ih-item.square.effect3 .info.bg-color-info {\n      background-color: rgba(0, 188, 212, 0.8); }\n  .ih-item.square.effect3 a:hover .info {\n    visibility: visible;\n    opacity: 1; }\n\n.ih-item.square.effect3.bottom_to_top .info {\n  top: auto;\n  transform: translateY(100%); }\n\n.ih-item.square.effect3.bottom_to_top a:hover .info {\n  transform: translateY(0); }\n\n.ih-item.square.effect3.top_to_bottom .info {\n  bottom: auto;\n  transform: translateY(-100%); }\n\n.ih-item.square.effect3.top_to_bottom a:hover .info {\n  transform: translateY(0); }\n\n.icon-box {\n  margin-top: 30px;\n  position: relative;\n  padding: 0 0 0 80px; }\n  .icon-box .ibox-icon {\n    display: block;\n    position: absolute;\n    width: 64px;\n    height: 64px;\n    top: 0;\n    left: 0; }\n    .icon-box .ibox-icon a {\n      text-decoration: none; }\n    .icon-box .ibox-icon a,\n    .icon-box .ibox-icon i,\n    .icon-box .ibox-icon img {\n      display: block;\n      position: relative;\n      width: 100%;\n      height: 100%;\n      color: #FFF; }\n    .icon-box .ibox-icon i,\n    .icon-box .ibox-icon img {\n      border-radius: 50%;\n      background-color: #2196F3; }\n    .icon-box .ibox-icon i {\n      font-style: normal;\n      font-size: 28px;\n      text-align: center;\n      line-height: 64px; }\n  .icon-box h3 {\n    font-size: 16px;\n    font-weight: bold;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    margin: 0;\n    color: rgba(0, 0, 0, 0.87); }\n  .icon-box p {\n    margin: 8px 0 0 0;\n    color: #999; }\n  .icon-box .before-heading {\n    font-size: 14px; }\n\n/* Icon Box - Icon Large\n-----------------------------------------------------------------*/\n.icon-box.ibox-lg {\n  padding: 0 0 0 115px; }\n  .icon-box.ibox-lg .ibox-icon {\n    width: 96px;\n    height: 96px; }\n    .icon-box.ibox-lg .ibox-icon i {\n      font-size: 42px;\n      line-height: 96px; }\n\n/* Icon Box - Icon Outline\n-----------------------------------------------------------------*/\n.icon-box.ibox-outline .ibox-icon {\n  border: 1px solid #2196F3;\n  border-radius: 50%;\n  padding: 3px; }\n  .icon-box.ibox-outline .ibox-icon i {\n    line-height: 56px; }\n\n/* Icon Box - Icon Outline Large\n-----------------------------------------------------------------*/\n.icon-box.ibox-outline.ibox-lg .ibox-icon {\n  padding: 4px; }\n  .icon-box.ibox-outline.ibox-lg .ibox-icon i {\n    line-height: 86px; }\n\n/* Icon Box - Icon Rounded\n-----------------------------------------------------------------*/\n.icon-box.ibox-rounded .ibox-icon {\n  border-radius: 0.2rem !important; }\n  .icon-box.ibox-rounded .ibox-icon i,\n  .icon-box.ibox-rounded .ibox-icon img {\n    border-radius: 0.2rem !important; }\n\n/* Icon Box - Icon Rounded & Large\n-----------------------------------------------------------------*/\n.icon-box.ibox-rounded.ibox-lg .ibox-icon {\n  border-radius: 0.2rem !important; }\n  .icon-box.ibox-rounded.ibox-lg .ibox-icon i,\n  .icon-box.ibox-rounded.ibox-lg .ibox-icon img {\n    border-radius: 0.2rem !important; }\n\n/* Icon Box - Light Background\n-----------------------------------------------------------------*/\n.icon-box.ibox-light i,\n.icon-box.ibox-light img {\n  background-color: #e5e5e5;\n  color: rgba(0, 0, 0, 0.87); }\n\n.icon-box.ibox-light.ibox-outline .ibox-icon {\n  border-color: #E5E5E5; }\n  .icon-box.ibox-light.ibox-outline .ibox-icon i {\n    line-height: 54px; }\n\n.icon-box.ibox-light.ibox-outline i,\n.icon-box.ibox-light.ibox-outline img {\n  border: 1px solid #E5E5E5;\n  background-color: #e5e5e5;\n  color: rgba(0, 0, 0, 0.87); }\n\n.icon-box.ibox-light.ibox-outline.ibox-lg .ibox-icon i {\n  line-height: 84px; }\n\n.icon-box.ibox-light .ibox-icon i {\n  line-height: 62px; }\n\n.icon-box.ibox-lg .ibox-icon i {\n  line-height: 96px; }\n\n/* Icon Box - Dark Background\n-----------------------------------------------------------------*/\n.icon-box.ibox-dark.ibox-outline .ibox-icon {\n  border-color: rgba(0, 0, 0, 0.87); }\n\n.icon-box.ibox-dark .ibox-icon i,\n.icon-box.ibox-dark .ibox-icon img {\n  background-color: rgba(0, 0, 0, 0.87); }\n\n/* Icon Box - Border\n-----------------------------------------------------------------*/\n.icon-box.ibox-border .ibox-icon {\n  border: 1px solid #2196F3;\n  border-radius: 50%; }\n  .icon-box.ibox-border .ibox-icon i,\n  .icon-box.ibox-border .ibox-icon img {\n    border: none;\n    background-color: transparent !important;\n    color: #2196F3; }\n\n.icon-box.ibox-border .ibox-icon {\n  padding: 0; }\n  .icon-box.ibox-border .ibox-icon i {\n    line-height: 62px !important; }\n\n.icon-box.ibox-border.ibox-lg .ibox-icon i {\n  line-height: 94px !important; }\n\n/* Icon Box - Border - Light\n-----------------------------------------------------------------*/\n.icon-box.ibox-border.ibox-light .ibox-icon {\n  border-color: #E5E5E5; }\n\n.icon-box.ibox-border.ibox-light i,\n.icon-box.ibox-border.ibox-light img {\n  color: #888; }\n\n/* Icon Box - Border - Dark\n-----------------------------------------------------------------*/\n.icon-box.ibox-border.ibox-dark .ibox-icon {\n  border-color: #333; }\n\n.icon-box.ibox-border.ibox-dark i,\n.icon-box.ibox-border.ibox-dark img {\n  color: rgba(0, 0, 0, 0.87); }\n\n/* Icon Box - Plain\n-----------------------------------------------------------------*/\n.icon-box.ibox-plain .ibox-icon {\n  border: none !important;\n  height: auto !important; }\n  .icon-box.ibox-plain .ibox-icon i,\n  .icon-box.ibox-plain .ibox-icon img {\n    border: none !important;\n    background-color: transparent !important;\n    color: #2196F3;\n    border-radius: 0; }\n  .icon-box.ibox-plain .ibox-icon i {\n    font-size: 48px;\n    line-height: 1 !important; }\n  .icon-box.ibox-plain .ibox-icon img {\n    height: 64px; }\n\n.icon-box.ibox-plain.ibox-image .ibox-icon {\n  width: auto; }\n\n.icon-box.ibox-plain.ibox-image img {\n  width: auto;\n  display: inline-block; }\n\n.icon-box.ibox-plain.ibox-small {\n  padding-left: 42px; }\n  .icon-box.ibox-plain.ibox-small .ibox-icon {\n    width: 28px; }\n    .icon-box.ibox-plain.ibox-small .ibox-icon i {\n      font-size: 28px; }\n    .icon-box.ibox-plain.ibox-small .ibox-icon img {\n      height: 28px; }\n  .icon-box.ibox-plain.ibox-small h3 {\n    font-size: 15px;\n    line-height: 26px;\n    margin-bottom: 10px; }\n  .icon-box.ibox-plain.ibox-small p {\n    margin-left: -42px; }\n\n.icon-box.ibox-plain.ibox-lg .ibox-icon i {\n  font-size: 72px; }\n\n.icon-box.ibox-plain.ibox-lg .ibox-icon img {\n  height: 96px; }\n\n.icon-box.ibox-plain.ibox-light .ibox-icon i,\n.icon-box.ibox-plain.ibox-light .ibox-icon img {\n  color: #888; }\n\n.icon-box.ibox-plain.ibox-dark .ibox-icon i,\n.icon-box.ibox-plain.ibox-dark .ibox-icon img {\n  color: rgba(0, 0, 0, 0.87); }\n\n/* Icon Box - Center\n-----------------------------------------------------------------*/\n.icon-box.ibox-center {\n  padding: 0;\n  text-align: center; }\n  .icon-box.ibox-center.ibox-small {\n    padding-left: 0 !important; }\n  .icon-box.ibox-center .ibox-icon {\n    position: relative;\n    margin: 0 auto; }\n  .icon-box.ibox-center h3 {\n    margin: .8em 0 0; }\n  .icon-box.ibox-center p {\n    font-size: 14px;\n    margin-top: 0em; }\n\n/* Icon Box - Right\n-----------------------------------------------------------------*/\n.icon-box.ibox-right {\n  padding: 0 80px 0 0;\n  text-align: right; }\n  .icon-box.ibox-right.ibox-lg {\n    padding-right: 115px; }\n  .icon-box.ibox-right .ibox-icon {\n    left: auto;\n    right: 0; }\n  .icon-box.ibox-right.ibox-plain.ibox-small {\n    padding: 0 42px 0 0; }\n    .icon-box.ibox-right.ibox-plain.ibox-small p {\n      margin: 0 -42px 0 0; }\n\n/* Dark Theme\n-----------------------------------------------------------------*/\n.theme-gray .icon-box h3,\n.theme-dark .icon-box h3 {\n  color: rgba(255, 255, 255, 0.7); }\n\n/* Boxed\n-----------------------------------------------------------------*/\n.box-body > .icon-box {\n  margin-top: 0; }\n\n.preloaderbar {\n  z-index: 1040;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  margin-bottom: -4px; }\n  .preloaderbar .bar {\n    position: absolute;\n    width: 100%;\n    height: 0;\n    text-indent: -9999px;\n    background-color: #23b7e5; }\n    .preloaderbar .bar:before {\n      position: absolute;\n      right: 50%;\n      left: 50%;\n      height: 4px;\n      background-color: inherit;\n      content: \"\"; }\n  .preloaderbar.active {\n    animation: changebar 2.25s infinite 0.75s; }\n  .preloaderbar.active .bar {\n    animation: changebar 2.25s infinite; }\n  .preloaderbar.active .bar:before {\n    animation: movingbar 0.75s infinite; }\n\n@keyframes movingbar {\n  0% {\n    right: 50%;\n    left: 50%; }\n  99.9% {\n    right: 0;\n    left: 0; }\n  100% {\n    right: 50%;\n    left: 50%; } }\n\n@keyframes changebar {\n  0% {\n    background-color: #9CCC65; }\n  33.3% {\n    background-color: #9CCC65; }\n  33.33% {\n    background-color: #FFCA28; }\n  66.6% {\n    background-color: #FFCA28; }\n  66.66% {\n    background-color: #EF5350; }\n  99.9% {\n    background-color: #EF5350; }\n  100% {\n    background-color: #9CCC65; } }\n\n.mdl-card.mdl-card-full-width {\n  width: 100%; }\n\n.card-panel {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  padding: 20px;\n  margin: 10px 0 20px 0;\n  border-radius: 2px; }\n\n.card {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  position: relative;\n  overflow: hidden;\n  margin: 10px 0 20px 0;\n  border-radius: 2px; }\n  .card .card-title {\n    font-size: 24px; }\n    .card .card-title.activator {\n      cursor: pointer; }\n  .card .card-action > a {\n    margin-right: 20px;\n    text-transform: uppercase; }\n  .card .card-image {\n    position: relative; }\n    .card .card-image img {\n      border-radius: 2px 2px 0 0;\n      position: relative;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      width: 100%; }\n    .card .card-image .card-title {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 20px;\n      color: #fff;\n      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25); }\n  .card .card-content {\n    padding: 20px;\n    border-radius: 0 0 2px 2px; }\n    .card .card-content p {\n      margin: 0;\n      color: inherit; }\n    .card .card-content .card-title {\n      line-height: 48px; }\n    .card .card-content .card-profile-img {\n      position: relative;\n      z-index: 1;\n      margin-top: -70px;\n      border-radius: 50%;\n      width: 100px;\n      height: 100px;\n      padding: 5px;\n      background-color: #fff; }\n      .card .card-content .card-profile-img img {\n        width: 90px;\n        height: 90px;\n        border-radius: 50%; }\n      .card .card-content .card-profile-img.profile-img-sm {\n        margin-top: -50px;\n        width: 60px;\n        height: 60px;\n        padding: 2px; }\n        .card .card-content .card-profile-img.profile-img-sm img {\n          width: 56px;\n          height: 56px;\n          border-radius: 50%; }\n    .card .card-content .card-button .btn-icon {\n      position: relative;\n      z-index: 1;\n      margin-top: -65px; }\n  .card .card-action {\n    border-top: 1px solid rgba(0, 0, 0, 0.05);\n    padding: 20px; }\n    .card .card-action.no-border {\n      border: 0; }\n  .card .card-reveal {\n    padding: 20px;\n    position: absolute;\n    background-color: #FFF;\n    width: 100%;\n    overflow-y: auto;\n    top: 100%;\n    height: 100%;\n    z-index: 1; }\n    .card .card-reveal .card-title {\n      cursor: pointer;\n      display: block; }\n\n.theme-gray .mdl-card,\n.theme-dark .mdl-card {\n  color: rgba(255, 255, 255, 0.7); }\n\n.theme-gray .mdl-card__supporting-text,\n.theme-dark .mdl-card__supporting-text {\n  color: rgba(255, 255, 255, 0.7); }\n\n.theme-gray .mdl-card {\n  background-color: #4b4b4b; }\n\n.theme-dark .mdl-card {\n  background-color: #404b55; }\n\n.mdl-data-table.mdl-data-table-non-numeric td, .mdl-data-table.mdl-data-table-non-numeric th {\n  text-align: left; }\n\n.box.table-box {\n  border-radius: 0; }\n\n.box > .mdl-data-table {\n  width: 100%;\n  background-color: transparent; }\n\n.table-responsive {\n  overflow-x: auto;\n  min-height: 0.01%; }\n  @media screen and (max-width: 767px) {\n    .table-responsive {\n      width: 100%;\n      margin-bottom: 1.125rem;\n      overflow-y: hidden;\n      -ms-overflow-style: -ms-autohiding-scrollbar;\n      border: 1px solid rgba(0, 0, 0, 0.1); }\n      .table-responsive > .mdl-data-table {\n        margin-bottom: 0; }\n        .table-responsive > .mdl-data-table > thead > tr > th,\n        .table-responsive > .mdl-data-table > thead > tr > td,\n        .table-responsive > .mdl-data-table > tbody > tr > th,\n        .table-responsive > .mdl-data-table > tbody > tr > td,\n        .table-responsive > .mdl-data-table > tfoot > tr > th,\n        .table-responsive > .mdl-data-table > tfoot > tr > td {\n          white-space: nowrap; }\n      .table-responsive > .table-bordered {\n        border: 0; }\n        .table-responsive > .table-bordered > thead > tr > th:first-child,\n        .table-responsive > .table-bordered > thead > tr > td:first-child,\n        .table-responsive > .table-bordered > tbody > tr > th:first-child,\n        .table-responsive > .table-bordered > tbody > tr > td:first-child,\n        .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n        .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n          border-left: 0; }\n        .table-responsive > .table-bordered > thead > tr > th:last-child,\n        .table-responsive > .table-bordered > thead > tr > td:last-child,\n        .table-responsive > .table-bordered > tbody > tr > th:last-child,\n        .table-responsive > .table-bordered > tbody > tr > td:last-child,\n        .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n        .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n          border-right: 0; }\n        .table-responsive > .table-bordered > tbody > tr:last-child > th,\n        .table-responsive > .table-bordered > tbody > tr:last-child > td,\n        .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n        .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n          border-bottom: 0; } }\n\n.theme-gray .box > .mdl-data-table th,\n.theme-dark .box > .mdl-data-table th {\n  color: rgba(255, 255, 255, 0.5); }\n\nimg.img30_30 {\n  width: 30px;\n  height: 30px; }\n\nimg.img40_40 {\n  width: 40px;\n  height: 40px; }\n\nimg.img64_64 {\n  width: 64px;\n  height: 64px; }\n\nimg.img80_80 {\n  width: 80px;\n  height: 80px; }\n\n.pricing-table {\n  transition: 0.25s ease-out;\n  position: relative;\n  margin-bottom: 20px;\n  background-color: #fcfcfc;\n  color: #999;\n  border-radius: 0.2rem;\n  box-shadow: none;\n  text-align: center; }\n  .pricing-table:hover {\n    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15); }\n  .pricing-table header {\n    background-color: #8c8c8c;\n    text-align: center;\n    padding: 1.25rem 0.75rem; }\n    .pricing-table header h2 {\n      margin: 0;\n      font-size: 1.25rem;\n      line-height: 1;\n      font-weight: normal;\n      text-transform: uppercase;\n      color: #fff; }\n  .pricing-table .pricing-price {\n    padding: 45px 15px;\n    background-color: #999;\n    font-size: 56px;\n    line-height: 1;\n    color: #fff;\n    font-weight: 300; }\n    .pricing-table .pricing-price .pricing-sign {\n      margin-right: 5px;\n      font-size: 24px;\n      font-weight: normal; }\n    .pricing-table .pricing-price .pricing-sub {\n      margin-left: 5px;\n      font-size: 22px;\n      line-height: 1; }\n  .pricing-table .pricing-lead {\n    margin-bottom: 1.5em;\n    font-size: 18px;\n    text-transform: uppercase; }\n    .pricing-table .pricing-lead:after {\n      margin: 0 auto;\n      content: \"\";\n      height: 0px;\n      width: 80px;\n      padding-top: .6em;\n      border-bottom: solid 3px #eff0f3;\n      display: block; }\n  .pricing-table .pricing-plan-details {\n    padding: 1em; }\n    .pricing-table .pricing-plan-details > ul {\n      margin: 0;\n      padding: 0;\n      list-style: none;\n      font-size: 1rem;\n      line-height: 2em; }\n  .pricing-table > footer {\n    padding: 2em;\n    text-align: center; }\n    .pricing-table > footer > a {\n      display: block;\n      margin: 0 auto;\n      padding: 12px;\n      font-size: 14px;\n      line-height: 1;\n      width: 100%;\n      max-width: 200px; }\n  .pricing-table.pricing-table-primary header {\n    background-color: #0d8aee; }\n  .pricing-table.pricing-table-primary .pricing-price {\n    background-color: #2196F3; }\n  .pricing-table.pricing-table-primary:after {\n    border-top: 6px solid #2196F3;\n    border-left: 6px solid #2196F3; }\n  .pricing-table.pricing-table-secondary header, .pricing-table.pricing-table-info header {\n    background-color: #00a5bb; }\n  .pricing-table.pricing-table-secondary .pricing-price, .pricing-table.pricing-table-info .pricing-price {\n    background-color: #00BCD4; }\n  .pricing-table.pricing-table-secondary:after, .pricing-table.pricing-table-info:after {\n    border-top: 6px solid #00BCD4;\n    border-left: 6px solid #00BCD4; }\n  .pricing-table.pricing-table-success header {\n    background-color: #54b359; }\n  .pricing-table.pricing-table-success .pricing-price {\n    background-color: #66BB6A; }\n  .pricing-table.pricing-table-success:after {\n    border-top: 6px solid #66BB6A;\n    border-left: 6px solid #66BB6A; }\n  .pricing-table.pricing-table-warning header {\n    background-color: #ffc40f; }\n  .pricing-table.pricing-table-warning .pricing-price {\n    background-color: #FFCA28; }\n  .pricing-table.pricing-table-warning:after {\n    border-top: 6px solid #FFCA28;\n    border-left: 6px solid #FFCA28; }\n  .pricing-table.pricing-table-danger header {\n    background-color: #ed3c39; }\n  .pricing-table.pricing-table-danger .pricing-price {\n    background-color: #EF5350; }\n  .pricing-table.pricing-table-danger:after {\n    border-top: 6px solid #EF5350;\n    border-left: 6px solid #EF5350; }\n\n.theme-gray .pricing-table {\n  background-color: #4b4b4b; }\n\n.theme-dark .pricing-table {\n  background-color: #404b55; }\n\n.ui-ribbon-container {\n  position: relative; }\n  .ui-ribbon-container .ui-ribbon-wrapper {\n    position: absolute;\n    overflow: hidden;\n    width: 85px;\n    height: 88px;\n    top: -3px;\n    right: -3px; }\n  .ui-ribbon-container .ui-ribbon {\n    position: relative;\n    display: block;\n    text-align: center;\n    font-size: 15px;\n    color: #fff;\n    transform: rotate(45deg);\n    padding: 7px 0;\n    left: -5px;\n    top: 15px;\n    width: 120px;\n    line-height: 20px;\n    background-color: #464a4c;\n    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); }\n    .ui-ribbon-container .ui-ribbon:before, .ui-ribbon-container .ui-ribbon:after {\n      position: absolute;\n      content: \" \";\n      line-height: 0;\n      border-top: 2px solid #464a4c;\n      border-left: 2px solid transparent;\n      border-right: 2px solid transparent;\n      bottom: -2px; }\n    .ui-ribbon-container .ui-ribbon:before {\n      left: 0;\n      bottom: -1px; }\n    .ui-ribbon-container .ui-ribbon:after {\n      right: 0; }\n  .ui-ribbon-container.ui-ribbon-primary .ui-ribbon {\n    background-color: #2196F3; }\n    .ui-ribbon-container.ui-ribbon-primary .ui-ribbon:before, .ui-ribbon-container.ui-ribbon-primary .ui-ribbon:after {\n      border-top: 2px solid #2196F3; }\n  .ui-ribbon-container.ui-ribbon-success .ui-ribbon {\n    background-color: #66BB6A; }\n    .ui-ribbon-container.ui-ribbon-success .ui-ribbon:before, .ui-ribbon-container.ui-ribbon-success .ui-ribbon:after {\n      border-top: 2px solid #66BB6A; }\n  .ui-ribbon-container.ui-ribbon-info .ui-ribbon {\n    background-color: #00BCD4; }\n    .ui-ribbon-container.ui-ribbon-info .ui-ribbon:before, .ui-ribbon-container.ui-ribbon-info .ui-ribbon:after {\n      border-top: 2px solid #00BCD4; }\n  .ui-ribbon-container.ui-ribbon-warning .ui-ribbon {\n    background-color: #FFCA28; }\n    .ui-ribbon-container.ui-ribbon-warning .ui-ribbon:before, .ui-ribbon-container.ui-ribbon-warning .ui-ribbon:after {\n      border-top: 2px solid #FFCA28; }\n  .ui-ribbon-container.ui-ribbon-danger .ui-ribbon {\n    background-color: #EF5350; }\n    .ui-ribbon-container.ui-ribbon-danger .ui-ribbon:before, .ui-ribbon-container.ui-ribbon-danger .ui-ribbon:after {\n      border-top: 2px solid #EF5350; }\n\n.sash {\n  display: block;\n  position: absolute;\n  left: 0;\n  right: auto;\n  top: 25px;\n  z-index: 1; }\n  .sash .material-icons {\n    font-size: 14px;\n    height: 20px;\n    height: 20px;\n    line-height: 30px; }\n\n.sash {\n  cursor: default;\n  overflow: visible;\n  pointer-events: none;\n  position: absolute;\n  background-color: #636c72;\n  pointer-events: auto;\n  color: #fff; }\n  .sash > div {\n    position: relative;\n    z-index: 1;\n    height: 30px;\n    line-height: 30px;\n    transition: width 0.1s 0.05s cubic-bezier(0.86, 0, 0.07, 1);\n    width: 25px; }\n    .sash > div:hover {\n      -webkit-transition-delay: 0;\n      transition-delay: 0;\n      width: 100%; }\n      .sash > div:hover .sash-text {\n        opacity: 1;\n        width: 100%;\n        padding-left: 15px; }\n  .sash .sash-text {\n    display: block;\n    opacity: 0;\n    overflow: hidden;\n    transition: opacity 0.3s, padding 0.25s, width 0.25s;\n    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);\n    white-space: nowrap;\n    width: 3em;\n    float: left;\n    margin-left: 5px;\n    padding-right: 20px; }\n  .sash i {\n    position: absolute;\n    right: 1px;\n    margin-left: 5px; }\n    .sash i:before {\n      color: #f5f5f5; }\n  .sash.sash-triangle-right:after {\n    background-color: transparent;\n    border: 15px solid #636c72;\n    border-right-color: transparent;\n    bottom: 0;\n    content: \" \";\n    position: absolute;\n    right: -20px; }\n  .sash.sash-primary {\n    background-color: #2196F3; }\n    .sash.sash-primary.sash-triangle-right:after {\n      border-color: #2196F3;\n      border-right-color: transparent; }\n  .sash.sash-info {\n    background-color: #00BCD4; }\n    .sash.sash-info.sash-triangle-right:after {\n      border-color: #00BCD4;\n      border-right-color: transparent; }\n  .sash.sash-success {\n    background-color: #66BB6A; }\n    .sash.sash-success.sash-triangle-right:after {\n      border-color: #66BB6A;\n      border-right-color: transparent; }\n  .sash.sash-warning {\n    background-color: #FFCA28; }\n    .sash.sash-warning.sash-triangle-right:after {\n      border-color: #FFCA28;\n      border-right-color: transparent; }\n  .sash.sash-danger {\n    background-color: #EF5350; }\n    .sash.sash-danger.sash-triangle-right:after {\n      border-color: #EF5350;\n      border-right-color: transparent; }\n  .sash.sash-primary {\n    background-color: #2196F3; }\n    .sash.sash-primary.sash-triangle-right:after {\n      border-color: #2196F3;\n      border-right-color: transparent; }\n  .sash.sash-white {\n    background-color: #fff;\n    color: rgba(0, 0, 0, 0.87); }\n    .sash.sash-white.sash-triangle-right:after {\n      border-color: #fff;\n      border-right-color: transparent; }\n\n.testimonial {\n  text-align: center; }\n  .testimonial .testimonial__quote {\n    display: block;\n    text-align: center; }\n    .testimonial .testimonial__quote .material-icons {\n      font-size: 3.5em;\n      line-height: 1em; }\n  .testimonial blockquote:before, .testimonial blockquote:after {\n    content: none; }\n  .testimonial .avatar {\n    border-radius: 50%;\n    max-width: 80px; }\n  .testimonial h5 {\n    font-size: 1rem;\n    margin-bottom: .4em; }\n  .testimonial .title {\n    opacity: .54; }\n\n.testimonial-alt .avatar {\n  max-width: 100px;\n  margin-bottom: 1rem; }\n\n.testimonial-alt blockquote {\n  margin: 0;\n  font-size: 1.25rem;\n  opacity: .9;\n  border-left: 0; }\n\n.testimonial-alt .citation {\n  font-size: 1rem;\n  opacity: .54; }\n\n.ui-timline-container {\n  padding: 15px; }\n\n.ui-timline-left .ui-timeline:before {\n  left: 0; }\n\n@media (min-width: 768px) {\n  .ui-timline-left .ui-timeline .tl-item:before {\n    display: none; } }\n\n@media (min-width: 768px) {\n  .ui-timline-left .ui-timeline .tl-item .tl-caption {\n    margin-left: -55px; } }\n\n@media (min-width: 768px) {\n  .ui-timline-left .ui-timeline .tl-item .tl-body .tl-time {\n    left: auto;\n    right: 15px;\n    color: #636c72; } }\n\n.ui-timeline {\n  display: table;\n  position: relative;\n  table-layout: fixed;\n  width: 100%;\n  border-spacing: 0;\n  border-collapse: collapse; }\n  .ui-timeline:before {\n    background-color: rgba(0, 0, 0, 0.15);\n    bottom: 0px;\n    content: \"\";\n    position: absolute;\n    left: 0;\n    top: 30px;\n    width: 1px;\n    z-index: 0; }\n    @media (min-width: 768px) {\n      .ui-timeline:before {\n        left: 50%; } }\n  .ui-timeline .tl-item {\n    display: table-row;\n    margin-bottom: 5px; }\n    .ui-timeline .tl-item:before {\n      display: none;\n      content: \"\"; }\n      @media (min-width: 768px) {\n        .ui-timeline .tl-item:before {\n          display: block;\n          width: 50%; } }\n    .ui-timeline .tl-item .tl-caption {\n      width: 150px;\n      margin-left: -55px; }\n      @media (min-width: 768px) {\n        .ui-timeline .tl-item .tl-caption {\n          margin-left: -110px; } }\n    @media (min-width: 768px) {\n      .ui-timeline .tl-item.alt {\n        text-align: right; }\n        .ui-timeline .tl-item.alt:before {\n          display: none; }\n        .ui-timeline .tl-item.alt:after {\n          content: \"\";\n          display: block;\n          width: 50%; }\n        .ui-timeline .tl-item.alt .tl-body .tl-entry {\n          margin: 0 35px 15px 0; }\n        .ui-timeline .tl-item.alt .tl-body .tl-time {\n          right: -220px;\n          left: auto;\n          text-align: left; }\n        .ui-timeline .tl-item.alt .tl-body .tl-icon {\n          right: -53px;\n          left: auto; }\n        .ui-timeline .tl-item.alt .tl-body .tl-content:after {\n          right: -16px;\n          left: auto;\n          border: 8px solid transparent;\n          border-left: 8px solid rgba(255, 255, 255, 0.9);\n          border-top: 8px solid rgba(255, 255, 255, 0.9); } }\n    .ui-timeline .tl-item .tl-body {\n      display: table-cell;\n      width: 50%;\n      vertical-align: top; }\n      .ui-timeline .tl-item .tl-body .tl-entry {\n        position: relative;\n        margin: 0 0 15px 36px; }\n      .ui-timeline .tl-item .tl-body .tl-time {\n        z-index: 1;\n        position: absolute;\n        left: auto;\n        right: 15px;\n        top: 0;\n        width: 150px;\n        color: #636c72;\n        line-height: 35px;\n        text-align: right; }\n        @media (min-width: 768px) {\n          .ui-timeline .tl-item .tl-body .tl-time {\n            left: -220px;\n            right: auto;\n            color: rgba(0, 0, 0, 0.87); } }\n      .ui-timeline .tl-item .tl-body .tl-icon {\n        position: absolute;\n        left: -53px;\n        top: 0; }\n        .ui-timeline .tl-item .tl-body .tl-icon .material-icons {\n          font-size: 20px; }\n      .ui-timeline .tl-item .tl-body .tl-content {\n        position: relative;\n        padding: 15px;\n        border-radius: 0.2rem;\n        background-color: rgba(255, 255, 255, 0.9); }\n        .ui-timeline .tl-item .tl-body .tl-content:after {\n          content: \" \";\n          line-height: 0;\n          position: absolute;\n          left: -16px;\n          top: 0;\n          border: 8px solid transparent;\n          border-right: 8px solid rgba(255, 255, 255, 0.9);\n          border-top: 8px solid rgba(255, 255, 255, 0.9); }\n        .ui-timeline .tl-item .tl-body .tl-content h4 {\n          font-size: 18px;\n          line-height: 1.5rem;\n          line-height: 1.1; }\n\n@media (min-width: 768px) {\n  .theme-gray .ui-timeline .tl-item.alt .tl-body .tl-content:after,\n  .theme-dark .ui-timeline .tl-item.alt .tl-body .tl-content:after {\n    border-left: 8px solid rgba(255, 255, 255, 0.05);\n    border-top: 8px solid rgba(255, 255, 255, 0.05); } }\n\n.theme-gray .ui-timeline .tl-item .tl-body .tl-content,\n.theme-dark .ui-timeline .tl-item .tl-body .tl-content {\n  background-color: rgba(255, 255, 255, 0.05); }\n  .theme-gray .ui-timeline .tl-item .tl-body .tl-content:after,\n  .theme-dark .ui-timeline .tl-item .tl-body .tl-content:after {\n    border-right: 8px solid rgba(255, 255, 255, 0.05);\n    border-top: 8px solid rgba(255, 255, 255, 0.05); }\n", ""]);

// exports


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(207);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./App.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./App.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(208);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./HeaderInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./HeaderInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(209);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./Page404Inner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./Page404Inner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(210);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageAccountViewInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageAccountViewInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(211);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageCalculateViewInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageCalculateViewInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(212);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageChartsViewInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageChartsViewInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(213);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageErrorView.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageErrorView.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(214);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageForgotPasswordInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageForgotPasswordInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(215);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageLoginInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageLoginInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(216);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PagePrivacyInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PagePrivacyInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(217);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageRegisterInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageRegisterInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(218);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageReportsViewInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageReportsViewInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(219);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageResetPasswordInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageResetPasswordInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(220);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageSystemViewInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageSystemViewInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(221);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageTermsInner.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./PageTermsInner.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(222);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./FilterToolbar.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./FilterToolbar.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(223);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./FilterBarForm.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./FilterBarForm.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(224);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./TabView.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./TabView.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(225);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./app.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(226);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./bootstrap.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./bootstrap.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(227);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./layout.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./layout.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(228);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./theme.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(229);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./ui.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./ui.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 253 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 254 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = require("blockchain.info/blockexplorer");

/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = require("chokidar");

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 258 */
/***/ (function(module, exports) {

module.exports = require("continuation-local-storage");

/***/ }),
/* 259 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ }),
/* 260 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 262 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 263 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 264 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 265 */
/***/ (function(module, exports) {

module.exports = require("influx");

/***/ }),
/* 266 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports = require("lodash/fromPairs");

/***/ }),
/* 268 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEqual");

/***/ }),
/* 269 */
/***/ (function(module, exports) {

module.exports = require("lodash/isNil");

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = require("material-ui/CircularProgress");

/***/ }),
/* 271 */
/***/ (function(module, exports) {

module.exports = require("material-ui/FlatButton");

/***/ }),
/* 272 */
/***/ (function(module, exports) {

module.exports = require("material-ui/MenuItem");

/***/ }),
/* 273 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles");

/***/ }),
/* 274 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/getMuiTheme");

/***/ }),
/* 275 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/action/help");

/***/ }),
/* 276 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/action/info");

/***/ }),
/* 277 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/action/search");

/***/ }),
/* 278 */
/***/ (function(module, exports) {

module.exports = require("material-ui/utils/colorManipulator.js");

/***/ }),
/* 279 */
/***/ (function(module, exports) {

module.exports = require("normalizr");

/***/ }),
/* 280 */
/***/ (function(module, exports) {

module.exports = require("path-to-regexp");

/***/ }),
/* 281 */
/***/ (function(module, exports) {

module.exports = require("q");

/***/ }),
/* 282 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 283 */
/***/ (function(module, exports) {

module.exports = require("react-dnd");

/***/ }),
/* 284 */
/***/ (function(module, exports) {

module.exports = require("react-dnd-html5-backend");

/***/ }),
/* 285 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 286 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 287 */
/***/ (function(module, exports) {

module.exports = require("react-idle-timer");

/***/ }),
/* 288 */
/***/ (function(module, exports) {

module.exports = require("react-notification-system");

/***/ }),
/* 289 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 290 */
/***/ (function(module, exports) {

module.exports = require("react-router-bootstrap");

/***/ }),
/* 291 */
/***/ (function(module, exports) {

module.exports = require("react-swipeable-views");

/***/ }),
/* 292 */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),
/* 293 */
/***/ (function(module, exports) {

module.exports = require("wallet-address-validator");

/***/ }),
/* 294 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 295 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 296 */
/***/ (function(module, exports) {

module.exports = require("webpack-manifest-plugin");

/***/ }),
/* 297 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 298 */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map