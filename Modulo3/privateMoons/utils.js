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
    }
}