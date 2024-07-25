import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartDetails, cartItems } from '../store';

const EmptyCart = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-12 py-5 bg-light text-center'>
					<h4 className='p-3 display-5'>Your Cart is Empty</h4>
					<Link to='/' className='btn  btn-outline-dark mx-4'>
						<i className='fa fa-arrow-left'></i> Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	);
};

const ShowCart = () => {
	const location = useLocation();
	const { subtotal, tax, shipping, itemCount, cartTotal } =
		useRecoilValue(cartDetails);

	return (
		<>
			<section className='h-100 gradient-custom'>
				<div className='container py-5'>
					<div className='row d-flex justify-content-center my-4'>
						<div className='col-md-8'>
							<Outlet />
						</div>
						<div className='col-md-4'>
							<div className='card mb-4'>
								<div className='card-header py-3 bg-light'>
									<h5 className='mb-0'>Order Summary</h5>
								</div>
								<div className='card-body'>
									<ul className='list-group list-group-flush'>
										<li className='list-group-item d-flex justify-content-between align-items-center px-0'>
											Products ({itemCount})<span>${subtotal}</span>
										</li>
										<li className='list-group-item d-flex justify-content-between align-items-center px-0'>
											Shipping
											<span>${shipping}</span>
										</li>
										<li className='list-group-item d-flex justify-content-between align-items-center px-0'>
											Tax
											<span>${tax}</span>
										</li>
										<li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
											<div>
												<strong>Total amount</strong>
											</div>
											<span>
												<strong>${cartTotal}</strong>
											</span>
										</li>
									</ul>

									{location.pathname === '/cart' && (
										<Link
											to='checkout'
											style={{ cursor: 'pointer' }}
											className='btn w-100 btn-dark btn-lg btn-block'
										>
											Go to checkout
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

const Cart = () => {
	const userToken = localStorage.getItem('userToken');
	const cartElements = useRecoilValue(cartItems);

	return userToken ? (
		<div className='container my-3 py-3'>
			<h1 className='text-center'>
				{location.pathname === '/cart/checkout' ? 'Checkout' : 'Cart'}
			</h1>
			<hr />
			{cartElements.length > 0 ? (
				<ShowCart config={cartElements} />
			) : (
				<EmptyCart />
			)}
		</div>
	) : (
		<div className='container'>
			<div className='row'>
				<div className='col-md-12 py-5 bg-light text-center'>
					<h4 className='p-3 display-5'>Please login</h4>
					<Link to='/login' className='btn  btn-outline-dark mx-4'>
						{' '}
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
