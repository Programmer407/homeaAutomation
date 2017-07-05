require("source-map-support").install();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash/get");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(5);

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _reduxFormMaterialUI = __webpack_require__(81);

Object.keys(_reduxFormMaterialUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reduxFormMaterialUI[key];
    }
  });
});

var _buildFeedReducer = __webpack_require__(79);

Object.defineProperty(exports, 'buildFeedReducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buildFeedReducer).default;
  }
});

var _buildEntityReducer = __webpack_require__(78);

Object.defineProperty(exports, 'buildEntityReducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buildEntityReducer).default;
  }
});

var _ensureEntity = __webpack_require__(80);

Object.defineProperty(exports, 'ensureEntity', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ensureEntity).default;
  }
});

var _bindForm = __webpack_require__(77);

Object.defineProperty(exports, 'bindForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bindForm).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
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


var _has = __webpack_require__(18);

var _has2 = _interopRequireDefault(_has);

var _get = __webpack_require__(2);

var _get2 = _interopRequireDefault(_get);

var _isEqual = __webpack_require__(31);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _fromPairs = __webpack_require__(110);

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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-document-title");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.META_LOGO_LINK_SET = undefined;

var _entities = __webpack_require__(51);

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

var _api = __webpack_require__(10);

var META_LOGO_LINK_SET = exports.META_LOGO_LINK_SET = 'META_LOGO_LINK_SET';

// src
function setLogoLink(link) {
    return {
        type: META_LOGO_LINK_SET,
        payload: link
    };
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALL_API = exports.Schemas = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _normalizr = __webpack_require__(119);

__webpack_require__(109);

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
/* 11 */
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
  console.error('\x1b[31m', m);
  console.error(error.stack, '\x1b[0m');

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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSessionStore = exports.getPort = exports.stringEndsWith = exports.makeLogContextString = exports.isTest = exports.isProduction = undefined;

var _expressSession = __webpack_require__(104);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressMysqlSession = __webpack_require__(103);

var _expressMysqlSession2 = _interopRequireDefault(_expressMysqlSession);

var _db = __webpack_require__(26);

var _app = __webpack_require__(16);

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
  // proxy_set_header  X-Forwarded-For $remote_addr;

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
  return isProduction() ? 3000 : 3000;
};

var setupSessionStore = exports.setupSessionStore = function setupSessionStore(app) {
  var MySQLStore = (0, _expressMysqlSession2.default)(_expressSession2.default);
  var options = {
    host: _db.host, // Host name for database connection.
    port: 3306, // Port number for database connection.
    user: _db.username, // Database user.
    password: _db.password, // Password for the above database user.
    database: _db.dbName, // Database name.
    checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000, // The maximum age of a valid session; milliseconds.
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
      maxAge: 31536000000
    },
    resave: false,
    saveUninitialized: false
  }));

  return sessionStore;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appUtils = __webpack_require__(13);

Object.keys(_appUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _appUtils[key];
    }
  });
});

var _authUtils = __webpack_require__(89);

Object.keys(_authUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authUtils[key];
    }
  });
});

var _errorUtils = __webpack_require__(11);

Object.keys(_errorUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errorUtils[key];
    }
  });
});

var _influx = __webpack_require__(92);

Object.keys(_influx).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _influx[key];
    }
  });
});

var _sequelize = __webpack_require__(93);

Object.keys(_sequelize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sequelize[key];
    }
  });
});

var _buildEntityManagerFunctions = __webpack_require__(91);

Object.defineProperty(exports, 'buildEntityManagerFunctions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buildEntityManagerFunctions).default;
  }
});

var _bindEntityApiRoutes = __webpack_require__(90);

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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appDevelopment = __webpack_require__(82);

var _appDevelopment2 = _interopRequireDefault(_appDevelopment);

var _appStaging = __webpack_require__(84);

var _appStaging2 = _interopRequireDefault(_appStaging);

var _appProduction = __webpack_require__(83);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderResponse = undefined;

var _ejs = __webpack_require__(20);

var _ejs2 = _interopRequireDefault(_ejs);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(124);

var _reactRouter = __webpack_require__(126);

var _request = __webpack_require__(128);

var _request2 = _interopRequireDefault(_request);

var _reactDocumentTitle = __webpack_require__(6);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _configureStore = __webpack_require__(75);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _utils = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
var enableUniversalRendering = process.env.UNIVERSAL_RENDERING === 'true'; // libs


var makeUniversalHTML = function makeUniversalHTML(req, res, preloadedState) {
  var App = __webpack_require__(50);

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
  var title = 'Sauron';
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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lodash/has");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redux-form");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_SEARCH_BY_NAME_FAILURE = exports.USER_SEARCH_BY_NAME_SUCCESS = exports.USER_SEARCH_BY_NAME = exports.USER_SEARCH_BY_EMAIL_FAILURE = exports.USER_SEARCH_BY_EMAIL_SUCCESS = exports.USER_SEARCH_BY_EMAIL = exports.USER_CHANGE_PASSWORD_FAILURE = exports.USER_CHANGE_PASSWORD_SUCCESS = exports.USER_CHANGE_PASSWORD = exports.USER_RESET_PASSWORD_FAILURE = exports.USER_RESET_PASSWORD_SUCCESS = exports.USER_RESET_PASSWORD = exports.USER_CONFIRM_REGISTRATION_FAILURE = exports.USER_CONFIRM_REGISTRATION_SUCCESS = exports.USER_CONFIRM_REGISTRATION = exports.USER_FORGOT_PASSWORD_FAILURE = exports.USER_FORGOT_PASSWORD_SUCCESS = exports.USER_FORGOT_PASSWORD = exports.USER_REGISTER_FAILURE = exports.USER_REGISTER_SUCCESS = exports.USER_REGISTER = exports.USER_LOGOUT_FAILURE = exports.USER_LOGOUT_SUCCESS = exports.USER_LOGOUT = exports.USER_LOGIN_FAILURE = exports.USER_LOGIN_SUCCESS = exports.USER_LOGIN = undefined;
exports.login = login;
exports.logout = logout;
exports.register = register;
exports.forgotPassword = forgotPassword;
exports.confirmRegistration = confirmRegistration;
exports.resetPassword = resetPassword;
exports.changePassword = changePassword;
exports.searchUsersByEmail = searchUsersByEmail;
exports.searchUsersByName = searchUsersByName;

