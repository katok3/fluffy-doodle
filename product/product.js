// Плавная прокрутка для навигации
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Анимация счетчиков
  const counters = document.querySelectorAll('.stat-number');
  const options = {
    root: null,
    threshold: 0,
    rootMargin: "0px"
  };
  
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 200; // скорость анимации
  
    function update() {
      count += increment;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    }
    update();
  }
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
  
  // Обработка подписки (имитация)
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email');
  const message = document.getElementById('subscribe-message');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
  
    if (email) {
      message.style.color = 'lightgreen';
      message.textContent = `Спасибо, ${email}! Вы успешно подписались.`;
      emailInput.value = '';
    } else {
      message.style.color = 'lightcoral';
      message.textContent = 'Пожалуйста, введите корректный email.';
    }
  });
  
  // Кнопка записи на курс с анимацией пульсации
  const signupBtn = document.getElementById('signup-btn');
  signupBtn.addEventListener('click', () => {
    alert('Спасибо за ваш интерес! Форма записи скоро появится.');
  });
  
  // Плавное появление отзывов при скролле
  const reviews = document.querySelectorAll('.review');
  
  function checkReviewsVisibility() {
    reviews.forEach(review => {
      const rect = review.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        review.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkReviewsVisibility);
  window.addEventListener('load', checkReviewsVisibility);
  