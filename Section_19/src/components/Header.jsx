import { useContext } from 'react';

import logoImg from '../assets/logo.jpg'
import Button from '../UI/Button'
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalItemsInCart = cartCtx.items.reduce((totalItems, item) => totalItems + item.quantity, 0)

    function cartClickHandler() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>React Food Orders</h1>
            </div>
            <nav>
                <Button textOnly onClick={cartClickHandler}>Cart ({totalItemsInCart})</Button>
            </nav>
        </header>
    )
}