import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { menyimpanData } from "./contact.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Alamat email",
        type: "string",
      },
      noHP: {
        describe: "Nomor HP",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      menyimpanData(argv.nama, argv.email, argv.noHP);
    },
  })
  .strict()
  .help()
  .version()
  .parse();
