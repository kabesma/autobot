const { commit, table } = require('./result.js') 
const simpleGit = require('simple-git')
const git = simpleGit()
const path = require('path')
const config = require('yaml-config')

let relative = require.resolve('../autobots.yaml')
let settings = config.readConfig(relative)

async function bot(option) {
    let gitStatus = await git.status('-s')
    if(gitStatus.modified.length != 0)
    {
        console.log('\nConnecting to your repository, Please wait')
        table(gitStatus)
        let message = option.message;
        if(message === undefined){
            message = settings.message[Math.floor(Math.random() * (settings.message.length - 1))]
        }
        console.log(message)
        commit(await git.add('./*').commit(message))
        let branch = await git.branch()
        await git.pull('origin', branch.current)
        await git.push('origin', branch.current)
    }
}

module.exports = {
    bot
}
