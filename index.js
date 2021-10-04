#! /usr/bin/env node

const { running, gitTest  } = require('./src/command.js')
const { program } = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

/**
 * This main function for show all command
 */
async function main() {
    program
        .command('run')
        .description(
          'Use run for autobot'
        )
        .option('-m, --message <string>', 'Add message with optional type')
        .action(running)
     program
        .command('test')
        .description(
          'Use testing function'
        )
        .option('-g, --git <string>', 'Use status, add, pull, or push if you want testing')
        .action(gitTest)

    console.log('')
    console.log(chalk.red(figlet.textSync("\nAutoBot Git", { font: 'ANSI Shadow', horizontalLayout: 'full' })))
    console.log(`Welcome to the AutoBot! 🔥 🔥 🔥`)
    program.parse(process.argv)
}

main()
