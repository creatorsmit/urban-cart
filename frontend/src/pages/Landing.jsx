import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { useSetRecoilState } from 'recoil';
import { authSlice } from '../store';
import { useCartActions } from '../hooks/useCartActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import banner1 from "../../../public/images/Anuualsale.png"
import banner2 from "../../../public/images/Newoffers.png"
import banner3 from "../../../public/images/Newproducts.png"
import banner4 from "../../../public/images/shopnow.png"

const PromotionalBanner = () => (
	<div className="container mt-4">
	  <div className="row">
		<div className="col-12">
		  <Carousel>
			<Carousel.Item>
			  <div
				className="d-flex align-items-center justify-content-center"
				style={{
				  height: '500px',
				  backgroundImage: `url(${banner1})`,
				  backgroundSize: 'cover',
				  backgroundPosition: 'center',
				}}
			  >
				
			  </div>
			</Carousel.Item>
			<Carousel.Item>
			  <div
				className="d-flex align-items-center justify-content-center"
				style={{
				  height: '500px',
				  backgroundImage: `url(${banner2})`,
				  backgroundSize: 'cover',
				  backgroundPosition: 'center',
				}}
			  >
				
			  </div>
			</Carousel.Item>
			<Carousel.Item>
			  <div
				className="d-flex align-items-center justify-content-center"
				style={{
				  height: '500px',
				  backgroundImage: `url(${banner3})`,
				  backgroundSize: 'cover',
				  backgroundPosition: 'center',
				}}
			  >
				
			  </div>
			</Carousel.Item>
			<Carousel.Item>
			  <div
				className="d-flex align-items-center justify-content-center"
				style={{
				  height: '500px',
				  backgroundImage: `url(${banner4})`,
				  backgroundSize: 'cover',
				  backgroundPosition: 'center',
				}}
			  >
				
			  </div>
			</Carousel.Item>
		  </Carousel>
		</div>
	  </div>
	</div>
  );

const FeaturedProducts = () => (
  <div className="container mt-5">
    <h2 className="mb-4">Featured Products</h2>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {[1, 2, 3, 4].map((product) => (
        <div key={product} className="col">
          <div className="card h-100">
            <img src={`https://via.placeholder.com/300x200?text=Product ${product}`} className="card-img-top" alt={`Product ${product}`} />
            <div className="card-body">
              <h5 className="card-title">Product {product}</h5>
              <p className="card-text">This is a short product description.</p>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Categories = () => {
	const categories = [
	  { name: 'Electronics', image: 'https://via.placeholder.com/300x200?text=Electronics' },
	  { name: 'Clothing', image: 'https://via.placeholder.com/300x200?text=Clothing' },
	  { name: 'Home & Garden', image: 'https://via.placeholder.com/300x200?text=Home+%26+Garden' },
	];
  
	return (
	  <div className="container mt-5 mb-5">
		<h2 className="mb-4">Shop by Category</h2>
		<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
		  {categories.map((category) => (
			<div key={category.name} className="col">
			  <div className="card h-100">
				<img 
				  src={category.image} 
				  className="card-img-top img-fluid" 
				  alt={category.name}
				  style={{ objectFit: 'cover', height: '200px' }}
				/>
				<div className="card-body d-flex flex-column">
				  <h5 className="card-title">{category.name}</h5>
				  <p className="card-text">Explore our {category.name.toLowerCase()} collection.</p>
				  <a 
					href={`/category/${category.name.toLowerCase().replace(' & ', '-')}`} 
					className="btn btn-outline-primary mt-auto"
				  >
					View {category.name}
				  </a>
				</div>
			  </div>
			</div>
		  ))}
		</div>
	  </div>
	);
  };


const Landing = () => {
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
      <Navbar />
      <main className='flex-grow-1'>
        <PromotionalBanner />
        <FeaturedProducts />
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;