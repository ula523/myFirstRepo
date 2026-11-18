"use strict";

const select = document.getElementById("cars");
const output = document.getElementById("output");

const getData = url => {
  return fetch(url).then(response => response.json());
};

getData("cars.json")
  .then(data => {
    data.cars.forEach(car => {
      const option = document.createElement("option");
      option.value = car.brand;
      option.textContent = car.brand;
      select.append(option);
    });

    select.addEventListener("change", () => {
      if (select.value === "") {
        output.textContent = "Выберите тачку";
        return;
      }

      data.cars.forEach(car => {
        if (car.brand === select.value) {
          output.innerHTML = `Тачка: ${car.brand.toUpperCase()} ${car.model} <br> Цена: ${car.price}$`;
        }
      });
    });
  })
  .catch(() => {
    output.textContent = "Произошла ошибка";
    output.style.color = "red";
  });
