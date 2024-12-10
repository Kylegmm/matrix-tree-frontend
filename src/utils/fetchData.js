export const fetchTrees = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/previous-trees');
        if (!response.ok) {
            throw new Error('Failed to fetch trees');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching trees:', error);
        return [];
    }
};
