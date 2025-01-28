const express = require('express')
const app = express()


const TASKS = [
{
    id: 1,
    title: 'Title 1',
    completed: true
},
{
    id: 2,
    title: 'Title 2',
    completed: true
},{
    id: 3,
    title: 'Title 3',
    completed: true
},{
    id: 4,
    title: 'Title 4',
    completed: false
},{
    id: 5,
    title: 'Title 5',
    completed: true
},{
    id: 6,
    title: 'Title 6',
    completed: false
},

];


function createTask(title, completed) {
    const id = TASKS[TASKS.length -1].id + 1;
    const task = {
        id,
        title,
        completed
    };
    TASKS.push(task);
    return task;
}

function updateTask(title, completed, taskId) {
    const index = TASKS.findIndex(task => task.id == taskId);
    if(index === -1) return null;
    
    TASKS[index] = {
        id: TASKS[index].id,
        completed,
        title,
    }
    return TASKS[index];
}

function deleteTask(taskId) {
    const index = TASKS.findIndex(task => task.id == taskId);
    if(index === -1) return null;

    TASKS.splice(index, 1);
}

app.get('/', (req, res) => {
    return res.json(TASKS);
})

app.post('/', (req, res) => {
    const { title, completed } = req.body;
    if(!title || title == "") return res.status(400).json({message: 'Title should be provided'});
    if(completed == undefined || typeof completed !== 'boolean') return res.status(400).json({message: 'completed should be provided and a boolean value'})
    const task = createTask(title, completed);
    res.status(201).json(task);
})

app.put('/:id', (req, res) => {
    const { title, completed } = req.body;
    if(!title || title == "") return res.status(400).json({message: 'Title should be provided'});
    if(completed == undefined || typeof completed !== 'boolean') return res.status(400).json({message: 'completed should be provided and a boolean value'})
    
    const taskId = req.params.id;
    const task = updateTask(title, completed, taskId)
    if(!task) return res.status(404).json({message: 'Task not found'})
    

    
    res.status(200).json(task);
})

app.delete('/:id', (req, res) => {
    deleteTask(req.params.id);
    res.status(204).send();
})

module.exports = app;