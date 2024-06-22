// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoDate = document.querySelector("#todo-input-date");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const editDate = document.querySelector("#edit-input-date"); // Adicione um campo de data ao formulário de edição
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveTodo = (text, date, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // Format the date to dd/mm/yyyy
    const formattedDate = formatDate(date);
    const todoDateElement = document.createElement("p");
    todoDateElement.classList.add('date-p');
    todoDateElement.innerText = formattedDate;

    // Check if the date is past and set the color to red if true
    if (isPastDate(date)) {
        todoDateElement.style.color = 'red';

        // Cria um novo ícone para cada tarefa vencida
        let infoIcon = document.createElement('i');
        infoIcon.classList.add('ri-information-line', 'infoIcon');
        todoDateElement.appendChild(infoIcon);

        // Adiciona um evento de clique ao ícone
        infoIcon.addEventListener('click', function () {
            alert('Vencida');
        });
    }

    todo.appendChild(todoDateElement);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    // Utilizando dados da localStorage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, date, done: 0 });
    }

    todoList.appendChild(todo);

    todoInput.value = "";
    todoDate.value = "";
};

// Helper function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${ day } /${month}/${ year }`;
};

// Helper function to check if the date is in the past
const isPastDate = (dateString) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const [year, month, day] = dateString.split("-");
    const todoDate = new Date(year, month - 1, day).setHours(0, 0, 0, 0);

    return todoDate < today;
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text, date) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            let todoDateElement = todo.querySelector(".date-p");
            const formattedDate = formatDate(date);
            todoDateElement.innerText = formattedDate;

            // Remove qualquer ícone existente
            const existingIcon = todoDateElement.querySelector('.infoIcon');
            if (existingIcon) {
                existingIcon.remove();
            }

            // Check if the date is past and set the color to red if true
            if (isPastDate(date)) {
                todoDateElement.style.color = 'red';

                // Cria um novo ícone para cada tarefa vencida
                let infoIcon = document.createElement('i');
                infoIcon.classList.add('ri-information-line', 'infoIcon');
                todoDateElement.appendChild(infoIcon);
            } else {
                todoDateElement.style.color = '';
            }

            // Utilizando dados da localStorage
            updateTodoLocalStorage(oldInputValue, text, date);
        }
    });
};

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitle.includes(search)) {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
    const today = new Date().setHours(0, 0, 0, 0);

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );
            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );
            break;

        case "late":
            todos.forEach((todo) => {
                const dateText = todo.querySelector(".date-p").innerText;
                const [day, month, year] = dateText.split("/");
                const todoDate = new Date(`${year}-${ month}-${day}`).setHours(0, 0, 0, 0);

                todo.style.display = todoDate < today && !todo.classList.contains("done") ? "flex" : "none";
            });
            break;

        default:
            break;
    }
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    const inputDateValue = todoDate.value;

    if (inputValue && inputDateValue) {
        saveTodo(inputValue, inputDateValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText || "";
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();

        // Utilizando dados da localStorage
        removeTodoLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        editDate.value = parentEl.querySelector(".date-p").dataset.date; // Obtendo a data no formato original
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    const editDateValue = editDate.value;

    if (editInputValue && editDateValue) {
        updateTodo(editInputValue, editDateValue);
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();

    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.date, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (oldText, newText, newDate) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === oldText ? ((todo.text = newText), (todo.date = newDate)) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();