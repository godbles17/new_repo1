import inquirer from 'inquirer';
import sillyname from 'sillyname';
import { randomSuperhero } from 'superheroes';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your name?\n',
    },
  ])
  .then((answers) => {
    const userName = answers.username;
    const villainName = sillyname();
    const heroName = randomSuperhero();
    
    console.log(`\nHello ${userName}`);
    console.log(`Your villain name will be ${villainName}`);
    console.log(`Your superhero name will be ${heroName}\n`);

    generateQRCode(userName, `${userName}.png`);
    generateQRCode(villainName, `${villainName}.png`);
    generateQRCode(heroName, `${heroName}.png`);

    const outputText = `User Name: ${userName}\nVillain Name: ${villainName}\nSuperhero Name: ${heroName}\n\n`;
    fs.writeFileSync('myhero.txt', outputText, { flag: 'a', encoding: 'utf8' });

    console.log('QR codes are generated');
    console.log('Text file updated: myhero.txt');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });

function generateQRCode(text, filename) {
  const qrCode = qr.image(text, { type: 'png' });
  qrCode.pipe(fs.createWriteStream(filename));
}
