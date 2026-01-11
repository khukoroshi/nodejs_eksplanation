const http = require("http");
const fs = require("fs");

const port = 3000;

function fileHtml(link, res) {
  fs.readFile(link, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error : file not found");
    } else {
      res.write(data);
    }
    res.end();
  });
}

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const url = req.url;
    switch (url) {
      case "/about":
        fileHtml("./about.html", res);
        break;
      case "/contact":
        fileHtml("./contact.html", res);
        break;
      default:
        fileHtml("./index.html", res);
        break;
    }
  })
  .listen(port, () => {
    console.log(`server is listening in port ${port}...`);
  });
