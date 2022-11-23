import { createContext, useReducer } from 'react';

export const Store = createContext();

const inititalState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
	cart: {
		shippingAddress: localStorage.getItem('shippingAddress')
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: {},
		paymentMethod: localStorage.getItem('paymentMethod')
			? JSON.parse(localStorage.getItem('paymentMethod'))
			: '',
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
		couponApply: localStorage.getItem('couponApply')
			? JSON.parse(localStorage.getItem('couponApply'))
			: { id: '', percent: 0 },
	},
};

function reducer(state, action) {
	switch (action.type) {
		case 'CART_ADD_ITEM':
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) => item.id === newItem.id
			);
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item.id === existItem.id ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return {
				...state,
				cart: {
					...state.cart,
					cartItems,
				},
			};
		case 'CART_REMOVE_ITEM': {
			const cartItems = state.cart.cartItems.filter(
				(item) => item.id !== action.payload.id
			);
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return {
				...state,
				cart: {
					...state.cart,
					cartItems,
				},
			};
		}
		case 'CART_CLEAR':
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		case 'USER_SIGNIN':
			return { ...state, userInfo: action.payload };
		case 'USER_SIGNOUT':
			return {
				...state,
				userInfo: null,
				cart: {
					cartItems: [],
					shippingAddress: {},
					paymentMethod: '',
					couponApply: {},
				},
			};
		case 'SAVE_SHIPPING_ADDRESS':
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: action.payload,
				},
			};
		case 'SAVE_PAYMENT_METHOD':
			return {
				...state,
				cart: {
					...state.cart,
					paymentMethod: action.payload,
				},
			};
		case 'SAVE_COUPON_APPLY':
			return {
				...state,
				cart: {
					...state.cart,
					couponApply: action.payload,
				},
			};
		default:
			return state;
	}
}

export function StoreProvider(props) {
	const [state, dispatch] = useReducer(reducer, inititalState);
	const value = { state, dispatch };
	return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
