import fs from "fs";
import validator from "validator";
import chalk from "chalk";

const folder = "./data";
const filePath = "./data/contacts.json";

// pastikan folder ada
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

// pastikan file ada
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

function menyimpanData(nama, email, noHP) {
  const contact = { nama, email, noHP };

  const file = fs.readFileSync(filePath, "utf8");
  const contacts = JSON.parse(file);

  // cek duplikat no HP
  const duplikat = contacts.find((c) => c.noHP === noHP);
  if (duplikat) {
    console.log(
      chalk.bgRed.black.bold(
        "Nomor HP sudah terdaftar, silakan gunakan nomor lain"
      )
    );
    return;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.bgRed.black.bold("Email tidak terdefinisi, coba ulangi")
      );
      return;
    }
  }

  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(
      chalk.bgRed.black.bold(
        "Nomer HP tidak di kenali, contoh: (08**********), indonesia format"
      )
    );
    return;
  }

  contacts.push(contact);
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

  console.log(chalk.bgGreen.black.bold("Terima kasih, data berhasil disimpan"));
}

export { menyimpanData };
