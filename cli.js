// var readline = require('readline');
// var util = require('util');
// var debug = util.debuglog('cli');
// var events = require('events');

// class _events extends events { }
// var e = new _events();

var cli = {};

cli.horizontalLine = function () {
    const width = process.stdout.columns;
    let line = '';
    for (let i = 0; i < width; i++) {
        line += '-';
    }
    console.log(line);
}

cli.centerText = function (str) {
    const width = process.stdout.columns;
    const leftPadding = Math.floor((width - str.length) / 2)
    let line = '';
    for (let i = 0; i < leftPadding; i++) {
        line += ' ';
    }
    line += str;
    console.log(line);
}

cli.paddingAfterTitle = function (str) {
    const screenWidth = process.stdout.columns;
    return Math.floor((screenWidth * 3/4 - str.length));
}

async function apiCall() {
        console.time('Time to get data from api and filter result as per need');
        console.log('Getting data for 1st 20 even todo from https://jsonplaceholder.typicode.com/todos');
        const data = await fetch('https://jsonplaceholder.typicode.com/todos');
        let response = await data.json();
        response = response.slice(0, 40).filter((data, index) => index % 2 === 0 ? null : data)
        console.timeEnd('Time to get data from api and filter result as per need');

        console.time('Time to print formatted data');
        
        console.log('\n');
        cli.centerText('Response From Api')
        cli.horizontalLine();

        const title = 'Title';
        const isCompleted = 'Completed';
        let headerLine = title;
        for (let i = 0; i < cli.paddingAfterTitle(title); i++) {
            headerLine += ' ';
        }
        headerLine += isCompleted;
        console.log(headerLine);
        cli.horizontalLine();

        for (let i = 0; i < response.length; i++) {
            // console.log(`${response[i].title} ${response[i].completed}\n`);
            const title = response[i].title;
            const isCompleted = response[i].completed;
            let line = title;
            for (let i = 0; i < cli.paddingAfterTitle(title); i++) {
                line += ' ';
            }
            line += isCompleted;
            console.log(line);
        }

        cli.horizontalLine();
        console.log('\n');
        console.timeEnd('Time to print formatted data');
}

// initialize
// TODO: can customise for getting dynamic input using readline for numbers like 20 and which index like even, odd or all.
cli.init = function () {
    console.log('CLI is running');
    apiCall();
    // var _interface = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //     prompt: '>'
    // })

    // _interface.prompt();

    // _interface.on('line', async function (str) {
    //     // cli.processInput(str);
    //     // _interface.prompt();
        

    //     process.exit(0);
    // })

    // _interface.on('close', function () {
    //     process.exit(0);
    // })
}

module.exports = cli;
