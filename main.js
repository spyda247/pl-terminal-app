#!/usr/bin/env node

const fs = require('node:fs');
const prompt = require('prompt-sync')({ sigint: true });
const products = [];

function createProduct() {
  const prod_name = prompt('Product Name? ');
  const cost_price = prompt('Cost Price? ');
  const unit_price = prompt('Unit Price? ');
  const qty = prompt('Quantity? ');

  let product = {
    prod_name,
    cost_price,
    unit_price,
    qty,
  };
  products.push(product);

  const ans = prompt('Print report? Y/N ');
  ans === 'Y' ? printReport(products) : createProduct();
}

function getReport(product) {
  const TAX = 0.75;
  const EXP = 150000;

  const revenue = (unit_price, qty) => unit_price * qty;
  const grossProfit = (unit_price, cost_price, qty) =>
    (unit_price - cost_price) * qty;
  const netProfit = (grossProfit, TAX, EXP) =>
    grossProfit - (grossProfit - EXP) * TAX;
  const convertToDecimalPlace = (num, precision = 3) => num.toFixed(precision);
  report = `
    Product Name: ${product.prod_name}
    Cost Price: ${product.cost_price}
    Sales: Price: ${product.unit_price}
    Quantity: ${product.qty}
    Revenue: ${convertToDecimalPlace(revenue(product.unit_price, product.qty))}
    Gross Profit: ${convertToDecimalPlace(
      grossProfit(product.unit_price, product.cost_price, product.qty)
    )} 
    Net Profit: ${convertToDecimalPlace(
      netProfit(
        grossProfit(product.unit_price, product.cost_price, product.qty),
        TAX,
        EXP
      )
    )}
    ---------------------------------
      `;

  return report;
}

function printReport(products) {
  products.forEach((product) => {
    const report = getReport(product);
    try {
      fs.writeFileSync('./report.txt', report, { flag: 'a+' });
      console.log('\nWrote file: report.txt');
    } catch (err) {
      console.error(err);
    }
  });
  process.exit();
}

createProduct();
