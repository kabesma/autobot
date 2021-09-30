#! /usr/bin/env node

// Declare Const
const cron = require('node-cron')
const chalk = require('chalk')
const simpleGit = require('simple-git')
const git = simpleGit()
const Table = require('cli-table')

let gitValue = 0;
/**
 * For run aplication
 *
 **/
async function running(option) {
    let now = new Date()
    console.log(chalk.green('Starting AutoBot development server : ' + now))
    cron.schedule('*/20 * * * * *', async () => {
        now = new Date()
        await gitBot(option)
        console.log(chalk.blue('Active date : ' + now))
        console.log('Running a task every minute, with message ' + option.message);
    })
}

async function gitBot(option) {
    let gitStatus = await git.status('-s')
    //console.log(gitStatus.modified.length)
    if(gitStatus.modified.length != 0 && gitValue === 0)
    {
        console.log('\nConnecting to your repository, Please wait')
        table(gitStatus)
        gitValue++
        console.log(await git.add('./*').commit(option.message))
        if(typeof(option.branch) === 'undefined') {
            console.log(await git.push())
        } else {
            console.log(await git.push('origin', option.branch))
        }
    }
}

async function table(git) {
    let table = new Table({
        head: ['Status', 'Index', 'Path'],
        colWidths: [30, 30, 30],
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

module.exports = {
    running,
}
