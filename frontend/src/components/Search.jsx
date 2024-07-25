import React, { useCallback, useEffect, useState } from 'react';
import { get } from '../httpService';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const Search = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState(null);
	const [searchData, setSearchData] = useState([]);

	const searchApi = useCallback(async (value) => {
		const response = await get('/v1/product', null, {
			search: value,
			page: 1,
			limit: 5,
		});

		if (response) {
			setSearchData(response?.data?.data?.data);
		}
	}, []);

	useEffect(() => {
		if (search) {
			searchApi(search);
		} else {
			setSearchData([]);
		}
	}, [search]);

	return (
		<div className='search-bar'>
			<input
				type='text'
				onChange={({ target }) => setSearch(target.value)}
				className='form-control d-flex'
				autoComplete='off'
				id='search'
				placeholder='Search...'
			/>
			{searchData?.length > 0 && (
				<div className='products-list'>
					<div className='d-flex flex-column p-2 mt-2 products-list-container'>
						{searchData?.map((product, index) => (
							<div
								key={`search-product-${index}`}
								className='list-item d-flex justify-content-between align-items-center'
								style={{ cursor: 'pointer' }}
								onClick={() => {
									navigate(`/product/${product?._id}`);
									setSearch('');
								}}
							>
								<div className='d-flex flex-row align-items-center'>
									<div className='product-image'>
										<img src={product?.images[0]?.url} />
									</div>

									<div className='d-flex flex-column'>
										<span>{product?.name}</span>
										<div className='d-flex flex-row align-items-center time-text'>
											<small style={{ color: 'green', fontWeight: '500' }}>
												${product?.price}
											</small>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
