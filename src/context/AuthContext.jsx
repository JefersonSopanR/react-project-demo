import { createContext, useState, useRef, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {

	const [username, setUsername] = useState('');
	const [language, setLanguage] = useState('en');
	const len = {
		en: {
			Profile: 'Profile',
			Timer: 'Timer',
			Settings: 'Settings',
			Logout: 'Logout',
		},
		es: {
			Profile: 'Perfil',
			Timer: 'Temporizador',
			Settings: 'Ajustes',
			Logout: 'Salir'
		}
	}

	

	const Login = (name) => {
		setUsername(name);
		localStorage.setItem('token', name);
	}

	const Logout = () => {
		localStorage.removeItem('token');
		setUsername('');
		console.log("in logout!!!")
	}


	return (
		<AuthContext.Provider value={{username, setUsername, Login, Logout, len, language, setLanguage}}>
			{children}
		</AuthContext.Provider>
	)
}

