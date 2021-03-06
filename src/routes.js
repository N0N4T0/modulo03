const express = require('express')
const routes = express.Router()

const videos = require('./app/data')
const about = require('./app/info')
const video = require('./app/video')
const teachers = require('./app/controllers/teachers')
const students =require('./app/controllers/students')

// Rotas
routes.get('/', function(req, res) {
    return res.render('about', {about})
})



routes.get('/portfolio', function(req, res) {
    return res.render('portfolio', {items: videos})
})



routes.get('/video', video.show)



routes.get('/teachers', teachers.index)
routes.get('/teachers/create', teachers.create)
routes.post('/teachers', teachers.post)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.put('/teachers', teachers.put)
routes.delete('/teachers', teachers.delete)



routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.post('/students', students.post)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.put('/students', students.put)
routes.delete('/students', students.delete)



module.exports = routes