var _reactRouterRedux = __webpack_require__(7);

var _api = __webpack_require__(10);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // libs


// src


var USER_LOGIN = exports.USER_LOGIN = 'USER_LOGIN';
var USER_LOGIN_SUCCESS = exports.USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
var USER_LOGIN_FAILURE = exports.USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

function callApiLogin(email, password) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, _api.CALL_API, {
    types: [USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE],
    endpoint: '/api/login',
    method: 'POST'
  }), _defineProperty(_ref, 'payload', { email: email, password: password }), _ref;
}

function login(email, password) {
  return function (dispatch, getState) {
    return dispatch(callApiLogin(email, password));
  };
  // adding setTimeout to avoid this warning
  // Warning: setState(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.
  /*
  .then(({error, payload}) => {
    if (error) {
      throw payload
    } 
    
    dispatch(push('/'))
  })
  */
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

function register(firstName, lastName, email) {
  var _ref3;

  return _ref3 = {}, _defineProperty(_ref3, _api.CALL_API, {
    types: [USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE],
    endpoint: '/api/users/create',
    method: 'POST'
  }), _defineProperty(_ref3, 'payload', { firstName: firstName, lastName: lastName, email: email }), _ref3;
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

function confirmRegistration(id, password, confirmPassword) {
  var _ref5;

  return _ref5 = {}, _defineProperty(_ref5, _api.CALL_API, {
    types: [USER_CONFIRM_REGISTRATION, USER_CONFIRM_REGISTRATION_SUCCESS, USER_CONFIRM_REGISTRATION_FAILURE],
    endpoint: '/api/users/verify-account?id=' + id,
    method: 'POST'
  }), _defineProperty(_ref5, 'payload', { password: password, confirmPassword: confirmPassword }), _ref5;
}

var USER_RESET_PASSWORD = exports.USER_RESET_PASSWORD = 'USER_RESET_PASSWORD';
var USER_RESET_PASSWORD_SUCCESS = exports.USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';
var USER_RESET_PASSWORD_FAILURE = exports.USER_RESET_PASSWORD_FAILURE = 'USER_RESET_PASSWORD_FAILURE';

function resetPassword(id, password, confirmPassword) {
  var _ref6;

  return _ref6 = {}, _defineProperty(_ref6, _api.CALL_API, {
    types: [USER_CONFIRM_REGISTRATION, USER_CONFIRM_REGISTRATION_SUCCESS, USER_CONFIRM_REGISTRATION_FAILURE],
    endpoint: '/api/users/reset-password?id=' + id,
    method: 'POST'
  }), _defineProperty(_ref6, 'payload', { id: id, password: password, confirmPassword: confirmPassword }), _ref6;
}

var USER_CHANGE_PASSWORD = exports.USER_CHANGE_PASSWORD = 'USER_CHANGE_PASSWORD';
var USER_CHANGE_PASSWORD_SUCCESS = exports.USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
var USER_CHANGE_PASSWORD_FAILURE = exports.USER_CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE';

function changePassword(currentPassword, newPassword, confirmNewPassword) {
  var _ref7;

  return _ref7 = {}, _defineProperty(_ref7, _api.CALL_API, {
    types: [USER_CONFIRM_REGISTRATION, USER_CONFIRM_REGISTRATION_SUCCESS, USER_CONFIRM_REGISTRATION_FAILURE],
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

/***/ }),
/* 23 */
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

var _reactRouterDom = __webpack_require__(12);

var _reactRedux = __webpack_require__(1);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.meta = meta;

var _redux = __webpack_require__(8);

var _reduxForm = __webpack_require__(19);

var _reactRouterRedux = __webpack_require__(7);

var _moment = __webpack_require__(34);

var _moment2 = _interopRequireDefault(_moment);

var _actions = __webpack_require__(9);

var ActionTypes = _interopRequireWildcard(_actions);

var _entities = __webpack_require__(72);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = exports.history = undefined;

var _createBrowserHistory = __webpack_require__(106);

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reactRouterRedux = __webpack_require__(7);

var _ = __webpack_require__(4);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = __webpack_require__(16);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorUtils = __webpack_require__(11);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(15);

var _express2 = _interopRequireDefault(_express);

var _utils = __webpack_require__(14);

var _managers = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
var router = _express2.default.Router();

// requires email and password


// libs
router.post('/api/login', _utils.ensureAnonymity, function (req, res) {
  var body = req.body;


  if (!body) {
    res.status(400).send({
      message: 'Missing request body'
    });
  }

  var email = body.email,
      password = body.password;


  if (!email || !password) {
    res.status(400).send({
      message: 'Missing requied arguments'
    });
  }

  var user = (0, _managers.findUserByEmailAndPassword)(email, password);

  if (!user) {
    res.status(400).send({
      message: 'Invalid username or password'
    });
  }

  return req.login(user, function (err) {
    if (err) {
      (0, _utils.caughtError)(res, err);
    } else {
      res.send({ user: user });
    }
  });
});

router.get('/api/logout', function (req, res) {
  req.logout();
  res.send({
    message: 'User logged out successfully!'
  });
});

exports.default = router;
module.exports = exports['default'];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(15);

var _express2 = _interopRequireDefault(_express);

var _spa = __webpack_require__(17);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userManager = __webpack_require__(88);

Object.keys(_userManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userManager[key];
    }
  });
});

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEqual");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("material-ui/RaisedButton");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("material-ui/TextField");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chokidar = __webpack_require__(101);

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpack = __webpack_require__(36);
var webpackMiddleware = __webpack_require__(131);
var webpackHotMiddleware = __webpack_require__(132);
var config = __webpack_require__(94);


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
  //console.log(serverPath)
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(130);

