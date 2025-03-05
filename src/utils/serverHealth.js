export const checkServerHealth = async () => {
    try {
        const response = await fetch('http://localhost:8080/actuator/health', {
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
