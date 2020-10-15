// Criando um programa que calcula a média
// das notas entre alunos e envia 
// mensagem do cálculo da média 

// objetos são agrupamento onde contem varios parametros, ex: 1 celular é objeto,
// nele contem alguns parametros como peso, cor, tamanho, tem algumas funçoes como desligar/ligar

const aluno1 = {
    nome: 'Henrique',
    nota: 9.8
}

const aluno2 = {
    nome: 'Ana',
    nota: 10
}

const aluno3 = {
    nome: 'Fulano',
    nota: 2
}

// console é um objeto onde tem varios metodos como .log onde no log vamos passar alguma coisa ()

const media = (aluno1.nota + aluno2.nota + aluno2.nota) / 3

console.log(media.toFixed(2)) // toFixed (valor) diminuir as casas decimais depois do ,