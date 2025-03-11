// khai báo các thưu viện cần hỗ trợ trong express js
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();

// Session configuration - MUST be before CORS
app.use(session({
    secret: "thachbao100",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // set to true if using https
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser configuration
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

// First connect without database to create it
const initialConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thanhdat2004"
});

initialConnection.connect((err) => {
    if (err) {
        console.error("Lỗi kết nối MySQL:", err);
        return;
    }
    
    // Create database if it doesn't exist
    initialConnection.query("CREATE DATABASE IF NOT EXISTS web", (err) => {
        if (err) {
            console.error("Error creating database:", err);
            return;
        }
        console.log("Database 'web' ready");
        
        // Close initial connection
        initialConnection.end();
        
        // Connect to the web database
        const db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "thanhdat2004",
            database: "web"
        });

        // Create Users table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Users (
                username VARCHAR(20) PRIMARY KEY NOT NULL,
                password VARCHAR(20) NOT NULL
            )
        `;
        
        db.query(createTableQuery, (err) => {
            if (err) {
                console.error("Error creating Users table:", err);
            } else {
                console.log("Users table ready");
                
                // Test the connection with a simple query
                db.query("SELECT 1", (err) => {
                    if (err) {
                        console.error("Database connection test failed:", err);
                    } else {
                        console.log("Database connection test successful");
                    }
                });
            }
        });

        // Make db available to other parts of the application
        app.locals.db = db;
    });
});

// API lấy danh sách sản phẩm
app.get("/products", (req, res) => {
    app.locals.db.query("SELECT * FROM Products", (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Lỗi server, thử lại sau!" });
        } else {
            res.json({ success: true, data: results });
        }
    });
});

// API lấy chi tiết sản phẩm theo ID
app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    app.locals.db.query("SELECT * FROM Products WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Lỗi server, thử lại sau!" });
        } else if (results.length === 0) {
            res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm!" });
        } else {
            res.json({ success: true, data: results[0] });
        }
    });
});
//API login
app.post("/auth", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Vui lòng nhập cả tên người dùng và mật khẩu." });
    }

    const sql = "SELECT * FROM Users WHERE username = ?";
    app.locals.db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: "Lỗi server, thử lại sau!" });
        }

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: "Tên người dùng hoặc mật khẩu không đúng." });
        }

        if (password === result[0].password) {
            req.session.loggedin = true;
            req.session.username = username;
            return res.json({ success: true, message: "Đăng nhập thành công!" });
        } else {
            return res.status(401).json({ success: false, message: "Tên người dùng hoặc mật khẩu không đúng." });
        }
    });
});
app.get("/", (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.redirect("/login.html");
    }
});
// API logout
app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                throw err;
            } else {
                res.redirect("/");
            }
        });
    } else {
        res.send("No session found");
    }
});
//API register
app.post("/register", async (req, res) => {
    try {
        console.log('Received registration request:', req.body);
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập đầy đủ thông tin!"
            });
        }

        // Check if username already exists
        app.locals.db.query(
            "SELECT * FROM Users WHERE username = ?",
            [username],
            (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: false,
                        message: "Lỗi server, thử lại sau!"
                    });
                }

                if (results.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Tên người dùng đã được sử dụng!"
                    });
                }

                // Insert new user
                app.locals.db.query(
                    "INSERT INTO Users (username, password) VALUES (?, ?)",
                    [username, password],
                    (err, result) => {
                        if (err) {
                            console.error('Error inserting user:', err);
                            return res.status(500).json({
                                success: false,
                                message: "Lỗi server, thử lại sau!"
                            });
                        }

                        console.log('User registered:', username);
                        res.status(200).json({
                            success: true,
                            message: "Đăng ký thành công!"
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            success: false,
            message: "Lỗi xử lý dữ liệu!"
        });
    }
});

// route mục register
app.get("/register", (req, res) => {
    res.redirect("/register.html");
});
// Khởi động server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
