const LIB_INFO = {
	author: 'keikeiem',
	version: '0.0.1'
}

var jsStatistics = (function (global) {
	function jsStatistics() {
		var API = {

		};

		for (var plugin in jsStatistics.API) {
			if (jsStatistics.API.hasOwnProperty(plugin)) {
				if (plugin === 'events' && jsStatistics.API.events.length) {

				} else {
					API[plugin] = jsStatistics.API[plugin];
				}
			}
		}

		return API;
	}

	jsStatistics.API = {
		events: []
	};

	window.jsStatistics = jsStatistics;
	return jsStatistics;
})(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || Function('return typeof this === "object" && this.content')() || Function('return this')());
