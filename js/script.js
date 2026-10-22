'use strict';

let title = document.getElementsByTagName('h1')[0]

let buttonStart = document.getElementsByClassName('handler_btn')[0]
let buttonReset = document.getElementsByClassName('handler_btn')[1]

let otherItemsPercent = document.querySelectorAll('.other-items.percent')
let otherItemsNumber = document.querySelectorAll('.other-items.number')

let range = document.querySelector('.rollback input[type="range"]')
let rangeValue = document.querySelector('span.range-value ')

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

init: function () {
    this.addTitle()
    buttonStart.addEventListener('click', this.start.bind(this)) //обработчик события по клику, который запускает метод this.start
    buttonReset.addEventListener('click', this.reset.bind(this))
    plus.addEventListener('click', this.addScreenBlock.bind(this))

    //меняется значение при перемещении ползунка
    range.addEventListener('input', () => {
        rangeValue.textContent = range.value;
        this.rollback = Number(range.value);
    })
},

addTitle: function () {
    document.title = title.textContent; // изменен title страницы
},

start: function () {
    //проверка, что тип экранов не пустой 
    const selects = document.querySelectorAll('.screen select');

    for (const select of selects) {
        if (select.value === '' || select.value === '0') {
            alert('Выберите тип экрана');
            return;
        }
    }
    this.addScreens();
    this.addServices();
    this.addPrices();

//this.getServicePercentPrices()
//this.logger()
    this.showResult();
    this.addButtonReset();
},

//вывод результатов
showResult: function () {
   total.value = this.screenPrice
   totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
   fullTotalCount.value = this.fullPrice
   //Стоимость с учетом отката
    totalCountRollback.value = this.servicePercentPrice
    //Количество экранов
    totalCount.value = this.screenCount;
},

addScreens: function () {
 screenClass = document.querySelectorAll('.screen')
  screenClass.forEach((screen, index) => { 
    const select = screen.querySelector('select')
    const input = screen.querySelector('input')
    const selectName = select.options[select.selectedIndex].textContent // полуает текст из инпута

    this.screens.push({
        id: index, 
        name: selectName, 
        price: +select.value * +input.value,
        count: +input.value,
  })
})
  
},
//дает объекту необходимую информацию
addServices: function () {

    otherItemsPercent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]') 
   
       if (check.checked) { //в объект попадают свойства, которые выбрали
        this.servicesPercent[label.textContent] = +input.value; 
       }
    })

    otherItemsNumber.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]')
        const label = item.querySelector('label')
        const input = item.querySelector('input[type=text]') 
     
       if (check.checked) { //в объект попадают свойства, которые выбрали
        this.servicesNumber[label.textContent] = +input.value; 
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
addPrices: function () {
    this.screenCount = 0;
   
    for (let screen of this.screens) {
    this.screenPrice += +screen.price;
    this.screenCount += screen.count;

}
for (let key in this.servicesNumber){
    this.servicePricesNumber += this.servicesNumber[key];
  }
  for (let key in this.servicesPercent){
    this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
  }
   this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

   // Доход после вычета отката посреднику
   this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
},

logger: function () {
//console.log(this.fullPrice);
//console.log(this.servicePercentPrice);
//console.log(this.screens);
},

//Нажатие на кнопку Сброс
addButtonReset: function() {
   // Переключение кнопок
    buttonReset.style.display = 'block';
    buttonStart.style.display = 'none';
   

},
//Сброс всех заполненных инпутов
reset: function() {
    document.querySelectorAll('input[placeholder="Количество экранов"]').forEach((input) => {
            input.value = '';
            input.disabled = false;
        });

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });

    document.querySelectorAll('.screen select').forEach((select) => {
        select.selectedIndex = 0;
        select.disabled = false;
    });

    // Очищает результаты
    [total, totalCount, totalCountOther, fullTotalCount, totalCountRollback].forEach((input) => {
        input.value = '';
    });

    // Обнуляет данные предыдущего расчёта
    this.screens = [];
    this.screenCount = 0;
    this.screenPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;

    // Переключение кнопок
    buttonReset.style.display = 'none';
    buttonStart.style.display = 'block';
    
}
}

appData.init();

