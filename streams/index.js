
// Load the necessary modules and define a port
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const http = require("http");


const server = http.createServer();


// Add a basic route to check if server's up
// app.get('/', (req, res) => {
//     // const buffer = Buffer.from('./image.jpg');
    
//     const readStream = fs.createReadStream(path.join(__dirname, `/image.jpg`));

//     // fs.createReadStream(buffer).pipe(res);
//     readStream.on('open', chunk => {
//         console.log('---------------------------------');
//         console.log(chunk);
//         console.log(chunk.length)
//         console.log('---------------------------------');
//     });

//     readStream.on('open', () => {
//         console.log('Stream opened...');
//     });

//     readStream.on('end', () => {
//         console.log('Stream Closed...');
//     });
// });

app.post('/mayus', (req, res,) => {
    const filePath1 = path.join(__dirname, `./doc.txt`);
    // const filePath2 = path.join(__dirname, `./dataMayus.txt`);
    const writeStream = fs.createWriteStream(filePath1);
    const writeStream2 = fs.createWriteStream(filePath1);
    const readStream = fs.createReadStream(filePath1);
    

    // req.pipe(writeStream);   

    writeStream.on('open', chunk => {
        chunk = chunk.toString();
        console.log(chunk);
        // writeStream.write(chunk);
        req.pipe(writeStream)
    });
    readStream.on('data', chunk => {
        chunk = chunk.toString().toUpperCase();
        console.log(chunk)
        writeStream2.write(chunk);
        req.pipe(writeStream2)
    });


    // writeStream.on('drain', chunk => {
    //     // Calculate how much data has been piped yet
    //     const written = parseInt(writeStream.bytesWritten);
    //     const total = parseInt(req.headers['content-length']);
    //     const pWritten = (written / total * 100).toFixed(2)
    //     console.log(`Processing  ...  ${pWritten}% done`);
        
    // });

    writeStream.on('close', chunk => {
        // Send a success response back to the client
        const msg = `Data uploaded to ${filePath1}`;
        console.log('Processing  ...  100%');
        console.log(msg);
        res.status(200).send({ status: 'success', msg });
    });

    // stream.on('error', err => {
    //     // Send an error message to the client
    //     console.error(err);
    //     res.status(500).send({ status: 'error', err });
    // });
});

app.get('/primos/:n', (req, res,) => {
    const n = req.params.n;
    const filePath1 = path.join(__dirname, `./primos.txt`);
    const writeStream = fs.createWriteStream(filePath1);

    const primos = limit => {
        let array = [];
        for (let index = 0; index < limit; index++) {
            if(esPrimo(index)){
                array = [...array, index];
            }
            // process.nextTick();
        }
        return array
    }
    
    const esPrimo = numero => {
        if(numero == 0 || numero == 1 || numero == 4) return false;
        for (let i = 2; i < Math.sqrt(numero); i++) {
            if(numero % i == 0) return false;
        }
        return true;
    }

    writeStream.on('open', chunk => {
        chunk = chunk.toString();
        const p = primos(n).toString()
        writeStream.write(p);
        req.pipe(writeStream)
    });

    writeStream.on('error', err => {
        // Send an error message to the client
        console.error(err);
    });

    writeStream.on('close', chunk => {
        // Send a success response back to the client
        const msg = `Data uploaded to ${filePath1}`;
        console.log('Processing  ...  100%');
        console.log(msg);
        res.status(200).send({ status: 'success', msg });
    });
})

// Mount the app to a port
app.listen(port, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});