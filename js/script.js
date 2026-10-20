'use strict';


let title = document.getElementsByTagName('h1')[0]
let buttonStart = document.getElementsByClassName('handler_btn')[0]
let otherItemsPercent = document.querySelectorAll('.other-items.percent')
let otherItemsNumber = document.querySelectorAll('.other-items.number')

let range = document.querySelector('.rollback input[type="range"]')
let rangeValue = document.querySelector('span.range-value ')

let buttonReset = document.getElementsByClassName('handler_btn')[1]
let plus = document.querySelector('.screen-btn')

let total = document.getElementsByClassName('total-input')[0]
let totalCount = document.getElementsByClassName('total-input')[1]
let totalCountOther = document.getElementsByClassName('total-input')[2]
let fullTotalCount = document.getElementsByClassName('total-input')[3]
let totalCountRollback = document.getElementsByClassName('total-input')[4]

let screenClass = document.querySelectorAll('.screen')

const appData = {
title: '',
screens: [],
screenPrice: 0,
adaptive: true,
rollback: 10,
servicePricesPercent: 0,
servicePricesNumber: 0,
fullPrice: 0,
servicePercentPrice: 0,
servicesPercent: {},
servicesNumber: {},
init: function() {
    appData.addTitle()
    appData.start()
    buttonStart.addEventListener('click', appData.start) //обработчик события по клику, который запускает метод appData.start
    plus.addEventListener('click', appData.addScreenBlock)

},
addTitle: function() {
    document.title = title.textContent; // изменен title страницы
    
},
start: function () {
   
    appData.addScreens()
    appData.addServices()

appData.addPrices()

//appData.getServicePercentPrices()

//appData.logger()
 appData.showResult()
},

//вывод результатов

showResult: function() {
   total.value = appData.screenPrice
   totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
   fullTotalCount.value = appData.fullPrice
},

addScreens: function() {
    screenClass = document.querySelectorAll('.screen')
  screenClass.forEach(function(screen, index) { 
    const select = screen.querySelector('select')
    const input = screen.querySelector('input')
    const selectName = select.options[select.selectedIndex].textContent // полуает текст из инпута

    appData.screens.push({
        id: index, 
        name: selectName, 
        price: +select.value * +input.value
   

  })

})
  console.log(appData.screens);
  
},
//дает объекту необходимую информацию
addServices: function() {

    otherItemsPercent.forEach(function(item) {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]') 
       console.log(check);
       console.log(label);
       console.log(input);
       if (check.checked) { //в объект попадают свойства, которые выбрали
        appData.servicesPercent[label.textContent] = +input.value; 
       }
      

    })

    otherItemsNumber.forEach(function(item) {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]') 
       console.log(check);
       console.log(label);
       console.log(input);
       if (check.checked) { //в объект попадают свойства, которые выбрали
        appData.servicesNumber[label.textContent] = +input.value; 
       }
      

    })

   

},
//проверка на строку
isText: function (str) {
    return typeof str === 'string' && /\p{L}/u.test(str);
},

//создание копии первого блока и добавление после последнего блока
addScreenBlock: function () {
    const cloneScreen = screenClass[0].cloneNode(true) // клонирует элемент на странице
    console.log(cloneScreen);
    screenClass[screenClass.length - 1].after(cloneScreen);

},


//считает стоимость
addPrices: function() {
   
    for (let screen of appData.screens) {
    appData.screenPrice += +screen.price

}
for (let key in appData.servicesNumber){
    appData.servicePricesNumber += appData.servicesNumber[key]
  }
  for (let key in appData.servicesPercent){
    appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
  }
   appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

},


getServicePercentPrices: function() {
     appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
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


appData.init();