import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserCartItem from '../components/UserCartItem';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, statuses: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };

		case 'FETCH_ORDER_REQUEST':
			return { ...state, loadingOrder: true, error: '' };
		case 'FETCH_ORDER_SUCCESS':
			return {
				...state,
				loadingOrder: false,
				orders: action.payload,
				error: '',
			};
		case 'FETCH_ORDER_FAIL':
			return { ...state, loadingOrder: false, error: action.payload };

		default:
			return state;
	}
};

const UserCart = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	const [{ loading, loadingOrder, orders, statuses, error }, dispatch] =
		useReducer(reducer, {
			loading: true,
			loadingOrder: true,
			orders: [],
			statuses: [],
			error: '',
		});

	const [selected, setSelected] = useState(1);

	const fetchOrdersByState = async (status_id) => {
		try {
			dispatch({ type: 'FETCH_ORDER_REQUEST' });
			const { data } = await axios.get(
				`/api/orders/user/${userInfo.user.id}/status/${status_id}`,
				{
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				}
			);
			dispatch({ type: 'FETCH_ORDER_SUCCESS', payload: data.orders });
		} catch (error) {
			dispatch({ type: 'FETCH_ORDER_FAIL', payload: getError(error) });
			alert(getError(error));
		}
	};

	useEffect(() => {
		const fetchStatuses = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/statuses`);
				dispatch({ type: 'FETCH_SUCCESS', payload: data.statuses });
			} catch (error) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
				alert(getError(error));
			}
		};
		fetchStatuses();
		fetchOrdersByState(1);
	}, []);

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<Row>
			<Col xs={12}>
				<div className="user-cart">
					<ul className="user-cart__tab">
						{statuses.map((status) => (
							<li
								className={selected === status.id ? 'active' : ''}
								onClick={() => {
									setSelected(status.id);

									fetchOrdersByState(status.id);
								}}
							>
								{status.name}
							</li>
						))}
					</ul>
				</div>
				{loadingOrder ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<UserCartItem orders={orders} />
				)}
			</Col>
		</Row>
	);
};

export default UserCart;
