const videos = require('./data')

//show
exports.show = function(req, res) {
    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send('Video not found!')
    }
    
    return res.render('video', {item: video})
}
