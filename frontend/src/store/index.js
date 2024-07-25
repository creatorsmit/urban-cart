import { atom, selector } from 'recoil';
import { post } from '../httpService';
// import { get as getRequest } from '../httpService';

export const authSlice = atom({
	key: 'authSlice',
	default: {},
});

export const cartItems = atom({
	key: 'cartItems',
	default: [],
});

export const cartDetails = atom({
	key: '',
	default: {
		cart_id: '',
		subtotal: 0,
		cartTotal: 0,
		tax: 0,
		shipping: Math.floor(Math.random() * (40 - 10 + 1)) + 10,
		itemCount: 0
	}
})