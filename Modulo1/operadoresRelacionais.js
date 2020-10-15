/*============================================
    OPERADORES COMPARAÇÃO, RELACIONAIS

    >       MAIOR
    <       MENOR
    >=      MAIOR IGUAL A
    <=      MENOR IGUAL A
    ==      IGUAL A
    ===     IGUAL E DO MESMO TIPO
    !=      DIFERENTE DE
    !==     DIFERENTE, INCLUSIVE O TIPO

    console.log(5 > 4) //true
    console.log(5 < 4) //false
    console.log(5 >= 4) //true pois 5 maior porem nao é igual
    console.log(5 <= 4) //false pois 5 não é menor que 4 nem igual
    console.log(4 <= 4) //true pois mesmo 4 nao sendo menor que 4, porem são iguais


    console.log(4 == "4") //true pois o == apens vai olhar o valor
    console.log(4 === "4")  //false pois o === vai verifica se são iguais e do mesmo tipo no caso number
    console.log(4 != "5")  // true pois e diferente de 4
    console.log(4 !== "5")  // true pois tambem e difrente de 4 e o tipo tambem

 ============================================*/


// Desafio 1

const idade = 17

// verificar se a pessoa é maior igual a 18 anos
// se sim, deixar entrar, se não, bloquear a entrada
if(idade >= 18) {
    console.log('Deixar Entrar')
} else {
    console.log('Bloquear Entrada')
}

// se a pessoa tiver 17 anos
// avisar para voltar quando fizer 18 anos
if(idade === 17) {
    console.log('Volte quando fizer 18 anos')
}