(function (jsStatisticsAPI) {
	'use strict';

	jsStatisticsAPI.computeAverage = function(arrayOfNumbers, decimalPoint) {
		var count = arrayOfNumbers.length;
		var summation = 0;
		arrayOfNumbers.forEach(function(number) {
			summation += number;
		});

		if (decimalPoint) {
			return Number((summation / count).toFixed(decimalPoint));
		}
		return (summation / count);
	};

	jsStatisticsAPI.computeSquare = function(arrayNumbers) {
		var result = arrayNumbers.slice();
		for (var i = 0; i < result.length; i++) {
			result[i] *= result[i];
		}
		return result;
	};

	/**
	* @function
	* @param {array} numbers The array of numbers
	*/
	jsStatisticsAPI.computeSquareAverage = function(arrayOfNumbers) {
		return this.computeAverage(this.computeSquare(arrayOfNumbers));
	};

	jsStatisticsAPI.computeVarianceByDefinition = function(arrayOfNumbers) {
		var average = this.computeAverage(arrayOfNumbers);
		var varianceArray = [];
		var deviation;
		arrayOfNumbers.forEach(function(number) {
			deviation = (number - average);
			varianceArray.push(deviation * deviation);
		});

		return this.computeAverage(varianceArray);
	};

	jsStatisticsAPI.computeVariance = function(arrayOfNumbers) {
		var average = this.computeAverage(arrayOfNumbers);
		var averageOfSquare = this.computeSquareAverage(arrayOfNumbers);

		return averageOfSquare - (average * average);
	};

	/**
	* @function
	* @param {array} numbers The array of numbers
	* @description compute standard deviation by definition
	*/
	jsStatisticsAPI.computeStandardDeviationByDefinition = function(arrayOfNumbers) {
		var average = this.computeAverage(arrayOfNumbers);
		var varianceArray = [];
		var deviation;
		arrayOfNumbers.forEach(function(number) {
			deviation = (number - average);
			varianceArray.push(deviation * deviation);
		});

		return Math.sqrt(this.computeAverage(varianceArray));
	};

	jsStatisticsAPI.computeStandardDeviation = function(arrayOfNumbers) {
		var average = this.computeAverage(arrayOfNumbers);
		var averageOfSquare = this.computeSquareAverage(arrayOfNumbers);

		return Math.sqrt(averageOfSquare - (average * average));
	};

	return jsStatisticsAPI;
}(jsStatistics.API));
