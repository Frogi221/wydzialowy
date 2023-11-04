import React from 'react';
import { Link } from 'react-router-dom';

function Navi() {
  // Sprawdzamy, czy ciasteczko "user" istnieje
  const userName = document.cookie
    .split('; ')
    .find(row => row.startsWith('user='))
    ?.split('=')[1];

  const handleLogout = () => {
    // Usuwamy ciasteczka "user" i "token"
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Przeładowujemy stronę, aby zastosować zmiany
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand mx-2" href="/Glowna">MotoSerwis</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
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
      <div className="nav-link">
        {userName ? (
          <div className="login-text mx-2">
            Witaj, {userName}!
            <button className="btn btn-light mx-2" onClick={handleLogout}>Wyloguj się</button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-light">Zaloguj się</Link>
        )}
      </div>
    </nav>
  );
}

export default Navi;
