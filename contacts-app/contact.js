const fs = require("fs");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

const folder = "./data";

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

const filePath = "./data/contacts.json";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const pertanyaan = (question) => {
  return new Promise((resolve, rejects) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

function menyimpanData(id, nama, email, noHP) {
  const contact = { id, nama, email, noHP };
  const file = fs.readFileSync(filePath, "utf8");
  const contacts = JSON.parse(file);

  contacts.push(contact);

  fs.writeFileSync(filePath, JSON.stringify(contacts));

  console.log("terimakasih sudah memasukkan data");

  rl.close();
}

module.exports = { pertanyaan, menyimpanData };
