// Элементы DOM
const managersTableBody = document.querySelector('#managersTable tbody');
const addManagerForm = document.querySelector('#addManagerForm');
const fetchManagerForm = document.getElementById('fetchManagerForm');
const fetchManagerId = document.getElementById('fetchManagerId');
const updateManagerForm = document.querySelector('#updateManagerForm');
const deleteManagerForm = document.querySelector('#deleteManagerForm');

// Поля формы обновления
const updateManagerLastName = document.getElementById('updateManagerLastName');
const updateManagerFirstName = document.getElementById('updateManagerFirstName');
const updateManagerSurName = document.getElementById('updateManagerSurName');

// Поля формы добавления
const addManagerLastName = document.getElementById('addManagerLastName');
const addManagerFirstName = document.getElementById('addManagerFirstName');
const addManagerSurName = document.getElementById('addManagerSurName');

// Поле поиска
const searchManagerButton = document.getElementById('searchManagerButton');
const searchManagerInput = document.getElementById('searchManagerInput');

// Функция для отображения данных менеджеров в таблице
function displayManagers(managers) {
    managersTableBody.innerHTML = ''; // Очистить таблицу
    managers.forEach(manager => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${manager.id}</td>
            <td>${manager.lastname}</td>
            <td>${manager.name}</td>
            <td>${manager.patronymic || ''}</td>
        `;
        managersTableBody.appendChild(row);
    });
}

// Загрузка менеджеров с сервера
async function fetchManagers() {
    try {
        const response = await fetch('http://localhost:8080/api/manager');
        const managers = await response.json();
        displayManagers(managers);
    } catch (error) {
        console.error('Ошибка при загрузке менеджеров:', error);
    }
}

// Добавление нового менеджера
async function addManager(event) {
    event.preventDefault();

    const newManager = {
        lastname: addManagerLastName.value,
        name: addManagerFirstName.value,
        patronymic: addManagerSurName.value
    };

    try {
        await fetch('/api/manager/addManager', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newManager)
        });
        fetchManagers();
        alert('Менеджер добавлен!');
    } catch (error) {
        console.error('Ошибка при добавлении менеджера:', error);
    }
}

// Обновление менеджера
async function updateManager(event) {
    event.preventDefault();

    const managerId = fetchManagerId.value;
    const updatedManager = {
        lastname: updateManagerLastName.value,
        name: updateManagerFirstName.value,
        patronymic: updateManagerSurName.value
    };

    try {
        const response = await fetch(`/api/manager/${managerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedManager)
        });
        if (!response.ok) throw new Error('Ошибка обновления менеджера');
        alert('Менеджер успешно обновлён!');
        fetchManagers();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление менеджера
async function deleteManager(event) {
    event.preventDefault();

    const managerId = document.getElementById('deleteManagerId').value;

    try {
        await fetch(`/api/manager/${managerId}`, { method: 'DELETE' });
        fetchManagers();
        alert('Менеджер удалён!');
    } catch (error) {
        console.error('Ошибка при удалении менеджера:', error);
    }
}

// Загрузка данных менеджера для обновления
async function loadManagerData(event) {
    event.preventDefault();
    const managerId = fetchManagerId.value;

    try {
        const response = await fetch(`/api/manager/${managerId}`);
        if (!response.ok) throw new Error('Менеджер не найден');
        const manager = await response.json();

        // Заполняем форму обновления
        updateManagerLastName.value = manager.lastname || '';
        updateManagerFirstName.value = manager.name || '';
        updateManagerSurName.value = manager.patronymic || '';

        document.getElementById('updateManagerStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск менеджеров в таблице
searchManagerButton.addEventListener("click", () => {
    searchManagerInput.style.display = searchManagerInput.style.display === "none" ? "block" : "none";
});

searchManagerInput.addEventListener("input", () => {
    const searchTerm = searchManagerInput.value.toLowerCase();
    const rows = managersTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addManagerForm.addEventListener('submit', addManager);
fetchManagerForm.addEventListener('submit', loadManagerData);
updateManagerForm.addEventListener('submit', updateManager);
deleteManagerForm.addEventListener('submit', deleteManager);

// Загрузить список менеджеров при загрузке страницы
fetchManagers();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('managersTable');
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
