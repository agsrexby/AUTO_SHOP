// Элементы DOM для управления странами
const countryTableBody = document.querySelector('#countryTable tbody');
const addCountryForm = document.querySelector('#addCountryForm');
const fetchCountryForm = document.getElementById('fetchCountryForm');
const fetchCountryId = document.getElementById('fetchCountryId');
const updateCountryForm = document.querySelector('#updateCountryForm');
const deleteCountryForm = document.querySelector('#deleteCountryForm');

// Поля формы обновления
const updateCountryName = document.getElementById('updateCountryName');

// Поля формы добавления
const addCountryName = document.getElementById('addCountryName');

// Поле поиска
const searchCountryButton = document.getElementById('searchCountryButton');
const searchCountryInput = document.getElementById('searchCountryInput');

// Функция для отображения данных стран в таблице
function displayCountries(countries) {
    countryTableBody.innerHTML = ''; // Очистить таблицу
    countries.forEach(country => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${country.id}</td>
            <td>${country.name}</td>
        `;
        countryTableBody.appendChild(row);
    });
}

// Загрузка стран с сервера
async function fetchCountries() {
    try {
        const response = await fetch('http://localhost:8080/api/country');
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('Ошибка при загрузке стран:', error);
    }
}

// Добавление новой страны
async function addCountrys(event) {
    event.preventDefault();

    const newCountry = {
        name: addCountryName.value
    };

    try {
        await fetch('/api/country/addCountry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCountry)
        });
        fetchCountries();
        alert('Страна добавлена!');
    } catch (error) {
        console.error('Ошибка при добавлении страны:', error);
    }
}

// Обновление страны
async function updateCountrys(event) {
    event.preventDefault();

    const countryId = fetchCountryId.value;
    const updatedCountry = {
        name: updateCountryName.value
    };

    try {
        const response = await fetch(`/api/country/${countryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCountry)
        });
        if (!response.ok) throw new Error('Ошибка обновления страны');
        alert('Страна успешно обновлена!');
        fetchCountries();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление страны
async function deleteCountrys(event) {
    event.preventDefault();

    const countryId = document.getElementById('deleteCountryId').value;

    try {
        await fetch(`/api/country/${countryId}`, { method: 'DELETE' });
        fetchCountries();
        alert('Страна удалена!');
    } catch (error) {
        console.error('Ошибка при удалении страны:', error);
    }
}

// Загрузка данных страны для обновления
async function loadCountrysData(event) {
    event.preventDefault();
    const countryId = fetchCountryId.value;

    try {
        const response = await fetch(`/api/country/${countryId}`);
        if (!response.ok) throw new Error('Страна не найдена');
        const country = await response.json();

        // Заполняем форму обновления
        updateCountryName.value = country.name || '';

        document.getElementById('updateCountryStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск стран в таблице
searchCountryButton.addEventListener("click", () => {
    searchCountryInput.style.display = searchCountryInput.style.display === "none" ? "block" : "none";
});

searchCountryInput.addEventListener("input", () => {
    const searchTerm = searchCountryInput.value.toLowerCase();
    const rows = countryTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addCountryForm.addEventListener('submit', addCountrys);
fetchCountryForm.addEventListener('submit', loadCountrysData);
updateCountryForm.addEventListener('submit', updateCountrys);
deleteCountryForm.addEventListener('submit', deleteCountrys);

// Загрузить список стран при загрузке страницы
fetchCountries();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('countryTable');
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
