window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();

        // Verifica se o campo de tarefa está vazio
        if (task === "") {
            alert("Por favor, insira uma tarefa antes de adicionar.");
            console.log("Tarefa vazia - não será criada.");
            return; // Impede a criação da tarefa se o campo estiver vazio
        }

        console.log("Tarefa válida - será criada.");

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';


        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        const task_info_el = document.createElement('button')
        task_info_el.classList.add('desc')
        task_info_el.innerHTML = '<i class="fa-solid fa-circle-info"></i>';

        
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_actions_el.appendChild(task_info_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = '';

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                const editedTask = task_input_el.value.trim();

                // Verifica se o campo editado está vazio
                if (editedTask === "") {
                    alert("O nome da tarefa não pode ficar vazio.");
                    task_input_el.focus();
                    return; // Impede que o usuário salve uma tarefa vazia
                }

                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
        });
    });

    const editIcon = document.querySelector("#edit-icon");
    const titleText = document.querySelector("#title-text");
    const pageTitle = document.querySelector("#page-title");

    editIcon.addEventListener('click', () => {
        // Criar um campo de input com o texto atual do título
        const currentTitle = titleText.textContent.trim();
        const inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.value = currentTitle;
        inputEl.id = "title-input";

        // Substituir o título pelo campo de input
        pageTitle.replaceChild(inputEl, titleText);
        inputEl.focus();

        // Quando o usuário sair do campo de input (perder o foco), salvar o novo título
        inputEl.addEventListener("blur", () => {
            const newTitle = inputEl.value.trim();

            // Se o novo título não estiver vazio, atualizar o título
            if (newTitle !== "") {
                titleText.textContent = newTitle;
            }

            // Substituir o campo de input pelo texto atualizado
            pageTitle.replaceChild(titleText, inputEl);
        });

        // Permitir que o usuário pressione "Enter" para confirmar a edição
        inputEl.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                inputEl.blur(); // Simula o evento de "blur" para salvar o título
            }
        });
    });


    
});