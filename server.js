const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})


// Rotas
server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
        name: "Rocketseat",
        role: "Company",
        description: "Plataforma de educação em tecnologia",
        links: [
            {
                name: "Github",
                url: "https://github.com/Rocketseat"
            },
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/school/rocketseat/"
            }
        ]
    }

    return res.render("about", {about})
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", {items: videos})
})

server.listen(5000, function(){
    console.log("@@server is running")
})

