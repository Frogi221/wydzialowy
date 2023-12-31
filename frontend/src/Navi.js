import React from 'react';
import { Link } from 'react-router-dom';

function Navi() {
  const userName = document.cookie
    .split('; ')
    .find(row => row.startsWith('user='))
    ?.split('=')[1];

  // Pobierz wartość ciasteczka "typ_konta"
  const userRole = document.cookie
    .split('; ')
    .find(row => row.startsWith('typ_konta='))
    ?.split('=')[1];

  const handleLogout = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'typ_konta=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Dodaj tę linię
    window.location.href = '/Glowna'; // Przekieruj użytkownika na stronę główną
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand mx-2" to="/Glowna">MotoSerwis</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/cennik" className="nav-link">Cennik</Link>
          </li>
          {(userRole === 'user' || userRole === 'admin') && (
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Kontakt</Link>
            </li>
          )}
          {/* Warunkowe renderowanie zakładki "Panel Admina" */}
          {userRole === 'admin' && (
            <li className="nav-item">
              <Link to="/adminpanel" className="nav-link">Panel Admina</Link>
            </li>
          )}
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
