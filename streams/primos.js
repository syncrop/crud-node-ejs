const path = require('path');
const fs = require('fs');
const { Stream } = require('stream');

const filePath1 = path.join(__dirname, `./primos.txt`);
const writeStream = fs.createWriteStream(filePath1);
const readStream = fs.createReadStream(filePath1);

const primos = limit => {
    let array = [];
    for (let index = 0; index < limit; index++) {
        if (esPrimo(index)) {
            array = [...array, index]
        }
    }
    return array
}

const esPrimo = numero => {
    if (numero == 0 || numero == 1 || numero == 4) return false;
    for (let i = 2; i < numero / 2; i++) {
        if (numero % i == 0) return false;
    }
    return true;
}

writeStream.on('open', chunk => {
    chunk = chunk.toString();
    const p = primos(10000000).toString()
    writeStream.write(p);
});

writeStream.on('close', chunk => {
    // Send a success response back to the client
    const msg = `Data uploaded to ${filePath1}`;
    console.log('Processing  ...  100%');

});

writeStream.on('error', err => {
    // Send an error message to the client
    console.error(err);
});