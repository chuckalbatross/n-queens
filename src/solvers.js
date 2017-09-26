/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.isNRooksSolution = function(board) {
  if (!board.hasAnyRooksConflicts()) { 
    return true; 
  } else {
    return false;
  }
};

// window.isNQueensSolution = function(n, board) {
//   if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
//     if (!board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
//       return true;
//     }
//   } else {
//     return false;
//   }
// }

// window.findAllBoardCombinations = function(n) {
//   var combos = [];

//   var generateCombos = function(n, assignedSoFar) {
//     //BASE CASE
//     if (roundsToGo === 0) {

//     }

//     //RECURSIVE CASE
//     for (var i = 0; i < n; i++) {
//       var row = [];
//       for (var k = 0; k < n; k++) {
//         var col = 
//       }
//     }
//   }


// };

window.extractBoardMatrix = function(board) {
  var matrix = [];
  for (var i = 0; i < board.attributes.n; i++) {
    var row = [];
    for (var k = 0; k < board.attributes.n; k++) {
      row.push(board.attributes[i][k]);
    }
    matrix.push(row);
  }
  return matrix;
};

window.findNRooksSolution = function(n) {
  var solutionBoard = new Board({'n': n});
  // var numPiecesRemaining = n;

  //ROWS
  for (var i = 0; i < n; i++) {
    //COLS
    for (var k = 0; k < n; k++) {
      // while (numPiecesRemaining > 0) {
      //can you put it there without causing rowConflict and ColConflict
      solutionBoard.attributes[i][k] = 1;
      // numPiecesRemaining--;
      if (solutionBoard.hasAnyRowConflicts(i) || solutionBoard.hasAnyColConflicts(k)) {
        solutionBoard.attributes[i][k] = 0;
        // numPiecesRemaining++;
      }
      // }
    }
  }

  var solution = [];
  // for (var key in solutionBoard.attributes) {
  for (var i = 0; i < n; i++) {
    solution.push(solutionBoard.attributes[i]);
  }

  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var decisionTreeRecursion = function(rowIndex) {
    //BASE CASE
    if (rowIndex === n) {
      if (!board.hasAnyRooksConflicts()) {
        solutionCount++;  
      }
      return;
    }

    //RECURSIVE CASE
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex, i);
      if (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
        board.togglePiece(rowIndex, i);
      } else {
        decisionTreeRecursion(rowIndex + 1);
        board.togglePiece(rowIndex, i);
      }
    }
  };

  //call recursive function
  decisionTreeRecursion(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0;
//   var solutionSet = [];

//   var decisionTreeRecursion = function(numRooksRemaining, currentSolution) {
//     currentSolution = currentSolution || new Board({'n': n});
//     //iterate through each space on board (rows x cols)

//     //BASE CASE
//     if (numRooksRemaining === 0) {
//       if (this.isNRooksSolution(currentSolution)) {
//         //if currentSolution isn't already in solutionSet
//         if (!solutionSet.includes(JSON.stringify(currentSolution))) {
//           solutionCount++;
//           solutionSet.push(JSON.stringify(currentSolution));
//         }
//       }
//       return;
//     }

//     //RECURSIVE CASE
//     for (var i = 0; i < n; i++) {
//       for (var k = 0; k < n; k++) {
//         if (currentSolution.attributes[i][k] === 0 && numRooksRemaining > 0) {


//           var matrixCurrentSol = this.extractBoardMatrix(currentSolution);
//           var copyCurrentSolution = new Board(matrixCurrentSol);
//           copyCurrentSolution.attributes[i][k] = 1;
//           decisionTreeRecursion(numRooksRemaining - 1, copyCurrentSolution);

//         }
//       }
//     }
//   }

//   //call recursive function
//   decisionTreeRecursion(n);

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };















//HOW COULD I RETURN OUT OF RECURSIVE CALL STACK ONCE I FOUND THE FIRST SOLUTION

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();


  var diveIn = function(rowIndex) {

    //BASE CASE:
    if (rowIndex === n) {
      if (!board.hasAnyQueensConflicts()) {
        //copy solution matrix to board matrix
        for (var i = 0; i < n; i++) {
          var temp = [].concat(board.attributes[i]);
          if (solution.length < n) {
            solution.push(temp);
          }
        }
        return;
      }
    }

    //RECURSIVE CASE:
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex, i);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(rowIndex, i);
      } else {
        diveIn(rowIndex + 1);
        board.togglePiece(rowIndex, i);
      }
    }
  };


  diveIn(0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
















// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var uniqueSolutionSetArr = [];

  var NQueensRecursive = function(rowIndex) {
    //BASE CASE
    if (rowIndex === n) {
      if (!board.hasAnyQueensConflicts()) {
        solutionCount++;
      }
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex, i);
      if (board.hasColConflictAt(i) || board.hasRowConflictAt(rowIndex) || board.hasMajorDiagonalConflictAt(i - rowIndex) || board.hasMinorDiagonalConflictAt(i + rowIndex)) {
        board.togglePiece(rowIndex, i);
      } else {
        NQueensRecursive(rowIndex + 1);
        board.togglePiece(rowIndex, i);
      }
    }
  };

  NQueensRecursive(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
