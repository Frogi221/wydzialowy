const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const salt = 10;

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: "POST, GET, PUT, DELETE",
    credentials: true
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
    const { nazwaUslugi, cenaUslugi } = req.body;
    const sql = 'INSERT INTO uslugi (nazwauslugi, cenauslugi) VALUES (?, ?)';
    db.query(sql, [nazwaUslugi, cenaUslugi], (err, result) => {
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
  
  app.listen(8081, () => {
    console.log("listening")
  });
  