import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


const PaymentMethodScreen = ({ history }) => {

	const cart = useSelector(state => state.cart)
	const { shippingAddress } = cart

	if (!shippingAddress) {
		history.push('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('Paypal')

	const dispatch = useDispatch()

	const submitHandler = (e) => {

		e.preventDefault()

		// Dispatch Save Payment Method
		dispatch(savePaymentMethod(paymentMethod))

		// Navigate to Payment Screen
		history.push('/place-order')

	}

	return (

		<FormContainer>

			<CheckoutSteps step1 step2 step3 />

			<h1>Select your preffered payment method</h1>

			<Form onSubmit={submitHandler}>

				{/* Select Payment Method */}
				<Form.Group controlId="address">
					<Form.Label as="legend">Select Method</Form.Label>

					<Col>
						{/* Paypal */}
						<Form.Check type="radio" label="Paypal or Credit Card" id="paypal" name="paymentMethod" value="Paypal" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
						{/* Stripe
						<Form.Check type="radio" label="Stripe" id="stripe" name="paymentMethod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
					</Col>
				</Form.Group>


				<Button type="submit" variant="primary">Continue</Button>

			</Form>
		</FormContainer >

	)

}

export default PaymentMethodScreen
