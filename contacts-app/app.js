// contacts-app
const { pertanyaan, menyimpanData } = require("./contact");
const main = async () => {
  const nama = await pertanyaan("Masukkan nama anda: ");
  const email = await pertanyaan("Masukkan email anda: ");
  const noHP = await pertanyaan("Masukkan Nomer HP anda: ");
  const id = Date.now();
  menyimpanData(id, nama, email, noHP);
};

main();
