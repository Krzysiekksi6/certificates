import axios from 'axios';

export var loadCertificates =
	(params, callback) => async (dispatch, getState) => {
		var config = {
            url: '/certificates',
			params,
			headers: { authorization: getState().appState.token },
		};
		var result = await axios.request(config);
		callback(result.data);
	};

export var loadCertificate = (id, callback) => async (dispatch, getState) => {
	var config = {
		url: `/certificates/${id}`,
		data: {
			certificate: { id: id },
		},
		headers: { authorization: getState().appState.token },
	};
	var result = await axios.request(config);
	callback(result.data);
};

export var saveCertificate =
	(resource, callback) => async (dispatch, getState) => {
		var config = {
			url: resource.id ? `/certificates/${resource.id}` : '/certificates',
			method: resource.id ? 'PUT' : 'POST',
			data: {
				certificate: resource,
			},
			headers: { authorization: getState().appState.token },
		};
		var result = await axios.request(config);
		callback(result.data);
	};

export var deleteCertificate = (id, callback) => async (dispatch, getState) => {
	var config = {
		url: `/certificates/${id}`,
		method: 'DELETE',
		headers: { authorization: getState().appState.token },
	};
	await axios.request(config);
	callback();
};
