import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navi from "./Navi";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Cennik() {
  const [uslugi, setUslugi] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/uslugi").then((response) => {
      setUslugi(response.data);
    });
  }, []);

  const handleExportToPDF = () => {
    const pdf = new jsPDF();
  
    // Ustaw polską czcionkę
    pdf.setFont("times", "normal"); // Możesz również spróbować "helvetica"
  
    // Ustawienia dla nagłówka tabeli
    const headers = [["Nazwa uslugi", "Cena (zl)"]];
  
    // Konwersja danych o usługach na tablicę do wydrukowania
    const data = uslugi.map((usluga) => [usluga.nazwauslugi, usluga.cenauslugi]);
  
    // Dodaj tabelę do dokumentu PDF
    pdf.autoTable({
      head: headers,
      body: data,
      didDrawCell: (data) => {
        // Ustaw czcionkę na "times", "normal"
        pdf.setFont("times", "normal");
      },
      margin: { top: 20 },
      styles: { font: "times", fontStyle: "normal" },
    });
  
    // Zapisz plik PDF
    pdf.save("cennik.pdf");
  };

  return (
    <div className="background-image justify-content-center align-items-center">
      <Navi />
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
        <button onClick={handleExportToPDF}>Eksportuj do PDF</button>
      </div>
    </div>
  );
}

export default Cennik;
