import React from 'react'
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {

	const cart = useSelector(state => state.cart)

	// Round arguments to 2 d.p
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	// Compute prices
	cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, currItem) => acc + currItem.price * currItem.quantity, 0))

	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

	cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

	const placeOrderHandler = () => {

		// For debugging purposes
		console.log('Place Order')

	}

	return (
		<>

			<CheckoutSteps step1 step2 step3 step4 />

			<Row>
				<Col md={8}>
					<ListGroup variant="flush">

						{/* Shipping Details */}
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p><strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
						</ListGroup.Item>

						{/* Payment Method */}
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p><strong>Method:</strong> {cart.paymentMethod}</p>
						</ListGroup.Item>

						{/* Order items in the cart */}
						<ListGroup.Item>
							<h2>Order Items</h2>

							{cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={2}><Image src={item.image} alt={item.name} fluid rounded /></Col>
												<Col md={6}><Link to={`product/${item.product}`}>{item.name}</Link></Col>
												<Col md={4}>{item.quantity} x {item.price} = {item.quantity * item.price}</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>)}

						</ListGroup.Item>

					</ListGroup>
				</Col>

				<Col md={4}>
					<Card>
						<ListGroup variant="flush">

							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
							</ListGroup.Item>

						</ListGroup>
					</Card>
				</Col>
			</Row>

		</>
	)

}

export default PlaceOrderScreen