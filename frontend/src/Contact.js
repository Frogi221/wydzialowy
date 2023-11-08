import React, { useState } from "react";
import axios from "axios";
import Navi from "./Navi";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  const [tytul, setTytul] = useState("");
  const [opis, setOpis] = useState("");
  const [email, setEmail] = useState("");

  const handleAddContact = async () => {
    try {
      await axios.post("http://localhost:8081/contacts", {
        tytul: tytul,
        opis: opis,
        email: email,
      });

      // Wyczyść pola formularza po dodaniu kontaktu
      setTytul("");
      setOpis("");
      setEmail("");
    } catch (error) {
      console.error("Błąd podczas dodawania kontaktu", error);
    }
  };

  return (
    <div className="background-image justify-content-center align-items-center">
      <Navi />
      <div className="container mt-4 cost-container">
        <h1 className="service-list">Kontakt</h1>
        <div className="contact-panel">
          <h3>Zostaw nam wiadomość</h3>
          <input
            type="text"
            placeholder="Tytuł"
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
          />
          <textarea
            placeholder="Opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          />
          <input
            type="email"
            placeholder="Adres email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleAddContact}>Wyślij</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;