#! /usr/bin/env node

const { running  } = require('../src/command.js')
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
          'Use run for running bot'
        )
        .option('-m, --message <string>', 'Add message with optional type')
        .option('-b, --branch <string>', 'Push to branch option')
        .action(running)

    console.log('')
    console.log(chalk.red(figlet.textSync("\nAutoBot Git", { font: 'ANSI Shadow', horizontalLayout: 'full' })))
    console.log(`Welcome to the AutoBot! 🔥 🔥 🔥`)
    program.parse(process.argv)
}

main()
