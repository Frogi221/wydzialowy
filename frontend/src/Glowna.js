import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importuj style Bootstrap
import './App.css'; // Importuj niestandardowe style CSS

function App() {
  return (
    <div className="background-image  justify-content-center align-items-center"> {/* Wyśrodkuj zawartość */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand mx-2" href="/">MotoSerwis</a> {/* Dodaj klasę mx-2 */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Strona główna</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cost">Cennik</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">O nas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Kontakt</a>
            </li>
          </ul>
        </div>
        <div className="ml-2"> {/* Dodaj klasę ml-2 */}
          <button className="btn btn-light">Zaloguj się</button>
        </div>
      </nav>
    </div>
  );
}

export default App;
