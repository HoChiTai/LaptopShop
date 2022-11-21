import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { Store } from '../Store';

const DashBoard = ({ children }) => {
	const [content, setContent] = useState('home');

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;
	const navigate = useNavigate();

	const signoutHandler = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('cartItems');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
		localStorage.removeItem('paymentMethod');
		navigate('/');
	};

	return (
		<Container fluid={true} className="dashboard">
			<Row className="g-0">
				<Col xs={2}>
					<div className="navigation">
						<ul>
							<li>
								<i className="fa-light fa-house"></i>
								<div>Dashboard</div>
							</li>
							<li
								className={content === 'home' ? 'active' : ''}
								onClick={() => setContent('home')}
							>
								<Link to="/admin/home">
									<i className="fa-light fa-house"></i>
									<div>Home</div>
								</Link>
							</li>
							<li
								className={content === 'orders' ? 'active' : ''}
								onClick={() => setContent('orders')}
							>
								<Link to="/admin/orders">
									<i className="fa-light fa-house"></i>
									<div>Orders</div>
								</Link>
							</li>
							<li
								className={content === 'products' ? 'active' : ''}
								onClick={() => setContent('products')}
							>
								<Link to="/admin/products">
									<i className="fa-light fa-house"></i>
									<div>Product</div>
								</Link>
							</li>
							<li
								className={content === 'customer' ? 'active' : ''}
								onClick={() => setContent('customer')}
							>
								<Link to="/admin/customer">
									<i className="fa-light fa-house"></i>
									<div>Customer</div>
								</Link>
							</li>
							<li
								className={content === 'employee' ? 'active' : ''}
								onClick={() => setContent('employee')}
							>
								<Link to="/admin/employee">
									<i className="fa-light fa-house"></i>
									<div>Employee</div>
								</Link>
							</li>
							<li
								className={content === 'receive' ? 'active' : ''}
								onClick={() => setContent('receive')}
							>
								<Link to="/admin/receive">
									<i className="fa-light fa-house"></i>
									<div>Receive</div>
								</Link>
							</li>
						</ul>
					</div>
				</Col>
				<Col xs={10}>
					<div className="content">
						<div className="admin-header">
							<div className="icon">
								<i className="fa-regular fa-bars"></i>
							</div>

							{userInfo ? (
								<>
									<div>
										<Link to="#" onClick={signoutHandler}>
											Log out
										</Link>
									</div>
									<div className="avatar">
										<div className="img">
											<img src="/images/p5.jpg" alt="" />
										</div>

										<div className="name">
											{userInfo.user.fname} {userInfo.user.lname}
										</div>
									</div>
								</>
							) : (
								<div>
									<Link to="/login">
										<div className="header__btn">Log in</div>
									</Link>
								</div>
							)}
						</div>
						{children}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default DashBoard;
