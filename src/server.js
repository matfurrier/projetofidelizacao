const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const URL = process.env.MONGODB_URI;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
requireDir('./models')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'njk');

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})

app.use('/', require('./controllers/routes'))
app.listen(process.env.PORT || 3333);