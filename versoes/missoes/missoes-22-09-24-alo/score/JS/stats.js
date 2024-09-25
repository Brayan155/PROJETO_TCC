const claimPTS = document.getElementById("pontos")
const btnPontos = document.querySelector(".btn")

const updateValue = () => {

    claimPTS.innerHTML = count;
}

let count = 0
let intervalId = 0

btnPontos.addEventListener('mousedown', ()=>{

    intervalId = setInterval(()=>{

            count += 1;

            updateValue()
    },60)
})

document.addEventListener('mouseup', () => clearInterval(intervalId)) 





