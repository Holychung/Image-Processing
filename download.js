'use strict';
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const sharp = require('sharp');

function isImage(type) {
  return /image*/.test(type);
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ )
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  
  return result;
}

async function downloadFile(fileUrl, fileName) {
  if (!fileUrl || !fileName) // null, undefined, empty string
    return Promise.reject('Invalid argument');

  const filename = generateString(20) + '.jpg';
  const tmpPath = Path.resolve(__dirname, 'tmp', filename);
  const writer = Fs.createWriteStream(tmpPath);
  return await Axios({
    method: 'GET',
    url: fileUrl,
    responseType: 'stream'
  }).then(response => {
    return new Promise((resolve, reject) =>{
      if (!isImage(response.headers['content-type']))
        reject();

      response.data.pipe(writer);
      writer.on('error', err => {
        writer.close();
        reject();
      });
      writer.on('finish', async () => {
        const outputPath = Path.resolve(__dirname, 'img', fileName);
        await sharp(tmpPath)
          .flip() // Y axis
          .flop() // X axis
          .toFile(outputPath)
          .then(() => { resolve('Success'); })
          .catch(err => { reject(); });
      });
    }).catch((error) => {
      return Promise.reject('Error');
    });
  });
}

function cleanDir() {
  try {
    const dirList = ["img", "tmp"];
    dirList.forEach((dir) => {
      Fs.readdir(dir, (err, files) => {
        if (err) 
          throw err;

        for (const file of files) {
          if (/\*.jpg/.test(file)) {
            Fs.unlink(Path.join(dir, file), err => {
              if (err)
                throw err;
            });
          }
        }
      });
    });

    return "Directory cleaning successfully";
  } catch (err) {
    return "Error: " + err;
  }
}

module.exports = {
  downloadFromUrl: (fileUrl, filePath) => {
    return downloadFile(fileUrl, filePath);
  },
  cleanDir: () => { return cleanDir(); }
};