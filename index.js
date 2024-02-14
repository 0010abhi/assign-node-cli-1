var cli = require('./cli');

var app = {};

app.init = function () {
    cli.init();
}

app.init();

module.exports = app;