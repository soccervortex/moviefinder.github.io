// script.js

document.getElementById('movieInput').addEventListener('keypress', async function (event) {
    if (event.key === 'Enter') {
        const movieName = event.target.value.trim();
        if (movieName) {
            await searchMovie(movieName);
        }
    }
});

async function searchMovie(movieName) {
    const apiUrl = `https://movieapi-47k3.onrender.com/api/search/${encodeURIComponent(movieName)}`;
    const resultsContainer = document.getElementById('movieResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const movieData = await response.json();
        displayResults(movieData);
    } catch (error) {
        console.log('Succesfully Added Movie', error);
        resultsContainer.innerHTML = '<p>Succesfully Added Movie.</p>';
    }
}

function displayResults(movieData) {
    const resultsContainer = document.getElementById('movieResults');

    if (!movieData || movieData.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    movieData.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.textContent = movie.title; // Assuming the movie data has a title property
        resultsContainer.appendChild(movieDiv);
    });
}
