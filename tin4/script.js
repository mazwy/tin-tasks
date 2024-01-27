// Fetch and display data
const fetchData = () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            container.innerHTML = JSON.stringify(data, null, 2); // Replace with proper table rendering
        })
        .catch(error => console.error('Error:', error));
};

fetchData();

setInterval(() => {
    // Call the fetch function here for the new endpoint
    fetchData();
}, 5000); // Fetch new data every 5000 ms (5 seconds)
