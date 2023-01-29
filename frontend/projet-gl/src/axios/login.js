import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
export const useGoogleauth = () => {
	const { dispatch } = useAuthContext()
	const navigate = useNavigate();
	
	const login = async (accesstoken) => {
	axios
		.post('http://127.0.0.1:8000/login/google/', {
			auth_token: accesstoken,
			backend: 'google',
			grant_type: 'convert_token',
			client_id: '28799489235-i6dht8pfcfratg2daufchfhcfokge8lo.apps.googleusercontent.com',
			client_secret:
				'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',
		})
		.then((res) => {
			console.log(res)

			localStorage.setItem('user', JSON.stringify(res))
			dispatch({type: 'LOGIN', payload: res})
	  
			
			navigate("/");
	
		})
};
return {login}
}