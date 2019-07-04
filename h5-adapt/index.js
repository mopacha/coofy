; (function (win, doc) {
	var docEl = doc.documentElement,
		dpr = win.devicePixelRatio || 1,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth,
				rem = clientWidth < 500 ? clientWidth / 10 : 50
			docEl.style.fontSize = rem + 'px'
			setPcMaxWidth()
		},
		setBodyFontSize = function () {
			if (document.body) {
				document.body.style.fontSize = 12 * (dpr) + 'px'
			} else {
				document.addEventListener('DOMContentLoaded', setBodyFontSize)
			}
		}

	isPC = function () {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
		}
		return flag;
	}
	setPcMaxWidth = function () {
		if (isPC()) {
			if (document.body) {
				document.body.style.maxWidth = 500 + 'px'
				document.body.style.margin = '0px auto'
			}
		}
	}
	setBodyFontSize()
	win.addEventListener(resizeEvt, recalc)
	doc.addEventListener('DOMContentLoaded', recalc, false)

})(window, document)