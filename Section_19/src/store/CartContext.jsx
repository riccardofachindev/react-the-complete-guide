import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const newItems = [...state.items];
        const itemIndex = newItems.findIndex(item => item.id === action.item.id);

        if (itemIndex > -1) {
            const existingItem = newItems[itemIndex];

            newItems[itemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 }
        } else {
            newItems.push({
                ...action.item,
                quantity: 1
            })
        }

        return { ...state, items: newItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        const newItems = [...state.items];
        const itemIndex = newItems.findIndex(item => item.id === action.id);
        const existingCartItem = newItems[itemIndex];

        if (existingCartItem.quantity === 1) {
            newItems.splice(itemIndex, 1);
        } else {
            newItems[itemIndex] = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
        }

        return { ...state, items: newItems };
    }

    if (action.type === 'CLEAR') {
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCardAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCardAction({
            type: 'ADD_ITEM',
            item
        })
    }

    const removeItem = (id) => {
        dispatchCardAction({
            type: 'REMOVE_ITEM',
            id
        })
    }

    const clearCart = () => {
        dispatchCardAction({
            type: 'CLEAR'
        })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    return (
        <CartContext value={cartContext}>{children}</CartContext>
    )
}

export default CartContext;