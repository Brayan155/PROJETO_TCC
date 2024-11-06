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

//date

// Seleciona o campo de data e o elemento <p> onde a data será exibida
const dateInput = document.querySelector('#date-range');
const dateDisplay = document.querySelector('#date-p');

// Atualiza o texto do <p> com a data selecionada
dateInput.addEventListener('change', (event) => {
    dateDisplay.textContent = event.target.value;
});


//mover div
// Seleciona o dropdown de status e as colunas de cada seção
const colunaAFazer = document.querySelector('.column-wrapper:nth-child(1) .column');
const colunaEmProgresso = document.querySelector('.column-wrapper:nth-child(2) .column');
const colunaFeito = document.querySelector('.column-wrapper:nth-child(3) .column');

// Função para mover a div central-content de acordo com o status
function moverTarefaParaColuna(status) {
    // Verifica e remove a centralContent de qualquer coluna onde já esteja
    if (colunaAFazer.contains(centralContent)) {
        colunaAFazer.removeChild(centralContent);
    }
    if (colunaEmProgresso.contains(centralContent)) {
        colunaEmProgresso.removeChild(centralContent);
    }
    if (colunaFeito.contains(centralContent)) {
        colunaFeito.removeChild(centralContent);
    }

    // Adiciona centralContent na coluna correspondente ao status
    if (status === 'a fazer') {
        colunaAFazer.appendChild(centralContent);
    } else if (status === 'em progresso') {
        colunaEmProgresso.appendChild(centralContent);
    } else if (status === 'feito') {
        colunaFeito.appendChild(centralContent);
    }
}


// Adiciona eventos aos itens do dropdown para mover a tarefa
document.querySelector('.dropdown-menu').addEventListener('click', (event) => {
    if (event.target.textContent.trim() === 'a fazer') {
        moverTarefaParaColuna('a fazer');
    } else if (event.target.textContent.trim() === 'em progresso') {
        moverTarefaParaColuna('em progresso');
    } else if (event.target.textContent.trim() === 'feito') {
        moverTarefaParaColuna('feito');
    }

   
});

