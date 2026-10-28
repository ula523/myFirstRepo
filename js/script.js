'use strict';

const workers = JSON.parse(localStorage.getItem('workers') || '[]');

const form = document.getElementById('employee-form');
const employeesTable = document.getElementById('employees-table');
const employeesBody = document.getElementById('employees-wrapper');


    // Общий класс Работник
    class Worker {
        constructor(fio, age, position, organization, employmentDate, children) {
            this.fio = fio;
            this.age = age;
            this.position = position;
            this.organization = organization;
            this.employmentDate = employmentDate;
            this.children = children;
        }

        getInfo() {
            return `ФИО: ${this.fio}
              Возраст: ${this.age}
              Должность: ${this.position}
              Организация: ${this.organization}
              Дата принятия на работу: ${this.employmentDate}
              Наличие детей: ${this.children ? 'Да' : 'Нет'}`;
        }
    }

    // Класс Слесарь
    class Locksmith extends Worker {
        constructor(fio, age, position, organization, employmentDate, children, grade) {
            super(fio, age, position, organization, employmentDate, children);

            this.grade = grade;
        }

        getInfo() {
            return `${super.getInfo()}
            Разряд: ${this.grade}`;
        }
    }

    // Класс Водитель
    class Driver extends Worker {
        constructor(fio, age, position, organization, employmentDate, children, category) {
            super(fio, age, position, organization, employmentDate, children);

            this.category = category;
        }

        getInfo() {
            return `${super.getInfo()}
            Категория водительского удостоверения: ${this.category}`;
        }
    }

    // Получение значения поля формы
    function getFieldValue(data, name) {
        return String(data.get(name) ?? '').trim();
    }



    // Формирование текста должности
    function getPositionText(worker) {
        if (worker instanceof Locksmith) {
            return `${worker.position}, разряд ${worker.grade}`;
        }

        if (worker instanceof Driver) {
            return `${worker.position}, категория ${worker.category}`;
        }

        return worker.position;
    }

    // Вывод сотрудников в таблицу
    function renderWorkers() {
        employeesBody.replaceChildren();

        workers.forEach(function (worker, index) {
            const row = document.createElement('tr');

            const values = [
                worker.fio,
                worker.age,
                getPositionText(worker),
                worker.organization,
                worker.employmentDate,
                worker.children ? 'Есть' : 'Нет'
            ]

            values.forEach(function (value) {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            })

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');

            deleteButton.type = 'button';
            deleteButton.className = 'btn delete-btn';
            deleteButton.textContent = 'Удалить';
            deleteButton.dataset.index = String(index);

            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            employeesBody.appendChild(row);
        })
    }

    // Обработка отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const data = new FormData(form);

        const fio = getFieldValue(data, 'fio');
        const age = getFieldValue(data, 'age');
        const position = getFieldValue(data, 'position');
        const organization = getFieldValue(data, 'organization');
        const employmentDate = getFieldValue(data, 'employment_date');
        const children = data.get('children') === 'yes';

        if (!fio) {
            alert('Не заполнено ФИО');
            return;
        }

        if (!age){
            alert('Не заполнен возраст');
            return;
        }

        if (!position) {
            alert('Не выбрана должность');
            return;
        }

        if (!organization) {
            alert('Введите организацию');
            return;
        }

        if (!employmentDate) {
            alert('Укажите  дату');
            return;
        }

        let worker;

        if (position === 'Слесарь') {
            const grade = Number(getFieldValue(data, 'grade'));

            if (!Number.isInteger(grade) || grade < 1 || grade > 6) {
                alert('Укажите разряд слесаря от 1 до 6');
                return;
            }

            worker = new Locksmith(fio, age, position, organization, employmentDate, children, grade);
        }

        if (position === 'Водитель') {
            const category = getFieldValue(data, 'category');

            if (!category) {
                alert('Выберите категорию водительского удостоверения');
                return;
            }

            worker = new Driver(fio, age, position, organization, employmentDate, children, category);
        }

        workers.push(worker);
      //сохранение массива
        localStorage.setItem('workers', JSON.stringify(workers));
       renderWorkers();

        console.log(worker.getInfo());
        console.log('Все работники:', workers);

        form.reset();
    })

    // Удаление сотрудников
    employeesTable.addEventListener('click', function (event) {
        const deleteButton = event.target.closest('.delete-btn');

        if (!deleteButton) {
            return;
        }

        const row = deleteButton.closest('tr');

        // Удаление сотрудника из массива
        if (deleteButton.dataset.index !== undefined) {
            const index = Number(deleteButton.dataset.index);

            if (Number.isInteger(index)) {
                workers.splice(index, 1);
                //Сохранение массива
                localStorage.setItem('workers', JSON.stringify(workers));
              renderWorkers();
            }

            return;
        }

        // Удаление строки из HTML
        if (row) {
            row.remove();
        }
    })

   renderWorkers();
