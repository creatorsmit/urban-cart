import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCartActions } from '../hooks/useCartActions';
import { cartItems } from '../store';

const CartItemCard = ({ product = {} }) => {
	const { addItemToCart, removeItemFromCart } = useCartActions();
	const { config, quantity } = product || {};

	return config ? (
		<div key={config?._id}>
			<div className='row d-flex align-items-center'>
				<div className='col-lg-3 col-md-12'>
					<div className='bg-image rounded' data-mdb-ripple-color='light'>
						<img
							src={config?.images[0]?.url}
							alt={config.name}
							width={100}
							height={75}
						/>
					</div>
				</div>

				<div className='col-lg-5 col-md-6'>
					<p>
						<strong>{config?.name}</strong>
					</p>
				</div>

				<div className='col-lg-4 col-md-6'>
					<div className='d-flex mb-4' style={{ maxWidth: '300px' }}>
						<button
							className='btn px-3'
							onClick={() => {
								removeItemFromCart(config);
							}}
						>
							-
						</button>
						<p
							className='px-5'
							style={{
								border: '1px solid #000',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{quantity}
						</p>

						<button
							className='btn px-3'
							onClick={() => {
								addItemToCart(config);
							}}
						>
							+
						</button>
					</div>

					<p className='text-start text-md-center'>
						<strong>
							<span className='text-muted'>{quantity}</span> x ${config?.price}
						</strong>
					</p>
				</div>
			</div>

			<hr className='my-4' />
		</div>
	) : (
		<></>
	);
};

const CartItems = () => {
	const cartElements = useRecoilValue(cartItems);
	return (
		<div className='card mb-4'>
			<div className='card-header py-3'>
				<h5 className='mb-0'>Item List</h5>
			</div>
			<div className='card-body'>
				{cartElements?.map((item, index) => {
					return (
						<CartItemCard
							key={`cart-item-${item?.config?._id}`}
							product={item}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CartItems;
