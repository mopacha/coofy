"use strict";

const chalk = require('chalk');

const figlet = require('figlet');

module.exports = () => {
  console.log(chalk.blue(figlet.textSync('cooL', {
    font: 'Slant',
    horizontalLayout: 'full',
    verticalLayout: 'full'
  })));
};