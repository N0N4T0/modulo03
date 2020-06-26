const express = require('express')
const routes = express.Router()

const videos = require('./data')
const about = require('./info')

const teachers = require('./teachers')

// Rotas
routes.get('/', function(req, res) {
    return res.render('about', {about})
})


routes.get('/portfolio', function(req, res) {
    return res.render('portfolio', {items: videos})
})


routes.get('/video', function(req, res) {
    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send('Video not found!')
    }
    
    return res.render('video', {item: video})
})


routes.get('/teachers', function(req, res) {
    return res.render('teachers/index')
})

routes.get('/teachers/create', function(req, res){
    return res.render('teachers/create')
})

routes.post('/teachers', teachers.post)


routes.get('/students', function(req, res){
    return res.render('students/index')
})

module.exports = routes