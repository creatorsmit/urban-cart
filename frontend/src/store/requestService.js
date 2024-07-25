import { get } from '../httpService';

export const getProductDetails = async (id) => {
	const response = await get(`/v1/product/${id}`);

	if (response && response.status === 200) {
		return response.data;
	} else {
		console.error(response);
	}
};
