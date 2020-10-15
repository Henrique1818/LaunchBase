const classA = [
    {
        name: 'Henrique',
        grade: 9.8
    },
    {
        name: 'Ana',
        grade: 10
    },
    {
        name: 'Fulano',
        grade: 2
    }
]

const classB = [
    {
        name: 'Maria',
        grade: 7
    },
    {
        name: 'Joao',
        grade: 2
    },
    {
        name: 'Joaquina',
        grade: 5
    }
]

function calculateAverage(students) {
    let sum = 0

    for(let i = 0; i < students.length; i++) {
        sum = sum + students[i].grade
    }

    const average = sum / students.length

    return average
}

function sendMessage(average, turma) {
    if(average > 5) {
        console.log(`${turma} average: ${average}. Congrats`)
    } else {
        console.log(`${turma} average: ${average}. Is not good.`)
    }
}

function markAsFlunked(student) {
    student.flunked = false

    if(student.grade < 5) {
        student.flunked = true
    }
}

function sendFlunkedMessage(student) {
    if(student.flunked) {
        console.log(`${student.name} flunked!`)
    }
}

function studentsflunkeds(students) {
    for(let student of students) {
        markAsFlunked(student)
        sendFlunkedMessage(student)
    }
}

const average1 = calculateAverage(classA)
const average2 = calculateAverage(classB)

sendMessage(average1.toFixed(2), 'Class A')
sendMessage(average2.toFixed(2), 'Class B')

markAsFlunked(classA)
markAsFlunked(classB)

studentsflunkeds(classA)
studentsflunkeds(classB)