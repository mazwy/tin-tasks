const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('db.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});

const initTables = () => {
    db.run('CREATE TABLE IF NOT EXISTS table1 (id INTEGER PRIMARY KEY, name TEXT, table2_id INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS table2 (id INTEGER PRIMARY KEY, description TEXT)');
};

initTables();

app.get('/data', (req, res) => {
    db.all("SELECT * FROM table1 JOIN table2 ON table1.table2_id = table2.id", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.post('/data', (req, res) => {
    const { id, name, table2_id, description } = req.body;
    db.run(`INSERT INTO table1 (id, name, table2_id) VALUES(?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET name=excluded.name, table2_id=excluded.table2_id`,
        [id, name, table2_id],
        function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": this.lastID
            });
        });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
