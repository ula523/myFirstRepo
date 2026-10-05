'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrise = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let fullPrice = screenPrise + servicePrice1 + servicePrice2;

let rollback = 98;
let rollbackPrice = fullPrice * (rollback / 100);

let servicePercentPrice =  Math.ceil(fullPrice - rollbackPrice);
console.log(servicePercentPrice);

switch(true) {
    case (fullPrice >= 30000):
        console.log("Даем скидку в 10%");
        
        break;
    case (fullPrice >= 15000 && fullPrice < 30000):
        console.log("Даем скидку в 5%");
        
        break;
    case (fullPrice < 15000 && fullPrice > 0):
        console.log("Скидка не предусмотрена");
        
        break;
    default:
        console.log("Что то пошло не так");
        break;
}





console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);


console.log('Стоимость верстки экранов ' + screenPrise + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

console.log(screens.toLowerCase().split(", "));


console.log(fullPrice*(rollback / 100));



