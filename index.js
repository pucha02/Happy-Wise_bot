const keycrmApiToken = 'Njk0OWFjNWE4ZmI5YjRmOGYyNTM0ZmVhZjg4M2UxYzY5YWYxZjAzMg';
const keycrmApiUrl = 'https://app.keycrm.app/api/v2/leads';


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${keycrmApiToken}`,
  };

fetch('https://openapi.keycrm.app/v1/pipelines/15/statuses', {headers})
.then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });