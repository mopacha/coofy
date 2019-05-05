import "core-js/modules/es6.promise";
import "core-js/modules/es6.object.assign";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import axios from 'axios';

var http =
/*#__PURE__*/
function () {
  function http(options) {
    _classCallCheck(this, http);

    this.baseUrl = options.baseUrl || '';
    this.timeout = options.timeout || 10000;
    this.headers = options.headers = Object.assign({
      'Content-Type': 'application/json;charset=utf-8'
    }, options.headers);
  }

  _createClass(http, [{
    key: "getInsideConfig",
    value: function getInsideConfig() {
      var config = {
        baseURL: this.baseUrl,
        timeout: this.timeout,
        headers: this.headers
      };
      return config;
    }
  }, {
    key: "interceptors",
    value: function interceptors(instance, url) {
      instance.interceptors.request.use(function (config) {
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
      instance.interceptors.response.use(function (res) {
        var data = res.data;
        return data;
      }, function (error) {
        return Promise.reject(error.response);
      });
    }
  }, {
    key: "request",
    value: function request(options) {
      var instance = axios.create();
      options = Object.assign(this.getInsideConfig(), options);
      this.interceptors(instance, options.url);
      return instance(options);
    }
  }, {
    key: "ask",
    value: function ask(options) {
      return this.request(options);
    }
  }]);

  return http;
}();

export default http;