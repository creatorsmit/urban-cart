// ProductCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartActions } from '../hooks/useCartActions';

const ProductCard = ({ product = {} }) => {
	const navigate = useNavigate();
	const { addItemToCart } = useCartActions();

	return (
		<div
			className='card text-center h-100'
			key={product._id}
			onClick={() => navigate(`/product/${product?._id}`)}
		>
			<img
				className='card-img-top p-3'
				src={product?.images[0]?.url}
				alt='Card'
				height={300}
			/>
			<div className='card-body'>
				<h5 className='card-title'>{product?.name.substring(0, 12)}...</h5>
				<p className='card-text'>{product?.description.substring(0, 90)}...</p>
			</div>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item lead'>$ {product.price}</li>
			</ul>
			<div className='card-body'>
				<Link to={'/product/' + product._id} className='btn btn-dark m-1'>
					Buy Now
				</Link>
				<button
					className='btn btn-dark m-1'
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						addItemToCart(product);
					}}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
