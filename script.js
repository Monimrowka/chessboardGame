const board = document.querySelector('.board');
const squares = board.querySelectorAll('td');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const startingSquare = urlParams.get('start');
const columnLookup = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };

if (startingSquare !== null) {
  const row = startingSquare[1] - 1;
  const col = columnLookup[startingSquare[0]];
  let currentSquare = squares[row * 8 + col];

// Determine the row and column index of a given square
function getRowCol(square) {
  const row = square.parentNode.rowIndex;
  const col = square.cellIndex;
  return { row, col };
}

// Determine the square based on a given row and column index
function getSquare(row, col) {
  return squares[row * 8 + col];
}

// Get all the valid moves for a knight given a starting square
function getValidMoves(start) {
  const { row, col } = getRowCol(start);
  const moves = [    { row: row + 2, col: col + 1 },    { row: row + 2, col: col - 1 },    { row: row - 2, col: col + 1 },    { row: row - 2, col: col - 1 },    { row: row + 1, col: col + 2 },    { row: row + 1, col: col - 2 },    { row: row - 1, col: col + 2 },    { row: row - 1, col: col - 2 },  ];

  // Filter out moves that are off the board
  const validMoves = moves.filter(move => {
    const { row, col } = move;
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  });

  return validMoves.map(move => getSquare(move.row, move.col));
}

// Add highlighting to the starting square and valid moves
function highlightMoves(startSquare) {
  startSquare.classList.add('highlight');

  const validMoves = getValidMoves(startSquare);
  validMoves.forEach(move => {
    move.classList.add('valid-move');
    move.addEventListener('click', () => {
      // Remove highlighting from all squares
      squares.forEach(square => {
        if (square !== startSquare && square !== move) {
          square.classList.remove('highlight');
          square.classList.remove('valid-move');
        }
      });

      // Move the knight to the clicked square and highlight it
      move.innerHTML = '&#9822;';
      move.classList.add('highlight');

      // Remove the knight from the starting square
      currentSquare.innerHTML = '';
      currentSquare.classList.remove('black');

      // Update the current square to the new location
      currentSquare = move;

      // Highlight valid moves from the new location
      highlightMoves(currentSquare);
    });
  });
}

// Mark the starting square and valid moves on page load
highlightMoves(currentSquare);
currentSquare.classList.add('start');
currentSquare.classList.add('yellow');
currentSquare.classList.remove('black');
}