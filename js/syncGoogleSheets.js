import { main } from "./main.js";
import { setDishesData } from "./store.js";

let api = "https://script.google.com/macros/s/AKfycbzQO98Ddw4JUXQpy036Axst0n9y-h3S3xEanj-V5k0egpsvOf7jGI5_KqlQuVu02fqR/exec";

async function fetchDishesList() {
    const loadingPreloader = document.getElementById('loadingPreloader');
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        };
        const data = await response.json();
        processData(data);
        document.getElementById('mainNav').classList.remove('hidden');
        document.querySelector('main.dishes').classList.remove('hidden');
        document.querySelector('section.cart').classList.remove('hidden');
        setTimeout(() => {
            loadingPreloader.classList.add('hidden');
        }, 200);
    } catch (error) {
        console.error('Ошибка:', error);
        loadingPreloader.textContent = 'Ошибка загрузки меню. Пожалуйста, попробуйте позже.';
    };
};

fetchDishesList();

function processData(data) {
    const keys = data[0];
    const objectsArray = data.slice(1).map(row => {
        let obj = {};
        row.forEach((value, index) => {
            obj[keys[index]] = value;
        });
        return obj;
    });

    const dishData = {};
    objectsArray.forEach(item => {
        const categoryKey = item['category-en'].split(' ').join('_');

        if (!dishData[categoryKey]) {
            dishData[categoryKey] = {
                name: {
                    ru: item['category-ru'],
                    en: item['category-en'],
                    de: item['category-de'],
                },
                items: [],
            };
        }

        const dish = {
            name: {
                ru: item['name-ru'],
                en: item['name-en'],
                de: item['name-de'],
            },
            price: {},
            description: {
                ru: item['description-ru'],
                en: item['description-en'],
                de: item['description-de'],
            },
            img: item['img'],
            inStore: item['in-store']
        };

        for (let i = 1; i <= 3; i++) {
            const portionKey = `porirtion${i}`;
            const priceKey = `price${i}`;
            const portion = item[portionKey];
            const price = item[priceKey];

            if (portion && price) {
                dish.price[portion] = parseFloat(price);
            }
        }
        dishData[categoryKey].items.push(dish);
    });

    setDishesData(dishData);
    main();
};



















export let additData = {
    bg: {
        menu: './img/main/bg-1.jpg',
        main: './img/main/bg-1.jpg',
    },
    colors: {
        darkTheme: {
            color0: 'rgba(0, 0, 0, 0.7)', // немного прозрачный фон
            color1: '#060606', // фон
            color1_1: '#120f0c59', // очень прозрачный фон
            color1_5: '#150b04c5', // полупрозрачный фон
            color2: '#39090f', // немного изменённый акцент-цвет
            color3: '#c2404f', // акцент-цвет
            color4: '#f4f9fb', // цвет текста
        },

        lightTheme: {
            color0: 'rgba(255, 255, 255, 0.7)', // немного прозрачный фон
            color1: '#f4f9fb', // фон
            color1_1: '#f4f9fb59', // очень прозрачный фон
            color1_5: '#f4f9fbc5', // полупрозрачный фон
            color2: '#f9b7bf', // немного изменённый акцент-цвет
            color3: '#87232f', // акцент-цвет
            color4: '#030303', // цвет текста
        },
    },
};

