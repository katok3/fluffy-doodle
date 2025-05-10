// Данные мемов
const memes = [
    {
        id: 1,
        category: 'classic',
        title: 'Distracted Boyfriend',
        description: 'Парень отвлекается на другую девушку, когда идет с девушкой.',
        year: 2017,
        source: 'https://knowyourmeme.com/memes/distracted-boyfriend',
        image: 'distracted-boyfriend.jpg'
    },
    {
        id: 2,
        category: 'gaming',
        title: 'Press F to Pay Respects',
        description: 'Фраза из игры Call of Duty: Advanced Warfare.',
        year: 2014,
        source: 'https://knowyourmeme.com/memes/press-f-to-pay-respects',
        image: 'f.jpg'
    },
    {
        id: 3,
        category: 'animal',
        title: 'Grumpy Cat',
        description: 'Известная кошка с сердитым выражением лица.',
        year: 2012,
        source: 'https://knowyourmeme.com/memes/grumpy-cat',
        image: 'cat.jpg'
    },
    {
        id: 4,
        category: 'classic',
        title: 'Success Kid',
        description: 'Малыш с сжатым кулаком и выражением победы.',
        year: 2007,
        source: 'https://knowyourmeme.com/memes/success-kid',
        image: 'baby.jpg'
    },
    {
        id: 5,
        category: 'gaming',
        title: 'Leeroy Jenkins',
        description: 'Игрок, который бросается в бой без плана.',
        year: 2005,
        source: 'https://knowyourmeme.com/memes/leeroy-jenkins',
        image: 'leroy.jpeg'
    },
    {
        id: 6,
        category: 'animal',
        title: 'Doge',
        description: 'Шиба-ину с забавными надписями на ломаном английском.',
        year: 2013,
        source: 'https://knowyourmeme.com/memes/doge',
        image: 'doge.jpg'
    },
    {
        id: 7,
        category: 'classic',
        title: 'Bad Luck Brian',
        description: 'Парень с неудачными событиями на фото.',
        year: 2012,
        source: 'https://knowyourmeme.com/memes/bad-luck-brian',
        image: 'bad.jpg'
    },
    {
        id: 8,
        category: 'gaming',
        title: 'Creeper Aw Man',
        description: 'Фраза из песни по Minecraft.',
        year: 2011,
        source: 'https://knowyourmeme.com/memes/creeper-aw-man',
        image: 'min.jpg'
    },
    {
        id: 9,
        category: 'animal',
        title: 'Business Cat',
        description: 'Кот в галстуке с деловыми советами.',
        year: 2011,
        source: 'https://knowyourmeme.com/memes/business-cat',
        image: 'cat1.jpeg'
    },
    {
        id: 10,
        category: 'classic',
        title: 'Philosoraptor',
        description: 'Динозавр, задающий философские вопросы.',
        year: 2008,
        source: 'https://knowyourmeme.com/memes/philosoraptor',
        image: 'dino.jpeg'
    }
];

// Элементы DOM
const gallery = document.getElementById('memes-gallery');
const categoryNav = document.getElementById('category-nav');
const searchInput = document.getElementById('search-input');

const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalYear = document.getElementById('modal-year');
const modalSource = document.getElementById('modal-source');

const logo = document.getElementById('logo');
const easterEgg = document.getElementById('easter-egg');

let currentCategory = 'all';
let currentSearch = '';

// Функция отображения мемов
function displayMemes() {
    // Фильтрация по категории
    let filteredMemes = currentCategory === 'all' ? memes : memes.filter(m => m.category === currentCategory);

    // Фильтрация по поиску
    if (currentSearch.trim() !== '') {
        const searchLower = currentSearch.toLowerCase();
        filteredMemes = filteredMemes.filter(m =>
            m.title.toLowerCase().includes(searchLower) ||
            m.description.toLowerCase().includes(searchLower) ||
            m.category.toLowerCase().includes(searchLower)
        );
    }

    // Очистка галереи
    gallery.innerHTML = '';

    if (filteredMemes.length === 0) {
        gallery.innerHTML = '<p>Мемы не найдены.</p>';
        return;
    }

    // Создание карточек мемов
    filteredMemes.forEach(meme => {
        const card = document.createElement('div');
        card.classList.add('meme-card');
        card.tabIndex = 0; // для доступности

        card.innerHTML = `
            <img src="${meme.image}" alt="${meme.title}" loading="lazy" />
            <div class="meme-info">
                <h3>${meme.title}</h3>
                <p>${meme.description.substring(0, 60)}...</p>
            </div>
        `;

        // Открытие модального окна при клике
        card.addEventListener('click', () => openModal(meme));
        card.addEventListener('keypress', e => {
            if (e.key === 'Enter') openModal(meme);
        });

        gallery.appendChild(card);
    });
}

// Открытие модального окна с деталями
function openModal(meme) {
    modalImg.src = meme.image;
    modalImg.alt = meme.title;
    modalTitle.textContent = meme.title;
    modalDescription.textContent = meme.description;
    modalYear.textContent = meme.year;
    modalSource.href = meme.source;
    modalSource.textContent = 'Источник';

    modal.classList.remove('hidden');
}

// Закрытие модального окна
modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Закрытие модального окна при клике вне контента
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Навигация по категориям
categoryNav.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
        // Снять активный класс с предыдущего
        categoryNav.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        e.target.classList.add('active');

        currentCategory = e.target.dataset.category;
        displayMemes();
    }
});

// Поиск мемов
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    displayMemes();
});

// Пасхалка: при клике на логотип показываем анимацию на 3 секунды
logo.addEventListener('click', () => {
    easterEgg.classList.remove('hidden');
    setTimeout(() => {
        easterEgg.classList.add('hidden');
    }, 3000);
});

// Инициализация
displayMemes();
