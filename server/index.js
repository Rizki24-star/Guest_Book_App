import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_guest_book'
});

app.use(express.json())
app.use(cors())

const JWT_SECRET_KEY = "4KS3skuMs1Bb4tcH5";

app.get('/', (req, res) => {
    res.json("Hello this is the backcend")
})

app.get("/guest", (req, res) => {
    const q = "SELECT * FROM guest_entries ORDER BY created_at DESC"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/guest", (req, res) => {
    const q = "INSERT INTO guest_entries (`name`, `email`, `date_of_birth`, `id_card_number`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.date_of_birth,
        req.body.id_card_number,
    ]


    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json({ message: "Register is successfully" })
    })
})

app.post("/register", async (req, res) => {
    const q = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const values = [
        req.body.name,
        req.body.email,
        hashedPassword
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(401).json({ status: false, message: "Something went wrong or email has been taken!" })
        return res.json({ status: true, message: "Register is successfully" })
    })
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // return res.json({result: [email]})
    try {
      // Execute the SQL query to find the user by email
      const query = "SELECT * FROM users WHERE email = ?";
      const values = [email];
  
      const [rows] = await new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });


  
      if (rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      


      const user = rows;

      const isPasswordValid = bcrypt.compare([password], user.password)

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }
  


      const token = jwt.sign({ userId: user.email }, JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
  
      return res.json({
        user: {
            name: user.name,
            email: user.email,
        }, token
      });

    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/logout", (req, res) => {
    try {
      // Clear the user authentication data from the client-side (localStorage or cookies)
      // Remove the token and user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      // You can also clear cookies if you are using them for authentication
  
      // Respond with a success message indicating successful logout
      return res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle any error that occurred during logout
      // For example, show an error message to the user
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });


app.listen(8800, () => {
    console.log("Server is running")
})