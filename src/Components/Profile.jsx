import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
const {username} = useContext(AuthContext)

	return (
		<div>
			<p>Hi {username}</p>
		</div>
	)
}

export default Profile
