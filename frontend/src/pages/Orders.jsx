import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { get } from '../httpService';
import './index.scss';

const statusList = {
	1: 'Order confirmed',
	2: 'Picked by courier',
	3: 'On the way',
	4: 'Delivered',
};

const calculateDeliveryDetails = (timestamp) => {
	// Convert timestamp to a moment object
	const orderDate = moment(timestamp);

	// Calculate the delivery date (4 days after the order date)
	const deliveryDate = orderDate.clone().add(4, 'days'); // Use clone() to avoid mutating the original orderDate

	// Get the current date
	const currentDate = moment();

	// Calculate the difference in days between the delivery date and the current date
	const daysLeft = deliveryDate.diff(currentDate, 'days');

	// Determine the status based on the number of days left
	let status;
	if (daysLeft === 3) {
		status = 2;
	} else if (daysLeft === 2) {
		status = 1;
	} else if (daysLeft === 1) {
		status = 1;
	} else {
		status = 0; // You can adjust this for cases where there are 0 or negative days left
	}

	// Return the delivery date and status
	return {
		deliveryDate: deliveryDate.format('DD-MM-YYYY'),
		status,
	};
};

const MyOrder = ({ config, onClose }) => {
	const {
		items,
		cart: { cartItems },
		order_date,
		order_id
	} = config || {};
	const { deliveryDate, status } = calculateDeliveryDetails(Number(order_date));

	return (
		<article className='card'>
			<header className='card-header'> My Orders / Tracking </header>
			<div className='card-body'>
				<h6>Order ID: {order_id}</h6>
				<article className='card'>
					<div className='card-body row'>
						<div className='col'>
							{' '}
							<strong>Estimated Delivery time:</strong> <br />
							{deliveryDate}
						</div>
						<div className='col'>
							{' '}
							<strong>Shipping BY:</strong> <br /> FedEX, |{' '}
							<i className='fa fa-phone'></i> +1598675986{' '}
						</div>
						<div className='col'>
							{' '}
							<strong>Status:</strong> <br /> {statusList[status]}{' '}
						</div>
						<div className='col'>
							{' '}
							<strong>Tracking #:</strong> <br /> BD045903594059{' '}
						</div>
					</div>
				</article>
				<div className='track'>
					<div className={`step ${status > 0 ? 'active' : ''}`}>
						{' '}
						<span className='icon'>
							{' '}
							<i className='fa fa-check'></i>{' '}
						</span>{' '}
						<span className='text'>Order confirmed</span>{' '}
					</div>
					<div className={`step ${status > 1 ? 'active' : ''}`}>
						{' '}
						<span className='icon'>
							{' '}
							<i className='fa fa-user'></i>{' '}
						</span>{' '}
						<span className='text'> Picked by courier</span>{' '}
					</div>
					<div className={`step ${status > 2 ? 'active' : ''}`}>
						{' '}
						<span className='icon'>
							{' '}
							<i className='fa fa-truck'></i>{' '}
						</span>{' '}
						<span className='text'> On the way </span>{' '}
					</div>
					<div className={`step ${status > 3 ? 'active' : ''}`}>
						{' '}
						<span className='icon'>
							{' '}
							<i className='fa fa-box'></i>{' '}
						</span>{' '}
						<span className='text'>Delivered</span>{' '}
					</div>
				</div>
				<hr />
				<ul className='row'>
					{cartItems?.map((item, index) => {
						const { config: data, quantity } = item || {};
						return (
							<li key={`order-item-${index}`} className='col-md-4'>
								<figure className='itemside mb-3'>
									<div className='aside'>
										<img src={data?.images[0]?.url} className='img-sm border' />
									</div>
									<figcaption className='info align-self-center'>
										<p className='title'>
											{data?.name} <br /> {`Quantity: ${quantity}`}
										</p>
										<span className='text-muted'>${data?.price}</span>
									</figcaption>
								</figure>
							</li>
						);
					})}
				</ul>
				<hr />
				<Button onClick={() => onClose()} className='btn btn-dark'>
					{' '}
					<i className='fa fa-chevron-left'></i> Back to orders
				</Button>
			</div>
		</article>
	);
};

const OrderCard = ({ config, setSelectedOrder }) => {
	const { order_id, order_date, amount } = config || {};
	const { deliveryDate } = calculateDeliveryDetails(Number(order_date));

	return (
		<div className='d-flex flex-column'>
			<div
				className='d-flex flex-row'
				style={{ justifyContent: 'space-between' }}
			>
				<h5 style={{ width: 'max-content' }}>Order number: {order_id}</h5>
				<button onClick={() => setSelectedOrder(config)}>Track Order</button>
			</div>
			<div className='row'>
				<div className='col-6 col-md-3 column mt-3'>
					<div className='d-flex flex-column'>
						<label style={{ fontWeight: '500', fontSize: '18px' }}>
							Date of order
						</label>
						<p>{moment(Number(order_date)).format('DD-MM-YYYY')}</p>
					</div>
				</div>
				<div className='col-6 col-md-3 column mt-3'>
					<div className='d-flex flex-column'>
						<label style={{ fontWeight: '500', fontSize: '18px' }}>
							Total amount
						</label>
						<p>{`$${amount}`}</p>
					</div>
				</div>
				<div className='col-6 col-md-3 column mt-3'>
					<div className='d-flex flex-column'>
						<label style={{ fontWeight: '500', fontSize: '18px' }}>
							Payment status
						</label>
						<p>Paid</p>
					</div>
				</div>
				<div className='col-6 col-md-3 column mt-3'>
					<div className='d-flex flex-column'>
						<label style={{ fontWeight: '500', fontSize: '18px' }}>
							Estimated Delivery
						</label>
						<p>{deliveryDate}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const Orders = () => {
	const [myOrders, setMyorders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const getOrders = async () => {
		const response = await get('/v1/order');

		setMyorders(response?.data?.data);
	};

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<div className='orders-container container'>
			{selectedOrder ? (
				<MyOrder
					config={selectedOrder}
					onClose={() => setSelectedOrder(null)}
				/>
			) : myOrders?.length > 0 ? (
				<div className='flex-column'>
					<h3>Order History</h3>
					<hr />
					{myOrders.map((item, index) => {
						return (
							<React.Fragment key={`order-${index}`}>
								<OrderCard config={item} setSelectedOrder={setSelectedOrder} />
								<hr />
							</React.Fragment>
						);
					})}
				</div>
			) : (
				<>No orders</>
			)}
		</div>
	);
};

export default Orders;
