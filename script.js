const getData = (url) => {
  return fetch(url).then((response) => response.json());
};

const sendData = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => response.json());
};

window.addEventListener("DOMContentLoaded", () => {
  getData("db.json")
    .then((data) => {
      console.log(data);

      return sendData("https://jsonplaceholder.typicode.com/posts", data);
    })
    .then((result) => {
      //ответ сервера

      console.log(result);
    })
    .catch((error) => {
      //вывод ошибки

      console.error(error);
    });
});
