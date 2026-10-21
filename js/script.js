'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const todoRemove = document.querySelector('.todo-remove')

const todoData = JSON.parse(localStorage.getItem('todoData')) || [] //получает сохранённую строку, JSON.parse() превращает её в массив



const render = function() { // перебирает массив todoData 
    todoList.innerHTML = '' 
    todoCompleted.innerHTML = ''

    todoData.forEach(function(item, index) { //при каждой итерации получаем очередной объект item
     const li = document.createElement('li'); //создает элемент li
     li.classList.add('todo-item'); //добавляет класс
     li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
     '<div class="todo-buttons">' +
	 '<button class="todo-remove"></button>' +
	 '<button class="todo-complete"></button>' +
	 '</div>'
     
     if(item.completed) {
        todoCompleted.append(li) //вставляет элементы в список

     } else {
        todoList.append(li) //вставляет элементы в список
     }
       li.querySelector('.todo-complete').addEventListener('click', function() {
        item.completed = !item.completed; //меняет свойство на противоположное
        render()

       })
     li.querySelector('.todo-remove').addEventListener('click', function () {
      todoData.splice(index, 1);
      render();
    });

    })

    localStorage.setItem('todoData', JSON.stringify(todoData)); // сохраняет массив после добавления
}

todoControl.addEventListener('submit', function(event) { //submit- событие каждой формы
   

    event.preventDefault() //отменяет перезгрузку страницу после нажатия enter

    if (headerInput.value === '') { //Проверка на пустую строку
        return;
    }

    const newToDo = {
        text: headerInput.value, //берет значение из инпута
        completed: false
    }

todoData.push(newToDo) // запушить newToDo в массив todoData




headerInput.value = '' //удаляет текст в инпуте 
render()
   
})

render()