var _underscore2 = _interopRequireDefault(_underscore);

var _appUtils = __webpack_require__(13);

var appUtils = _interopRequireWildcard(_appUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import winston from 'winston';
var excludedFilesFromWinstonLogging = ['.js', '.css', '.jpg', '.png', '.ico', '.json'];
var excludePostBodyFromWinstonLogging = ['/api/users/change-password', '/api/users/reset-password', '/api/users/verify-account', '/api/login'];

var setupWinstonProductionLogs = function setupWinstonProductionLogs() {
  __webpack_require__(86);
};

var setupUrlLogs = function setupUrlLogs(req, res, next) {
  var url = req.originalUrl;

  if (req.user) {
    if (!_underscore2.default.any(excludedFilesFromWinstonLogging, function (file) {
      return appUtils.stringEndsWith(url, file);
    })) {

      console.log(appUtils.makeLogContextString(req) + '[' + req.method + ']: ' + req.hostname + req.url);

      if (req.method == 'POST' && !_underscore2.default.any(excludePostBodyFromWinstonLogging, function (url) {
        return req.url == url;
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./api/baseApiController": 27,
	"./api/baseApiController.js": 27,
	"./api/userApiController": 28,
	"./api/userApiController.js": 28,
	"./defaultController": 29,
	"./defaultController.js": 29,
	"./spa": 17,
	"./spa.js": 17
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
webpackContext.id = 39;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\client\\components\\Page404\\Page404Inner.less Unexpected character '@' (1:0)\nYou may need an appropriate loader to handle this file type.\n| @import '../../styles/variables.less';\n| \n| .root {");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\client\\components\\PageErrorView\\PageErrorView.less Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| .root {\n|   \n|   h2 {");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\client\\components\\PageLogin\\PageLoginInner.less Unexpected character '@' (1:0)\nYou may need an appropriate loader to handle this file type.\n| @import '../../styles/errorMessage.less';\n| @import '../../styles/successMessage.less';\n| ");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\client\\components\\PageSystemView\\PageSystemViewInner.less Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| .root {\n|   \n| }");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; // libs


// src
//import styles from "./App.less"


// custom


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(12);

var _getMuiTheme = __webpack_require__(117);

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _reactDnd = __webpack_require__(122);

var _reactDndHtml5Backend = __webpack_require__(123);

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

__webpack_require__(96);

__webpack_require__(97);

__webpack_require__(98);

__webpack_require__(99);

__webpack_require__(95);

var _theme = __webpack_require__(85);

var _theme2 = _interopRequireDefault(_theme);

var _components = __webpack_require__(71);

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
              { className: "" },
              _react2.default.createElement(_components.NotificationSystemConnector, null),
              _react2.default.createElement(
                "div",
                { className: "" },
                _react2.default.createElement(
                  "div",
                  { className: "" },
                  _react2.default.createElement(
                    "div",
                    { className: "container-fluid" },
                    _react2.default.createElement(
                      _reactRouterDom.Switch,
                      null,
                      _react2.default.createElement(_components.PublicRoute, { path: "/login", component: _components.PageLogin }),
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
  userAgent: _react2.default.PropTypes.string,
  store: _react2.default.PropTypes.object,
  Router: _react2.default.PropTypes.element,
  routerProps: _react2.default.PropTypes.routerProps
}, _class.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object
}, _temp);
exports.default = App;
module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = __webpack_require__(22);

Object.keys(_users).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _users[key];
    }
  });
});

/***/ }),
/* 52 */
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

var _reactRedux = __webpack_require__(1);

var _reactNotificationSystem = __webpack_require__(125);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _NotificationSystemConnector = __webpack_require__(52);

