import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const foundItem = state.items.find(item => item.id === newItem.id);

            state.totalQuantity++;
            state.changed = true;

            if (!foundItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                foundItem.quantity = foundItem.quantity + 1;
                foundItem.totalPrice = foundItem.totalPrice + foundItem.price
            }
        },
        removeItemFromCart(state, action) {
            const itemId = action.payload;
            const foundItem = state.items.find(item => item.id === itemId);

            state.totalQuantity--;
            state.changed = true;

            if (foundItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== itemId)
            } else {
                foundItem.quantity--;
                foundItem.totalPrice -= foundItem.price;
            }
        }
    }
})



export const cartActions = cartSlice.actions;

export default cartSlice;