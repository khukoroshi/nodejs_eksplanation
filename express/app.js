import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
  // res.send("ini halaman utama");
  // res.json({
  //   nama: "haikal",
  //   umur: 18,
  //   noHP: "083865109551",
  // });
  const options = {
    root: path.join(__dirname, "includes"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  const fileName = "index.html";

  // res.sendFile("index.html");
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.get("/about", (req, res) => {
  const options = {
    root: path.join(__dirname, "includes"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  const fileName = "about.html";

  // res.sendFile("index.html");
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.get("/contact", (req, res) => {
  const options = {
    root: path.join(__dirname, "includes"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  const fileName = "contact.html";

  // res.sendFile("index.html");
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.get("/product/:id/kategori/:kategori", (req, res) => {
  res.send(
    `id produk : ${req.params.id} </br> kategori : ${req.params.kategori} `
  );
});

app.get("/waifu/:id", (req, res) => {
  res.send(`waifu ke-${req.params.id}, ${req.query.nama}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});

// // const http = require("http");
// // const fs = require("fs");
// import http from "http";
// import fs from "fs";

// const port = 3000;

// function fileHtml(link, res) {
//   fs.readFile(link, "utf-8", (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("Error : file not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// }

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     const url = req.url;
//     switch (url) {
//       case "/about":
//         fileHtml("./about.html", res);
//         break;
//       case "/contact":
//         fileHtml("./contact.html", res);
//         break;
//       default:
//         fileHtml("./index.html", res);
//         break;
//     }
//   })
//   .listen(port, () => {
//     console.log(`server is listening in port ${port}...`);
//   });
