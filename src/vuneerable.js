// vulnerable.js

const express = require('express');
const { exec } = require('child_process');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// ❌ Hardcoded secret (Semgrep should flag this)
const API_KEY = "sk_test_1234567890abcdef";

// ❌ Command Injection vulnerability
app.get('/ping', (req, res) => {
    const host = req.query.host;
    exec("ping -c 1 " + host, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});

// ❌ SQL Injection vulnerability
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testdb"
});

app.get('/user', (req, res) => {
    const id = req.query.id;
    const query = "SELECT * FROM users WHERE id = " + id;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// ❌ Unsafe eval usage
app.post('/calculate', (req, res) => {
    const expression = req.body.expression;
    const result = eval(expression);
    res.send({ result });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