var _NotificationSystemConnector2 = _interopRequireDefault(_NotificationSystemConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _NotificationSystemConnector2.default;
module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Page404Inner = __webpack_require__(55);

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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(12);

var _reactDocumentTitle = __webpack_require__(6);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _Page404Inner = __webpack_require__(46);

var _Page404Inner2 = _interopRequireDefault(_Page404Inner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var Page404Inner = function Page404Inner(props) {
  return _react2.default.createElement(
    'div',
    { className: _Page404Inner2.default.root + ' row' },
    _react2.default.createElement(_reactDocumentTitle2.default, { title: '404 - GivingAt.work' }),
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Page = __webpack_require__(54);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Page2.default;
module.exports = exports['default'];

/***/ }),
/* 57 */
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

var _reactRedux = __webpack_require__(1);

var _reactDocumentTitle = __webpack_require__(6);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageErrorView = __webpack_require__(47);

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
        _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Dashboard - GivingAt.work' }),
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
                'Environment Editor'
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageErrorView = __webpack_require__(57);

var _PageErrorView2 = _interopRequireDefault(_PageErrorView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageErrorView2.default;
module.exports = exports['default'];

/***/ }),
/* 59 */
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

var _reduxForm = __webpack_require__(19);

var _reactRouterRedux = __webpack_require__(7);

var _get = __webpack_require__(2);

var _get2 = _interopRequireDefault(_get);

var _PageLoginInner = __webpack_require__(60);

var _PageLoginInner2 = _interopRequireDefault(_PageLoginInner);

var _users = __webpack_require__(22);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = ['email', 'password'];

var validate = function validate(values) {
  return {};
};

var PageLogin = (_dec = (0, _reduxForm.reduxForm)({
  form: 'loginForm',
  fields: fields,
  validate: validate
}), _dec2 = (0, _utils.bindForm)({
  onSubmit: function onSubmit(values, dispatch, props) {
    var email = values.email,
        password = values.password;


    return dispatch((0, _users.login)(email, password)).then(function (action) {
      var error = action.error,
          payload = action.payload;


      if (!error) {
        var linkNext = (0, _get2.default)(payload, 'user.linkHome', '/');
        dispatch((0, _reactRouterRedux.push)(linkNext));
      }

      return action;
    });
  }
}), _dec(_class = _dec2(_class = function (_React$Component) {
  _inherits(PageLogin, _React$Component);

  function PageLogin(props) {
    _classCallCheck(this, PageLogin);

    return _possibleConstructorReturn(this, (PageLogin.__proto__ || Object.getPrototypeOf(PageLogin)).call(this, props));
  }

  _createClass(PageLogin, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_PageLoginInner2.default, this.props);
    }

    //HH: sorry @umar, I am ruining some beautiful code. 

  }, {
    key: 'getParameterByName',
    value: function getParameterByName(name, url) {
      if (!url) url = window.location.href;

      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }]);

  return PageLogin;
}(_react2.default.Component)) || _class) || _class);
exports.default = PageLogin;
module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(19);

var _Paper = __webpack_require__(113);

var _Paper2 = _interopRequireDefault(_Paper);

var _reactDocumentTitle = __webpack_require__(6);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _RaisedButton = __webpack_require__(32);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _TextField = __webpack_require__(33);

var _TextField2 = _interopRequireDefault(_TextField);

var _rcQueueAnim = __webpack_require__(121);

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

var _PageLoginInner = __webpack_require__(48);

var _PageLoginInner2 = _interopRequireDefault(_PageLoginInner);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
var PageLoginInner = function PageLoginInner(props) {
  var onSubmit = props.onSubmit,
      renderSubmitButton = props.renderSubmitButton,
      renderMessage = props.renderMessage;


  return _react2.default.createElement(
    'div',
    { className: 'page-login' },
    _react2.default.createElement(
      'div',
      { className: 'main-body' },
      _react2.default.createElement(_reactDocumentTitle2.default, { title: 'Login - CrypTax' }),
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
                      'CrypTax'
                    )
                  )
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
                      _react2.default.createElement(_TextField2.default, { floatingLabelText: 'Email', fullWidth: true })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(_TextField2.default, { floatingLabelText: 'Password', type: 'password', fullWidth: true })
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-action no-border text-right' },
                _react2.default.createElement(
                  'a',
                  { href: '#/', className: 'color-primary' },
                  'Login'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'additional-info' },
              _react2.default.createElement(
                'a',
                { href: '#/sign-up' },
                'Sign up'
              ),
              _react2.default.createElement('span', { className: 'divider-h' }),
              _react2.default.createElement(
                'a',
                { href: '#/forgot-password' },
                'Forgot your password?'
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
}; // libs
exports.default = PageLoginInner;
module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageLogin = __webpack_require__(59);

var _PageLogin2 = _interopRequireDefault(_PageLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageLogin2.default;
module.exports = exports['default'];

/***/ }),
/* 62 */
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

var _reactRedux = __webpack_require__(1);

var _actions = __webpack_require__(9);

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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageLogout = __webpack_require__(62);

var _PageLogout2 = _interopRequireDefault(_PageLogout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageLogout2.default;
module.exports = exports['default'];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _PageSystemViewInner = __webpack_require__(65);

var _PageSystemViewInner2 = _interopRequireDefault(_PageSystemViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libs


var PageSystemView = function (_React$Component) {
  _inherits(PageSystemView, _React$Component);

  function PageSystemView(props) {
    _classCallCheck(this, PageSystemView);

    var _this = _possibleConstructorReturn(this, (PageSystemView.__proto__ || Object.getPrototypeOf(PageSystemView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PageSystemView, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_PageSystemViewInner2.default, this.props);
    }
  }]);

  return PageSystemView;
}(_react2.default.Component);

exports.default = PageSystemView;
module.exports = exports["default"];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDocumentTitle = __webpack_require__(6);

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _PageSystemViewInner = __webpack_require__(49);

var _PageSystemViewInner2 = _interopRequireDefault(_PageSystemViewInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageSystemViewInner = function PageSystemViewInner(props) {
  return _react2.default.createElement(
    "div",
    { className: "" + _PageSystemViewInner2.default.root },
    _react2.default.createElement(_reactDocumentTitle2.default, { title: "System View - Sauron" }),
    _react2.default.createElement(
      "div",
      { className: "row" },
      _react2.default.createElement(
        "div",
        { className: "col-lg-12" },
        "Home Page"
      )
    )
  );
}; // libs
exports.default = PageSystemViewInner;
module.exports = exports["default"];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PageSystemView = __webpack_require__(64);

var _PageSystemView2 = _interopRequireDefault(_PageSystemView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PageSystemView2.default;
module.exports = exports['default'];

/***/ }),
/* 67 */
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

var _reactRouterRedux = __webpack_require__(7);

var _reactRedux = __webpack_require__(1);

var _pathToRegexp = __webpack_require__(120);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _PrivateRoute = __webpack_require__(23);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivateDataRoute = exports.default = undefined;

var _PrivateDataRoute = __webpack_require__(67);

Object.defineProperty(exports, 'PrivateDataRoute', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrivateDataRoute).default;
  }
});

