document.getElementById("juego-form").addEventListener("submit", function(event) {
  event.preventDefault();
  juego();
});

var jugador = 0;
var ia = 0;
var isTimerActive = false;
var selectedOption = null;

function seleccionarOpcion(opcion) {
  selectedOption = opcion;
  reproducirAudio('click.mp3');
}

function juego() {
  var botonVamos = document.getElementById("vamos");
  if (isTimerActive || botonVamos.disabled || selectedOption === null) {
    return;
  }

  botonVamos.disabled = true;
  isTimerActive = true;
  
  var marcador = document.getElementById('marcador');
  var resultado = document.getElementById('resultado');
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var duration = 3;
  var timerInterval = 1000;
  var random = Math.floor(Math.random() * 3) + 1;
  var timer = setInterval(function() {
    if (duration < 3) {
      img1.src = 'misterio.png';
      img2.src = 'mistreio.png';
    }
    if (duration >= 3) {
      clearInterval(timer);

      if (selectedOption === 1) {
        img1.src = 'piedra.png';
      } else if (selectedOption === 2) {
        img1.src = 'papel.jpg';
      } else if (selectedOption === 3) {
        img1.src = 'tijera.png';
      }

      if (random === 1) {
        img2.src = 'piedra.png';
      } else if (random === 2) {
        img2.src = 'papel.jpg';
      } else if (random === 3) {
        img2.src = 'tijera.png';
      }

      if (selectedOption === random) {
        resultado.innerHTML = 'Has Empatado';
        resultado.style.color = 'white';
        reproducirAudio('empate.mp3');
      } else if ((selectedOption === 1 && random === 2) || (selectedOption === 2 && random === 3) || (selectedOption === 3 && random === 1)) {
        resultado.innerHTML = 'Has perdido';
        resultado.style.color = 'red';
        ia++;
        reproducirAudio('derrota.mp3');
      } else if ((selectedOption === 2 && random === 1) || (selectedOption === 3 && random === 2) || (selectedOption === 1 && random === 3)) {
        resultado.innerHTML = 'Has ganado';
        resultado.style.color = 'green';
        jugador++;
        reproducirAudio('victoria.mp3');
      }

      marcador.innerHTML = jugador + ' - ' + ia;
      isTimerActive = false;
      botonVamos.disabled = false;
      selectedOption = null;
    }

    duration--;
  }, timerInterval);
}

function reproducirAudio(src) {
  var audio = new Audio(src);
  audio.play();
}
