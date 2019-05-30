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
            return console.log('the matrix is not square.');
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

    jsStatisticsAPI.rowSwitching = function(matrix, ithRow, jthRow) {
        /**
         * Row-ith <=> Row-jth
         */
        var minor = JSON.parse(JSON.stringify(matrix));
        var tmp = minor[ithRow];
        minor[ithRow] = minor[jthRow];
        minor[jthRow] = tmp;
        return minor;
    };

    jsStatisticsAPI.rowMultiplication = function(matrix, ithRow, constant) {
        /**
         * constant * Row-ith => Row-ith
         */
        if (constant == 0) {
            return console.log("constant must be non-zero");
        }
        var minor = JSON.parse(JSON.stringify(matrix));
        minor[ithRow] = minor[ithRow].map(x => x * constant);
        return minor;
    };

    jsStatisticsAPI.rowAddition = function(matrix, ithRow, jthRow, constant) {
        /**
         * Row-ith + constant * Row-jth => Row-ith
         */
        if (constant == 0) {
            return console.log("constant must be non-zero");
        }
        var minor = JSON.parse(JSON.stringify(matrix));
        var tmp = minor[jthRow].map(x => x * constant);
        minor[ithRow] = minor[ithRow].map((x, i) => x + tmp[i]);
        return minor;
    };

    jsStatisticsAPI.makeZeroValueClean = function(matrix) {
        var minor = JSON.parse(JSON.stringify(matrix));
        var numOfRow = minor.length;
        var numOfColumn = minor[0].length;
        for (var i = 0; i < numOfRow; i++) {
            for (var j = 0; j < numOfColumn; j++) {
                if (Math.abs(minor[i][j]) < Math.pow(10, -6)) {
                    minor[i][j] = 0;
                }
            }
        }
        return minor;
    };

    jsStatisticsAPI.rowEchelonForm = function(matrix) {
        var minor = JSON.parse(JSON.stringify(matrix));
        var numOfRow = minor.length;
        var index = 0;
        while (index != numOfRow) {
            var diagonalValue = minor[index][index];
            for (var i = index + 1; i < numOfRow; i++) {
                var constant = (-1) * (minor[i][index] / diagonalValue);
                minor = this.rowAddition(minor, i, index, constant);
                // console.log({"index" : index, "diagonalValue" : diagonalValue, "minor" : minor, "constant" : constant});
            }
            index++;
        }
        minor = this.makeZeroValueClean(minor);
        return minor;
    };

    jsStatisticsAPI.reducedRowEchelonForm = function(matrix) {
        var minor = JSON.parse(JSON.stringify(matrix));
        var numOfRow = minor.length;
        var numOfColumn = minor[0].length;
        var maximum = Math.min(numOfRow, numOfColumn);
        var index = 0;
        while (index < maximum) {
            var diagonalValue = minor[index][index];
            if (diagonalValue != 0) {
                minor = this.rowMultiplication(minor, index, (1 / diagonalValue));
                for (var i = 0; i < numOfRow; i++) {
                    if (i != index && minor[i][index] != 0) {
                        var constant = (-1) * minor[i][index];
                        minor = this.rowAddition(minor, i, index, constant);
                    }
                    // console.log({"index" : index, "diagonalValue" : diagonalValue, "minor" : minor, "constant" : constant, "maximum" : maximum});
                }
            }
            index++;
        }
        minor = this.makeZeroValueClean(minor);
        return minor;
    };

}(jsStatistics.API));
