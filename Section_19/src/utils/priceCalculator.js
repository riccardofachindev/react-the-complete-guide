export const totalPrice = (items) => {
    return items.reduce((totalPrice, item) => totalPrice + (item.price * item.quantity), 0);
}