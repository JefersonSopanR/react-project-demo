import {useNavigate} from 'react-router-dom'
import {useRef, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';

const Login = () => {

	const value = useRef();
	const {Login} = useContext(AuthContext);
	const navigate = useNavigate();

	const createUser = () => {
		console.log("creating User!");
		Login(value.current.value);
		value.current.value = '';
		console.log(localStorage.getItem('token'))
		navigate('/index')
	}


	return (
		<div>
			<input ref={value} onChange={(e) => {value.current.value = e.target.value}}></input>
			<button onClick={() => createUser()} style={{color: 'blue'}}>Enter</button>
		</div>	
	)
}

export default Login
