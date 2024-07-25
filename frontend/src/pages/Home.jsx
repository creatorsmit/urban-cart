import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useCartActions } from '../hooks/useCartActions';
import { authSlice } from '../store';

const Home = () => {
	const userToken = localStorage.getItem('userToken');
	const setAuth = useSetRecoilState(authSlice);
	const { fetchCartItems } = useCartActions();

	useEffect(() => {
		fetchCartItems();
	}, [fetchCartItems]);

	useEffect(() => {
		if (userToken) {
			setAuth({ userToken });
		}
	}, [userToken, setAuth]);

	return (
		<div className='d-flex flex-column min-vh-100'>
			<main className='flex-grow-1'>
				<Outlet />
			</main>
		</div>
	);
};

export default Home