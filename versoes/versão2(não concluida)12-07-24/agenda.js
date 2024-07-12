
// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input-title');
const todoDateInput = document.querySelector('#todo-input-date');
const todoTimeInput = document.querySelector('#todo-input-hora');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const modalEdit = document.querySelector('#modal2');
const modalDialogEdit = document.querySelector('#modal-dialog-edit');
const emptyList = document.querySelector('.empty-list')
const todoInputDesc = document.querySelector('#todo-input-desc')
const editFormBtn = document.querySelector('#Salvar-edit')

let oldInputValue

// Função para formatar a data no formato ano/mês/dia
const formatDate = (dateString) => {
    // Cria um novo objeto Date a partir da string de data fornecida
    const date = new Date(dateString);

    // Obtém o ano com quatro dígitos
    const year = date.getFullYear();

    // Obtém o mês (de 0 a 11) e adiciona 1 para que o mês esteja no intervalo de 1 a 12
    // Converte para string e adiciona um zero à esquerda, se necessário, para garantir que tenha dois dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Obtém o dia do mês (de 1 a 31)
    // Converte para string e adiciona um zero à esquerda, se necessário, para garantir que tenha dois dígitos
    const day = String(date.getDate()).padStart(2, '0');

    // Retorna a data formatada como "ano/mês/dia"
    return `${year}/${month}/${day}`;
};


// Função para salvar tarefas
const saveTodo = (Text, Date, Time) => {
    // Criar a nova div que armazena todo
    const todo = document.createElement('div');
    todo.classList.add('todo', 'd-flex', 'p-3', 'mb-2'); // Adicione as classes de estilo aqui
    todo.style.borderBottom = '1px solid white'

    // Criar título todo
    const todoTitle = document.createElement('a');
    todoTitle.innerText = Text;
    todoTitle.classList.add('todo-title', 'mb-1'); // Adicione as classes de estilo aqui
    todoTitle.style.flex = 1;
    todoTitle.style.color = 'white'
    todoTitle.style.cursor = 'pointer'
    todoTitle.style.textDecoration = 'none'
    //adicionar hover ao todoTitle
    todoTitle.addEventListener('mouseover', () => {
        todoTitle.style.textDecoration = 'underline'
    })
    todoTitle.addEventListener('mouseout', () => {
        todoTitle.style.textDecoration = 'none'
    })
    todoTitle.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.href = "minhasTarefas.html"
    })
    todo.appendChild(todoTitle);

    // Data
    const formattedDate = formatDate(Date);
    const todoDate = document.createElement('p');
    todoDate.innerText = formattedDate;
    todoDate.classList.add('data', 'dma', 'mx-3', 'my-2'); // Adicione as classes de estilo aqui
    todo.appendChild(todoDate);

    // Hora
    const todoTime = document.createElement('p');
    todoTime.innerText = Time;
    todoTime.classList.add('data', 'hora', 'my-2'); // Adicione as classes de estilo aqui
    todo.appendChild(todoTime);


    //botoes   

    // Botão de tarefa feita
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo', 'btn', 'btn-feito');
    doneBtn.style.marginLeft = '6px'
    doneBtn.innerHTML = '<i class="ri-check-double-line "></i>';
    todo.appendChild(doneBtn);

    // Botão de edição de tarefa
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo', 'btn', 'btn-edita');
    editBtn.style.marginLeft = '6px'
    editBtn.innerHTML = '<i class="ri-edit-line"></i>';
    editBtn.addEventListener('click', () => {
        const modalEdit = new bootstrap.Modal(document.getElementById('modal2'));
        modalEdit.show();
    });
    todo.appendChild(editBtn);

    // Botão de deletar tarefa
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo', 'btn', 'btn-delete');
    deleteBtn.style.marginLeft = '6px'
    deleteBtn.innerHTML = '<i class="ri-delete-bin-line btn-apaga"></i>';
    todo.appendChild(deleteBtn);

    // Adicionar a nova div todo à lista de tarefas
    todoList.appendChild(todo);


    emptyList.style.display = 'none'
};

const updateTodo = (text) =>{
    const todos = document.querySelectorAll('.todo')
    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector('a')
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    const inputDate = todoDateInput.value;
    const inputTime = todoTimeInput.value;
    if (inputValue && inputDate && inputTime) {
        saveTodo(inputValue, inputDate, inputTime);
        todoInput.value = "";
        todoDateInput.value = "";
        todoTimeInput.value = "";
    }
});

// Função pop-up edição
modalEdit.addEventListener('shown.bs.modal', () => {
    modalDialogEdit.focus();
});

//evento de click dos botões 
document.addEventListener('click', (e) => {
    //elemento clicado
    const targetEl = e.target
    //elemento pai
    const parentEL = targetEl.closest("div")
    let todoTitleEdit

    if(parentEL && parentEL.querySelector("a")){
        todoTitleEdit = parentEL.querySelector("a").innerText
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEL.classList.toggle('.done')
    }
    if (targetEl.classList.contains("remove-todo")) {
        parentEL.remove()
    }
    if (targetEl.classList.contains("edit-todo")) {
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()
    todoInput.innerText = ""
    todoInputDesc.innerText = ""
    todoTimeInput.innerText = ""
    todoDateInput.innerText = ""
})

editFormBtn.addEventListener("submit" , (e) =>{
    e.preventDefault()
    const editInputValue = editInput.value
    if(editInputValue){
        //atualizar
        updateTodo(editInputValue)
    }
})