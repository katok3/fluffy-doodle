document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('mouseover', () => {
        const tooltip = logo.querySelector('.tooltip');
        tooltip.style.display = 'block';
        tooltip.classList.add('show'); // Добавляем класс для анимации
    });

    logo.addEventListener('mouseout', () => {
        const tooltip = logo.querySelector('.tooltip');
        tooltip.style.display = 'none';
        tooltip.classList.remove('show'); // Убираем класс для анимации
    });
});