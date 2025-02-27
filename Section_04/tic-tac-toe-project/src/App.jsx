import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { useState } from 'react';
import Log from './components/Log'
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function getCurrentPlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function getGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  turns.forEach(turn => {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  })

  return gameBoard;
}

function getWinner(gameBoard, players) {
  let winner = '';

  WINNING_COMBINATIONS.forEach(combination => {
    const firstWinningSquare = gameBoard[combination[0].row][combination[0].column];
    const secondWinningSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdWinningSquare = gameBoard[combination[2].row][combination[2].column];

    if (firstWinningSquare && firstWinningSquare === secondWinningSquare && firstWinningSquare === thirdWinningSquare) {
      winner = players[firstWinningSquare];
    }
  })

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const gameBoard = getGameBoard(gameTurns);

  const winner = getWinner(gameBoard, players);

  const isDraw = gameTurns.length === 9 && !winner;

  const currentPlayer = getCurrentPlayer(gameTurns);

  function selectedSquareHandler(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = getCurrentPlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    })
  }

  const restartMatch = () => {
    setGameTurns([]);
  }

  function playerNameChangeHandler(player, name) {
    setPlayers(oldPlayers => {
      return {
        ...oldPlayers,
        [player]: name
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol='X' isActive={currentPlayer === 'X'} onNameChange={playerNameChangeHandler} />
          <Player initialName={PLAYERS.O} symbol='O' isActive={currentPlayer === 'O'} onNameChange={playerNameChangeHandler} />
        </ol>

        {(winner || isDraw) && <GameOver winner={winner} onRestart={restartMatch} />}
        <GameBoard changePlayerFunction={selectedSquareHandler} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  )
}

export default App
