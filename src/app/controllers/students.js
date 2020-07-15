const { age, date, graduation } = require('../../lib/utils')

const Student = require("../models/Students")


module.exports = {   
    index(req, res) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){
                let mathTotal = 
                    students[0] == undefined
                        ? 0
                        : Math.ceil(students[0].total/limit)

                const pagination = {
                    total: mathTotal,
                    page
                }

                return res.render('students/index', { students, pagination, filter })

            }
        }

        Student.paginate(params)
    },

    create(req, res){
        Student.teachersSelectOptions(function(options){
            return res.render('students/create', { teacherOptions: options })
        })
    },

    post(req, res){
        //validando dados
        const keys = Object.keys(req.body)
    
        for(let key of keys){
            if(req.body[key] == ""){
                return res.send("Por favor preencha todos os campos")
            }
        }
        
        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })    
    },

    show(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Estudante não encontrado")
        
            student.birth = date(student.birth).birthDay
            
            return res.render('students/show', { student })
        })
    
    },

    edit(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Estudante não encontrado")
        
            student.birth = date(student.birth).iso

            Student.teachersSelectOptions(function(options){
                return res.render('students/edit', { student, teacherOptions: options  })
            })          
        })

    },

    put(req, res){
        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })

    },
    
    delete(req, res) {
        Student.delete(req.body.id, function(){
            return res.redirect('/students')
        })    
        
    }

}
