const express = require('express')
const tasksController = require('./tasks/task.controller');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/tasks', tasksController);

module.exports = app;