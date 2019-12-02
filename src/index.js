const priceRules = require('../lib/priceRule');
const Checkout = require('../lib/checkout');
const fs = require('fs'),
      path = require('path'),      
      moment = require('moment'),
      streamWrite = fs.createWriteStream(path.join(__dirname,'../resource/output/'+new Date().toISOString().slice(0,10).replace(/-/g,"")+'.txt'),{
      	flags: 'a'
      });

// Test the functions and results
const cart = new Checkout(priceRules);

// result 1: 
cart.scan('atv');
cart.scan('atv');
cart.scan('atv');
cart.scan('vga');
let checkoutTotal = cart.total();
let allItems = cart.getAllItems();
cart.reset();
console.log('------------------------');

streamWrite.write(moment().format('YYYY-MM-DD-H-mm-s')+' :' + allItems+"\r\n")
streamWrite.write(moment().format('YYYY-MM-DD-H-mm-s')+' :' + ' $' + checkoutTotal+"\r\n")
streamWrite.write(Array(50).join('-')+"\r\n")		

// result 2: 
cart.scan('atv');
cart.scan('ipd');
cart.scan('ipd');
cart.scan('atv');
cart.scan('ipd');
cart.scan('ipd');
cart.scan('ipd');
checkoutTotal = cart.total();
allItems = cart.getAllItems();
cart.reset();
console.log('------------------------');
streamWrite.write(moment().format('YYYY-MM-DD-H-mm-s')+' :' + allItems+"\r\n")
streamWrite.write(moment().format('YYYY-MM-DD-H-mm-s')+' :' + ' $' + checkoutTotal+"\r\n")
streamWrite.write(Array(50).join('-')+"\r\n")			

// result 3: 
cart.scan('mbp');
cart.scan('vga');
cart.scan('ipd');
checkoutTotal = cart.total();
allItems = cart.getAllItems();
cart.reset();
streamWrite.write(moment().format('YYYY-MM-DD-H-mm-s')+' :' + allItems+"\r\n")
streamWrite.write(moment().format('YYYY-MM-DD-H-mm-s')+' :' + ' $' + checkoutTotal+"\r\n")
streamWrite.write(Array(50).join('-')+"\r\n")	
