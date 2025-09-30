import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
	const {language, setLanguage} = useContext(AuthContext);
	return (
		<div>
			<p>this is the Settings</p>
			<button onClick={() => setLanguage('en')}>EN</button>
			<button onClick={() => setLanguage('es')} >ES</button>
			<p>the language right now is {language}</p>
		</div>
	)
}

export default Settings
