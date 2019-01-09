(function (jsStatisticsAPI) {
	'use strict';

    /**
    * the matrix is declared as following array series
    * [
    *    [1, 2, 3],
    *    [4, 5, 6],
    *    [7, 8, 9]
    * ]
    *
    * which represents 3 by 3 matrix:
    *    1 2 3
    *    4 5 6
    *    7 8 9
    */

    jsStatisticsAPI.setMatrixFromArray = function(arrayOfNumbers, numOfColumn) {
        if (arrayOfNumbers.length % numOfColumn) {
            console.log('the length of array cannot be divided by column size');
            return [arrayOfNumbers];
            // the matrix whose size is 1 by arrayOfNumbers.length
        }

        var matrixArray = [];

        var length = arrayOfNumbers.length;
        var numOfRow = length / numOfColumn;
        for (var i = 0; i < numOfRow; i++) {
            matrixArray.push(arrayOfNumbers.slice(i * numOfColumn, (i + 1) * numOfColumn));
        }
        return matrixArray;
    };

    jsStatisticsAPI.getMatrixSize = function(matrix) {

    };

}(jsStatistics.API));
