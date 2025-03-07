import { createContext } from "react";
import { DUMMY_PRODUCTS } from '../dummy-products.js';
import { useReducer } from 'react';

export const CartContext = createContext(
    {
        items: [],
        addItemToCart: () => { },
        updateItemInCart: () => { }
    }
)

// defined outside the component function because it doesn't need access to any of its values/props
// and shouldn't be re-executed on every re-render
// action: the function  will be executed when we dispatch actions
// state: will be the guaranteed latest state snapshot
// it should return the updated state
function shoppingCartReducer(state, action) {
    // we check for the dispatched action type and pass the "state" as the old useState
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        // return the updated state like in useState, so spread the old state and add only what it's updated
        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    return state;
}

export default function CartContextProvider({ children }) {
    // use reducer has 2 parameters
    // 1: the usereducer function, that will be triggered every time an action is dispatched
    // 2: initial value for the reducer state
    // it returns an array [state, dispatch], where state is the current state you want to use,
    // and dispatch is the element to dispatch actions
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: []
        }
    );

    // the components functions become dispatchers and they will trigger the function in the reducer
    // the content of this function can be more to the reducer
    function handleAddItemToCart(id) {
        // what we dispatch will be sent as value "action" to the reducer
        // the type is the type of action, and the payload are the variables needed o perform the action
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,
                amount
            }
        })
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemInCart: handleUpdateCartItemQuantity
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}