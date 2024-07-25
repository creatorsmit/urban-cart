import React, { useEffect, useMemo, useState } from 'react';
import { get } from '../httpService';
import ProductCard from './ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import CustomPagination from '../components/Pagination';

const Products = () => {
	const [loading, setLoading] = useState(false);
	const [productsData, setProductsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const limitPerPage = 24;

	const totalElements = useMemo(() => {
		return productsData?.total || 20;
	}, [productsData]);

	const getProductsData = async (page) => {
		setLoading(true);
		const response = await get('/v1/product', null, {
			limit: 24,
			page: page,
		});

		if (response && response?.status === 200) {
			setProductsData(response?.data?.data);
		}

		setLoading(false);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		if (currentPage > 0) {
			getProductsData(currentPage);
		}
	}, [currentPage]);

	return loading ? (
		'Loading...'
	) : productsData?.data?.length > 0 ? (
		<>
			<Container>
				<Row>
					{productsData?.data?.map((product) => {
						return (
							<Col key={product._id} sm={6} md={4} lg={3} className='p-3'>
								<ProductCard product={product} />
							</Col>
						);
					})}
				</Row>
			</Container>
			{totalElements > limitPerPage && (
				<CustomPagination
					currentPage={currentPage}
					totalElements={totalElements}
					limitPerPage={limitPerPage}
					onPageChange={handlePageChange}
				/>
			)}
		</>
	) : (
		<>Not found</>
	);
};

export default Products;
