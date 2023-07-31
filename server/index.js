import express  from "express";
import mysql from "mysql"; 

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_guest_book'
});

app.get('/', (req, res) => {
    res.json("Hello this is the backcend")
})

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.use(express.json())

app.post("/register", (req, res) => {
    const q = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err.sqlMessage)
        return res.json("Register is successfully!")
    })
})

// app.get("/guest-book")

app.listen(8800, () => {
    console.log("Connected to backend")
})