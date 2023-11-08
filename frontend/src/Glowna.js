/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importuj style Bootstrap
import './App.css'; // Importuj niestandardowe style CSS
import Navi from './Navi'; // Importuj komponent nawigacji

function App() {
  return (
    <div className="background-image justify-content-center align-items-center">
      <Navi />
    </div>
  );
}

export default App;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navi from './Navi'; 

function App() {
  const [ogloszenia, setOgloszenia] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/ogloszenia").then((response) => {
      setOgloszenia(response.data);
    });
  }, []);

  return (
    <div className="background-image justify-content-center align-items-center">
      <Navi /> {}
      <div className="container mt-4 cost-container">
        <h1>Ogloszenia</h1>
        <p>Tutaj znajdziesz ogloszenia strony:</p>
        <ul>
          {ogloszenia.map((ogloszenie) => (
            <li key={ogloszenie.id} className="event">
              <p className="event-description">
                <strong>Tytuł ogłoszenia:</strong> {ogloszenie.tytulogloszenia}
              </p>
              <p className="event-cena">
                <strong>Opis:</strong> {ogloszenie.trescogloszenia} 
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
