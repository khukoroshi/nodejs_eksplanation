import fs from "fs";

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

// untuk data JSON
function loadContacts() {
  const file = fs.readFileSync(filePath, "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
}

// untuk menampilkan detail contact
const findContact = (nohp) => {
  const contacts = loadContacts();
  const contact = contacts.find((c) => c.nohp === nohp);

  return contact;
};

// menulis atau menimpa data
function saveContact(contact) {
  fs.writeFileSync(filePath, JSON.stringify(contact, null, 2));
}

// menambahkan data contact
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContact(contacts);
};

const cekDuplikat = (nohp) => {
  // cek duplikat no HP
  const contacts = loadContacts();
  const duplikat = contacts.find((c) => c.nohp === nohp);
  return duplikat;
};

export { loadContacts, findContact, addContact, cekDuplikat };
