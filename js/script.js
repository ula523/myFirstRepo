'use strict';


let title = document.getElementsByTagName('h1')[0]
let buttonStart = document.getElementsByClassName('handler_btn')[0]
let buttonReset = document.getElementsByClassName('handler_btn')[1]
let plus = document.querySelector('.screen-btn')
let otherItemsPercent = document.querySelectorAll('.other-items.percent')
let otherItemsNumber = document.querySelectorAll('.other-items.number')
let range = document.querySelector('.rollback input[type="range"]')
let rangeValue = document.querySelector('span.range-value ')
let totalInput = document.getElementsByClassName('total-input')
let screenClass = document.querySelectorAll('.screen')

for (const input of totalInput) {
  console.log(input);
}



const appData = {
title: '',
screens: [],
screenPrice: 0,
adaptive: true,
rollback: 10,
allServicePrices: 0,
fullPrice: 0,
servicePercentPrice: 0,
services: {},
start: function () {
appData.asking();
appData.addPrices();
appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
appData.getServicePercentPrices();
appData.getTitle();
appData.logger();
},
// проверка на число
isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
},
//проверка на строку
isText: function (str) {
    return typeof str === 'string' && /\p{L}/u.test(str);
},

asking: function () {
    
    do {
        appData.title = prompt("Как называется ваш проект?","Калькулятор верстки");
    } while (!appData.isText(appData.title));

    for (let i = 0; i < 2; i++) {
        let name;

     
        do {
            name = prompt("Какие типы экранов нужно разработать?");
        } while (!appData.isText(name));

        let price;

      
        do {
            price = prompt("Сколько будет стоить данная работа?");
        } while (!appData.isNumber(price));

        appData.screens.push({id: i, name: name.trim(), price: +price});
    }

    for (let i = 0; i < 2; i++) {
        let name;

        
        do {
            name = prompt("Какой дополнительный тип услуги нужен?");
        } while (!appData.isText(name));

        let price;

        do {
            price = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(price));

        appData.services[name.trim()] = +price;
    }

    appData.screenPrice = +appData.screenPrice;
    appData.adaptive = confirm("Нужен ли адаптив?");
},

addPrices: function() {
   //считает стоимость
    for(let screen of appData.screens) {
    appData.screenPrice += +screen.price

}
for(let key in appData.services){
    appData.allServicePrices += appData.services[key]
  }

},

 getFullPrice: function (screenPrice, allServicePrices) {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
},
getServicePercentPrices: function() {
     appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
},
getTitle: function () {
      appData.title =  appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase()
},
getRollbackMessage: function (price) {
    if (price >= 30000){
    return "Даем скидку в 10%";
} else if (price >= 15000 && fullPrice < 30000){
     return "Даем скидку в 5%";
} else if (price >= 0 && fullPrice < 15000){
    return "Скидка не предусмотрена";
} else {
    return "Что то пошло не так";
}
},

logger: function () {
console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
console.log(appData.screens);
}
}


appData.start();