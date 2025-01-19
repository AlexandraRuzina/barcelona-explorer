import '../styles/CategoriesComponent.css';
import CategoryRowComponent from "./CategoryRowComponent";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchCategories} from "../api";

export default function CategoriesComponent() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories(); // API-Aufruf
                setCategories(data);
                console.log(categories)
            } catch (error) {
                console.error('Fehler beim Laden der Categories:', error);
            }
        };
        loadCategories();
    }, []);

    function addNew(){
        navigate(`/addCategory`)
    }

    return (
        <main className="categories-body">
            <h1>Categories</h1>
            <div className="table-container">
                <table className="tab-categories">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sights</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category, index) => (
                        <CategoryRowComponent
                            key={index}
                            index={index}
                            category={category.name}
                            count={category.count}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <button className="addNew" onClick={addNew}>Add New Category</button>
        </main>
    );
}
