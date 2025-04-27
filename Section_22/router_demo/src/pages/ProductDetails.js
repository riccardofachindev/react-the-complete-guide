import { useParams, Link } from 'react-router-dom';

export default function ProductDetailsPage() {
    const params = useParams();

    return (
        <>
            <h1>Products details!</h1>
            <p>{params.productId}</p>
            <p><Link to='..' relative="path">Back</Link></p>
        </>
    )
}