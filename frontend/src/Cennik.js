import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navi from './Navi'; // Importuj komponent nawigacji

function Cennik() {
  const [uslugi, setUslugi] = useState([]);

  useEffect(() => {
    // Pobierz usługi z serwera
    axios.get("http://localhost:8081/uslugi").then((response) => {
      setUslugi(response.data);
    });
  }, []);

  return (
    <div className="background-image justify-content-center align-items-center">
      <Navi /> {/* Dodaj komponent nawigacji */}
      <div className="container mt-4 cost-container">
        <h1>Cennik</h1>
        <p>Tutaj znajdziesz nasz cennik usług:</p>
        <ul>
          {uslugi.map((usluga) => (
            <li key={usluga.id} className="event">
              <p className="event-description">
                <strong>Nazwa usługi:</strong> {usluga.nazwauslugi}
              </p>
              <p className="event-cena">
                <strong>Cena:</strong> {usluga.cenauslugi} zł
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cennik;
