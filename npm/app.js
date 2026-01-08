const fs = require('fs');
const readline = require('readline');

const validator = require('validator');

const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });


rl.question('Alamat Email : ', (email) => {
  rl.question('Umur : ', (umur) => {
    rl.question('NoHP : ', (noHP) => {
      const nEmail = validator.isEmail(email);
      const nUmur = validator.isNumeric(umur);
      const nNoHP = validator.isMobilePhone(noHP, 'id-ID');
      console.log(nEmail, nUmur, nNoHP)
      if(!nEmail | !nUmur | !nNoHP){
        
        const errorMassage = `Maaf sepertinya email/umur/nomer HP salah format, Umur dan nomer HP harus angka, nomer hp Indonesia`;
        console.log(errorMassage);

      }else{
        
        const data = {
          email, umur, noHP
        }
        const pData = fs.readFileSync('data.json', 'utf8');
        const datas = JSON.parse(pData);
        datas.push(data);
  
        fs.writeFileSync('data.json', JSON.stringify(datas));
        const massage = `data berhasil di simpan datamu: ${email}, ${umur}, ${noHP}`
        console.log(massage)
      }

      rl.close();
    });
    
  });

});
