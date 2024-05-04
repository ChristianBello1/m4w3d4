async function fetchUtenti() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Network non okay");
        }
        return await response.json();
    } catch (error) {
        console.log("errore:", error);
        throw error;
    }
}

document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    var selectElement = document.getElementById('inputGroupSelect01');
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();

    try {
        const users = await fetchUtenti();
        var filteredUsers = users.filter(function (user) {
            return user[selectedOption].toLowerCase().includes(searchTerm);
        });

        displayResults(filteredUsers);
    } catch (error) {
        console.error('Errore durante il recupero degli utenti:', error);
    }
});

function displayResults(results) {
    var resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    var table = document.createElement('table');
    table.classList.add('table');

    // Id, username, ecc. parte della testa della tabella
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    for (var key in results[0]) { // vado a prendere in considerazione le chiavi nei risultati
        var th = document.createElement('th'); // sono le celle di intestazione(dove ci va la roba)
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Converti la prima lettera in maiuscolo
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Corpo della tabella
    var tbody = document.createElement('tbody');
    results.forEach(function (result) {
        var row = document.createElement('tr');
        for (var key in result) { // prendo in considerazione le chiavi di ogni oggetto
            var cell = document.createElement('td'); // dove ci sono i dati
            cell.textContent = result[key];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    resultsContainer.appendChild(table);
}
