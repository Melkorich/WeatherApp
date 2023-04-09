const apiKey = '255fcbae00a84756b1e133625230904';

// http://api.weatherapi.com/v1/current.json?key=255fcbae00a84756b1e133625230904&q=London

const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showCard({ name, country, temp, condition }) {
    const html = `
    <div class="card">
        <h2 class="card-city">${name}<span>${country}</span></h2>
        <div class="card-weather">
            <div class="card-value">${temp}<sup>°c</sup></div>
            <img class="card-img" src="./images/img.png" alt="weather">
        </div>
        <div class="card-descr">${condition}</div>
    </div>`;

    header.insertAdjacentHTML('afterend', html);
}

function showError(errorMessage) {
    const html = ` <div class="card">${errorMessage}</div>`
    //отображаем картчоку
    header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
    //адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

//слушаем отправку форму
form.onsubmit = async function (e) {
    //отменяем отправку формы / обновление страницы по умолчанию
    e.preventDefault();
    //берем значение из инпута
    let city = input.value.trim();

    //получаем данные с сервера
    const data = await getWeather(city);

    if (data.error) {
        //если есть -показываем 
        removeCard();
        showError(data.error.message);
    } else {
        //если нет - выводим карточку
        removeCard();

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text
        };

        showCard(weatherData);
    }
}