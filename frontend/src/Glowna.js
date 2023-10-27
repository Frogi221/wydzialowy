import React from 'react';
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
