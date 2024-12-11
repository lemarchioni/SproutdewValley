const solo = document.getElementById('solo');
const plantarBtn = document.getElementById('plantar');
const regarBtn = document.getElementById('regar');
const resetarBtn = document.getElementById('resetar');
const mensagem = document.getElementById('mensagem');

const desafioContainer = document.getElementById('desafio-container');
const desafioTitulo = document.getElementById('desafio-titulo');
const desafioTexto = document.getElementById('desafio-texto');
const desafioOpcao1 = document.getElementById('desafio-opcao1');
const desafioOpcao2 = document.getElementById('desafio-opcao2');

let etapa = 0;
let planta;

// Lista de desafios
const desafios = [
    {
        titulo: "O Feitiço do Corvo Roubador",
        texto: "Um corvo mágico roubou suas sementes! Recolha penas brilhantes pelo solo.",
        opcoes: ["Recolher penas", "Ignorar o corvo"],
        efeitos: [
            () => { mensagem.textContent = "Você recuperou algumas sementes!"; },
            () => { mensagem.textContent = "O corvo fugiu com suas sementes..."; }
        ]
    },
    {
        titulo: "A Névoa Misteriosa",
        texto: "Uma névoa cobre o campo, suas plantas estão confusas. Escolha uma para guiar!",
        opcoes: ["Escolher planta maior", "Escolher planta menor"],
        efeitos: [
            () => { mensagem.textContent = "A planta cresceu saudável!"; },
            () => { mensagem.textContent = "A planta não cresceu como esperado."; }
        ]
    },
    // Vou acrescentar mais depois...
];

function plantar() {
    if (etapa === 0) {
        etapa++;
        planta = document.createElement('div');
        planta.classList.add('planta');
        planta.style.width = '10px';
        planta.style.height = '10px';
        planta.style.backgroundColor = 'green';
        planta.style.borderRadius = '50%';
        solo.appendChild(planta);
        mensagem.textContent = 'Semente plantada! Agora regue para crescer.';
        regarBtn.disabled = false;
        plantarBtn.disabled = true;
    }
}

function regar() {
    if (etapa < 4) {
        etapa++;
        planta.style.width = `${10 * etapa}px`;
        planta.style.height = `${10 * etapa}px`;
        if (etapa === 4) {
            mensagem.textContent = 'Parabéns! Sua planta cresceu completamente!';
            regarBtn.disabled = true;
            resetarBtn.disabled = false;
        } else {
            mensagem.textContent = 'A planta está crescendo! Continue regando.';
        }
    }
}

function resetar() {
    solo.innerHTML = '';
    etapa = 0;
    plantarBtn.disabled = false;
    regarBtn.disabled = true;
    resetarBtn.disabled = true;
    mensagem.textContent = 'Solo limpo. Pronto para começar novamente!';
    iniciarDesafioAleatorio();
}

function iniciarDesafioAleatorio() {
    const desafio = desafios[Math.floor(Math.random() * desafios.length)];
    desafioTitulo.textContent = desafio.titulo;
    desafioTexto.textContent = desafio.texto;
    desafioOpcao1.textContent = desafio.opcoes[0];
    desafioOpcao2.textContent = desafio.opcoes[1];
    desafioContainer.classList.remove('hidden');

    desafioOpcao1.onclick = () => {
        desafio.efeitos[0]();
        desafioContainer.classList.add('hidden');
    };
    desafioOpcao2.onclick = () => {
        desafio.efeitos[1]();
        desafioContainer.classList.add('hidden');
    };
}

plantarBtn.addEventListener('click', plantar);
regarBtn.addEventListener('click', regar);
resetarBtn.addEventListener('click', resetar);
