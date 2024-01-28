const express = require('express');
const sql3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.set('views', './pages');
app.set('view engine', 'ejs');

const path = "./db.sqlite";
let db;

async function init(path) {
    db = await open({
        filename: path,
        driver: sql3.Database,
    });
}

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.get("/movies", async (req, res) => {
    res.sendFile(__dirname + "/pages/movies.html");
});

app.get("/movies/:id", async (req, res) => {
    const {id} = req.params;
    const data = await db.get("SELECT * FROM movie WHERE id = ?", id);
    res.json(data);
});

app.post("/movies/add", async (req, res) => {
    const {title, genre} = req.body;
    const genreId = await db.get("SELECT id FROM genre WHERE name = ?", genre);

    if (genreId === null) {
        res.status(404).json({error: "Genre not found"});
        return;
    }

    const data = await db.all("INSERT INTO movie (title, genreid) VALUES (?, ?)", title, genreId.id);
    res.json(data);
});

app.put("/movies/:id", async (req, res) => {
    const {id} = req.params;
    const {title, year, rating} = req.body;
    const data = await db.all("UPDATE movie SET title = ?, year = ?, rating = ? WHERE id = ?", title, year, rating, id);
    res.json(data);
});

app.delete("/movies/:id", async (req, res) => {
    const {id} = req.params;
    const data = await db.all("DELETE FROM movie WHERE id = ?", id);
    res.json(data);
});

app.get("/genres", async (req, res) => {
    res.sendFile(__dirname + "/pages/genres.html");
});

app.get("/genres/all", async (req, res) => {
    const data = await db.all("SELECT * FROM genre");
    console.log(data);
    if (data.length === 0) {
        res.status(404).json({error: "No genres found"});
        return;
    }
    res.json(data);
});

app.get("/genres/:id", async (req, res) => {
    const {id} = req.params;
    const data = await db.get("SELECT * FROM genre WHERE id = ?", id);
    res.json(data);

});

app.post("/genres", async (req, res) => {
    const {name} = req.body;
    const data = await db.all("INSERT INTO genre (name) VALUES (?)", name);
    res.json(data);
});

app.put("/genres/:id", async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const data = await db.all("UPDATE genre SET name = ? WHERE id = ?", name, id);
    res.json(data);
});

app.delete("/genres/:id", async (req, res) => {
    const {id} = req.params;
    const data = await db.all("DELETE FROM genre WHERE id = ?", id);
    res.json(data);
});

app.get("/all", async (req, res) => {
    const data = await db.all("SELECT * FROM movie");
    console.log(data);
    if (data.length === 0) {
        res.status(404).json({error: "No movies found"});
        return;
    }
    res.json(data);
});

init(path).then(() =>{
    app.listen(3333, () => console.log(`Listening on http://localhost:3333`));
});