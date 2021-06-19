require("../css/_style.css");

// var links = null; //Создаём переменную, в которой будут храниться ссылки

// var loaded = true; //Переменная, которая обозначает, загрузилась ли страница

// var data =
//   //Данные о странице
//   {
//     title: "",
//     body: "",
//     link: "",
//   };

// var page =
//   //Элементы, текст в которых будет меняться
//   {
//     title: document.getElementById("title"),
//     body: document.getElementById("body"),
//   };

// //По умолчанию в макете содержится контент для главной страницы.
// //Но если пользователь перейдёт по ссылке, которая ведёт на какую-нибудь статью, он увидит не то, что ожидает.
// //Поэтому нужно проверить, на какой странице находится пользователь, и загрузить релевантные данные.
// OnLoad();

// function OnLoad() {
//   var href = window.location.pathname; //Ссылка страницы без домена

//   LinkClick(href);
// }

// function InitLinks() {
//   links = document.getElementsByClassName("link_internal"); //Находим все ссылки на странице

//   for (var i = 0; i < links.length; i++) {
//     //Отключаем событие по умолчанию и вызываем функцию LinkClick
//     links[i].addEventListener("click", function (e) {
//       e.preventDefault();
//       LinkClick(e.target.getAttribute("href"));
//       return false;
//     });
//   }
// }

// function LinkClick(href) {
//   var props = href.split("/"); //Получаем параметры из ссылки. 1 - раздел, 2 - идентификатор

//   switch (props[1]) {
//     case "Main":
//       SendRequest("?page=main", href); //Отправляем запрос на сервер
//       break;

//     case "Articles":
//       if (props.length == 3 && !isNaN(props[2]) && Number(props[2]) > 0) {
//         //Проверяем валидность идентификатора и тоже отправляем запрос
//         SendRequest("?page=articles&id=" + props[2], href);
//       }
//       break;
//   }
// }

// function SendRequest(query, link) {
//   var xhr = new XMLHttpRequest(); //Создаём объект для отправки запроса

//   xhr.open("GET", "/spa/core.php" + query, true); //Открываем соединение

//   xhr.onreadystatechange =
//     function () //Указываем, что делать, когда будет получен ответ от сервера
//     {
//       if (xhr.readyState != 4) return; //Если это не тот ответ, который нам нужен, ничего не делаем

//       //Иначе говорим, что сайт загрузился
//       loaded = true;

//       if (xhr.status == 200) {
//         //Если ошибок нет, то получаем данные
//         GetData(JSON.parse(xhr.responseText), link);
//       } //Иначе выводим сообщение об ошибке
//       else {
//         alert("Loading error! Try again later.");
//         console.log(xhr.status + ": " + xhr.statusText);
//       }
//     };

//   loaded = false; //Говорим, что идёт загрузка

//   //Устанавливаем таймер, который покажет сообщение о загрузке, если она не завершится через 2 секунды
//   setTimeout(ShowLoading, 2000);
//   xhr.send(); //Отправляем запрос
// }

// function GetData(response, link) {
//   //Получаем данные
//   data = {
//     title: response.title,
//     body: response.body,
//     link: link,
//   };

//   UpdatePage(); //Обновляем контент на странице
// }

// function ShowLoading() {
//   if (!loaded) {
//     //Если страница ещё не загрузилась, то выводим сообщение о загрузке
//     page.body.innerHTML = "Loading...";
//   }
// }

// function UpdatePage() {
//   //Обновление контента
//   page.title.innerText = data.title;
//   page.body.innerHTML = data.body;

//   document.title = data.title;
//   window.history.pushState(data.body, data.title, "/spa" + data.link); //Меняем ссылку

//   InitLinks(); //Инициализируем новые ссылки
// }
