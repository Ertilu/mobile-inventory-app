import axios from 'axios';
const api = 'http://192.168.43.24:8000'
export const loginUser = user => {
	return {
		type: 'LOGIN_USER',
		payload: axios.post(api+'/user/login', user)
	}
}

export const registerUser = user => {
	return {
		type: 'REGISTER_USER',
		payload: axios.post(api+'/user/register', user)
	}
}

export const logoutUser = () => {
	return {
		type: 'LOGOUT_USER'
	}
}