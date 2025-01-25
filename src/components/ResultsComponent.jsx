import '../styles/ResultsComponent.css';
import { useLocation } from "react-router-dom";
import ContentComponent from "./ContentComponent";

function ResultsComponent() {
    const location = useLocation();
    const {answer} = location.state || {};

    return (
        <div>
            <h1 className="search-Results">Search Results</h1>
                <main className="content-result">
                    {answer.map((sight, index)  => (
                        <ContentComponent
                            key={index}
                            name={sight.name}
                            category={sight.category}
                            price={sight.price}
                            picture={sight.picture}
                            description={sight.description}
                        />
                    ))}
                </main>
        </div>
    );
}

export default ResultsComponent;


