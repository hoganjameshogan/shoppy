import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const Product = ({product}) => {
    return (
        <Card className="my-3 p-3">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                       <strong> {product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews}
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#ffcf0d"} />
                    </div>
                </Card.Text>
                <Card.Text as="h3">&euro;{product.price}</Card.Text>
            </Card.Body>
        </Card>    
    )
}

export default Product