var _PrivateRoute = __webpack_require__(23);

var _PrivateRoute2 = _interopRequireDefault(_PrivateRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PrivateRoute2.default;

/***/ }),
/* 69 */
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

var _reactRouterDom = __webpack_require__(12);

var _reactRedux = __webpack_require__(1);

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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _PublicRoute = __webpack_require__(69);

var _PublicRoute2 = _interopRequireDefault(_PublicRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PublicRoute2.default;
module.exports = exports['default'];

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PageLogin = __webpack_require__(61);

Object.defineProperty(exports, "PageLogin", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageLogin).default;
  }
});

var _PageLogout = __webpack_require__(63);

Object.defineProperty(exports, "PageLogout", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageLogout).default;
  }
});

var _Page = __webpack_require__(56);

Object.defineProperty(exports, "Page404", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Page).default;
  }
});

var _PageErrorView = __webpack_require__(58);

Object.defineProperty(exports, "PageErrorView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageErrorView).default;
  }
});

var _PageSystemView = __webpack_require__(66);

Object.defineProperty(exports, "PageSystemView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PageSystemView).default;
  }
});

var _PrivateRoute = __webpack_require__(68);

Object.defineProperty(exports, "PrivateRoute", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrivateRoute).default;
  }
});

var _PublicRoute = __webpack_require__(70);

Object.defineProperty(exports, "PublicRoute", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PublicRoute).default;
  }
});

var _NotificationSystemConnector = __webpack_require__(53);

Object.defineProperty(exports, "NotificationSystemConnector", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_NotificationSystemConnector).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(8);

var _users = __webpack_require__(73);

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  users: _users2.default
});
module.exports = exports['default'];

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = users;

var _actions = __webpack_require__(9);

var ActionTypes = _interopRequireWildcard(_actions);

var _utils = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.USER_LOGIN_SUCCESS:
      {
        if (!action.payload) {
          throw new Error('Can\'t execute ' + ActionTypes.USER_LOGIN_SUCCESS + '. {payload} isn\'t available in action');
        }

        var user = action.payload.user;


        return (0, _utils.mergeNewEntities)(state, [user], _utils.ENTITY_STATUS_DATA_AVAILABLE);
      }
    default:
      {
        return state;
      }
  }
}
module.exports = exports['default'];

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(8);

var _reduxThunk = __webpack_require__(35);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(127);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _api = __webpack_require__(10);

var _api2 = _interopRequireDefault(_api);

var _reducers = __webpack_require__(24);

var _reducers2 = _interopRequireDefault(_reducers);

var _configureRouter = __webpack_require__(25);

var _utils = __webpack_require__(4);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(76);
} else {
  module.exports = __webpack_require__(74);
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(8);

var _reduxThunk = __webpack_require__(35);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _api = __webpack_require__(10);

var _api2 = _interopRequireDefault(_api);

var _reducers = __webpack_require__(24);

var _reducers2 = _interopRequireDefault(_reducers);

var _configureRouter = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(preloadedState) {
  return (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, _api2.default, _configureRouter.middleware));
}
module.exports = exports['default'];

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _RaisedButton = __webpack_require__(32);

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _get = __webpack_require__(2);

var _get2 = _interopRequireDefault(_get);

var _has = __webpack_require__(18);

var _has2 = _interopRequireDefault(_has);

var _utils = __webpack_require__(5);

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
                  errorMessage: payload.errorMessage
                });

                throw new Error('An error occurred while submitting the form: ' + payload.errorMessage);
              }

              return action;
            });
          };
        };

        _this.renderSubmitButton = function (_ref) {
          var label = _ref.label,
              labelWhenSubmitting = _ref.labelWhenSubmitting;
          var submitting = _this.props.submitting;


          return _react2.default.createElement(_RaisedButton2.default, {
            label: submitting ? labelWhenSubmitting : label,
            secondary: true,
            onClick: _this.handleSubmit,
            disabled: submitting });
        };

        _this.renderMessage = function () {
          var _this$state = _this.state,
              error = _this$state.error,
              errorMessage = _this$state.errorMessage;


          return error ? _react2.default.createElement(
            'div',
            { style: { color: 'red' } },
            errorMessage
          ) : _react2.default.createElement('span', null);
        };

        var handleSubmit = props.handleSubmit;

        _this.handleSubmit = handleSubmit(_this.wrapSubmit(onSubmit));
        return _this;
      }

      _createClass(BoundForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var hasEntity = (0, _has2.default)(this.props, 'entity');

          if (hasEntity) {
            var entity = (0, _get2.default)(this.props, 'entity');
            var status = (0, _get2.default)(this.props, 'entity.__status__');

            this.handleChangeEntityStatus(entity, status);
          }
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var hasEntity = (0, _has2.default)(this.props, 'entity');
          var status = (0, _get2.default)(this.props, 'entity.__status__');
          var nextStatus = (0, _get2.default)(nextProps, 'entity.__status__');

          // debugger;

          if (hasEntity && status !== nextStatus) {
            this.handleChangeEntityStatus(nextProps.entity, nextStatus);
          }
        }
        /**
         * Will only be called when two conditions are met:
         * 1. Form is being used for updating an entity
         * 2. __status__ of that entity has changed
         * 
         */

      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
            onSubmit: this.handleSubmit,
            renderSubmitButton: this.renderSubmitButton,
            renderMessage: this.renderMessage }));
        }
      }]);

      return BoundForm;
    }(_react2.default.Component);
  };
};

