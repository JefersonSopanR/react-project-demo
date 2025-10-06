import { useState, useRef, useContext, useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useNavigate, Link } from 'react-router-dom'
import Login from './Components/Login'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Profile from './Components/Profile'
import Timer from './Components/Timer'
import Settings from './Components/Settings'
import Wordle from './Components/Wordle'
import { TimerContextProvider } from './context/TimerContext'
import { WordleContextProvider } from './context/WordleContext'
import './main.css'

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
	<div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex flex-col items-center py-8 px-4">
		<div className="w-full max-w-4xl">
		{/* Nav */}
			<nav className="sticky top-4 z-10 flex flex-wrap gap-3 justify-center bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-4">
				<button
					onClick={() => navigate('/index')}
					className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm font-medium transition transform hover:-translate-y-0.5 hover:shadow-md">
					{len[language].Profile}
				</button>
				<button
					onClick={() => navigate('/index/timer')}
					className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm font-medium transition transform hover:-translate-y-0.5 hover:shadow-md">
					{len[language].Timer}
				</button>
				<button
					onClick={() => navigate('/index/wordle')}
					className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm font-medium transition transform hover:-translate-y-0.5 hover:shadow-md">
					{len[language].Wordle}
				</button>
				<button
					onClick={() => navigate('/index/settings')}
					className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm font-medium transition transform hover:-translate-y-0.5 hover:shadow-md">
					{len[language].Settings}
				</button>
				<button
					onClick={() => Logout()}
					className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm font-medium transition transform hover:-translate-y-0.5 hover:shadow-md">
					{len[language].Logout}
				</button>
			</nav>

			{/* Content */}
			<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 mt-6 transition">
				<Routes>
				<Route index element={<Profile />} />
				<Route path="timer" element={<Timer />} />
				<Route path="settings" element={<Settings />} />
				<Route path="wordle" element={<Wordle />} />
				</Routes>
			</div>
		</div>
	</div>
)
}


const MainComponent = () => {
	return (
		<Routes>
			<Route path='login' element={<Login/>}/>
			<Route path='/index/*' element={
				<ProtectedComponents>
					<TimerContextProvider>
					<WordleContextProvider>
						<Components/>
					</WordleContextProvider>
					</TimerContextProvider>
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
