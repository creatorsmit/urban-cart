import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { delete0, get, post } from '../httpService';
import { cartDetails, cartItems } from '../store';

export const useCartActions = () => {
	const setCartItems = useSetRecoilState(cartItems);
	const currentCartItems = useRecoilValue(cartItems);
	const [cartDetail, setCartDetail] = useRecoilState(cartDetails);

	const handleCartDetails = (data) => {
		const { cartItems, _id, tax, subtotal } = data || {};

		const tax_amount = Number(tax).toFixed(2);
		const sub_total = Number(subtotal).toFixed(2);
		const item_count = Number(
			cartItems.reduce((acc, item) => acc + item.quantity, 0)
		);
		const total_amount =
			(parseFloat(sub_total) + parseFloat(tax_amount) + cartDetail?.shipping).toFixed(2);

		setCartItems(cartItems);
		setCartDetail({
			...cartDetail,
			subtotal: sub_total,
			itemCount: item_count,
			tax: tax_amount,
			cart_id: _id,
			cartTotal: total_amount,
		});
	};

	const fetchCartItems = useCallback(async () => {
		try {
			const cartResponse = await get('/v1/cart');
			if (!cartResponse.isError) {
				handleCartDetails(cartResponse?.data?.data);
			} else {
				console.error('Error fetching cart items:', cartResponse.message);
			}
		} catch (error) {
			console.error('Error fetching cart items:', error);
		}
	}, [setCartItems]);

	const addItemToCart = async (product) => {
		const { _id: productId } = product || {};
		const productIndex = currentCartItems?.findIndex(
			(item) => item.config._id === productId
		);
		const currentProduct =
			productIndex !== -1 ? currentCartItems[productIndex] : null;

		let quantity = currentProduct?.quantity ? currentProduct.quantity + 1 : 1;

		try {
			await post('/v1/cart', { quantity, product_id: productId });

			const cartResponse = await get('/v1/cart');
			if (!cartResponse.isError) {
				handleCartDetails(cartResponse?.data?.data);
			} else {
				console.error('Error fetching cart items:', cartResponse.message);
				// Handle error accordingly
			}
		} catch (error) {
			console.error('Error adding item to cart:', error);
			// Handle error accordingly
		}
	};

	const removeItemFromCart = async (product) => {
		const { _id: productId } = product || {};
		const productIndex = currentCartItems.findIndex(
			(item) => item.config._id === productId
		);
		const currentProduct =
			productIndex !== -1 ? currentCartItems[productIndex] : null;

		if (!currentProduct) return;

		let quantity = currentProduct.quantity - 1;

		try {
			if (quantity === 0) {
				await delete0(`/v1/cart/${productId}`);
			} else {
				await post('/v1/cart', { quantity, product_id: productId });
			}

			const cartResponse = await get('/v1/cart');
			if (!cartResponse.isError) {
				handleCartDetails(cartResponse?.data?.data);
			} else {
				console.error('Error fetching cart items:', cartResponse.message);
				// Handle error accordingly
			}
		} catch (error) {
			console.error('Error removing item from cart:', error);
			// Handle error accordingly
		}
	};

	return { fetchCartItems, addItemToCart, removeItemFromCart };
};
