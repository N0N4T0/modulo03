const fs = require('fs')
const data = require('../data.json')
const { age, date, grade } = require('../utils')


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

    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
       ...req.body,
        birth,
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

    if(!foundStudent) return res.send("Estudante não encontrado")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        level: grade(foundStudent.level),
    }

    return res.render('students/show', { student })
}


//edit
exports.edit = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudent) return res.send("Estudante não encontrado")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
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

    if(!foundStudent) return res.send("Estudante não encontrado")

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
