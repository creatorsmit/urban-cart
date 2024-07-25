import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authSlice, cartItems } from '../store';
import Search from './Search';
import './index.scss';
import logo from '../../../public/images/Logo.png'; // Adjust the path as necessary

const Navbar = () => {
	const [userDetails, setUserDetails] = useRecoilState(authSlice);
	const cartElements = useRecoilValue(cartItems);

	const handleLogout = () => {
		localStorage.removeItem('userToken');
		setUserDetails(null);
	};

	const navLinkStyle = {
		color: 'white',
		textDecoration: 'none',
		margin: '0 10px'
	};

	const buttonStyle = {
		color: 'white',
		backgroundColor: 'transparent',
		border: '1px solid white'
	};

	return (
		<header id="Header" style={{ backgroundColor: '#B89379' }}>
			<nav className='navbar navbar-expand-lg navbar-light py-3 sticky-top justify-content-center' style={{ backgroundColor: '#B89379' }}>
				<div className='container d-flex align-items-center justify-content-between w-100'>
					<NavLink className='navbar-brand fw-bold fs-4 px-2' to='/'>
						<img src={logo} alt="Urban Cart Logo" style={{ height: '70px' }} />
					</NavLink>
					<button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					
					{window.innerWidth > 568 && <Search />}
					<div className='collapse navbar-collapse flex-grow-0' id="navbarSupportedContent">
						<div className='d-flex align-items-center buttons text-center flex-nowrap'>
							{userDetails && userDetails?.userToken ? (
								<button onClick={handleLogout} className='btn btn-outline-light w-max m-2' style={buttonStyle}>
									Logout
								</button>
							) : (
								<>
									<NavLink to='/products' style={navLinkStyle}>
										Products
									</NavLink>
									<NavLink to='/aboutus' style={navLinkStyle}>
										About Us
									</NavLink>
									<NavLink to='/contactus' style={navLinkStyle}>
										Contact Us
									</NavLink>
									<NavLink to='/faqs' style={navLinkStyle}>
										FAQs
									</NavLink>
									<NavLink to='/login' className='btn btn-outline-light w-max m-2' style={buttonStyle}>
										Login
									</NavLink>
									<NavLink to='/register' className='btn btn-outline-light w-max m-2' style={buttonStyle}>
										Register
									</NavLink>
								</>
							)}
							{userDetails && userDetails?.userToken && (
								<NavLink to='/orders' style={navLinkStyle}>
									My Orders
								</NavLink>
							)}
							<NavLink to='/cart' className='btn btn-outline-light m-2' style={buttonStyle}>
								{`Cart(${cartElements?.length})`}
							</NavLink>
						</div>
					</div>
				</div>
				{window.innerWidth < 568 && <Search />}
			</nav>
		</header>
	);
};

export default Navbar;