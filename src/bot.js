#! /usr/bin/env node
const {commit, table} = require('./result.js') 
const simpleGit = require('simple-git')
const git = simpleGit()
let gitValue = 0

async function bot(option) {
    console.log('this is bot')
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

module.exports = {
    bot
}
