import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'
// import { cartReducer } from '../reducers/cartReducers'

export const addToCart = (id, quantity) => async (dispatch, getState) => {

	const { data } = await axios.get(`/api/products/${id}`)

	dispatch({

		type: CART_ADD_ITEM,

		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			stock: data.countInStock,
			quantity
		}

	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}