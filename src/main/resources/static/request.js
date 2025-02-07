// Элементы DOM
const requestsTableBody = document.querySelector('#requestTable tbody');
const addRequestForm = document.querySelector('#addRequestForm');
const fetchRequestForm = document.getElementById('fetchRequestForm');
const fetchRequestId = document.getElementById('fetchRequestId');
const updateRequestForm = document.querySelector('#updateRequestForm');
const deleteRequestForm = document.querySelector('#deleteRequestForm');

// Поля формы обновления
const updateRequestDate = document.getElementById('updateDateRequest');
const updateRequestClientId = document.getElementById('updateClientId');
const updateRequestManagerId = document.getElementById('updateManagerId');

// Поля формы добавления
const addRequestDate = document.getElementById('addDateRequest');
const addRequestClientId = document.getElementById('addClientId');
const addRequestManagerId = document.getElementById('addManagerId');

// Поле поиска
const searchRequestButton = document.getElementById('searchRequestButton');
const searchRequestInput = document.getElementById('searchRequestInput');

// Функция для отображения данных заявок в таблице
function displayRequests(requests) {
    requestsTableBody.innerHTML = ''; // Очистить таблицу
    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${new Date(request.dateOfRequest).toLocaleDateString()}</td>
            <td>${request.clientName}</td>
            <td>${request.managerName}</td>
        `;
        requestsTableBody.appendChild(row);
    });
}

// Загрузка заявок с сервера
async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:8080/api/request');
        const requests = await response.json();
        displayRequests(requests);
    } catch (error) {
        console.error('Ошибка при загрузке заявок:', error);
    }
}

// Добавление новой заявки
async function addRequest(event) {
    event.preventDefault();

    const newRequest = {
        dateOfRequest: addRequestDate.value,
        id_client: addRequestClientId.value,
        id_manager: addRequestManagerId.value
    };

    if (isNaN(newRequest.id_manager) || newRequest.id_manager <= 0) {
        alert('Неверные данные: ID менаджера должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newRequest.id_client) || newRequest.id_client <= 0) {
        alert('Неверные данные: ID клиента должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/request/addRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRequest)
        });
        fetchRequests();
        alert('Заявка добавлена!');
    } catch (error) {
        console.error('Ошибка при добавлении заявки:', error);
    }
}

// Обновление заявки
async function updateRequest(event) {
    event.preventDefault();

    const requestId = fetchRequestId.value;
    const updatedRequest = {
        dateOfRequest: updateRequestDate.value,
        id_client: updateRequestClientId.value,
        id_manager: updateRequestManagerId.value
    };

    if (isNaN(updatedRequest.id_manager) || updatedRequest.id_manager <= 0) {
        alert('Неверные данные: ID менаджера должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedRequest.id_client) || updatedRequest.id_client <= 0) {
        alert('Неверные данные: ID клиента должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/request/${requestId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRequest)
        });
        if (!response.ok) throw new Error('Ошибка обновления заявки');
        alert('Заявка успешно обновлена!');
        fetchRequests();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление заявки
async function deleteRequest(event) {
    event.preventDefault();

    const requestId = document.getElementById('deleteRequestId').value;

    try {
        await fetch(`/api/request/${requestId}`, { method: 'DELETE' });
        fetchRequests();
        alert('Заявка удалена!');
    } catch (error) {
        console.error('Ошибка при удалении заявки:', error);
    }
}

// Загрузка данных заявки для обновления
async function loadRequestData(event) {
    event.preventDefault();
    const requestId = fetchRequestId.value;

    try {
        const response = await fetch(`/api/request/${requestId}`);
        if (!response.ok) throw new Error('Заявка не найдена');
        const request = await response.json();

        // Заполняем форму обновления
        updateRequestDate.value = new Date(request.dateOfRequest).toLocaleDateString();
        updateRequestClientId.value = request.id_client || '';
        updateRequestManagerId.value = request.id_manager || '';

        document.getElementById('updateRequestStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск заявок в таблице
searchRequestButton.addEventListener("click", () => {
    searchRequestInput.style.display = searchRequestInput.style.display === "none" ? "block" : "none";
});

searchRequestInput.addEventListener("input", () => {
    const searchTerm = searchRequestInput.value.toLowerCase();
    const rows = requestsTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addRequestForm.addEventListener('submit', addRequest);
fetchRequestForm.addEventListener('submit', loadRequestData);
updateRequestForm.addEventListener('submit', updateRequest);
deleteRequestForm.addEventListener('submit', deleteRequest);

// Загрузить список заявок при загрузке страницы
fetchRequests();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('requestTable');
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
