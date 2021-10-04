#! /usr/bin/env node

// Declare Const
const cron = require('node-cron')
const chalk = require('chalk')
const simpleGit = require('simple-git')
const git = simpleGit()
const Table = require('cli-table')

let gitValue = 0
/**
 * For run aplication
 *
 **/
async function running(option) {
    let now = new Date()
    console.log(chalk.green('Starting AutoBot development server : ' + now))
    cron.schedule('*/30 * * * *', async () => {
        now = new Date()
        await gitBot(option)
        console.log(chalk.blue('Active date : ' + now))
        console.log('Running a task every minute, with message ' + option.message + ' - ' + now);
    })
}

async function gitBot(option) {
    let gitStatus = await git.status('-s')
    if(gitStatus.modified.length != 0 && gitValue === 0)
    {
        console.log('\nConnecting to your repository, Please wait')
        table(gitStatus)
        gitValue++
        commit(await git.add('./*').commit(option.message))
        let branch = await git.branch()
        await git.pull('origin', branch.current)
        await git.push('origin', branch.current)
        gitValue = 0
    }
}

async function commit(value) {
    console.log(chalk.red('\nYour commit successfull'))
    console.log('Status changes : ' + chalk.green(value.summary.changes))
    console.log('Status insertions : ' + chalk.green(value.summary.insertions))
    console.log('Status deletions : ' + chalk.green(value.summary.deletions) + '\n')
}

async function table(git) {
    let table = new Table({
        head: ['Status', 'Index', 'Path'],
        colWidths: [20, 20, 50],
        chars: {
            'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗',
            'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝',
            'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼',
            'right': '║' , 'right-mid': '╢' , 'middle': '│'
        }
    })

    git.files.forEach(function(item){
        table.push([item.working_dir, item.index, item.path])
    })
    console.log(table.toString())
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