module.exports = exports['default'];

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// libs


// src


var _has = __webpack_require__(18);

var _has2 = _interopRequireDefault(_has);

var _get = __webpack_require__(2);

var _get2 = _interopRequireDefault(_get);

var _utils = __webpack_require__(5);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// libs


var _redux = __webpack_require__(8);

var _get = __webpack_require__(2);

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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _get = __webpack_require__(2);

var _get2 = _interopRequireDefault(_get);

var _isEqual = __webpack_require__(31);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _utils = __webpack_require__(5);

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
            return (0, _get2.default)(props, 'match.params.id');
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

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNodeTypesField = exports.renderEnvironmentLocationsField = exports.renderEnvironmentTypesField = exports.renderEnvironmentsField = exports.renderSelectField = exports.renderRadioGroup = exports.renderCheckbox = exports.renderTextField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _TextField = __webpack_require__(33);

var _TextField2 = _interopRequireDefault(_TextField);

var _MenuItem = __webpack_require__(112);

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Checkbox = __webpack_require__(111);

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _RadioButtonGroup = __webpack_require__(114);

var _RadioButtonGroup2 = _interopRequireDefault(_RadioButtonGroup);

var _SelectField = __webpack_require__(115);

var _SelectField2 = _interopRequireDefault(_SelectField);

var _utils = __webpack_require__(5);

var _actions = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // libs


// src


var renderTextField = function renderTextField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      innerRef = _ref.innerRef,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      custom = _objectWithoutProperties(_ref, ['input', 'label', 'innerRef', 'meta']);

  return _react2.default.createElement(_TextField2.default, _extends({
    floatingLabelText: label,
    floatingLabelFixed: true,
    fullWidth: true,
    errorText: touched && error,
    ref: innerRef,
    hintStyle: { fontSize: 12 }
  }, input, custom));
};

exports.renderTextField = renderTextField;
var renderCheckbox = exports.renderCheckbox = function renderCheckbox(_ref2) {
  var input = _ref2.input,
      label = _ref2.label;
  return _react2.default.createElement(_Checkbox2.default, { label: label,
    checked: input.value ? true : false,
    onCheck: input.onChange });
};

var renderRadioGroup = function renderRadioGroup(_ref3) {
  var input = _ref3.input,
      label = _ref3.label,
      rest = _objectWithoutProperties(_ref3, ['input', 'label']);

  return _react2.default.createElement(
    'div',
    { style: { margin: '10px 0' } },
    _react2.default.createElement(
      'label',
      { style: { fontSize: 12, color: 'rgba(0, 0, 0, 0.298039)' } },
      label
    ),
    _react2.default.createElement(_RadioButtonGroup2.default, _extends({}, input, rest, {
      valueSelected: input.value,
      onChange: function onChange(event, value) {
        return input.onChange(value);
      } }))
  );
};

exports.renderRadioGroup = renderRadioGroup;
var renderSelectField = exports.renderSelectField = function renderSelectField(_ref4) {
  var input = _ref4.input,
      label = _ref4.label,
      _ref4$meta = _ref4.meta,
      touched = _ref4$meta.touched,
      error = _ref4$meta.error,
      children = _ref4.children;
  return _react2.default.createElement(_SelectField2.default, _extends({
    floatingLabelText: label,
    floatingLabelFixed: true,
    fullWidth: true,
    errorText: touched && error
  }, input, {
    onChange: function onChange(event, index, value) {
      return input.onChange(value);
    },
    children: children }));
};

var makeEntitySelectionField = function makeEntitySelectionField(_ref5) {
  var feedKey = _ref5.feedKey,
      entityKey = _ref5.entityKey,
      fetch = _ref5.fetch;

  var FieldEnvironmentTypes = function (_React$Component) {
    _inherits(FieldEnvironmentTypes, _React$Component);

    function FieldEnvironmentTypes() {
      _classCallCheck(this, FieldEnvironmentTypes);

      return _possibleConstructorReturn(this, (FieldEnvironmentTypes.__proto__ || Object.getPrototypeOf(FieldEnvironmentTypes)).apply(this, arguments));
    }

    _createClass(FieldEnvironmentTypes, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _props = this.props,
            hasFeed = _props.hasFeed,
            fetch = _props.fetch;


        if (!hasFeed) fetch();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            isLoading = _props2.isLoading,
            items = _props2.items,
            children = _props2.children,
            rest = _objectWithoutProperties(_props2, ['isLoading', 'items', 'children']);

        return _react2.default.createElement(
          'div',
          null,
          isLoading ? _react2.default.createElement(
            'p',
            null,
            'Loading ...'
          ) : !items.length ? _react2.default.createElement(
            'p',
            null,
            'Data not loaded!'
          ) : renderSelectField(Object.assign({}, rest, {
            children: items.map(function (_ref6) {
              var id = _ref6.id,
                  name = _ref6.name;
              return _react2.default.createElement(_MenuItem2.default, { value: id, primaryText: name });
            })
          }))
        );
      }
    }]);

    return FieldEnvironmentTypes;
  }(_react2.default.Component);

  return (0, _reactRedux.connect)(function (state) {
    var hasFeed = (0, _utils.hasFeed)(state, feedKey, entityKey);
    var feed = (0, _utils.getFeed)(state, feedKey, entityKey);

    return _extends({ hasFeed: hasFeed }, feed);
  }, { fetch: fetch })(FieldEnvironmentTypes);
};

