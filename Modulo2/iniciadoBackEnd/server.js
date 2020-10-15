const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/56804642?s=460&v=4",
        name: "Luiz Henrique",
        role: "Desenvolvedor Web",
        description: "Programador Front-End usando às tecnologias Javascript, HTML5, CSS3, React JS e Node JS. Foco em ser um Desenvolvedor Full Stack.",
        links: [
            {name: "Github", url: "https://github.com/Henrique1818"},
            {name: "Instagram", url: "https://www.instagram.com/henrique18_89/"},
            {name: "LinkedIn", url: "linkedin.com/in/luiz-henrique-23915916a/"}
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if(!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})  

server.listen(5000, function() {
    console.log("server is running")
})