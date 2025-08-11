
const tempoDisplay = document.getElementById('tempo');
const statusDisplay = document.getElementById('status');
const iniBtn = document.getElementById('inicio');
const pausaBtn = document.getElementById('pausa');
const resetaBtn = document.getElementById('reseta');
const inputTrabalho = document.getElementById('inputTrabalho');
const inputPausa = document.getElementById('inputPausa');

const clickSound = new Audio('click.mp3');

// tempo
let duracao = 0;
let pausaDuracao = 0;
let atualTempo = 0;

let intervaloTempo = null;
let ativo = false;
let produzindo = true;

function updateDisplay() {
    let minutes = Math.floor(atualTempo / 60);
    let seconds = atualTempo % 60;
    tempoDisplay.textContent =
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
    
    statusDisplay.textContent = produzindo ? 'Trabalhando' : 'Descansando';
}

function switchSession() {
    produzindo = !produzindo;
    atualTempo = produzindo ? duracao : pausaDuracao;
    updateDisplay();
}

function startTimer() {
    if (ativo) return;
        if (duracao === 0 && pausaDuracao === 0) {
    let workMinutes = parseInt(inputTrabalho.value);
    let breakMinutes = parseInt(inputPausa.value);
    
    if (isNaN(workMinutes) || workMinutes <= 0) {
        alert('Por favor, insira um tempo válido para trabalho.');
        return;
    }
    if (isNaN(breakMinutes) || breakMinutes <= 0) {
        alert('Por favor, insira um tempo válido para pausa.');
        return;
    }
    
    duracao = workMinutes * 60;
    pausaDuracao = breakMinutes * 60;
    atualTempo = duracao;
    produzindo = true;
    updateDisplay();
    }

    ativo = true;

    intervaloTempo = setInterval(() => {
        if (atualTempo <= 0) {
            clearInterval(intervaloTempo);
            ativo = false;
            alert(produzindo ? 'Sessão de trabalho finalizada! Hora de descansar.' : 'Pausa finalizada! Hora de trabalhar');
            switchSession();
            startTimer();
            return;
        }
        atualTempo--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(intervaloTempo);
    ativo = false;
}

function resetaTempo() {
    clearInterval(intervaloTempo);
    ativo = false; 
    duracao = 0;
    pausaDuracao = 0;
    atualTempo = 0;
    produzindo = true;
    updateDisplay();
}

function playClick() {
    clickSound.atualTempo = 0;
    clickSound.play();
}

iniBtn.addEventListener('click', () => {
  playClick();
  startTimer();
});
pausaBtn.addEventListener('click', () => {
  playClick();
  pauseTimer();
});
resetaBtn.addEventListener('click', () => {
  playClick();
  resetaTempo();
});

updateDisplay();