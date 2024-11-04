const keycrmApiToken = 'MWJlODYwNDRmMzc2ZTA0MWEwNTE5ODFkNzIwMDU5MWNjMDU0MjM2YQ';
const keycrmApiUrl = 'https://app.keycrm.app/api/v2/leads';


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${keycrmApiToken}`,
  };

fetch('https://openapi.keycrm.app/v1/pipelines/5/statuses', {headers})
.then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });