const fs = require('fs')
const data = require('./data.json')

//edit
exports.edit = function(req, res){


    return res.render('teachers/edit')
}

exports.show = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher) return res.send("Professor não encontrado")

    const teacher = {
        ...foundTeacher
    }

    return res.render('teachers/show', { teacher })
}

//create
exports.post = function(req, res){
    //validando dados
    const keys = Object.keys(req.body)

    for(let key of keys){
        if(req.body[key] == ""){
            return res.send("Por favor preencha todos os campos")
        }
    }

    let {avatar_url, name, birth, level, type, area} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name, 
        birth,
        level,
        type,
        area,
        created_at,
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
    
        return res.redirect('/teachers')
    })
}
