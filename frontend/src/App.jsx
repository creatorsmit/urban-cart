import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { Home, Landing, Login, Register } from './pages';
import Cart from './pages/Cart';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CartItems from './pages/CartItems';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Aboutus from './pages/Aboutus';
import TermsofServices from './pages/TermsofServices';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import ContactUs from './pages/ContactUs.jsx';
 import FAQs from './pages/FAQs';


const App = () => {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Routes>
					<Route path='/' element={<Home />}>
						<Route index element={<Landing />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/cart' element={<Cart />}>
							<Route index element={<CartItems />} />
							<Route path='checkout' element={<Checkout />} />
						</Route>
						<Route path='/orders' element={<Orders />} />

						<Route path='/products' element={<Products />} />
						<Route path='/product/:productId' element={<ProductDetails />} />
						<Route path='/aboutus' element={<Aboutus />} />
						<Route path='/termsofservices' element={<TermsofServices />} />
						<Route path='/privacypolicy' element={<PrivacyPolicy />} />
						<Route path='/contactus' element={<ContactUs />} />
						<Route path="/faqs" element={<FAQs />} />
						
					</Route>
				</Routes>
			</RecoilRoot>
		</BrowserRouter>
	);
};

export default App;
