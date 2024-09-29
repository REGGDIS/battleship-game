/* Modal */
const d = document, // Selecciona el objeto global del documento para su posterior uso abreviado como 'd'.
    modal = d.querySelector('.modal'), // Selecciona el primer elemento con la clase 'modal' para su posterior uso como modal.
    btnReg = d.querySelector('.btn'), // Selecciona el primer elemento con la clase 'btn' para su posterior uso como botón de registro.
    inputplayer = d.getElementById('registroInput'), // Selecciona el elemento con el ID 'registroInput' para su posterior uso como campo de entrada de nombre.
    nombre = d.querySelector('.formu label'); // Selecciona el primer elemento con la clase 'formu label' para su posterior uso como etiqueta de nombre.

let playerName = ''; // Declara e inicializa una variable para almacenar el nombre del jugador.

btnReg.addEventListener('click', () => { // Añade un event listener para el evento 'click' al botón de registro.
    playerName = inputplayer.value.trim(); // Obtiene el valor del campo de entrada de nombre y lo asigna a la variable playerName, eliminando los espacios en blanco al inicio y al final.

    if (playerName.length === 0) { // Comprueba si el nombre del jugador está vacío.
        alert('Debe ingresar un nombre para poder registrarse'); // Muestra una alerta indicando al usuario que debe ingresar un nombre.
        return; // Sale de la función para evitar continuar con el proceso de registro.
    }

    if (!/^[a-zA-Z]{1,10}$/.test(playerName)) { // Comprueba si el nombre del jugador contiene caracteres no válidos o excede la longitud máxima permitida.
        alert('El nombre debe tener máximo 10 caracteres y contener solo letras.'); // Muestra una alerta indicando al usuario que el nombre debe cumplir con ciertos requisitos.
        return; // Sale de la función para evitar continuar con el proceso de registro.
    }

    nombre.textContent = playerName; // Establece el contenido de texto de la etiqueta de nombre con el nombre del jugador.
    document.getElementById('nombreJugador').textContent = playerName; // Actualiza el nombre del jugador en el header.
    modal.classList.add('modalout'); // Añade la clase 'modalout' al modal para mostrarlo.
});

// Limitar el campo de entrada a 10 caracteres
inputplayer.addEventListener('input', () => {
    // Validar que solo se puedan ingresar letras
    inputplayer.value = inputplayer.value.replace(/[^a-zA-Z]/g, ''); // Reemplaza cualquier caracter que no sea una letra (mayúscula o minúscula) con una cadena vacía.
    if (inputplayer.value.length > 10) { // Comprueba si la longitud del valor del campo de entrada es mayor que 10.
        inputplayer.value = inputplayer.value.slice(0, 10); // Corta el valor del campo de entrada para que solo tenga los primeros 10 caracteres.
    }
});

