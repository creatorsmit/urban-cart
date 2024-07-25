import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { InputField } from '../components';
import { post } from '../httpService';
import { useRecoilValue } from 'recoil';
import { cartDetails } from '../store';
import moment from 'moment';
import { useCartActions } from '../hooks/useCartActions';

const initialValues = {
	firstName: '',
	lastName: '',
	contact: '',
	address: '',
	address2: '',
	country: '',
	state: '',
	zip: '',
};

const validationSchema = Yup.object({
	firstName: Yup.string().required('Valid first name is required.'),
	lastName: Yup.string().required('Valid last name is required.'),
	contact: Yup.string().required('Please enter a phone number'),
	address: Yup.string().required('Please enter your shipping address.'),
	country: Yup.string().required('Please select a valid country.'),
	state: Yup.string().required('Please provide a valid state.'),
	zip: Yup.string().required('Zip code required.'),
});

const Checkout = () => {
	const { cartTotal, cart_id } = useRecoilValue(cartDetails);
	const [orderSuccess, setOrderSuccess] = useState(null);
	const { fetchCartItems } = useCartActions();

	const initializeRazorPay = async (order) => {
		const payload = {
			key: `rzp_test_N0sUBFDiTNdhNE`,
			amount: order?.amount,
			currency: 'USD',
			name: 'Test',
			description: 'Urban Cart Purchase',
			image: '',
			order_id: order?.order_id,
			handler: async function (response) {
				const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
					response || {};
				const validateRes = await post(
					`${window.apiUrl}/v1/order/varifyOrder`,
					{
						payment_id: razorpay_payment_id,
						order_id: razorpay_order_id,
						signature: razorpay_signature,
						isFail: false,
					}
				);
				setOrderSuccess(validateRes?.data?.data?.order_id);
			},
			notes: {
				address: '',
			},
			theme: {
				color: '#000',
			},
		};

		const razor = new window.Razorpay(payload);

		razor.on('payment.failed', async (response) => {
			const { metadata } = response.error || {};
			const validateRes = await post(`${window.apiUrl}/v1/order/varifyOrder`, {
				payment_id: metadata?.payment_id,
				order_id: metadata?.order_id,
				isFail: true,
			});
			console.error(validateRes?.data?.message);
		});
		razor.open();
	};

	const createOrderRazorPay = async (payload) => {
		const response = await post('/v1/order', payload);

		if (response && response.status === 200) {
			initializeRazorPay(response?.data?.data);
		}
	};

	const handleSubmit = async (values) => {
		const {
			firstName,
			lastName,
			contact,
			address,
			address2,
			country,
			state,
			zip,
		} = values || {};
		const add = `${firstName} ${lastName}, ${address} ${address2} ${state}, ${country} - ${zip}`;
		createOrderRazorPay({
			shipping_address: add,
			billing_address: add,
			cart_id: cart_id,
			amount: cartTotal,
			contact: contact,
		});
	};

	useEffect(() => {
		return () => {
			fetchCartItems();
		};
	}, []);

	if (orderSuccess)
		return (
			<div className='card mb-4'>
				<div className='card-body'>
					<div className='row'>
						<div className='col-12 col-sm-12 col-md-12 col-lg-12'>
							<div className='checkout-scard card border-0 rounded'>
								<div className='card-body text-center'>
									<p className='card-icon'>
										<i className='icon an an-shield-check fs-1'></i>
									</p>
									<h4 className='card-title'>Thank you for your order!</h4>
									<p className='card-text mb-1'>
										You will receive an order confirmation email with details of
										your order and a link to track its progress.
									</p>
									<p className='card-text mb-1'>
										All necessary information about the delivery, we sent to
										your email
									</p>
									<p className='card-text text-order badge bg-success my-3'>
										Your order # is: <b>{orderSuccess}</b>
									</p>
									<p className='card-text mb-0'>
										Order date: {moment().format('DD/MM/YYYY')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	return (
		<div className='card mb-4'>
			<div className='card-header py-3'>
				<h4 className='mb-0'>Billing address</h4>
			</div>
			<div className='card-body'>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className='needs-validation' noValidate>
							<div className='row g-3'>
								<div className='col-sm-6 my-1'>
									<InputField
										label='First name'
										name='firstName'
										type='text'
										placeholder=''
									/>
								</div>

								<div className='col-sm-6 my-1'>
									<InputField
										label='Last name'
										name='lastName'
										type='text'
										placeholder=''
									/>
								</div>

								<div className='col-12 my-1'>
									<InputField
										label='Contact number'
										name='contact'
										type='contact'
									/>
								</div>

								<div className='col-12 my-1'>
									<InputField label='Address' name='address' type='text' />
								</div>

								<div className='col-12'>
									<InputField label='Address 2' name='address2' type='text' />
								</div>

								<div className='col-md-5 my-1'>
									<InputField
										label='Country'
										name='country'
										as='select'
										type='select'
									>
										<option value=''>Choose...</option>
										<option value='Canada'>Canada</option>
									</InputField>
								</div>

								<div className='col-md-4 my-1'>
									<InputField
										label='State'
										name='state'
										as='select'
										type='select'
									>
										<option value=''>Choose...</option>
										<option value='Brampton'>Brampton</option>
										<option value='Torronto'>Torronto</option>
									</InputField>
								</div>

								<div className='col-md-3 my-1'>
									<InputField
										label='Zip'
										name='zip'
										type='text'
										placeholder=''
									/>
								</div>
							</div>

							<hr className='my-4' />

							<Button
								className='w-100 btn btn-dark btn-lg btn-block'
								type='submit'
								disabled={isSubmitting}
							>
								Continue to checkout
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Checkout;
