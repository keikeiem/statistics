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

    jsStatisticsAPI.computeRowEchelonForm = function(matrix, isReduced) {
        if (isReduced) return this.computeReducedRowEchelonForm(matrix);

        // row echelon form
        console.log(matrix);
    };

    jsStatisticsAPI.computeReducedRowEchelonForm = function(matrix) {

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

    jsStatisticsAPI.identityMatrix = function(size) {
        var identityMatrix = [];
        for (var i = 0; i < size; i++) {
            var row = [];
            for (var j = 0; j < size; j++) {
                if (i == j) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            identityMatrix.push(row);
        }
        return identityMatrix;
    };

    jsStatisticsAPI.extendIdentityMatrix = function(matrix) {
        if (!this.isSquareMatrix(matrix)) {
            return console.log('the matrix is not square.');
        } else {
            var minor = JSON.parse(JSON.stringify(matrix));
            var length = minor.length;
            var identityMatrix = this.identityMatrix(length);
            for (var i = 0; i < length; i++) {
                minor[i].push(...identityMatrix[i]);
            }
            return minor;
        }
    };

    jsStatisticsAPI.removeFrontIdentityMatrix = function(matrix) {
        var minor = JSON.parse(JSON.stringify(matrix));
        var numOfRow = minor.length;
        var numOfColumn = minor[0].length;
        if (numOfRow * 2 != numOfColumn) {
            return false;
        }
        for (var i = 0; i < numOfRow; i++) {
            minor[i] = minor[i].slice(numOfRow, numOfColumn);
        }
        return minor;
    };

    jsStatisticsAPI.inverseOfMatrix = function(matrix) {
        if (!this.isSquareMatrix(matrix)) {
            return console.log('the matrix is not square.');
        } else if (this.computeMatrixDeterminant(matrix) == 0) {
            return console.log('this matrix is not an invertible matrix');
        } else {
            var minor = JSON.parse(JSON.stringify(matrix));
            var extendIdentityMatrix = this.extendIdentityMatrix(minor);
            var gaussianElimination = this.reducedRowEchelonForm(extendIdentityMatrix);
            var inverseOfMatrix = this.removeFrontIdentityMatrix(gaussianElimination);
            return inverseOfMatrix;
        }
    };

    jsStatisticsAPI.matrixMultiplication = function(matrixA, matrixB) {
        var minorA = JSON.parse(JSON.stringify(matrixA));
        var minorB = JSON.parse(JSON.stringify(matrixB));
        var numOfRowA = minorA.length;
        var numOfColumnA = minorA[0].length;
        var numOfRowB = minorB.length;
        var numOfColumnB = minorB[0].length;
        console.log({"numOfRowA" : numOfRowA, "numOfColumnA" : numOfColumnA, "numOfRowB" : numOfRowB, "numOfColumnB" : numOfColumnB});
        if (numOfColumnA != numOfRowB) {
            return console.log('these two matrices cannot be multiplied');
        }
        var result = [];
        var commonValue = numOfColumnA;
        for (var i = 0; i < numOfRowA; i++) {
            var row = [];
            for (var j = 0; j < numOfColumnB; j++) {
                var dotProductResult = 0;
                for (var k = 0; k < commonValue; k++) {
                    var tmp = minorA[i][k] * minorB[k][j];
                    dotProductResult += tmp;
                }
                row.push(dotProductResult);
            }
            result.push(row);
        }
        return result;
    };

    jsStatisticsAPI.matrixSubtraction = function(matrixA, matrixB) {
        var minorA = JSON.parse(JSON.stringify(matrixA));
        var minorB = JSON.parse(JSON.stringify(matrixB));
        var numOfRowA = minorA.length;
        var numOfColumnA = minorA[0].length;
        var numOfRowB = minorB.length;
        var numOfColumnB = minorB[0].length;
        if (numOfRowA != numOfRowB || numOfColumnA != numOfColumnB) {
            return console.log('these two matrices are of different sizes');
        }
        var numOfRow = numOfRowA;
        var numOfColumn = numOfColumnA;
        var result = [];
        for (var i = 0; i < numOfRow; i++) {
            var row = [];
            for (var j = 0; j < numOfColumn; j++) {
                row.push(minorA[i][j] - minorB[i][j]);
            }
            result.push(row);
        }
        return result;
    };

    jsStatisticsAPI.matrixAddition = function(matrixA, matrixB) {
        var minorA = JSON.parse(JSON.stringify(matrixA));
        var minorB = JSON.parse(JSON.stringify(matrixB));
        var numOfRowA = minorA.length;
        var numOfColumnA = minorA[0].length;
        var numOfRowB = minorB.length;
        var numOfColumnB = minorB[0].length;
        if (numOfRowA != numOfRowB || numOfColumnA != numOfColumnB) {
            return console.log('these two matrices are of different sizes');
        }
        var numOfRow = numOfRowA;
        var numOfColumn = numOfColumnA;
        var result = [];
        for (var i = 0; i < numOfRow; i++) {
            var row = [];
            for (var j = 0; j < numOfColumn; j++) {
                row.push(minorA[i][j] + minorB[i][j]);
            }
            result.push(row);
        }
        return result;
    };

    // TODO Finish characteristric polynomial
    jsStatisticsAPI.characteristicPolynomial = function(matrix) {
        var minor = JSON.parse(JSON.stringify(matrix));

    };

    // TODO Get roots of polynomial (eigenvalue)

}(jsStatistics.API));
