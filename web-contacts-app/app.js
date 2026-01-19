import express from "express";
import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";
import { body, check, validationResult } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
// import flash from "connect-flash";
import flash from "express-flash-message";

import path from "path";
import { fileURLToPath } from "url";
import {
  addContact,
  cekDuplikat,
  findContact,
  loadContacts,
  deleteContact,
  updateContacts,
} from "./utils/contacts.js";

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
  })
);
app.use(
  flash({
    sessionKeyName: "express-flash-message",
    onAddFlash: (type, message) => {},
    onConsumeFlash: (type, messages) => {}, // Hapus tipe datanya
  })
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

// untuk menampilkan data contact
app.get("/contact", (req, res) => {
  //  res.flash("success", "[------success------]");
  res.render("contact", {
    title: "contact",
    layout: "layout",
    contacts: loadContacts(),
  });
});

// untuk menambahkan data contact
app.get("/contact/tambah", (req, res) => {
  res.render("tambah-contact", { title: "tambah contact", layout: "layout" });
});

app.post(
  "/contact",
  [
    check("email", "Format Email salah").isEmail(),
    check("nohp", "Format Nomer HP salah").isMobilePhone("id-ID"),
    body("nohp").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nomer HP sudah digunakan");
      }
      return true;
    }),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.render("tambah-contact", {
        title: "tambah contact",
        layout: "layout",
        errors: result.array(),
      });
    } else {
      addContact(req.body);
      // kirimkan flash msg
      res.flash("success", "data berhasil di tambahkan");

      res.redirect("/contact");
    }
  }
);

// untuk mengubah data contact
app.get("/contact/edit/:nohp", (req, res) => {
  res.render("ubah-contact", {
    title: "ubah contact",
    layout: "layout",
    contact: findContact(req.params.nohp),
  });
});

app.post(
  "/contact/update",
  [
    check("email", "Format Email salah").isEmail(),
    check("nohp", "Format Nomer HP salah").isMobilePhone("id-ID"),
    body("nohp").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNohp && duplikat) {
        throw new Error("Nomer HP sudah digunakan");
      }
      return true;
    }),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // res.send(result);
      // console.log(req.body);
      res.render("ubah-contact", {
        title: "ubah contact",
        layout: "layout",
        errors: result.array(),
        contact: {
          nama: req.body.nama,
          email: req.body.email,
          nohp: req.body.nohp,
          oldNohp: req.body.oldNohp, // Penting untuk hidden input
        },
      });
    } else {
      // res.send(req.body);
      updateContacts(req.body);
      // kirimkan flash msg
      res.flash("success", "data berhasil diubah");
      res.redirect("/contact");
    }
  }
);

// untuk menghapus data contact
app.get("/contact/delete/:nohp", (req, res) => {
  const cekNoHP = findContact(req.params.nohp);
  // console.log(cekNoHP);
  if (!cekNoHP) {
    res.status(404).send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nohp);
    res.flash("success", "data berhasil di hapus");
    res.redirect("/contact");
  }
  // res.redirect("/contact")
});

// untuk menampilkan detail data contact
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
