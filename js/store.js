let data = {
    valute: '$',
    language: document.documentElement.lang,
    mainLang: 'ru',
    name: 'Shakespeare',
    languages: ['ru', 'en', 'de'],
    xType: 'pro', // #DO-BASIC
    mainMenu: 'Основное',
};

let sheetsData = {
    api: 'https://script.google.com/macros/s/AKfycbwTxWnjPptRmIwFxgX7cb9py5zSxJSajGx0KkuGYmO5cXDIxdutWGNsovYPCn9R-7aR/exec'
};

let indexData = [
    ['.page__title', 'shakespeare'],
    ['.page__subtitle', 'coffee & bistro'],
];

let payData = {
    totalPrice: 0,
};

let languageData = {
    ru: {
        'title': 'Меню | ' + data.name,
        '#menuTitle': 'Меню',
        '#orderTitle': 'Ваш заказ',
        '#callOfficiant': 'Вызвать официанта',
        '#sendMenu': 'Отправить заказ',
        '#sureCall': 'Вы уверены в вызове официанта?',
        '#popup_order__confirm': 'Да',
        '#popup_order__cancel': 'Отмена',
        '.popup__button_ok': 'Да',
        '.popup__button_cancel': 'Отмена',
        '#cancelOrderSend': 'Отменить отправку заказа',
        'forJs': {
            total: 'Итого',
            cancelOrderDescription: 'Отмениться то, что вы заказали в ',
            understand: 'Понятно',
            lang: 'Сменить язык на',
            order: 'Заказ',
            orderSended: 'Заказ отправлен',
            surePortions: 'Вы хотите удалить эту порцию?',
            canceled: 'Отменено',
            cashes: 'Наличными',
            cards: 'Картой',
            portion: 'Порция',
            soonOfficiant: 'Официант скоро подойдёт',
            count: 'Количество',
            sureOrder: 'Вы уверены в отправке заказа?',
            cantSendOrder: 'Вы не можете отправить заказ с пустой корзиной, но можете нажать кнопку "Позвать официанта"',
            cantPayOrder: 'Вы ещё не сделали заказ, чтобы оплатить его',
            choosePayOrder: 'Выберите способ оплаты:',
            payOrdered: 'Сейчас к вам подойдёт официант',
            chooseTable: 'Мы не смогли определить номер вашего стола. Введите его пожалуйста',
            addToOrder: 'Добавить к заказу'
        },
        '#payOrder': 'Оплатить заказ',
    },
    en: {
        'title': 'Menu | ' + data.name,
        '#menuTitle': 'Menu',
        '#orderTitle': 'Your Order',
        '#callOfficiant': 'Call the waiter',
        '#sendMenu': 'Send Order',
        '#sureCall': 'Are you sure you want to call the waiter?',
        '#popup_order__confirm': 'Yes',
        '#popup_order__cancel': 'Cancel',
        '.popup__button_ok': 'Yes',
        '.popup__button_cancel': 'Cancel',
        '#surePortions': 'Do you want to remove this portion?',
        'forJs': {
            total: 'Total',
            understand: 'Understand',
            canceled: 'Cancelled',
            order: 'Order',
            lang: 'Change Language to',
            portion: 'Portion',
            count: 'Count',
            sureOrder: 'Are you sure you want to send the order?',
            cantSendOrder: 'You cannot send an order with an empty cart, but you can press the "Call the waiter" button',
            cantPayOrder: 'You have not yet placed an order to pay for it',
            choosePayOrder: 'Choose a payment method:',
            chooseTable: 'We could not determine your table number. Please enter it',
            soonOfficiant: 'The waiter will be with you soon',
        },
        '#payOrder': 'Pay Order',
    },
    de: {
        'title': 'Menü | ' + data.name,
        '#menuTitle': 'Menü',
        '#orderTitle': 'Ihre Bestellung',
        '#callOfficiant': 'Kellner rufen',
        '#sendMenu': 'Bestellung senden',
        '#sureCall': 'Sind Sie sicher, dass Sie den Kellner rufen möchten?',
        '#popup_order__confirm': 'Ja',
        '#popup_order__cancel': 'Abbrechen',
        '.popup__button_ok': 'Ja',
        '.popup__button_cancel': 'Abbrechen',
        '#surePortions': 'Möchten Sie diese Portion entfernen?',
        'forJs': {
            total: 'Gesamt',
            understand: 'Verstanden',
            canceled: 'Abgebrochen',
            order: 'Bestellung',
            cancel: 'Abbrechen',
            portion: 'Portion',
            count: 'Anzahl',
            lang: 'Sprache wechseln auf',
            sureOrder: 'Sind Sie sicher, dass Sie die Bestellung senden möchten?',
            cantSendOrder: 'Sie können keine Bestellung mit einem leeren Warenkorb senden, aber Sie können die Schaltfläche "Kellner rufen" drücken',
            cantPayOrder: 'Sie haben noch keine Bestellung aufgegeben, um sie zu bezahlen',
            choosePayOrder: 'Wählen Sie eine Zahlungsmethode:',
            chooseTable: 'Wir konnten Ihre Tischnummer nicht bestimmen. Bitte geben Sie sie ein',
            soonOfficiant: 'Der Kellner wird bald bei Ihnen sein',
        },
        '#payOrder': 'Zahlung machen',
    },
};




function textToId(text) {
    return text
        .normalize('NFKD') // Приводим символы к нормальной форме
        .replace(/[\u0400-\u04FF\u0500-\u052F\u1E00-\u1EFF]/g, match => {
            return match.charCodeAt(0).toString(36); // Кодируем нестандартные символы в base36
        })
        .replace(/[^a-zA-Z0-9-]/g, '-') // Заменяем пробелы и недопустимые символы
        .replace(/-+/g, '-') // Убираем дублирующиеся дефисы
        .replace(/^-+|-+$/g, '') // Удаляем дефисы по краям
        .toLowerCase();
};




let dishesData = {};

let setDishesData = function (newData) {
    dishesData = newData;
};


let getDishesData = function () {
    return dishesData;
};



let setLastOrder = function (newLastOrder, isNew = true) {
    lastOrder = newLastOrder;
    if (newLastOrder != 'delete') {
        allLasts.push(lastOrder);
    } else {
        allLasts = JSON.parse(localStorage.getItem(data.name + '-allLastS'));
        lastOrder = allLasts.pop();
    };
    localStorage.setItem(data.name + '-allLastS', JSON.stringify(allLasts))
    localStorage.setItem(data.name + '-lastS', JSON.stringify(lastOrder));
};

let cartData = {};
let lastOrder = -1;
let allLasts = [];


function setCartData(newData) {
    cartData = newData;
};