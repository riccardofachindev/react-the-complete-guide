import { useContext } from "react";

import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import { totalPrice } from "../utils/priceCalculator";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function closeButtonHandler() {
        if (userProgressCtx.progress === 'cart') {
            userProgressCtx.hideCart();
        }
    }

    const checkoutButtonHandler = () => {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className='cart' open={userProgressCtx.progress === 'cart'} onCloseHandler={closeButtonHandler}>
            <h2>Your cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                        onIncrease={() => cartCtx.addItem(item)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalPrice(cartCtx.items))}</p>
            <p className="modal-actions">
                <Button textOnly onClick={closeButtonHandler}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={checkoutButtonHandler}>Go to checkout</Button>}
            </p>
        </Modal>
    )
}