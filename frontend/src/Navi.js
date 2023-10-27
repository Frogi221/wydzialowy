import React from 'react';
import { Link } from 'react-router-dom';

function Navi() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand mx-2" href="/">MotoSerwis</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Strona główna</Link>
          </li>
          <li className="nav-item">
            <Link to="/cennik" className="nav-link">Cennik</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">O nas</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Kontakt</Link>
          </li>
        </ul>
      </div>
      <div className="ml-2">
        <button className="btn btn-light">Zaloguj się</button>
      </div>
    </nav>
  );
}

export default Navi;
