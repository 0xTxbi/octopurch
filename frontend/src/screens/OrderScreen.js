import React, { useEffect } from 'react'
import { Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {

	const orderId = match.params.id

	const dispatch = useDispatch()


	const orderDetails = useSelector(state => state.orderDetails)
	const { order, loading, error } = orderDetails

	if (!loading) {


		// Round arguments to 2 d.p
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2)
		}

		// Compute order price
		order.itemsPrice = addDecimals(order.orderItems.reduce((acc, currItem) => acc + currItem.price * currItem.quantity, 0))

	}

	useEffect(() => {

		if (!order || order._id !== orderId) {
			dispatch(getOrderDetails(orderId))
		}

	}, [dispatch, order, orderId])



	return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>

		<h1>Order {order._id}</h1>
		<Row>
			<Col md={8}>
				<ListGroup variant="flush">

					{/* Shipping Details */}
					<ListGroup.Item>
						<h2>Shipping</h2>
						<p><strong>Name: </strong>{order.user.name}</p>
						<p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
						<p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
						{order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not delivered</Message>}
					</ListGroup.Item>

					{/* Payment Method */}
					<ListGroup.Item>
						<h2>Payment Method</h2>
						<p><strong>Method:</strong> {order.paymentMethod}</p>
						{order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not paid</Message>}
					</ListGroup.Item>

					{/* Fetch order items */}
					<ListGroup.Item>
						<h2>Order Items</h2>

						{order.orderItems.length === 0 ? <Message>You have no confirmed orders</Message> : (
							<ListGroup variant="flush">
								{order.orderItems.map((item, index) => (
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
								<Col>${order.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping</Col>
								<Col>${order.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Tax</Col>
								<Col>${order.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Total</Col>
								<Col>${order.totalPrice}</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>

	</>

}

export default OrderScreen