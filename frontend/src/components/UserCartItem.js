import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserCartProduct from '../components/UserCartProduct';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const reducer = (state, action) => {
	switch (action.type) {
		// case 'FETCH_REQUEST':
		// 	return { ...state, loading: true, error: '' };
		// case 'FETCH_SUCCESS':
		// 	return { ...state, loading: false, orders: action.payload, error: '' };
		// case 'FETCH_FAIL':
		// 	return { ...state, loading: false, error: action.payload };

		case 'UPDATE_REQUEST':
			return { ...state, loadingUpdate: true };
		case 'UPDATE_SUCCESS':
			return { ...state, loadingUpdate: false };
		case 'UPDATE_FAIL':
			return { ...state, loadingUpdate: false };

		default:
			return state;
	}
};

const UserCartItem = (props) => {
	const { orders } = props;
	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	// const [{ loading, error, orders, loadingUpdate }, dispatch] = useReducer(
	// 	reducer,
	// 	{
	// 		loading: true,
	// 		orders: [],
	// 		error: '',
	// 		loadingUpdate: false,
	// 	}
	// );

	const [{ error, loadingUpdate }, dispatch] = useReducer(reducer, {
		error: '',
		loadingUpdate: false,
	});

	// useEffect(() => {
	// 	const fetchOrders = async () => {
	// 		try {
	// 			dispatch({ type: 'FETCH_REQUEST' });
	// 			const { data } = await axios.get(
	// 				`/api/orders/user/${userInfo.user.id}/status/${status_id}`,
	// 				{
	// 					headers: {
	// 						authorization: `Bearer ${userInfo.authorization.token}`,
	// 					},
	// 				}
	// 			);
	// 			dispatch({ type: 'FETCH_SUCCESS', payload: data.orders });
	// 		} catch (error) {
	// 			dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
	// 			alert(getError(error));
	// 		}
	// 	};
	// 	fetchOrders();
	// }, [userInfo.authorization.token, userInfo.id, userInfo.user.id]);

	const UpdateStatusHandller = async () => {
		const { data } = {};
	};

	// return loading ? (
	// 	<LoadingBox></LoadingBox>
	// ) : error ? (
	// 	<MessageBox variant="danger">{error}</MessageBox>
	// ) : (
	return (
		<div>
			{orders.map((order) => (
				<Row>
					<Col xs={12}>
						<div className="user-cart__item">
							<input type="checkbox" id="44567" />
							<label className="cart-info" htmlFor="44567">
								<Row>
									<Col xs={3} className="cart-id">
										{order.id}
									</Col>
									<Col xs={3} className="cart-date">
										{order.date}
									</Col>
									{/* <Col xs={5} className="cart-confirm">
										{order.statuses.name}
									</Col> */}
									<Col xs={3} className="cart-total">
										${order.total_price}
									</Col>
									<Col xs={3} className="cart-icon">
										<i className="fa-regular fa-angle-right"></i>
									</Col>
								</Row>
							</label>

							<div className="cart-content">
								{order.order_details.map((item) => (
									<UserCartProduct item={item} />
								))}
								<div className="cart-content__information">
									<Row>
										<Col xs={4}>
											<div className="cart-content__address">
												<h5>ID: {order.id}</h5>
												<h6>Name: {order.name}</h6>
												<h6>Phone: {order.phone}</h6>
												<h6>Address: {order.address}</h6>
												<h6>City: {order.city}</h6>
											</div>
										</Col>
										<Col xs={8}>
											<ul className="cart-content__order">
												<li>
													<div className="heading">Total cart</div>
													<div className="price">
														${order.items_price.toFixed(2)}
													</div>
												</li>
												<li>
													<div className="heading">Shipping</div>
													<div className="price">
														${order.shipping_price.toFixed(2)}
													</div>
												</li>
												<li>
													<div className="heading">Tax price</div>
													<div className="price">
														${order.tax_price.toFixed(2)}
													</div>
												</li>
												<li>
													<div className="heading">Total price</div>
													<div className="price">
														${order.total_price.toFixed(2)}
													</div>
												</li>
											</ul>
										</Col>
									</Row>
								</div>
								<div className="btn-cancel" onClick={UpdateStatusHandller}>
									Cancel
								</div>
							</div>
						</div>
					</Col>
				</Row>
			))}
		</div>
	);
};

export default UserCartItem;
