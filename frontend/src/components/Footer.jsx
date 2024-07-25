import React from 'react';
import './footer.css'

const Footer = () => {
	return (
		<footer id='footer'>
			<div className='footer-newsletter'>
				{' '}
				<div className='container'>
					{' '}
					<div className='row'>
						<div className='col-lg-6'>
							<h4>Join Urban Cart and Unlock Special Deals!</h4>
							<p>
							   Join our Urban Cart community and be the first to know about exclusive deals and new arrivals!
							</p>{' '}
						</div>
						<div className='col-lg-6'>
							{' '}
							<form action='' method='post'>
								{' '}
								<input type='email' name='email' />
								<input type='submit' value='Subscribe' />{' '}
							</form>{' '}
						</div>{' '}
					</div>{' '}
				</div>{' '}
			</div>

			<div className='footer-top'>
				{' '}
				<div className='container'>
					{' '}
					<div className='row'>
						{' '}
						<div className='col-lg-3 col-md-6 footer-links'>
							<h4>Useful Links</h4>{' '}
							<ul>
								<li>
									<i className='bx bx-chevron-right'></i> <a href='#'>Home</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i> <a href='#'>About us</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i> <a href='#'>Services</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='#'>Terms of service</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='#'>Privacy policy</a>
								</li>
							</ul>{' '}
						</div>{' '}
						
						<div className='col-lg-3 col-md-6 footer-contact'>
							<h4>Contact Us</h4>
							<p>
								{' '}
								75 Watline Av. <br /> Mississaugua, ON L4Z 3E5
								<br /> Canada <br />
								<br /> <strong>Phone:</strong> +1 (905)-768-4576
								<br /> <strong>Email:</strong> shopurbancart@gmail.com
								<br />{' '}
							</p>{' '}
						</div>
						<div className='col-lg-3 col-md-6 footer-info'>
							<h3>About Urban Cart</h3>
							<p>
							Welcome to Urban Cart, your ultimate destination for curated lifestyle products that blend style, 
							quality, and affordability. Founded with a vision to make everyday living more exciting,
							Urban Cart offers a diverse range of items that cater to your needs and preferences.
							</p>

							<div className='social-links mt-3'>
								<a href='#' className='twitter'>
									<i className='bx bxl-twitter'></i>
								</a>
								<a href='#' className='facebook'>
									<i className='bx bxl-facebook'></i>
								</a>
								<a href='#' className='instagram'>
									<i className='bx bxl-instagram'></i>
								</a>
								<a href='#' className='linkedin'>
									<i className='bx bxl-linkedin'></i>
								</a>
							</div>
						</div>
					</div>{' '}
				</div>
			</div>

			<div className='container'>
				{' '}
				<div className='copyright'>
					{' '}
					&copy; Copyright{' '}
					<strong>
						<span>Urban Cart</span>
					</strong>
					. All Rights Reserved{' '}
				</div>{' '}
				<div className='credits'>
					{' '}
					Designed by <a href='#' className='text-white'>UnityStack Solutions</a>{' '}
				</div>{' '}
			</div>
		</footer>
	);
};

export default Footer;
