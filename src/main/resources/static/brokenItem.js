// Элементы DOM
const brokenItemTableBody = document.querySelector('#brokenItemTable tbody');
const addBrokenItemForm = document.querySelector('#addBrokenItemForm');
const fetchBrokenItemForm = document.getElementById('fetchBrokenItemForm');
const fetchBrokenItemId = document.getElementById('fetchBrokenItemId');
const updateBrokenItemForm = document.querySelector('#updateBrokenItemForm');
const deleteBrokenItemForm = document.querySelector('#deleteBrokenItemForm');

// Поля формы обновления
const updateBrokenItemFindTime = document.getElementById('updateFindTime');
const updateBrokenItemInfo = document.getElementById('updateBrokenItemInfo');
const updateBrokenItemId = document.getElementById('updateItemId');
const updateBrokenItemManufacturerId = document.getElementById('updateManufacturerId');
const updateBrokenItemProviderId = document.getElementById('updateProviderId');

// Поля формы добавления
const addBrokenItemFindTime = document.getElementById('addFindTime');
const addBrokenItemInfo = document.getElementById('addBrokenItemInfo');
const addBrokenItemId = document.getElementById('addItemId');
const addBrokenItemManufacturerId = document.getElementById('addManufacturerId');
const addBrokenItemProviderId = document.getElementById('addProviderId');

// Поле поиска
const searchBrokenItemButton = document.getElementById('searchBrokenItemButton');
const searchBrokenItemInput = document.getElementById('searchBrokenItemInput');

// Функция для форматирования даты в формат "дд.мм.гггг"
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // День
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (нумерация с 0)
    const year = date.getFullYear(); // Год
    return `${day}.${month}.${year}`;
}

// Функция для отображения данных бракованных запчастей в таблице
function displayBrokenItems(brokenItems) {
    brokenItemTableBody.innerHTML = ''; // Очистить таблицу
    brokenItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${formatDate(item.dateOfFind)}</td> <!-- Форматирование даты -->
            <td>${item.info}</td>
            <td>${item.itemName}</td>
            <td>${item.manufacturerName}</td>
            <td>${item.providerName}</td>
        `;
        brokenItemTableBody.appendChild(row);
    });
}

// Загрузка бракованных запчастей с сервера
async function fetchBrokenItems() {
    try {
        const response = await fetch('http://localhost:8080/api/broken_item');
        const brokenItems = await response.json();
        displayBrokenItems(brokenItems);
    } catch (error) {
        console.error('Ошибка при загрузке бракованных запчастей:', error);
    }
}

// Добавление новой бракованной запчасти
async function addBrokenItem(event) {
    event.preventDefault();

    const newBrokenItem = {
        dateOfFind: addBrokenItemFindTime.value,
        info: addBrokenItemInfo.value,
        id_item: addBrokenItemId.value,
        id_manufacturer: addBrokenItemManufacturerId.value,
        id_provider: addBrokenItemProviderId.value
    };

    if (isNaN(newBrokenItem.id_item) || newBrokenItem.id_item <= 0) {
        alert('Неверные данные: ID запчасти должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newBrokenItem.id_manufacturer) || newBrokenItem.id_manufacturer <= 0) {
        alert('Неверные данные: ID производителя должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(newBrokenItem.id_provider) || newBrokenItem.id_provider <= 0) {
        alert('Неверные данные: ID поставщика должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        await fetch('/api/broken_item/addBrokenItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBrokenItem)
        });
        fetchBrokenItems();
        alert('Бракованная запчасть добавлена!');
    } catch (error) {
        console.error('Ошибка при добавлении бракованной запчасти:', error);
    }
}

// Обновление бракованной запчасти
async function updateBrokenItem(event) {
    event.preventDefault();

    const itemId = fetchBrokenItemId.value;
    const updatedBrokenItem = {
        dateOfFind: updateBrokenItemFindTime.value,
        info: updateBrokenItemInfo.value,
        id_item: updateBrokenItemId.value,
        id_manufacturer: updateBrokenItemManufacturerId.value,
        id_provider: updateBrokenItemProviderId.value
    };

    if (isNaN(updatedBrokenItem.id_item) || updatedBrokenItem.id_item <= 0) {
        alert('Неверные данные: ID запчасти должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedBrokenItem.id_manufacturer) || updatedBrokenItem.id_manufacturer <= 0) {
        alert('Неверные данные: ID производителя должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    if (isNaN(updatedBrokenItem.id_provider) || updatedBrokenItem.id_provider <= 0) {
        alert('Неверные данные: ID поставщика должен быть положительным числом');
        return; // Прерываем выполнение, если данные некорректны
    }

    try {
        const response = await fetch(`/api/broken_item/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBrokenItem)
        });
        if (!response.ok) throw new Error('Ошибка обновления бракованной запчасти');
        alert('Бракованная запчасть успешно обновлена!');
        fetchBrokenItems();
    } catch (error) {
        alert(error.message);
    }
}

// Удаление бракованной запчасти
async function deleteBrokenItem(event) {
    event.preventDefault();

    const itemId = document.getElementById('deleteBrokenItemId').value;

    try {
        await fetch(`/api/broken_item/${itemId}`, { method: 'DELETE' });
        fetchBrokenItems();
        alert('Бракованная запчасть удалена!');
    } catch (error) {
        console.error('Ошибка при удалении бракованной запчасти:', error);
    }
}

// Загрузка данных бракованной запчасти для обновления
async function loadBrokenItemData(event) {
    event.preventDefault();
    const itemId = fetchBrokenItemId.value;

    try {
        const response = await fetch(`/api/broken_item/${itemId}`);
        if (!response.ok) throw new Error('Запчасть не найдена');
        const item = await response.json();

        // Заполняем форму обновления
        updateBrokenItemFindTime.value = item.dateOfFind || '';
        updateBrokenItemInfo.value = item.info || '';
        updateBrokenItemId.value = item.id_item || '';
        updateBrokenItemManufacturerId.value = item.id_manufacturer || '';
        updateBrokenItemProviderId.value = item.id_provider || '';

        document.getElementById('updateBrokenItemStep').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

// Поиск бракованных запчастей в таблице
searchBrokenItemButton.addEventListener("click", () => {
    searchBrokenItemInput.style.display = searchBrokenItemInput.style.display === "none" ? "block" : "none";
});

searchBrokenItemInput.addEventListener("input", () => {
    const searchTerm = searchBrokenItemInput.value.toLowerCase();
    const rows = brokenItemTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const isVisible = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = isVisible ? "" : "none";
    });
});

// Обработчики событий
addBrokenItemForm.addEventListener('submit', addBrokenItem);
fetchBrokenItemForm.addEventListener('submit', loadBrokenItemData);
updateBrokenItemForm.addEventListener('submit', updateBrokenItem);
deleteBrokenItemForm.addEventListener('submit', deleteBrokenItem);

// Загрузить список бракованных запчастей при загрузке страницы
fetchBrokenItems();

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('brokenItemTable');
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
