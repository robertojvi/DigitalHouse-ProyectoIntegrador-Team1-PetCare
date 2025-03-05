import axios from "axios";

// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JlcnRvanZpQGdtYWlsLmNvbSIsImlhdCI6MTc0MDk2ODgyMSwiZXhwIjoxNzQxMDU1MjIxfQ.JnUcPjUokUoE6a6O5RVt1KqdqQoz3wuiYWy9Q3i9vzU';
const token =
	"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuQGNvcnJlby5jb20iLCJpYXQiOjE3NDExOTkzNjEsImV4cCI6MTc0MTI4NTc2MX0.zVVYjAL_xRCrCTjVrjQvhhkKpqFg4Ozk_FQaAQKLsYY";

const instance = axios.create({
	baseURL: "http://localhost:8080",
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	},
});

instance.interceptors.request.use(
	(config) => {
		console.log("Request:", config.url);
		return config;
	},
	(error) => Promise.reject(error)
);

instance.interceptors.response.use(
	(response) => {
		console.log("Response:", response.status, response.data);
		return response;
	},
	(error) => {
		console.error("Error:", {
			status: error.response?.status,
			data: error.response?.data,
			message: error.message,
		});
		throw error;
	}
);

export default instance;
