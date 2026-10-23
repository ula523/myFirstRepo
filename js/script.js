'use strict';

//Создание функции-конструктора DomElement
const DomElement = function (selector, height, width, bg, fontSize, position ) {
    this.selector = selector,
    this.height = height,
    this.width = width,
    this.bg = bg,
    this.fontSize = fontSize,
    this.position = position,

    //метод, который создает элемент на странице в зависимости от условия
    this.addElement = function () {

        let element;

    if (this.selector.startsWith('.')) { //если строка selector начинается с точки
         
        element = document.createElement('div'); //создание элемента div
        element.className = this.selector.slice(1); // выдает строку начиная с индекса 1

        // console.log("div");
    } else if (this.selector.startsWith('#')) { //если строка selector начинается с решетки # 

         element = document.createElement('div'); //создание элемента div
         element.id = this.selector.slice(1); // выдает строку начиная с индекса 1

        // console.log("id");

    }
  

    element.style.cssText = `
            height: ${this.height}px;
            width: ${this.width}px;
            background: ${this.bg};
            font-size: ${this.fontSize}px;
            position: ${this.position};
        `;

        document.body.append(element); //добавдение элемента на страницу
        
    }
  }


const element1 = new DomElement('#block', 300, 100, 'lightgrey', 18);

//квадрат 100 на 100 пикселей, фон(background) любого цвета, position: absolute
const element2 = new DomElement('.block', 100, 100, 'lightblue', 18, 'absolute');

const element3 = new DomElement('.div', 400, 500, 'red', 18);


element1.addElement();
element2.addElement();
element3.addElement();

console.log(element2);

