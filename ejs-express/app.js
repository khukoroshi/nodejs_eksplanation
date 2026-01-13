const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

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
  res.render("index", { title: "halaman utama", layout: "layout", waifus });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "halaman about", layout: "layout" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "halaman contact", layout: "layout" });
});

// app.get("/product/:id/kategori/:kategori", (req, res) => {
//   res.send(
//     `id produk : ${req.params.id} </br> kategori : ${req.params.kategori} `
//   );
// });

// app.get("/waifu/:id", (req, res) => {
//   res.send(`waifu ke-${req.params.id}, ${req.query.nama}`);
// });

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
