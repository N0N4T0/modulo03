const { age, date, graduation } = require("../../lib/utils")

const db = require("../../config/db")


module.exports = {
    all(callback){

        db.query(`SELECT * FROM teachers`, function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows)
        })    

    },
    create(data, callback){
        const query = `
        INSERT INTO teachers (
           name,
           avatar_url,
           birth,
           education_level,
           class_type,
           subjects_taught,
           created_at 
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
            
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso,
        ]
    
        db.query(query, values, function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows[0])
        }) 
    }, 


    
}