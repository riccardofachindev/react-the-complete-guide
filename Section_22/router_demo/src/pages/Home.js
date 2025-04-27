import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
    const navigate = useNavigate();

    function navigateButtonHandler() {
        navigate('/products');
    }

    return (
        <>
            <h1>My home page</h1>
            <p> Go to <Link to="products">Products</Link>.</p>
            <button onClick={navigateButtonHandler}>Products</button>
        </>
    )
}