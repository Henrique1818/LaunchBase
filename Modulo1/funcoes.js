// Criando um programa que calcula a média
// das notas entre alunos e envia 
// mensagem do cálculo da média 

// usando funçoes, passando parametros
const alunosdaTurmaA = [
    {
        nome: 'Henrique',
        nota: 9.8
    },
    {
        nome: 'Ana',
        nota: 10
    },
    {
        nome: 'Fulano',
        nota: 2
    }
]

const alunosdaTurmaB = [
    {
        nome: 'Maria',
        nota: 7
    },
    {
        nome: 'Joao',
        nota: 2
    },
    {
        nome: 'Joaquina',
        nota: 5
    }
]

function calculaMedia(alunos) {
    return (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3
}

const media1 = calculaMedia(alunosdaTurmaA)
const media2 = calculaMedia(alunosdaTurmaB)

function enviaMensagem(media, turma) {
    if(media > 5) {
        console.log(`A média da ${turma} foi de ${media}. Parabéns`)
    } else {
        console.log(`A média da ${turma} é menor que 5`)
    }
}

enviaMensagem(media1.toFixed(2), 'Turma A')
enviaMensagem(media2.toFixed(2), 'Turma B')