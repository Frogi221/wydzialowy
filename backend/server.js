const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const salt = 10;

const app = express();

app.use(cors(
  {
      origin: "http://localhost:3000", // Adres URL twojego frontendu
      methods: "POST, GET, PUT, DELETE",
      credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "wydzialowy"
})
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) =>{
        if(err) return res.json({Error: "Error for hashing password"});

        const values = [
            req.body.name,
            req.body.email,
            hash
        ];

        db.query(sql, [values], (err, data) =>{
            if(err) {
                return res.json("Error");
            }
            return res.json(data);
        });
    });
});

app.post('/login', (req, res) =>{
  const sql = `SELECT * FROM login where email = ?`;
  db.query(sql, [req.body.email], (err, data) => {
      if(err) return res.json({Error: "Login error in server"});
      if(data.length > 0) {
          bcrypt.hash(req.body.password.toString(), data[0].password, (err, response) => {
              if(err) return res.json({Error: "Password compare error"});
              if(response) {
                  const name = data[0].name
                  const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                  res.cookie('token', token);
                  res.cookie('user', name);
                  return res.json("Success");
              } else {
                  return res.json({Error: "Password not matched"});
              }
          })
      } else {
          return res.json({Error: "No email existed"});
      }
  });
});

app.get('/uslugi', (req, res) => {
    const sql = 'SELECT * FROM uslugi';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Błąd podczas pobierania usług', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Pobrano usługi z bazy danych');
      res.status(200).json(result);
    });
  });
  
  app.post('/uslugi', (req, res) => {
    const sql = 'INSERT INTO uslugi (nazwauslugi, cenauslugi) VALUES (?, ?)';
    db.query(sql, [req.body.nazwaUslugi, req.body.cenaUslugi], (err, result) => {
      if (err) {
        console.error('Błąd podczas dodawania usługi', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Dodano nową usługę do bazy danych');
      res.status(200).json(result);
    });
  });
  
  app.put('/uslugi/:id', (req, res) => {
    const { id } = req.params;
    const { nazwaUslugi, cenaUslugi } = req.body;
    const sql = 'UPDATE uslugi SET nazwauslugi = ?, cenauslugi = ? WHERE id = ?';
    db.query(sql, [nazwaUslugi, cenaUslugi, id], (err, result) => {
      if (err) {
        console.error('Błąd podczas edytowania usługi', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Zaktualizowano usługę w bazie danych');
      res.status(200).json(result);
    });
  });
  
  app.delete('/uslugi/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM uslugi WHERE id = ?';
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Błąd podczas usuwania usługi', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Usunięto usługę z bazy danych');
      res.status(200).json(result);
    });
  });
  app.get('/uzytkownicy', (req, res) => {
    const sql = 'SELECT * FROM login';
    db.query(sql, [req.body.name, req.body.email], (err, result) => {
      if (err) {
        console.error('Błąd podczas pobierania użytkowników', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Pobrano użytkowników z bazy danych');
      res.status(200).json(result);
    });
  });
  
  app.post('/uzytkownicy', (req, res) => {
    const sql = 'INSERT INTO login (nazwa, email) VALUES (?, ?)';
    db.query(sql, [req.body.name, req.body.email], (err, result) => {
      if (err) {
        console.error('Błąd podczas dodawania użytkownika', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Dodano nowego użytkownika do bazy danych');
      res.status(200).json(result);
    });
  });
  
  app.put('/uzytkownicy/:id', (req, res) => {
    const { id } = req.params;
    const { nazwa, email } = req.body;
    const sql = 'UPDATE login SET nazwa = ?, email = ? WHERE id = ?';
    db.query(sql, [nazwa, email, id], (err, result) => {
      if (err) {
        console.error('Błąd podczas edytowania użytkownika', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Zaktualizowano użytkownika w bazie danych');
      res.status(200).json(result);
    });
  });
  
  app.delete('/uzytkownicy/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM login WHERE id = ?';
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Błąd podczas usuwania użytkownika', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Usunięto użytkownika z bazy danych');
      res.status(200).json(result);
    });
  });
  app.get('/ogloszenia', (req, res) => {
    const sql = 'SELECT * FROM ogloszenia';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Błąd podczas pobierania ogłoszeń', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Pobrano ogłoszenia z bazy danych');
      res.status(200).json(result);
    });
  });

  app.post('/ogloszenia', (req, res) => {
    const sql = 'INSERT INTO ogloszenia (tytul, opis) VALUES (?, ?)';
    db.query(sql, [req.body.nazwaOgloszenia, req.body.trescOgloszenia], (err, result) => {
      if (err) {
        console.error('Błąd podczas pobierania usług', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Pobrano ogłoszenia z bazy danych');
      res.status(200).json(result);
    });
  });

  app.delete('/ogloszenia/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM ogloszenia WHERE id = ?';
    db.query(sql, id, (err, result) => {
      if (err) {
        console.error('Błąd podczas usuwania ogłoszenia', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Usunięto ogłoszenie z bazy danych');
      res.status(200).json(result);
    });
  });

  app.post("/contacts", (req, res) => {
    const { tytul, opis, email } = req.body;
    const query = "INSERT INTO contacts (tytul, opis, email, name) VALUES (?, ?, ?, ?)";
    db.query(query, [tytul, opis, email, req.body.userName], (err, result) => {
    
      if (err) {
        console.error("Błąd podczas dodawania kontaktu", err);
        res.status(500).json({ error: "Błąd podczas dodawania kontaktu" });
        return;
      }
      res.status(201).json({ id: result.insertId, tytul, opis, email });
    });
  });

  app.get('/contacts', (req, res) => {
    const sql = 'SELECT * FROM contacts';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Błąd podczas pobierania ogłoszeń', err);
        res.status(500).json('Błąd');
        return;
      }
      console.log('Pobrano ogłoszenia z bazy danych');
      res.status(200).json(result);
    });
  });
  
  app.listen(8081, () => {
    console.log("listening")
  });
  