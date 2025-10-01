import { createContext, useState, useRef, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {

	const [username, setUsername] = useState(localStorage.getItem('token'));
	const [language, setLanguage] = useState('en');

	const len = {
		en: {
			Profile: 'Profile',
			Timer: 'Timer',
			Settings: 'Settings',
			Logout: 'Logout',

			//Profile:
			welcomeProfile: 'Welcome to the time of your life!',

			//Timer:
			welcomeTimer: 'This the Timer',
			startTimer: 'Start',
			stopTimer: 'Stop',
			continueTimer: 'Continue',
			clearTimer: 'Restart',
			clearLogsTimer: 'Clear All',
			ToptoBottonTimer: 'Top to Bottom',
			BottontoTopTimer: 'Bottom to Top',
			placeHolderAddThemeTimer: 'Add theme',

			//Settings
			welcomeSettings: 'This is the settings'

		},
		es: {
			Profile: 'Perfil',
			Timer: 'Temporizador',
			Settings: 'Ajustes',
			Logout: 'Salir',

			//Profile:
			welcomeProfile: '¡Bienvenido al momento de tu vida!',

			//Timer:
			welcomeTimer: 'Esto el Temporizador',
			startTimer: 'Inicio',
			stopTimer: 'Parar',
			continueTimer: 'Continuar',
			clearTimer: 'Reiniciar',
			clearLogsTimer: 'Limpiar todo',
			ToptoBottonTimer: 'De mayor a menor',
			BottontoTopTimer: 'De menor a mayor',
			placeHolderAddThemeTimer: 'Añade titulo',

			//Settings
			welcomeSettings: 'Esto son los ajustes'
		},
		jp: {
			Profile: 'プロフィール',
			Timer: 'タイマー',
			Settings: '設定',
			Logout: 'ログアウト',

			//Profile:
			welcomeProfile: 'あなたの人生の時間へようこそ！',

			//Timer:
			welcomeTimer: 'この ザ タイマー',
			startTimer: '開始',
			stopTimer: '停止',
			continueTimer: '続けて',
			clearTimer: '再起動します',
			clearLogsTimer: 'すべてクリアします',
			ToptoBottonTimer: '上から下へ',
			BottontoTopTimer: '下から上へ',
			placeHolderAddThemeTimer: 'テーマを追加',

			//Settings
			welcomeSettings: 'これが設定です'
		},
		// French (fr)
		fr: {
			Profile: 'Profil',
			Timer: 'Minuteur',
			Settings: 'Paramètres',
			Logout: 'Déconnexion',

			//Profile:
			welcomeProfile: 'Bienvenue dans le temps de votre vie !',

			//Timer:
			welcomeTimer: 'Ceci est le Minuteur',
			startTimer: 'Démarrer',
			stopTimer: 'Arrêter',
			continueTimer: 'Continuer',
			clearTimer: 'Redémarrer',
			clearLogsTimer: 'Effacer tout',
			ToptoBottonTimer: 'Du haut vers le bas',
			BottontoTopTimer: 'Du bas vers le haut',
			placeHolderAddThemeTimer: 'Ajouter un thème',

			//Settings
			welcomeSettings: 'Ce sont les paramètres'
		},

		// Portuguese (pt-BR)
		pt: {
			Profile: 'Perfil',
			Timer: 'Temporizador',
			Settings: 'Configurações',
			Logout: 'Sair',

			//Profile:
			welcomeProfile: 'Bem-vindo ao tempo da sua vida!',

			//Timer:
			welcomeTimer: 'Este é o Temporizador',
			startTimer: 'Iniciar',
			stopTimer: 'Parar',
			continueTimer: 'Continuar',
			clearTimer: 'Reiniciar',
			clearLogsTimer: 'Limpar Tudo',
			ToptoBottonTimer: 'Do topo para baixo',
			BottontoTopTimer: 'De baixo para cima',
			placeHolderAddThemeTimer: 'Adicionar tema',

			//Settings
			welcomeSettings: 'Estas são as configurações'
		},

		// Arabic (ar)
		ar: {
			Profile: 'ملف التعريف',
			Timer: 'المؤقت',
			Settings: 'الإعدادات',
			Logout: 'تسجيل الخروج',

			//Profile:
			welcomeProfile: 'مرحبًا بكم في أفضل أوقات حياتكم!',

			//Timer:
			welcomeTimer: 'هذا هو المؤقت',
			startTimer: 'ابدأ',
			stopTimer: 'توقف',
			continueTimer: 'استمر',
			clearTimer: 'أعد التشغيل',
			clearLogsTimer: 'امسح الكل',
			ToptoBottonTimer: 'من الأعلى إلى الأسفل',
			BottontoTopTimer: 'من الأسفل إلى الأعلى',
			placeHolderAddThemeTimer: 'أضف موضوعًا',

			//Settings
			welcomeSettings: 'هذه هي الإعدادات'
		},

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

