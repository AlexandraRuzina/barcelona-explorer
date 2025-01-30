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
    const [selectedSpot, setSelectedSpot] = useState('');
    const { username } = useAppContext();

    useEffect(() => {
        const loadVisitedSpots = async (forceRefresh = false) => {
            try {
                const cache = await caches.open("visited-spots-cache-v1");

                if (forceRefresh) {
                    // API-Aufruf, um Datenbank erneut abzufragen
                    const data = await fetchVisitedSpots(username); // API-Aufruf
                    const spots = data.rows.map((row) => row.Spot);
                    setVisited(spots);

                    // Cache aktualisieren
                    await cache.put(
                        "/user/visited",
                        new Response(JSON.stringify(spots), {
                            headers: { "Content-Type": "application/json" },
                        })
                    );
                    return;
                }

                // Prüfen, ob Daten im Cache vorhanden sind
                const cachedResponse = await cache.match("/user/visited");

                if (cachedResponse) {
                    console.log("Visited Spots aus Cache geladen");
                    const cachedData = await cachedResponse.json();
                    setVisited(cachedData);
                } else {
                    // Daten aus der API laden und im Cache speichern
                    const data = await fetchVisitedSpots(username);
                    const spots = data.rows.map((row) => row.Spot);
                    setVisited(spots);

                    // Cache aktualisieren
                    await cache.put(
                        "/user/visited",
                        new Response(JSON.stringify(spots), {
                            headers: { "Content-Type": "application/json" },
                        })
                    );
                }
            } catch (error) {
                console.error("Fehler beim Laden der besuchten Plätze:", error);
            }
        };

        const loadSights = async () => {
            try {
                const data = await fetchSpotsDropDown(); // API-Aufruf
                setSpots(data); // Direkt Zustand aktualisieren
            } catch (error) {
                console.error("Fehler beim Laden der Kategorien:", error);
            }
        };

        // Event-Listener für Cache-Aktualisierung
        const handleInvalidateCache = () => {
            loadVisitedSpots(true);
        };

        // Event-Listener hinzufügen
        window.addEventListener("invalidate-visited-spots-cache", handleInvalidateCache);

        // Initial laden
        if (username) {
            loadVisitedSpots(); // Mit Cache-Unterstützung
            loadSights();       // Ohne Cache-Unterstützung
        }

        // Cleanup beim Entfernen des Components
        return () => {
            window.removeEventListener("invalidate-visited-spots-cache", handleInvalidateCache);
        };
    }, [username]);



    const handleSpotSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await addVisitedSpot([selectedSpot, username]);
            setVisited((prevVisited) => [...prevVisited, selectedSpot]);
            window.dispatchEvent(new Event('invalidate-visited-spots-cache'));
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
        }
    };

    const alreadyVisited = async (spot) => {
        setVisited((prevVisited) => prevVisited.filter((v) => v !== spot));
        try {
            const result = await deleteVisited([spot, username]);
            window.dispatchEvent(new Event('invalidate-visited-spots-cache'));
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
                        {visited.length === 0 ? (
                            <tr>
                                <td colSpan="2">No Entries</td>
                            </tr>
                        ) : (
                            visited.map((spot, index) => (
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
                            ))
                        )}
                        </tbody>
                    </table>
                    <form className="select-spot" onSubmit={handleSpotSubmit}>
                        <div className="sightsDropdown">
                            <select
                                id="spot-select"
                                name="spot"
                                required
                                value={selectedSpot}
                                onChange={(e) => setSelectedSpot(e.target.value)}
                            >
                                <option value="" disabled>Add Spot</option>
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
