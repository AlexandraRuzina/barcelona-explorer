import {createContext, useState, useContext, useEffect} from "react";
import {loginUser} from "./api";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }) {
    const [sidebarStatus, setSidebarStatus] = useState(false)
    const[isAuthenticated, setAuthenticated] = useState(false)
    const[username, setUsername] = useState(null)
    const [categoriesTable, setCategoriesTable] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sights, setSights] = useState([]);
    const valueToBeShared = {isAuthenticated, login, logout, username, sidebarStatus, setSidebarStatus, categories, setCategories, categoriesTable, setCategoriesTable,  deleteCatDropDown, updateCatDropDown, addCatDropDown, sights, setSights, updateCatTable}

    function deleteCatDropDown(catName) {
        setCategories((prevCategories) =>
            prevCategories.filter((category) => category.name !== catName)
        );
    }

    function updateCatDropDown(oldName, newName) {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.name === oldName ? { ...category, name: newName } : category
            )
        );

    }

    function updateCatTable(oldName, newName) {
        setCategoriesTable((prevCategories) =>
            prevCategories.map((category) =>
                category.name === oldName ? { ...category, name: newName } : category
            )
        );

    }

    function addCatDropDown(newCategory) {
        setCategories((prevCategories) =>
            [...prevCategories, { name: newCategory }]
        );
    }

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
