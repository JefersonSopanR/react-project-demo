import { useState, useRef, useContext, useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useNavigate, Link } from 'react-router-dom'
import Login from './Components/Login'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Profile from './Components/Profile'
import Timer from './Components/Timer'
import Settings from './Components/Settings'
import './App.css'

const ProtectedComponents = ({children}) => {
	const {username} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token)
			navigate('/login')

	}, [username]);

	const token = localStorage.getItem('token');
	if (!token)
		return (<Navigate to={'/login'}/>)
	return (
		children
	)
}

const Components = () => {

	const navigate = useNavigate();
	const {Logout, len, language} = useContext(AuthContext);

	return (
		<>
			<nav>
				<button onClick={() => {navigate('/index')}} style={{background: 'lightblue'}}>{len[language].Profile}</button>
				<button onClick={() => {navigate('/index/timer')}} style={{background: 'lightblue'}}>{len[language].Timer}</button>
				<button onClick={() => {navigate('/index/settings')}} style={{background: 'lightblue'}}>{len[language].Settings}</button>
				<button onClick={() => {Logout()}} style={{background: 'red', color: 'black'}}>{len[language].Logout}</button>

			</nav>
			<Routes>
				<Route index element={<Profile/>}/>
				<Route path='timer' element={<Timer/>} />
				<Route path='settings' element={<Settings/>} />
			</Routes>
		</>
	)
}


const MainComponent = () => {
	return (
		<Routes>
			<Route path='login' element={<Login/>}/>
			<Route path='/index/*' element={
				<ProtectedComponents>
					<Components/>
				</ProtectedComponents>

			}/>

			<Route path='*' element={<Navigate to='login'/>}/>
		</Routes>

	)
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
		<BrowserRouter>
			<MainComponent/>
		</BrowserRouter>
	</AuthProvider>
  )
}

export default App
