// Элементы DOM
const itemInOrderTableBody = document.querySelector('#itemInOrderTable tbody');
const addItemInOrderForm = document.querySelector('#addItemInOrderForm');
const fetchItemInOrderForm = document.querySelector('#fetchItemInOrderForm');
const fetchItemInOrderId = document.querySelector('#fetchItemInOrderId');
const updateItemInOrderForm = document.querySelector('#updateItemInOrderForm');
const deleteItemInOrderForm = document.querySelector('#deleteItemInOrderForm');

// Поля формы обновления
const updateItemInOrderIdOrder = document.querySelector('#updateItemInOrderIdOrder');
const updateItemInOrderIdItem = document.querySelector('#updateItemInOrderIdItem');
const updateItemInOrderCount = document.querySelector('#updateItemInOrderCount');

// Поля формы добавления
const addItemInOrderIdOrder = document.querySelector('#addItemInOrderIdOrder');
const addItemInOrderIdItem = document.querySelector('#addItemInOrderIdItem');
const addItemInOrderCount = document.querySelector('#addItemInOrderCount');

// Поле поиска
const searchItemInOrderButton = document.querySelector('#searchItemInOrderButton');
const searchItemInOrderInput = document.querySelector('#searchItemInOrderInput');

// Функция для отображения данных запчастей в таблице
function displayItemsInOrder(items) {
    itemInOrderTableBody.innerHTML = ''; // Очистить таблицу
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.id_order}</td>
            <td>${item.name}</td>
            <td>${item.count}</td>
        `;
        itemInOrderTableBody.appendChild(row);
    });
}

// Загрузка запчастей с сервера
async function fetchItemsInOrder() {
    try {
        const response = await fetch('http://localhost:8080/api/item_in_order');
        const items = await response.json();
        displayItemsInOrder(items);
    } catch (error) {
        console.error('Ошибка при загрузке запчастей:', error);
    }
}

// Добавление новой запчасти
async function addItemInOrder(event) {
    event.preventDefault();

    const newItem = {
        id_order: addItemInOrderIdOrder.value,
        id_item: addItemInOrderIdItem.value,
        count: addItemInOrderCount.value,
    };

    if (isNaN(newItem.id_order) || newItem.id_order <= 0) {
        alert('Неверные данные: ID заказа должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newItem.id_item) || newItem.id_item <= 0) {
        alert('Неверные данные: ID запчасти должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/item_in_order/addItemInOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        });
        fetchItemsInOrder();
        alert('Запчасть добавлена!');
    } catch (error) {
        console.error('Ошибка при добавлении запчасти:', error);
    }
}

// Обновление запчасти
async function updateItemInOrder(event) {
    event.preventDefault();

    const itemId = fetchItemInOrderId.value;
    const updatedItem = {
        id_order: updateItemInOrderIdOrder.value,
        id_item: updateItemInOrderIdItem.value,
        count: updateItemInOrderCount.value,
    };

    if (isNaN(updatedItem.id_order) || updatedItem.id_order <= 0) {
        alert('Неверные данные: ID заказа должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedItem.id_item) || updatedItem.id_item <= 0) {
        alert('Неверные данные: ID запчасти должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/item_in_order/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        });
        if (!response.ok) throw new Error('Ошибка обновления запчасти');
        alert('Запчасть успешно обновлена!');
        fetchItemsInOrder();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление запчасти
async function deleteItemInOrder(event) {
    event.preventDefault();

    const itemId = document.querySelector('#deleteItemInOrderId').value;

    try {
        await fetch(`/api/item_in_order/${itemId}`, { method: 'DELETE' });
        fetchItemsInOrder();
        alert('Запчасть удалена!');
    } catch (error) {
        console.error('Ошибка при удалении запчасти:', error);
    }
}

// Загрузка данных запчасти для обновления
async function loadItemInOrderData(event) {
    event.preventDefault();
    const itemId = fetchItemInOrderId.value;

    try {
        const response = await fetch(`/api/item_in_order/${itemId}`);
        if (!response.ok) throw new Error('Запчасть не найдена');
        const item = await response.json();

        // Заполняем форму обновления
        updateItemInOrderIdOrder.value = item.id_order || '';
        updateItemInOrderIdItem.value = item.id_item || '';
        updateItemInOrderCount.value = item.count || '';

        document.querySelector('#updateItemInOrderStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск запчастей в таблице
searchItemInOrderButton.addEventListener('click', () => {
    searchItemInOrderInput.style.display =
        searchItemInOrderInput.style.display === 'none' ? 'block' : 'none';
});

searchItemInOrderInput.addEventListener('input', () => {
    const searchTerm = searchItemInOrderInput.value.toLowerCase();
    const rows = itemInOrderTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const isVisible = Array.from(cells).some(cell =>
            cell.textContent.toLowerCase().includes(searchTerm)
        );
        row.style.display = isVisible ? '' : 'none';
    });
});

// Обработчики событий
addItemInOrderForm.addEventListener('submit', addItemInOrder);
fetchItemInOrderForm.addEventListener('submit', loadItemInOrderData);
updateItemInOrderForm.addEventListener('submit', updateItemInOrder);
deleteItemInOrderForm.addEventListener('submit', deleteItemInOrder);

// Загрузить список запчастей при загрузке страницы
fetchItemsInOrder();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('itemInOrderTable');
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
