export const postRequest = async (sign, language, period = 'today') => {
    try {
        const response = await fetch('https://poker247tech.ru/get_horoscope/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sign, language, period }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching horoscope:', error);
        return null;
    }
};
