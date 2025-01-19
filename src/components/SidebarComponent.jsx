import '../styles/SidebarComponent.css';
import {useEffect, useState} from "react";
import {fetchCategoriesDropDown, filterQuery} from "../api";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../AppContext";

export default function SidebarComponent() {
    const { sidebarStatus } = useAppContext();
    const navigate = useNavigate()
    const [answer, setAnswer] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Speichert die ausgewählte Kategorie
    const [selectedPrice, setSelectedPrice] = useState(50); // Speichert den ausgewählten Preis

    useEffect(() => {
        const loadSights = async () => {
            try {
                const data = await fetchCategoriesDropDown(); // API-Aufruf
                setCategories(data);
            } catch (error) {
                console.error('Fehler beim Laden der Kategorien:', error);
            }
        };
        loadSights();
    }, []);

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await filterQuery([selectedCategory, selectedPrice]);
            setAnswer(result);
            if (result.length > 0){
                navigate(`/results`, {state: {answer: result}});
            }else {
                navigate(`/notFound`)
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
        }
    };

    return (
        <aside className={`sidebar ${sidebarStatus ? 'active' : ''}`} id="sidebar">
            <h2>Find Your Activity</h2>
            <form className="filter-form" onSubmit={handleFilterSubmit}>
                <div className="filter-categorySide">
                    <label htmlFor="category-select">Choose a category:</label>
                    <select
                        id="category-select"
                        name="category"
                        value={selectedCategory} // Binden an den Zustand
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="All">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="slider-container">
                    <label htmlFor="price-range">Price:</label>
                    <input
                        type="range"
                        id="price-range"
                        min="0"
                        max="100"
                        value={selectedPrice} // Binden an den Zustand
                        step="1"
                        onChange={(e) => setSelectedPrice(e.target.value)} // Aktualisieren des Zustands
                    />
                    <span id="slider-value">{selectedPrice}</span> €
                </div>
                <button className="submit-button" type="submit">
                    Apply Filters
                </button>
            </form>
        </aside>
    );
}