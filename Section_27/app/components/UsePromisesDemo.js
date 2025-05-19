'use client'

import { useState, use } from 'react';

export default function UsePromiseDemo({ usersPromise }) {
    const [count, setCount] = useState(0);
    const users = use(usersPromise);

    return (
        <div className='rsc'>
            <h2>RSC with Data Fetching</h2>
            <p>
                Uses <strong>async / await</strong> for data fetching.
            </p>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Increment</button>
            {count}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.title})
                    </li>
                ))}
            </ul>
        </div>
    );
}