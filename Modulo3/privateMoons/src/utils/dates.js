module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthDay = new Date(timestamp);

        let age = today.getFullYear() - birthDay.getFullYear();
        const month = today.getMonth() - birthDay.getMonth();

        if(month < 0 || month == 0 && today.getDate() < birthDay.getDate()) return age -= 1;

        return age;
    },
    graduation(levelGraduation) {
        let education = '';
        
        switch(levelGraduation) {
            case 'EMC':
                return education = 'Ensino Médio - Completo';
            case 'ESC':
                return education = 'Ensino Superior - Completo';
            case 'masters':
                return education = 'Mestrado';
            case 'doctorate':
                return education = 'Doutorado'
        }
        
        return education;
    },
    grade(typeSchoolYear) {
        let schoolYear = '';
        
        switch(typeSchoolYear) {
            case 'ENF5':
                return education = '5º ano do ensino fundamental'
            case 'ENF6':
                return education = '6º ano do ensino fundamental'
            case 'ENF7':
                return education = '7º ano do ensino fundamental'
            case 'ENF8':
                return education = '8º ano do ensino fundamental'
            case 'ENF9':
                return education = '9º ano do ensino fundamental'
            case 'ENM1':
                return education = '1º ano do ensino médio'
            case 'ENM2':
                return education = '2º ano do ensino médio'
            case 'ENM3':
                return education = '3º ano do ensino médio'
        }

        return schoolYear;
    },
    date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year, 
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    }
}