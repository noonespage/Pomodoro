# pomodoro
This is a pomodoro timer for study!

Visão Geral
Este projeto é um Pomodoro Timer feito em HTML, CSS e JavaScript, onde o usuário pode definir o tempo de trabalho e o tempo de pausa, iniciar, pausar e resetar o timer. O objetivo é ajudar na organização do tempo para aumentar a produtividade, alternando períodos focados de trabalho com intervalos de descanso.

Estrutura do Projeto
1. HTML (Estrutura da Página)
Elementos principais:

<div id="status">: mostra se o usuário está na sessão de trabalho ("Trabalhando") ou na pausa ("Descansando").
<div id="tempo">: exibe o tempo restante no formato MM:SS (minutos e segundos).

Três botões:

Iniciar (id="inicio"): para começar o timer.
Pausar (id="pausa"): para pausar o timer.
Resetar (id="reseta"): para zerar o timer e as configurações.
Inputs para o usuário digitar o tempo desejado para:
Tempo de trabalho (id="inputTrabalho") em minutos.
Tempo de pausa (id="inputPausa") em minutos.

Inclusão do script:
O JavaScript é carregado externamente via:
<script src="pomodoro.js"></script>

2. JavaScript (Lógica do Timer)
Variáveis e Seleção dos Elementos

    const tempoDisplay = document.getElementById('tempo');
    const statusDisplay = document.getElementById('status');
    const iniBtn = document.getElementById('inicio');
    const pausaBtn = document.getElementById('pausa');
    const resetaBtn = document.getElementById('reseta');
    const inputTrabalho = document.getElementById('inputTrabalho');
    const inputPausa = document.getElementById('inputPausa');
>Estes comandos pegam os elementos da página para manipular o conteúdo e adicionar eventos.

Variáveis de Controle

    let duracao = 0;           // Duração da sessão de trabalho (em segundos)
    let pausaDuracao = 0;      // Duração da sessão de pausa (em segundos)
    let atualTempo = 0;        // Tempo atual que está sendo contado (em segundos)
    let intervaloTempo = null; // Armazena o ID do setInterval para controlar o timer
    let ativo = false;         // Boolean que indica se o timer está rodando
    let produzindo = true;     // Boolean que indica se está na sessão de trabalho (true) ou pausa (false)
>Essas variáveis controlam o estado do timer, duração das sessões e se está trabalhando ou descansando.

Função updateDisplay()

    function updateDisplay() {
        let minutes = Math.floor(atualTempo / 60);
        let seconds = atualTempo % 60;
        tempoDisplay.textContent =
            (minutes < 10 ? '0' + minutes : minutes) + ':' +
            (seconds < 10 ? '0' + seconds : seconds);
        
        statusDisplay.textContent = produzindo ? 'Trabalhando' : 'Descansando';
    }
>Essa função atualiza o texto que aparece na tela.
>Formata o tempo para o formato MM:SS, garantindo que sempre tenha dois dígitos.
>Atualiza o status para mostrar se o usuário está “Trabalhando” ou “Descansando”.

Função switchSession()

    function switchSession() {
        produzindo = !produzindo;                     // Alterna entre trabalho e pausa
        atualTempo = produzindo ? duracao : pausaDuracao; // Reseta o tempo para a duração da sessão atual
        updateDisplay();                              // Atualiza a tela
    }
>Alterna entre as sessões de trabalho e pausa automaticamente.
>Reseta o tempo para o valor da próxima sessão.
>Atualiza o display para refletir a mudança.

Função startTimer()

    function startTimer() {
        if (ativo) return; // Se já estiver rodando, não inicia outro intervalo

        // Pega os valores dos inputs só na primeira vez que iniciar o timer
        if (duracao === 0 && pausaDuracao === 0) {
        let workMinutes = parseInt(inputTrabalho.value);
        let breakMinutes = parseInt(inputPausa.value);
        
        // Valida se os inputs são válidos (> 0 e números)
        if (isNaN(workMinutes) || workMinutes <= 0) {
            alert('Por favor, insira um tempo válido para trabalho.');
            return;
        }
        if (isNaN(breakMinutes) || breakMinutes <= 0) {
            alert('Por favor, insira um tempo válido para pausa.');
            return;
        }
        
        duracao = workMinutes * 60;    // Converte minutos para segundos
        pausaDuracao = breakMinutes * 60;
        atualTempo = duracao;
        produzindo = true;
        updateDisplay();
        }

        ativo = true;

        intervaloTempo = setInterval(() => {
            if (atualTempo <= 0) {
                clearInterval(intervaloTempo); // Para o timer
                ativo = false;
                alert(produzindo ? 'Sessão de trabalho finalizada! Hora de descansar.' : 'Pausa finalizada! Hora de trabalhar');
                switchSession();               // Alterna a sessão
                startTimer();                 // Começa a próxima sessão automaticamente
                return;
            }
            atualTempo--;
            updateDisplay();
        }, 1000);
    }
>Começa o timer, impedindo múltiplas execuções simultâneas.
>Na primeira execução, pega os tempos digitados pelo usuário e valida.
>A cada segundo diminui o tempo atual e atualiza o display.
>Quando o tempo chega a zero, troca de sessão e reinicia automaticamente.

Função pauseTimer()

    function pauseTimer() {
        clearInterval(intervaloTempo); // Para o intervalo para pausar o timer
        ativo = false;
    }
>Pausa o timer limpando o setInterval e sinalizando que o timer não está mais ativo.

Função resetaTempo()

    function resetaTempo() {
        clearInterval(intervaloTempo); // Para o timer
        ativo = false;
        duracao = 0;                   // Reseta as durações para forçar o usuário a inserir novamente
        pausaDuracao = 0;
        atualTempo = 0;
        produzindo = true;
        updateDisplay();               // Atualiza o display para mostrar 00:00
    }
>Reseta todas as variáveis para o estado inicial, parando o timer e limpando o display.

Adição dos Event Listeners

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

>Essas linhas ligam os botões da página às funções do JavaScript para responder aos cliques do usuário.
>Emite um som suave de clique.


Considerações Finais

O projeto é uma forma prática e simples para aprender manipulação do DOM, eventos e timers em JavaScript.
Pode ser expandido adicionando sons, notificações visuais, temas escuros, etc.
Ótimo para entender fluxo de lógica, controle de estados e interação com o usuário.