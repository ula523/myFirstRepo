'use strict';


//Проверка на число
const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const gameBot = function() {
    let mainNumber = Math.floor(Math.random() * 100) + 1; //случайное целое число
    console.log(mainNumber);
    const getAskNumber = function() {
    let askNumber = prompt("Угадай число от 1 до 100");
    //если пользователь нажимает "Отмена", то игра заканчивается и выводится сообщение "Игра окончена".
    if(askNumber === null) {
        alert("Игра окончена");
        return;
    }
    //если пользовательское число больше, то бот выводит "Загаданное число меньше" и предлагает ввести новый вариант;
    if (askNumber > 100) {
       alert("Загаданное число меньше");
      return getAskNumber();

    } 
    //если пользовательское число меньше, то бот выводит "Загаданное число больше" и предлагает ввести новый вариант;
    if(askNumber < 1) {
        alert("Загаданное число больше");
        return getAskNumber();

    } 
    //если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант
    if(!isNumber(askNumber)) {
        alert("Введи число!");
        return getAskNumber();

    }  
    alert('Поздравляю, Вы угадали!!!');

}
getAskNumber()
}



gameBot()









