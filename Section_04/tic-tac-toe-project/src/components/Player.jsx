import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onNameChange }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function editClickHandler() {
        setIsEditing(isEditing => !isEditing);

        if (isEditing) {
            onNameChange(symbol, playerName);
        }
    }

    const nameChangeHandler = (event) => {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption = 'Edit';

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={nameChangeHandler} />;
        btnCaption = 'Save';
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editClickHandler}>{btnCaption}</button>
        </li>
    )
}