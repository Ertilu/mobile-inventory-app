const initState = {
	token: '',
	username: '',
	email: '',
	errMessage:'',
  message:'',
  isLogged: false,
  isLoading: false,
  isRejected: false,
  isFulfilled: false
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'LOGIN_USER_PENDING':
		case 'REGISTER_USER_PENDING':
			return {
				...state,
				isLogged: false,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,

			}
		case 'LOGIN_USER_REJECT':
		case 'REGISTER_USER_REJECT':
			return {
				...state,
				isLoading: false,
				isRejected: true,
				errMessage: action.payload.values.message
			}
		case 'LOGIN_USER_FULFILLED':
			return {
				...state,
				token: action.payload.data.token,
				name: action.payload.data.name,
				username: action.payload.data.username,
				email: action.payload.data.email,
				isLogged: true,
				isLoading: false,
				isFulfilled: true,
			}
		case 'REGISTER_USER_FULFILLED':
			return {
				...state,
				token: action.payload.values.token,
				name: action.payload.data.values.name,
				username: action.payload.data.values.username,
				email: action.payload.data.values.email,
				isLogged: true,
				isLoading: false,
				isFulfilled: true,
			}
		case 'LOGOUT_USER':
			return initState
		default:
			return state;
	}
}