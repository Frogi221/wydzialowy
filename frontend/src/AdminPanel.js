import React, { useEffect, useState } from "react";
import axios from "axios";
import Navi from "./Navi";
import "./App.css"; 


const AdminPanel = () => {
  const [uslugi, setUslugi] = useState([]);
  const [nazwaUslugi, setNazwaUslugi] = useState("");
  const [cenaUslugi, setCenaUslugi] = useState("");
  const [nowaNazwaUslugi, setNowaNazwaUslugi] = useState("");
  const [nowaCenaUslugi, setNowaCenaUslugi] = useState("");
  const [uzytkownicy, setUzytkownicy] = useState([]);
  const [ogloszenia, setOgloszenia] = useState([]);
  const [nazwaOgloszenia, setNazwaOgloszenia] = useState("");
  const [trescOgloszenia, setTrescOgloszenia] = useState("");
  const [contacts, setContacts] = useState([]);
  const [tytulContacts, setTytulContacts] = useState("");
  const [opisContacts, setOpisContacts] = useState("");
  const [emailContacts, setEmailContacts] = useState("");
  


  useEffect(() => {
    fetchUslugi();
    fetchUzytkownicy();
    fetchOgloszenia();
    fetchContacts();
  }, []);

  const fetchUslugi = async () => {
    try {
      const response = await axios.get("http://localhost:8081/uslugi");
      setUslugi(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania usług", error);
    }
  };

  const fetchUzytkownicy = async () => {
    try {
      const response = await axios.get("http://localhost:8081/uzytkownicy")
      setUzytkownicy(response.data);
    } catch (error) {
      console.server("Bład podczas pobierania użytkowników");
    }
  };
  const fetchOgloszenia = async () => {
    try {
      const response = await axios.get("http://localhost:8081/ogloszenia");
      setOgloszenia(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania ogłoszeń", error);
    }
  };
  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/contacts");
      console.log("Response data:", response.data);
      setContacts(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania kontaktów", error);
    }
  };


  const handleDodajUsluge = async () => {
    try {
      await axios.post("http://localhost:8081/uslugi", {
        nazwaUslugi: nazwaUslugi,
        cenaUslugi: cenaUslugi,
      });
      fetchUslugi();
    } catch (error) {
      console.error("Błąd podczas dodawania usługi", error);
    }
  };

  const handleEdytujUsluge = async (id, newNazwaUslugi, newCenaUslugi) => {
    try {
      await axios.put(`http://localhost:8081/uslugi/${id}`, {
        nazwaUslugi: newNazwaUslugi,
        cena: newCenaUslugi,
      });
      fetchUslugi();
    } catch (error) {
      console.error("Błąd podczas edytowania usługi", error);
    }
  };

  const handleUsunUsluge = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/uslugi/${id}`);
      fetchUslugi();
    } catch (error) {
      console.error("Błąd podczas usuwania usługi", error);
    }
  };

  const handleUsunUzytkownika = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/uzytkownicy/${id}`);
      fetchUzytkownicy();
    } catch(error) {
      console.error("Blad podczas usuwania uzytkownika")
    }
  };

  const handleDodajOgloszenie = async () => {
    try {
      await axios.post("http://localhost:8081/ogloszenia", {
        nazwaOgloszenia: nazwaOgloszenia,
        trescOgloszenia: trescOgloszenia,
      });
      fetchOgloszenia();
    } catch (error) {
      console.error("Błąd podczas dodawania ogłoszenia.", error);
    }
  };
  const handleUsunOgloszenie = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/ogloszenia/${id}`);
      fetchOgloszenia();
    } catch(error) {
      console.error("Blad podczas usuwania ogloszenia")
    }
  };
  return (
    <div className="background-image justify-content-center align-items-center">
    <Navi />
    <div className="admin-panel">
      <h1 className="panel-title">Panel Administratora</h1>
      <div className="add-service-container">
        <h3>Dodaj nową usługę</h3>
        <input
          type="text"
          placeholder="Nazwa usługi"
          value={nazwaUslugi}
          onChange={(e) => setNazwaUslugi(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cena usługi"
          value={cenaUslugi}
          onChange={(e) => setCenaUslugi(e.target.value)}
        />
        <button onClick={handleDodajUsluge}>Dodaj</button>
      </div>
      <div className="service-list">
        <h3>Lista Usług</h3>
        <ul>
          {uslugi.map((Usluga) => (
            <li key={Usluga.id}>
              {Usluga.nazwauslugi} - {Usluga.cenauslugi} zł
              <button
                onClick={() =>
                  handleEdytujUsluge(Usluga.id, nowaNazwaUslugi, nowaCenaUslugi)
                }
              >
                Edytuj
              </button>
              <button onClick={() => handleUsunUsluge(Usluga.id)}>Usuń</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="service-list">
          <h3>Lista Użytkowników</h3>
          <ul>
            {uzytkownicy.map((uzytkownik) => (
              <li key={uzytkownik.id}>
                {uzytkownik.name} - {uzytkownik.email}
                <button onClick={() => handleUsunUzytkownika(uzytkownik.id)}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-service-container">
        <h3>Dodaj nowe ogloszenie</h3>
        <input
          type="text"
          placeholder="Nazwa usługi"
          value={nazwaOgloszenia}
          onChange={(e) => setNazwaOgloszenia(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cena usługi"
          value={trescOgloszenia}
          onChange={(e) => setTrescOgloszenia(e.target.value)}
        />
        <button onClick={handleDodajOgloszenie}>Dodaj</button>
      </div>
      <div className="service-list">
          <h3>Lista Ogloszeń</h3>
          <ul>
            {ogloszenia.map((ogloszenie) => (
               <li key={ogloszenie.id} className="event">
               <p className="event-description">
                 <strong>Tytuł ogłoszenia:</strong> {ogloszenie.tytul}
               </p>
               <p className="event-cena">
                 <strong>Opis:</strong> {ogloszenie.opis} 
               </p>
               <button onClick={() => handleUsunOgloszenie(ogloszenie.id)}>Usuń</button>
             </li>
            ))}
          </ul>
        </div>
        <div className="service-list">
        <h3>Lista kontaktów</h3>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                {contact.tresc} - {contact.opis} - {contact.email}
              </li>
            ))}
          </ul>
        </div>
    </div>
    </div>
  );
};

export default AdminPanel;
