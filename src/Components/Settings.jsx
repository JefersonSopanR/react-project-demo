import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
	const {language, setLanguage, len} = useContext(AuthContext);
	return (
  <div className="flex justify-center px-4">
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center">
      
      {/* Heading */}
      <p className="text-lg font-semibold text-slate-700 mb-6">
        {len[language].welcomeSettings}
      </p>

      {/* Language Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 rounded-lg shadow-sm font-medium transition ${
            language === "en"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`px-4 py-2 rounded-lg shadow-sm font-medium transition ${
            language === "es"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage("jp")}
          className={`px-4 py-2 rounded-lg shadow-sm font-medium transition ${
            language === "jp"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          JP
        </button>
        <button
          onClick={() => setLanguage("fr")}
          className={`px-4 py-2 rounded-lg shadow-sm font-medium transition ${
            language === "fr"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLanguage("pt")}
          className={`px-4 py-2 rounded-lg shadow-sm font-medium transition ${
            language === "pt"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          PT
        </button>
        <button
          onClick={() => setLanguage("ar")}
          className={`px-4 py-2 rounded-lg shadow-sm font-medium transition ${
            language === "ar"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          AR
        </button>
      </div>

      {/* Current Language */}
      <p className="text-sm text-slate-600">
        {`The language right now is `}
        <span className="font-semibold text-blue-600 uppercase">
          {language}
        </span>
      </p>
    </div>
  </div>
)

}

export default Settings
