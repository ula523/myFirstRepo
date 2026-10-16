'use strict';

const book = document.querySelectorAll('.book')
const bodyBack = document.querySelector('body')
const newTitle = document.querySelectorAll('.book')[4].querySelector('h2')
const banner = document.querySelector('.adv')
const book2 = document.querySelectorAll('.book')[0].querySelectorAll('li')
const book5 = document.querySelectorAll('.book')[5].querySelectorAll('li')
let book6 = document.querySelectorAll('.book')[2].querySelectorAll('li');


book[0].before(book[1]);
book[2].before(book[4]);
book[5].after(book[2]);

bodyBack.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

newTitle.innerHTML = "Книга 3. this и <strong>Прототипы</strong> Объектов";

banner.remove();

book2[10].before(book2[2]);
book2[4].before(book2[6]);
book2[4].before(book2[8]);

book5[2].before(book5[9]);
book5[2].before(book5[3]);
book5[2].before(book5[4]);
book5[8].before(book5[5]);


let newList = book6[0].cloneNode(true);
newList.textContent = 'Глава 8: За пределами ES6';
book6[8].after(newList);
book6 = book[5].querySelectorAll('li');


console.log(book);
console.log(bodyBack);
console.log(newTitle);
console.log(banner);
console.log(book2);
console.log(book5);
