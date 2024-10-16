export async function fetchCount() {
    try {
        const response = await fetch('http://localhost:8080');

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data };  // Simply return the data object
    } catch (error) {
        console.error("Error fetching count:", error);
        throw error;  // Re-throw to propagate the error
    }
}
