import '../styles/CategoriesComponent.css';
import CategoryRowComponent from "./CategoryRowComponent";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchCategories} from "../api";

export default function CategoriesComponent() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async (forceRefresh = false) => {
            try {
                const cache = await caches.open("categories-cache-v1");

                if (forceRefresh) {
                    const data = await fetchCategories(); // API-Aufruf
                    setCategories(data);
                    await cache.put("/categories/allCategories", new Response(JSON.stringify(data), {
                        headers: { "Content-Type": "application/json" }
                    }));
                    return;
                }

                const cachedResponse = await cache.match("/categories/allCategories");

                if (cachedResponse) {
                    console.log("Kategorien aus Cache geladen");
                    const cachedData = await cachedResponse.json();
                    setCategories(cachedData);
                } else {
                    const data = await fetchCategories(); // API-Aufruf
                    setCategories(data);
                    await cache.put("/categories/allCategories", new Response(JSON.stringify(data), {
                        headers: { "Content-Type": "application/json" }
                    }))
                }
            } catch (error) {
                console.error('Fehler beim Laden der Categories:', error);
            }
        };

        // Event-Listener für Cache-Aktualisierung
        window.addEventListener('invalidate-categories-cache', () => loadCategories(true));

        // Initial laden
        loadCategories();

        return () => {
            window.removeEventListener('invalidate-categories-cache', () => loadCategories(true));
        };
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
