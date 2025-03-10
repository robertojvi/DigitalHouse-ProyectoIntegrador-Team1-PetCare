export const checkServerHealth = async () => {
    const API_URL = import.meta.env.VITE_API_URL

    try {
        const response = await fetch(API_URL+'/actuator/health', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            timeout: 5000
        });

        if (!response.ok) {
            throw new Error('Server health check failed');
        }

        const data = await response.json();
        return data.status === 'UP';
    } catch (error) {
        console.error('Server health check error:', error);
        return false;
    }
};
