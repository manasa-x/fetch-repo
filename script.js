document.getElementById('username-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      fetchRepositories(username);
    });

    async function fetchRepositories(username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();

        if (response.ok) {
          displayRepositories(data);
        } else {
          alert(`Error: ${data.message || 'Unable to fetch repositories'}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data');
      }
    }

    function displayRepositories(repositories) {
      const reposList = document.getElementById('repos-list');
      reposList.innerHTML = '';

      repositories.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.className = 'repo-item';
        listItem.innerHTML = `<fieldset><strong>${repo.name}</strong><br>${repo.description || 'No description available'}</fieldset>`;
        reposList.appendChild(listItem);
      });
    }
