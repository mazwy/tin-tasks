require("ejs");
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const compression = require("compression");
const cookie = require("cookie-parser");
const i18n = require("i18n");

const app = express();

const port = 2137;
const date = new Date().getFullYear();
const hour = new Date().getHours();

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const validateName = (name) => {
    const re = /^\S{4,12}$/;
    return re.test(name);
}

const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);
}

// locales
i18n.configure({
    locales: ["en-US", "pl-PL"],
    directory: __dirname + "/locales",
    defaultLocale: "en",
    cookie: "lang",
});

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(compression());
app.use(cookie());
app.use(i18n.init);

//static files
app.use(express.static(path.join(__dirname, "public")));

//routes
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        date: date,
        hour: hour,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        date: date,
        hour: hour,
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact",
        date: date,
        hour: hour,
    });
});

app.get("/form", (req, res) => {
    res.render("form", {
        title: "Form",
        date: date,
        hour: hour,
    });
});

app.get("/file/:filename", async (req, res) => {
    const {filename} = req.params;

    try {
        const data = await fs.readFile(`./files/${filename}`, "utf8");
        res.send(data);
    } catch (err) {
        res.send("File not found");
    }
});

app.get("/lang/:locale", (req, res) => {
    res.cookie("lang", req.params.locale);
    res.redirect("back");
});

app.post("/form", express.urlencoded({extended: true}), (req, res) => {
    const {name, email, password} = req.body;
    const errors = [];

    if (!validateName(name)) {
        errors.push("Name is incorrect");
    }

    if (!validateEmail(email)) {
        errors.push("Email is incorrect");
    }

    if (!validatePassword(password)) {
        errors.push("Password is incorrect");
    }

    if (errors.length > 0) {
        res.render("form", {
            title: "Form",
            date: date,
            hour: hour,
            errors: errors,
            oldData: req.body,
        });
    } else {
        res.send("OK");
    }
});

app.use((req, res) => {
    res.status(404).render("404", {
        title: "404",
        date: date,
        hour: hour,
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
