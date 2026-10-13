'use strict';

const appData = {
title: '',
screens: '',
screenPrice: 0,
adaptive: true,
rollback: 10,
allServicePrices: 0,
fullPrice: 0,
servicePercentPrice: 0,
service1: '',
service2: '',
asking: function () {
 appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
 appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

do {
    appData.screenPrice = prompt("Сколько будет стоить данная работа?");
} while (appData.screenPrice !== null && !appData.isNumber(appData.screenPrice));

 appData.screenPrice = +appData.screenPrice;
 appData.adaptive = true || confirm('Нужен ли адаптив?');

},
 isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
},
 getAllServicePrices: function () {
    let servicePrices
    let sum = 0

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?')

        } else if (i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?')

        }

        //Проверка на число

        do {
            appData.servicePrices = prompt('Сколько это будет стоить?');
        } while (!appData.isNumber(appData.servicePrices));

         sum += +appData.servicePrices;
        
    }
    return sum
  //  return servicePrice1 + servicePrice2
},
 getFullPrice: function (screenPrice, allServicePrices) {
    return appData.screenPrice + appData.allServicePrices;
},
getServicePercentPrices: function() {
     return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
},
getTitle: function () {
      return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase()
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
start: function () {
appData.asking();

appData.allServicePrices = appData.getAllServicePrices();
appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
appData.servicePercentPrice = appData.getServicePercentPrices();
appData.title = appData.getTitle();
appData.logger();


},
logger: function () {
console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
for (let key in appData) {
    console.log(key, appData[key]);
}

}

}





appData.start();




