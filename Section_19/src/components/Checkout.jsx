import { useContext, useActionState } from "react";

import Modal from "../UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import { totalPrice } from "../utils/priceCalculator";
import CartContext from "../store/CartContext";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "../UI/Error";

const initialConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', initialConfig)

    function closeButtonHandler() {
        userProgressCtx.hideCheckout();
    }

    function clearCheckoutHandler() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    async function checkoutAction(prevData, formData) {
        const customerData = Object.fromEntries(formData.entries());

        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    const [formState, formAction, isLoading] = useActionState(checkoutAction, null)

    let actions = (
        <>
            <Button type="button" textOnly onClick={closeButtonHandler} >Close</Button>
            <Button>Submit order</Button>
        </>
    )

    if (isLoading) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onCloseHandler={clearCheckoutHandler}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p className="modal-actions">
                    <Button onClick={clearCheckoutHandler}>Close</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onCloseHandler={closeButtonHandler} >
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(totalPrice(cartCtx.items))}</p>

                <Input label="Full Name" id="name" type="text" />
                <Input label="E-mail Address" id="email" type="email" />
                <Input label="Street" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>

                {error && <Error title="Failed to submit order" message={error.message} />}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal >
    )
}