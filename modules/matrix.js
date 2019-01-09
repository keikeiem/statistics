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

    jsStatisticsAPI.isSquareMatrix = function(matrix) {
        try {
            return Boolean(matrix.length === matrix[0].length);
        } catch(e) {
            console.log('invalid matrix');
            return false;
        }
    };

    jsStatisticsAPI.computeMatrixMinor = function(matrix, rowIdx, columnIdx) {

    };

    jsStatisticsAPI.computeMatrixDeterminant = function(matrix) {
        if (!this.isSquareMatrix(matrix)) {
            console.log('the matrix is not square.');
        }

        // for (var i = 0; i < matrix.length; i++) {
        //
        // }
        //
        // var submatrix = [];
        // if (matrix.length < 3) {
        //     return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
        // } else {
        //     for (var i = 1; i < matrix.length; i++) {
        //         submatrix.push(matrix[i].slice(1))
        //     }
        //     submatrix.push()
        // }
        //
        // return matrix[0][0] * this.computeMatrixDeterminant(submatrix);
    };

}(jsStatistics.API));
