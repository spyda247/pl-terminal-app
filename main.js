#!/usr/bin/env node

const fs = require('node:fs');
const prompt = require('prompt-sync')({ sigint: true });
const products = [];

function createProduct() {
  const prod_name = prompt('Product Name? ');
  const cost_price = Number(prompt('Cost Price? '));
  const unit_price = Number(prompt('Unit Price? '));
  const qty = Number(prompt('Quantity? '));

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
  const TAXRATE = 0;
  const EXP = 150000;

  const calculateRevenue = (unit_price, qty) => unit_price * qty;
  const calculateGrossProfit = (revenue, COGS) => revenue - COGS;
  const calculateNetProfit = (grossProfit, TAX, EXP) =>
    grossProfit - (TAX + EXP);
  const convertToDecimalPlace = (num, precision = 3) => num.toFixed(precision);

  const COGS = product.cost_price * product.qty; // Cost of goods sold
  const revenue = calculateRevenue(product.unit_price, product.qty);
  const grossProfit = calculateGrossProfit(revenue, COGS);
  const grossProfitMargin = (grossProfit / revenue) * 100;
  const TAX = grossProfit * TAXRATE;
  const netProfit = calculateNetProfit(grossProfit, TAX, EXP);

  report = `
    Product Name: ${product.prod_name}
    Cost Price: ${convertToDecimalPlace(product.cost_price)}
    Sales: Price: ${convertToDecimalPlace(product.unit_price)}
    Quantity: ${convertToDecimalPlace(product.qty)}
    Revenue: ${convertToDecimalPlace(revenue)}
    Gross Profit: ${convertToDecimalPlace(grossProfit)}
    Gross Profit Margin: ${convertToDecimalPlace(grossProfitMargin, 1)}%
    Net Profit: ${convertToDecimalPlace(netProfit)}
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
