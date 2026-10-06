'use strict';

let allServicePrices;
let fullPrice;
let servicePercentPrice;

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrise = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 98;



const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
}

const getRollbackMessage = function(price) {
    if (fullPrice >= 30000){
    return "Даем скидку в 10%";
} else if (fullPrice >= 15000 && fullPrice < 30000){
     return "Даем скидку в 5%";
} else if (fullPrice >= 0 && fullPrice < 15000){
    return "Скидка не предусмотрена";
} else {
    return "Что то пошло не так";
}
}

const getAllServicePrices = function() {
    return servicePrice1 + servicePrice2;
}

function getFullPrice() {
    return screenPrise + getAllServicePrices();
}

const getTitle = function () {
    const trimTitle = title.trim();
    return trimTitle.charAt(0).toUpperCase() + trimTitle.slice(1).toLowerCase();
}

const getServicePercentPrices = function() {
     return fullPrice - (fullPrice * rollback / 100);
}

showTypeOf(title);
showTypeOf(screenPrise);
showTypeOf(adaptive);

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

console.log(getRollbackMessage(fullPrice));


console.log(screens.length);


console.log('Стоимость верстки экранов ' + screenPrise + ' рублей');




