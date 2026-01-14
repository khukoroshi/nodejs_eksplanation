const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");

const app = express();
const port = 3000;

// middleware third-party-1
app.set("view engine", "ejs");
app.use(expressLayouts);
// middleware third-party-2
app.use(morgan("dev"));

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

// middleware ke-1
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// middleware ke-2
app.use((req, res, next) => {
  console.log("middleware ke-2");
  next();
});

function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

const logStuff = [logOriginalUrl, logMethod];
app.get("/user/:id", logStuff, (req, res, next) => {
  // 2 fungsi di atas di satukan dan menjadi satu route
  res.send("User Info");
});

app.get("/", (req, res) => {
  res.render("index", { title: "halaman utama", layout: "layout", waifus });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "halaman about", layout: "layout" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "halaman contact", layout: "layout" });
});

// app.use("/user/:id", (req, res, next) => {
//   console.log("Request Type:", req.method);
//   next();
// });

// app.use(
//   "/user/:id",
//   (req, res, next) => {
//     console.log("Request URL:", req.originalUrl);
//     next();
//   },
//   (req, res, next) => {
//     console.log("Request Type:", req.method);
//     next();
//   }
// );

// app.get(
//   "/user/:id",
//   (req, res, next) => {
//     console.log("ID:", req.params.id);
//     next();
//   },
//   (req, res, next) => {
//     // res.send("User Info");
//     // next(); // kalo pake next bakal error karna satu route hanya bisa melakukan satu send
//     if (req.params.id) {
//       res.send(req.params.id);
//     } else {
//       res.send("User Info");
//     }
//   }
// );

// handler for the /user/:id path, which prints the user ID
// app.get("/user/:id", (req, res, next) => {});

app.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.send("regular");
  }
);

// handler for the /user/:id path, which sends a special response
app.get("/user/:id", (req, res, next) => {
  res.send("special");
});

// app.get("/product/:id/kategori/:kategori", (req, res) => {
//   res.send(
//     `id produk : ${req.params.id} </br> kategori : ${req.params.kategori} `
//   );
// });

// app.get("/waifu/:id", (req, res) => {
//   res.send(`waifu ke-${req.params.id}, ${req.query.nama}`);
// });

// middleware terakhir
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