// Función para empezar el juego
function startGame() {
    // Redireccionar a la página del juego
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', function () {
    // Llamar a la función para generar el tablero
    generateBoard();

    const posicionesBarcos = []; // Se inicializa un array vacío para almacenar las posiciones ocupadas por los barcos
    let disparosRealizados = 0; // Variable para contar los disparos realizados

    // Definir la función para generar el tablero
    function generateBoard() {
        const tablero = document.querySelector('.tablero'); // Selecciona el elemento con la clase 'tablero' para representar el tablero del juego.

        // Generar el tablero
        for (let i = 0; i < 10; i++) { // Itera sobre las filas del tablero (0 a 9).
            for (let j = 0; j < 10; j++) { // Itera sobre las columnas del tablero (0 a 9).
                const celda = document.createElement('div'); // Crea un elemento div para representar una celda del tablero.
                celda.classList.add('celda'); // Agrega la clase 'celda' al elemento div, para aplicar estilos y comportamientos.

                // Calcular el identificador único de la celda
                const idCelda = i * 10 + j;

                celda.id = "celda-" + idCelda; // Asignar el identificador único a la celda

                // Agregar evento de clic a cada celda para manejar el disparo
                celda.addEventListener('click', function () {
                    if (disparosRealizados < 10) { // Verificar que aún haya oportunidades de disparo
                        if (marcarCelda(idCelda)) { // Marcamos la celda como un barco
                        }
                    } else {
                        alert("Lo siento, se te acabaron los misiles."); // Alerta cuando se han agotado los disparos
                    }
                });

                tablero.appendChild(celda); // Agregamos la celda recién creada al tablero.
            }
        }
    }

    // Variable para contar los disparos acertados
    let disparosAcertados = 0;

    // Función para marcar la celda correspondiente al ID proporcionado
    function marcarCelda(id) {
        const celda = document.getElementById("celda-" + id);
        if (celda) {
            celda.style.backgroundColor = 'red'; // Marcar la celda en rojo
            disparosRealizados++; // Incrementar el contador de disparos realizados
            document.getElementById('restantes').innerText = 10 - disparosRealizados; // Actualizar el contador de disparos restantes
            setTimeout(function () {
                if (verificarCoincidencia(id)) { // Verificar si la coordenada coincide con una posición de barco
                    alert('¡¡ACERTASTE!!'); // Mostrar mensaje de "Hit" si coincide
                    disparosAcertados++; // Incrementar el contador de disparos acertados
                    document.getElementById('scoreJugador').innerText = disparosAcertados; // Actualizar el contador de disparos acertados en el HTML
                } else {
                    alert('¡LO SIENTO, FALLASTE!'); // Mostrar mensaje de "Miss" si no coincide
                    celda.style.backgroundColor = '#5573d3'; // Cambiar el color de la celda a azul
                }
            }, 400); // Retrasar la ejecución del código durante 400 milisegundos
            return true; // Devolvemos verdadero si la celda existe y se marca correctamente
        } else {
            alert("La celda " + id + " no existe.");
            return false; // Devolvemos falso si la celda no existe
        }
    }

    // Función para posicionar los barcos
    function placeShips() {
        for (let i = 0; i < 3; i++) { // Colocamos 3 barcos
            let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Determinamos aleatoriamente la orientación del barco
            let startId;
            // Determinamos aleatoriamente la orientación del barco
            // Math.random() genera un número aleatorio entre 0 y 1.
            // Si el número aleatorio es menor que 0.5, la orientación será 'horizontal';
            // de lo contrario, si es mayor o igual a 0.5, la orientación será 'vertical'.

            if (orientation === 'horizontal') { // Si la orientación es horizontal
                startId = Math.floor(Math.random() * 100); // Generamos un ID de inicio aleatorio del 0 al 99
                if (startId % 10 > 7) { // Si el ID de inicio está muy cerca del borde derecho del tablero
                    startId -= 2; // Ajustamos el ID para que no exceda el límite derecho
                }
            } else { // Si la orientación es vertical
                startId = Math.floor(Math.random() * 70); // Generamos un ID de inicio aleatorio del 0 al 70
            }

            const shipPositions = []; // Array para almacenar las posiciones del barco

            // Generamos las posiciones del barco según su orientación
            for (let j = 0; j < 3; j++) {
                // Si la orientación del barco es horizontal
                if (orientation === 'horizontal') {
                    // Añadimos la posición actual a la lista de posiciones del barco
                    shipPositions.push(startId + j);
                } else { // Si la orientación del barco es vertical
                    // Añadimos la posición actual ajustada verticalmente a la lista de posiciones del barco
                    shipPositions.push(startId + j * 10);
                }
            }

            // Verificamos si los barcos están dentro del tablero y no se solapan con otros barcos
            const isValid = shipPositions.every(position => {
                const row = Math.floor(position / 10); // Calculamos la fila de la posición dividiendo entre 10 y tomando la parte entera
                const col = position % 10; // Calculamos la columna de la posición tomando el resto de la división por 10
                // Comprobamos si la posición está dentro del tablero y no se superpone con otros barcos
                return row < 10 && col < 10 && !posicionesBarcos.includes(position);
            });

            if (isValid) { // Si las posiciones son válidas, las añadimos a la lista de posiciones de barcos
                posicionesBarcos.push(...shipPositions);
            } else { // Si las posiciones no son válidas, intentamos nuevamente con una nueva orientación y posición aleatoria
                i--; // Decrementamos el contador para volver a intentar colocar los barcos
            }
        }

        console.log("Posiciones de los barcos:", posicionesBarcos); // Mostramos las posiciones por consola
    }


    // Llamar a la función para posicionar los barcos
    placeShips();

    // Función para verificar si una celda marcada coincide con una posición de barco
    function verificarCoincidencia(id) {
        return posicionesBarcos.includes(id);
    }

    // Agregar evento de clic al botón "btn-posicionar"
    document.querySelector('.btn-reposicionar').addEventListener('click', startGame);

});
