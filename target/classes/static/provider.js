// Элементы DOM
const providerTableBody = document.querySelector('#providerTable tbody');
const addProviderForm = document.querySelector('#addProviderForm');
const fetchProviderForm = document.getElementById('fetchProviderForm');
const fetchProviderId = document.getElementById('fetchProviderId');
const updateProviderForm = document.querySelector('#updateProviderForm');
const deleteProviderForm = document.querySelector('#deleteProviderForm');

// Поля формы обновления
const updateProviderName = document.getElementById('updateProviderName');
const updateProviderCategory = document.getElementById('updateProviderCategory');
const updateDirectorName = document.getElementById('updateDirectorName');
const updateDirectorLastName = document.getElementById('updateDirectorLastName');
const updateDirectorPatronymic = document.getElementById('updateDirectorPatronymic');
const updateProviderPhoneNumber = document.getElementById('updateProviderPhoneNumber');
const updateProviderNumOfHome = document.getElementById('updateProviderNumOfHome');
const updateProviderCountryId = document.getElementById('updateProviderCountryId');
const updateProviderCityId = document.getElementById('updateProviderCityId');
const updateProviderStreetId = document.getElementById('updateProviderStreetId');

// Поля формы добавления
const addProviderName = document.getElementById('addProviderName');
const addProviderCategory = document.getElementById('addProviderCategory');
const addDirectorName = document.getElementById('addDirectorName');
const addDirectorLastName = document.getElementById('addDirectorLastName');
const addDirectorPatronymic = document.getElementById('addDirectorPatronymic');
const addProviderPhoneNumber = document.getElementById('addProviderPhoneNumber');
const addProviderNumOfHome = document.getElementById('addProviderNumOfHome');
const addProviderCountryId = document.getElementById('addProviderCountryId');
const addProviderCityId = document.getElementById('addProviderCityId');
const addProviderStreetId = document.getElementById('addProviderStreetId');

// Поле поиска
const searchProviderButton = document.getElementById('searchProviderButton');
const searchProviderInput = document.getElementById('searchProviderInput');

// Функция для отображения поставщиков в таблице
function displayProviders(providers) {
    providerTableBody.innerHTML = ''; // Очистить таблицу
    providers.forEach(provider => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${provider.id}</td>
            <td>${provider.name}</td>
            <td>${provider.category}</td>
            <td>${provider.lastnameDerector}</td>
            <td>${provider.nameDerector}</td>
            <td>${provider.patronynicDerector}</td>
            <td>${provider.phoneNumber}</td>
            <td>${provider.numberOfHome}</td>
            <td>${provider.country}</td>
            <td>${provider.city}</td>
            <td>${provider.street}</td>
        `;
        providerTableBody.appendChild(row);
    });
}

// Загрузка поставщиков с сервера
async function fetchProviders() {
    try {
        const response = await fetch('http://localhost:8080/api/provider');
        const providers = await response.json();
        displayProviders(providers);
    } catch (error) {
        console.error('Ошибка при загрузке поставщиков:', error);
    }
}

// Добавление нового поставщика
async function addProvider(event) {
    event.preventDefault();

    const newProvider = {
        name: addProviderName.value,
        category: addProviderCategory.value,
        lastnameDerector: addDirectorLastName.value,
        nameDerector: addDirectorName.value,
        patronynicDerector: addDirectorPatronymic.value,
        phoneNumber: addProviderPhoneNumber.value,
        numberOfHome: addProviderNumOfHome.value,
        id_country: addProviderCountryId.value,
        id_city: addProviderCityId.value,
        id_street: addProviderStreetId.value
    };
    if (isNaN(newProvider.phoneNumber) || newProvider.phoneNumber <= 0) {
        alert('Неверные данные: номер телефона должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newProvider.number_of_home) || newProvider.number_of_home <= 0) {
        alert('Неверные данные: номер дома должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newProvider.id_counry) || newProvider.id_counry <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newProvider.id_city) || newProvider.id_city <= 0) {
        alert('Неверные данные: ID горда должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newProvider.id_street) || newProvider.id_street <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/provider/addProvider', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProvider)
        });
        fetchProviders();
        alert('Поставщик добавлен!');
    } catch (error) {
        console.error('Ошибка при добавлении поставщика:', error);
    }
}

// Обновление поставщика
async function updateProvider(event) {
    event.preventDefault();

    const providerId = fetchProviderId.value;
    const updatedProvider = {
        name: updateProviderName.value,
        category: updateProviderCategory.value,
        lastnameDerector: updateDirectorLastName.value,
        nameDerector: updateDirectorName.value,
        patronynicDerector: updateDirectorPatronymic.value,
        phoneNumber: updateProviderPhoneNumber.value,
        numberOfHome: updateProviderNumOfHome.value,
        id_country: updateProviderCountryId.value,
        id_city: updateProviderCityId.value,
        id_street: updateProviderStreetId.value
    };

    if (isNaN(updatedProvider.phoneNumber) || updatedProvider.phoneNumber <= 0) {
        alert('Неверные данные: номер телефона должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedProvider.number_of_home) || updatedProvider.number_of_home <= 0) {
        alert('Неверные данные: номер дома должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedProvider.id_counry) || updatedProvider.id_counry <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedProvider.id_city) || updatedProvider.id_city <= 0) {
        alert('Неверные данные: ID горда должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedProvider.id_street) || updatedProvider.id_street <= 0) {
        alert('Неверные данные: ID страны должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/provider/${providerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProvider)
        });
        if (!response.ok) throw new Error('Ошибка обновления поставщика');
        alert('Поставщик успешно обновлён!');
        fetchProviders();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление поставщика
async function deleteProvider(event) {
    event.preventDefault();

    const providerId = document.getElementById('deleteProviderId').value;

    try {
        await fetch(`/api/provider/${providerId}`, { method: 'DELETE' });
        fetchProviders();
        alert('Поставщик удалён!');
    } catch (error) {
        console.error('Ошибка при удалении поставщика:', error);
    }
}

// Загрузка данных поставщика для обновления
async function loadProviderData(event) {
    event.preventDefault();
    const providerId = fetchProviderId.value;

    try {
        const response = await fetch(`/api/provider/${providerId}`);
        if (!response.ok) throw new Error('Поставщик не найден');
        const provider = await response.json();

        // Заполняем форму обновления
        updateProviderName.value = provider.name || '';
        updateProviderCategory.value = provider.category || '';
        updateDirectorName.value = provider.nameDerector || '';
        updateDirectorLastName.value = provider.lastnameDerector || '';
        updateDirectorPatronymic.value = provider.patronynicDerector || '';
        updateProviderPhoneNumber.value = provider.phoneNumber || '';
        updateProviderNumOfHome.value = provider.numberOfHome || '';
        updateProviderCountryId.value = provider.id_country || '';
        updateProviderCityId.value = provider.id_city || '';
        updateProviderStreetId.value = provider.id_street || '';

        document.getElementById('updateProviderStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск поставщиков в таблице
searchProviderButton.addEventListener("click", () => {
    searchProviderInput.style.display = searchProviderInput.style.display === "none" ? "block" : "none";
});

searchProviderInput.addEventListener("input", () => {
    const searchTerm = searchProviderInput.value.toLowerCase();
    const rows = providerTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addProviderForm.addEventListener('submit', addProvider);
fetchProviderForm.addEventListener('submit', loadProviderData);
updateProviderForm.addEventListener('submit', updateProvider);
deleteProviderForm.addEventListener('submit', deleteProvider);

// Загрузить список поставщиков при загрузке страницы
fetchProviders();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('providerTable');
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
