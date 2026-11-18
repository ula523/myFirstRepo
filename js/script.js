//принимает тип данных type и произвольное количество переданных значений через values, фильтрует массив typeof
const filterByType = (type, ...values) =>
    values.filter(value => typeof value === type),
  hideAllResponseBlocks = () => {
    //находит элементы с классом .dialog__response-block и преобразует в массив
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block"),
    );
    responseBlocksArray.forEach(block => (block.style.display = "none")); //проходится по каждому блоку и скрывает
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks(); // скрывает все открытые ранее блоки
    //добавляет свойство display = 'block' и делает блок видимым
    document.querySelector(blockSelector).style.display = "block";
    if (spanSelector) {
      // если передан селектор для текчта сообщения, записывает в него текст
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  // отображает блок .dialog__response-block_error и вставляет текст ошибки
  showError = msgText =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  // отображает блок .dialog__response-block_ok и вставляет результат в #ok
  showResults = msgText =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  // функция для отображения блока если ничего не найдено
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  tryFilterByType = (type, values) => {
    try {
      //отфильтрованный массив объединяет в строку через запятую
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      //отображает текст сообщения в зависимости от того, нашлись ли подходящие элементы
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;

      showResults(alertMsg); //показывает блок с успешным результатом
    } catch (e) {
      showError(`Ошибка: ${e}`); //если допущена ошибка
    }
  };

const filterButton = document.querySelector("#filter-btn"); //кнопка фильтрации

filterButton.addEventListener("click", e => {
  const typeInput = document.querySelector("#type");
  const dataInput = document.querySelector("#data");
  //Проверяет, заполнено ли поле с данными
  if (dataInput.value === "") {
    dataInput.setCustomValidity("Поле не должно быть пустым!");

    showNoResults(); // Показывает блок об отсутствии результатов
  } else {
    dataInput.setCustomValidity("");
    e.preventDefault(); //отменяет стандартное поведение

    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запускает фильтрацию и удаляет пробелы
  }
});
