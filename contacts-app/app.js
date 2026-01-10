import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import {
  deleteContact,
  detailContact,
  italicComand,
  listContacts,
  menyimpanData,
} from "./contact.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: italicComand("Menambahkan Contact Baru"),
    builder: {
      nama: {
        describe: italicComand("Nama Lengkap"),
        demandOption: true,
        type: "string",
      },
      email: {
        describe: italicComand("Alamat Email"),
        type: "string",
      },
      noHP: {
        describe: italicComand("Nomer HP"),
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      menyimpanData(argv.nama, argv.email, argv.noHP);
    },
  })
  .command({
    command: "list",
    describe: italicComand("Menampilkan list data Contact"),
    handler() {
      listContacts();
    },
  })
  .command({
    command: "detail",
    describe: italicComand("Menampilkan Data berdasarkan Nomer HP"),
    builder: {
      noHP: {
        describe: italicComand("Nomer HP"),
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.noHP);
    },
  })
  .command({
    command: "delete",
    describe: italicComand("Menghapus contact berdasarkan Nomer HP"),
    builder: {
      noHP: {
        describe: italicComand("Nomer HP"),
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteContact(argv.noHP);
    },
  })
  .demandCommand()
  .strict()
  .help()
  .version()
  .parse();
