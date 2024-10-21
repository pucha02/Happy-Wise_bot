import axios from 'axios';

const keycrmApiToken = 'Njk0OWFjNWE4ZmI5YjRmOGYyNTM0ZmVhZjg4M2UxYzY5YWYxZjAzMg';
const keycrmApiUrl = 'https://openapi.keycrm.app/v1/pipelines/cards';

const pipelineId = 14;
const statusId = 183;

export async function sendToKeyCRM(contactInfo) {
  try {
    const response = await axios.post(
      keycrmApiUrl,
      {
        title: `${contactInfo.full_name}`,
        source_id: 1,
        manager_comment: 'New contact from Telegram bot',
        manager_id: 1,
        pipeline_id: pipelineId, 
        status_id: statusId,
        contact: {
          full_name: contactInfo.full_name,
          email: contactInfo.email || '',
          phone: contactInfo.phone,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keycrmApiToken}`,
        },
      }
    );

    console.log('Lead created:', response.data);
  } catch (error) {
    console.error('Error sending data to KeyCRM:', error);
  }
}