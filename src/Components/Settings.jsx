import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
	const {language, setLanguage, len} = useContext(AuthContext);
	return (
		<div>
			<p>{len[language].welcomeSettings}</p>
			<button onClick={() => setLanguage('en')}>EN</button>
			<button onClick={() => setLanguage('es')} >ES</button>
			<button onClick={() => setLanguage('jp')} >JP</button>
			<button onClick={() => setLanguage('fr')} >FR</button>
			<button onClick={() => setLanguage('pt')} >PT</button>
			<button onClick={() => setLanguage('ar')} >AR</button>
			<p>the language right now is {language}</p>
		</div>
	)
}

export default Settings
