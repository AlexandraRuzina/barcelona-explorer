import { createContext, useState, useContext } from "react";
import { loginUser} from "./api";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }) {
    const [sidebarStatus, setSidebarStatus] = useState(false)
    const[isAuthenticated, setAuthenticated] = useState(false)
    const[username, setUsername] = useState(null)
    const valueToBeShared = {isAuthenticated, login, logout, username, sidebarStatus, setSidebarStatus}

    async function login(loginData){
        try{
            const [username, password] = loginData;
            const response = await loginUser(loginData)
            if (response.success) {
                setAuthenticated(true);
                setUsername(username);
                return {success: true, mes: ""};
            } else {
                return {success: false, mes: response.message};
            }
        } catch (error) {
            console.error("Fehler beim Login:", error);
            return false;
        }
    }

    function logout(){
        setAuthenticated(false)
        setUsername(null)
    }

    return (
        <AppContext.Provider value={valueToBeShared}>
            {children}
        </AppContext.Provider>
    );
}
