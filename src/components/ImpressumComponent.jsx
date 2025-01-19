import '../styles/ImpressumComponent.css';

export default function ImpressumComponent(){
    return (
        <div className="impressum-container">
            <h1 className="impressum-heading">Legal Notice</h1>
            <section className="impressum-section">
                <h2>Developed by:</h2>
                <p>Alexandra Ruzina</p>
            </section>

            <section className="impressum-section">
                <h2>Contact</h2>
                <p>
                    E-Mail:{" "}
                    <div className="email">
                        Alexandra.Ruzina@Student.HTW-Berlin.de
                    </div>
                </p>
            </section>

            <section className="impressum-section">
                <h2>Adress: </h2>
                <div>Treskowallee 8,</div>
                <div>10318 Berlin</div>
                <div>Germany</div>
            </section>
        </div>
    );
}