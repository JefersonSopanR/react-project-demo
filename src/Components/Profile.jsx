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
  <div className="flex items-center justify-center min-h-[70vh] px-4">
    <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-3xl p-8 text-center overflow-hidden">

      {/* Decorative gradient ring */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20"></div>

      {/* Avatar */}
      <div className="relative flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
          👤
        </div>
      </div>

      {/* Greeting */}
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2 animate-fadeIn">
        {grettings}
      </h1>
      <h2 className="text-lg text-slate-600">
        {len[language].welcomeProfile}
      </h2>
    </div>
  </div>
)

}

export default Profile
