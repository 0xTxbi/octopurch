import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {

	const cart = useSelector(state => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const dispatch = useDispatch()

	const submitHandler = (e) => {

		e.preventDefault()

		// Dispatch Save Shipping Address
		dispatch(saveShippingAddress({ address, city, postalCode, country }))

		// Navigate to Payment Screen
		history.push('/payment')

	}

	return (
		<FormContainer>
			<h1>Shipping</h1>

			<Form onSubmit={submitHandler}>

				{/* Address input field */}
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control type="text" placeholder="Your Full Address" value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
				</Form.Group>

				{/* City input field */}
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control type="text" placeholder="Your City" value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
				</Form.Group>

				{/* Postal Code input field */}
				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control type="text" placeholder="Postal Code" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
				</Form.Group>

				{/* Country input field */}
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control type="text" placeholder="Country" value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">Continue</Button>

			</Form>
		</FormContainer>
	)

}

export default ShippingScreen