import { useState } from 'react'
import '../styles/LoginCompotent.css';
import {useNavigate} from "react-router-dom";
import { useAppContext } from "../AppContext";

export default function LoginComponent(){
    const { login } = useAppContext();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    function signUp(){
        navigate("/signUp");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await login([username, password]);
            if (result.success){
                navigate(`/`)
            }
            else{
                setErrorMessage(result.mes)
            }

        } catch (error) {
            console.error("Error during registration:", error);
        }

    };

    return (
        <div className="bodyLogin">
            <form onSubmit={handleSubmit}>
                <h2 className="hLogin">Login</h2>
                <div>
                    <label htmlFor="username" className="LoginLabel">Username:</label>
                    <input type="text"
                           id="text"
                           className="LoginInput"
                           required
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password"  className="LoginLabel">Password:</label>
                    <input type="password"
                           id="password"
                           className="LoginInput"
                           required
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {errorMessage && (
                    <p className="ErrorMessage">{errorMessage}</p>
                )}
                <button className="LoginBtn" type="submit">Login</button>
                <div className="newKonto" onClick={signUp}>Don't have an account yet?</div>
            </form>
        </div>

    )
}