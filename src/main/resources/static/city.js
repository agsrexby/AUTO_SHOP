// Элементы DOM
const citiesTableBody = document.querySelector('#cityTable tbody');
const addCityForm = document.querySelector('#addCityForm');
const fetchCityForm = document.getElementById('fetchCityForm');
const fetchCityId = document.getElementById('fetchCityId');
const updateCityForm = document.querySelector('#updateCityForm');
const deleteCityForm = document.querySelector('#deleteCityForm');

// Поля формы обновления
const updateCityName = document.getElementById('updateCityName');

// Поля формы добавления
const addCityName = document.getElementById('addCityName');

// Поле поиска
const searchCityButton = document.getElementById('searchCityButton');
const searchCityInput = document.getElementById('searchCityInput');

// Функция для отображения данных городов в таблице
function displayCities(cities) {
    citiesTableBody.innerHTML = ''; // Очистить таблицу
    cities.forEach(city => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${city.id}</td>
            <td>${city.name}</td>
        `;
        citiesTableBody.appendChild(row);
    });
}

// Загрузка городов с сервера
async function fetchCities() {
    try {
        const response = await fetch('http://localhost:8080/api/city');
        const cities = await response.json();
        displayCities(cities);
    } catch (error) {
        console.error('Ошибка при загрузке городов:', error);
    }
}

// Добавление нового города
async function addCitys(event) {
    event.preventDefault();

    const newCity = {
        name: addCityName.value
    };

    try {
        await fetch('/api/city/addCity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCity)
        });
        fetchCities();
        alert('Город добавлен!');
        addCityForm.reset(); // Очистить форму
    } catch (error) {
        console.error('Ошибка при добавлении города:', error);
    }
}

// Обновление города
async function updateCitys(event) {
    event.preventDefault();

    const cityId = fetchCityId.value;
    const updatedCity = {
        name: updateCityName.value
    };

    try {
        const response = await fetch(`/api/city/${cityId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCity)
        });
        if (!response.ok) throw new Error('Ошибка обновления города');
        alert('Город успешно обновлен!');
        fetchCities();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление города
async function deleteCitys(event) {
    event.preventDefault();

    const cityId = document.getElementById('deleteCityId').value;

    try {
        await fetch(`/api/city/${cityId}`, { method: 'DELETE' });
        fetchCities();
        alert('Город удален!');
    } catch (error) {
        console.error('Ошибка при удалении города:', error);
    }
}

// Загрузка данных города для обновления
async function loadCitysData(event) {
    event.preventDefault();
    const cityId = fetchCityId.value;

    try {
        const response = await fetch(`/api/city/${cityId}`);
        if (!response.ok) throw new Error('Город не найден');
        const city = await response.json();

        // Заполняем форму обновления
        updateCityName.value = city.name || '';

        document.getElementById('updateCityStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск городов в таблице
searchCityButton.addEventListener("click", () => {
    searchCityInput.style.display = searchCityInput.style.display === "none" ? "block" : "none";
});

searchCityInput.addEventListener("input", () => {
    const searchTerm = searchCityInput.value.toLowerCase();
    const rows = citiesTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addCityForm.addEventListener('submit', addCitys);
fetchCityForm.addEventListener('submit', loadCitysData);
updateCityForm.addEventListener('submit', updateCitys);
deleteCityForm.addEventListener('submit', deleteCitys);

// Загрузить список городов при загрузке страницы
fetchCities();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('cityTable');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            const isAscending = header.classList.contains('sorted-asc');

            // Удалить сортировку с других заголовков
            headers.forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));

            // Применить класс сортировки
            header.classList.toggle('sorted-asc', !isAscending);
            header.classList.toggle('sorted-desc', isAscending);

            sortTable(tbody, index, !isAscending);
        });
    });

    function sortTable(tbody, columnIndex, ascending) {
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((rowA, rowB) => {
            const cellA = rowA.cells[columnIndex].textContent.trim();
            const cellB = rowB.cells[columnIndex].textContent.trim();

            if (!isNaN(cellA) && !isNaN(cellB)) {
                // Если значения числовые
                return ascending ? cellA - cellB : cellB - cellA;
            } else {
                // Если значения текстовые
                return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
            }
        });

        // Перестроить таблицу
        rows.forEach(row => tbody.appendChild(row));
    }
});
