import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
const {username, len, language} = useContext(AuthContext)
let grettings = '';

if (language === 'es') grettings = `Hola ${username}!`
else if (language === 'en') grettings = `Hi ${username}!`
else if (language === 'jp') grettings = `やあ ${username}!`
else if (language === 'fr') grettings = `Bonjour ${username}!`;
else if (language === 'pt') grettings = `Olá ${username}!`;
else if (language === 'ar') grettings = `مرحبا ${username}!`;
else {
  // Default to English
  grettings = `Hi ${username}!`;
}

	return (
		<div>
			<h1>{grettings}</h1>
			<h2> {len[language].welcomeProfile}</h2>
		</div>
	)
}

export default Profile
