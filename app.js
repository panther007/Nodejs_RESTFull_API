const express = require('express');
const bodyParser = require('body-parser');
const appHandlr = require('./app/app-handlr');
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

appHandlr(app);

const server = app.listen(port, (err) => {
    if(err) return console.log('Error : ${err}');

    console.log(`Server started on port ${server.address().port}`);
});