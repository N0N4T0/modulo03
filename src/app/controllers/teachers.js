const { age, date, graduation } = require('../../lib/utils')


//index
exports.index = function(req, res) {
    return res.render('teachers/index', { teachers: data.teachers })
}


//create
exports.create = function(req, res){
    return res.render('teachers/create')
}


//CRUD
//post 
exports.post = function(req, res){
    //validando dados
    const keys = Object.keys(req.body)

    for(let key of keys){
        if(req.body[key] == ""){
            return res.send("Por favor preencha todos os campos")
        }
    }

    let {avatar_url, name, birth, level, type, areas} = req.body

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
        areas,
        created_at,
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
    
        return res.redirect(`/teachers/${id}`)
    })
}


//show = mostrar
exports.show = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher) return res.send("Professor não encontrado")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        areas: foundTeacher.areas.split(","),
        level: graduation(foundTeacher.level),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundTeacher.created_at),
    }

    return res.render('teachers/show', { teacher })
}


//edit
exports.edit = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher) return res.send("Professor não encontrado")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
    }


    return res.render('teachers/edit', { teacher })
}


//put = atualiar
exports.put = function(req, res){
    const { id } = req.body
    let index 

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send("Professor não encontrado")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: Number(id),
        birth: Date.parse(req.body.birth),
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
    
        return res.redirect(`/teachers/${id}`)
    })
}


//delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
    
        return res.redirect('/teachers')
    })
}
