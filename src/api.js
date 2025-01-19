
const API_URL = 'https://wt-ws24-backend.onrender.com/api';

export const fetchSights = async () => {
    try {
        const response = await fetch(`${API_URL}/sights/allSights`);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Sights');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Fehler:', error);
        throw error; // Fehler weitergeben
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories/allCategories`);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Sights');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Fehler:', error);
        throw error; // Fehler weitergeben
    }
};

export const fetchCategoriesDropDown = async () => {
    try {
        const response = await fetch(`${API_URL}/categories/categoriesDropDown`);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Sights');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Fehler:', error);
        throw error; // Fehler weitergeben
    }
};

export const searchQuery = async (query) => {
    try {
        const response = await fetch(`${API_URL}/sights/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const result = await response.json();
            return result; // Das Ergebnis zurückgeben
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error; // Fehler weitergeben
    }
};

export const filterQuery = async (query) => {
    try {
        const [category, price] = query; // Array entpacken (1. Wert: Kategorie, 2. Wert: Preis)

        const response = await fetch(`${API_URL}/sights/filter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category, // Kategorie an die API senden
                price     // Preis an die API senden
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
};

export const addSight = async (query) => {
    try {
        const [name,price, selectedCategory, picture, description] = query; // Array entpacken (1. Wert: Kategorie, 2. Wert: Preis)

        const response = await fetch(`${API_URL}/sights/addSight`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                selectedCategory,
                picture,
                description
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
};

export const updateSight = async (query) => {
    try {
        const [name, price, category, picture, description, sight] = query;

        const response = await fetch(`${API_URL}/sights/updateSight`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                category,
                picture,
                description,
                sight
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
};

export const deleteSight = async (name) => {
    try {
        const response = await fetch(`${API_URL}/sights/deleteSight`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            const result = await response.json();
            return result; // Das Ergebnis zurückgeben
        } else {
            console.error("Fehler beim Senden der Anfrage");
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error; // Fehler weitergeben
    }
};

export const addCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/categories/addCategory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({category}),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error; // Fehler weitergeben
    }
};

export const updateCategory = async (query) => {
    try {
        const [category, old] = query;
        const response = await fetch(`${API_URL}/categories/updateCategory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category,
                old,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error; // Fehler weitergeben
    }
};

export const deleteCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/categories/deleteCategory`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category }),
        });

        if (response.ok) {
            const result = await response.json();
            return result; // Das Ergebnis zurückgeben
        } else {
            console.error("Fehler beim Senden der Anfrage");
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error; // Fehler weitergeben
    }
};

export const addUser = async (query) => {
    try {
        const [username, email, password] = query;

        const response = await fetch(`${API_URL}/user/addUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
}

export const loginUser = async (query) => {
    try {
        const [username, password] = query;

        const response = await fetch(`${API_URL}/user/loginUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
}

export const fetchVisitedSpots = async (query) => {
    try {
        const response = await fetch(`${API_URL}/user/visited`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
};

export const fetchSpotsDropDown = async () => {
    try {
        const response = await fetch(`${API_URL}/user/spots`);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Sights');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Fehler:', error);
        throw error; // Fehler weitergeben
    }
};

export const addVisitedSpot = async (query) => {
    try {
        const [selectedSpot, username] = query; // Array entpacken (1. Wert: Kategorie, 2. Wert: Preis)

        const response = await fetch(`${API_URL}/user/addVisitedSpot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selectedSpot,
                username
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
};

export const deleteVisited = async (query) => {
    try {
        const [selectedSpot, username] = query;

        const response = await fetch(`${API_URL}/user/deleteVisitedSpot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selectedSpot,
                username
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error("Fehler beim Senden der Anfrage");
            return [];
        }
    } catch (error) {
        console.error("Fehler:", error);
        throw error;
    }
};
