import axios from 'axios';

export default axios.create({
	baseURL: 'https://us-central1-streamy-serverless-api.cloudfunctions.net/app',
});