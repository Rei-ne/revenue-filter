import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://fe-task-api.mainstack.io/',
});

export { apiClient };