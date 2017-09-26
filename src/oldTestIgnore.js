window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = [];

  // //recursive function
  // var nextRowRecursive = function(rowIndex) {
  //   if (rowIndex === n) {
  //     //double check no conflicts
  //     if (!board.hasAnyQueensConflicts()) {
  //       //generate nxn matrix of solution
  //       for (var i = 0; i < n; i++) {
  //         var temp = [...board.attributes[i]];
  //         solution.push(temp);
  //       }
  //     }
  //     return;
  //   }

  //   for (var i = 0; i < n; i++) {
  //     if (board.attributes[rowIndex][i] === 0) {
  //       board.togglePiece(rowIndex, i);
  //     }
  //     if (board.hasAnyQueensConflicts()) {
  //       board.togglePiece(rowIndex, i);
  //     }
  //     nextRowRecursive(rowIndex + 1);
  //     // board.togglePiece(rowIndex, i);
  //   }
  // }

  // //call recursive function
  // nextRowRecursive(0);
  // console.log(board);

  var nextRowRecursive = function(rowIndex) {

    //BASE CASE: if we're passed the last row, then return
    if (rowIndex === n) {
      if (!board.hasAnyQueensConflicts()) {
        
        return;
      }
    }

    //RECURSIVE CASE: iterate through all the columns
    for (var i = 0; i < n; i++) {
      //if we haven't placed a piece on current row yet

      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(rowIndex, i);

        //if last toggle causes Queen conflict, then toggle back
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(rowIndex, i);
          isPiecePlaced = false;
        }
        nextRowRecursive(rowIndex + 1);
        board.togglePiece(rowIndex, i);
      }
    }
  }

  nextRowRecursive(0);
  // convert board to nxn matrix
  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};