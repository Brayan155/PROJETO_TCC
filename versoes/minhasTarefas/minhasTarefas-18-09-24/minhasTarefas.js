const centralContent = document.querySelector('#central-content');
const CircleCheck = document.querySelector('#fa-circle-check')
const taskTitle = document.querySelector('#bla-blad')
const trashCanIcon = document.querySelector('#trashCan1')

const originalBackgrounColor = '#dfdfdf';
const originalTextColor = '#000'

centralContent.addEventListener('click', () => {
    if (centralContent.style.backgroundColor === 'rgb(46, 70, 140)') {
        centralContent.style.backgroundColor = originalBackgrounColor;
        CircleCheck.style.color = originalTextColor
        taskTitle.style.color = originalTextColor
        trashCanIcon.style.color = originalTextColor
    } else {
        centralContent.style.backgroundColor = '#2E468C';
        CircleCheck.style.color = '#fff'
        taskTitle.style.color = '#fff'
        trashCanIcon.style.color = '#fff'
    }
});

