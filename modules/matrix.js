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

	/**
	* each index is labeled on computing.
	* 				not real mathematics
	* 			(o) 0th row - 1st column
	* 			(x) 1th row - 2th column
	*/
    jsStatisticsAPI.computeMatrixMinor = function(matrix, rowIdx, columnIdx) {
		var minor = JSON.parse(JSON.stringify(matrix));
		minor.splice(rowIdx, 1);
		minor.forEach(function(row) {
			row.splice(columnIdx, 1);
		});
		return minor;
    };

    jsStatisticsAPI.computeMatrixDeterminant = function(matrix) {
        if (!this.isSquareMatrix(matrix)) {
            console.log('the matrix is not square.');
        }

        if (matrix.length == 2) {
            return ((matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]));
        } else {
            var result = [];
            for (var i = 0; i < matrix.length; i++) {
                var submatrix = JSON.parse(JSON.stringify(matrix));
                var multiplier = (0 + i) % 2 ? (-1 * matrix[0][i]) : matrix[0][i];
                var subresult = 0;
                submatrix = this.computeMatrixMinor(submatrix, 0, i);
                subresult = multiplier * this.computeMatrixDeterminant(submatrix);
                // console.log({"multiplier" : multiplier, "submatrix" : submatrix, "subresult" : subresult});
                result.push(subresult);
    
    
                // if (submatrix.length > 1) {
                // 	console.log(matrix);
                // 	console.log('test : ', matrix[0][i] * this.computeMatrixDeterminant(submatrix))
                // 	return matrix[0][i] * this.computeMatrixDeterminant(submatrix);
                // }
            }
            // console.log({"result" : result, "matrix" : matrix, "length" : matrix.length});
            return result.reduce((partial_sum, a) => partial_sum + a,0); 
        }
    };

    jsStatisticsAPI.computeRowEchelonForm = function(matrix, isReduced) {
        if (isReduced) return this.computeReducedRowEchelonForm(matrix);

        // row echelon form
        console.log(matrix);
    };

    jsStatisticsAPI.computeReducedRowEchelonForm = function(matrix) {

    };


}(jsStatistics.API));
