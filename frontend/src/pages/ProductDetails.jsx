import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartActions } from '../hooks/useCartActions';
import { getProductDetails } from '../store/requestService';

const ProductDetails = () => {
	const { addItemToCart } = useCartActions();

	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [thumbnail, setThumbnail] = useState(product?.images[0]);

	const imagesArray = useMemo(() => {
		return product?.images?.filter(
			(item) => item?.public_id !== thumbnail?.public_id
		);
	}, [thumbnail]);

	const getDetails = useCallback(async (id) => {
		const res = await getProductDetails(id);
		if (res?.data) {
			setProduct(res?.data);
			setThumbnail(res?.data?.images[0]);
		} else {
			setProduct(null);
		}
	}, []);

	useEffect(() => {
		if (productId) {
			getDetails(productId);
		}
	}, [productId]);

	return product ? (
		<section className='py-5'>
			<div className='container'>
				<div className='row gx-5'>
					<aside className='col-lg-6'>
						<div className='border rounded-4 mb-3 d-flex justify-content-center'>
							<a
								data-fslightbox='mygalley'
								className='rounded-4'
								target='_blank'
								data-type='image'
								href={thumbnail?.url}
							>
								<img
									style={{
										maxWidth: '100%',
										maxHeight: '100vh',
										margin: 'auto',
									}}
									className='rounded-4 fit'
									src={thumbnail?.url}
									alt='Product'
								/>
							</a>
						</div>
						<div className='d-flex justify-content-center mb-3'>
							{imagesArray?.map((item, index) => {
								return (
									<div
										key={`thumb-${index}`}
										data-fslightbox='mygalley'
										className='border mx-1 rounded-2'
										data-type='image'
										onClick={() => setThumbnail(item)}
									>
										<img
											width='60'
											height='60'
											className='rounded-2'
											src={item?.url}
											alt='Thumbnail 1'
										/>
									</div>
								);
							})}
						</div>
					</aside>
					<main className='col-lg-6'>
						<div className='ps-lg-3'>
							<h4 className='title text-dark'>{product?.name}</h4>
							<div className='d-flex flex-row my-3'>
								<div className='text-warning mb-1 me-2'>
									<i className='fa fa-star'></i>
									<i className='fa fa-star'></i>
									<i className='fa fa-star'></i>
									<i className='fa fa-star'></i>
									<i className='fas fa-star-half-alt'></i>
									<span className='ms-1'>{product?.ratings}</span>
								</div>
								{product?.stock > 0 && (
									<span className='text-success ms-2'>{`In stock(${product?.stock})`}</span>
								)}
							</div>

							<div className='mb-3'>
								<span className='h5'>${product?.price}</span>
							</div>

							<p>{product?.description}</p>

							<div className='row mt-2'>
								<dt className='col-3'>Category</dt>
								<dd className='col-9'>{product?.category}</dd>

								<dt className='col-3'>Brand</dt>
								<dd className='col-9'>{product?.seller}</dd>
							</div>

							<hr />
							<div
								href='#'
								className='btn btn-primary shadow-0'
								onClick={() => addItemToCart(product)}
							>
								<i className='me-1 fa fa-shopping-basket'></i> Add to cart
							</div>
						</div>
					</main>
				</div>
			</div>
		</section>
	) : (
		<>No details found</>
	);
};

export default ProductDetails;
