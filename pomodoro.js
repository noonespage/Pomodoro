
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

function mudarTema(cor) {
    if (cor === 'verde') {
        document.documentElement.style.setProperty('--cor-h1', '#1f572c')
        document.documentElement.style.setProperty('--cor-fundo', '#3b9252ff');
        document.documentElement.style.setProperty('--cor-texto', '#002800');
        document.documentElement.style.setProperty('--cor-botao', '#15481d');
        document.documentElement.style.setProperty('--cor-botao-hover', '#0a380f');
    }
    else if (cor === 'azul') {
        document.documentElement.style.setProperty('--cor-h1', '#63b3ce')
        document.documentElement.style.setProperty('--cor-fundo', '#80cbe6');
        document.documentElement.style.setProperty('--cor-texto', '#0a6c84');
        document.documentElement.style.setProperty('--cor-botao', '#459cb5');
        document.documentElement.style.setProperty('--cor-botao-hover', '#28849d');
    }
    else if (cor === 'rosa') {
        document.documentElement.style.setProperty('--cor-h1', '#f993de')
        document.documentElement.style.setProperty('--cor-fundo', '#ffadf7');
        document.documentElement.style.setProperty('--cor-texto', '#e64394');
        document.documentElement.style.setProperty('--cor-botao', '#ec5ead');
        document.documentElement.style.setProperty('--cor-botao-hover', '#f378c6');
    }
}

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

musica.addEventListener('click', () => {
    playClick();
})

temas.addEventListener('click', () => {
    playClick();
})

updateDisplay();