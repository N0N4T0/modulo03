const { age, date, graduation } = require('../../lib/utils')

const db = require("../../config/db")


module.exports = {
    all(callback) {

        db.query(`SELECT * FROM students ORDER BY name ASC`, function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows)
        })

    },
    create(data, callback){

        const query = `
        INSERT INTO students (
            name,
            avatar_url,
            email,
            birth,
            level,
            classroom,
            created_at,
            teacher_id 
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.level,
            data.classroom,
            date(Date.now()).iso,
            data.teacher,
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback){

        db.query(`
            SELECT students.*, teachers.name AS teacher_name 
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1`, [id], function(err, results){
                if(err) throw `Database Error ${err}`

                callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE students SET 
                name = ($1),
                avatar_url = ($2),
                email = ($3),
                birth = ($4),
                level = ($5),
                classroom = ($6),
                teacher_id = $(7)
            WHERE id = $8
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.level,
            data.classroom,
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error ${err}`

            callback() 
        })
    },
    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function(err, results){
            if(err) throw `Database Error ${err}`

            return callback(results.rows)
        })
    }


}