import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as Yup from 'yup';
import { InputField } from '../components';
import { post } from '../httpService';
import { authSlice } from '../store';

const initialValues = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const Register = () => {
	//Hooks
	const navigate = useNavigate();
	const userToken = localStorage.getItem('userToken');

	// States
	const setUserDetails = useSetRecoilState(authSlice);
	const [loading, setLoading] = useState(false);

	// API
	const registerUser = async (values) => {
		const { first_name, last_name, email, password } = values || {};
		setLoading(true);
		const response = await post('/v1/user', {
			first_name,
			last_name,
			email,
			password,
		});

		if (response.status === 201) {
			const { auth_token, first_name, last_name, email } = response.data.data || {};
			if (auth_token) {
				localStorage.setItem('userToken', auth_token);
				setUserDetails({ userToken: auth_token, first_name, last_name, email });
				toast.success('User Registered Successfully!');
				navigate('/', { replace: true });
			} else {
				toast.error('Something went wrong!');
			}
		} else {
			toast.error('Something went wrong!');
		}
		setLoading(false);
	};

	useEffect(() => {
		if (userToken) {
			navigate('/', { replace: true });
		}
	}, [userToken]);

	return (
		<div className='container my-3 py-3'>
			<h1 className='text-center'>Register</h1>
			<hr />

			<div className='row my-4 h-100'>
				<div className='col-md-4 col-lg-4 col-sm-8 mx-auto'>
					<Formik
						initialValues={initialValues}
						validationSchema={Yup.object({
							first_name: Yup.string().required('Please enter full name'),
							last_name: Yup.string().required('Please enter last name'),
							email: Yup.string()
								.email('Invalid email address')
								.required('Please enter email'),
							password: Yup.string()
								.matches(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
									'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
								)
								.required('Please enter password'),
							confirmPassword: Yup.string().oneOf(
								[Yup.ref('password'), null],
								'Confirm password must match with password'
							),
						})}
						onSubmit={registerUser}
					>
						{({ values, handleSubmit }) => (
							<Form className='form' onSubmit={handleSubmit}>
								<div className='form '>
									<InputField
										label='First name'
										type='text'
										name='first_name'
										value={values.first_name}
									/>
								</div>
								<div className='form '>
									<InputField
										label='Last name'
										type='text'
										name='last_name'
										value={values.last_name}
									/>
								</div>
								<div className='form '>
									<InputField
										label='Email address'
										type='email'
										name='email'
										value={values.email}
									/>
								</div>
								<div className='form  '>
									<InputField
										label='Password'
										type='password'
										name='password'
										value={values.password}
									/>
								</div>
								<div className='form  '>
									<InputField
										label='Confirm Password'
										type='password'
										name='confirmPassword'
										value={values.confirmPassword}
									/>
								</div>

								<div className='my-3'>
									<p>
										Already has an account?{' '}
										<Link
											to='/login'
											className='text-decoration-underline text-info'
										>
											Login
										</Link>{' '}
									</p>
								</div>
								<div className='text-center'>
									<button
										className='my-2 mx-auto btn btn-dark'
										type='submit'
										disabled={loading}
									>
										{loading ? (
											<Spinner animation='border' variant='light' />
										) : (
											'Register'
										)}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Register;
