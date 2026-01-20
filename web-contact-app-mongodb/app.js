import express from "express";
import expressLayouts from "express-ejs-layouts";

import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "express-flash-message";

import path from "path";
import { fileURLToPath } from "url";

import "./utils/db.js";
import { Contact } from "./model/contact.js";

const app = express();
const port = 3000;

// Menangani __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Menyajikan file statis dari folder 'node_modules'
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")),
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")),
);
app.use(
  "/icons",
  express.static(path.join(__dirname, "node_modules/bootstrap-icons/font")),
);
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  }),
);
app.use(
  flash({
    sessionKeyName: "express-flash-message",
    onAddFlash: (type, message) => {},
    onConsumeFlash: (type, messages) => {}, // Hapus tipe datanya
  }),
);

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

// root ke halaman utama
app.get("/", (req, res) => {
  res.render("index", { title: "utama", layout: "layout", waifus });
});

// root ke halaman about
app.get("/about", (req, res) => {
  res.render("about", { title: "about", layout: "layout" });
});

// root ke halaman contact
app.get("/contact", async (req, res) => {
  //  res.flash("success", "[------success------]");
  const contacts = await Contact.find();
  res.render("contact", {
    title: "contact",
    layout: "layout",
    contacts,
  });

  // Contact.find().then((contact) => {
  //   res.send(contact);
  // });
});

// untuk menampilkan detail data contact
app.get("/contact/detail/:nohp", async (req, res) => {
  const contact = await Contact.find({ nohp: req.params.nohp });
  // Contact.find({ nohp: req.params.nohp }).then((contact) => {
  //   // res.send(contact);
  // });

  console.log(contact[0]);
  res.render("details", {
    title: "details",
    layout: "layout",
    contact: contact[0],
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