var renderEnvironmentsField = exports.renderEnvironmentsField = makeEntitySelectionField({
  feedKey: 'environmentsAll',
  entityKey: 'environments',
  fetch: _actions.fetchAllEnvironments
});

var renderEnvironmentTypesField = exports.renderEnvironmentTypesField = makeEntitySelectionField({
  feedKey: 'environmentTypesAll',
  entityKey: 'environmentTypes',
  fetch: _actions.fetchAllEnvironmentTypes
});

var renderEnvironmentLocationsField = exports.renderEnvironmentLocationsField = makeEntitySelectionField({
  feedKey: 'environmentLocationsAll',
  entityKey: 'environmentLocations',
  fetch: _actions.fetchAllEnvironmentLocations
});

var renderNodeTypesField = exports.renderNodeTypesField = makeEntitySelectionField({
  feedKey: 'nodeTypesAll',
  entityKey: 'nodeTypes',
  fetch: _actions.fetchAllNodeTypes
});

/***/ }),
/* 82 */
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
        dbName: 'fo',
        host: 'localhost',
        enableLogging: true
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
        host: 'localhost',
        serveDummyStatusData: true
    }
};
module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'production',
    mysql: {
        username: 'root',
        password: 'Y=-w::9:c+.S',
        multiStatement: false,
        dbName: 'fo',
        host: 'sensu.cwdxsdmyidcf.us-east-1.rds.amazonaws.com',
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
        host: '172.16.2.103',
        serveDummyStatusData: false
    }
};
module.exports = exports['default'];

/***/ }),
/* 84 */
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
        dbName: 'fo',
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
        host: '54.245.163.213',
        serveDummyStatusData: false
    }
};
module.exports = exports['default'];

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styles = __webpack_require__(116);

var _colorManipulator = __webpack_require__(118);

// import {Colors, ColorManipulator, Spacing, zIndex} from 'material-ui';

// import Colors from 'material-ui/styles/colors';
// import Spacing from 'material-ui/lib/styles/spacing';
// import zIndex from 'material-ui/lib/styles/zIndex';
// import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

exports.default = {
  spacing: _styles.spacing,
  zIndex: _styles.zIndex,
  textTransform: 'none',
  palette: {
    primary1Color: '#384757',
    primary2Color: _styles.colors.orangeA400,
    primary3Color: _styles.colors.lightBlack,
    accent1Color: 'rgb(0, 123, 255)',
    accent2Color: _styles.colors.grey100,
    accent3Color: _styles.colors.grey500,
    textColor: _styles.colors.darkBlack,
    alternateTextColor: _styles.colors.white,
    canvasColor: _styles.colors.white,
    borderColor: _styles.colors.grey300,
    disabledColor: (0, _colorManipulator.fade)(_styles.colors.darkBlack, 0.3),
    pickerHeaderColor: _styles.colors.orangeA200
  }
};
module.exports = exports['default'];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _winston = __webpack_require__(134);

var _winston2 = _interopRequireDefault(_winston);

var _winstonDailyRotateFile = __webpack_require__(135);

var _winstonDailyRotateFile2 = _interopRequireDefault(_winstonDailyRotateFile);

var _moment = __webpack_require__(34);

var _moment2 = _interopRequireDefault(_moment);

var _path = __webpack_require__(3);

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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(15);

var _express2 = _interopRequireDefault(_express);

var _cookieParser = __webpack_require__(42);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(40);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = __webpack_require__(21);

var _passport2 = _interopRequireDefault(_passport);

var _helmet = __webpack_require__(43);

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = __webpack_require__(41);

var _compression2 = _interopRequireDefault(_compression);

var _http = __webpack_require__(44);

var _ejs = __webpack_require__(20);

var _socket = __webpack_require__(45);

var _socket2 = _interopRequireDefault(_socket);

var _appUtils = __webpack_require__(13);

var _appUtils2 = _interopRequireDefault(_appUtils);

var _devUtils = __webpack_require__(37);

var _devUtils2 = _interopRequireDefault(_devUtils);

var _logUtils = __webpack_require__(38);

var _logUtils2 = _interopRequireDefault(_logUtils);

var _utils = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src
// libs
var port = (0, _utils.getPort)();
// import scheduledTaskUtils from './utils/scheduledTaskUtils'
// import notificationService from './services/notificationService'

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
// app.use('/images', express.static(__dirname + "/images"));
// If you declare your session and passport configs above static directory configs then all requests 
//for static content will also get a session, which is not good.
app.use((0, _cookieParser2.default)());
// security package
app.use((0, _helmet2.default)());
//see setting details here: https://github.com/expressjs/session
//app.use(expressSession(, store: new MySQLStore(options)}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
(0, _utils.setupPassport)();

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
['api/userApiController', 'defaultController'].forEach(function (name) {
  return app.use(__webpack_require__(39)("./" + name));
});

