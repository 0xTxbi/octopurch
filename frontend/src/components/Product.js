import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
	return (

		<Card className="my-3 py-3 rounded">

			<a href={`/product/${product._id}`}>
				<Card.Img variant="bottom" src={product.image} />
			</a>

			<Card.Body>
				<a href={`/product/${product._id}`}>
					<Card.Title as="div"><strong>{product.name}</strong></Card.Title>
				</a>

				<Card.Text as="div">
					<div className="my-3">{product.rating} stars from {product.numReviews} reviews</div>
				</Card.Text>

				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>

		</Card>

	)
}

export default Product
