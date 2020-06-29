const express = require('express')
const routes = express.Router()

const videos = require('./data')
const about = require('./info')
const video = require('./video')
const teachers = require('./teachers')

// Rotas
routes.get('/', function(req, res) {
    return res.render('about', {about})
})



routes.get('/portfolio', function(req, res) {
    return res.render('portfolio', {items: videos})
})



routes.get('/video', video.show)



routes.get('/teachers', function(req, res) {
    return res.render('teachers/index')
})

routes.get('/teachers/create', function(req, res){
    return res.render('teachers/create')
})

routes.post('/teachers', teachers.post)

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)



routes.get('/students', function(req, res){
    return res.render('students/index')
})



module.exports = routes