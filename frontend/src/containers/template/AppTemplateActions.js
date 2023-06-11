export const LOGOUT = 'LOGOUT';
export const DISMISS_ALERT = 'DISMISS_ALERT';
export const TOGGLE_TERMS_MODAL = 'TOGGLE_TERMS_MODAL';

export const logout = () => {
	return {
		type: LOGOUT,
	};
};

export const dismiss = (alert) => {
	return {
		type: DISMISS_ALERT,
		alert,
	};
};

export const toggleTermsModal = () => ({
	type: TOGGLE_TERMS_MODAL,
});
