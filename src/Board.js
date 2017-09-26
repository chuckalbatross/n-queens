// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rowArray = this.get(rowIndex); //returns array of row [0, 0, 1, 0]
      var rowPieces = 0;
      for (var i = 0; i < rowArray.length; i++) {
        if (rowArray[i] === 1) {
          rowPieces++;
        }
      }
      if (rowPieces > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardObject = this.attributes;
      var hasConflicts = false;

      //for every key in boardObject (every row)
      for (var key in boardObject) {
        //call hasRowConflictAt(currentRow)
        if (this.hasRowConflictAt(key)) {
          hasConflicts = true;
        }
      }
      return hasConflicts; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var colPieces = 0;
      var numCols = this.attributes.n;

      //iterate through each row
      for (var i = 0; i < numCols; i++) {
        var row = this.get(i);
        if (row[colIndex] === 1) {
          colPieces++;
        }
      }

      if (colPieces > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasColConflicts = false;
      var numCols = this.attributes.n;
      //iterate through every column in board object
      for (var i = 0; i < numCols; i++) {
        if (this.hasColConflictAt(i)) {
          hasColConflicts = true;
        }
      }
      return hasColConflicts;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    //   var diagPieces = 0;
    //   var rowIndex;
    //   var rowSize;

    //   if (majorDiagonalColumnIndexAtFirstRow >= 0) {
    //     rowIndex = majorDiagonalColumnIndexAtFirstRow;
    //     rowSize = this.attributes.n;
    //   } else {
    //     rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
    //     rowSize = this.attributes.n + majorDiagonalColumnIndexAtFirstRow;
    //   }

    //   //if majorDiagonalColumnIndexAtFirstRow is negative, set starting index to 0. Else, set it to majorDiagonalColumnIndexAtFirstRow
    //   var startingIndex = majorDiagonalColumnIndexAtFirstRow > 0 ? majorDiagonalColumnIndexAtFirstRow : 0;

    //   //iterate through each row of the board, starting at majorDiagonalColumnIndexAtFirstRow
    //   for (var i = startingIndex; i < rowSize; i++) {
    //     //if diagonal element equals 1
    //     if (this.get(rowIndex)[i] === 1) {
    //       diagPieces++;
    //     }
    //     rowIndex++;
    //   }

    //   //if diagPieces > 1, return true
    //   if (diagPieces > 1) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var size = this.attributes.n;
      var cIndex = majorDiagonalColumnIndexAtFirstRow;
      var pieceCount = 0;
      for (var i = 0; i < size; i++) {
        if (this._isInBounds(i, cIndex)) {
          if (this.attributes[i][cIndex] === 1) {
            pieceCount++;
          }
        }
        cIndex++;
      }
      if (pieceCount > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.attributes.n;
      for (var i = 0; i < size; i++) {
        if (this.hasMajorDiagonalConflictAt(i) || this.hasMajorDiagonalConflictAt(-1 * i)) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    // hasAnyMajorDiagonalConflicts: function() {
    //   //for every element in a row
    //   for (var i = 0; i < this.attributes.n; i++) {
    //     //call hasMajorDiagonalConflictAt(currentIndex)
    //     if (this.hasMajorDiagonalConflictAt(i) || this.hasMajorDiagonalConflictAt(-1 * i)) {
    //       return true;
    //     }
    //   }

    //   return false;
    // },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var diagMinorPieces = 0;
      var rowIndex;
      
      if (minorDiagonalColumnIndexAtFirstRow < this.attributes.n) {
        rowIndex = 0;

        for (var i = minorDiagonalColumnIndexAtFirstRow; i >= 0; i--) {
          if (this.get(rowIndex)[i] === 1) {
            diagMinorPieces++;
          }
          rowIndex++;
        }
      } else {
        //if minorDiagonalColumnIndexAtFirstRow > 3
        rowIndex = minorDiagonalColumnIndexAtFirstRow - this.attributes.n + 1;
        for (var i = rowIndex; i < this.attributes.n; i++) {
          if (this.get(i)[minorDiagonalColumnIndexAtFirstRow - i] === 1) {
            diagMinorPieces++;
          }
        }
      }

      if (diagMinorPieces > 1) {
        return true;
      } else {
        return false;
      }
    },

    // hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    //   var size = this.attributes.n;
    //   var mirrorArray = [];
    //   for (var i = 0; i < size; i++) {
    //     var mirrorRow = [].concat(this.attributes[i]);
    //     mirrorRow.reverse();
    //     mirrorArray.push(mirrorRow);
    //   }
    //   var cIndex = minorDiagonalColumnIndexAtFirstRow;
    //   var mid = size / 2;
    //   var newCIndex = mid - (Math.abs(size / 2 - cIndex));
    //   var mirrorBoard = new Board(mirrorArray);
    //   return mirrorBoard.hasMajorDiagonalConflictAt(newCIndex); // fixme
    // },


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //calculate the possible values of minorDiagonalColumnIndexAtFirstRow
      var minorMax = (this.attributes.n * 2) - 1;
      for (var i = 0; i < minorMax; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
