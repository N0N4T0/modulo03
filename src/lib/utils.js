module.exports = {
    age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 ||
            month == 0 &&
            today.getDate() <= birthDate.getDate()) {
                age = age -1    
        }

        return age
    },

    date(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return{
            day,
            month,
            year,
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`,
        } 
    },

    graduation(value){
        return (value == 'medio') ? 'Ensino Médio Completo'
        : (value == 'superior') ? 'Ensino Superior Completo'
        : (value == 'mestrado') ? 'Mestrado'
        : 'Doutorado'
            
        // let graduation = value

        // switch (graduation){
        //     case "medio":
        //         return graduation = "Ensino Médio Completo"
        //     case "superior":
        //         return graduation = "Ensino Superior Completo"
        //     case "mestrado":
        //         return graduation = "Mestrado"
        //     case "doutorado":
        //         return graduation = "Doutorado"
        // }
    },

    grade(level){
        return (level == '5EF') ? '5º Ano do Ensino Fundamental'
        : (level == '6EF') ? '6º Ano do Ensino Fundamental'
        : (level == '7EF') ? '7º Ano do Ensino Fundamental'
        : (level == '8EF') ? '8º Ano do Ensino Fundamental'
        : (level == '9EF') ? '9º Ano do Ensino Fundamental'
        : (level == '1EM') ? '1º Ano do Ensino Médio'
        : (level == '2EM') ? '2º Ano do Ensino Médio'
        : '3º Ano do Ensino Médio'
    }
} 