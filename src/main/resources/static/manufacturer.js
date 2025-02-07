// Элементы DOM для работы с производителями
const manufacturerTableBody = document.querySelector('#manufacturerTable tbody');
const addManufacturerForm = document.querySelector('#addManufacturerForm');
const fetchManufacturerForm = document.getElementById('fetchManufacturerForm');
const fetchManufacturerId = document.getElementById('fetchManufacturerId');
const updateManufacturerForm = document.querySelector('#updateManufacturerForm');
const deleteManufacturerForm = document.querySelector('#deleteManufacturerForm');

// Поля формы добавления производителя
const addManufacturerName = document.getElementById('addManufacturerName');
const addManufacturerNumOfHome = document.getElementById('addManufacturerNumOfHome');
const addManufacturerStreetId = document.getElementById('addManufacturerStreetId');
const addManufacturerCityId = document.getElementById('addManufacturerCityId');
const addManufacturerCountryId = document.getElementById('addManufacturerCountryId');

// Поля формы обновления производителя
const updateManufacturerName = document.getElementById('updateManufacturerName');
const updateManufacturerNumOfHome = document.getElementById('updateManufacturerNumOfHome');
const updateManufacturerStreetId = document.getElementById('updateManufacturerStreetId');
const updateManufacturerCityId = document.getElementById('updateManufacturerCityId');
const updateManufacturerCountryId = document.getElementById('updateManufacturerCountryId');

// Поиск производителя
const searchManufacturerButton = document.getElementById('searchManufacturerButton');
const searchManufacturerInput = document.getElementById('searchManufacturerInput');

// Функция для отображения производителей в таблице
function displayManufacturers(manufacturers) {
    manufacturerTableBody.innerHTML = ''; // Очистить таблицу
    manufacturers.forEach(manufacturer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${manufacturer.id}</td>
            <td>${manufacturer.name}</td>
            <td>${manufacturer.numberOfHome}</td>
            <td>${manufacturer.street}</td>
            <td>${manufacturer.city}</td>
            <td>${manufacturer.country}</td>
        `;
        manufacturerTableBody.appendChild(row);
    });
}

// Загрузка списка производителей с сервера
async function fetchManufacturers() {
    try {
        const response = await fetch('http://localhost:8080/api/manufacturer');
        const manufacturers = await response.json();
        displayManufacturers(manufacturers);
    } catch (error) {
        console.error('Ошибка при загрузке производителей:', error);
    }
}

// Добавление нового производителя
async function addManufacturer(event) {
    event.preventDefault();

    const newManufacturer = {
        name: addManufacturerName.value,
        numberOfHome: addManufacturerNumOfHome.value,
        id_street: addManufacturerStreetId.value,
        id_city: addManufacturerCityId.value,
        id_country: addManufacturerCountryId.value
    };

    if (isNaN(newManufacturer.number_of_home) || newManufacturer.number_of_home <= 0) {
        alert('Неверные данные: номер дома должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newManufacturer.id_counry) || newManufacturer.id_counry <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newManufacturer.id_city) || newManufacturer.id_city <= 0) {
        alert('Неверные данные: ID горда должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newManufacturer.id_street) || newManufacturer.id_street <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/manufacturer/addManufacturer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newManufacturer)
        });
        fetchManufacturers();
        alert('Производитель добавлен!');
    } catch (error) {
        console.error('Ошибка при добавлении производителя:', error);
    }
}

// Загрузка данных производителя для обновления
async function loadManufacturerData(event) {
    event.preventDefault();
    const manufacturerId = fetchManufacturerId.value;

    try {
        const response = await fetch(`/api/manufacturer/${manufacturerId}`);
        if (!response.ok) throw new Error('Производитель не найден');
        const manufacturer = await response.json();

        // Заполнение формы для обновления
        updateManufacturerName.value = manufacturer.name || '';
        updateManufacturerNumOfHome.value = manufacturer.numberOfHome || '';
        updateManufacturerStreetId.value = manufacturer.id_street || '';
        updateManufacturerCityId.value = manufacturer.id_city || '';
        updateManufacturerCountryId.value = manufacturer.id_country || '';

        document.getElementById('updateManufacturerStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Обновление производителя
async function updateManufacturer(event) {
    event.preventDefault();

    const manufacturerId = fetchManufacturerId.value;
    const updatedManufacturer = {
        name: updateManufacturerName.value,
        numberOfHome: updateManufacturerNumOfHome.value,
        id_street: updateManufacturerStreetId.value,
        id_city: updateManufacturerCityId.value,
        id_country: updateManufacturerCountryId.value
    };

    if (isNaN(updatedManufacturer.number_of_home) || updatedManufacturer.number_of_home <= 0) {
        alert('Неверные данные: номер дома должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedManufacturer.id_counry) || updatedManufacturer.id_counry <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedManufacturer.id_city) || updatedManufacturer.id_city <= 0) {
        alert('Неверные данные: ID горда должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedManufacturer.id_street) || updatedManufacturer.id_street <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/manufacturer/${manufacturerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedManufacturer)
        });
        if (!response.ok) throw new Error('Ошибка обновления производителя');
        alert('Производитель успешно обновлён!');
        fetchManufacturers();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление производителя
async function deleteManufacturer(event) {
    event.preventDefault();

    const manufacturerId = document.getElementById('deleteManufacturerId').value;

    try {
        await fetch(`/api/manufacturer/${manufacturerId}`, { method: 'DELETE' });
        fetchManufacturers();
        alert('Производитель удалён!');
    } catch (error) {
        console.error('Ошибка при удалении производителя:', error);
    }
}

// Поиск производителей в таблице
searchManufacturerButton.addEventListener("click", () => {
    searchManufacturerInput.style.display = searchManufacturerInput.style.display === "none" ? "block" : "none";
});

searchManufacturerInput.addEventListener("input", () => {
    const searchTerm = searchManufacturerInput.value.toLowerCase();
    const rows = manufacturerTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addManufacturerForm.addEventListener('submit', addManufacturer);
fetchManufacturerForm.addEventListener('submit', loadManufacturerData);
updateManufacturerForm.addEventListener('submit', updateManufacturer);
deleteManufacturerForm.addEventListener('submit', deleteManufacturer);

// Загрузка списка производителей при загрузке страницы
fetchManufacturers();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('manufacturerTable');
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
