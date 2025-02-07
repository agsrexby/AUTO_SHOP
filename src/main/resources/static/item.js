// Элементы DOM
const itemTableBody = document.querySelector('#itemTable tbody');
const addItemForm = document.querySelector('#addItemForm');
const fetchItemForm = document.getElementById('fetchItemForm');
const fetchItemId = document.getElementById('fetchItemId');
const updateItemForm = document.querySelector('#updateItemForm');
const deleteItemForm = document.querySelector('#deleteItemForm');

// Поля формы обновления
const updateItemName = document.getElementById('updateItemName');
const updateItemCase = document.getElementById('updateItemCase');
const updateItemCost = document.getElementById('updateItemCost');

// Поля формы добавления
const addItemName = document.getElementById('addItemName');
const addItemCase = document.getElementById('addItemCase');
const addItemCost = document.getElementById('addItemCost');

// Поле поиска
const searchItemButton = document.getElementById('searchItemButton');
const searchItemInput = document.getElementById('searchItemInput');

// Функция для отображения данных запчастей в таблице
function displayItems(items) {
    itemTableBody.innerHTML = ''; // Очистить таблицу
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.caseOfItem}</td>
            <td>${item.cost}</td>
        `;
        itemTableBody.appendChild(row);
    });
}

// Загрузка запчастей с сервера
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:8080/api/item');
        const items = await response.json();
        displayItems(items);
    } catch (error) {
        console.error('Ошибка при загрузке запчастей:', error);
    }
}

// Добавление новой запчасти
async function addItem(event) {
    event.preventDefault();

    const newItem = {
        name: addItemName.value,
        caseOfItem: addItemCase.value,
        cost: parseFloat(addItemCost.value)
    };

    if (isNaN(newItem.cost) || newItem.cost <= 0) {
        alert('Неверные данные: стоимость должна быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newItem.caseOfItem) || newItem.caseOfItem <= 0) {
        alert('Неверные данные: ячейка должна быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/item/addItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
        fetchItems();
        alert('Запчасть добавлена!');
    } catch (error) {
        console.error('Ошибка при добавлении запчасти:', error);
    }
}

// Обновление запчасти
async function updateItem(event) {
    event.preventDefault();

    const itemId = fetchItemId.value;
    const updatedItem = {
        name: updateItemName.value,
        caseOfItem: updateItemCase.value,
        cost: parseFloat(updateItemCost.value)
    };

    if (isNaN(updatedItem.cost) || updatedItem.cost <= 0) {
        alert('Неверные данные: стоимость должна быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedItem.caseOfItem) || updatedItem.caseOfItem <= 0) {
        alert('Неверные данные: ячейка должна быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/item/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        });
        if (!response.ok) throw new Error('Ошибка обновления запчасти');
        alert('Запчасть успешно обновлена!');
        fetchItems();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление запчасти
async function deleteItem(event) {
    event.preventDefault();

    const itemId = document.getElementById('deleteItemId').value;

    try {
        await fetch(`/api/item/${itemId}`, { method: 'DELETE' });
        fetchItems();
        alert('Запчасть удалена!');
    } catch (error) {
        console.error('Ошибка при удалении запчасти:', error);
    }
}

// Загрузка данных запчасти для обновления
async function loadItemData(event) {
    event.preventDefault();
    const itemId = fetchItemId.value;

    try {
        const response = await fetch(`/api/item/${itemId}`);
        if (!response.ok) throw new Error('Запчасть не найдена');
        const item = await response.json();

        // Заполняем форму обновления
        updateItemName.value = item.name || '';
        updateItemCase.value = item.caseOfItem || '';
        updateItemCost.value = item.cost || '';

        document.getElementById('updateItemStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск запчастей в таблице
searchItemButton.addEventListener("click", () => {
    searchItemInput.style.display = searchItemInput.style.display === "none" ? "block" : "none";
});

searchItemInput.addEventListener("input", () => {
    const searchTerm = searchItemInput.value.toLowerCase();
    const rows = itemTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addItemForm.addEventListener('submit', addItem);
fetchItemForm.addEventListener('submit', loadItemData);
updateItemForm.addEventListener('submit', updateItem);
deleteItemForm.addEventListener('submit', deleteItem);

// Загрузить список запчастей при загрузке страницы
fetchItems();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('itemTable');
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
