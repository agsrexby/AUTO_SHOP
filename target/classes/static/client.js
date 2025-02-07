// Элементы DOM
const clientsTableBody = document.querySelector('#clientsTable tbody');
const addClientForm = document.querySelector('#addClientForm');
const fetchClientForm = document.getElementById('fetchClientForm');
const fetchClientId = document.getElementById('fetchClientId');
const updateClientForm = document.querySelector('#updateClientForm');
const deleteClientForm = document.querySelector('#deleteClientForm');

// Поля формы обновления
const updateLastname = document.getElementById('updateLastname');
const updateName = document.getElementById('updateName');
const updatePatronynic = document.getElementById('updatePatronynic');
const updateCountry = document.getElementById('updateCountry');
const updateCity = document.getElementById('updateCity');
const updateStreet = document.getElementById('updateStreet');
const updateNumberOfHome = document.getElementById('updateNumberOfHome');

// Поля формы добавления
const addLastname = document.getElementById('addLastname');
const addName = document.getElementById('addName');
const addPatronynic = document.getElementById('addPatronynic');
const addCountry = document.getElementById('addCountry');
const addCity = document.getElementById('addCity');
const addStreet = document.getElementById('addStreet');
const addNumberOfHome = document.getElementById('addNumberOfHome');

// Поле поиска
const searchClientButton = document.getElementById('searchClientButton');
const searchClientInput = document.getElementById('searchClientInput');

// Функция для отображения данных клиентов в таблице
function displayClients(clients) {
    clientsTableBody.innerHTML = ''; // Очистить таблицу
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.lastname}</td>
            <td>${client.name}</td>
            <td>${client.patronynic || ''}</td>
            <td>${client.country || ''}</td>
            <td>${client.city || ''}</td>
            <td>${client.street || ''}</td>
            <td>${client.number_of_home || ''}</td>
        `;
        clientsTableBody.appendChild(row);
    });
}

// Загрузка клиентов с сервера
async function fetchClients() {
    try {
        const response = await fetch('http://localhost:8080/api/client');
        const clients = await response.json();
        displayClients(clients);
    } catch (error) {
        console.error('Ошибка при загрузке клиентов:', error);
    }
}

// Добавление нового клиента
async function addClient(event) {
    event.preventDefault();

    const newClient = {
        lastname: addLastname.value,
        name: addName.value,
        patronynic: addPatronynic.value,
        id_counry: addCountry.value,
        id_city: addCity.value,
        id_street: addStreet.value,
        number_of_home: addNumberOfHome.value
    };

    if (isNaN(newClient.number_of_home) || newClient.number_of_home <= 0) {
        alert('Неверные данные: номер дома должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newClient.id_counry) || newClient.id_counry <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newClient.id_city) || newClient.id_city <= 0) {
        alert('Неверные данные: ID горда должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newClient.id_street) || newClient.id_street <= 0) {
        alert('Неверные данные: ID улицы должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/client/addClient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClient)
        });
        fetchClients();
        alert('Клиент добавлен!');
    } catch (error) {
        console.error('Ошибка при добавлении клиента:', error);
    }
}

// Обновление клиента
async function updateClient(event) {
    event.preventDefault();

    const clientId = fetchClientId.value;
    const updatedClient = {
        lastname: updateLastname.value,
        name: updateName.value,
        patronynic: updatePatronynic.value,
        id_counry: updateCountry.value,
        id_city: updateCity.value,
        id_street: updateStreet.value,
        number_of_home: updateNumberOfHome.value
    };

    if (isNaN(updatedClient.number_of_home) || updatedClient.number_of_home <= 0) {
        alert('Неверные данные: номер дома должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedClient.id_counry) || updatedClient.id_counry <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedClient.id_city) || updatedClient.id_city <= 0) {
        alert('Неверные данные: ID горда должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedClient.id_street) || updatedClient.id_street <= 0) {
        alert('Неверные данные: ID улицы должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/client/${clientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedClient)
        });
        if (!response.ok) throw new Error('Ошибка обновления клиента');
        alert('Клиент успешно обновлён!');
        fetchClients();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление клиента
async function deleteClient(event) {
    event.preventDefault();

    const clientId = document.getElementById('deleteClientId').value;

    try {
        await fetch(`/api/client/${clientId}`, { method: 'DELETE' });
        fetchClients();
        alert('Клиент удалён!');
    } catch (error) {
        console.error('Ошибка при удалении клиента:', error);
    }
}

// Загрузка данных клиента для обновления
async function loadClientData(event) {
    event.preventDefault();
    const clientId = fetchClientId.value;

    try {
        const response = await fetch(`/api/client/${clientId}`);
        if (!response.ok) throw new Error('Клиент не найден');
        const client = await response.json();

        // Заполняем форму обновления
        updateLastname.value = client.lastname || '';
        updateName.value = client.name || '';
        updatePatronynic.value = client.patronynic || '';
        updateCountry.value = client.id_counry || '';
        updateCity.value = client.id_city || '';
        updateStreet.value = client.id_street || '';
        updateNumberOfHome.value = client.number_of_home || '';

        document.getElementById('updateClientStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск клиентов в таблице
searchClientButton.addEventListener("click", () => {
    searchClientInput.style.display = searchClientInput.style.display === "none" ? "block" : "none";
});

searchClientInput.addEventListener("input", () => {
    const searchTerm = searchClientInput.value.toLowerCase();
    const rows = clientsTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addClientForm.addEventListener('submit', addClient);
fetchClientForm.addEventListener('submit', loadClientData);
updateClientForm.addEventListener('submit', updateClient);
deleteClientForm.addEventListener('submit', deleteClient);

// Загрузить список клиентов при загрузке страницы
fetchClients();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('clientsTable');
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
