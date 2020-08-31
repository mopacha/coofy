"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var date = {
  isDuringDate: function isDuringDate(beginDateStr, endDateStr) {
    var curDate = new Date(),
        beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr);

    if (curDate >= beginDate && curDate <= endDate) {
      return true;
    }

    return false;
  }
};

var run = function run() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '2020-08-31 13:00';
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '2020-08-31 24:00';

  if (date.isDuringDate(start, end)) {
    document.documentElement.style.filter = "grayscale(100%)";
  }
};

var _default = run();

exports["default"] = _default;