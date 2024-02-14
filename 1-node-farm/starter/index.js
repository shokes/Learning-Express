const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// import url from 'url';
//import { replaceTemplate } from './modules/replaceTemplate.js';

// FILES

// blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = `this is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('file written!');

// non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('your file has been written ');
//       });
//     });
//   });
// });

// console.log('will read file!');

// SERVER

const templateOverview = fs.readFileSync('./templates/overview.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/product.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/card.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

console.log(slugify('Fresh Avocados', { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //const pathName = req.url;

  // overview page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    console.log(cardsHtml);

    res.end(output);

    // product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  // api
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }

  // not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>this page can not be found </h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
});
