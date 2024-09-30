document.querySelectorAll('.toggle-objective').forEach((button, index) => {
    button.addEventListener('click', () => {
        const objective = document.querySelectorAll('.mission-objective')[index];
        objective.style.display = objective.style.display === 'block' ? 'none' : 'block';
    });
});
   