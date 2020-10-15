/*============================================
    OPERADORES LÓGICOS, ARITMÉTICOS

    && "E" As  duas condições devem ser verdadeiras
        para que a condição final seja verdadeira.
    ||  "OU" Uma das condições deve ser verdadeira
        para que a condição final seja verdadeira
    !   "NÂO" Nega uma condição 

    console.log(5 == 5 && 6 == 6) //true
    console.log(5 == 5 && 6 != 6) //false

    console.log(5 != 5 || 6 == 6) //true
    console.log(5 == 5 || 6 != 6) //true

    console.log(!(5 > 6)) //true o que é falso transforma em verdadeiro
     console.log(!(5 < 6)) //false o que é verdadeiro transforma em falso  

     OPERADORES ARITMÉTICOS

     *      Multiplicação
     /      Divisão
     %      Resto da divisão
     +      Adição
     -      Subtração

     console.log(2 * 2) // 4
     console.log(2 / 2) // 1
     console.log(2 % 1.5) // 0.5
     console.log(2 + 3) // 5
     console.log(2 - 2) // 0

 ============================================*/

// Desafio 1

const idade = 18

// verificar se a pessoa é maior igual a 18 anos
// se sim, deixar entrar, se não, bloquear a entrada
// se a pessoa tiver 17 anos
// avisar para voltar quando fizer 18 anos

if(!(idade >= 18) || idade === 17) {
    console.log('Bloquear entrada')
} else {
    console.log('Deixar entrar')
}

