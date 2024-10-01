const centralContent = document.querySelector('#central-content');
const CircleCheck = document.querySelector('#fa-circle-check')
const taskTitle = document.querySelector('#bla-blad')
const trashCanIcon = document.querySelector('#trashCan1')
const userProfileIcon = document.querySelector('#fa-circle-user')
const dateText = document.querySelector('#date-p')

const originalBackgrounColor = '#dfdfdf';
const originalTextColor = '#000'

centralContent.addEventListener('click', () => {
    if (centralContent.style.backgroundColor === 'rgb(46, 70, 140)') {
        centralContent.style.backgroundColor = originalBackgrounColor;
        CircleCheck.style.color = originalTextColor
        taskTitle.style.color = originalTextColor
        trashCanIcon.style.color = originalTextColor
        userProfileIcon.style.color = originalTextColor
        dateText.style.color = originalTextColor
    } else {
        centralContent.style.backgroundColor = '#2E468C';
        CircleCheck.style.color = '#fff'
        taskTitle.style.color = '#fff'
        trashCanIcon.style.color = '#fff'
        userProfileIcon.style.color = '#fff'
        dateText.style.color = '#fff'
    }
});

//offcanvas
const offcanvasRight = document.getElementById('offcanvasRight');
offcanvasRight.addEventListener('hidden.bs.offcanvas', () => {
    // Restaura as cores originais da div
    centralContent.style.backgroundColor = originalBackgrounColor;
    CircleCheck.style.color = originalTextColor;
    taskTitle.style.color = originalTextColor;
    trashCanIcon.style.color = originalTextColor;
    userProfileIcon.style.color = originalTextColor;
    dateText.style.color = originalTextColor;
});


//prioridade


// Seleciona o dropdown de prioridade e o primeiro span com classe "marcador"
const prioridadeDropdown = document.getElementById('prioridadeDrop');
const marcadorSpanPrioridade = document.querySelector('#spanPrioridade');

// Função que atualiza o span com o valor e a cor da prioridade
function atualizarMarcadorPrioridade(valor, cor) {
    marcadorSpanPrioridade.textContent = valor; // Atualiza o texto do marcador
    marcadorSpanPrioridade.style.backgroundColor = cor; // Atualiza a cor do fundo do marcador
    prioridadeDropdown.textContent = valor
    prioridadeDropdown.style.backgroundColor = cor
}

// Adiciona o evento de clique às opções de prioridade
document.getElementById('Pbaixa').addEventListener('click', function() {
    atualizarMarcadorPrioridade('Baixa', '#9EE7E3'); // Atualiza para "Baixa" com a cor correspondente
});

document.getElementById('Pmedia').addEventListener('click', function() {
    atualizarMarcadorPrioridade('Média', '#F1BD6C'); // Atualiza para "Média" com a cor correspondente
});

document.getElementById('Palta').addEventListener('click', function() {
    atualizarMarcadorPrioridade('Alta', '#CD95EA'); // Atualiza para "Alta" com a cor correspondente
});

document.getElementById('Pvazio').addEventListener('click', function() {
    atualizarMarcadorPrioridade('-', '#ccc'); // Atualiza para vazio com cor neutra
});


//status

const statusDropdown = document.querySelector('#statusDrop')
const marcadorSpanStatus = document.querySelector('#spanStatus')

function atualizarMarcadorStatus(valor , cor){
    marcadorSpanStatus.textContent = valor
    marcadorSpanStatus.style.backgroundColor = cor
    statusDropdown.textContent = valor
    statusDropdown.style.backgroundColor = cor
}

document.getElementById('S-emDia').addEventListener('click' , function(){
    atualizarMarcadorStatus('Em dia' , '#4ECBC4')
})

document.getElementById('S-emRisco').addEventListener('click' , function(){
    atualizarMarcadorStatus('Em risco' , '#F8DF72')
})

document.getElementById('S-emAtraso').addEventListener('click' , function(){
    atualizarMarcadorStatus('Em atraso' , '#F06A6A')
})

document.getElementById('S-vazio').addEventListener('click' , function(){
    atualizarMarcadorStatus('-' , '#ccc')
})