const missions = [
    "Missao1",
    "Missao2",
    "Missao3",
    "Missao4"
]

const missionsType = [
    "Coin",
    "Book",
    "Hs",
    "File"
]

let missionProgress = [0,0,0,0]
let lastMissionType = null

const updateTime = 24 * 60 * 60 * 1000 //24 hrs em milisegundos 

//gerar missoes
function gerarMissoes(){
    missions.forEach((mission, index) => {
        let newMissionType

        do{
            newMissionType = missionTypes[Math.floor(Math.random() * missionTypes.length)]
        }while(
            newMissionType === lastMissionType
        )

        lastMissionType = newMissionType
        document.querySelectorAll('.mission-card')[index].className = `mission-card ${newMissionType}-card`
        missionProgress[index] = 0
        updateProgressBar(index)
    })
}

//atualizar missoes
function updateMissions(){
    generateMissions();
    localStorage.setItem("MissionProgress" , JSON.stringify(missionProgress))
    localStorage.setItem("LastMissionType" , lastMissionType)
}

setInterval(updateMissions , updateTime)

//marcar como feita
function marcarFeita(){
    missionProgress[index] = 100
    updateProgressBar(index)
}

function updateProgressBar(index){
    const progressBar = document.querySelectorAll('.progress-bar')[index]
    progressBar.style.width = missionProgress[index] + "%"
}

document.querySelectorAll('.mission-card').forEach((card, index) => {
    card.addEventListener('click', () => markAsDone(index));
  });

window.onload = () => {
    if(localStorage.getItem("missionProgress")){
        missionProgress = JSON.parse(localStorage.getItem("missionProgress"))

        lastMissionType = localStorage.getItem("lastMissionType")

        missionProgress.forEach((_, index) => updateProgressBar(index))
    }else{
        generateMissions()
    }
} 

setInterval(updateMissions, updateTime);
//logica de atualização