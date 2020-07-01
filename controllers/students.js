const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { age, date, graduation } = require('../utils')


//index
exports.index = function(req, res) {
    return res.render('students/index', { students: data.students })
}


//create 
exports.create = function(req, res){
    return res.render('students/create')
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
    const id = Number(data.students.length + 1)

    data.students.push({
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
    
        return res.redirect(`/students/${id}`)
    })
}


//show = mostrar
exports.show = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudent) return res.send("Professor não encontrado")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        areas: foundStudent.areas.split(","),
        level: graduation(foundStudent.level),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundStudent.created_at),
    }

    return res.render('students/show', { student })
}


//edit
exports.edit = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudent) return res.send("Professor não encontrado")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth),
    }


    return res.render('students/edit', { student })
}


//put = atualiar
exports.put = function(req, res){
    const { id } = req.body
    let index 

    const foundStudent = data.students.find(function(student, foundIndex){
        if(student.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundStudent) return res.send("Professor não encontrado")

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number(id),
        birth: Date.parse(req.body.birth),
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
    
        return res.redirect(`/students/${id}`)
    })
}


//delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
    
        return res.redirect('/students')
    })
}
