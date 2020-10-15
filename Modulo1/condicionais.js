// Criando um programa que calcula a média
// das notas entre alunos e envia 
// mensagem do cálculo da média 

const aluno1 = 'Henrique'
const nota1 = 7.5

const aluno2 = 'Ana'
const nota2 = 8

const aluno3 = 'Fulano'
const nota3 = 7


const media = (nota1 + nota2 + nota3) / 3

// se a media for maior que 5, parabenizar a turma 
if(media > 5) {
    console.log(`A nota foi de ${media} . Parabéns`)
} else {
    console.log('A média e menor que 5')
}

// console.log(media <5) menor return false no caso, console.log(media > 5) maior return verdadeiro.