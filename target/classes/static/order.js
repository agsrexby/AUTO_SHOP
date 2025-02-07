// Элементы DOM
const ordersTableBody = document.querySelector('#orderTable tbody');
const addOrderForm = document.querySelector('#addOrderForm');
const fetchOrderForm = document.getElementById('fetchOrderForm');
const fetchOrderId = document.getElementById('fetchOrderId');
const updateOrderForm = document.querySelector('#updateOrderForm');
const deleteOrderForm = document.querySelector('#deleteOrderForm');

// Поля формы обновления
const updateOrderDate = document.getElementById('updateDateOrder');
const updateOrderClientId = document.getElementById('updateOrderClientId');
const updateOrderManagerId = document.getElementById('updateOrderManagerId');

// Поля формы добавления
const addOrderDate = document.getElementById('addDateOrder');
const addOrderClientId = document.getElementById('addOrderClientId');
const addOrderManagerId = document.getElementById('addOrderManagerId');

// Поле поиска
const searchOrderButton = document.getElementById('searchOrderButton');
const searchOrderInput = document.getElementById('searchOrderInput');

// Функция для отображения данных заказов в таблице
function displayOrders(orders) {
    ordersTableBody.innerHTML = ''; // Очистить таблицу
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${new Date(order.dateOfOrder).toLocaleDateString()}</td>
            <td>${order.managerName}</td>
            <td>${order.providerName}</td>
        `;
        ordersTableBody.appendChild(row);
    });
}

// Загрузка заказов с сервера
async function fetchOrders() {
    try {
        const response = await fetch('http://localhost:8080/api/order');
        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
    }
}

// Добавление нового заказа
async function addOrder(event) {
    event.preventDefault();

    const newOrder = {
        dateOfOrder: addOrderDate.value,
        id_manager: addOrderManagerId.value,
        id_provider: addOrderClientId.value
    };

    if (isNaN(newOrder.id_manager) || newOrder.id_manager <= 0) {
        alert('Неверные данные: ID менаджера должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newOrder.id_provider) || newOrder.id_provider <= 0) {
        alert('Неверные данные: ID поставщика должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/order/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        });
        fetchOrders();
        alert('Заказ добавлен!');
    } catch (error) {
        console.error('Ошибка при добавлении заказа:', error);
    }
}

// Обновление заказа
async function updateOrder(event) {
    event.preventDefault();

    const orderId = fetchOrderId.value;
    const updatedOrder = {
        dateOfOrder: updateOrderDate.value,
        id_manager: updateOrderManagerId.value,
        id_provider: updateOrderClientId.value
    };

    if (isNaN(updatedOrder.id_manager) || updatedOrder.id_manager <= 0) {
        alert('Неверные данные: ID менаджера должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedOrder.id_provider) || updatedOrder.id_provider <= 0) {
        alert('Неверные данные: ID поставщика должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/order/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrder)
        });
        if (!response.ok) throw new Error('Ошибка обновления заказа');
        alert('Заказ успешно обновлен!');
        fetchOrders();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление заказа
async function deleteOrder(event) {
    event.preventDefault();

    const orderId = document.getElementById('deleteOrderId').value;

    try {
        await fetch(`/api/order/${orderId}`, { method: 'DELETE' });
        fetchOrders();
        alert('Заказ удален!');
    } catch (error) {
        console.error('Ошибка при удалении заказа:', error);
    }
}

// Загрузка данных заказа для обновления
async function loadOrderData(event) {
    event.preventDefault();
    const orderId = fetchOrderId.value;

    try {
        const response = await fetch(`/api/order/${orderId}`);
        if (!response.ok) throw new Error('Заказ не найден');
        const order = await response.json();

        // Заполняем форму обновления
        updateOrderDate.value = new Date(order.dateOfOrder).toLocaleDateString();
        updateOrderClientId.value = order.id_provider || '';
        updateOrderManagerId.value = order.id_manager || '';

        document.getElementById('updateOrderStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск заказов в таблице
searchOrderButton.addEventListener("click", () => {
    searchOrderInput.style.display = searchOrderInput.style.display === "none" ? "block" : "none";
});

searchOrderInput.addEventListener("input", () => {
    const searchTerm = searchOrderInput.value.toLowerCase();
    const rows = ordersTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addOrderForm.addEventListener('submit', addOrder);
fetchOrderForm.addEventListener('submit', loadOrderData);
updateOrderForm.addEventListener('submit', updateOrder);
deleteOrderForm.addEventListener('submit', deleteOrder);

// Загрузить список заказов при загрузке страницы
fetchOrders();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('orderTable');
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
