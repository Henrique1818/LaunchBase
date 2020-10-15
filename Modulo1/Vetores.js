// Criando um programa que calcula a média
// das notas entre alunos e envia 
// mensagem do cálculo da média 

// Criando Arrays (vetores) são valores agrupados em uma unica variavel

const alunos = [
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

const media = (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3

console.log(media.toFixed(2)) // toFixed (valor) diminuir as casas decimais depois do ,