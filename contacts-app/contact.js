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

// untuk membuat command yang italic
function italicComand(command) {
  const a = chalk.italic(command);
  return `(${a})`;
}

// untuk data JSON
function loadContacts() {
  const file = fs.readFileSync(filePath, "utf8");
  const contacts = JSON.parse(file);
  return contacts;
}

// untuk menambahkan data
function menyimpanData(nama, email, noHP) {
  const contact = { nama, email, noHP };

  const contacts = loadContacts();

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

// untuk menampilkan list data
function listContacts() {
  const contacts = loadContacts();
  console.log(chalk.cyan.inverse.bold("List Contacts"));
  // console.log(contacts);
  contacts.forEach((list, i) => {
    console.log(`${i + 1}. ${list.nama} - ${list.noHP}`);
  });
}

function detailContact(noHP) {
  const contacts = loadContacts();

  const contact = contacts.find((c) => c.noHP === noHP);

  if (!contact) {
    console.log(chalk.red.inverse.bold(`Nomer ${noHP} tidak ditemukan`));
    return;
  }

  console.log(`Nama: ${contact.nama}`);
  if (contact.email) {
    console.log(`Email: ${contact.email}`);
  }
  console.log(`Nomer HP: ${contact.noHP}`);
}

function deleteContact(noHP) {
  const contacts = loadContacts();
  const newContacts = contacts.filter((contact) => contact.noHP !== noHP);

  if (newContacts.length === contacts.length) {
    console.log(chalk.red.inverse.bold(`Nomer ${noHP} tidak ditemukan`));
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(newContacts));

  console.log(chalk.bgGreen.black.bold(`Nomer ${noHP} berhasil dihapus`));
}

export {
  menyimpanData,
  listContacts,
  detailContact,
  deleteContact,
  italicComand,
};
