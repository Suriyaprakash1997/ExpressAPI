const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const errorHandler=require('./middleware/errorHandler')
const app = express();
dotenv.config();
const accountYearRoute=require('./routes/accountYearRoute')
const customerRoute=require('./routes/customerRoute')
const projectRoute=require('./routes/projectRoute')
const dropdownRoute=require('./routes/dropdownRoute')
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
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

app.use('/api', accountYearRoute);
app.use('/api', customerRoute);
app.use('/api',projectRoute);
app.use('/api',dropdownRoute);

app.use(errorHandler);
const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});