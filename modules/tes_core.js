// testing core module
// file system

const fs = require('fs');

// console.log(fs);

// menulis ke file
// fs.writeFileSync('data/testingSync.txt', 'ini menulis file secara synronus');
// fs.writeFile('data/testing.txt', 'ini menulis file secara asyncronus', (err) => {
//   console.log(err);
// });

// membaca file
// const dataSync = fs.readFileSync('data/testingSync.txt', 'utf-8');
// const data = fs.readFile('data/testing.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log(dataSync)
// console.log(data)

let file_json = [

]


const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Siapa namamu? ', (nama) => {
  rl.question('Berapa umur mu? ', (umur)=> {
    rl.question('Masukkan Nomer HP : ', (noHP) =>{
      const contact = {nama, umur, noHP}
      const file = fs.readFileSync('data/contents.json', 'utf8');
      const contacts = JSON.parse(file);

      contacts.push(contact);

      fs.writeFileSync('data/contents.json', JSON.stringify(contacts));

      console.log('terimakasih sudah memasukkan data');
      
      rl.close();
    });
  });
});



