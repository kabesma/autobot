const chalk = require('chalk')
const Table = require('cli-table')


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

module.exports = {
    commit,
    table
}
