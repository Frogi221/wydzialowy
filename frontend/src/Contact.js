import React, { useState, useEffect } from "react";
import axios from "axios";
import Navi from "./Navi";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    tytul: "",
    opis: "",
    email: "",
  });
  const [userName, setUserName] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    // Pobierz nazwę z ciasteczka po załadowaniu komponentu
    const storedUserName = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='))
      ?.split('=')[1];
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (input) => {
    // Proste wyrażenie regularne do sprawdzania poprawności adresu e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleAddContact = async () => {
    // Sprawdź poprawność adresu e-mail przed wysłaniem żądania
    if (!validateEmail(formData.email) || !formData.tytul || !formData.opis) {
      setFormError("Wszystkie pola muszą być wypełnione poprawnie");
      return;
    }

    try {
      await axios.post("http://localhost:8081/contacts", {
        ...formData,
        userName: userName,
      });

      // Wyczyść pola formularza po dodaniu kontaktu
      setFormData({
        tytul: "",
        opis: "",
        email: "",
      });
      setFormError(null); // Wyzeruj błąd po pomyślnym dodaniu
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
          <p>Zalogowany jako: {userName}</p>
          <input
            type="text"
            name="tytul"
            placeholder="Tytuł"
            value={formData.tytul}
            onChange={handleInputChange}
          />
          <textarea
            name="opis"
            placeholder="Opis"
            value={formData.opis}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Adres email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          <button onClick={handleAddContact}>Wyślij</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
