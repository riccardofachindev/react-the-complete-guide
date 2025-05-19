'use client'

import { useState } from 'react';
import RSCDemo from './RSCDemo';

export default function ClientDemo({ children }) {
    const [counter, setCounter] = useState(0);

    function clickHandler() {
        setCounter(prevCount => prevCount + 1);
    }

    console.log('ClientDemo rendered');
    return (
        <div className='client-cmp'>
            <h2>A React Client Component</h2>
            <p>
                Will be rendered on the client <strong>AND</strong> the server.
            </p>
            <p>
                <button onClick={clickHandler}>Increase count</button>
                {counter}
            </p>
            {children}
        </div>
    );
}