import React from 'react';
import { Pagination } from 'react-bootstrap';
import './index.scss'

const CustomPagination = ({
	currentPage,
	totalElements,
	limitPerPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalElements / limitPerPage);

	const renderPageNumbers = () => {
		const pageNumbers = [];

		// Always show the first page
		pageNumbers.push(
			<Pagination.Item
				key={1}
				active={1 === currentPage}
				onClick={() => onPageChange(1)}
			>
				1
			</Pagination.Item>
		);

		// Calculate whether to show ellipses
		const showStartEllipsis = currentPage > 4;
		const showEndEllipsis = totalPages - currentPage > 3;

		// Show ellipsis if needed between the first page and the current page - 2
		if (showStartEllipsis) {
			pageNumbers.push(<Pagination.Ellipsis key='startEllipsis' />);
		}

		// Show up to 5 page numbers centered around the current page
		for (
			let i = Math.max(2, currentPage - 2);
			i <= Math.min(totalPages - 1, currentPage + 2);
			i++
		) {
			pageNumbers.push(
				<Pagination.Item
					key={i}
					active={i === currentPage}
					onClick={() => onPageChange(i)}
				>
					{i}
				</Pagination.Item>
			);
		}

		// Show ellipsis if needed between the current page + 2 and the last page
		if (showEndEllipsis) {
			pageNumbers.push(<Pagination.Ellipsis key='endEllipsis' />);
		}

		// Always show the last page
		if (totalPages > 1) {
			pageNumbers.push(
				<Pagination.Item
					key={totalPages}
					active={totalPages === currentPage}
					onClick={() => onPageChange(totalPages)}
				>
					{totalPages}
				</Pagination.Item>
			);
		}

		return pageNumbers;
	};

	return (
		<Pagination className='custom-pagination'>
			<Pagination.Prev
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
			/>
			{renderPageNumbers()}
			<Pagination.Next
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
			/>
		</Pagination>
	);
};

export default CustomPagination;
