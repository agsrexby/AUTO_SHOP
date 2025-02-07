// Элементы DOM
const streetsTableBody = document.querySelector('#streetTable tbody');
const addStreetForm = document.querySelector('#addStreetForm');
const fetchStreetForm = document.getElementById('fetchStreetForm');
const fetchStreetId = document.getElementById('fetchStreetId');
const updateStreetForm = document.querySelector('#updateStreetForm');
const deleteStreetForm = document.querySelector('#deleteStreetForm');

// Поля формы обновления
const updateStreetName = document.getElementById('updateStreetName');

// Поля формы добавления
const addStreetName = document.getElementById('addStreetName');

// Поле поиска
const searchStreetButton = document.getElementById('searchStreetButton');
const searchStreetInput = document.getElementById('searchStreetInput');

// Функция для отображения данных улиц в таблице
function displayStreets(streets) {
    streetsTableBody.innerHTML = ''; // Очистить таблицу
    streets.forEach(street => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${street.id}</td>
            <td>${street.name}</td>
        `;
        streetsTableBody.appendChild(row);
    });
}

// Загрузка улиц с сервера
async function fetchStreets() {
    try {
        const response = await fetch('http://localhost:8080/api/street');
        const streets = await response.json();
        displayStreets(streets);
    } catch (error) {
        console.error('Ошибка при загрузке улиц:', error);
    }
}

// Добавление новой улицы
async function addStreets(event) {
    event.preventDefault();

    const newStreet = {
        name: addStreetName.value
    };

    try {
        await fetch('/api/street/addStreet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStreet)
        });
        fetchStreets();
        alert('Улица добавлена!');
    } catch (error) {
        console.error('Ошибка при добавлении улицы:', error);
    }
}

// Обновление улицы
async function updateStreets(event) {
    event.preventDefault();

    const streetId = fetchStreetId.value;
    const updatedStreet = {
        name: updateStreetName.value
    };

    try {
        const response = await fetch(`/api/street/${streetId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStreet)
        });
        if (!response.ok) throw new Error('Ошибка обновления улицы');
        alert('Улица успешно обновлена!');
        fetchStreets();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление улицы
async function deleteStreets(event) {
    event.preventDefault();

    const streetId = document.getElementById('deleteStreetId').value;

    try {
        await fetch(`/api/street/${streetId}`, { method: 'DELETE' });
        fetchStreets();
        alert('Улица удалена!');
    } catch (error) {
        console.error('Ошибка при удалении улицы:', error);
    }
}

// Загрузка данных улицы для обновления
async function loadStreetsData(event) {
    event.preventDefault();
    const streetId = fetchStreetId.value;

    try {
        const response = await fetch(`/api/street/${streetId}`);
        if (!response.ok) throw new Error('Улица не найдена');
        const street = await response.json();

        // Заполняем форму обновления
        updateStreetName.value = street.name || '';

        document.getElementById('updateStreetStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск улиц в таблице
searchStreetButton.addEventListener("click", () => {
    searchStreetInput.style.display = searchStreetInput.style.display === "none" ? "block" : "none";
});

searchStreetInput.addEventListener("input", () => {
    const searchTerm = searchStreetInput.value.toLowerCase();
    const rows = streetsTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addStreetForm.addEventListener('submit', addStreets);
fetchStreetForm.addEventListener('submit', loadStreetsData);
updateStreetForm.addEventListener('submit', updateStreets);
deleteStreetForm.addEventListener('submit', deleteStreets);

// Загрузить список улиц при загрузке страницы
fetchStreets();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('streetTable');
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
