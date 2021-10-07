#! /usr/bin/env node

// Declare Const
const { bot } = require('./bot.js')
const cron = require('node-cron')
const chalk = require('chalk')

/**
 * For run aplication
 *
 **/
async function running(option) {
    let now = new Date()
    let message
    console.log(chalk.green('Starting AutoBot development server : ' + now))
    cron.schedule('* * * * *', async () => {
        now = new Date()
        message = await bot(option)
        console.log(chalk.blue('Active date : ' + now))
        console.log('Running a task, with message ' + message + ' - ' + now);
    })
}

async function gitTest(option){
    if (option.git === 'status')
    {
        let gitStatus = await git.status('-s')
        console.log('\nConnecting to your repository, Please wait')
        table(gitStatus)
    }

    if (option.git === 'add')
    {
        commit(await git.add('./*').commit('Testing git add and commit'))
    }

    if (option.git === 'pull')
    {
        let branch = await git.branch()
        console.log(await git.pull('origin', branch.current))
    }

    if (option.git === 'push')
    {
        let branch = await git.branch()
        console.log(await git.push('origin', branch.current))
    }
}

module.exports = {
    running,
    gitTest
}
