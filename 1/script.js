document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let scrollPosition = 0;

    nextBtn.addEventListener('click', () => {
        scrollPosition += 420; // Ширина одного testimonial + margin
        if (scrollPosition > slider.scrollWidth - slider.clientWidth) {
            scrollPosition = 0;
        }
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        scrollPosition -= 420;
        if (scrollPosition < 0) {
            scrollPosition = slider.scrollWidth - slider.clientWidth;
        }
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
    nextBtn.addEventListener('click', () => {
        slider.style.transform = `translateX(-${scrollPosition}px)`;
    });
});

document.querySelectorAll('.bxs-like').forEach(like => {
    like.addEventListener('click', () => {
        like.style.animation = 'bounce 0.5s ease';
        setTimeout(() => like.style.animation = '', 500); // Сброс анимации
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const likeIcons = document.querySelectorAll('.bxs-like');

    likeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('liked');
            console.log('Like clicked, class toggled:', icon.classList.contains('liked'));
        });
    });
});
