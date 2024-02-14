// const fs = required('fs');
import fs from 'fs';
import crypto from 'crypto';

setTimeout(() => {
  console.log('Timer 1 is done!');
}, 0);

setImmediate(() => {
  console.log('Immediate 1 is executed!');
});

fs.readFile('starter/test-file.txt', () => {
  console.log('I/O finished!');

  console.log('-------------------');

  setTimeout(() => {
    console.log('Timer 3 is done!');
  }, 0);

  setTimeout(() => {
    console.log('Timer 3 is done!');
  }, 3000);

  setImmediate(() => {
    console.log('Immediate 2 is executed!');
  });

  process.nextTick(() => {
    console.log('Process.nextTick');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('Password encrypted!');
  });
});

console.log('Hello from the top-level code!');
