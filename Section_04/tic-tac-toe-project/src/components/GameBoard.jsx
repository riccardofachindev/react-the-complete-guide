

export default function GameBoard({ changePlayerFunction, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerChoice, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => changePlayerFunction(rowIndex, colIndex)} disabled={playerChoice}>{playerChoice}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}