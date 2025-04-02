const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const accountYearRoutes=require('./Router/AccountYearRouter')
const app = express();
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
// Middleware to parse JSON request body
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors());



// 3️⃣ Custom Middleware (Example: Logging request details)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Move to the next middleware or route
});
mongoose.connect('mongodb://127.0.0.1:27017/MehaInvoice')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Dummy User Authentication
    if (username === "Admin" && password === "Admin@123") {
        // const token = jwt.sign(
        //     {
        //         userId: user.userId,
        //         roleId: user.roleId,
        //         username: user.username,
        //         roleName: user.roleName
        //     },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "1h" }
        // );
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    }

    res.status(401).json({ message: "Invalid credentials" });
});

app.use('/api', accountYearRoutes);


// Start the server
const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