app.use((0, _utils.build404ErrorHandler)());
app.use((0, _utils.build500ErrorHandler)());

// scheduledTaskUtils.initializeScheduledTasks()
// notificationService.setupSocketIo(sessionStore, setupSocketIO(httpServer))

httpServer.listen(port, function (err) {
  if (err) {
    console.error('Server startup failed: ', err);
  }

  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var USER_OBJECTS = [{
  id: 1,
  email: 'sauron@fusionops.com',
  password: '123456',
  firstName: 'Sauron',
  lastName: '',
  linkHome: '/system'
}, {
  id: 2,
  email: 'reports@aeraops.com',
  password: '#Aera101',
  firstName: 'Aeraops',
  lastName: '',
  linkHome: '/reports'
}];

var getUser = exports.getUser = function getUser() {
  return USER_OBJECTS[0];
};

var findUserByEmailAndPassword = exports.findUserByEmailAndPassword = function findUserByEmailAndPassword(email, password) {
  return USER_OBJECTS.find(function (user) {
    return user.email === email && user.password === password;
  });
};

var findUserByID = exports.findUserByID = function findUserByID(id) {
  return USER_OBJECTS.find(function (user) {
    return user.id === id;
  });
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthorization = exports.authorizePath = exports.ensureAnonymity = exports.setupPassport = undefined;

var _passport = __webpack_require__(21);

var _passport2 = _interopRequireDefault(_passport);

var _managers = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var setupPassport = exports.setupPassport = function setupPassport() {
  _passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
  });

  _passport2.default.deserializeUser(function (id, done) {
    done(null, (0, _managers.findUserByID)(id));
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

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = __webpack_require__(2);

var _get2 = _interopRequireDefault(_get);

var _errorUtils = __webpack_require__(11);

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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errorUtils = __webpack_require__(11);

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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.influx = exports.MEASUREMENT_NAME_STATUS_SYSTEM = exports.MEASUREMENT_NAME_STATUS_ENVIRONMENT = exports.MEASUREMENT_NAME_STATUS_NODE = undefined;

var _influx = __webpack_require__(108);

var _app = __webpack_require__(16);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
var MEASUREMENT_NAME_STATUS_NODE = exports.MEASUREMENT_NAME_STATUS_NODE = 'status_node';

// src
var MEASUREMENT_NAME_STATUS_ENVIRONMENT = exports.MEASUREMENT_NAME_STATUS_ENVIRONMENT = 'status_environment';
var MEASUREMENT_NAME_STATUS_SYSTEM = exports.MEASUREMENT_NAME_STATUS_SYSTEM = 'status_system';

var influx = exports.influx = new _influx.InfluxDB(_app2.default.influx.url);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMySQLConnection = undefined;

var _sequelize = __webpack_require__(129);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _continuationLocalStorage = __webpack_require__(102);

var _continuationLocalStorage2 = _interopRequireDefault(_continuationLocalStorage);

var _dbConfig = __webpack_require__(26);

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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(100);

var path = __webpack_require__(3);
var webpack = __webpack_require__(36);
var HtmlWebpackPlugin = __webpack_require__(107);
var ExtractTextPlugin = __webpack_require__(105);
var ManifestPlugin = __webpack_require__(133);

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
  plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new webpack.DefinePlugin({
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
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: "css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]"
      })
    }, {
      test: /\.cssmodule\.(sass|scss)$/,
      loaders: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
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
    }]
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\server\\public\\css\\styles\\app.scss Unexpected character '@' (2:0)\nYou may need an appropriate loader to handle this file type.\n| \n| @import \"variables\";\n| \n| @import \"libs/material-ui/material-ui\";");

/***/ }),
/* 96 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\server\\public\\css\\styles\\bootstrap.scss Unexpected character '@' (4:0)\nYou may need an appropriate loader to handle this file type.\n| // The only file changed is bootstrap/_bootstrap.scss\n| \n| @import \"variables\";\n| @import \"bootstrap/bootstrap\";\n| ");

/***/ }),
/* 97 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\server\\public\\css\\styles\\layout.scss Unexpected character '@' (2:0)\nYou may need an appropriate loader to handle this file type.\n| // takes advantage of Bootstrap 4 variables, however it's not required for essential layout\n| @import \"variables\";\n| \n| @import \"layout/base\";");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\server\\public\\css\\styles\\theme.scss Unexpected character '@' (2:0)\nYou may need an appropriate loader to handle this file type.\n| \n| @import \"variables\";\n| \n| @import \"themes/utilities\";");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: D:\\eMumba_projects\\cryptax\\server\\public\\css\\styles\\ui.scss Unexpected character '@' (1:0)\nYou may need an appropriate loader to handle this file type.\n| @import \"variables\";\n| \n| @import \"material-design-lite/material-design-lite\";");

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("chokidar");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("continuation-local-storage");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = require("influx");

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("lodash/fromPairs");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Checkbox");

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("material-ui/MenuItem");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Paper");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = require("material-ui/RadioButton/RadioButtonGroup");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("material-ui/SelectField");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/getMuiTheme");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("material-ui/utils/colorManipulator.js");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("normalizr");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("path-to-regexp");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("rc-queue-anim");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("react-dnd");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("react-dnd-html5-backend");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = require("react-notification-system");

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = require("webpack-manifest-plugin");

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map