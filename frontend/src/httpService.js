import axios from 'axios';

window.apiUrl = `http://localhost:4000`

const client = axios.create({
	baseURL: 'http://localhost:4000',
});

const getAxiosConfig = async (headers, params) => {
	const userToken = localStorage.getItem('userToken');
	let config = {};

	if (!headers) {
		headers = {};
	}

	if (userToken) {
		headers.authorization = 'Bearer ' + userToken;
	}

	config = {
		headers,
	};

	if (params) {
		config.params = params;
	}

	return config;
};

const get = async (url, headers, params) => {
	const config = await getAxiosConfig(headers, params);
	try {
		const response = await client.get(url, config);
		return response;
	} catch (error) {
		return {
			isError: true,
			status: error?.response?.status || 500,
			message: error.response.data,
		};
	}
};

const post = async (url, payload, headers, params) => {
	const config = await getAxiosConfig(headers, params);
	try {
		const response = await client.post(url, payload, config);
		return response;
	} catch (e) {
		return e.response;
	}
};

const put = async (url, payload, headers, params) => {
	const config = await getAxiosConfig(headers, params);
	try {
		const response = await client.put(url, payload, config);
		return response;
	} catch (error) {
		return {
			isError: true,
			status: error?.response?.status || 500,
			message: error.response.data,
		};
	}
};

const patch = async (url, payload, headers, params) => {
	const config = await getAxiosConfig(headers, params);
	try {
		const response = await client.patch(url, payload, config);
		return response;
	} catch (error) {
		return {
			isError: true,
			status: error?.response?.status || 500,
			message: error.response.data,
		};
	}
};

const delete0 = async (url, payload, headers, params) => {
	const config = await getAxiosConfig(headers, params);
	try {
		const response = await client.delete(url, config);
		return response;
	} catch (error) {
		return {
			isError: true,
			status: error?.response?.status || 500,
			message: error.response.data,
		};
	}
};

export { delete0, get, patch, post, put };
