// Элементы DOM
const itemInRequestTableBody = document.querySelector('#itemInRequestTable tbody');
const addItemInRequestForm = document.querySelector('#addItemInRequestForm');
const fetchItemInRequestForm = document.querySelector('#fetchItemInRequestForm');
const fetchItemInRequestId = document.querySelector('#fetchItemInRequestId');
const updateItemInRequestForm = document.querySelector('#updateItemInRequestForm');
const deleteItemInRequestForm = document.querySelector('#deleteItemInRequestForm');

// Поля формы обновления
const updateItemInRequestIdOrder = document.querySelector('#updateItemInRequestIdOrder');
const updateItemInRequestIdItem = document.querySelector('#updateItemInRequestIdItem');
const updateItemInRequestCount = document.querySelector('#updateItemInRequestCount');

// Поля формы добавления
const addItemInRequestIdOrder = document.querySelector('#addItemInRequestIdOrder');
const addItemInRequestIdItem = document.querySelector('#addItemInRequestIdItem');
const addItemInRequestCount = document.querySelector('#addItemInRequestCount');

// Поле поиска
const searchItemInRequestButton = document.querySelector('#searchItemInRequestButton');
const searchItemInRequestInput = document.querySelector('#searchItemInRequestInput');

// Функция для отображения данных запчастей в таблице
function displayItemsInRequest(items) {
    itemInRequestTableBody.innerHTML = ''; // Очистить таблицу
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.id_request}</td>
            <td>${item.name}</td>
            <td>${item.count}</td>
        `;
        itemInRequestTableBody.appendChild(row);
    });
}

// Загрузка запчастей с сервера
async function fetchItemsInRequest() {
    try {
        const response = await fetch('http://localhost:8080/api/item_in_request');
        const items = await response.json();
        displayItemsInRequest(items);
    } catch (error) {
        console.error('Ошибка при загрузке запчастей:', error);
    }
}

// Добавление новой запчасти
async function addItemInRequest(event) {
    event.preventDefault();

    const newItem = {
        id_request: addItemInRequestIdOrder.value,
        id_item: addItemInRequestIdItem.value,
        count: addItemInRequestCount.value,
    };

    if (isNaN(newItem.id_request) || newItem.id_request <= 0) {
        alert('Неверные данные: ID заявки должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newItem.id_item) || newItem.id_item <= 0) {
        alert('Неверные данные: ID запчасти должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/items_in_request/addItemInRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        });
        fetchItemsInRequest();
        alert('Запчасть добавлена!');
    } catch (error) {
        console.error('Ошибка при добавлении запчасти:', error);
    }
}

// Обновление запчасти
async function updateItemInRequest(event) {
    event.preventDefault();

    const itemId = fetchItemInRequestId.value;
    const updatedItem = {
        id_request: updateItemInRequestIdOrder.value,
        id_item: updateItemInRequestIdItem.value,
        count: updateItemInRequestCount.value,
    };

    if (isNaN(updatedItem.id_request) || updatedItem.id_request <= 0) {
        alert('Неверные данные: ID заявки должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedItem.id_item) || updatedItem.id_item <= 0) {
        alert('Неверные данные: ID запчасти должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/item_in_request/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        });
        if (!response.ok) throw new Error('Ошибка обновления запчасти');
        alert('Запчасть успешно обновлена!');
        fetchItemsInRequest();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление запчасти
async function deleteItemInRequest(event) {
    event.preventDefault();

    const itemId = document.querySelector('#deleteItemInRequestId').value;

    try {
        await fetch(`/api/item_in_request/${itemId}`, { method: 'DELETE' });
        fetchItemsInRequest();
        alert('Запчасть удалена!');
    } catch (error) {
        console.error('Ошибка при удалении запчасти:', error);
    }
}

// Загрузка данных запчасти для обновления
async function loadItemInRequestData(event) {
    event.preventDefault();
    const itemId = fetchItemInRequestId.value;

    try {
        const response = await fetch(`/api/item_in_request/${itemId}`);
        if (!response.ok) throw new Error('Запчасть не найдена');
        const item = await response.json();

        // Заполняем форму обновления
        updateItemInRequestIdOrder.value = item.id_request || '';
        updateItemInRequestIdItem.value = item.id_item || '';
        updateItemInRequestCount.value = item.count || '';

        document.querySelector('#updateItemInRequestStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск запчастей в таблице
searchItemInRequestButton.addEventListener('click', () => {
    searchItemInRequestInput.style.display =
        searchItemInRequestInput.style.display === 'none' ? 'block' : 'none';
});

searchItemInRequestInput.addEventListener('input', () => {
    const searchTerm = searchItemInRequestInput.value.toLowerCase();
    const rows = itemInRequestTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const isVisible = Array.from(cells).some(cell =>
            cell.textContent.toLowerCase().includes(searchTerm)
        );
        row.style.display = isVisible ? '' : 'none';
    });
});

// Обработчики событий
addItemInRequestForm.addEventListener('submit', addItemInRequest);
fetchItemInRequestForm.addEventListener('submit', loadItemInRequestData);
updateItemInRequestForm.addEventListener('submit', updateItemInRequest);
deleteItemInRequestForm.addEventListener('submit', deleteItemInRequest);

// Загрузить список запчастей при загрузке страницы
fetchItemsInRequest();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('itemInRequestTable');
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
