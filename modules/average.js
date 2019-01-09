(function (jsStatisticsAPI) {
	'use strict';

	jsStatisticsAPI.computeAverage = function(arrayOfNumbers, decimalPoint) {
		decimalPoint = decimalPoint || 1;

		var count = arrayOfNumbers.length;
		var summation = 0;
		arrayOfNumbers.forEach(function(number) {
			summation += number;
		});

		return Number((summation / count).toFixed(decimalPoint));
	};

	return jsStatisticsAPI;
}(jsStatistics.API));

console.log(jsStatistics.API);
