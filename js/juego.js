// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 30;
let timer = null;
let timerInicial = 30;
let tiempoRegresivoId = null;

// Apuntando a documento HTML

let mostrarMovimientos = document.getElementById(`movimientos`);
let mostrarAciertos = document.getElementById(`aciertos`);
let mostrarTiempo = document.getElementById(`t-restante`)

// Generacion de numeros aleatorios
let numeros = [
    "✌🏾","✌🏾",
    "🏄🏾‍♂️","🏄🏾‍♂️",
    "🏌🏾‍♂️","🏌🏾‍♂️",
    "💵","💵",
    "👨🏾‍💻","👨🏾‍💻",
    "⌛","⌛",
    "🤖","🤖",
    "🧿","🧿",
]
numeros = numeros.sort(()=>{
    return Math.random()
    -0.5
});
console.log(numeros);

// Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        tiempo --;
        mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;
        if ( tiempo == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjeta();
        }
    },1000);
}

function bloquearTarjeta(){
    for (let i = 0; i <=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

// Function principal
function destapar(id){ 

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        // Mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;
    
    // Deshabilitar primer boton
        tarjeta1.disabled = true;

    }else if (tarjetasDestapadas == 2 ){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        // Desahabilitar segundo boton
        tarjeta2.disabled = true;

        // Incremetar movimeintos 
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado){
            //Encerrar contador tarjetas 
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🤯 `;
                mostrarTiempo.innerHTML = ` Fantastico! 🕰️ Solo demoraste ${timerInicial - tiempo} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 👆🏾`
            }
        }else {
            // Mostrar momentaneament valores y volver a tapar
            setTimeout( () => {
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}