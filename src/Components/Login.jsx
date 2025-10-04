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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 px-4">
    <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Login</h1>

      <input
        ref={value}
        onChange={(e) => { value.current.value = e.target.value }}
        type="text"
        placeholder="Enter your username"
        className="w-full px-4 py-2 mb-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />

      <button
        onClick={() => createUser()}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow font-medium transition transform hover:-translate-y-0.5 hover:shadow-md"
      >
        Enter
      </button>
    </div>
  </div>
)


}

export default Login
