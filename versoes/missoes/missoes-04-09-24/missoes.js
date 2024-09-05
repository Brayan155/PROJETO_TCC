document.addEventListener("DOMContentLoaded", function() {
    // Seleciona as colunas onde os cartões serão inseridos
    const columns = document.querySelectorAll(".col");

    // Exemplo de configuração para cada tipo de cartão
    const missions = [
        {
            className: "coin-card",
            iconClass: "fa-database",
            buttonLabel: "Feito"
        },
        {
            className: "book-card",
            iconClass: "fa-book",
            buttonLabel: "Feito"
        },
        {
            className: "hs-card",
            iconClass: "fa-graduation-cap",
            buttonLabel: "Feito"
        },
        {
            className: "file-card",
            iconClass: "fa-file-alt",
            buttonLabel: "Feito"
        }
    ];

    // Cria dinamicamente os cartões e os insere nas colunas
    missions.forEach((mission, index) => {
        const column = columns[index]; // Seleciona a coluna correspondente

        if (column) {
            const missionCard = document.createElement("div");
            missionCard.setAttribute("class", `mission-card ${mission.className}`);

            const missionIcon = document.createElement("div");
            missionIcon.setAttribute("class", `mission-icon ${mission.className}`);
            missionIcon.innerHTML = `<i class="fa-solid ${mission.iconClass}"></i>`;

            const progressBarContainer = document.createElement("div");
            progressBarContainer.setAttribute("class", "progress-bar-container");

            const progressBar = document.createElement("div");
            progressBar.setAttribute("class", "progress-bar");
            progressBarContainer.appendChild(progressBar);

            const button = document.createElement("button");
            button.setAttribute("class", "btn btn-success mark-done");
            button.textContent = mission.buttonLabel;

            // Adiciona os elementos ao cartão
            missionCard.appendChild(missionIcon);
            missionCard.appendChild(progressBarContainer);
            missionCard.appendChild(button);

            // Adiciona o cartão à coluna
            column.appendChild(missionCard);
        }
    });
});
