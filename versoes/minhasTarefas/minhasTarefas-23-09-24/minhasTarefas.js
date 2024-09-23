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

trashCanIcon.addEventListener('click' , ()=>{
    //remove central content
    centralContent.remove()
})