import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    addVisitedSpot,
    deleteVisited,
    fetchSpotsDropDown,
    fetchVisitedSpots
} from "../api";
import {useAppContext} from "../AppContext";
import '../styles/TravelBlogComponent.css';

export default function TravelBlogComponent() {
    const navigate = useNavigate();
    const [visited, setVisited] = useState([]);
    const [spots, setSpots] = useState([]);
    const [selectedSpot, setSelectedSpot] = useState('All');
    const { username } = useAppContext();

    useEffect(() => {
        const loadVisitedSpots = async () => {
            try {
                const data = await fetchVisitedSpots(username);
                const spots = data.rows.map(row => row.Spot); // Daten aus "rows" extrahieren
                setVisited(spots); // Zustand aktualisieren
            } catch (error) {
                console.error('Fehler beim Laden der besuchten Plätze:', error);
            }
        };

        const loadSights = async () => {
            try {
                const data = await fetchSpotsDropDown(); // API-Aufruf
                setSpots(data);
            } catch (error) {
                console.error('Fehler beim Laden der Kategorien:', error);
            }
        };

        if (username) {  // Sicherstellen, dass der username vorhanden ist, bevor der API-Aufruf gemacht wird
            loadVisitedSpots();
            loadSights();
        }
    }, [username]);  // username als Abhängigkeit hinzufügen

    const handleSpotSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await addVisitedSpot([selectedSpot, username]);
            setVisited((prevVisited) => [...prevVisited, selectedSpot]);
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
        }
    };

    const alreadyVisited = async (spot) => {
        setVisited((prevVisited) => prevVisited.filter((v) => v !== spot));
        try {
            const result = await deleteVisited([spot, username]);
        } catch (error) {
            console.error("Fehler beim Löschen des Spots:", error);
        }
    };

    return (
        <main className="VisitTableMain">
            <div className="abstandHeader">
                <div className="table-form-container">
                    <table className="VisitTable">
                        <thead>
                        <tr>
                            <th>Places to Visit</th>
                            <th>Visited</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visited.map((spot, index) => (
                            <tr key={index}>
                                <td>{spot}</td>
                                <td>
                                    <button
                                        className="hackenbtn"
                                        onClick={() => alreadyVisited(spot)} // Übergibt den spezifischen Spot
                                    >
                                        ✓
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <form className="select-spot" onSubmit={handleSpotSubmit}>
                        <div className="sightsDropdown">
                            <select
                                id="spot-select"
                                name="spot"
                                value={selectedSpot}
                                onChange={(e) => setSelectedSpot(e.target.value)}
                            >
                                <option value="All">Add Spot</option>
                                {spots.map((spot, index) => (
                                    <option key={index} value={spot.name}>
                                        {spot.name}
                                    </option>
                                ))}
                            </select>
                            <button className="check-button-travel">✓</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
