import express from "express";
import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import { findContact, loadContacts } from "./utils/contacts.js";

const app = express();
const port = 3000;

// Menangani __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Menyajikan file statis dari folder 'node_modules'
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/icons",
  express.static(path.join(__dirname, "node_modules/bootstrap-icons/font"))
);

// middleware third-party-1
app.set("view engine", "ejs");
app.use(expressLayouts);
// middleware third-party-2
app.use(express.static("public"));

const waifus = [
  {
    nama: "Yoroizuka Mizore",
    from: "Liz to Aoi Tori",
  },
  {
    nama: "Takanashi Izumi",
    from: "Wagnaria!",
  },
  {
    nama: "Hoshimi Miyabi",
    from: "Zenles Zone Zero",
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "utama", layout: "layout", waifus });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about", layout: "layout" });
});

// app.use((req, res, next) => {
//   console.log(loadContacts());
//   next();
// });

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "contact",
    layout: "layout",
    contacts: loadContacts(),
  });
});

app.get("/contact/:nohp", (req, res) => {
  res.render("details", {
    title: "details",
    layout: "layout",
    contact: findContact(req.params.nohp),
  });
});

// middleware terakhir
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
