import { useState } from "react"
import Output from "./Output";

export default function Greeting() {
    const [changedText, setChangedText] = useState(false)

    function buttonHandler() {
        setChangedText(true);
    }

    return (
        <div>
            <h1>Hello!</h1>
            {!changedText ? <Output>Its good to see you.</Output> : <Output>Changed!</Output>}
            <button onClick={buttonHandler}>Change text</button>
        </div>
    )
}