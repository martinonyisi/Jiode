document.addEventListener('DOMContentLoaded', function() {
    // Sample movie data (in a real app, this would come from an API)
    const movies = [
        {
            id: 1,
            title: "Dune: Part Two",
            year: 2024,
            rating: 8.9,
            poster: "https://via.placeholder.com/300x450?text=Dune+Part+Two",
            description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
            runtime: "166 min",
            platforms: ["Netflix", "Amazon Prime", "HBO Max"]
        },
        {
            id: 2,
            title: "The Batman",
            year: 2022,
            rating: 7.9,
            poster: "https://via.placeholder.com/300x450?text=The+Batman",
            description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
            runtime: "176 min",
            platforms: ["HBO Max", "YouTube Movies"]
        },
        {
            id: 3,
            title: "Spider-Man: No Way Home",
            year: 2021,
            rating: 8.2,
            poster: "https://via.placeholder.com/300x450?text=Spider-Man+NWH",
            description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
            runtime: "148 min",
            platforms: ["Netflix", "Disney+"]
        },
        {
            id: 4,
            title: "Top Gun: Maverick",
            year: 2022,
            rating: 8.3,
            poster: "https://via.placeholder.com/300x450?text=Top+Gun+Maverick",
            description: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot.",
            runtime: "130 min",
            platforms: ["Amazon Prime", "YouTube Movies"]
        },
        {
            id: 5,
            title: "Everything Everywhere All at Once",
            year: 2022,
            rating: 8.8,
            poster: "https://via.placeholder.com/300x450?text=EEAAO",
            description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes connecting with the lives she could have led.",
            runtime: "139 min",
            platforms: ["Netflix", "HBO Max"]
        },
        {
            id: 6,
            title: "Avatar: The Way of Water",
            year: 2022,
            rating: 7.6,
            poster: "https://via.placeholder.com/300x450?text=Avatar+2",
            description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
            runtime: "192 min",
            platforms: ["Disney+", "Amazon Prime"]
        }
    ];
    // DOM Elements
    const featuredMoviesContainer = document.getElementById('featured-movies');
    const newReleasesContainer = document.getElementById('new-releases-movies');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const modal = document.getElementById('movie-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    // Display movies in the featured section
    function displayFeaturedMovies() {
        featuredMoviesContainer.innerHTML = '';
        // Show first 6 movies as featured
        movies.slice(0, 6).forEach(movie => {
            const movieCard = createMovieCard(movie);
            featuredMoviesContainer.appendChild(movieCard);
        });
    }

    // Display new releases (in a real app, this would filter by release date)
    function displayNewReleases() {
        newReleasesContainer.innerHTML = '';
        // Show last 6 movies as new releases
        movies.slice(-6).forEach(movie => {
            const movieCard = createMovieCard(movie);
            newReleasesContainer.appendChild(movieCard);
        });
    }

    // Create a movie card element
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.id = movie.id;
        
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-year">${movie.year}</p>
            </div>
            <div class="movie-rating">${movie.rating}</div>
        `;
        
        // Add click event to show modal
        card.addEventListener('click', () => showMovieDetails(movie.id));
        
        return card;
    }

    // Show movie details in modal
    function showMovieDetails(movieId) {
        const movie = movies.find(m => m.id === movieId);
        if (!movie) return;
        
        modalBody.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="modal-poster">
            <h2 class="modal-title">${movie.title}</h2>
            <div class="modal-details">
                <span class="modal-year">${movie.year}</span>
                <span class="modal-rating">⭐ ${movie.rating}/10</span>
                <span class="modal-runtime">${movie.runtime}</span>
            </div>
            <p class="modal-description">${movie.description}</p>
            <div class="modal-platforms">
                <h4>Available on:</h4>
                ${movie.platforms.map(platform => `<span class="platform-badge">${platform}</span>`).join('')}
            </div>
            <a href="#" class="watch-btn">Find Where to Watch</a>
        `;
        
        modal.style.display = 'block';
        
        // Add click event to watch button
        const watchBtn = modalBody.querySelector('.watch-btn');
        watchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app, this would redirect to the streaming platform
            alert(`Redirecting to ${movie.platforms[0]} to watch ${movie.title}`);
        });
    }

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Search functionality
    function searchMovies(query) {
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.description.toLowerCase().includes(query.toLowerCase())
        );
        
        // Clear current displays
        featuredMoviesContainer.innerHTML = '';
        newReleasesContainer.innerHTML = '';
        
        if (filteredMovies.length === 0) {
            featuredMoviesContainer.innerHTML = '<p class="no-results">No movies found matching your search.</p>';
            return;
        }
        
        // Display search results
        filteredMovies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            featuredMoviesContainer.appendChild(movieCard);
        });
    }

    // Event listeners
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchMovies(query);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchMovies(query);
            }
        }
    });

    // Initialize the page
    displayFeaturedMovies();
    displayNewReleases();
});
