import { createContext, useState } from 'react';

const UserProgressContext = createContext({
    progress: '',
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { }
});

export function UserProgressContextProvider({ children }) {
    const [progress, setProgress] = useState('');

    function showCart() {
        setProgress('cart');
    }

    function hideCart() {
        setProgress('');
    }

    const showCheckout = () => {
        setProgress('checkout');
    }

    const hideCheckout = () => {
        setProgress('');
    }

    const UserProgressCtx = {
        progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext value={UserProgressCtx}>
            {children}
        </UserProgressContext>
    )
}

export default UserProgressContext;