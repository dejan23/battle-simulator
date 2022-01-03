import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:5000/api';

axiosClient.defaults.headers = { 'Content-Type': 'application/json' };

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

export function getRequest(URL) {
	return axiosClient
		.get(`${URL}`)
		.then((response) => response)
		.catch((error) => error);
}

export function postRequest(URL, payload) {
	return axiosClient
		.post(`${URL}`, payload)
		.then((response) => response)
		.catch((error) => error);
}

export function patchRequest(URL, payload) {
	return axiosClient
		.patch(`${URL}`, payload)
		.then((response) => response)
		.catch((error) => error);
}

export function deleteRequest(URL) {
	return axiosClient
		.delete(`${URL}`)
		.then((response) => response)
		.catch((error) => error);
}
