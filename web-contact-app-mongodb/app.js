import express from "express";
import expressLayouts from "express-ejs-layouts";
import { body, check, validationResult } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "express-flash-message";
import methodOverride from "method-override";

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

app.use(methodOverride("_method"));

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

  // console.log(contact[0]);
  res.render("details", {
    title: "details",
    layout: "layout",
    contact: contact[0],
  });
});

// untuk menambahkan data contact
app.get("/contact/tambah", (req, res) => {
  res.render("tambah-contact", { title: "tambah contact", layout: "layout" });
});

// proses tambah data
app.post(
  "/contact",
  [
    check("email", "Format Email salah").isEmail(),
    check("nohp", "Format Nomer HP salah").isMobilePhone("id-ID"),
    body("nohp").custom(async (value) => {
      const duplikat = await Contact.findOne({ nohp: value });
      if (duplikat) {
        throw new Error("Nomer HP sudah digunakan");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req); // Ganti nama agar tidak bentrok

    if (!errors.isEmpty()) {
      // Tambahkan return agar fungsi berhenti di sini jika ada error
      return res.render("tambah-contact", {
        title: "tambah contact",
        layout: "layout",
        errors: errors.array(),
      });
    }

    try {
      // Data req.body akan otomatis divalidasi oleh Skema Mongoose kamu
      await Contact.insertMany(req.body);
      // atau Contact.create(req.body);

      res.flash("success", "Data berhasil ditambahkan");
      res.redirect("/contact");
    } catch (err) {
      console.error(err);
      res.flash("error", "Gagal menambahkan data ke database");
      res.redirect("/contact");
    }
  },
);

// untuk menghapus data contact
// app.get("/contact/delete/:nohp", async (req, res) => {
//   const contact = await Contact.findOne({ nohp: req.params.nohp });
//   // console.log(contact);
//   if (!contact) {
//     return res.status(404).send("<h1>404</h1>");
//   }
//   // deleteContact(req.params.nohp);
//   Contact.deleteOne({ _id: contact._id }).then((result) => {
//     // console.log(result);
//     res.flash("success", "data berhasil di hapus");
//     res.redirect("/contact");
//   });

//   // res.redirect("/contact")
// });

app.delete("/contact", (req, res) => {
  // res.send(req.body);
  Contact.deleteOne({ _id: req.body.id }).then((result) => {
    console.log(result);
    res.flash("success", "data berhasil di hapus");
    res.redirect("/contact");
  });
});

// untuk mengubah data contact
app.get("/contact/edit/:nohp", async (req, res) => {
  const contact = await Contact.findOne({ nohp: req.params.nohp });

  res.render("ubah-contact", {
    title: "ubah contact",
    layout: "layout",
    contact,
  });
});

app.put(
  "/contact",
  [
    check("email", "Format Email salah").isEmail(),
    check("nohp", "Format Nomer HP salah").isMobilePhone("id-ID"),
    body("nohp").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nohp: value });
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
          _id: req.body._id,
          nama: req.body.nama,
          email: req.body.email,
          nohp: req.body.nohp,
          oldNohp: req.body.oldNohp, // Penting untuk hidden input
        },
      });
    } else {
      // res.send(req.body);
      // updateContacts(req.body);
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            nohp: req.body.nohp,
            email: req.body.email,
          },
        },
      ).then((result) => {
        console.log(result);
        // kirimkan flash msg
        res.flash("success", "data berhasil diubah");
        res.redirect("/contact");
      });
    }
  },
);

// middleware terakhir
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`server is listening visit site in https://localhost:${port}`);
});
