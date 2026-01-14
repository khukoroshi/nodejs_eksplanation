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

function findContact(nohp) {
  const contacts = loadContacts();
  const contact = contacts.find((c) => c.nohp === nohp);

  return contact;
}

export { loadContacts, findContact };
